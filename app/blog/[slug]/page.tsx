import { notFound } from "next/navigation";
import Link from "next/link";
import Image from "next/image";
import Navigation from "@/components/Navigation";
import Background from "@/components/Background";

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
    date: "2024",
    image: "/job-mailer.png",
    content: `
# AI Email Agent – Autonomous Outreach System

The AI Email Agent is an intelligent automation system designed to eliminate the manual labor of searching for corporate contacts and sending personalized outreach. By leveraging Natural Language Processing (NLP), the agent allows users to simply provide a command in plain English, such as "Send a mail to microsoft," and it handles the entire discovery and dispatch process.

## The Core Technology Stack

To build this agent, I utilized a robust stack focused on security, scalability, and ease of use:

- **Programming Language**: Python 3.7 or higher
- **Integrations**: Gmail API for secure email transmission and OAuth 2.0 for user authentication
- **User Interfaces**: Streamlit for a modern web-based UI and a dedicated CLI for power users
- **Libraries**: The project relies on google-api-python-client, google-auth-oauthlib, and dnspython for backend operations

## Pre-requisites for Setup

Before the agent can function, several environmental configurations are necessary:

1. **Google Cloud Project**: You must create a project in the Google Cloud Console and enable the Gmail API
2. **OAuth Credentials**: You need to configure an OAuth consent screen and download the credentials.json file, placing it in the project root directory
3. **Email Database**: A file named emails_from_excel.txt must be prepared, containing a list of target email addresses formatted as one per line
4. **Dependencies**: All required Python packages must be installed via the requirements.txt file

## How the Agent Works: Under the Hood

### 1. NLP-Driven Prompt Parsing

The "brain" of the agent uses regex and pattern matching to dissect natural language prompts. It identifies specific keywords like "to [company]," "subject:," and "attachments:" to extract essential data without requiring structured forms. For example, the agent can automatically extract the company name from "Send email to apple company" or identify attachment names from "attach resume.pdf".

### 2. Smart Company Discovery Logic

Once a company name is extracted, the agent performs a deep search in the local database. The matching logic is case-insensitive and focuses on domain extraction; if you type "microsoft," it looks for all emails ending in @microsoft.com. Crucially, the agent includes a personal email filter that automatically excludes non-professional domains like gmail.com, yahoo.com, and outlook.com.

### 3. Secure Authentication and Dispatch

On its first run, the agent initiates a Google OAuth flow, opening a browser window to grant permissions. It then generates a token.json file to manage future sessions securely without re-authentication. When sending, the agent creates a MIME message, detects file types automatically for attachments, and transmits the data via the Gmail API.

### 4. Real-time Tracking and Logging

Every action is recorded to ensure reliability. The agent maintains four distinct logs:

- **sent_mail.txt** for successful deliveries
- **not_sent.txt** for failed attempts with specific error reasons
- **mail_log.csv** for detailed timestamps and Gmail message IDs
- **sent_mail_report.xlsx** for a comprehensive Excel-based summary

## User Interaction Models

### Web Interface (Streamlit)

The web UI provides a beautiful interface where users can authenticate with one click, type prompts, and upload multiple files (PDF, DOCX, TXT, or images) through a visual uploader. It features a visual progress bar and a sidebar showing real-time statistics of sent and failed emails.

### CLI Interface

The CLI version is built for efficiency, supporting interactive multi-line input for email bodies. Users can type END on a new line to finish their message or CANCEL to abort the process. It also includes a command to list companies, allowing users to see exactly which organizations are currently in their database.

## Project Architecture

The system follows a modular architecture:

**Main Application Files:**
- email_agent_streamlit.py (Web Interface)
- email_agent_cli.py (Command Line Interface)
- send_mails_gmail_api.py (Core Email Engine)

**Supporting Files:**
- emails_from_excel.txt: Email database
- credentials.json: Gmail API OAuth credentials
- token.json: Auto-generated authentication token
- Multiple log files for tracking

## Technical Implementation Details

### Prompt Parsing Algorithm

The agent uses multiple regex patterns to extract information:
- Company name extraction from various phrasings
- Subject line detection
- Attachment identification
- Body text extraction

### Company Matching Algorithm

1. Extract domain from email: email.split("@")[1]
2. Extract main domain: domain.split(".")[0]
3. Compare: main_domain.lower() == company_name.lower()
4. Filter: Skip personal emails (gmail.com, outlook.com, etc.)

### Email Composition

The agent creates a MIME (Multipurpose Internet Mail Extensions) message with:
- Headers (To, From, Subject)
- Body as MIMEText
- Attachments as MIMEBase parts
- Base64 encoding for Gmail API

### Gmail API Integration

Uses OAuth2 flow for secure authentication:
1. Check if token.json exists
2. If expired, refresh token
3. If invalid, start OAuth flow
4. Build Gmail API service object
5. Send emails via API

## Challenges & Solutions

### Challenge: Natural Language Understanding

**Problem**: Users might phrase requests in many different ways.

**Solution**: Multiple regex patterns to match different phrasings, case-insensitive matching, and fallback to manual input if extraction fails.

### Challenge: Gmail API Rate Limits

**Problem**: Gmail API has rate limits (250 quota units per user per second).

**Solution**: Batch processing with delays, automatic retry with longer delays for rate limit errors (429), and tracking sent emails to avoid duplicates.

### Challenge: Email Delivery Failures

**Problem**: Some emails might fail due to invalid addresses or mailbox issues.

**Solution**: Detect delivery failure errors, log to not_sent.txt with error reason, and don't retry permanent failures.

## Best Practices for Use

To get the most out of the agent, users should follow these guidelines:

- **Start Small**: Test your prompts with a batch of 1–2 emails before launching a larger campaign
- **Universal Formats**: Use PDF format for attachments as it is the most universal and professional
- **Simple Naming**: Use simple company names (e.g., "google") rather than long legal names (e.g., "Google LLC") to improve matching accuracy
- **Security**: Never commit your credentials.json or token.json files to version control

## Future Enhancements

Potential improvements include:
- Advanced NLP using machine learning models
- Email templates with variable substitution
- Scheduling capabilities for time-based sending
- Analytics for email open rates and response tracking
- Multi-account support
- Database integration for better search and filtering
- REST API endpoints for integration
- Real-time email validation

## Conclusion

This AI Email Agent project demonstrates end-to-end agent design: perception, planning, action, verification, and memory. It solves a real-world problem (automated job applications) using modern technologies and best practices. The system combines natural language processing, API integration, web development, and comprehensive logging to create a production-ready solution that can be extended and customized for various use cases.
    `.trim(),
  },
  "autonomous-financial-analysis-trading-agent": {
    title: "Autonomous Financial Analysis & Trading Agent",
    projectTitle: "Autonomous Financial Analysis & Trading Agent",
    date: "2024",
    image: "/finance.png",
    content: `
# Financial Analysis & Trading Agent - Comprehensive Guide

## Introduction & Project Overview

### What Is This Project?

This is an AI-powered autonomous trading agent that:

- Analyzes stock market data using Large Language Models (LLMs)
- Builds trading strategies based on market sentiment
- Backtests strategies on historical data
- Executes paper trades (simulated trading with real market prices)
- Self-improves by learning from performance

### Why Was It Created?

The goal is to demonstrate how AI agents can be used for financial analysis and automated trading. This project combines:

- Modern AI/LLM capabilities for market analysis
- LangGraph for building stateful agent workflows
- Real market data integration
- Risk-free paper trading for testing

### Key Features

✓ AI-Powered Market Analysis using free/open-source LLMs
✓ LangGraph-Based Workflow (7 intelligent nodes)
✓ Real-Time Market Data from Alpaca API
✓ Backtesting Engine for strategy validation
✓ Paper Trading (risk-free simulation)
✓ Beautiful CLI Interface with Rich library
✓ Multi-LLM Support (Ollama, Hugging Face, Groq, OpenAI)
✓ Self-Improvement Capabilities

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
    date: "2024",
    image: "/Ai resreach.png",
    content: `
# AI Research Agent - Complete Blog Post

## Building an Intelligent Document Analysis System for Research Papers

## Introduction & Project Overview

### What Is This Project?

The AI Research Agent is an intelligent document analysis system specifically designed for analyzing research papers on cryptoglyph identification, pattern detection, and counterfeiting detection. It combines modern AI technologies including:

- Vector Search: Semantic search using embeddings and vector databases
- Large Language Models (LLMs): For generating insights and answers
- Document Processing: PDF parsing and intelligent chunking
- Web Interface: User-friendly Streamlit-based UI

### Problem It Solves

Researchers often struggle with:

- Managing and analyzing multiple research papers
- Finding relevant information across documents
- Comparing methodologies from different papers
- Extracting key insights and recommendations
- Understanding complex relationships between papers

This system automates these tasks using AI, making research more efficient and productive.

### Key Features

✓ Upload and process PDF research papers
✓ Semantic search across all papers
✓ Interactive Q&A interface
✓ Comparative analysis of methodologies
✓ Automated summarization
✓ Source citation and tracking
✓ Beautiful web-based interface

![System Architecture](/Ai resreach 2.png)

## Project Requirements & Why We Need Each Component

### Python Version: 3.10+

**WHY:** Modern Python features, better async support, and compatibility with latest libraries. Python 3.14 has compatibility issues with some packages (like ChromaDB), so 3.10-3.12 is recommended.

### Core Libraries & Their Purpose

**1. LANGCHAIN (0.3.7)**

**WHY:**
- Provides unified framework for working with LLMs
- Handles document processing, vector stores, and chains
- Abstracts complexity of different LLM providers
- Enables easy switching between models

**WHAT IT DOES:**
- Document loading and processing
- Vector store abstractions
- LLM integrations
- Chain creation for complex workflows

**2. LANGCHAIN-COMMUNITY (0.3.7)**

**WHY:**
- Community integrations for various services
- Provides HuggingFace, ChromaDB, FAISS integrations
- Extends LangChain with additional functionality

**WHAT IT DOES:**
- Connects to HuggingFace models
- Integrates vector databases
- Provides document loaders (PDF, etc.)

**3. FAISS-CPU (>=1.13.0)**

**WHY:**
- Fast similarity search for vectors
- Works offline, no external services needed
- Better Python 3.14 compatibility than ChromaDB
- Efficient for local development

**WHAT IT DOES:**
- Stores document embeddings as vectors
- Performs fast similarity search
- Enables semantic document retrieval

**4. SENTENCE-TRANSFORMERS (3.3.1)**

**WHY:**
- Specialized library for generating embeddings
- Optimized models for semantic similarity
- Better than general transformers for embeddings

**WHAT IT DOES:**
- Converts text to vector embeddings
- Uses models like all-MiniLM-L6-v2
- Generates 384-dimensional vectors for semantic search

**5. STREAMLIT (1.40.2)**

**WHY:**
- Simplest way to create web interfaces in Python
- No HTML/CSS/JavaScript needed
- Built-in components for data apps
- Perfect for AI demos

**WHAT IT DOES:**
- Creates web interface
- Handles user interactions
- Displays results beautifully
- Manages session state

## System Architecture & Design Decisions

### High-Level Architecture

The system follows a layered architecture:

**STREAMLIT WEB INTERFACE** (User Interaction Layer)
- Chat Tab
- Analysis Tab
- Paper Browser

**RESEARCH AGENT LAYER** (Business Logic & AI Processing)
- Query Processing
- LLM Integration (HuggingFace/GPT-2)
- Analysis Methods (summarize, compare, recommend)

**VECTOR STORE LAYER** (Semantic Search & Retrieval)
- FAISS / ChromaDB Vector Database
- Embedding Generation (HuggingFace)
- Similarity Search
- Document Indexing

**DOCUMENT PROCESSING LAYER** (PDF Loading & Text Extraction)
- PDF Loading (PyPDFLoader)
- Document Chunking
- Metadata Extraction

**DATA STORAGE**
- papers/ (PDF files)
- chroma_db/ (vector DB)
- data/ (optional)

### Design Decisions & Why

**1. MODULAR ARCHITECTURE**

**WHY:** Separates concerns, makes testing easier, allows independent updates

**HOW:** Each component (document loader, vector store, agent) is in separate modules

**2. FALLBACK STRATEGY**

**WHY:** Ensures system works even if some components fail

**HOW:**
- ChromaDB → FAISS fallback
- Cloud LLM → Local GPT-2 fallback
- LLM → Vector search only fallback

**3. PERSISTENT STORAGE**

**WHY:** Don't want to re-index papers every time

**HOW:** Vector database persists to disk (chroma_db/ directory)

**4. EMBEDDING-BASED SEARCH**

**WHY:** Better than keyword search for semantic understanding

**HOW:** Converts text to vectors, finds similar vectors

## Complete Code Walkthrough - File by File

### File 1: config.py

**LOCATION:** Root directory

**PURPOSE:** Centralized configuration management

**KEY FEATURES:**
- Loads environment variables from .env file
- Defines all directory paths
- Creates directories automatically
- Configurable model and collection names

### File 2: utils/document_loader.py

**LOCATION:** utils/document_loader.py

**PURPOSE:** Load and process PDF files

**EXECUTION FLOW:**
1. User uploads PDF → saved to papers/ directory
2. load_pdf() called with file path
3. PyPDFLoader extracts text from each page
4. Returns list of Document objects (one per page)

**KEY METHODS:**
- \`load_pdf()\`: Loads single PDF file
- \`load_all_papers()\`: Processes all PDFs in directory
- \`get_paper_info()\`: Quick preview without full loading

### File 3: utils/vector_store.py

**LOCATION:** utils/vector_store.py

**PURPOSE:** Manage vector embeddings and similarity search

**KEY FEATURES:**
- Graceful fallback: tries ChromaDB, falls back to FAISS
- Creates embedding model (converts text to vectors)
- Model: sentence-transformers/all-MiniLM-L6-v2 (384 dimensions)
- Stores vectors in FAISS/ChromaDB index

**EXECUTION FLOW:**
1. Receives list of Document objects
2. Extracts text content and metadata
3. For each document: converts text to embedding (384 numbers)
4. Stores embedding + metadata in vector database
5. Saves to disk for persistence

**SIMILARITY SEARCH:**
1. User enters query: "What is cryptoglyph identification?"
2. Query converted to embedding (384 numbers)
3. Vector database searches for similar vectors
4. Returns top K (default 5) most similar documents
5. Each result includes Document object and similarity score

### File 4: agent/research_agent.py

**LOCATION:** agent/research_agent.py

**PURPOSE:** Core AI agent for processing queries and generating insights

**LLM INITIALIZATION:**
- Tries HuggingFaceEndpoint (Mistral-7B) if API token available
- Falls back to local GPT-2 if no API token
- Creates pipeline for text generation

**MODEL COMPARISON:**
- **Mistral-7B:** Better quality, requires API, costs money
- **GPT-2:** Lower quality, free, runs locally, faster

**KEY METHODS:**
- \`analyze_paper()\`: Main entry point for queries
- \`summarize_papers()\`: Specialized method for summarization
- \`compare_methodologies()\`: Specialized method for comparison
- \`get_recommendations()\`: Specialized method for recommendations

**EXECUTION FLOW:**
1. User query: "What methods are used for cryptoglyph detection?"
2. similarity_search_with_score() finds top 5 relevant document chunks
3. Combines content from top results
4. Formats as answer with source information
5. Returns answer + sources with metadata

### File 5: streamlit_app.py

**LOCATION:** Root directory

**PURPOSE:** Web interface and main application entry point

**KEY FEATURES:**
- Lazy initialization of components
- Session state management for persistence
- File upload interface
- Interactive chat interface
- Quick action buttons
- Paper browser tab

**EXECUTION FLOW:**
1. User uploads PDFs through web interface
2. Files saved to papers/ directory
3. User clicks "Load Papers" button
4. Documents processed and indexed
5. User asks questions in chat interface
6. System retrieves relevant documents and displays answers

## How Everything Works Together - Execution Flow

### Complete User Journey

**STEP 1: APPLICATION STARTUP**
1. User runs: \`streamlit run streamlit_app.py\`
2. Streamlit starts web server on port 8501
3. Browser opens to http://localhost:8501
4. Components NOT initialized yet (lazy loading)

**STEP 2: UPLOADING PAPERS**
1. User clicks file uploader in sidebar
2. Selects PDF files from computer
3. Clicks "Save Uploaded Papers" button
4. Files saved to papers/ directory

**STEP 3: LOADING PAPERS (INDEXING)**
1. User clicks "🔄 Load Papers" button
2. DocumentLoader scans papers/ directory
3. Loads all PDFs, extracts text from each page
4. Clears old vector store (fresh start)
5. Creates new VectorStore
6. Adds all documents (generates embeddings, stores in DB)
7. Sets papers_loaded flag

**TIME BREAKDOWN:**
- Small project (3 papers, ~50 pages): 10-20 seconds
- Medium project (10 papers, ~200 pages): 30-60 seconds
- Large project (50 papers, ~1000 pages): 2-5 minutes

**STEP 4: ASKING QUESTIONS**
1. User navigates to "💬 Chat with Agent" tab
2. Types question: "What is cryptoglyph identification?"
3. Presses Enter or clicks send
4. ResearchAgent.analyze_paper() called
5. Vector search finds relevant documents
6. Answer formatted and displayed
7. Sources shown in expandable section

**RESPONSE TIME:**
- First query: ~2-5 seconds (model loading if needed)
- Subsequent queries: ~1-3 seconds (cached models)

### Data Flow Diagram

**User Query** → **Streamlit UI** → **ResearchAgent** → **VectorStore** → **Embedding Model** → **Vector Database** → **Results** → **Format Response** → **Display Answer**

### Embedding Generation Details

**HOW TEXT BECOMES VECTORS:**
1. Input: "What is cryptoglyph identification?"
2. Tokenization: ["What", "is", "cryptoglyph", "identification", "?"]
3. Model Processing: Passes through neural network (all-MiniLM-L6-v2)
4. Output: 384-dimensional vector [0.23, -0.45, 0.67, ...]

**WHY 384 DIMENSIONS?**
- Balance between quality and speed
- More dimensions = better quality but slower
- 384 is optimal for most use cases

### Similarity Search Details

**HOW IT FINDS SIMILAR DOCUMENTS:**
1. Query vector: [0.23, -0.45, 0.67, ...]
2. All document vectors in database
3. Compute cosine similarity for each
4. Sort by similarity score
5. Return top K (default: 5)

## Technical Deep Dive

### Vector Embeddings Explained

**WHAT ARE EMBEDDINGS?**
- Numerical representations of text
- Capture semantic meaning
- Similar texts → similar vectors

**EXAMPLE:**
- "dog" → [0.2, -0.1, 0.5, ...]
- "puppy" → [0.21, -0.09, 0.48, ...] (similar!)
- "car" → [-0.3, 0.4, -0.2, ...] (different)

**WHY BETTER THAN KEYWORD SEARCH:**
- Keyword: "dog" matches "dog" only
- Semantic: "dog" matches "puppy", "canine", "pet"

### Vector Database Comparison

**FAISS (Facebook AI Similarity Search)**

**Pros:**
- Fast similarity search
- Works offline
- Low memory usage
- Good Python 3.14 support

**Cons:**
- File-based storage (less flexible)
- No built-in metadata filtering
- Requires manual index management

**CHROMADB**

**Pros:**
- Built-in metadata filtering
- More flexible query options
- Better for production deployments

**Cons:**
- Python 3.14 compatibility issues
- Requires more setup
- Slightly slower for simple searches

**WHICH TO USE?**
- Development/Testing: FAISS (simpler, faster setup)
- Production: ChromaDB (if Python < 3.14) or FAISS (if Python 3.14+)
- This project: FAISS as default with ChromaDB fallback

### Language Models Explained

**WHAT ARE LLMs?**
- Large Language Models are neural networks trained on vast text data
- Can generate text, answer questions, summarize content
- Understand context and relationships between concepts

**MODELS USED IN THIS PROJECT:**

**1. GPT-2 (Local Fallback)**
- Size: ~500MB
- Parameters: 1.5 billion
- Quality: Good for basic tasks
- Speed: Fast on CPU
- Cost: Free (runs locally)

**2. Mistral-7B (Cloud Option)**
- Size: 7 billion parameters
- Quality: Excellent
- Speed: Fast (cloud infrastructure)
- Cost: Pay per use

**WHY FALLBACK STRATEGY?**
- Ensures system always works
- No dependency on external services
- Cost-effective for development
- Can upgrade to better models when needed

### Retrieval-Augmented Generation (RAG)

**WHAT IS RAG?**
- Combines vector search with LLM generation
- Retrieves relevant documents first
- Uses documents as context for LLM
- Generates answers based on retrieved content

**HOW IT WORKS IN THIS PROJECT:**
1. User asks question
2. System searches vector database for relevant papers
3. Retrieves top K most similar document chunks
4. Passes chunks + question to LLM (or formats directly)
5. LLM generates answer using retrieved context
6. Returns answer with source citations

**WHY RAG IS POWERFUL:**
- Answers are grounded in actual documents
- Can cite sources (transparency)
- Reduces hallucinations
- Works with domain-specific knowledge
- No need to retrain models

## Future Enhancements & Conclusion

### Potential Improvements

**1. ADVANCED LLM INTEGRATION**
- Full RAG pipeline with LLM summarization
- Multi-turn conversations with context
- Better answer generation
- Support for more LLM providers (OpenAI, Anthropic, etc.)

**2. ENHANCED DOCUMENT PROCESSING**
- Better PDF parsing (handles images, tables)
- Support for more formats (Word, LaTeX, etc.)
- Intelligent chunking strategies
- Metadata extraction (authors, dates, etc.)

**3. IMPROVED SEARCH CAPABILITIES**
- Hybrid search (semantic + keyword)
- Filtering by metadata (date, author, etc.)
- Multi-query search
- Query expansion

**4. USER EXPERIENCE ENHANCEMENTS**
- Export conversations to PDF/Markdown
- Share analysis results
- Collaborative features
- Custom themes and settings
- Mobile-responsive design

**5. ANALYTICS & INSIGHTS**
- Paper citation graphs
- Topic modeling
- Trend analysis
- Research gap identification
- Automated report generation

### Conclusion

**WHAT WE BUILT:**

This AI Research Agent demonstrates how modern AI technologies can be combined to create powerful document analysis systems. By leveraging vector embeddings, semantic search, and language models, we've created a tool that makes research paper analysis more efficient and accessible.

**KEY TAKEAWAYS:**

1. Vector embeddings enable semantic understanding beyond keyword matching
2. Modular architecture makes systems maintainable and extensible
3. Fallback strategies ensure reliability and user experience
4. RAG (Retrieval-Augmented Generation) combines search with generation
5. Open-source tools make advanced AI accessible to everyone

**WHY THIS MATTERS:**

Research is becoming increasingly data-driven, with thousands of papers published daily. Tools like this help researchers:

- Stay current with latest findings
- Find relevant information quickly
- Compare methodologies across papers
- Generate insights from large document collections
- Save time on literature reviews

**THE FUTURE:**

As AI technology continues to evolve, systems like this will become even more powerful. We can expect:

- Better understanding of complex documents
- More accurate answer generation
- Faster processing speeds
- Integration with more data sources
- Collaborative research platforms

**GETTING STARTED:**

1. Clone the repository
2. Install dependencies (requirements.txt)
3. Upload your research papers
4. Start asking questions!

The codebase is designed to be:
- Easy to understand (well-commented)
- Easy to modify (modular structure)
- Easy to extend (clear interfaces)
- Easy to deploy (simple setup)

**FINAL THOUGHTS:**

Building AI-powered applications doesn't have to be complicated. By using existing tools and libraries, we can create sophisticated systems that solve real problems. This project serves as a foundation that can be extended and customized for various research domains.

Whether you're a researcher looking to analyze papers, a developer wanting to learn about AI systems, or someone interested in document intelligence, this project provides a practical starting point.

Remember: The best way to learn is by building. Start with this foundation, experiment with different approaches, and create something that solves your specific needs.

Happy researching! 🔬📚🤖
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
      <Background />
      <Navigation />
      <article className="pt-32 pb-20 px-6">
        <div className="max-w-4xl mx-auto">
          <Link
            href="/#blogs"
            className="text-white/80 hover:text-white mb-8 inline-block transition-colors"
          >
            ← Back to Blogs
          </Link>
          
          <h1 className="text-4xl md:text-5xl font-bold mb-4 text-white">
            {post.title}
          </h1>
          <p className="text-white/60 text-sm mb-8">{post.date}</p>
          
          {post.image && (
            <div className="mb-12">
              <Image
                src={post.image}
                alt={post.title}
                width={1200}
                height={800}
                className="w-full h-auto rounded-lg border border-white/20"
                priority
              />
            </div>
          )}
          
          <div className="prose prose-invert max-w-none">
            <div className="text-white/80 leading-relaxed">
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
                        <pre key={`code-${codeBlockKey}`} className="bg-black/50 p-4 rounded-lg border border-white/20 overflow-x-auto my-6">
                          <code className="text-white/90 text-sm font-mono whitespace-pre">{code}</code>
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
                    elements.push(<h1 key={i} className="text-4xl font-bold text-white mt-12 mb-6 first:mt-0">{trimmed.substring(2)}</h1>);
                  } else if (trimmed.startsWith('## ')) {
                    elements.push(<h2 key={i} className="text-3xl font-bold text-white mt-10 mb-5">{trimmed.substring(3)}</h2>);
                  } else if (trimmed.startsWith('### ')) {
                    elements.push(<h3 key={i} className="text-2xl font-semibold text-white mt-8 mb-4">{trimmed.substring(4)}</h3>);
                  } else if (trimmed.startsWith('#### ')) {
                    elements.push(<h4 key={i} className="text-xl font-semibold text-white mt-6 mb-3">{trimmed.substring(5)}</h4>);
                  } else if (trimmed.startsWith('- **') || trimmed.startsWith('- ')) {
                    const content = trimmed.startsWith('- **') 
                      ? trimmed.substring(2).replace(/\*\*/g, '')
                      : trimmed.substring(2);
                    elements.push(
                      <li key={i} className="ml-6 mb-2 list-disc">
                        {content.split('**').map((part, idx) => 
                          idx % 2 === 1 ? <strong key={idx} className="text-white">{part}</strong> : part
                        )}
                      </li>
                    );
                  } else if (trimmed.startsWith('**') && trimmed.endsWith('**') && !trimmed.includes('\n')) {
                    elements.push(<p key={i} className="font-semibold text-white mt-6 mb-4">{trimmed.replace(/\*\*/g, '')}</p>);
                  } else if (trimmed.startsWith('*') && !trimmed.startsWith('**') && !trimmed.startsWith('```')) {
                    elements.push(<p key={i} className="text-white/60 italic mt-6 mb-4 border-l-2 border-white/20 pl-4">{trimmed.substring(1)}</p>);
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
                            className="w-full h-auto rounded-lg border border-white/20"
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
                            return <strong key={idx} className="text-white">{part.slice(2, -2)}</strong>;
                          } else if (part.startsWith('`') && part.endsWith('`')) {
                            return <code key={idx} className="bg-white/10 px-1.5 py-0.5 rounded text-sm font-mono">{part.slice(1, -1)}</code>;
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
                    <pre key={`code-${codeBlockKey}`} className="bg-black/50 p-4 rounded-lg border border-white/20 overflow-x-auto my-6">
                      <code className="text-white/90 text-sm font-mono whitespace-pre">{code}</code>
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

