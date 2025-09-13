// Nimbus Navbar Component
class NimbusNavbar {
  constructor() {
    this.currentPage = this.getCurrentPage();
    this.navItems = [
      { name: 'Charts', href: 'index.html', id: 'charts' },
      { name: 'Community', href: 'community.html', id: 'community' },
      { name: 'Bots', href: 'bots.html', id: 'bots' },
      { name: 'Nimbus Chats', href: 'chats.html', id: 'chats' },
      { name: 'Rewards', href: 'rewards.html', id: 'rewards' },
      { name: 'Learn', href: 'learn.html', id: 'learn' },
      { name: 'Leaderboard', href: 'leaderboard.html', id: 'leaderboard' },
      { name: 'Portfolio Book', href: 'portfolio.html', id: 'portfolio' }
    ];
  }

  getCurrentPage() {
    const path = window.location.pathname;
    const filename = path.split('/').pop() || 'index.html';
    return filename.replace('.html', '');
  }

  generateNavbar() {
    return `
      <header class="sticky top-0 z-50 glass-header shadow-glass border-b" style="border-color: var(--color-border-subtle);">
        <div class="h-14 flex items-center px-4 gap-3">
          <!-- Left cluster -->
          <div class="flex items-center gap-3">
            <div class="flex items-center gap-2 group">
              <div class="w-7 h-7 flex items-center justify-center">
                <img src="assets/img/logo.png" alt="Nimbus Logo" class="w-5 h-5 object-contain" onerror="this.style.display='none'; this.nextElementSibling.style.display='inline';">
                <svg width="18" height="18" viewBox="0 0 24 24" fill="none" style="display: none;">
                  <path d="M12 3l7 4v10l-7 4-7-4V7l7-4z" stroke="#6EE7B7" stroke-width="1.5"/>
                </svg>
              </div>
              <span class="text-sm font-semibold tracking-tight">Nimbus</span>
            </div>
            
            <!-- Primary menu tabs -->
            <nav class="hidden lg:flex items-center gap-1 ml-2">
              ${this.generateNavItems()}
            </nav>
          </div>

          <!-- Trading Status -->
          <div class="flex-1 flex items-center justify-end gap-6">
            <!-- Market Info -->

              <!-- Trading Metrics -->
              <div class="hidden lg:flex items-center gap-6">
                <!-- 1) Trading Status -->
                <div class="relative group">
                  <button class="flex flex-col items-start px-3 py-1 hover:bg-white/5 rounded transition-colors min-w-[80px]">
                    <span class="text-neutral-400 text-[10px] uppercase tracking-wide mb-0.5">Slippage</span>
                    <div class="flex items-center gap-1">
                      <span id="navbar-slippage" class="text-white mono font-medium text-[11px]">Est 0.00%</span>
                      <svg class="w-2.5 h-2.5 text-neutral-500" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M19 9l-7 7-7-7"/>
                      </svg>
                    </div>
                  </button>
                <div class="absolute top-full left-0 mt-1 w-48 bg-gray-900 border border-gray-700 rounded-md shadow-lg opacity-0 invisible group-hover:opacity-100 group-hover:visible transition-all z-50">
                  <div class="p-2 space-y-1 text-xs">
                    <div class="px-2 py-1 hover:bg-white/10 rounded cursor-pointer" data-metric="slippage-est">
                      <span class="text-neutral-400">Est Slippage:</span> <span class="text-white mono">0.00%</span>
                    </div>
                    <div class="px-2 py-1 hover:bg-white/10 rounded cursor-pointer" data-metric="slippage-max">
                      <span class="text-neutral-400">Max Slippage:</span> <span class="text-white mono">8.00%</span>
                    </div>
                    <div class="px-2 py-1 hover:bg-white/10 rounded cursor-pointer" data-metric="fees">
                      <span class="text-neutral-400">Fees:</span> <span class="text-white mono">—</span>
                    </div>
                    <div class="px-2 py-1 hover:bg-white/10 rounded cursor-pointer" data-metric="order-value">
                      <span class="text-neutral-400">Order Value:</span> <span class="text-white mono">N/A</span>
                    </div>
                    <div class="px-2 py-1 hover:bg-white/10 rounded cursor-pointer" data-metric="margin-required">
                      <span class="text-neutral-400">Margin Required:</span> <span class="text-white mono">N/A</span>
                    </div>
                    <div class="px-2 py-1 hover:bg-white/10 rounded cursor-pointer" data-metric="liq-price">
                      <span class="text-neutral-400">Liq Price:</span> <span class="text-white mono">N/A</span>
                    </div>
                  </div>
                </div>
              </div>
              
                <!-- 2) Account Equity -->
                <div class="relative group">
                  <button class="flex flex-col items-start px-3 py-1 hover:bg-white/5 rounded transition-colors min-w-[80px]">
                    <span class="text-neutral-400 text-[10px] uppercase tracking-wide mb-0.5">Equity</span>
                    <div class="flex items-center gap-1">
                      <span id="navbar-equity" class="text-emerald-300 mono font-medium text-[11px]">$2,829.23</span>
                      <svg class="w-2.5 h-2.5 text-neutral-500" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M19 9l-7 7-7-7"/>
                      </svg>
                    </div>
                  </button>
                <div class="absolute top-full left-0 mt-1 w-40 bg-gray-900 border border-gray-700 rounded-md shadow-lg opacity-0 invisible group-hover:opacity-100 group-hover:visible transition-all z-50">
                  <div class="p-2 space-y-1 text-xs">
                    <div class="px-2 py-1 hover:bg-white/10 rounded cursor-pointer" data-metric="total-equity">
                      <span class="text-neutral-400">Total:</span> <span class="text-emerald-300 mono">$2,829.23</span>
                    </div>
                    <div class="px-2 py-1 hover:bg-white/10 rounded cursor-pointer" data-metric="spot-equity">
                      <span class="text-neutral-400">SPOT:</span> <span class="text-white mono">$0.00</span>
                    </div>
                    <div class="px-2 py-1 hover:bg-white/10 rounded cursor-pointer" data-metric="perps-equity">
                      <span class="text-neutral-400">PERPS:</span> <span class="text-emerald-300 mono">$2,829.23</span>
                    </div>
                  </div>
                </div>
              </div>
              
                <!-- 3) Balance & PnL -->
                <div class="relative group">
                  <button class="flex flex-col items-start px-3 py-1 hover:bg-white/5 rounded transition-colors min-w-[80px]">
                    <span class="text-neutral-400 text-[10px] uppercase tracking-wide mb-0.5">Balance</span>
                    <div class="flex items-center gap-1">
                      <span id="navbar-balance" class="text-white mono font-medium text-[11px]">$2,829.23</span>
                      <svg class="w-2.5 h-2.5 text-neutral-500" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M19 9l-7 7-7-7"/>
                      </svg>
                    </div>
                  </button>
                <div class="absolute top-full left-0 mt-1 w-44 bg-gray-900 border border-gray-700 rounded-md shadow-lg opacity-0 invisible group-hover:opacity-100 group-hover:visible transition-all z-50">
                  <div class="p-2 space-y-1 text-xs">
                    <div class="px-2 py-1 hover:bg-white/10 rounded cursor-pointer" data-metric="available-balance">
                      <span class="text-neutral-400">Available:</span> <span class="text-white mono">$2,829.23</span>
                    </div>
                    <div class="px-2 py-1 hover:bg-white/10 rounded cursor-pointer" data-metric="unrealized-pnl">
                      <span class="text-neutral-400">Unrealized PnL:</span> <span class="text-white mono">$0.00</span>
                    </div>
                  </div>
                </div>
            </div>
            
                <!-- 4) Risk & Leverage -->
                <div class="relative group">
                  <button class="flex flex-col items-start px-3 py-1 hover:bg-white/5 rounded transition-colors min-w-[80px]">
                    <span class="text-neutral-400 text-[10px] uppercase tracking-wide mb-0.5">Margin</span>
                    <div class="flex items-center gap-1">
                      <span id="navbar-margin" class="text-white mono font-medium text-[11px]">0.00%</span>
                      <svg class="w-2.5 h-2.5 text-neutral-500" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M19 9l-7 7-7-7"/>
              </svg>
                    </div>
            </button>
                <div class="absolute top-full right-0 mt-1 w-48 bg-gray-900 border border-gray-700 rounded-md shadow-lg opacity-0 invisible group-hover:opacity-100 group-hover:visible transition-all z-50">
                  <div class="p-2 space-y-1 text-xs">
                    <div class="px-2 py-1 hover:bg-white/10 rounded cursor-pointer" data-metric="cross-margin-ratio">
                      <span class="text-neutral-400">Cross Margin:</span> <span class="text-white mono">0.00%</span>
                    </div>
                    <div class="px-2 py-1 hover:bg-white/10 rounded cursor-pointer" data-metric="cross-leverage">
                      <span class="text-neutral-400">Cross Leverage:</span> <span class="text-white mono">0.00x</span>
                    </div>
                    <div class="px-2 py-1 hover:bg-white/10 rounded cursor-pointer" data-metric="maintenance-margin">
                      <span class="text-neutral-400">Maintenance:</span> <span class="text-white mono">$0.00</span>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>

          <!-- Right cluster -->
          <div class="flex items-center gap-2 ml-auto">

            
            <button class="btn-primary h-9 px-3 rounded-md text-[13px] font-medium flex items-center justify-center">
              Deposit
            </button>
            <button class="btn-primary h-9 px-3 rounded-md text-[13px] font-medium flex items-center justify-center">
              Withdraw
            </button>
            <div class="hidden md:flex items-center gap-2 h-9 px-2 rounded-md glass">
              <img src="https://images.unsplash.com/photo-1503023345310-bd7c1de61c7d?q=80&w=48&auto=format&fit=crop" class="w-5 h-5 rounded-full" alt="Avatar">
              <span class="mono text-[12px]">0x0b5C...59C8</span>
              <img src="https://images.unsplash.com/photo-1621619856624-42fd193a0661?w=1080&q=80" class="w-4 h-4 rounded-sm" alt="Chain">
            </div>
            
            <!-- Mobile Trade button -->
            <button id="openMobileTrade" class="md:hidden h-9 px-3 rounded-md btn-secondary text-[13px]">Trade</button>
          </div>
        </div>
      </header>
    `;
  }

