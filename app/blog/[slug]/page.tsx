import { notFound } from "next/navigation";
import Link from "next/link";
import Image from "next/image";
import Navigation from "@/components/Navigation";

const blogPosts: Record<string, {
  title: string;
  projectTitle: string;
  date: string;
  content: string;
  image?: string;
}> = {
  "ai-email-agent-autonomous-outreach-system": {
    title: "AI Email Agent – Autonomous Outreach System",
    projectTitle: "AI Email Agent – Autonomous Outreach System",
    date: "2025",
    image: "/job-mailer.png",
    content: `
# AI Email Agent - Complete Documentation

## 📚 Table of Contents

1. [Overview](#overview)
2. [How It Works](#how-it-works)
3. [Architecture](#architecture)
4. [Installation & Setup](#installation--setup)
5. [Usage Guide](#usage-guide)
6. [Features](#features)
7. [Examples](#examples)
8. [Technical Details](#technical-details)
9. [Troubleshooting](#troubleshooting)
10. [Best Practices](#best-practices)

---

## Overview

The **AI Email Agent** is an intelligent email sending system that uses natural language processing to automatically find and send emails to companies. Instead of manually searching for email addresses, you simply tell the agent what you want in plain English, and it handles the rest.

### Key Capabilities

- 🤖 **Natural Language Processing**: Understands prompts like "Send a mail to microsoft"
- 🎯 **Smart Company Detection**: Automatically finds all emails associated with a company
- 📧 **Automated Email Sending**: Sends personalized emails via Gmail API
- 📎 **File Attachments**: Supports multiple attachments (resume, CV, cover letter)
- 🌐 **Web Interface**: Beautiful Streamlit-based web UI
- 💻 **CLI Interface**: Command-line interface for power users

### Use Cases

- Job applications to multiple companies
- Bulk email campaigns to specific industries
- Automated outreach to company employees
- Personalized mass emailing with attachments

---

## How It Works

### 1. Natural Language Processing

The agent uses **pattern matching** and **regex** to extract information from your prompts:

\`\`\`
User Input: "Send a mail to microsoft with subject 'Job Application'"

           ↓

Agent Extracts:

  - Company: "microsoft"
  - Subject: "Job Application"
  - Body: (from manual input or prompt)
\`\`\`

#### Extraction Patterns

The agent recognizes these patterns:

- \`"Send a mail to [company]"\` → Extracts company name
- \`"Send email to [company] company"\` → Extracts company name
- \`"subject: 'Your Subject'"\` → Extracts subject
- \`"attachments: file1.pdf file2.pdf"\` → Extracts file names
- \`"body: 'Your message'"\` → Extracts body

### 2. Company Email Discovery

Once the company name is extracted, the agent searches the email database:

\`\`\`
Company: "microsoft"

           ↓

Search Algorithm:

  1. Load all emails from emails_from_excel.txt
  2. Extract domain from each email (e.g., @microsoft.com)
  3. Match main domain part with company name
  4. Filter out personal emails (gmail.com, outlook.com, etc.)
  5. Return matching emails

           ↓

Result: [anand.subramanian@microsoft.com, asingh@microsoft.com, ...]
\`\`\`

#### Matching Logic

- **Exact Match**: "microsoft" matches \`@microsoft.com\` exactly
- **Case Insensitive**: "Microsoft", "MICROSOFT", "microsoft" all work
- **Domain Extraction**: Extracts main domain part (before first dot)
- **Personal Email Filter**: Excludes gmail.com, outlook.com, yahoo.com, etc.

### 3. Email Composition

The agent creates email messages with:

- **To**: Company email addresses (found automatically)
- **From**: Your authenticated Gmail account
- **Subject**: Extracted from prompt or manual input
- **Body**: Extracted from prompt or manual input
- **Attachments**: Files uploaded or specified in prompt

### 4. Email Sending

Emails are sent via **Gmail API**:

\`\`\`
1. Authenticate with Gmail (OAuth2)
2. Create MIME message with attachments
3. Encode message to base64
4. Send via Gmail API
5. Log results (sent/failed)
6. Update tracking files
\`\`\`

### 5. Tracking & Logging

All email activities are tracked:

- **sent_mail.txt**: Successfully sent emails
- **not_sent.txt**: Failed emails with error reasons
- **mail_log.csv**: Detailed logs with timestamps
- **sent_mail_report.xlsx**: Excel report with all details

---

## Architecture

### System Components

\`\`\`
┌─────────────────────────────────────────────────────────┐
│                  AI Email Agent                         │
├─────────────────────────────────────────────────────────┤
│                                                         │
│  ┌──────────────┐         ┌──────────────┐            │
│  │   CLI Mode   │         │  Web Mode    │            │
│  │ (Terminal)   │         │ (Streamlit)  │            │
│  └──────┬───────┘         └──────┬───────┘            │
│         │                        │                     │
│         └────────┬───────────────┘                     │
│                  │                                     │
│         ┌────────▼────────┐                           │
│         │  Prompt Parser  │                           │
│         │  (NLP Engine)   │                           │
│         └────────┬────────┘                           │
│                  │                                     │
│         ┌────────▼────────┐                           │
│         │ Email Finder    │                           │
│         │ (Company Match) │                           │
│         └────────┬────────┘                           │
│                  │                                     │
│         ┌────────▼────────┐                           │
│         │ Email Composer  │                           │
│         │ (MIME Builder) │                           │
│         └────────┬────────┘                           │
│                  │                                     │
│         ┌────────▼────────┐                           │
│         │ Gmail API       │                           │
│         │ (Email Sender)  │                           │
│         └────────┬────────┘                           │
│                  │                                     │
│         ┌────────▼────────┐                           │
│         │ Logger          │                           │
│         │ (Tracking)      │                           │
│         └─────────────────┘                           │
│                                                         │
└─────────────────────────────────────────────────────────┘
\`\`\`

### File Structure

\`\`\`
job-mailer/
├── email_agent_cli.py          # CLI interface
├── email_agent_streamlit.py     # Web interface
├── send_mails_gmail_api.py     # Gmail API integration
├── emails_from_excel.txt       # Email database
├── credentials.json            # Gmail API credentials
├── token.json                  # Auth token (auto-generated)
├── sent_mail.txt              # Sent emails log
├── not_sent.txt                # Failed emails log
├── mail_log.csv                # Detailed CSV log
├── sent_mail_report.xlsx        # Excel report
└── uploads/                    # Temporary file storage
\`\`\`

### Data Flow

\`\`\`
User Prompt
    ↓
[Prompt Parser] → Extract: company, subject, body, attachments
    ↓
[Email Finder] → Search emails_from_excel.txt
    ↓
[Email Composer] → Create MIME message
    ↓
[Gmail API] → Send email
    ↓
[Logger] → Update logs and tracking files
\`\`\`

---

## Installation & Setup

### Prerequisites

- Python 3.7 or higher
- Gmail account
- Google Cloud Project with Gmail API enabled

### Step 1: Install Dependencies

\`\`\`bash
pip install -r requirements.txt
\`\`\`

Required packages:

- \`google-auth>=2.0.0\`
- \`google-auth-oauthlib>=0.5.0\`
- \`google-api-python-client>=2.0.0\`
- \`streamlit>=1.28.0\` (for web interface)

### Step 2: Gmail API Setup

1. **Create Google Cloud Project**

   - Go to [Google Cloud Console](https://console.cloud.google.com/)
   - Create a new project or select existing one

2. **Enable Gmail API**

   - Navigate to "APIs & Services" > "Library"
   - Search for "Gmail API"
   - Click "Enable"

3. **Create OAuth Credentials**

   - Go to "APIs & Services" > "Credentials"
   - Click "Create Credentials" > "OAuth client ID"
   - Choose "Desktop app" as application type
   - Download credentials as \`credentials.json\`
   - Place \`credentials.json\` in project directory

4. **Configure OAuth Consent Screen**

   - Go to "APIs & Services" > "OAuth consent screen"
   - Choose "External" (for personal use)
   - Fill required fields
   - Add your email as test user

### Step 3: Email Database Setup

1. **Prepare Email List**

   - Create \`emails_from_excel.txt\` file
   - Add one email per line:

     \`\`\`
     email1@company.com
     email2@company.com
     email3@company.com
     \`\`\`

2. **Email Format**

   - One email per line
   - No headers or extra formatting
   - UTF-8 encoding

### Step 4: First Run Authentication

When you run the agent for the first time:

1. **CLI Mode**:

   \`\`\`bash
   python email_agent_cli.py
   \`\`\`

   - Browser will open for authentication
   - Grant permissions
   - \`token.json\` will be created automatically

2. **Web Mode**:

   \`\`\`bash
   streamlit run email_agent_streamlit.py
   \`\`\`

   - Click "Authenticate with Gmail" in sidebar
   - Grant permissions
   - \`token.json\` will be created automatically

---

## Usage Guide

### CLI Mode (Command Line)

#### Starting the Agent

\`\`\`bash
python email_agent_cli.py
\`\`\`

#### Basic Commands

**1. Simple Email**

\`\`\`
🤖 Agent> Send a mail to microsoft with subject 'Job Application' and body 'I am interested in...'
\`\`\`

**2. With Attachments**

\`\`\`
🤖 Agent> Send email to google with attachments resume.pdf cover_letter.pdf
\`\`\`

**3. Interactive Multi-line Body**

\`\`\`
🤖 Agent> Send a mail to amazon with subject 'Backend Engineer Role'

[Enter body when prompted, type END when done]
\`\`\`

**4. List Available Companies**

\`\`\`
🤖 Agent> list companies
\`\`\`

**5. Help**

\`\`\`
🤖 Agent> help
\`\`\`

**6. Exit**

\`\`\`
🤖 Agent> exit
\`\`\`

### Web Mode (Streamlit)

#### Starting the Web Interface

\`\`\`bash
streamlit run email_agent_streamlit.py
\`\`\`

The app will open at \`http://localhost:8501\`

#### Step-by-Step Usage

1. **Authenticate**

   - Click "🔑 Authenticate with Gmail" in sidebar
   - Grant permissions in browser
   - Wait for "✅ Authenticated successfully!"

2. **Enter Prompt**

   - Type in main text area: \`Send a mail to microsoft\`
   - Or: \`Send email to apple company\`

3. **Fill Optional Fields** (if needed)

   - Expand "📋 Manual Input Fields"
   - Enter Subject and Body manually

4. **Upload Attachments** (optional)

   - Click "Upload Resume/CV/Cover Letter"
   - Select files (PDF, DOC, DOCX, TXT)

5. **Send Emails**

   - Click "🚀 Send Emails"
   - Review preview
   - Check confirmation checkbox
   - Emails send automatically

---

## Features

### 1. Natural Language Processing

**What it does:**

- Understands plain English prompts
- Extracts company names, subjects, bodies, attachments
- Handles variations in phrasing

**Examples:**

- ✅ "Send a mail to microsoft"
- ✅ "Send email to apple company"
- ✅ "Send mail to google with subject 'Job Application'"
- ✅ "all microsoft mails"

### 2. Smart Company Matching

**What it does:**

- Finds all emails associated with a company
- Matches exact domain names only
- Filters out personal email domains

**How it works:**

- Extracts main domain part (e.g., "microsoft" from "@microsoft.com")
- Matches exactly (case-insensitive)
- Returns all matching emails

**Example:**

\`\`\`
Input: "microsoft"

Matches: @microsoft.com, @microsoft.co.uk
Does NOT match: @microservices.com, @microsoftstore.com
\`\`\`

### 3. Multi-Attachment Support

**Supported formats:**

- PDF (.pdf)
- Word documents (.doc, .docx)
- Text files (.txt)
- Images (.jpg, .jpeg, .png)

**Usage:**

- Upload multiple files at once
- Files attached to all emails
- Automatic MIME type detection

### 4. Email Tracking

**Tracking files:**

- \`sent_mail.txt\`: Successfully sent emails
- \`not_sent.txt\`: Failed emails with reasons
- \`mail_log.csv\`: Detailed logs with timestamps
- \`sent_mail_report.xlsx\`: Excel report

**Information tracked:**

- Email address
- Send status (SENT/FAILED/DELIVERY_FAILED)
- Timestamp
- Gmail message ID
- Error messages

### 5. Error Handling

**Types of errors handled:**

- **Rate Limiting**: Automatic retry with delays
- **Delivery Failures**: Invalid addresses logged separately
- **Network Errors**: Temporary failures retried
- **Authentication Errors**: Clear error messages

### 6. Progress Tracking

**Web Interface:**

- Real-time progress bar
- Status updates per email
- Success/failure counts

**CLI Interface:**

- Per-email status messages
- Batch progress indicators
- Final summary statistics

---

## Examples

### Example 1: Simple Job Application

**CLI:**

\`\`\`
🤖 Agent> Send a mail to microsoft with subject 'Software Engineer Application' and body 'I am interested in the Software Engineer position at Microsoft...'
\`\`\`

**Web:**

1. Enter prompt: \`Send a mail to microsoft\`
2. Subject: \`Software Engineer Application\`
3. Body: \`I am interested...\`
4. Upload: \`resume.pdf\`
5. Click Send

**Result:**

- Finds 6 Microsoft emails
- Sends personalized email to each
- Attaches resume
- Logs all activities

### Example 2: Bulk Application to Multiple Companies

**CLI:**

\`\`\`
🤖 Agent> Send email to google
[Enter body when prompted]
END
🤖 Agent> Send email to amazon
[Enter body when prompted]
END
\`\`\`

**Web:**

- Repeat process for each company
- Each company's emails found automatically
- Same body/attachments used

### Example 3: Custom Email with Multiple Attachments

**CLI:**

\`\`\`
🤖 Agent> Send mail to apple with subject 'ML Engineer Position' and attachments resume.pdf cover_letter.pdf portfolio.pdf
\`\`\`

**Web:**

1. Prompt: \`Send mail to apple\`
2. Subject: \`ML Engineer Position\`
3. Upload: \`resume.pdf\`, \`cover_letter.pdf\`, \`portfolio.pdf\`
4. Send

### Example 4: Finding Company Emails

**CLI:**

\`\`\`
🤖 Agent> list companies
\`\`\`

**Output:**

\`\`\`
📋 Found 6388 companies in email database:

  • Microsoft
  • Google
  • Amazon
  • Apple
  ... and 6384 more
\`\`\`

---

## Technical Details

### Prompt Parsing Algorithm

\`\`\`python
def extract_company_name(prompt: str) -> Optional[str]:
    patterns = [
        r"(?:all\\s+)?([a-zA-Z0-9]+)\\s+(?:mails?|emails?)",
        r"to\\s+(?:all\\s+)?([a-zA-Z0-9]+)",
        r"send\\s+(?:a\\s+)?(?:mail|email)\\s+to\\s+([a-zA-Z0-9]+)",
        # ... more patterns
    ]
    # Match patterns and extract company name
\`\`\`

### Company Matching Algorithm

\`\`\`python
def find_company_emails(company_name: str, all_emails: List[str]) -> List[str]:
    for email in all_emails:
        domain = email.split("@")[1].lower()
        domain_parts = domain.split(".")
        main_domain = domain_parts[0]
        
        if main_domain == company_name.lower():
            matching_emails.append(email)
    return matching_emails
\`\`\`

### Email Sending Process

1. **Message Creation**

   \`\`\`python
   message = MIMEMultipart()
   message["To"] = recipient_email
   message["Subject"] = subject
   message.attach(MIMEText(body, "plain"))
   # Add attachments
   \`\`\`

2. **Encoding**

   \`\`\`python
   raw_message = base64.urlsafe_b64encode(message.as_bytes()).decode()
   \`\`\`

3. **Sending**

   \`\`\`python
   service.users().messages().send(
       userId="me",
       body={"raw": raw_message}
   ).execute()
   \`\`\`

### Session State Management (Web Interface)

\`\`\`python
# Initialize
st.session_state.email_preview_data = None
st.session_state.sending_emails = False

# Store preview
st.session_state.email_preview_data = {
    'company_name': company_name,
    'company_emails': company_emails,
    'subject': subject,
    'body': body,
    'attachment_paths': attachment_paths
}

# Trigger sending
if confirm:
    st.session_state.sending_emails = True
    st.rerun()
\`\`\`

---

## Troubleshooting

### Issue: "No emails found for company"

**Possible causes:**

- Company name doesn't match email domains
- Company emails not in database
- Typo in company name

**Solutions:**

1. Check available companies: \`list companies\`
2. Use exact company name (e.g., "microsoft" not "Microsoft Corporation")
3. Verify emails exist in \`emails_from_excel.txt\`

### Issue: "Gmail service not available"

**Possible causes:**

- Not authenticated
- Token expired
- Credentials file missing

**Solutions:**

1. Re-authenticate (click "Authenticate with Gmail")
2. Check \`credentials.json\` exists
3. Delete \`token.json\` and re-authenticate

### Issue: "Emails not sending after confirmation"

**Possible causes:**

- Gmail service not initialized
- Rate limiting
- Network issues

**Solutions:**

1. Check authentication status
2. Verify Gmail API is enabled
3. Check error messages in console
4. Review \`not_sent.txt\` for delivery failures

### Issue: "Wrong company emails matched"

**Possible causes:**

- Company name too generic
- Matching algorithm too broad

**Solutions:**

1. Use specific company name
2. Check preview before sending
3. Verify matched emails in preview

### Issue: "File upload not working"

**Possible causes:**

- File format not supported
- File too large
- Permission issues

**Solutions:**

1. Use supported formats: PDF, DOC, DOCX, TXT
2. Check file size (Gmail limit: 25MB)
3. Ensure file permissions are correct

### Issue: "Streamlit not found"

**Solution:**

\`\`\`bash
# Use Python module instead
python -m streamlit run email_agent_streamlit.py

# Or add to PATH
$env:Path += ";V:\\Aviral\\job-mailer\\Scripts"
\`\`\`

---

## Best Practices

### 1. Company Name Usage

✅ **Good:**

- "microsoft"
- "google"
- "apple"

❌ **Avoid:**

- "Microsoft Corporation" (too long)
- "MS" (too short/ambiguous)
- "microsoft inc" (unnecessary suffix)

### 2. Email Body

✅ **Good:**

- Clear and concise
- Personalized when possible
- Professional tone
- Include relevant details

❌ **Avoid:**

- Generic templates
- Too long (keep under 500 words)
- Unprofessional language

### 3. Attachments

✅ **Good:**

- PDF format (universal)
- Named clearly (e.g., "John_Doe_Resume.pdf")
- Reasonable file size (< 5MB)
- Multiple files when needed

❌ **Avoid:**

- Very large files (> 10MB)
- Unclear file names
- Too many files (> 5)

### 4. Batch Sending

✅ **Good:**

- Send to one company at a time
- Review preview before sending
- Monitor rate limits
- Check logs regularly

❌ **Avoid:**

- Sending to too many companies at once
- Ignoring error messages
- Not reviewing previews

### 5. Security

✅ **Good:**

- Keep \`credentials.json\` secure
- Don't commit \`token.json\` to git
- Use environment variables for sensitive data
- Review sent emails regularly

❌ **Avoid:**

- Sharing credentials
- Committing secrets to version control
- Using on untrusted networks

### 6. Testing

✅ **Good:**

- Test with small batches first
- Verify email format before bulk sending
- Check preview carefully
- Monitor first few sends

❌ **Avoid:**

- Sending to hundreds without testing
- Not checking preview
- Ignoring error messages

---

## Advanced Usage

### Custom Email Templates

Create templates in your email body:

\`\`\`python
body = """
Dear Hiring Manager,

I am writing to apply for the {position} role at {company}.

[Your content here]

Best regards,

{your_name}
"""
\`\`\`

### Batch Processing

Process multiple companies:

\`\`\`python
companies = ["microsoft", "google", "amazon"]

for company in companies:
    # Use agent for each company
    pass
\`\`\`

### Integration with Other Tools

The agent can be integrated with:

- Job board APIs
- CRM systems
- Email marketing platforms
- Analytics tools

---

## API Reference

### Main Functions

#### \`extract_company_name(prompt: str) -> Optional[str]\`

Extracts company name from natural language prompt.

#### \`find_company_emails(company_name: str, all_emails: List[str]) -> List[str]\`

Finds all emails associated with a company.

#### \`send_emails(service, emails: List[str], subject: str, body: str, attachment_paths: List[str]) -> Tuple[int, int]\`

Sends emails to list of recipients. Returns (sent_count, failed_count).

#### \`get_gmail_service() -> Service\`

Authenticates and returns Gmail API service object.

---

## FAQ

**Q: Can I send to personal emails?**

A: No, the agent filters out personal email domains (gmail.com, outlook.com, etc.) to focus on company emails only.

**Q: How many emails can I send?**

A: Gmail has daily sending limits (typically 500-2000 per day). The agent respects these limits.

**Q: Can I customize the email format?**

A: Yes, you can customize subject and body. The agent uses plain text format.

**Q: What if I make a mistake?**

A: Always review the preview before sending. Once sent, emails cannot be unsent, but you can track them in logs.

**Q: Can I use this for spam?**

A: No. This tool is intended for legitimate business communications. Follow email marketing laws (CAN-SPAM, GDPR).

**Q: How do I update the email database?**

A: Simply edit \`emails_from_excel.txt\` and add/remove emails (one per line).

---

## Support & Contributing

### Getting Help

1. Check this documentation
2. Review error messages
3. Check log files for details
4. Review troubleshooting section

### Contributing

To improve the agent:

1. Fork the repository
2. Make changes
3. Test thoroughly
4. Submit pull request

---

## License & Disclaimer

This tool is provided as-is for personal and business use. Users are responsible for:

- Complying with email marketing laws
- Respecting recipient privacy
- Following Gmail Terms of Service
- Using the tool ethically

**Disclaimer:** The authors are not responsible for misuse of this tool or any consequences arising from its use.

---

## Version History

- **v1.0** (2026-01-23): Initial release
  - CLI interface
  - Web interface (Streamlit)
  - Natural language processing
  - Gmail API integration
  - Email tracking and logging

---

**Last Updated:** January 23, 2026

**Documentation Version:** 1.0

---

*For questions or issues, please refer to the troubleshooting section or check the log files for detailed error information.*
    `.trim(),
  },
  "autonomous-financial-analysis-trading-agent": {
    title: "Autonomous Financial Analysis & Trading Agent",
    projectTitle: "Autonomous Financial Analysis & Trading Agent",
    date: "2025",
    image: "/finance.png",
    content: `
# Financial Analysis & Trading Agent

# Complete Project Documentation

# Architecture, System Design & Code Execution

================================================================================

## TABLE OF CONTENTS

================

1. Project Overview
2. System Architecture
3. Component Architecture
4. Data Flow & Execution Flow
5. Technology Stack
6. Detailed Component Breakdown
7. Code Execution Flow
8. Deployment Architecture
9. Key Features & Capabilities
10. Future Enhancements
11. System Design Principles
12. Data Structures
13. API Integrations
14. Security Considerations
15. Troubleshooting Guide
16. Conclusion

================================================================================

## 1. PROJECT OVERVIEW

================================================================================

**PROJECT NAME:** Financial Analysis & Trading Agent

**TYPE:** AI-Powered Trading System

**DEPLOYMENT:** Streamlit Web Application (Cloud-Ready)

**LANGUAGE:** Python 3.11+

**FRAMEWORK:** LangGraph (Stateful Agent Workflows)

**PURPOSE:**

--------

An intelligent AI-powered trading agent that:

- Analyzes market data using LLM (Groq)
- Builds trading strategies automatically
- Backtests strategies on historical data
- Executes paper trades via Alpaca API
- Tracks performance and learns from results

**KEY CAPABILITIES:**

-----------------

✓ Real-time market data fetching (Alpaca API + yfinance fallback)
✓ AI-powered market analysis (Groq LLM)
✓ Automated strategy generation
✓ Historical backtesting
✓ Paper trading execution
✓ Performance tracking and metrics
✓ Self-improvement suggestions

## Requirements & Technology Stack

### Python 3.11+ (Tested with Python 3.14)

**WHY**:** Modern Python features, better performance, type hints support

**WHERE USED**: Entire project is Python-based

### LangChain & LangGraph

**WHY**:**
- LangChain provides LLM abstraction layer
- LangGraph enables stateful agent workflows
- Makes it easy to switch between LLM providers
- Provides structured way to build multi-step agents

**WHERE USED:**
- agents/trading_agent.py: Main workflow orchestration
- strategies/strategy_builder.py: LLM-powered analysis
- llm/llm_provider.py: Multi-provider LLM abstraction

### Alpaca Trade API

**WHY:**
- Free paper trading account
- Real market data (with limitations on free tier)
- Professional-grade trading API
- No real money risk

**WHERE USED:**
- data/market_data_fetcher.py: Fetches historical and real-time data
- trading/paper_trader.py: Executes paper trades

### yFinance (Fallback)

**WHY:**
- Free alternative when Alpaca fails
- No API keys required
- Good for historical data
- Handles SIP subscription issues

**WHERE USED:**
- data/market_data_fetcher.py: Fallback data source

### LLM Providers (Multiple Options)

**WHY MULTIPLE OPTIONS:**
- Ollama: Free, local, privacy-focused, no API limits
- Hugging Face: Free API tier, many models
- Groq: Very fast inference, free tier
- OpenAI: Best quality, but paid

**WHERE USED:**
- llm/llm_provider.py: Unified provider abstraction
- strategies/strategy_builder.py: Market analysis and strategy building

### InfluxDB (Optional)

**WHY:**
- Time-series database optimized for financial data
- Stores price data, trades, performance metrics
- Optional - system works without it (in-memory fallback)

**WHERE USED:**
- data/database.py: Stores all time-series data

### Rich Library

**WHY:**
- Beautiful terminal output
- Tables, panels, colors
- Progress bars
- Professional CLI interface

**WHERE USED:**
- cli/interface.py: All CLI display logic

## Architecture & Design

### Project Structure

The project follows a modular architecture:

**Main Components:**
- agents/trading_agent.py: Main LangGraph agent (orchestrates workflow)
- cli/interface.py: Beautiful CLI interface
- data/market_data_fetcher.py: Alpaca/yfinance integration
- data/database.py: InfluxDB/in-memory storage
- llm/llm_provider.py: Multi-LLM provider abstraction
- strategies/strategy_builder.py: LLM-powered strategy generation
- simulation/backtester.py: Backtesting engine
- trading/paper_trader.py: Alpaca paper trading
- config.py: Configuration management
- main.py: Entry point

### LangGraph Workflow (7 Nodes)

The agent follows a stateful workflow with 7 nodes:

1. **FETCH_DATA** → Fetches market data for symbols
2. **ANALYZE_DATA** → LLM analyzes each symbol
3. **BUILD_STRATEGY** → LLM creates trading strategy
4. **SIMULATE_STRATEGY** → Backtests on historical data
5. **EXECUTE_TRADES** → Paper trades (if backtest positive)
6. **EVALUATE_PERFORMANCE** → Calculates metrics
7. **SELF_IMPROVE** → LLM suggests improvements

### State Management

The agent uses a TypedDict for state management, tracking symbols, market data, analysis results, strategy, backtest results, execution plans, performance metrics, iteration count, and errors.

## Complete Code Walkthrough

### Entry Point: main.py

**EXECUTION FLOW:**
1. Parses command-line arguments for symbols
2. Initializes CLI interface
3. Creates TradingAgent instance
4. Runs workflow with symbols
5. Displays results using CLI

### Node 1: FETCH_DATA

**WHAT IT DOES:**
- Fetches historical price data for each symbol
- Calculates technical indicators (SMA, volatility, price change)
- Stores data in database
- Prepares data for analysis

**CODE LOCATION:** agents/trading_agent.py, _fetch_data_node()

The data fetcher tries Alpaca first, then falls back to yfinance if needed. It uses 60+ day old data to avoid SIP subscription restrictions on free Alpaca accounts.

### Node 2: ANALYZE_DATA

**WHAT IT DOES:**
- Uses LLM to analyze market data for each symbol
- Determines sentiment (bullish/bearish/neutral)
- Extracts entry/target prices
- Calculates confidence levels
- Provides reasoning

**CODE LOCATION:** agents/trading_agent.py, _analyze_data_node()
                        strategies/strategy_builder.py, analyze_market_data()

The LLM receives formatted market data including recent prices, technical indicators, and price changes, then provides analysis with sentiment and confidence scores.

### Node 3: BUILD_STRATEGY

**WHAT IT DOES:**
- Combines all symbol analyses into a trading strategy
- Allocates capital based on sentiment and confidence
- Defines entry/exit conditions
- Sets position sizes

**CODE LOCATION:** agents/trading_agent.py, _build_strategy_node()
                        strategies/strategy_builder.py, build_strategy()

The strategy builder uses LLM to create a cohesive trading strategy from all symbol analyses, with capital allocation based on sentiment (bullish gets higher allocation) and confidence levels.

### Node 4: SIMULATE_STRATEGY (Backtesting)

**WHAT IT DOES:**
- Simulates strategy on historical data
- Executes trades day-by-day
- Calculates returns, win rate, trade count
- Validates strategy before live trading

**CODE LOCATION:** agents/trading_agent.py, _simulate_strategy_node()
                        simulation/backtester.py, run_backtest()

The backtester simulates day-by-day, checking entry conditions (flexible 5% tolerance on entry price) and exit conditions (target price or 10% stop loss). It tracks all trades and calculates final performance metrics.

### Node 5: EXECUTE_TRADES

**WHAT IT DOES:**
- Executes paper trades on Alpaca (if backtest positive)
- Places buy orders for recommended symbols
- Manages position sizes
- Tracks executed vs skipped trades

**CODE LOCATION:** agents/trading_agent.py, _execute_trades_node()
                        trading/paper_trader.py, execute_buy_order()

Only executes if backtest shows positive returns. Checks buying power, places market orders via Alpaca API, and stores trades in database.

### Node 6: EVALUATE_PERFORMANCE

**WHAT IT DOES:**
- Calculates portfolio metrics
- Gets account summary from Alpaca
- Stores performance data
- Tracks portfolio value, cash, positions

**CODE LOCATION:** agents/trading_agent.py, _evaluate_performance_node()

Tracks portfolio value, backtest returns, win rate, and stores metrics for future analysis.

### Node 7: SELF_IMPROVE

**WHAT IT DOES:**
- Uses LLM to analyze performance
- Suggests improvements for strategy
- Provides actionable recommendations
- Can be used in future iterations

**CODE LOCATION:** agents/trading_agent.py, _self_improve_node()

The LLM analyzes backtest results, portfolio performance, and suggests improvements for entry/exit criteria, position sizing, risk management, and symbol selection.

## How Everything Works Together

### Complete Execution Flow

**STEP 1: USER RUNS COMMAND**
User executes: \`python main.py --symbols "AAPL,MSFT,TSLA"\`

**STEP 2: AGENT INITIALIZATION**
TradingAgent creates all components: MarketDataFetcher, TimeSeriesDB, StrategyBuilder, Backtester, PaperTrader, and builds the LangGraph workflow.

**STEP 3: WORKFLOW EXECUTION**
The workflow executes all 7 nodes sequentially:
- Fetch data from Alpaca/yfinance
- Analyze each symbol with LLM
- Build strategy from analyses
- Backtest strategy on historical data
- Execute paper trades (if positive)
- Evaluate performance metrics
- Get improvement suggestions

**STEP 4: RESULTS DISPLAY**
CLI displays all results with beautiful formatting using Rich library.

## Features & Capabilities

### AI-Powered Analysis
- Uses LLMs to analyze market data
- Understands context and relationships
- Provides reasoning for decisions
- Adapts to market conditions

### Multi-LLM Support
Supports 4 LLM providers:
1. **Ollama** (Free, Local, Recommended) - No API limits, privacy-focused
2. **Hugging Face** (Free API) - Many models available
3. **Groq** (Free Tier, Fast) - Very fast inference
4. **OpenAI** (Paid) - Best quality

### Flexible Backtesting
- Simulates strategies on historical data
- Flexible entry conditions (5% tolerance)
- Fallback logic for missing prices
- Calculates returns, win rate, trade count

### Paper Trading
- Risk-free trading simulation
- Real market prices
- Real-time execution
- Position tracking

### Beautiful CLI
- Rich library for formatting
- Color-coded output
- Tables and panels
- Progress indicators

## Setup & Configuration

### Installation Steps

1. Install Python 3.11+
2. Clone repository
3. Install dependencies: \`pip install -r requirements.txt\`
4. Copy env.example to .env
5. Configure API keys in .env
6. Run: \`python main.py\`

### Environment Variables (.env)

**Required:**
- ALPACA_API_KEY: Your Alpaca API key
- ALPACA_SECRET_KEY: Your Alpaca secret key

**LLM Provider (choose one):**
- LLM_PROVIDER: ollama, huggingface, groq, or openai
- OLLAMA_MODEL: llama3.2 (if using Ollama)
- HUGGINGFACE_API_KEY: (if using Hugging Face)
- GROQ_API_KEY: (if using Groq)
- OPENAI_API_KEY: (if using OpenAI)

**Optional:**
- INFLUXDB_TOKEN: For data persistence
- INITIAL_CAPITAL: Starting capital (default: 100000)
- SYMBOLS: Default symbols to analyze

## Usage Examples

### Basic Usage

\`\`\`bash
# Run with default symbols from .env
python main.py

# Run with custom symbols
python main.py --symbols "AAPL,MSFT,TSLA"

# Run with multiple symbols
python main.py --symbols "AAPL,MSFT,GOOGL,AMZN,TSLA"
\`\`\`

### Windows Quick Start

\`\`\`bash
# Double-click:
start_trading_agent.bat          # Uses default symbols
start_trading_agent_custom.bat   # Prompts for symbols
\`\`\`

## Troubleshooting & Common Issues

### Issue: "Python is not installed"
**SOLUTION:** Install Python 3.11+ from python.org. Make sure to check "Add Python to PATH"

### Issue: "Module not found"
**SOLUTION:** Run \`pip install -r requirements.txt\`. Use virtual environment: \`python -m venv venv\`

### Issue: "Ollama not found"
**SOLUTION:** Install from ollama.ai. Run \`ollama serve\` in terminal. Download model: \`ollama pull llama3.2\`

### Issue: "Alpaca API error"
**SOLUTION:** Check API keys in .env. Verify paper trading account is active. Free accounts have data limitations (use older dates)

### Issue: "Backtest shows 0% return"
**SOLUTION:** Check entry conditions in strategy. Verify historical data is available. See issues/14-fixed-backtest-zero-trades.md

### Fixes Applied

1. Flexible entry price matching (5% tolerance)
2. Fallback entry logic for bullish stocks
3. Improved date matching
4. Better error handling
5. Rate limiting for API calls

## Future Enhancements

Potential improvements include:
- Real-time streaming data
- More technical indicators
- Machine learning models
- Web dashboard
- Mobile app
- More sophisticated risk management
- Portfolio optimization
- Multi-timeframe analysis
- News sentiment analysis
- Social media sentiment

## Conclusion

This Financial Analysis & Trading Agent demonstrates:

- How to build AI agents with LangGraph
- Integration of LLMs for financial analysis
- Real market data integration
- Backtesting and paper trading
- Beautiful CLI interfaces
- Production-ready error handling

The project is fully functional and can be extended with additional features as needed. All code is well-documented and follows best practices.

### Key Takeaways

1. LangGraph enables stateful agent workflows
2. LLMs can analyze financial data effectively
3. Paper trading is essential for testing
4. Backtesting validates strategies before execution
5. Multi-provider support increases flexibility
6. Beautiful CLI improves user experience
7. Error handling ensures robustness
    `.trim(),
  },
  "ai-research-agent-semantic-document-intelligence": {
    title: "AI Research Agent – Semantic Document Intelligence Platform",
    projectTitle: "AI Research Agent – Semantic Document Intelligence Platform",
    date: "2025",
    image: "/Ai resreach.png",
    content: `
# Building an AI Research Analyzer: A Deep Dive into LangChain, LangGraph, and Groq Integration

## Introduction

In the age of information overload, researchers and academics face a significant challenge: sifting through hundreds of research papers to find the ones most relevant to their work. Manual review is time-consuming, error-prone, and often overwhelming. This is where AI comes to the rescue.

In this comprehensive blog post, we'll explore how to build an **AI Research Analyzer** - an intelligent system that uses Large Language Models (LLMs) to automatically evaluate research papers against user queries. We'll dive deep into the architecture, technologies, and code implementation, showing you exactly how this powerful tool works under the hood.

## The Problem

Imagine you're working on a research project about "machine learning applications in healthcare." You have a collection of 50 PDF research papers, and you need to identify which ones are actually relevant to your topic. Traditional approaches would require:

- Reading through each paper manually

- Identifying key concepts and themes

- Comparing them against your research query

- Making subjective judgments about relevance

This process could take days or weeks. Our AI Research Analyzer can do this in minutes, providing detailed analysis and match evaluations for each paper.

## The Solution: AI-Powered Research Analysis

Our solution leverages the power of:

- **LangChain** - For building LLM applications

- **LangGraph** - For orchestrating complex AI workflows

- **Groq API** - For ultra-fast LLM inference

- **Streamlit** - For an intuitive web interface

The system takes user queries and PDF files as input, processes them through an intelligent pipeline, and returns comprehensive analysis results.

## Architecture Overview

\`\`\`
┌─────────────────────────────────────────────────────────────┐
│                        User Interface                         │
│                      (Streamlit Web App)                      │
│  ┌──────────────┐  ┌──────────────┐  ┌──────────────────┐   │
│  │ Query Input  │  │ PDF Upload  │  │ Results Display   │   │
│  └──────┬───────┘  └──────┬───────┘  └─────────┬────────┘   │
└─────────┼──────────────────┼────────────────────┼────────────┘
          │                  │                    │
          ▼                  ▼                    │
┌─────────────────────────────────────────────────┼────────────┐
│              PDF Processing Layer                │            │
│  ┌──────────────────────────────────────────┐  │            │
│  │  Extract text from PDFs using PyPDF       │  │            │
│  │  Structure data with file names           │  │            │
│  └──────────────────┬───────────────────────┘  │            │
└─────────────────────┼───────────────────────────┘            │
                      │                                          │
                      ▼                                          │
┌───────────────────────────────────────────────────────────────┐
│              LangGraph Workflow Orchestration                  │
│  ┌──────────────────────┐      ┌──────────────────────┐     │
│  │  Node 1: Analyze     │ ───► │  Node 2: Evaluate    │     │
│  │  Individual Papers   │      │  Matches & Summary   │     │
│  └──────────────────────┘      └──────────────────────┘     │
└─────────────────────┬────────────────────────────────────────┘
                      │
                      ▼
┌───────────────────────────────────────────────────────────────┐
│                    Groq LLM API (Llama 3.3)                   │
│              Fast inference for analysis                      │
└───────────────────────────────────────────────────────────────┘
\`\`\`

## Technology Stack Deep Dive

### 1. **Python 3.13**

Our foundation. Python provides excellent libraries for AI/ML, web development, and PDF processing.

### 2. **Streamlit** - Web Interface Framework

Streamlit is a Python framework that makes it incredibly easy to build interactive web applications. It's perfect for data science and AI applications.

**Key Features:**

- No HTML/CSS/JavaScript required

- Built-in widgets (file uploaders, text inputs, buttons)

- Automatic reactive updates

- Session state management

### 3. **LangChain** - LLM Application Framework

LangChain is a framework for developing applications powered by language models. It provides:

- **Abstraction layer** for working with different LLM providers

- **Prompt templates** for consistent, reusable prompts

- **Chain composition** for complex workflows

- **Memory management** for conversational applications

### 4. **LangGraph** - Workflow Orchestration

LangGraph extends LangChain with graph-based workflow capabilities:

- **State management** - Maintains state across workflow steps

- **Node-based architecture** - Each node performs a specific task

- **Conditional routing** - Dynamic workflow paths based on conditions

- **Error handling** - Built-in error recovery mechanisms

### 5. **Groq API** - Ultra-Fast LLM Inference

Groq provides lightning-fast inference for LLMs:

- **Hardware acceleration** - Custom inference chips

- **Multiple model support** - Llama, Mixtral, Gemma

- **Low latency** - Sub-second response times

- **Cost-effective** - Pay-per-use pricing

### 6. **PyPDF** - PDF Processing

PyPDF is a pure Python library for PDF manipulation:

- **Text extraction** - Extracts text from PDF files

- **Page-by-page processing** - Handles large documents

- **Metadata access** - Retrieves document information

## Code Walkthrough

Let's examine each component of our system in detail.

### Component 1: PDF Processor (\`pdf_processor.py\`)

The PDF processor is responsible for extracting text content from uploaded PDF files.

\`\`\`python
from typing import List
import pypdf
from io import BytesIO

class PDFProcessor:
    """Processes PDF files and extracts text content"""
    
    def extract_text_from_pdf(self, pdf_file: BytesIO) -> str:
        """
        Extract text from a single PDF file
        
        This method uses PyPDF's PdfReader to parse the PDF
        and extract text from each page.
        """
        try:
            pdf_reader = pypdf.PdfReader(pdf_file)
            text = ""
            
            # Iterate through each page
            for page_num, page in enumerate(pdf_reader.pages):
                page_text = page.extract_text()
                # Add page markers for better context
                text += f"\\n--- Page {page_num + 1} ---\\n"
                text += page_text
                text += "\\n"
            
            return text
        except Exception as e:
            raise Exception(f"Error extracting text from PDF: {str(e)}")
\`\`\`

**Key Points:**

- Uses \`BytesIO\` to handle in-memory PDF data (no file system writes)

- Processes pages sequentially to maintain document structure

- Adds page markers to preserve context

- Error handling ensures one bad PDF doesn't crash the entire process

\`\`\`python
def process_multiple_pdfs(self, pdf_files: List[BytesIO], file_names: List[str] = None) -> List[dict]:
    """
    Process multiple PDF files and return structured data
    
    This method handles batch processing of PDFs, maintaining
    file names and metadata for later reference.
    """
    processed_pdfs = []
    
    for idx, pdf_file in enumerate(pdf_files):
        # Use provided file name or generate default
        file_name = file_names[idx] if file_names and idx < len(file_names) else f"Paper {idx + 1}"
        
        try:
            text = self.extract_text_from_pdf(pdf_file)
            processed_pdfs.append({
                "index": idx,           # For ordering
                "name": file_name,      # Original filename
                "text": text,           # Extracted content
                "length": len(text)     # For metadata
            })
        except Exception as e:
            # Graceful error handling
            processed_pdfs.append({
                "index": idx,
                "name": file_name,
                "text": "",
                "error": str(e),
                "length": 0
            })
    
    return processed_pdfs
\`\`\`

**Why This Design?**

- **Structured output**: Returns dictionaries with consistent keys

- **Error resilience**: Continues processing even if one PDF fails

- **Metadata preservation**: Keeps file names and indices for display

- **Scalability**: Can handle any number of PDFs

### Component 2: Research Analyzer (\`research_analyzer.py\`)

This is the heart of our system - it uses LangGraph to orchestrate the analysis workflow.

#### State Definition

\`\`\`python
from typing_extensions import TypedDict

class ResearchState(TypedDict):
    """State for the research analysis graph"""
    query: str                              # User's research query
    papers: List[Dict[str, Any]]            # Processed PDF data
    results: List[Dict[str, Any]]           # Individual analyses
    summary: Optional[str]                  # Final summary
\`\`\`

**Why TypedDict?**

- Type safety for state management

- Clear contract for what data flows through the graph

- IDE autocomplete support

- Runtime validation

#### Initialization

\`\`\`python
class ResearchAnalyzer:
    def __init__(self, groq_api_key: str, model_name: str = "llama-3.3-70b-versatile"):
        """
        Initialize the Research Analyzer
        
        Sets up the Groq LLM client and builds the LangGraph workflow.
        """
        self.llm = ChatGroq(
            groq_api_key=groq_api_key,
            model_name=model_name,
            temperature=0.1  # Low temperature for consistent, focused analysis
        )
        self._build_graph()
\`\`\`

**Temperature Setting:**

- \`0.1\` = More deterministic, focused responses

- Lower values = More consistent analysis

- Higher values = More creative but less reliable

#### Building the LangGraph Workflow

\`\`\`python
def _build_graph(self):
    """Build the LangGraph workflow for research analysis"""
    
    # Create a state graph with our ResearchState schema
    workflow = StateGraph(ResearchState)
    
    # Add nodes - each node is a function that processes the state
    workflow.add_node("analyze_papers", self._analyze_papers_node)
    workflow.add_node("evaluate_matches", self._evaluate_matches_node)
    
    # Set the entry point
    workflow.set_entry_point("analyze_papers")
    
    # Define the flow: analyze_papers → evaluate_matches → END
    workflow.add_edge("analyze_papers", "evaluate_matches")
    workflow.add_edge("evaluate_matches", END)
    
    # Compile the graph into an executable workflow
    self.graph = workflow.compile()
\`\`\`

**Graph Structure:**

\`\`\`
START → analyze_papers → evaluate_matches → END
\`\`\`

**Why This Flow?**

1. **Sequential processing**: First analyze each paper individually

2. **Then synthesize**: Combine individual analyses into a summary

3. **Clear separation**: Each node has a single responsibility

#### Node 1: Analyze Papers

\`\`\`python
def _analyze_papers_node(self, state: ResearchState) -> ResearchState:
    """Analyze each paper individually"""
    query = state["query"]
    papers = state["papers"]
    results = []
    
    # Define the analysis prompt template
    analysis_prompt = ChatPromptTemplate.from_messages([
        ("system", """You are an expert research paper analyzer. Your task is to analyze research papers 
        and determine how well they match a given query. Be thorough and precise in your analysis.
        
        For each paper, provide:
        1. A summary of the paper's main content
        2. Key findings and contributions
        3. Relevance to the query (on a scale of 0-100)
        4. Specific sections or findings that match the query
        5. A clear match verdict (MATCH or NO MATCH)"""),
        ("human", """Query: {query}
        
        Paper Content:
        
        {paper_text}
        
        Please analyze this paper and provide a detailed evaluation of how well it matches the query.""")
    ])
\`\`\`

**Prompt Engineering:**

- **System message**: Sets the AI's role and expectations

- **Structured output**: Requests specific information (summary, relevance score, verdict)

- **Context**: Provides both query and paper content

\`\`\`python
    for paper in papers:
        try:
            # Format the prompt with actual data
            messages = analysis_prompt.format_messages(
                query=query,
                paper_text=paper["text"][:8000]  # Limit to 8000 chars for API
            )
            
            # Invoke the LLM
            response = self.llm.invoke(messages)
            
            # Store results
            results.append({
                "paper_index": paper["index"],
                "paper_name": paper.get("name", f"Paper {paper['index'] + 1}"),
                "analysis": response.content,
                "raw_text_length": paper["length"]
            })
        except Exception as e:
            # Error handling per paper
            results.append({
                "paper_index": paper["index"],
                "paper_name": paper.get("name", f"Paper {paper['index'] + 1}"),
                "error": str(e),
                "analysis": None
            })
    
    # Update state with results
    state["results"] = results
    return state
\`\`\`

**Key Design Decisions:**

- **Text truncation**: Limits to 8000 characters to avoid token limits

- **Per-paper error handling**: One failure doesn't stop the entire process

- **State mutation**: Updates and returns the state object

#### Node 2: Evaluate Matches

\`\`\`python
def _evaluate_matches_node(self, state: ResearchState) -> ResearchState:
    """Final evaluation and summary of matches"""
    query = state["query"]
    results = state["results"]
    
    # Create summary prompt
    summary_prompt = ChatPromptTemplate.from_messages([
        ("system", """You are a research evaluation expert. Summarize the analysis results 
        and provide a final verdict on which papers match the query."""),
        ("human", """Query: {query}
        
        Analysis Results:
        
        {analyses}
        
        Provide a final summary indicating which papers match the query and why.""")
    ])
    
    # Format all analyses into a single text
    analyses_text = "\\n\\n".join([
        f"{r.get('paper_name', 'Paper ' + str(r['paper_index'] + 1))}:\\n{r['analysis']}"
        for r in results if r.get('analysis')
    ])
    
    try:
        messages = summary_prompt.format_messages(
            query=query,
            analyses=analyses_text[:10000]  # Limit length
        )
        
        summary_response = self.llm.invoke(messages)
        state["summary"] = summary_response.content
    except Exception as e:
        state["summary"] = f"Error generating summary: {str(e)}"
    
    return state
\`\`\`

**Summary Generation:**

- Takes all individual analyses as input

- Asks LLM to synthesize and provide overall verdict

- Creates a cohesive summary of matches

#### Main Analysis Method

\`\`\`python
def analyze(self, query: str, papers: List[Dict[str, Any]]) -> Dict[str, Any]:
    """
    Analyze research papers against a query
    
    This is the main entry point that orchestrates the entire workflow.
    """
    # Initialize state
    initial_state = ResearchState(
        query=query,
        papers=papers,
        results=[],
        summary=None
    )
    
    # Execute the graph
    final_state = self.graph.invoke(initial_state)
    
    # Return formatted results
    return {
        "query": query,
        "results": final_state["results"],
        "summary": final_state.get("summary", "No summary available")
    }
\`\`\`

**Workflow Execution:**

1. Create initial state with query and papers

2. Invoke the compiled graph

3. Graph executes nodes sequentially

4. Return final state with all results

### Component 3: Streamlit Application (\`app.py\`)

The Streamlit app provides the user interface for our system.

#### Setup and Configuration

\`\`\`python
import streamlit as st
import os
from dotenv import load_dotenv
from pdf_processor import PDFProcessor
from research_analyzer import ResearchAnalyzer

# Load environment variables
load_dotenv()

# Page configuration
st.set_page_config(
    page_title="AI Research Analyzer",
    page_icon="📚",
    layout="wide"
)

# Initialize session state
if "analyzer" not in st.session_state:
    st.session_state.analyzer = None
if "processed_papers" not in st.session_state:
    st.session_state.processed_papers = []
if "analysis_results" not in st.session_state:
    st.session_state.analysis_results = None
\`\`\`

**Session State:**

- Streamlit's way of maintaining data across reruns

- Prevents re-initialization on every interaction

- Stores processed data for display

#### Sidebar Configuration

\`\`\`python
with st.sidebar:
    st.header("⚙️ Configuration")
    
    # API Key input
    api_key_input = st.text_input(
        "Groq API Key",
        type="password",
        help="Enter your Groq API key or set GROQ_API_KEY in .env file",
        value=os.getenv("GROQ_API_KEY", "")
    )
    
    if api_key_input:
        os.environ["GROQ_API_KEY"] = api_key_input
    
    # Model selection
    model_name = st.selectbox(
        "Groq Model",
        options=[
            "llama-3.3-70b-versatile",
            "llama-3.1-8b-instant",
            "mixtral-8x7b-32768",
            "gemma-7b-it",
            "llama-3.2-90b-text-preview"
        ],
        index=0,
        help="Select the Groq model to use for analysis."
    )
\`\`\`

**User Controls:**

- API key can be set via UI or environment variable

- Model selection allows users to choose speed vs. quality

- Helpful tooltips guide users

#### Main Processing Logic

\`\`\`python
if uploaded_files and query:
    if st.button("🔬 Analyze Papers", type="primary", use_container_width=True):
        with st.spinner("Processing PDFs and analyzing..."):
            try:
                # Step 1: Initialize PDF processor
                processor = PDFProcessor()
                
                # Step 2: Extract file data and names
                pdf_data = [file.read() for file in uploaded_files]
                file_names = [file.name for file in uploaded_files]
                from io import BytesIO
                pdf_files = [BytesIO(data) for data in pdf_data]
                
                # Step 3: Process PDFs
                processed_papers = processor.process_multiple_pdfs(pdf_files, file_names)
                st.session_state.processed_papers = processed_papers
                
                # Step 4: Initialize analyzer
                groq_api_key = os.getenv("GROQ_API_KEY")
                if not groq_api_key:
                    st.error("Please set GROQ_API_KEY in the sidebar or .env file")
                    return
                
                analyzer = ResearchAnalyzer(
                    groq_api_key=groq_api_key,
                    model_name=model_name
                )
                
                # Step 5: Run analysis
                results = analyzer.analyze(query, processed_papers)
                st.session_state.analysis_results = results
                
                st.success("✅ Analysis complete!")
                
            except Exception as e:
                st.error(f"Error during analysis: {str(e)}")
\`\`\`

**Processing Flow:**

1. **Extract data**: Read PDF files into memory

2. **Process PDFs**: Extract text and structure data

3. **Initialize analyzer**: Set up LangGraph workflow

4. **Run analysis**: Execute the graph workflow

5. **Store results**: Save for display

#### Results Display

\`\`\`python
if st.session_state.analysis_results:
    st.markdown("---")
    st.header("📊 Analysis Results")
    
    results = st.session_state.analysis_results
    
    # Display summary
    st.subheader("📋 Summary")
    st.info(results.get("summary", "No summary available"))
    
    # Display individual analyses
    st.subheader("📑 Individual Paper Analyses")
    
    for idx, result in enumerate(results.get("results", [])):
        paper_name = result.get("paper_name", f"Paper {result['paper_index'] + 1}")
        with st.expander(f"📄 {paper_name}", expanded=False):
            if result.get("error"):
                st.error(f"Error: {result['error']}")
            elif result.get("analysis"):
                st.markdown(result["analysis"])
                st.caption(f"Text length: {result.get('raw_text_length', 0)} characters")
            else:
                st.warning("No analysis available for this paper")
\`\`\`

**Display Features:**

- **Summary section**: Overall verdict and match evaluation

- **Expandable sections**: Individual paper analyses in collapsible sections

- **Error handling**: Clear error messages if analysis fails

- **Metadata**: Shows text length for context

## How It Works: Step-by-Step Execution

Let's trace through a complete execution:

### Step 1: User Input

\`\`\`
User enters query: "machine learning in healthcare"
User uploads: paper1.pdf, paper2.pdf, paper3.pdf
\`\`\`

### Step 2: PDF Processing

\`\`\`python
# PDFProcessor extracts text
paper1 → "This paper discusses ML applications..."
paper2 → "Healthcare data analysis using neural networks..."
paper3 → "A survey of computer vision techniques..."
\`\`\`

### Step 3: LangGraph Execution

**Initial State:**

\`\`\`python
{
    "query": "machine learning in healthcare",
    "papers": [
        {"index": 0, "name": "paper1.pdf", "text": "..."},
        {"index": 1, "name": "paper2.pdf", "text": "..."},
        {"index": 2, "name": "paper3.pdf", "text": "..."}
    ],
    "results": [],
    "summary": None
}
\`\`\`

**After Node 1 (analyze_papers):**

\`\`\`python
{
    "query": "machine learning in healthcare",
    "papers": [...],
    "results": [
        {
            "paper_index": 0,
            "paper_name": "paper1.pdf",
            "analysis": "This paper discusses ML applications in healthcare... Relevance: 95/100. VERDICT: MATCH"
        },
        {
            "paper_index": 1,
            "paper_name": "paper2.pdf",
            "analysis": "This paper focuses on healthcare data... Relevance: 88/100. VERDICT: MATCH"
        },
        {
            "paper_index": 2,
            "paper_name": "paper3.pdf",
            "analysis": "This paper discusses computer vision... Relevance: 15/100. VERDICT: NO MATCH"
        }
    ],
    "summary": None
}
\`\`\`

**After Node 2 (evaluate_matches):**

\`\`\`python
{
    "query": "machine learning in healthcare",
    "papers": [...],
    "results": [...],
    "summary": "Based on the analysis, 2 out of 3 papers match the query. Paper1.pdf and paper2.pdf both discuss machine learning applications in healthcare, with high relevance scores. Paper3.pdf focuses on computer vision and does not match the query."
}
\`\`\`

### Step 4: Display Results

- Summary shows overall match count

- Individual analyses show detailed evaluations

- Users can expand each paper to see full analysis

## Key Features

### 1. **Multi-PDF Processing**

- Handles multiple PDFs simultaneously

- Maintains file names and metadata

- Error-resilient (continues if one PDF fails)

### 2. **Intelligent Analysis**

- Context-aware evaluation

- Relevance scoring (0-100)

- Clear match verdicts

- Detailed explanations

### 3. **Workflow Orchestration**

- LangGraph manages complex state

- Sequential node execution

- Error handling at each step

### 4. **User-Friendly Interface**

- Simple upload and query interface

- Real-time progress indicators

- Expandable result sections

- Model selection options

### 5. **Flexible Configuration**

- Multiple LLM model options

- Configurable via UI or environment variables

- Temperature and parameter control

## Performance Considerations

### Text Truncation

\`\`\`python
paper_text=paper["text"][:8000]  # Limit to 8000 chars
\`\`\`

**Why?**

- API token limits

- Cost management

- Faster processing

- Most relevant content is usually at the beginning

### Batch Processing

- Processes papers sequentially (could be parallelized)

- Each paper analyzed independently

- Summary generated after all analyses complete

### Error Handling

- Graceful degradation

- Individual paper failures don't stop the process

- Clear error messages for debugging

## Advanced Use Cases

### 1. **Literature Review Automation**

Researchers can quickly identify relevant papers from large collections.

### 2. **Content Discovery**

Find documents matching specific topics in document repositories.

### 3. **Quality Filtering**

Filter papers by relevance score to focus on most relevant content.

### 4. **Research Gap Analysis**

Identify which aspects of a topic are covered or missing in a collection.

## Future Enhancements

### 1. **Parallel Processing**

\`\`\`python
# Could use asyncio or multiprocessing
async def analyze_paper_async(paper):
    # Parallel analysis
\`\`\`

### 2. **Vector Embeddings**

- Store paper embeddings for semantic search

- Faster similarity matching

- RAG (Retrieval Augmented Generation) integration

### 3. **Citation Analysis**

- Extract and analyze citations

- Build citation networks

- Identify influential papers

### 4. **Multi-Query Support**

- Handle multiple queries simultaneously

- Compare results across queries

- Generate comparative analysis

### 5. **Export Functionality**

- Export results as PDF/CSV

- Generate reports

- Shareable analysis summaries

## Best Practices Implemented

### 1. **Separation of Concerns**

- PDF processing separate from analysis

- UI separate from business logic

- Clear module boundaries

### 2. **Error Handling**

- Try-except blocks at critical points

- Graceful degradation

- User-friendly error messages

### 3. **Type Hints**

- Better code documentation

- IDE support

- Runtime validation

### 4. **State Management**

- TypedDict for state schema

- Clear state transitions

- Immutable state updates

### 5. **Prompt Engineering**

- Clear system messages

- Structured output requests

- Context preservation

## Conclusion

This AI Research Analyzer demonstrates the power of combining modern AI frameworks (LangChain, LangGraph) with fast inference APIs (Groq) to solve real-world problems. The architecture is:

- **Modular**: Easy to extend and modify

- **Scalable**: Can handle multiple papers efficiently

- **User-friendly**: Intuitive Streamlit interface

- **Robust**: Error handling and graceful degradation

The system showcases how agentic AI workflows can be orchestrated using LangGraph, making complex multi-step processes manageable and maintainable.

Whether you're a researcher looking to automate literature reviews, a student organizing research materials, or a developer building document analysis tools, this architecture provides a solid foundation for AI-powered research assistance.

## Code Repository Structure

\`\`\`
Research_agent/
├── app.py                 # Streamlit UI (182 lines)
├── pdf_processor.py       # PDF extraction (73 lines)
├── research_analyzer.py   # LangGraph workflow (174 lines)
├── requirements.txt       # Dependencies
├── setup_env.py          # Environment setup helper
├── .env.example          # Environment template
└── README.md             # Project documentation
\`\`\`

## Getting Started

1. **Install dependencies:**

\`\`\`bash
pip install -r requirements.txt
\`\`\`

2. **Set up environment:**

\`\`\`bash
# Create .env file
GROQ_API_KEY=your_api_key_here
\`\`\`

3. **Run the application:**

\`\`\`bash
streamlit run app.py
\`\`\`

4. **Use the interface:**

   - Enter your research query

   - Upload PDF files

   - Click "Analyze Papers"

   - Review results

## Final Thoughts

Building AI applications doesn't have to be complex. By leveraging frameworks like LangChain and LangGraph, we can create sophisticated AI workflows with relatively simple code. The key is understanding:

- **State management** - How data flows through the system

- **Prompt engineering** - How to get the best results from LLMs

- **Error handling** - How to make systems robust

- **User experience** - How to make tools accessible

This project demonstrates all of these principles in a practical, real-world application. Happy coding!
    `.trim(),
  },
};

