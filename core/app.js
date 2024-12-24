class ViraaApp {
    constructor() {
        this.messages = [];
        this.currentChatId = null;
        this.settings = this.loadSettings();
        this.initializeEventListeners();
        this.currentModel = this.settings.modelSelected;
        this.initializeModelSelector();
        this.initializeChatListeners();
        this.initializeTabListeners();
        this.initializeMobileMenu();
    }

    initializeEventListeners() {
        // New chat button
        document.querySelector('.new-chat').addEventListener('click', () => this.createNewChat());

        // Send message button
        document.querySelector('.send-button').addEventListener('click', () => this.sendMessage());

        // Enter key to send message
        document.querySelector('textarea').addEventListener('keypress', (e) => {
            if (e.key === 'Enter' && !e.shiftKey) {
                e.preventDefault();
                this.sendMessage();
            }
        });

        // Auto-resize textarea
        document.querySelector('textarea').addEventListener('input', (e) => {
            e.target.style.height = 'auto';
            e.target.style.height = e.target.scrollHeight + 'px';
        });

        // Settings related listeners
        document.querySelector('#model-select').addEventListener('change', (e) => {
            const customSettings = document.querySelector('#custom-model-settings');
            customSettings.style.display = e.target.value === 'custom' ? 'block' : 'none';
        });

        document.querySelector('#save-settings-button').addEventListener('click', () => this.saveSettings());
    }

    initializeModelSelector() {
        const modelSelect = document.querySelector('.current-model-select');
        const modelStatus = document.querySelector('.model-status');
        
        // Set initial value from settings
        modelSelect.value = this.currentModel;
        this.updateModelStatus(this.currentModel);

        // Add change listener
        modelSelect.addEventListener('change', (e) => {
            this.currentModel = e.target.value;
            this.updateModelStatus(this.currentModel);
            // Optionally save this preference
            this.settings.modelSelected = this.currentModel;
            localStorage.setItem('viraaSettings', JSON.stringify(this.settings));
        });
    }

    updateModelStatus(model) {
        const modelStatus = document.querySelector('.model-status');
        switch(model) {
            case 'gpt-3.5-turbo':
                modelStatus.textContent = 'Using GPT-3.5 Turbo';
                break;
            case 'gpt-4':
                modelStatus.textContent = 'Using GPT-4';
                break;
            case 'claude-3-opus':
                modelStatus.textContent = 'Using Claude 3 Opus';
                break;
            case 'custom':
                modelStatus.textContent = 'Using Custom Model';
                break;
            default:
                modelStatus.textContent = 'Using default model';
        }
    }

    createNewChat() {
        const chatId = Date.now();
        const chatList = document.querySelector('.chat-list');
        
        const chatItem = document.createElement('div');
        chatItem.className = 'chat-item';
        chatItem.innerHTML = `
            <i class="fas fa-comments"></i>
            <span>New Chat</span>
        `;
        
        chatList.prepend(chatItem);
        this.currentChatId = chatId;
        this.clearMessages();
    }

    async sendMessage() {
        const textarea = document.querySelector('textarea');
        const message = textarea.value.trim();
        
        if (!message) return;

        // Add user message
        this.addMessage(message, 'user');
        textarea.value = '';
        textarea.style.height = 'auto';

        // Simulate AI response (replace with actual API call)
        const response = await this.getAIResponse(message);
        this.addMessage(response, 'assistant');
    }

    addMessage(content, type) {
        const messagesContainer = document.querySelector('.chat-messages');
        const messageDiv = document.createElement('div');
        messageDiv.className = `message ${type}`;
        messageDiv.textContent = content;
        messagesContainer.appendChild(messageDiv);
        messagesContainer.scrollTop = messagesContainer.scrollHeight;
    }

    async getAIResponse(message) {
        // Now uses the selected model from settings
        const model = this.settings.modelSelected;
        
        // Simulate API delay for now
        await new Promise(resolve => setTimeout(resolve, 1000));
        
        // You can implement actual API calls here based on the selected model
        return `This is a simulated AI response using ${model}. Replace this with actual API integration.`;
    }

    clearMessages() {
        document.querySelector('.chat-messages').innerHTML = '';
        document.querySelector('textarea').value = '';
    }

    loadSettings() {
        const savedSettings = localStorage.getItem('viraaSettings');
        return savedSettings ? JSON.parse(savedSettings) : {
            llmApiKey: '',
            anthropicApiKey: '',
            modelSelected: 'gpt-3.5-turbo',
            storeHistory: false,
            modelEndpoint: '',
            modelApiKey: ''
        };
    }

    saveSettings() {
        const settings = {
            llmApiKey: document.querySelector('#llm-api-key').value,
            anthropicApiKey: document.querySelector('#anthropic-api-key').value,
            modelSelected: document.querySelector('#model-select').value,
            storeHistory: document.querySelector('#store-history-checkbox').checked,
            modelEndpoint: document.querySelector('#model-endpoint')?.value || '',
            modelApiKey: document.querySelector('#model-api-key')?.value || ''
        };

        localStorage.setItem('viraaSettings', JSON.stringify(settings));
        this.settings = settings;
        
        // Show success message
        alert('Settings saved successfully!');
    }

    initializeChatListeners() {
        // Chat item click handler
        document.querySelectorAll('.chat-item').forEach(item => {
            item.addEventListener('click', (e) => {
                if (!e.target.closest('.chat-actions')) {
                    document.querySelectorAll('.chat-item').forEach(i => i.classList.remove('active'));
                    item.classList.add('active');
                    this.loadChat(item.dataset.chatId);
                }
            });
        });

        // Rename chat handlers
        document.querySelectorAll('.chat-title').forEach(title => {
            title.addEventListener('blur', (e) => {
                // Save the new title
                console.log('New title:', e.target.textContent);
            });

            title.addEventListener('keydown', (e) => {
                if (e.key === 'Enter') {
                    e.preventDefault();
                    title.blur();
                }
            });
        });

        // Delete chat handler
        document.querySelectorAll('.delete-chat').forEach(btn => {
            btn.addEventListener('click', (e) => {
                const chatItem = e.target.closest('.chat-item');
                if (confirm('Are you sure you want to delete this chat?')) {
                    chatItem.remove();
                }
            });
        });
    }

    loadChat(chatId) {
        // In a real app, this would load the chat history from storage
        console.log('Loading chat:', chatId);
    }

    initializeTabListeners() {
        // Add tab change listeners
        document.querySelectorAll('.nav-link').forEach(tab => {
            tab.addEventListener('click', (e) => {
                const targetTab = e.target.getAttribute('href');
                this.handleTabChange(targetTab);
            });
        });

        // Add back button listeners
        document.querySelectorAll('.back-button').forEach(button => {
            button.addEventListener('click', (e) => {
                e.preventDefault(); // Prevent default anchor behavior
                
                // Remove active class from all tabs
                document.querySelectorAll('.nav-link').forEach(tab => {
                    tab.classList.remove('active');
                });
                
                // Add active class to chats tab
                document.querySelector('a[href="#chats"]').classList.add('active');
                
                // Show main content and chat interface
                document.querySelector('.main-content').style.display = 'block';
                document.querySelector('.new-chat').style.display = 'block';
                
                // Hide settings and about panels
                document.querySelector('#settings').classList.remove('active');
                document.querySelector('#about').classList.remove('active');
                
                // Show chats panel
                document.querySelector('#chats').classList.add('active');
            });
        });
    }

    handleTabChange(tabId) {
        const mainContent = document.querySelector('.main-content');
        const newChatButton = document.querySelector('.new-chat');
        const settingsPane = document.querySelector('#settings');
        const aboutPane = document.querySelector('#about');
        const chatsPane = document.querySelector('#chats');
        
        if (tabId === '#about' || tabId === '#settings') {
            mainContent.style.display = 'none';
            newChatButton.style.display = 'none';
            
            // Show the correct pane
            settingsPane.classList.toggle('active', tabId === '#settings');
            aboutPane.classList.toggle('active', tabId === '#about');
            chatsPane.classList.remove('active');
        } else {
            mainContent.style.display = 'block';
            newChatButton.style.display = 'block';
            
            // Hide settings and about, show chats
            settingsPane.classList.remove('active');
            aboutPane.classList.remove('active');
            chatsPane.classList.add('active');
        }

        const sidebar = document.querySelector('.sidebar');
        if (window.innerWidth <= 768 && sidebar.classList.contains('show')) {
            sidebar.classList.remove('show');
        }
    }

    initializeMobileMenu() {
        const menuToggle = document.querySelector('.mobile-menu-toggle');
        const sidebar = document.querySelector('.sidebar');
        
        if (menuToggle && sidebar) {
            menuToggle.addEventListener('click', () => {
                sidebar.classList.toggle('show');
            });

            // Close sidebar when clicking outside
            document.addEventListener('click', (e) => {
                if (sidebar.classList.contains('show') && 
                    !sidebar.contains(e.target) && 
                    !menuToggle.contains(e.target)) {
                    sidebar.classList.remove('show');
                }
            });

            // Close sidebar when selecting a chat
            document.querySelectorAll('.chat-item').forEach(item => {
                item.addEventListener('click', () => {
                    if (window.innerWidth <= 768) {
                        sidebar.classList.remove('show');
                    }
                });
            });
        }
    }
}

// Initialize the app
document.addEventListener('DOMContentLoaded', () => {
    const app = new ViraaApp();
}); 