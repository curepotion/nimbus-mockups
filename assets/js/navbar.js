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

          <!-- Center Search -->
          <div class="flex-1 flex items-center justify-center gap-3">
            <div class="hidden md:flex items-center text-xs text-gray-300">
              <span class="hover:underline hover:text-white cursor-pointer">Markets</span>
              <span class="mx-2">/</span>
              <span class="text-white">BTC-PERP</span>
            </div>
            
            <button id="searchBtn" class="flex items-center gap-2 w-full max-w-[420px] h-9 px-3 rounded-md glass text-[13px] text-gray-300 focus-ring hover:text-white transition-all">
              <svg class="w-4 h-4" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2">
                <circle cx="11" cy="11" r="8"/>
                <path d="M21 21l-4.35-4.35"/>
              </svg>
              <span class="truncate">Search markets, actions...</span>
              <span class="ml-auto text-[11px] text-gray-400">⌘K</span>
            </button>
          </div>

          <!-- Right cluster -->
          <div class="flex items-center gap-2">
            <div class="hidden md:flex items-center gap-2 h-9 px-2 rounded-md glass">
              <img src="https://images.unsplash.com/photo-1503023345310-bd7c1de61c7d?q=80&w=48&auto=format&fit=crop" class="w-5 h-5 rounded-full" alt="Avatar">
              <span class="mono text-[12px]">0x0b5C...59C8</span>
              <img src="https://images.unsplash.com/photo-1621619856624-42fd193a0661?w=1080&q=80" class="w-4 h-4 rounded-sm" alt="Chain">
            </div>
            
            <button class="btn-primary h-9 px-3 rounded-md text-[13px] font-medium">
              Deposit
            </button>
            
            <button class="h-9 w-9 rounded-md btn-secondary flex items-center justify-center hover:brightness-110" title="Notifications">
              <svg class="w-7 h-7" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2">
                <path d="M6 8a6 6 0 0 1 12 0c0 7 3 9 3 9H3s3-2 3-9"/>
                <path d="M13.73 21a2 2 0 0 1-3.46 0"/>
              </svg>
            </button>
            
            <button class="h-9 w-9 rounded-md btn-secondary flex items-center justify-center hover:brightness-110" title="Settings">
              <svg class="w-7 h-7" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2">
                <circle cx="12" cy="12" r="3"/>
                <path d="M12 1v6m0 6v6m11-7h-6m-6 0H1m15.5-3.5L19 10l1.5-1.5M5 14l1.5-1.5L5 10L3.5 8.5"/>
              </svg>
            </button>
            
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