export default function BlogPost({ params }: { params: { slug: string } }) {
  const post = blogPosts[params.slug];

  if (!post) {
    notFound();
  }

  return (
    <main className="min-h-screen">
      <Navigation />
      <article className="pt-36 pb-24 px-6 md:px-12">
        <div className="max-w-3xl mx-auto">
          <Link
            href="/#journal"
            data-hover
            className="text-muted hover:text-foreground mb-10 inline-flex items-center gap-2 transition-colors"
          >
            ← Back to Journal
          </Link>

          <h1 className="display text-4xl md:text-6xl mb-4 text-foreground">
            {post.title}
          </h1>
          <p className="text-muted text-sm mb-4">{post.date}</p>
          
          {params.slug === "ai-email-agent-autonomous-outreach-system" && (
            <div className="flex items-center gap-4 mb-8">
              <a
                href="https://github.com/aviralsharmaa/AI-Agent-Job"
                target="_blank"
                rel="noopener noreferrer"
                className="text-foreground/80 hover:text-foreground transition-colors border border-foreground/30 hover:border-foreground/50 px-4 py-2 rounded-lg text-sm"
              >
                View on GitHub
              </a>
              <a
                href="https://ai-agent-job.streamlit.app/"
                target="_blank"
                rel="noopener noreferrer"
                className="text-foreground/80 hover:text-foreground transition-colors border border-foreground/30 hover:border-foreground/50 px-4 py-2 rounded-lg text-sm"
              >
                Live Demo
              </a>
            </div>
          )}
          
          {params.slug === "autonomous-financial-analysis-trading-agent" && (
            <div className="flex items-center gap-4 mb-8">
              <a
                href="https://github.com/aviralsharmaa/Trading_agent"
                target="_blank"
                rel="noopener noreferrer"
                className="text-foreground/80 hover:text-foreground transition-colors border border-foreground/30 hover:border-foreground/50 px-4 py-2 rounded-lg text-sm"
              >
                View on GitHub
              </a>
              <a
                href="https://trading-agent-ai.streamlit.app/"
                target="_blank"
                rel="noopener noreferrer"
                className="text-foreground/80 hover:text-foreground transition-colors border border-foreground/30 hover:border-foreground/50 px-4 py-2 rounded-lg text-sm"
              >
                Live Demo
              </a>
            </div>
          )}
          
          {params.slug === "ai-research-agent-semantic-document-intelligence" && (
            <div className="flex items-center gap-4 mb-8">
              <a
                href="https://github.com/aviralsharmaa/AI_research_agent"
                target="_blank"
                rel="noopener noreferrer"
                className="text-foreground/80 hover:text-foreground transition-colors border border-foreground/30 hover:border-foreground/50 px-4 py-2 rounded-lg text-sm"
              >
                View on GitHub
              </a>
              <a
                href="https://research-agent-ai.streamlit.app/"
                target="_blank"
                rel="noopener noreferrer"
                className="text-foreground/80 hover:text-foreground transition-colors border border-foreground/30 hover:border-foreground/50 px-4 py-2 rounded-lg text-sm"
              >
                Live Demo
              </a>
            </div>
          )}
          
          {post.image && (
            <div className="mb-12">
              <Image
                src={post.image}
                alt={post.title}
                width={1200}
                height={800}
                className="w-full h-auto rounded-lg border border-line"
                priority
              />
            </div>
          )}
          
          <div className="max-w-none">
            <div className="text-foreground/80 leading-relaxed">
              {(() => {
                const lines = post.content.split('\n');
                const elements: JSX.Element[] = [];
                let inCodeBlock = false;
                let codeBlockContent: string[] = [];
                let codeBlockLanguage = '';
                let codeBlockKey = 0;

                for (let i = 0; i < lines.length; i++) {
                  const line = lines[i];
                  const trimmed = line.trim();
                  
                  // Handle code blocks
                  if (trimmed.startsWith('```')) {
                    if (inCodeBlock) {
                      // End of code block
                      const code = codeBlockContent.join('\n');
                      elements.push(
                        <pre key={`code-${codeBlockKey}`} className="bg-foreground/5 p-4 rounded-lg border border-line overflow-x-auto my-6">
                          <code className="text-foreground/90 text-sm font-mono whitespace-pre">{code}</code>
                        </pre>
                      );
                      codeBlockContent = [];
                      inCodeBlock = false;
                      codeBlockKey++;
                    } else {
                      // Start of code block
                      codeBlockLanguage = trimmed.substring(3).trim();
                      inCodeBlock = true;
                    }
                    continue;
                  }

                  if (inCodeBlock) {
                    codeBlockContent.push(line);
                    continue;
                  }

                  if (!trimmed) {
                    if (i < lines.length - 1 && lines[i + 1]?.trim()) {
                      elements.push(<br key={i} />);
                    }
                    continue;
                  }
                  
                  if (trimmed.startsWith('# ')) {
                    elements.push(<h1 key={i} className="text-4xl font-bold text-foreground mt-12 mb-6 first:mt-0">{trimmed.substring(2)}</h1>);
                  } else if (trimmed.startsWith('## ')) {
                    elements.push(<h2 key={i} className="text-3xl font-bold text-foreground mt-10 mb-5">{trimmed.substring(3)}</h2>);
                  } else if (trimmed.startsWith('### ')) {
                    elements.push(<h3 key={i} className="text-2xl font-semibold text-foreground mt-8 mb-4">{trimmed.substring(4)}</h3>);
                  } else if (trimmed.startsWith('#### ')) {
                    elements.push(<h4 key={i} className="text-xl font-semibold text-foreground mt-6 mb-3">{trimmed.substring(5)}</h4>);
                  } else if (trimmed.startsWith('- **') || trimmed.startsWith('- ')) {
                    const content = trimmed.startsWith('- **') 
                      ? trimmed.substring(2).replace(/\*\*/g, '')
                      : trimmed.substring(2);
                    elements.push(
                      <li key={i} className="ml-6 mb-2 list-disc">
                        {content.split('**').map((part, idx) => 
                          idx % 2 === 1 ? <strong key={idx} className="text-foreground">{part}</strong> : part
                        )}
                      </li>
                    );
                  } else if (trimmed.startsWith('**') && trimmed.endsWith('**') && !trimmed.includes('\n')) {
                    elements.push(<p key={i} className="font-semibold text-foreground mt-6 mb-4">{trimmed.replace(/\*\*/g, '')}</p>);
                  } else if (trimmed.startsWith('*') && !trimmed.startsWith('**') && !trimmed.startsWith('```')) {
                    elements.push(<p key={i} className="text-muted italic mt-6 mb-4 border-l-2 border-line pl-4">{trimmed.substring(1)}</p>);
                  } else if (trimmed.startsWith('![')) {
                    const match = trimmed.match(/!\[([^\]]*)\]\(([^)]+)\)/);
                    if (match) {
                      const alt = match[1];
                      const src = match[2];
                      elements.push(
                        <div key={i} className="my-8">
                          <Image
                            src={src}
                            alt={alt}
                            width={1200}
                            height={800}
                            className="w-full h-auto rounded-lg border border-line"
                          />
                        </div>
                      );
                    }
                  } else {
                    // Regular paragraph with inline code and bold support
                    const parts = trimmed.split(/(\*\*[^*]+\*\*|`[^`]+`)/g);
                    elements.push(
                      <p key={i} className="mb-4 leading-relaxed">
                        {parts.map((part, idx) => {
                          if (part.startsWith('**') && part.endsWith('**')) {
                            return <strong key={idx} className="text-foreground">{part.slice(2, -2)}</strong>;
                          } else if (part.startsWith('`') && part.endsWith('`')) {
                            return <code key={idx} className="bg-foreground/10 px-1.5 py-0.5 rounded text-sm font-mono">{part.slice(1, -1)}</code>;
                          }
                          return part;
                        })}
                      </p>
                    );
                  }
                }

                // Handle any remaining code block
                if (inCodeBlock && codeBlockContent.length > 0) {
                  const code = codeBlockContent.join('\n');
                  elements.push(
                    <pre key={`code-${codeBlockKey}`} className="bg-foreground/5 p-4 rounded-lg border border-line overflow-x-auto my-6">
                      <code className="text-foreground/90 text-sm font-mono whitespace-pre">{code}</code>
                    </pre>
                  );
                }

                return elements;
              })()}
            </div>
          </div>
        </div>
      </article>
    </main>
  );
}