  generateNavItems() {
    return this.navItems.map(item => {
      const isActive = this.isActivePage(item);
      const activeClass = isActive ? 'nav-tab active' : 'nav-tab';
      return `<a href="${item.href}" class="${activeClass}">${item.name}</a>`;
    }).join('');
  }

  isActivePage(item) {
    // Check if current page matches the nav item
    if (item.href === 'index.html' && (this.currentPage === 'index' || this.currentPage === '')) {
      return true;
    }
    return this.currentPage === item.id;
  }

  render(targetSelector = '#navbar-container') {
    const container = document.querySelector(targetSelector);
    if (container) {
      container.innerHTML = this.generateNavbar();
    } else {
      console.warn('Navbar container not found:', targetSelector);
    }
  }

  // Method to update nav items (useful for dynamic changes)
  updateNavItems(newNavItems) {
    this.navItems = newNavItems;
    this.render();
  }

  // Method to add required CSS if not already present
  addNavbarStyles() {
    if (!document.querySelector('#navbar-styles')) {
      const styles = `
        <style id="navbar-styles">
          .glass-header {
            background: rgba(10, 12, 16, 0.85);
            backdrop-filter: blur(20px);
            -webkit-backdrop-filter: blur(20px);
          }

          .shadow-glass {
            box-shadow: 0 4px 24px rgba(0, 0, 0, 0.12);
          }

          .glass {
            background: rgba(11, 15, 20, 0.6);
            backdrop-filter: blur(12px);
            -webkit-backdrop-filter: blur(12px);
            border: 1px solid rgba(255, 255, 255, 0.08);
          }

          .nav-tab {
            padding: 8px 12px;
            border-radius: 6px;
            color: rgba(156, 163, 175, 0.9);
            transition: all 0.15s ease;
            font-size: 13px;
            font-weight: 500;
            text-decoration: none;
            position: relative;
          }

          .nav-tab:hover {
            color: rgba(229, 231, 235, 0.95);
            background: rgba(255, 255, 255, 0.04);
          }

          .nav-tab.active {
            color: rgba(110, 231, 183, 1);
            background: rgba(110, 231, 183, 0.08);
          }

          .btn-primary {
            background: linear-gradient(135deg, rgba(110, 231, 183, 1) 0%, rgba(52, 211, 153, 1) 100%);
            color: rgba(0, 0, 0, 0.9);
            font-weight: 600;
            transition: all 0.2s ease;
          }

          .btn-primary:hover {
            background: linear-gradient(135deg, rgba(110, 231, 183, 0.9) 0%, rgba(52, 211, 153, 0.9) 100%);
            transform: translateY(-1px);
          }

          .btn-secondary {
            background: rgba(55, 65, 81, 0.6);
            color: rgba(156, 163, 175, 0.9);
            transition: all 0.15s ease;
          }

          .btn-secondary:hover {
            background: rgba(75, 85, 99, 0.7);
            color: rgba(229, 231, 235, 1);
          }

          .focus-ring:focus {
            outline: none;
            border-color: rgba(110, 231, 183, 0.5);
            box-shadow: 0 0 0 3px rgba(110, 231, 183, 0.1);
          }

          .mono {
            font-family: 'Geist Mono', 'SF Mono', 'Monaco', 'Inconsolata', 'Roboto Mono', monospace;
          }
        </style>
      `;
      document.head.insertAdjacentHTML('beforeend', styles);
    }
  }

