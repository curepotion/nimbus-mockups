/**
 * NIMBUS COMPONENT SYSTEM
 * Component-based architecture for HTML applications
 */

class NimbusComponents {
  constructor() {
    this.components = new Map();
    this.state = new Proxy({}, {
      set: (target, key, value) => {
        target[key] = value;
        this.notifyStateChange(key, value);
        return true;
      }
    });
    this.eventBus = new EventTarget();
  }

  // Utility functions
  static $ = (selector, root = document) => root.querySelector(selector);
  static $$ = (selector, root = document) => [...root.querySelectorAll(selector)];
  static fmt = (num, decimals = 2) => Number(num).toLocaleString(undefined, { 
    minimumFractionDigits: decimals, 
    maximumFractionDigits: decimals 
  });

  // Event system
  emit(event, data) {
    this.eventBus.dispatchEvent(new CustomEvent(event, { detail: data }));
  }

  on(event, handler) {
    this.eventBus.addEventListener(event, handler);
  }

  off(event, handler) {
    this.eventBus.removeEventListener(event, handler);
  }

  // State management
  setState(key, value) {
    this.state[key] = value;
  }

  getState(key) {
    return this.state[key];
  }

  notifyStateChange(key, value) {
    this.emit('stateChange', { key, value });
  }

  // Component registration
  registerComponent(name, component) {
    this.components.set(name, component);
  }

  getComponent(name) {
    return this.components.get(name);
  }

  // Template engine
  template(strings, ...values) {
    return strings.reduce((result, string, i) => {
      return result + string + (values[i] || '');
    }, '');
  }

  // Component rendering
  render(componentName, props = {}, container) {
    const component = this.components.get(componentName);
    if (!component) {
      console.error(`Component ${componentName} not found`);
      return;
    }

    const html = typeof component === 'function' ? component(props) : component;
    
    if (container) {
      if (typeof container === 'string') {
        container = NimbusComponents.$(container);
      }
      container.innerHTML = html;
      this.initializeIcons();
    }
    
    return html;
  }

  // Initialize Lucide icons
  initializeIcons() {
    if (window.lucide && lucide.createIcons) {
      lucide.createIcons();
    }
  }

  // Toast notification system
  showToast(message, type = 'info', duration = 3000) {
    const container = NimbusComponents.$('#toastContainer') || this.createToastContainer();
    const toast = document.createElement('div');
    toast.className = 'pointer-events-auto rounded-md glass-strong px-3 py-2 text-[13px] flex items-center gap-2 shadow-elevated fade-in';
    
    const icons = {
      success: 'check-circle-2',
      error: 'alert-triangle',
      warning: 'alert-circle',
      info: 'info'
    };
    
    toast.innerHTML = `
      <i data-lucide="${icons[type] || icons.info}" class="w-4 h-4"></i>
      <span>${message}</span>
    `;
    
    container.appendChild(toast);
    this.initializeIcons();
    
    setTimeout(() => {
      toast.style.opacity = '0';
      toast.style.transform = 'translateY(-10px)';
      setTimeout(() => toast.remove(), 200);
    }, duration);
  }

  createToastContainer() {
    const container = document.createElement('div');
    container.id = 'toastContainer';
    container.className = 'fixed inset-x-0 bottom-6 flex flex-col items-center gap-2 z-[90] pointer-events-none';
    document.body.appendChild(container);
    return container;
  }

  // Modal system
  showModal(modalId, show = true) {
    const modal = NimbusComponents.$(`#${modalId}`);
    if (modal) {
      modal.classList.toggle('hidden', !show);
      modal.classList.toggle('flex', show);
      
      if (show) {
        // Focus first input if available
        const firstInput = modal.querySelector('input, button, select, textarea');
        if (firstInput) firstInput.focus();
      }
    }
  }

  // Navigation system
  navigateTo(page) {
    // Hide all pages
    NimbusComponents.$$('.page').forEach(page => page.classList.add('hidden'));
    
    // Show target page
    const targetPage = NimbusComponents.$(`#${page}Page`);
    if (targetPage) {
      targetPage.classList.remove('hidden');
      this.setState('currentPage', page);
      this.emit('pageChange', { page });
    }

    // Update navigation
    this.updateNavigation(page);
  }

  updateNavigation(activePage) {
    NimbusComponents.$$('.nav-tab').forEach(tab => {
      const isActive = tab.dataset.page === activePage;
      tab.classList.toggle('active', isActive);
    });
  }

  // Initialize the component system
  init() {
    this.initializeComponents();
    this.setupEventListeners();
    this.initializeIcons();
    
    // Set initial page
    const initialPage = this.getState('currentPage') || 'charts';
    this.navigateTo(initialPage);
    
    console.log('Nimbus Component System initialized');
  }

