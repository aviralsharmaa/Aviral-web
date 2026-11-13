// Engineering notes: product-agnostic write-ups of the systems behind the
// confidential Selected Work entries. Rendered by app/blog/[slug]/page.tsx.

export type EngineeringPost = {
  title: string;
  date: string;
  kind: string;
  summary: string;
  content: string;
};

export const engineeringPosts: Record<string, EngineeringPost> = {
  "building-ai-agents-fast-and-grounded": {
    title: "Building AI Agents That Are Fast and Never Invent Numbers",
    date: "2026",
    kind: "Engineering Notes",
    summary: "Why LLM agents get slow and make up figures on real data, and the architecture that fixes both: exact aggregates, dataset handles, reconciliation gates and read-only subagents.",
    content: `
LLM agents are brilliant at deciding what to do next and surprisingly bad at doing arithmetic over real data. The moment you ask an agent for a report over thousands of rows, two problems show up at once: it gets slow, and it starts inventing numbers. This post is about fixing both, because in any business context a fabricated figure is worse than no figure at all. It gets pasted into a slide, then into a decision.

## Why this is a real engineering problem

A typical agent runs a loop: think, call a tool, read the result, think again. That loop is fine for small lookups. It falls apart on large datasets for two reasons.

### Failure mode 1: the serial agent

If a tool reads data in pages of a few hundred rows and each page takes a few seconds, a 12,000-row dataset takes many minutes. Worse, every later model call carries that whole dump in its context, so each step gets slower and more expensive. And because the model cannot tell whether a long-running call succeeded, it often repeats the exact same call.

### Failure mode 2: the confident estimator

The model rarely sees the full dataset. It sees a few chunks, then confidently produces totals, percentages and categories that look right and are not. Ask it for the sum of a column across a 3,000-row spreadsheet and it will happily give you a number that is off by two orders of magnitude.

Neither failure is the model's fault. They are architecture problems, and they have architecture fixes.

## How to build agents that are fast and grounded

### 1. Move aggregation out of the model

The model should decide which question to ask. Code should compute the answer. Give the agent tools that return exact aggregates (counts, sums, group-bys, filters) computed in the database or in a compute layer, never sampled.

\`\`\`python
@tool
def task_report(filters: TaskFilters, group_by: list[str]) -> DatasetHandle:
    """Exact aggregates computed in the database. Never sampled, never estimated."""
    rows = db.aggregate(filters=filters, group_by=group_by)
    return datasets.publish(rows)
\`\`\`

One well-designed aggregate endpoint can replace hundreds of paginated reads. It is the single biggest speed and accuracy win.

### 2. Pass handles, not numbers

Instead of dumping rows into the model's context, return a dataset handle: an id, the schema, the row count and a few preview rows. Render tables and charts on the server from the handle. The model writes "show dataset ds_42 as a bar chart", not 400 numbers. Re-typing is exactly where digits get transposed, so do not let the model re-type.

### 3. Put a reconciliation gate in front of every save

Before any generated artifact is saved, extract every number in it and check each one against the data actually retrieved in that turn, with a small tolerance for rounding and percentages. If a figure does not reconcile, reject the save and tell the model which number failed and why.

\`\`\`python
def unsupported_numbers(artifact: list[float], evidence: list[float], tol: float = 0.005) -> list[float]:
    def close(a: float, b: float) -> bool:
        return abs(a - b) <= tol * max(1.0, abs(b))
    return [n for n in artifact if not any(close(n, e) for e in evidence)]

bad = unsupported_numbers(extract_numbers(draft), turn_evidence)
if bad:
    raise ToolError(f"These figures are not supported by the retrieved data: {bad}")
\`\`\`

Ship it in warn mode first, measure how often it fires, then switch to enforce.

### 4. Fan out with read-only subagents

For multi-part questions, let a lead agent write short briefs and hand them to subagents that run in parallel. Wall-clock time becomes the slowest branch instead of the sum of all branches, and each subagent keeps a small, focused context.

Rules that keep subagents safe:

- Subagents get read-only tools. Only the lead agent writes.
- Cap the fan-out (four at a time is a good default) and give every subagent a timeout.
- Subagents return structured findings and dataset handles, not essays.
- The lead verifies findings before composing the final answer.

### 5. Teach the model your domain

Many "hallucinations" are really definitional errors. If the model does not know how your business defines a KPI, it will invent a plausible definition and compute that. A short domain primer in the system prompt (what each status means, how each KPI is calculated) removes a whole class of errors. Pin it with tests so it cannot silently drift.

### 6. Show progress and keep internal calls internal

Long tools should stream progress ("Reading records: 3,000 of 12,000") so users see work happening instead of a spinner. Any internal LLM call, such as a classifier or planner, must be tagged so its tokens never leak into the user-facing stream.

## How to know it is working

- Keep a set of golden questions with known answers and run them in CI.
- Track wall-clock time per report, tool calls per run, tokens per run, and the percentage of saves the reconciliation gate rejects.
- Watch for repeated identical tool calls. They usually mean a tool is too slow or returns too little feedback.

In one system I worked on, these changes took a 28-minute report down to about 40 seconds and corrected a headline KPI the model had been confidently inventing.

## Checklist

- Aggregates come from code, not from the model.
- The model passes dataset handles; the server renders the numbers.
- Every saved number reconciles against retrieved evidence.
- Subagents are read-only, bounded and return structured output.
- Domain definitions live in the prompt and are covered by tests.
- Long tools stream progress; internal LLM calls never reach the user.
`,
  },
  "every-llm-call-needs-a-budget": {
    title: "Every LLM Call Needs a Budget: Metering, Rate Limits and Admission Control",
    date: "2026",
    kind: "Engineering Notes",
    summary: "Why every team shipping LLM features needs a governance layer, and how to build metering, budgets, rate limits and cost reconciliation that never get in the way.",
    content: `
The first LLM feature in a product is easy to run: one team, one API key, one bill. Then a second team ships an agent, customers start running workflows on their own, and a runaway loop burns a week's budget overnight. At that point you need a governance layer, and every developer building on LLMs eventually has to build or adopt one. This post covers why, and how to build one that is accurate and never gets in the way.

## Why every LLM call needs governance

- **Cost is spiky and shared.** One agent stuck in a retry loop can cost more than every other caller combined.
- **Providers enforce limits per account.** Requests-per-minute and tokens-per-minute quotas are shared, so one noisy caller throttles everyone else.
- **Finance needs attribution.** "Which customer, which feature, which model cost what?" has to have an answer you can defend.
- **Some data can only go to approved models.** Data-residency rules may require that certain customers' traffic only reaches specific regions or self-hosted models.

A good governance layer answers three questions for every call: who is calling, are they allowed to, and what did it cost?

## How to build it well

### 1. Put identity on every call

Propagate tenant, organisation, agent and environment identity as metadata from the caller, through your LLM gateway, into the usage record. Anything that arrives without identity goes into an explicit "unattributed" bucket. Never guess an owner: billing the wrong customer is worse than admitting you do not know.

### 2. Admit at run start, and decide your failure policy explicitly

Check budgets and limits when a run starts, not halfway through it. Then decide what happens when the metering service itself is down. For most products the right answer is to fail open and alert, so an outage in billing never stops customers' work. Fail closed only on limits you have confirmed are hard.

\`\`\`python
async def admit(run: Run) -> Decision:
    try:
        return await metering.check(run.org, run.agent, run.model, timeout=0.5)
    except MeteringUnavailable:
        log.warning("metering unavailable, failing open", run_id=run.id)
        alerts.increment("admission.fail_open")
        return Decision.admit(reason="fail_open")
\`\`\`

### 3. Separate soft limits from hard limits

Soft limits notify; hard limits deny. Support both per organisation and per agent, and enforce RPM and TPM in sliding windows. Give operators a console to change limits without a deploy.

### 4. Never drop a usage event

Usage reporting must survive network blips and service outages. Write each event to a durable outbox with an idempotency key (for example run id plus call index), deliver at least once, and deduplicate on the receiving side. Bound the outbox and alert on its depth so a long outage is visible.

### 5. Watch your HTTP client under concurrency

A classic bug in async Python: creating a new HTTP client per call, or sharing one client across event loops. Under load this exhausts sockets (thousands in TIME_WAIT), latency climbs, and usage events silently fail to send. Keep one pooled, keep-alive client per event loop.

\`\`\`python
import asyncio
import httpx

_clients: dict[int, httpx.AsyncClient] = {}

def http_client() -> httpx.AsyncClient:
    loop_id = id(asyncio.get_running_loop())
    if loop_id not in _clients:
        _clients[loop_id] = httpx.AsyncClient(
            limits=httpx.Limits(max_connections=100, max_keepalive_connections=20),
            timeout=httpx.Timeout(10.0),
        )
    return _clients[loop_id]
\`\`\`

In my own measurements, this one change cut median latency by 3.3x and socket churn by 62% at 250 concurrent LLM calls.

### 6. Reconcile against the real bill

Your meter is a model of the bill, not the bill. Reconcile it daily against the provider's billing data or invocation logs, priced at exactly the same rates, including cache-read and cache-write tokens. The gap is a signal: it reveals traffic that bypasses your gateway, models you price wrongly, and callers you have not identified.

### 7. Treat model routing as policy

Express "which models and regions may this tenant's data reach" as data, not code. Enforce it twice: in the calling service, and again as a backstop in the gateway that rejects any non-compliant request. Defence in depth matters here because one forgotten code path is enough to break a residency promise.

## How to know it is working

- The gap between metered cost and the real bill trends towards zero.
- The unattributed share of spend shrinks month over month.
- The admission check adds a few milliseconds, not seconds, at p99.
- Outbox depth stays near zero, and every fail-open event raises an alert.

## Checklist

- Every call carries tenant, agent, model and environment identity.
- Unknown traffic is labelled unattributed, never guessed.
- Admission happens at run start, with an explicit fail-open policy.
- Usage events go through an idempotent, durable outbox.
- HTTP clients are pooled per event loop.
- Metered cost is reconciled daily against the provider bill.
- Model and region policy is enforced in both the caller and the gateway.
`,
  },
  "process-once-deliver-everywhere": {
    title: "Process Once, Deliver Everywhere: Reliable Scheduled Agent Pipelines",
    date: "2026",
    kind: "Engineering Notes",
    summary: "How to design fan-out pipelines that process expensive work once and deliver it to every subscriber without ever silently dropping a run.",
    content: `
Many products share a hidden shape: an expensive piece of work, such as parsing a long document and extracting structured data from it with an LLM, whose result many customers need. Doing that work once per customer multiplies cost and produces inconsistent answers. The better design is to process once centrally, publish the result to a feed, and deliver it to every subscriber. The hard part is not the processing; it is making delivery reliable enough that no customer ever silently misses an update.

## Why this architecture matters

- **Cost.** If one processing run costs a dollar of LLM time and a hundred customers need it, per-customer processing costs a hundred dollars. Process-once costs one.
- **Consistency.** Every subscriber receives the same extraction, so they are never confused by different answers to the same question.
- **Trust.** Scheduled delivery that drops a run is worse than no automation, because customers stop checking manually.

The shape in one line: producer, then a durable outbox, then a feed with stable IDs, then a scheduler that sweeps subscriptions, then delivery workers, then the subscriber's own store.

## How to build it well

### 1. Give every item a permanent global ID before publishing

Revisions, deduplication and cross-references all depend on stable identity. If an item does not have its global ID yet, the outbox should defer it rather than publish something that cannot be referenced later.

### 2. Use the outbox pattern

Write the event in the same transaction as the source change, and let a separate worker publish it. Never write to the database and the queue as two separate steps. Sooner or later one of them fails and the two disagree.

### 3. Build a scheduler that never loses a minute

A naive cron job that runs "if due now" loses every run that falls inside an outage. Track a high-water mark instead: each sweep evaluates every minute since the last completed one, oldest first, with a maximum backlog so recovery never turns into a storm. Tenants that fail for transient reasons go into a per-tenant backlog that is replayed later.

\`\`\`go
for m := lastDone.Add(time.Minute); !m.After(now); m = m.Add(time.Minute) {
	if now.Sub(m) > maxBacklog {
		abandoned++ // alert on this: it means real work was dropped
		continue
	}
	if err := evaluateMinute(ctx, m); err != nil {
		backlog.Add(tenantOf(err), m) // replay this tenant later
		continue
	}
	lastDone = m
}
\`\`\`

### 4. Retry the right things, and cache what you depend on

Retry transient failures (502, 503, 504 and timeouts) with a small retry budget and backoff. Never retry 4xx responses. Keep a stale-if-error copy of configuration and directory lookups, so a brief blip in a dependency does not cancel an entire sweep.

### 5. Deduplicate by content, not by time

Compute the dedupe digest over the content itself and exclude volatile fields such as timestamps or retrieval timing. If you include them, every tick looks "new" and every subscriber is re-delivered the same item.

### 6. Deliver parents before children

If deliveries form a graph (a document, its sections, the tasks derived from them), deliver in tiers so no child ever references a parent that does not exist yet. Children whose parents are missing are deferred and retried, not failed.

### 7. Bound failure loops

Content that fails deterministically must not retry forever, especially when every attempt costs an LLM run. Cap the attempts, record why each one failed, and alert. An unbounded retry loop is a silent bill.

### 8. Sandbox every agent run

Run each delivery agent in an isolated, short-lived sandbox (a container or a serverless task) with credentials scoped to exactly one subscriber. Measure the unit cost per run from day one, so you know your scaling limits before your customers find them.

### 9. Secure external subscribers properly

For subscribers outside your network, derive a key for each client from a master secret using HMAC. Verification is then stateless, rotation is simple, and every rejected token can be logged with its source, which turns "mystery 401s" into a ten-minute investigation.

## How to know it is working

Alert on the signals that mean customers are missing updates, not just on errors:

- Sweep failures at or above a threshold within five minutes.
- No completed sweep within ten minutes.
- Tenants skipped, and minutes abandoned (that one should always be zero).
- Deliveries accepted versus failed, and cost per delivery run.

## Checklist

- Global IDs exist before anything is published.
- The outbox is written in the same transaction as the change.
- The scheduler replays missed minutes, oldest first, with a bounded backlog.
- Transient errors are retried; 4xx responses never are.
- Dedupe digests ignore volatile fields.
- Deliveries are tiered, parents first.
- Deterministic failures have a retry cap and an alert.
- Agent runs are sandboxed and costed.
`,
  },
  "automated-accessibility-auditor": {
    title: "Why Accessibility Audits Should Be Automated, and How to Build an AI Auditor You Can Trust",
    date: "2026",
    kind: "Engineering Notes",
    summary: "Layering deterministic WCAG checks, accessibility-tree rules and LLM vision into an auditor that is fast, cheap and precise.",
    content: `
About one in six people worldwide live with a significant disability, according to the WHO. For them, a missing button label or low-contrast text is not a cosmetic bug; it is a locked door. Accessibility is also increasingly a legal requirement: the European Accessibility Act has applied since June 2025, and many other countries have similar laws. Yet most teams still audit accessibility by hand, sampling a few screens a couple of times a year, while the app changes every sprint. This post is about building an automated AI auditor that developers can actually trust.

## Why manual audits are not enough

- **Coverage.** A human auditor checks a sample of screens. Bugs live on the screens nobody sampled.
- **Speed.** An audit that takes weeks is out of date before the report is delivered.
- **Consistency.** Two auditors will not always agree on the same screen, and neither will two runs of a naive LLM prompt.

## Why this is hard to automate

WCAG success criteria come in three flavours, and each needs a different tool:

- **Deterministic:** contrast ratios, touch-target sizes, missing labels. These are maths and structure, not judgement.
- **Structural:** focus order, heading hierarchy, grouping. These can be read from the accessibility tree.
- **Judgement:** is this alt text meaningful, is this error message clear? Only here does a vision-capable LLM earn its cost.

Using pure LLM vision for everything is slow, expensive and inconsistent. Using pure rules misses everything that needs judgement. The answer is to layer them.

## How to build it

### 1. Capture the right evidence

For every screen, capture three things: a screenshot, the accessibility tree (the UI hierarchy with roles, labels and bounds), and an event log of focus and interaction. On Android, an AccessibilityService can read the active window's node tree and take screenshots. Upload each capture straight to object storage so the audit can run asynchronously.

### 2. Run deterministic checks first and the LLM last

Order the pipeline by cost. XPath queries over the tree catch clickable elements without labels, images without descriptions and inputs without hints. Pixel maths catches contrast and target-size failures. Only the criteria that need judgement go to the vision model.

\`\`\`python
def channel(c: int) -> float:
    c = c / 255
    return c / 12.92 if c <= 0.04045 else ((c + 0.055) / 1.055) ** 2.4

def luminance(rgb: tuple[int, int, int]) -> float:
    r, g, b = (channel(c) for c in rgb)
    return 0.2126 * r + 0.7152 * g + 0.0722 * b

def contrast_ratio(fg: tuple[int, int, int], bg: tuple[int, int, int]) -> float:
    hi, lo = sorted((luminance(fg), luminance(bg)), reverse=True)
    return (hi + 0.05) / (lo + 0.05)   # WCAG AA: 4.5 for body text, 3.0 for large text
\`\`\`

For target size, WCAG 2.2 (criterion 2.5.8, level AA) asks for at least 24 by 24 CSS pixels, and Android's own guidance recommends 48dp.

### 3. Fingerprint screens so you never pay twice

Hash the structure of the UI hierarchy, ignoring dynamic text, to recognise screens you have already audited. Skip vision calls for screens and criteria that are already decided, and pre-filter with XPath: a screen with no images never needs an image-alt-text check. These two ideas remove most of the wasted vision calls.

### 4. Model the audit as an explicit graph

Break the audit into nodes: ingest, triage, deterministic checks, vision checks, verification, deduplication and report. A graph framework such as LangGraph gives you per-node retries, checkpoints, and the ability to resume a half-finished audit instead of starting again.

### 5. Fight false positives on purpose

- Gate LLM findings on confidence, and send borderline ones to a second verification pass.
- Collapse the same defect seen on many screens into one canonical finding that lists every occurrence.
- Keep a hand-labelled set of screens and measure precision on every change.

### 6. Write reports people can act on

Every finding needs the criterion, its severity, the screen, an annotated screenshot, the element's path in the tree and a suggested fix. A developer should be able to go from report to pull request without asking a single question.

## How to know it is working

- Precision and recall against a hand-labelled set of screens.
- Cost per screen and screens audited per hour.
- The share of checks resolved deterministically rather than by the LLM.
- How quickly reported issues get fixed. This is the metric that actually matters to users.

## Checklist

- Capture the screenshot, accessibility tree and event log for every screen.
- Run rules and pixel maths before any LLM call.
- Fingerprint screens and pre-filter criteria.
- Run the audit as a resumable graph with per-node retries.
- Verify uncertain findings and deduplicate across screens.
- Every finding includes evidence and a fix.
`,
  },
  "agentic-rag-done-right": {
    title: "Agentic RAG Done Right: Grounded Retrieval with Access Control Built In",
    date: "2026",
    kind: "Engineering Notes",
    summary: "Why naive RAG breaks in production, and how to build retrieval that is permission-safe, fresh, exact and grounded.",
    content: `
The textbook RAG recipe is simple: embed every document, retrieve the top few chunks, and paste them into the prompt. It demos beautifully. In a real company it runs into four problems: permissions, freshness, exactness and cost. This post covers how to build retrieval for agents that is grounded, permission-safe and still fast.

## Why naive RAG breaks in production

- **Permissions.** If retrieval can return a document the user is not allowed to see, your assistant just leaked it. Filtering after retrieval is too late, because the text is already in the prompt.
- **Freshness.** Indexes fail silently. Uploads stop being indexed, nobody notices for weeks, and the assistant answers from stale or missing data.
- **Exactness.** Legal, financial and technical questions hinge on exact terms, numbers and clause references. Pure vector search is good at paraphrase and weak at exact matches.
- **Cost and latency.** Retrieving on every message, even "thanks!", wastes tokens and time.

## How to build it well

### 1. Let a planner decide whether and what to retrieve

Put a small, fast model (or simple rules) in front of retrieval. It decides whether the question needs documents at all, which sources to search and which terms to search for. This cuts cost and latency, and it improves recall because the search query is better than the raw chat message. Tag the planner's output as internal so it never streams to the user.

### 2. Pick the retrieval method that fits the question

Full-text search (BM25) is excellent for exact terms, identifiers and numbers. Vector search is good for semantic paraphrase. Hybrid search combines both when you need both. Do not default to vectors-only because a tutorial did.

### 3. Enforce access inside the query, and fail closed

Apply tenant and permission filters inside the search query itself, so documents the user cannot read are never retrieved at all. If the permission lookup fails, return nothing rather than everything.

\`\`\`python
def search(user: User, query: str, k: int = 8) -> list[Passage]:
    try:
        principals = permissions.principals_for(user)   # user id, roles, groups
    except PermissionServiceError:
        log.warning("permission lookup failed, returning no results", user=user.id)
        return []                                        # fail closed
    return index.search(
        query,
        k=k,
        filter={"tenant": user.tenant_id, "allowed_principals": principals},
    )
\`\`\`

Write tests that prove user A can never retrieve user B's private document, and run them on every change.

### 4. Make ingestion event-driven, with a reconciler as a safety net

Trigger indexing from storage events (upload, then a function, then the indexer) for speed. Events still get lost, so add a periodic, idempotent reconciler that compares the source of truth with the index and backfills anything missing. Use deterministic document IDs so re-indexing the same file is always safe.

### 5. Monitor the index like a production database

- Alert when the index has received no writes for longer than expected.
- Compare document counts in storage with document counts in the index.
- Track extraction failures: scanned PDFs need OCR, and spreadsheets often hide most of their data on sheets the parser never reads.

### 6. Ground every answer

Return passages with their source IDs, ask the model to cite them, and prefer quoting over paraphrasing for anything that will be acted on. If no passage supports an answer, the right answer is "I could not find this", not a guess.

## How to know it is working

- Freshness lag: the time from upload to searchable.
- Coverage: the percentage of stored documents that are indexed.
- Retrieval quality: recall at k on a labelled question set.
- Permission tests, all passing, all the time.
- Answer groundedness: the share of claims backed by a cited passage.

## Checklist

- A planner decides if, where and what to retrieve.
- Retrieval mode (full-text, vector or hybrid) matches the question type.
- Permission filters live inside the query and fail closed.
- Ingestion is event-driven, with an idempotent reconciler.
- The index has freshness and coverage alerts.
- Answers cite sources, and "not found" is an acceptable answer.
`,
  },
  "tenant-isolation-is-a-feature": {
    title: "Tenant Isolation Is a Feature: Building a Multi-Tenant Control Plane",
    date: "2026",
    kind: "Engineering Notes",
    summary: "Why a tenant_id column is not enough, and how to build a control plane that isolates every customer without becoming a single point of failure.",
    content: `
Every B2B customer eventually asks the same question: where is my data, and who else can see it? For customers in regulated industries it is the first question, not the last. Multi-tenancy is how SaaS products serve many customers from one platform, and tenant isolation is the feature that makes it trustworthy. This post covers why isolation deserves its own control plane, and how to build one that is safe without becoming a single point of failure.

## Why a tenant_id column is not enough

The cheapest model is one shared database where every row carries a tenant_id. It works until:

- **One missing WHERE clause** returns another customer's data. That is a breach, not a bug.
- **Noisy neighbours** mean one large tenant's queries slow everyone down.
- **Per-customer operations** such as backup, restore, export and deletion become surgery on a shared database.

The stronger models are schema-per-tenant, database-per-tenant and stack-per-tenant. Each step up costs more and isolates more. Whichever you choose, you need something that knows which tenant owns which resources and routes every request correctly. That is the control plane.

## Control plane versus data plane

The control plane is a registry of tenants, their resources and their lifecycle (registered, provisioning, active, suspended, purged). It provisions each tenant's data plane: a database, a storage bucket, a scoped cloud role and a search index. It publishes a routing snapshot, with no secrets in it, that every service consumes. The data plane is the tenant's actual stores. Keep the two strictly separate.

## How to build it well

### 1. Resolve the tenant once, at the edge of every service

Middleware resolves the tenant from trusted sources in a fixed priority order (a signed token claim, then a trusted internal header, then the host name) and binds it to the request context, so every downstream query uses that tenant's connections. Refuse ambiguity. Never fall back to a shared default.

\`\`\`python
async def tenant_middleware(request: Request, call_next):
    t = resolve_tenant(
        claim=signed_claim(request),
        header=trusted_header(request),
        host=request.url.hostname,
    )
    if t.conflict:
        return JSONResponse({"error": "tenant_conflict"}, status_code=409)
    if t.unknown:
        return JSONResponse({"error": "unknown_tenant"}, status_code=403)
    if not t.ready:
        return JSONResponse({"error": "tenant_not_ready"}, status_code=503)
    token = current_tenant.set(t)
    try:
        return await call_next(request)
    finally:
        current_tenant.reset(token)
\`\`\`

### 2. Apply the same rules in every language

If your services are written in Python, Go and TypeScript, the resolver exists three times, and three implementations drift. Keep a shared conformance corpus (JSON test cases of inputs and expected outcomes) and run it in every language's CI so all of them agree, always.

### 3. Give each tenant its own cloud credentials

Access each tenant's storage through its own narrowly scoped role, assumed per request with short-lived cached credentials. Then even an application bug cannot read another tenant's bucket, because the cloud provider refuses it.

### 4. Keep the control plane off the hot path

- Services cache the routing snapshot and refresh it cheaply (ETag and 304 responses).
- Tenant lookups never block the event loop.
- Health probes never depend on tenant resolution.
- If the control plane goes down, services keep serving from their last snapshot.

An outage of the registry must not become an outage of the product.

### 5. Migrate with copy, catch up, verify, cut over

To move a tenant from shared to dedicated storage: bulk copy, incremental catch-up, a final pass inside a short write freeze, verification of counts and checksums, a routing flip, and a rollback path you have actually tested. Make every step resumable, and rehearse on a pilot tenant first.

### 6. Back up per tenant, and verify the backups

Dump each tenant into its own bucket. "The job succeeded" is not verification; check size and checksums and run restore tests. Alert on any tenant without a recent backup, especially after you add a new database engine, because that is exactly when a backup job silently skips someone.

### 7. Never share credentials across environments

A staging or sandbox copy of a service must never reuse the production database role. If it does, a password reset in the sandbox takes production down. It sounds obvious, and it is one of the most common causes of multi-tenant outages.

### 8. Prove isolation continuously

Run automated isolation probes on a schedule: tenant A's tokens against tenant B's endpoints must fail, and cross-tenant queries must return nothing. Isolation you tested once is isolation you hope you still have.

## How to know it is working

- Isolation probes: 100% refused, on every run.
- Every request in your logs carries a resolved tenant.
- The control plane can go down without customers noticing.
- Every active tenant has a verified backup from the last day.

## Checklist

- Tenants are resolved at the edge, and ambiguity is refused.
- Resolvers in every language share one conformance corpus.
- Storage access uses per-tenant scoped roles.
- The routing snapshot is cached; the control plane is never on the hot path.
- Migrations are resumable and verified before cut-over.
- Per-tenant backups are verified, not just scheduled.
- No credentials are shared between environments.
- Isolation is probed continuously.
`,
  },
};