  // Initialize the navbar
  init(targetSelector = '#navbar-container') {
    // Add styles if needed
    this.addNavbarStyles();
    
    // Render the navbar
    this.render(targetSelector);
    
    // Add mobile menu functionality if needed
    this.initMobileMenu();
    
    // Setup trading status functionality
    this.setupTradingStatus();
  }
  
  // Setup trading status functionality
  setupTradingStatus() {
    // Store user preferences for default metrics
    this.preferences = {
      tradingStatus: 'slippage-est',
      accountEquity: 'total-equity', 
      balance: 'available-balance',
      risk: 'cross-margin-ratio'
    };
    
    // Load saved preferences
    const saved = localStorage.getItem('navbar-preferences');
    if (saved) {
      this.preferences = { ...this.preferences, ...JSON.parse(saved) };
    }
    
    // Setup dropdown click handlers
    document.addEventListener('click', (e) => {
      const metricItem = e.target.closest('[data-metric]');
      if (metricItem) {
        const metric = metricItem.getAttribute('data-metric');
        this.setDefaultMetric(metric, metricItem);
      }
    });
    
    // Initial sync with sidebar data (delayed to ensure DOM is ready)
    setTimeout(() => this.syncTradingData(), 100);
  }
  
  // Set a metric as default for its group
  setDefaultMetric(metric, element) {
    const group = this.getMetricGroup(metric);
    if (group) {
      this.preferences[group] = metric;
      this.updateNavbarDisplay(group, metric, element);
      // Store preference
      localStorage.setItem('navbar-preferences', JSON.stringify(this.preferences));
    }
  }
  
