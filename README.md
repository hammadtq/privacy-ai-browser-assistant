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

## Development

The project is built with vanilla JavaScript, HTML, and CSS to maintain simplicity and eliminate dependencies. To contribute:

1. Fork the repository
2. Create a feature branch
3. Make your changes
4. Submit a pull request

## Future Plans

- [ ] Add dark mode support
- [ ] Implement actual API integrations
- [ ] Add export/import functionality for chat history
- [ ] Create browser extension version
- [ ] Add support for custom prompt templates
- [ ] Implement streaming responses

## Technical Details

For detailed technical information about the project's architecture and planned features, see [tech_stack.md](docs/tech_stack.md).

## License

MIT License - feel free to use this project however you'd like!

## Contributing

Contributions are welcome! Please feel free to submit a pull request.
