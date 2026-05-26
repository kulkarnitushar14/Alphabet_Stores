// ============================================================
// ALPHABET STORE — Mobile Menu + Global Search
// Adds responsive hamburger menu and search bar to all pages
// ============================================================

(function() {
  // Inject CSS once
  const css = `
    /* Mobile Hamburger Button */
    .alpha-hamburger {
      display: none;
      width: 32px; height: 32px;
      flex-direction: column;
      justify-content: center;
      gap: 5px;
      background: none;
      border: none;
      cursor: pointer;
      padding: 0;
      margin-right: 12px;
      z-index: 60;
    }
    .alpha-hamburger span {
      display: block;
      width: 22px; height: 2px;
      background: var(--text-primary, #121212);
      transition: all 0.3s ease;
    }
    .alpha-hamburger.open span:nth-child(1) { transform: translateY(7px) rotate(45deg); }
    .alpha-hamburger.open span:nth-child(2) { opacity: 0; }
    .alpha-hamburger.open span:nth-child(3) { transform: translateY(-7px) rotate(-45deg); }

    /* Mobile Drawer */
    .alpha-drawer {
      position: fixed;
      top: 0; left: -100%;
      width: 85%; max-width: 320px; height: 100vh;
      background: #FAFAFA;
      z-index: 100;
      transition: left 0.3s ease;
      box-shadow: 4px 0 20px rgba(0,0,0,0.15);
      overflow-y: auto;
      display: flex;
      flex-direction: column;
    }
    [data-theme="dark"] .alpha-drawer { background: #111; }
    .alpha-drawer.open { left: 0; }
    .alpha-drawer-overlay {
      position: fixed;
      inset: 0;
      background: rgba(0,0,0,0.5);
      z-index: 99;
      opacity: 0;
      pointer-events: none;
      transition: opacity 0.3s ease;
    }
    .alpha-drawer-overlay.show { opacity: 1; pointer-events: auto; }

    .alpha-drawer-header {
      padding: 28px 24px 20px;
      border-bottom: 1px solid #e5e7eb;
      display: flex; justify-content: space-between; align-items: center;
    }
    [data-theme="dark"] .alpha-drawer-header { border-color: #2e2e2e; }
    .alpha-drawer-logo {
      font-family: 'Inter', sans-serif;
      font-weight: 800;
      font-size: 1.25rem;
      letter-spacing: 0.25em;
      color: var(--text-primary, #121212);
      text-decoration: none;
    }
    .alpha-drawer-close {
      background: none; border: none;
      font-size: 1.5rem;
      cursor: pointer;
      color: var(--text-primary, #121212);
      line-height: 1;
    }

    .alpha-drawer-search {
      padding: 16px 24px;
      border-bottom: 1px solid #e5e7eb;
    }
    [data-theme="dark"] .alpha-drawer-search { border-color: #2e2e2e; }
    .alpha-drawer-search-input {
      width: 100%;
      padding: 12px 16px;
      border: 1px solid #d1d5db;
      background: white;
      font-size: 0.9rem;
      outline: none;
      font-family: 'Inter', sans-serif;
    }
    [data-theme="dark"] .alpha-drawer-search-input { background: #1e1e1e; color: #f5f5f5; border-color: #333; }
    .alpha-drawer-search-input:focus { border-color: #D4AF37; }

    .alpha-drawer-nav {
      flex: 1;
      padding: 12px 0;
    }
    .alpha-drawer-nav a {
      display: flex; align-items: center; gap: 12px;
      padding: 14px 24px;
      font-size: 0.95rem;
      color: var(--text-primary, #121212);
      text-decoration: none;
      border-bottom: 1px solid #f0f0f0;
      font-weight: 500;
      letter-spacing: 0.05em;
      text-transform: uppercase;
      transition: all 0.15s;
    }
    [data-theme="dark"] .alpha-drawer-nav a { border-color: #1e1e1e; color: #f5f5f5; }
    .alpha-drawer-nav a:hover {
      background: rgba(212,175,55,0.1);
      color: #D4AF37;
      padding-left: 30px;
    }
    .alpha-drawer-nav .nav-icon {
      width: 18px; height: 18px;
      stroke: currentColor;
      flex-shrink: 0;
    }

    .alpha-drawer-section {
      padding: 12px 24px;
      font-size: 0.65rem;
      text-transform: uppercase;
      letter-spacing: 0.2em;
      color: #999;
      font-weight: 600;
      background: rgba(0,0,0,0.02);
    }
    [data-theme="dark"] .alpha-drawer-section { background: rgba(255,255,255,0.02); color: #666; }

    .alpha-drawer-footer {
      padding: 20px 24px;
      border-top: 1px solid #e5e7eb;
      background: #121212;
      color: white;
    }
    .alpha-drawer-footer-title {
      font-size: 0.7rem;
      text-transform: uppercase;
      letter-spacing: 0.15em;
      color: #D4AF37;
      margin-bottom: 10px;
      font-weight: 600;
    }
    .alpha-drawer-footer-link {
      display: flex; align-items: center; gap: 10px;
      padding: 8px 0;
      font-size: 0.85rem;
      color: #ccc;
      text-decoration: none;
    }
    .alpha-drawer-footer-link:hover { color: #D4AF37; }
    .alpha-drawer-footer-link svg { width: 14px; height: 14px; opacity: 0.7; }

    /* Global Search Bar (for desktop where space allows) */
    .alpha-global-search {
      position: relative;
      max-width: 260px;
      width: 100%;
    }
    .alpha-global-search-input {
      width: 100%;
      padding: 8px 14px 8px 38px;
      border: 1px solid #e5e7eb;
      background: rgba(0,0,0,0.03);
      font-size: 0.8rem;
      outline: none;
      font-family: 'Inter', sans-serif;
      transition: all 0.2s;
    }
    [data-theme="dark"] .alpha-global-search-input { background: #1a1a1a; color: #f5f5f5; border-color: #333; }
    .alpha-global-search-input:focus { border-color: #D4AF37; background: white; max-width: 320px; }
    [data-theme="dark"] .alpha-global-search-input:focus { background: #242424; }
    .alpha-global-search-icon {
      position: absolute;
      left: 12px; top: 50%;
      transform: translateY(-50%);
      width: 16px; height: 16px;
      pointer-events: none;
      opacity: 0.5;
    }

    /* Search Results Dropdown */
    .alpha-search-results {
      position: absolute;
      top: 100%; left: 0; right: 0;
      background: white;
      border: 1px solid #e5e7eb;
      max-height: 400px;
      overflow-y: auto;
      z-index: 50;
      display: none;
      box-shadow: 0 8px 24px rgba(0,0,0,0.1);
    }
    [data-theme="dark"] .alpha-search-results { background: #1e1e1e; border-color: #333; }
    .alpha-search-results.show { display: block; }
    .alpha-search-result {
      display: flex; align-items: center; gap: 12px;
      padding: 10px 14px;
      border-bottom: 1px solid #f0f0f0;
      cursor: pointer;
      text-decoration: none;
      color: inherit;
      transition: background 0.15s;
    }
    [data-theme="dark"] .alpha-search-result { border-color: #2a2a2a; }
    .alpha-search-result:hover { background: rgba(212,175,55,0.08); }
    .alpha-search-result-img {
      width: 40px; height: 40px;
      object-fit: cover;
      background: #f3f4f6;
      flex-shrink: 0;
    }
    .alpha-search-result-info { flex: 1; min-width: 0; }
    .alpha-search-result-name {
      font-size: 0.82rem;
      font-weight: 500;
      color: var(--text-primary, #121212);
      margin-bottom: 2px;
      white-space: nowrap; overflow: hidden; text-overflow: ellipsis;
    }
    .alpha-search-result-price {
      font-size: 0.72rem;
      color: #D4AF37;
      font-weight: 600;
    }
    .alpha-search-empty {
      padding: 30px 14px;
      text-align: center;
      color: #999;
      font-size: 0.85rem;
    }

    /* RESPONSIVE: show hamburger only on mobile */
    @media (max-width: 768px) {
      .alpha-hamburger { display: flex; }
      .alpha-global-search { display: none; }
    }
    @media (max-width: 480px) {
      .alpha-drawer { width: 92%; }
    }
  `;
  const style = document.createElement('style');
  style.textContent = css;
  document.head.appendChild(style);

  // Build the drawer HTML
  function buildDrawer() {
    const drawer = document.createElement('aside');
    drawer.className = 'alpha-drawer';
    drawer.setAttribute('aria-label', 'Mobile navigation');
    drawer.innerHTML = `
      <div class="alpha-drawer-header">
        <a href="index.html" class="alpha-drawer-logo">ALPHABET</a>
        <button class="alpha-drawer-close" aria-label="Close menu">✕</button>
      </div>
      <div class="alpha-drawer-search">
        <input type="text" placeholder="Search products..." class="alpha-drawer-search-input" id="alpha-mobile-search" aria-label="Search products">
        <div class="alpha-search-results" id="alpha-mobile-results"></div>
      </div>
      <div class="alpha-drawer-section">Shop</div>
      <nav class="alpha-drawer-nav">
        <a href="index.html"><svg class="nav-icon" fill="none" viewBox="0 0 24 24" stroke-width="1.5"><path stroke-linecap="round" stroke-linejoin="round" d="M2.25 12L12 2.25 21.75 12M4.5 9.75v10.125c0 .621.504 1.125 1.125 1.125H9.75v-4.875c0-.621.504-1.125 1.125-1.125h2.25c.621 0 1.125.504 1.125 1.125V21h4.125c.621 0 1.125-.504 1.125-1.125V9.75"/></svg>Home</a>
        <a href="catalogue.html"><svg class="nav-icon" fill="none" viewBox="0 0 24 24" stroke-width="1.5"><path stroke-linecap="round" stroke-linejoin="round" d="M13.5 21v-7.5a.75.75 0 01.75-.75h3a.75.75 0 01.75.75V21m-4.5 0H2.36m11.14 0H18m0 0h3.64m-1.39 0V9.349m-16.5 11.65V9.35m0 0a3.001 3.001 0 003.75-.615A2.993 2.993 0 009.75 9.75c.896 0 1.7-.393 2.25-1.016a2.993 2.993 0 002.25 1.016c.896 0 1.7-.393 2.25-1.016a3.001 3.001 0 003.75.614m-16.5 0a3.004 3.004 0 01-.621-4.72L4.318 3.44A1.5 1.5 0 015.378 3h13.243a1.5 1.5 0 011.06.44l1.19 1.189a3 3 0 01-.621 4.72m-13.5 8.65h3.75a.75.75 0 00.75-.75V13.5a.75.75 0 00-.75-.75H6.75a.75.75 0 00-.75.75v3.75c0 .415.336.75.75.75z"/></svg>Shop All Products</a>
        <a href="catalogue.html?cat=kitchen"><svg class="nav-icon" fill="none" viewBox="0 0 24 24" stroke-width="1.5"><path stroke-linecap="round" stroke-linejoin="round" d="M6 18L18 6M6 6l12 12"/></svg>Kitchen Essentials</a>
        <a href="catalogue.html?cat=gadgets"><svg class="nav-icon" fill="none" viewBox="0 0 24 24" stroke-width="1.5"><path stroke-linecap="round" stroke-linejoin="round" d="M3.75 13.5l10.5-11.25L12 10.5h8.25L9.75 21.75 12 13.5H3.75z"/></svg>Smart Gadgets</a>
        <a href="catalogue.html?cat=home"><svg class="nav-icon" fill="none" viewBox="0 0 24 24" stroke-width="1.5"><path stroke-linecap="round" stroke-linejoin="round" d="M2.25 7.125C2.25 6.504 2.754 6 3.375 6h6c.621 0 1.125.504 1.125 1.125v3.75c0 .621-.504 1.125-1.125 1.125h-6a1.125 1.125 0 01-1.125-1.125v-3.75z"/></svg>Home & Storage</a>
        <a href="catalogue.html?cat=stationery"><svg class="nav-icon" fill="none" viewBox="0 0 24 24" stroke-width="1.5"><path stroke-linecap="round" stroke-linejoin="round" d="M16.862 4.487l1.687-1.688a1.875 1.875 0 112.652 2.652L10.582 16.07a4.5 4.5 0 01-1.897 1.13L6 18l.8-2.685a4.5 4.5 0 011.13-1.897l8.932-8.931z"/></svg>Stationery</a>
      </nav>

      <div class="alpha-drawer-section">Discover</div>
      <nav class="alpha-drawer-nav">
        <a href="blog.html"><svg class="nav-icon" fill="none" viewBox="0 0 24 24" stroke-width="1.5"><path stroke-linecap="round" stroke-linejoin="round" d="M12 7.5h1.5m-1.5 3h1.5m-7.5 3h7.5m-7.5 3h7.5m3-9h3.375c.621 0 1.125.504 1.125 1.125V18a2.25 2.25 0 01-2.25 2.25M16.5 7.5V18a2.25 2.25 0 002.25 2.25M16.5 7.5V4.875c0-.621-.504-1.125-1.125-1.125H4.125C3.504 3.75 3 4.254 3 4.875V18a2.25 2.25 0 002.25 2.25h13.5"/></svg>Blog & Guides</a>
        <a href="reviews.html"><svg class="nav-icon" fill="none" viewBox="0 0 24 24" stroke-width="1.5"><path stroke-linecap="round" stroke-linejoin="round" d="M11.48 3.499a.562.562 0 011.04 0l2.125 5.111a.563.563 0 00.475.345l5.518.442c.499.04.701.663.321.988l-4.204 3.602a.563.563 0 00-.182.557l1.285 5.385a.562.562 0 01-.84.61l-4.725-2.885a.563.563 0 00-.586 0L6.982 20.54a.562.562 0 01-.84-.61l1.285-5.386a.562.562 0 00-.182-.557l-4.204-3.602a.562.562 0 01.321-.988l5.518-.442a.563.563 0 00.475-.345L11.48 3.5z"/></svg>Customer Reviews</a>
        <a href="about_us.html"><svg class="nav-icon" fill="none" viewBox="0 0 24 24" stroke-width="1.5"><path stroke-linecap="round" stroke-linejoin="round" d="M11.25 11.25l.041-.02a.75.75 0 011.063.852l-.708 2.836a.75.75 0 001.063.853l.041-.021M21 12a9 9 0 11-18 0 9 9 0 0118 0zm-9-3.75h.008v.008H12V8.25z"/></svg>About Us</a>
      </nav>

      <div class="alpha-drawer-section">Account & Support</div>
      <nav class="alpha-drawer-nav">
        <a href="cart.html"><svg class="nav-icon" fill="none" viewBox="0 0 24 24" stroke-width="1.5"><path stroke-linecap="round" stroke-linejoin="round" d="M2.25 3h1.386c.51 0 .955.343 1.087.835l.383 1.437M7.5 14.25a3 3 0 00-3 3h15.75m-12.75-3h11.218c1.121-2.3 2.1-4.684 2.924-7.138a60.114 60.114 0 00-16.536-1.84M7.5 14.25L5.106 5.272M6 20.25a.75.75 0 11-1.5 0 .75.75 0 011.5 0zm12.75 0a.75.75 0 11-1.5 0 .75.75 0 011.5 0z"/></svg>My Cart</a>
        <a href="track-order.html"><svg class="nav-icon" fill="none" viewBox="0 0 24 24" stroke-width="1.5"><path stroke-linecap="round" stroke-linejoin="round" d="M9 17.25v1.007a3 3 0 01-.879 2.122L7.5 21h9l-.621-.621A3 3 0 0115 18.257V17.25m6-12V15a2.25 2.25 0 01-2.25 2.25H5.25A2.25 2.25 0 013 15V5.25m18 0A2.25 2.25 0 0018.75 3H5.25A2.25 2.25 0 003 5.25m18 0V12a2.25 2.25 0 01-2.25 2.25H5.25A2.25 2.25 0 013 12V5.25"/></svg>Track Order</a>
        <a href="faq.html"><svg class="nav-icon" fill="none" viewBox="0 0 24 24" stroke-width="1.5"><path stroke-linecap="round" stroke-linejoin="round" d="M9.879 7.519c1.171-1.025 3.071-1.025 4.242 0 1.172 1.025 1.172 2.687 0 3.712-.203.179-.43.326-.67.442-.745.361-1.45.999-1.45 1.827v.75M21 12a9 9 0 11-18 0 9 9 0 0118 0zm-9 5.25h.008v.008H12v-.008z"/></svg>FAQ</a>
        <a href="contact.html"><svg class="nav-icon" fill="none" viewBox="0 0 24 24" stroke-width="1.5"><path stroke-linecap="round" stroke-linejoin="round" d="M21.75 6.75v10.5a2.25 2.25 0 01-2.25 2.25h-15a2.25 2.25 0 01-2.25-2.25V6.75m19.5 0A2.25 2.25 0 0019.5 4.5h-15a2.25 2.25 0 00-2.25 2.25m19.5 0v.243a2.25 2.25 0 01-1.07 1.916l-7.5 4.615a2.25 2.25 0 01-2.36 0L3.32 8.91a2.25 2.25 0 01-1.07-1.916V6.75"/></svg>Contact Us</a>
      </nav>

      <div class="alpha-drawer-footer">
        <div class="alpha-drawer-footer-title">Need help?</div>
        <a href="tel:+917021909150" class="alpha-drawer-footer-link">
          <svg fill="none" viewBox="0 0 24 24" stroke="currentColor" stroke-width="1.5"><path stroke-linecap="round" stroke-linejoin="round" d="M3 5a2 2 0 012-2h3.28a1 1 0 01.948.684l1.498 4.493a1 1 0 01-.502 1.21l-2.257 1.13a11.042 11.042 0 005.516 5.516l1.13-2.257a1 1 0 011.21-.502l4.493 1.498a1 1 0 01.684.949V19a2 2 0 01-2 2h-1C9.716 21 3 14.284 3 6V5z"/></svg>
          +91 70219 09150
        </a>
        <a href="https://wa.me/917021909150" target="_blank" rel="noopener" class="alpha-drawer-footer-link">
          <svg fill="currentColor" viewBox="0 0 24 24"><path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347z"/></svg>
          WhatsApp Us
        </a>
        <a href="mailto:alphabetstores@gmail.com" class="alpha-drawer-footer-link">
          <svg fill="none" viewBox="0 0 24 24" stroke="currentColor" stroke-width="1.5"><path stroke-linecap="round" stroke-linejoin="round" d="M3 8l7.89 5.26a2 2 0 002.22 0L21 8M5 19h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z"/></svg>
          alphabetstores@gmail.com
        </a>
      </div>
    `;
    document.body.appendChild(drawer);

    const overlay = document.createElement('div');
    overlay.className = 'alpha-drawer-overlay';
    document.body.appendChild(overlay);

    return { drawer, overlay };
  }

  // Search functionality
  function setupSearch(inputEl, resultsEl) {
    if (!inputEl || !resultsEl) return;
    let timer;
    inputEl.addEventListener('input', () => {
      clearTimeout(timer);
      const q = inputEl.value.trim().toLowerCase();
      if (!q) { resultsEl.classList.remove('show'); resultsEl.innerHTML=''; return; }
      timer = setTimeout(() => {
        if (typeof PRODUCTS === 'undefined') return;
        const matches = PRODUCTS.filter(p =>
          (p.name||'').toLowerCase().includes(q) ||
          (p.subtitle||'').toLowerCase().includes(q) ||
          (p.desc||'').toLowerCase().includes(q) ||
          (p.cat||'').toLowerCase().includes(q)
        ).slice(0, 6);
        if (!matches.length) {
          resultsEl.innerHTML = '<div class="alpha-search-empty">No products found for "' + q + '"</div>';
        } else {
          resultsEl.innerHTML = matches.map(p => `
            <a href="product.html?id=${p.id}" class="alpha-search-result">
              <img loading="lazy" src="${p.image}" alt="${p.name}" class="alpha-search-result-img">
              <div class="alpha-search-result-info">
                <div class="alpha-search-result-name">${p.name}</div>
                <div class="alpha-search-result-price">₹${p.price} <span style="color:#999;text-decoration:line-through;font-weight:normal;margin-left:6px">₹${p.mrp}</span></div>
              </div>
            </a>
          `).join('') + `<a href="catalogue.html?q=${encodeURIComponent(q)}" class="alpha-search-result" style="background:rgba(212,175,55,0.05);justify-content:center;font-size:0.78rem;text-transform:uppercase;letter-spacing:0.1em;color:#D4AF37;font-weight:600">View all results →</a>`;
        }
        resultsEl.classList.add('show');
      }, 150);
    });
    inputEl.addEventListener('blur', () => setTimeout(() => resultsEl.classList.remove('show'), 200));
    inputEl.addEventListener('focus', () => { if (inputEl.value) resultsEl.classList.add('show'); });
  }

  // Initialize
  function init() {
    if (document.querySelector('.alpha-hamburger')) return;
    const header = document.querySelector('header nav, header > nav, nav.max-w-7xl');
    if (!header) return;

    // Build hamburger button
    const hamburger = document.createElement('button');
    hamburger.className = 'alpha-hamburger';
    hamburger.setAttribute('aria-label', 'Open menu');
    hamburger.innerHTML = '<span></span><span></span><span></span>';
    header.insertBefore(hamburger, header.firstChild);

    // Build drawer
    const { drawer, overlay } = buildDrawer();

    // Toggle handlers
    function open() {
      drawer.classList.add('open');
      overlay.classList.add('show');
      hamburger.classList.add('open');
      document.body.style.overflow = 'hidden';
    }
    function close() {
      drawer.classList.remove('open');
      overlay.classList.remove('show');
      hamburger.classList.remove('open');
      document.body.style.overflow = '';
    }
    hamburger.addEventListener('click', open);
    overlay.addEventListener('click', close);
    drawer.querySelector('.alpha-drawer-close').addEventListener('click', close);
    document.addEventListener('keydown', e => { if (e.key === 'Escape') close(); });

    // Setup mobile search
    setupSearch(
      drawer.querySelector('#alpha-mobile-search'),
      drawer.querySelector('#alpha-mobile-results')
    );

    // Try to add desktop search to nav if there's space
    const navRight = header.querySelector('.flex.flex-1.justify-end');
    if (navRight && !document.querySelector('.alpha-global-search')) {
      // Only add if there isn't already a search-input (catalogue.html already has one)
      if (!document.getElementById('search-input')) {
        const desktopSearch = document.createElement('div');
        desktopSearch.className = 'alpha-global-search hidden md:block';
        desktopSearch.innerHTML = `
          <svg class="alpha-global-search-icon" fill="none" viewBox="0 0 24 24" stroke="currentColor" stroke-width="1.5"><path stroke-linecap="round" stroke-linejoin="round" d="M21 21l-5.197-5.197m0 0A7.5 7.5 0 105.196 5.196a7.5 7.5 0 0010.607 10.607z"/></svg>
          <input type="text" placeholder="Search products..." class="alpha-global-search-input" id="alpha-desktop-search" aria-label="Search products">
          <div class="alpha-search-results" id="alpha-desktop-results"></div>
        `;
        navRight.insertBefore(desktopSearch, navRight.firstChild);
        setupSearch(
          desktopSearch.querySelector('#alpha-desktop-search'),
          desktopSearch.querySelector('#alpha-desktop-results')
        );
      }
    }
  }

  if (document.readyState === 'loading') {
    document.addEventListener('DOMContentLoaded', init);
  } else {
    init();
  }
})();