  // Get which group a metric belongs to
  getMetricGroup(metric) {
    const groups = {
      'slippage-est': 'tradingStatus',
      'slippage-max': 'tradingStatus', 
      'fees': 'tradingStatus',
      'order-value': 'tradingStatus',
      'margin-required': 'tradingStatus',
      'liq-price': 'tradingStatus',
      'total-equity': 'accountEquity',
      'spot-equity': 'accountEquity',
      'perps-equity': 'accountEquity',
      'available-balance': 'balance',
      'unrealized-pnl': 'balance',
      'cross-margin-ratio': 'risk',
      'cross-leverage': 'risk',
      'maintenance-margin': 'risk'
    };
    return groups[metric];
  }
  
  // Update navbar display based on selected metric
  updateNavbarDisplay(group, metric, element) {
    const selectors = {
      'tradingStatus': '#navbar-slippage',
      'accountEquity': '#navbar-equity', 
      'balance': '#navbar-balance',
      'risk': '#navbar-margin'
    };
    
    // Update the main display
    const mainElement = document.querySelector(selectors[group]);
    const valueElement = element.querySelector('.mono');
    
    if (mainElement && valueElement) {
      mainElement.textContent = valueElement.textContent;
      
      // Update label if needed for different metrics - find the label in the stacked layout
      const buttonElement = mainElement.closest('button');
      const labelElement = buttonElement ? buttonElement.querySelector('span:first-child') : null;
      
      if (labelElement) {
        const customLabels = {
          'slippage-max': 'Max Slip',
          'fees': 'Fees',
          'order-value': 'Order',
          'margin-required': 'Margin Req',
          'liq-price': 'Liq Price',
          'spot-equity': 'SPOT',
          'perps-equity': 'PERPS',
          'unrealized-pnl': 'PnL',
          'cross-leverage': 'Leverage',
          'maintenance-margin': 'Maint'
        };
        
        const newLabel = customLabels[metric];
        if (newLabel) {
          labelElement.textContent = newLabel;
        }
      }
    }
  }
  
  // Sync data from sidebar elements (for index.html)
  syncTradingData() {
    // This will sync data from the sidebar trading panel
    if (typeof window !== 'undefined' && (window.location.pathname.includes('index.html') || window.location.pathname === '/')) {
      this.syncFromSidebar();
    }
  }
  
  // Sync specific values from sidebar elements
  syncFromSidebar() {
    const mappings = [
      { sidebar: '#slippageValue', navbar: '#navbar-slippage' },
      { sidebar: '#perpsBalance', navbar: '#navbar-equity' },
      { sidebar: '#perpsBalance2', navbar: '#navbar-balance' },
      { sidebar: '#crossMarginRatio', navbar: '#navbar-margin' }
    ];
    
    mappings.forEach(({ sidebar, navbar }) => {
      const sidebarEl = document.querySelector(sidebar);
      const navbarEl = document.querySelector(navbar);
      if (sidebarEl && navbarEl) {
        navbarEl.textContent = sidebarEl.textContent;
      }
    });
  }

  // Mobile menu functionality (optional)
  initMobileMenu() {
    // This can be expanded for mobile hamburger menu
    console.log('Mobile menu initialized');
  }
}

// Auto-initialize when DOM is loaded
document.addEventListener('DOMContentLoaded', () => {
  // Create global navbar instance
  window.nimbusNavbar = new NimbusNavbar();
  
  // Auto-render if container exists
  if (document.querySelector('#navbar-container')) {
    window.nimbusNavbar.init();
  }
});

// Export for module use
if (typeof module !== 'undefined' && module.exports) {
  module.exports = NimbusNavbar;
}