  initializeComponents() {
    // Register all components
    this.registerComponent('header', this.components.header);
    this.registerComponent('navigation', this.components.navigation);
    this.registerComponent('statsCard', this.components.statsCard);
    this.registerComponent('tradingPanel', this.components.tradingPanel);
    this.registerComponent('modal', this.components.modal);
  }

  setupEventListeners() {
    // Global keyboard shortcuts
    document.addEventListener('keydown', (e) => {
      // Escape key closes modals
      if (e.key === 'Escape') {
        NimbusComponents.$$('.modal.flex').forEach(modal => {
          modal.classList.add('hidden');
          modal.classList.remove('flex');
        });
      }
      
      // Cmd/Ctrl + K opens search
      if ((e.ctrlKey || e.metaKey) && e.key.toLowerCase() === 'k') {
        e.preventDefault();
        this.showModal('commandPalette', true);
      }
    });

    // Click outside to close dropdowns
    document.addEventListener('click', (e) => {
      NimbusComponents.$$('.dropdown.open').forEach(dropdown => {
        if (!dropdown.contains(e.target)) {
          dropdown.classList.remove('open');
        }
      });
    });

    // Navigation handling
    document.addEventListener('click', (e) => {
      const navTab = e.target.closest('.nav-tab');
      if (navTab && navTab.dataset.page) {
        e.preventDefault();
        this.navigateTo(navTab.dataset.page);
      }
    });
  }
}

