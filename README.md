# Privacy-Focused AI Browser Assistant

**Description:**

An open-source, privacy-focused AI assistant browser extension that enhances your browsing experience. It provides intelligent assistance based on your current browser context, leveraging custom RAG (Retrieval Augmented Generation) and user-configured LLMs (Large Language Models). Users have full control over their data and can connect to their own Supabase instances.

**Key Features:**

*   **Privacy-Focused:** Users have complete control over their data.
*   **Browser Context Awareness:** Intelligent responses based on current web page context.
*   **Customizable RAG:** Integrates user-configured RAG with LlamaIndex.
*   **User-Configured LLMs:** Support for multiple LLMs via API keys.
*   **User-Controlled Data:** Users have the option to use their own Supabase database.
*   **Open-Source:** Full transparency and community-driven development.

**Tech Stack:**

*   **Chrome Extension:**
    *   HTML, CSS, JavaScript
    *   Chrome Extension APIs
*   **Backend:**
    *   Python with FastAPI/Flask
    *   LangChain for LLM interactions
    *   LlamaIndex for RAG
*   **Database:**
    *   Supabase (PostgreSQL) - User managed (optional: managed as well).
*   **LLM APIs:**
    *   OpenAI, Mistral, Anthropic, or other providers.
*   **Frontend:**
    *   React, Vue.js, Angular, or vanilla HTML/CSS/JS
*   **Hosting:**
    *   User-managed (optionally self-hosted), or hosted solutions like DigitalOcean, AWS, Google Cloud (for backend and website).