// Component definitions
NimbusComponents.prototype.components = {
  // Header component
  header: (props = {}) => `
    <header class="sticky top-0 z-50 glass-header shadow-glass border-b" style="border-color: var(--color-border-subtle);">
      <div class="h-14 flex items-center px-4 gap-3">
        <!-- Brand -->
        <div class="header-brand">
          <div class="header-brand-icon">
            <svg width="18" height="18" viewBox="0 0 24 24" fill="none">
              <path d="M12 3l7 4v10l-7 4-7-4V7l7-4z" stroke="#6EE7B7" stroke-width="1.5"/>
            </svg>
          </div>
          <span class="text-sm font-semibold tracking-tight">${props.title || 'Nimbus'}</span>
        </div>
        
        <!-- Navigation -->
        <nav class="hidden lg:flex items-center gap-1 ml-2">
          <button class="nav-tab" data-page="charts">Charts</button>
          <button class="nav-tab" data-page="community">Community</button>
          <button class="nav-tab" data-page="strategies">Strategies</button>
          <button class="nav-tab" data-page="chats">Nimbus Chats</button>
          <button class="nav-tab" data-page="rewards">Rewards</button>
          <button class="nav-tab" data-page="learn">Learn</button>
          <button class="nav-tab" data-page="leaderboard">Leaderboard</button>
          <button class="nav-tab" data-page="profile">Profile</button>
        </nav>

        <!-- Search -->
        <div class="flex-1 flex items-center justify-center gap-3">
          <div class="hidden md:flex items-center text-xs text-gray-300">
            <span class="hover:underline hover:text-white cursor-pointer">Markets</span>
            <span class="mx-2">/</span>
            <span class="text-white">${props.currentMarket || 'BTC-PERP'}</span>
          </div>
          
          <button id="searchBtn" class="header-search flex items-center gap-2 h-9 px-3 rounded-md glass text-[13px] text-gray-300 focus-ring hover:text-white transition-all">
            <i data-lucide="search" class="w-4 h-4"></i>
            <span class="truncate">Search markets, actions...</span>
            <span class="ml-auto text-[11px] text-gray-400">⌘K</span>
          </button>
        </div>

        <!-- User Actions -->
        <div class="flex items-center gap-2">
          <div class="hidden md:flex items-center gap-2 h-9 px-2 rounded-md glass">
            <img src="https://images.unsplash.com/photo-1503023345310-bd7c1de61c7d?q=80&w=48&auto=format&fit=crop" class="w-5 h-5 rounded-full" alt="Avatar">
            <span class="mono text-[12px]">${props.wallet || '0x0b5C...59C8'}</span>
            <img src="https://images.unsplash.com/photo-1621619856624-42fd193a0661?w=1080&q=80" class="w-4 h-4 rounded-sm" alt="Chain">
          </div>
          
          <button class="btn-primary btn-sm">Deposit</button>
          
          <button class="btn-secondary btn-sm w-9 h-9 p-0" title="Notifications">
            <i data-lucide="bell" class="w-4 h-4"></i>
          </button>
          
          <button class="btn-secondary btn-sm w-9 h-9 p-0" title="Settings">
            <i data-lucide="settings" class="w-4 h-4"></i>
          </button>
        </div>
      </div>
    </header>
  `,

  // Stats card component
  statsCard: (props = {}) => `
    <div class="card">
      <div class="card-header">
        <h3 class="text-sm font-semibold">${props.title || 'Statistics'}</h3>
      </div>
      <div class="card-body">
        <div class="stats-card">
          ${props.stats?.map(stat => `
            <div class="stats-item">
              <div class="stats-value ${stat.trend === 'up' ? 'status-positive' : stat.trend === 'down' ? 'status-negative' : ''}">${stat.value}</div>
              <div class="stats-label">${stat.label}</div>
            </div>
          `).join('') || ''}
        </div>
      </div>
    </div>
  `,

  // Modal component
  modal: (props = {}) => `
    <div id="${props.id}" class="fixed inset-0 hidden items-center justify-center z-[${props.zIndex || 80}]">
      <div class="absolute inset-0 bg-black/60 backdrop-blur-sm" onclick="nimbus.showModal('${props.id}', false)"></div>
      <div class="relative w-full max-w-${props.size || 'md'} rounded-lg glass-strong shadow-elevated p-4">
        <div class="flex items-center justify-between mb-4">
          <div class="text-[14px] font-semibold tracking-tight">${props.title}</div>
          <button class="btn-secondary btn-sm w-8 h-8 p-0" onclick="nimbus.showModal('${props.id}', false)">
            <i data-lucide="x" class="w-4 h-4"></i>
          </button>
        </div>
        <div class="modal-content">
          ${props.content || ''}
        </div>
      </div>
    </div>
  `,

  // Page layout component
  pageLayout: (props = {}) => `
    <div id="${props.id}Page" class="page ${props.hidden ? 'hidden' : ''}">
      <div class="min-h-screen bg-gradient-main">
        ${props.header !== false ? nimbus.render('header', props.headerProps || {}) : ''}
        
        <main class="flex-1">
          ${props.content || ''}
        </main>
        
        ${props.footer || ''}
      </div>
    </div>
  `,

  // Community page specific components
  communityPost: (props = {}) => `
    <div class="card mb-4">
      <div class="card-body">
        <div class="flex items-start gap-3">
          <img src="${props.avatar}" alt="${props.username}" class="w-10 h-10 rounded-full">
          <div class="flex-1">
            <div class="flex items-center gap-2 mb-2">
              <span class="font-semibold">${props.username}</span>
              <span class="text-xs text-gray-400">${props.timestamp}</span>
              ${props.verified ? '<i data-lucide="check-circle-2" class="w-4 h-4 text-blue-400"></i>' : ''}
            </div>
            <p class="text-sm mb-3">${props.content}</p>
            ${props.image ? `<img src="${props.image}" alt="Post image" class="rounded-lg mb-3 max-w-full">` : ''}
            <div class="flex items-center gap-4 text-xs text-gray-400">
              <button class="flex items-center gap-1 hover:text-emerald-400">
                <i data-lucide="heart" class="w-4 h-4"></i>
                <span>${props.likes || 0}</span>
              </button>
              <button class="flex items-center gap-1 hover:text-blue-400">
                <i data-lucide="message-circle" class="w-4 h-4"></i>
                <span>${props.comments || 0}</span>
              </button>
              <button class="flex items-center gap-1 hover:text-green-400">
                <i data-lucide="share" class="w-4 h-4"></i>
                <span>Share</span>
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  `,

  // Leaderboard row component
  leaderboardRow: (props = {}) => `
    <tr class="hover:bg-white/5 transition-colors">
      <td class="px-4 py-3 text-center">
        <div class="flex items-center justify-center">
          ${props.rank <= 3 ? `<div class="w-6 h-6 rounded-full ${props.rank === 1 ? 'bg-yellow-500' : props.rank === 2 ? 'bg-gray-400' : 'bg-amber-600'} flex items-center justify-center text-xs font-bold text-black">${props.rank}</div>` : `<span class="font-semibold">${props.rank}</span>`}
        </div>
      </td>
      <td class="px-4 py-3">
        <div class="flex items-center gap-3">
          <img src="${props.avatar}" alt="${props.username}" class="w-8 h-8 rounded-full">
          <div>
            <div class="font-semibold">${props.username}</div>
            <div class="text-xs text-gray-400">${props.level}</div>
          </div>
        </div>
      </td>
      <td class="px-4 py-3 text-right">
        <span class="font-semibold mono ${props.pnl >= 0 ? 'text-emerald-400' : 'text-red-400'}">
          ${props.pnl >= 0 ? '+' : ''}${NimbusComponents.fmt(props.pnl)}%
        </span>
      </td>
      <td class="px-4 py-3 text-right">
        <span class="font-semibold mono">${NimbusComponents.fmt(props.volume)}</span>
      </td>
      <td class="px-4 py-3 text-right">
        <span class="font-semibold">${props.trades}</span>
      </td>
      <td class="px-4 py-3 text-right">
        <span class="font-semibold mono">${props.winRate}%</span>
      </td>
    </tr>
  `
};

// Global instance
window.nimbus = new NimbusComponents();
