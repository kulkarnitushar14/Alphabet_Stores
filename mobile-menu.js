// ALPHABET STORE — Mobile Menu v2 (bulletproof)
(function() {
  'use strict';

  const css = `
    .alpha-hamburger {
      display: none;
      width: 44px; height: 44px;
      flex-direction: column;
      justify-content: center;
      align-items: center;
      gap: 5px;
      background: #D4AF37;
      border: none;
      cursor: pointer;
      padding: 0;
      margin-right: 8px;
      z-index: 60;
      transition: all 0.2s;
      flex-shrink: 0;
      border-radius: 2px;
    }
    .alpha-hamburger:hover { background: #b8941f; }
    .alpha-hamburger span {
      display: block;
      width: 22px; height: 2.5px;
      background: #121212;
      transition: all 0.3s ease;
      border-radius: 2px;
    }
    .alpha-hamburger.open { background: #121212; }
    .alpha-hamburger.open span { background: #fff; }
    .alpha-hamburger.open span:nth-child(1) { transform: translateY(7.5px) rotate(45deg); }
    .alpha-hamburger.open span:nth-child(2) { opacity: 0; }
    .alpha-hamburger.open span:nth-child(3) { transform: translateY(-7.5px) rotate(-45deg); }

    .alpha-drawer {
      position: fixed; top: 0; right: -100%;
      width: 88%; max-width: 360px;
      height: 100vh; height: 100dvh;
      background: #FAFAFA;
      z-index: 99999;
      transition: right 0.35s cubic-bezier(0.4, 0, 0.2, 1);
      box-shadow: -8px 0 32px rgba(0,0,0,0.25);
      overflow-y: auto;
      display: flex; flex-direction: column;
      -webkit-overflow-scrolling: touch;
    }
    .alpha-drawer.open { right: 0; }

    .alpha-drawer-overlay {
      position: fixed; inset: 0;
      background: rgba(0,0,0,0.6);
      z-index: 99998;
      opacity: 0;
      pointer-events: none;
      transition: opacity 0.35s ease;
    }
    .alpha-drawer-overlay.show { opacity: 1; pointer-events: auto; }

    .alpha-drawer-header {
      padding: 24px 24px 20px;
      background: #121212;
      color: #fff;
      display: flex; justify-content: space-between; align-items: center;
      position: sticky; top: 0; z-index: 2;
    }
    .alpha-drawer-logo {
      font-family: 'Inter', sans-serif;
      font-weight: 800;
      font-size: 1.1rem;
      letter-spacing: 0.25em;
      color: #fff;
      text-decoration: none;
      display: flex; align-items: center; gap: 8px;
    }
    .alpha-drawer-logo svg { width: 24px; height: 24px; }
    .alpha-drawer-close {
      background: transparent; border: none;
      width: 36px; height: 36px;
      cursor: pointer; color: #fff;
      font-size: 1.5rem; line-height: 1;
      display: flex; align-items: center; justify-content: center;
      border-radius: 50%;
      transition: background 0.2s;
    }
    .alpha-drawer-close:hover { background: rgba(255,255,255,0.1); }

    .alpha-drawer-search {
      padding: 16px 20px;
      background: #fff;
      border-bottom: 1px solid #e5e7eb;
    }
    .alpha-drawer-search-wrap { position: relative; }
    .alpha-drawer-search-input {
      width: 100%;
      padding: 12px 16px 12px 42px;
      border: 1.5px solid #e5e7eb;
      background: #f9fafb;
      font-size: 0.92rem;
      outline: none;
      font-family: 'Inter', sans-serif;
      border-radius: 4px;
      box-sizing: border-box;
    }
    .alpha-drawer-search-input:focus { border-color: #D4AF37; background: #fff; }
    .alpha-drawer-search-icon {
      position: absolute; left: 14px; top: 50%;
      transform: translateY(-50%);
      width: 18px; height: 18px;
      pointer-events: none; opacity: 0.4;
    }

    .alpha-drawer-section {
      padding: 14px 24px 8px;
      font-size: 0.65rem;
      text-transform: uppercase;
      letter-spacing: 0.22em;
      color: #9ca3af;
      font-weight: 700;
      background: #f3f4f6;
    }
    .alpha-drawer-nav { background: #fff; }
    .alpha-drawer-nav a {
      display: flex; align-items: center; gap: 14px;
      padding: 16px 24px;
      font-size: 0.95rem;
      color: #121212;
      text-decoration: none;
      border-bottom: 1px solid #f0f0f0;
      font-weight: 500;
      letter-spacing: 0.05em;
      text-transform: uppercase;
      transition: all 0.15s;
    }
    .alpha-drawer-nav a:hover, .alpha-drawer-nav a:active {
      background: rgba(212,175,55,0.08);
      color: #D4AF37;
      padding-left: 30px;
    }
    .alpha-drawer-nav .nav-icon { width: 20px; height: 20px; stroke: currentColor; flex-shrink: 0; }
    .alpha-drawer-nav .arrow { margin-left: auto; width: 14px; height: 14px; opacity: 0.3; }

    .alpha-drawer-footer {
      padding: 20px 24px;
      background: #121212;
      color: #fff;
      margin-top: auto;
    }
    .alpha-drawer-footer-title {
      font-size: 0.7rem;
      text-transform: uppercase;
      letter-spacing: 0.2em;
      color: #D4AF37;
      margin-bottom: 12px;
      font-weight: 700;
    }
    .alpha-drawer-footer-link {
      display: flex; align-items: center; gap: 12px;
      padding: 10px 0;
      font-size: 0.88rem;
      color: #d1d5db;
      text-decoration: none;
      border-bottom: 1px solid rgba(255,255,255,0.08);
    }
    .alpha-drawer-footer-link:last-child { border-bottom: none; }
    .alpha-drawer-footer-link:hover { color: #D4AF37; }
    .alpha-drawer-footer-link svg { width: 16px; height: 16px; opacity: 0.7; flex-shrink: 0; }

    .alpha-search-results {
      max-height: 320px;
      overflow-y: auto;
      background: #fff;
      border-bottom: 1px solid #e5e7eb;
      display: none;
    }
    .alpha-search-results.show { display: block; }
    .alpha-search-result {
      display: flex; align-items: center; gap: 12px;
      padding: 12px 20px;
      border-bottom: 1px solid #f0f0f0;
      text-decoration: none;
      color: inherit;
    }
    .alpha-search-result:hover { background: rgba(212,175,55,0.06); }
    .alpha-search-result-img {
      width: 44px; height: 44px;
      object-fit: cover;
      background: #f3f4f6;
      flex-shrink: 0;
      border-radius: 3px;
    }
    .alpha-search-result-info { flex: 1; min-width: 0; }
    .alpha-search-result-name {
      font-size: 0.85rem;
      font-weight: 500;
      color: #121212;
      margin-bottom: 2px;
      white-space: nowrap;
      overflow: hidden;
      text-overflow: ellipsis;
    }
    .alpha-search-result-price {
      font-size: 0.75rem;
      color: #D4AF37;
      font-weight: 600;
    }
    .alpha-search-empty {
      padding: 24px 14px;
      text-align: center;
      color: #9ca3af;
      font-size: 0.85rem;
    }

    @media (max-width: 768px) {
      .alpha-hamburger { display: flex !important; }
    }

    body.drawer-open { overflow: hidden; }

    /* ============ DARK MODE ============ */
    [data-theme="dark"] .alpha-drawer {
      background: #111111;
      color: #F5F5F5;
    }
    [data-theme="dark"] .alpha-drawer-header {
      background: #000;
      border-bottom: 1px solid #2a2a2a;
    }
    [data-theme="dark"] .alpha-drawer-search {
      background: #1a1a1a;
      border-bottom-color: #2a2a2a;
    }
    [data-theme="dark"] .alpha-drawer-search-input {
      background: #242424;
      border-color: #333;
      color: #F5F5F5;
    }
    [data-theme="dark"] .alpha-drawer-search-input:focus {
      background: #2a2a2a;
      border-color: #D4AF37;
    }
    [data-theme="dark"] .alpha-drawer-search-input::placeholder {
      color: #888;
    }
    [data-theme="dark"] .alpha-drawer-section {
      background: #0a0a0a;
      color: #888;
    }
    [data-theme="dark"] .alpha-drawer-nav {
      background: #1a1a1a;
    }
    [data-theme="dark"] .alpha-drawer-nav a {
      color: #F5F5F5;
      border-bottom-color: #2a2a2a;
    }
    [data-theme="dark"] .alpha-drawer-nav a:hover,
    [data-theme="dark"] .alpha-drawer-nav a:active {
      background: rgba(212,175,55,0.12);
      color: #D4AF37;
    }
    [data-theme="dark"] .alpha-drawer-footer {
      background: #000;
      border-top: 1px solid #2a2a2a;
    }
    [data-theme="dark"] .alpha-search-results {
      background: #1a1a1a;
      border-bottom-color: #2a2a2a;
    }
    [data-theme="dark"] .alpha-search-result {
      border-bottom-color: #2a2a2a;
    }
    [data-theme="dark"] .alpha-search-result-name {
      color: #F5F5F5;
    }
    [data-theme="dark"] .alpha-search-result:hover {
      background: rgba(212,175,55,0.08);
    }
    [data-theme="dark"] .alpha-search-empty {
      color: #666;
    }
  `;

  const style = document.createElement('style');
  style.id = 'alpha-mobile-menu-styles';
  style.textContent = css;
  document.head.appendChild(style);

  function buildDrawer() {
    const drawer = document.createElement('aside');
    drawer.className = 'alpha-drawer';
    drawer.setAttribute('aria-label', 'Mobile navigation');
    drawer.innerHTML = `
      <div class="alpha-drawer-header">
        <a href="index.html" class="alpha-drawer-logo">
          <img src="logo-sm.png" alt="Alphabet" style="width:28px;height:28px;border-radius:4px;background:white;padding:2px">
          ALPHABET
        </a>
        <div style="display:flex;align-items:center;gap:8px">
          <button class="alpha-drawer-darkmode" aria-label="Toggle dark mode" onclick="if(typeof toggleDarkMode==='function')toggleDarkMode()" style="background:transparent;border:none;width:36px;height:36px;cursor:pointer;color:#fff;display:flex;align-items:center;justify-content:center;border-radius:50%;transition:background 0.2s" onmouseover="this.style.background='rgba(255,255,255,0.1)'" onmouseout="this.style.background='transparent'">
            <svg width="18" height="18" fill="none" viewBox="0 0 24 24" stroke="currentColor" stroke-width="1.5"><path stroke-linecap="round" stroke-linejoin="round" d="M21.752 15.002A9.718 9.718 0 0118 15.75c-5.385 0-9.75-4.365-9.75-9.75 0-1.33.266-2.597.748-3.752A9.753 9.753 0 003 11.25C3 16.635 7.365 21 12.75 21a9.753 9.753 0 009.002-5.998z"/></svg>
          </button>
          <button class="alpha-drawer-close" aria-label="Close menu">✕</button>
        </div>
      </div>
      <div class="alpha-drawer-search">
        <div class="alpha-drawer-search-wrap">
          <svg class="alpha-drawer-search-icon" fill="none" viewBox="0 0 24 24" stroke="currentColor" stroke-width="2"><path stroke-linecap="round" stroke-linejoin="round" d="M21 21l-5.197-5.197m0 0A7.5 7.5 0 105.196 5.196a7.5 7.5 0 0010.607 10.607z"/></svg>
          <input type="text" placeholder="Search products..." class="alpha-drawer-search-input" id="alpha-mobile-search" autocomplete="off">
        </div>
      </div>
      <div class="alpha-search-results" id="alpha-mobile-results"></div>

      <div class="alpha-drawer-section">Shop</div>
      <nav class="alpha-drawer-nav">
        <a href="index.html"><svg class="nav-icon" fill="none" viewBox="0 0 24 24" stroke-width="1.5"><path stroke-linecap="round" stroke-linejoin="round" d="M2.25 12L12 2.25 21.75 12M4.5 9.75v10.125c0 .621.504 1.125 1.125 1.125H9.75v-4.875c0-.621.504-1.125 1.125-1.125h2.25c.621 0 1.125.504 1.125 1.125V21h4.125c.621 0 1.125-.504 1.125-1.125V9.75"/></svg>Home<svg class="arrow" fill="none" viewBox="0 0 24 24" stroke="currentColor" stroke-width="2"><path stroke-linecap="round" stroke-linejoin="round" d="M9 5l7 7-7 7"/></svg></a>
        <a href="catalogue.html"><svg class="nav-icon" fill="none" viewBox="0 0 24 24" stroke-width="1.5"><path stroke-linecap="round" stroke-linejoin="round" d="M3.75 5.25h16.5m-16.5 4.5h16.5m-16.5 4.5h16.5m-16.5 4.5h16.5"/></svg>All Products<svg class="arrow" fill="none" viewBox="0 0 24 24" stroke="currentColor" stroke-width="2"><path stroke-linecap="round" stroke-linejoin="round" d="M9 5l7 7-7 7"/></svg></a>
        <a href="video.html"><svg class="nav-icon" fill="none" viewBox="0 0 24 24" stroke-width="1.5"><path stroke-linecap="round" stroke-linejoin="round" d="M15.75 10.5l4.72-4.72a.75.75 0 011.28.53v11.38a.75.75 0 01-1.28.53l-4.72-4.72M4.5 18.75h9a2.25 2.25 0 002.25-2.25v-9a2.25 2.25 0 00-2.25-2.25h-9A2.25 2.25 0 002.25 7.5v9a2.25 2.25 0 002.25 2.25z"/></svg>Videos<svg class="arrow" fill="none" viewBox="0 0 24 24" stroke="currentColor" stroke-width="2"><path stroke-linecap="round" stroke-linejoin="round" d="M9 5l7 7-7 7"/></svg></a>
        <a href="account.html"><svg class="nav-icon" fill="none" viewBox="0 0 24 24" stroke-width="1.5"><path stroke-linecap="round" stroke-linejoin="round" d="M15.75 6a3.75 3.75 0 11-7.5 0 3.75 3.75 0 017.5 0zM4.501 20.118a7.5 7.5 0 0114.998 0A17.933 17.933 0 0112 21.75c-2.676 0-5.216-.584-7.499-1.632z"/></svg>My Account<svg class="arrow" fill="none" viewBox="0 0 24 24" stroke="currentColor" stroke-width="2"><path stroke-linecap="round" stroke-linejoin="round" d="M9 5l7 7-7 7"/></svg></a>
        <a href="cart.html"><svg class="nav-icon" fill="none" viewBox="0 0 24 24" stroke-width="1.5"><path stroke-linecap="round" stroke-linejoin="round" d="M2.25 3h1.386c.51 0 .955.343 1.087.835l.383 1.437M7.5 14.25a3 3 0 00-3 3h15.75m-12.75-3h11.218c1.121-2.3 2.1-4.684 2.924-7.138a60.114 60.114 0 00-16.536-1.84M7.5 14.25L5.106 5.272M6 20.25a.75.75 0 11-1.5 0 .75.75 0 011.5 0zm12.75 0a.75.75 0 11-1.5 0 .75.75 0 011.5 0z"/></svg>My Cart<svg class="arrow" fill="none" viewBox="0 0 24 24" stroke="currentColor" stroke-width="2"><path stroke-linecap="round" stroke-linejoin="round" d="M9 5l7 7-7 7"/></svg></a>
        <a href="track-order.html"><svg class="nav-icon" fill="none" viewBox="0 0 24 24" stroke-width="1.5"><path stroke-linecap="round" stroke-linejoin="round" d="M8.25 18.75a1.5 1.5 0 01-3 0m3 0a1.5 1.5 0 00-3 0m3 0h6m-9-1.5h11.25m-11.25 0a1.5 1.5 0 01-1.5-1.5V6a1.5 1.5 0 011.5-1.5h11.25a1.5 1.5 0 011.5 1.5v9.75m-12.75 0V18a.75.75 0 00.75.75H17.25"/></svg>Track Order<svg class="arrow" fill="none" viewBox="0 0 24 24" stroke="currentColor" stroke-width="2"><path stroke-linecap="round" stroke-linejoin="round" d="M9 5l7 7-7 7"/></svg></a>
      </nav>

      <div class="alpha-drawer-section">Discover</div>
      <nav class="alpha-drawer-nav">
        <a href="blog.html"><svg class="nav-icon" fill="none" viewBox="0 0 24 24" stroke-width="1.5"><path stroke-linecap="round" stroke-linejoin="round" d="M12 7.5h1.5m-1.5 3h1.5m-7.5 3h7.5m-7.5 3h7.5m3-9h3.375c.621 0 1.125.504 1.125 1.125V18a2.25 2.25 0 01-2.25 2.25M16.5 7.5V18a2.25 2.25 0 002.25 2.25M16.5 7.5V4.875c0-.621-.504-1.125-1.125-1.125H4.125C3.504 3.75 3 4.254 3 4.875V18a2.25 2.25 0 002.25 2.25h13.5"/></svg>Blog<svg class="arrow" fill="none" viewBox="0 0 24 24" stroke="currentColor" stroke-width="2"><path stroke-linecap="round" stroke-linejoin="round" d="M9 5l7 7-7 7"/></svg></a>
        <a href="reviews.html"><svg class="nav-icon" fill="none" viewBox="0 0 24 24" stroke-width="1.5"><path stroke-linecap="round" stroke-linejoin="round" d="M11.48 3.499a.562.562 0 011.04 0l2.125 5.111a.563.563 0 00.475.345l5.518.442c.499.04.701.663.321.988l-4.204 3.602a.563.563 0 00-.182.557l1.285 5.385a.562.562 0 01-.84.61l-4.725-2.885a.563.563 0 00-.586 0L6.982 20.54a.562.562 0 01-.84-.61l1.285-5.386a.562.562 0 00-.182-.557l-4.204-3.602a.562.562 0 01.321-.988l5.518-.442a.563.563 0 00.475-.345L11.48 3.5z"/></svg>Reviews<svg class="arrow" fill="none" viewBox="0 0 24 24" stroke="currentColor" stroke-width="2"><path stroke-linecap="round" stroke-linejoin="round" d="M9 5l7 7-7 7"/></svg></a>
        <a href="about_us.html"><svg class="nav-icon" fill="none" viewBox="0 0 24 24" stroke-width="1.5"><path stroke-linecap="round" stroke-linejoin="round" d="M11.25 11.25l.041-.02a.75.75 0 011.063.852l-.708 2.836a.75.75 0 001.063.853l.041-.021M21 12a9 9 0 11-18 0 9 9 0 0118 0zm-9-3.75h.008v.008H12V8.25z"/></svg>Our Story<svg class="arrow" fill="none" viewBox="0 0 24 24" stroke="currentColor" stroke-width="2"><path stroke-linecap="round" stroke-linejoin="round" d="M9 5l7 7-7 7"/></svg></a>
      </nav>

      <div class="alpha-drawer-section">Support</div>
      <nav class="alpha-drawer-nav">
        <a href="contact.html"><svg class="nav-icon" fill="none" viewBox="0 0 24 24" stroke-width="1.5"><path stroke-linecap="round" stroke-linejoin="round" d="M21.75 6.75v10.5a2.25 2.25 0 01-2.25 2.25h-15a2.25 2.25 0 01-2.25-2.25V6.75m19.5 0A2.25 2.25 0 0019.5 4.5h-15a2.25 2.25 0 00-2.25 2.25m19.5 0v.243a2.25 2.25 0 01-1.07 1.916l-7.5 4.615a2.25 2.25 0 01-2.36 0L3.32 8.91a2.25 2.25 0 01-1.07-1.916V6.75"/></svg>Contact<svg class="arrow" fill="none" viewBox="0 0 24 24" stroke="currentColor" stroke-width="2"><path stroke-linecap="round" stroke-linejoin="round" d="M9 5l7 7-7 7"/></svg></a>
        <a href="faq.html"><svg class="nav-icon" fill="none" viewBox="0 0 24 24" stroke-width="1.5"><path stroke-linecap="round" stroke-linejoin="round" d="M9.879 7.519c1.171-1.025 3.071-1.025 4.242 0 1.172 1.025 1.172 2.687 0 3.712-.203.179-.43.326-.67.442-.745.361-1.45.999-1.45 1.827v.75M21 12a9 9 0 11-18 0 9 9 0 0118 0zm-9 5.25h.008v.008H12v-.008z"/></svg>FAQ<svg class="arrow" fill="none" viewBox="0 0 24 24" stroke="currentColor" stroke-width="2"><path stroke-linecap="round" stroke-linejoin="round" d="M9 5l7 7-7 7"/></svg></a>
        <a href="shipping-policy.html"><svg class="nav-icon" fill="none" viewBox="0 0 24 24" stroke-width="1.5"><path stroke-linecap="round" stroke-linejoin="round" d="M8.25 18.75a1.5 1.5 0 01-3 0m3 0a1.5 1.5 0 00-3 0m3 0h6m-9-1.5h11.25m-11.25 0a1.5 1.5 0 01-1.5-1.5V6a1.5 1.5 0 011.5-1.5h11.25a1.5 1.5 0 011.5 1.5v9.75m-12.75 0V18a.75.75 0 00.75.75H17.25"/></svg>Shipping<svg class="arrow" fill="none" viewBox="0 0 24 24" stroke="currentColor" stroke-width="2"><path stroke-linecap="round" stroke-linejoin="round" d="M9 5l7 7-7 7"/></svg></a>
        <a href="refund-policy.html"><svg class="nav-icon" fill="none" viewBox="0 0 24 24" stroke-width="1.5"><path stroke-linecap="round" stroke-linejoin="round" d="M19.5 12c0-1.232-.046-2.453-.138-3.662a4.006 4.006 0 00-3.7-3.7 48.678 48.678 0 00-7.324 0 4.006 4.006 0 00-3.7 3.7c-.017.22-.032.441-.046.662M19.5 12l3-3m-3 3l-3-3m-12 3c0 1.232.046 2.453.138 3.662a4.006 4.006 0 003.7 3.7 48.656 48.656 0 007.324 0 4.006 4.006 0 003.7-3.7c.017-.22.032-.441.046-.662M4.5 12l3 3m-3-3l-3 3"/></svg>Returns<svg class="arrow" fill="none" viewBox="0 0 24 24" stroke="currentColor" stroke-width="2"><path stroke-linecap="round" stroke-linejoin="round" d="M9 5l7 7-7 7"/></svg></a>
      </nav>

      <div class="alpha-drawer-section">Also Shop On</div>
      <nav class="alpha-drawer-nav">
        <a href="https://www.amazon.in/l/27943762031?me=A26U434B1B4F73&tag=ShopReferral_84abbad7-b49a-425c-ae7c-281bfe72df47&ref=sf_seller_app_share_new_ls_srb" target="_blank" rel="noopener" style="background:linear-gradient(135deg,#FFF9E6,#FFFBF0);border-left:3px solid #FF9900">
          <svg viewBox="0 0 100 30" style="height:22px;width:auto;flex-shrink:0">
            <text x="0" y="20" font-family="Arial, sans-serif" font-weight="700" font-size="20" fill="#232F3E">amazon</text>
            <path d="M2 24 Q 35 30 70 24" stroke="#FF9900" stroke-width="2" fill="none" stroke-linecap="round"/>
            <path d="M64 21 L 70 24 L 65 28" stroke="#FF9900" stroke-width="2" fill="none" stroke-linecap="round" stroke-linejoin="round"/>
          </svg>
          Storefront
          <svg class="arrow" fill="none" viewBox="0 0 24 24" stroke="currentColor" stroke-width="2"><path stroke-linecap="round" stroke-linejoin="round" d="M14 5l7 7m0 0l-7 7m7-7H3"/></svg>
        </a>
        <a href="#" onclick="event.preventDefault();alert('Flipkart store launching soon!');" style="opacity:0.6">
          <svg viewBox="0 0 100 30" style="height:22px;width:auto;flex-shrink:0">
            <text x="0" y="20" font-family="Arial, sans-serif" font-weight="700" font-size="20" fill="#2874F0" font-style="italic">Flipkart</text>
          </svg>
          Coming Soon
          <span style="margin-left:auto;font-size:0.6rem;background:#D4AF37;color:#121212;padding:2px 8px;font-weight:700;letter-spacing:0.1em">SOON</span>
        </a>
      </nav>

      <div class="alpha-drawer-footer">
        <div class="alpha-drawer-footer-title">Talk to us</div>
        <a href="https://wa.me/917021909150?text=Hi%20Alphabet%20Store!" target="_blank" rel="noopener" class="alpha-drawer-footer-link">
          <svg fill="currentColor" viewBox="0 0 24 24"><path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347z"/></svg>
          WhatsApp Us
        </a>
        <a href="tel:+917021909150" class="alpha-drawer-footer-link">
          <svg fill="none" viewBox="0 0 24 24" stroke="currentColor" stroke-width="1.5"><path stroke-linecap="round" stroke-linejoin="round" d="M2.25 6.75c0 8.284 6.716 15 15 15h2.25a2.25 2.25 0 002.25-2.25v-1.372c0-.516-.351-.966-.852-1.091l-4.423-1.106c-.44-.11-.902.055-1.173.417l-.97 1.293c-.282.376-.769.542-1.21.38a12.035 12.035 0 01-7.143-7.143c-.162-.441.004-.928.38-1.21l1.293-.97c.363-.271.527-.734.417-1.173L6.963 3.102a1.125 1.125 0 00-1.091-.852H4.5A2.25 2.25 0 002.25 4.5v2.25z"/></svg>
          +91 70219 09150
        </a>
        <a href="mailto:alphabetstores@gmail.com" class="alpha-drawer-footer-link">
          <svg fill="none" viewBox="0 0 24 24" stroke="currentColor" stroke-width="1.5"><path stroke-linecap="round" stroke-linejoin="round" d="M21.75 6.75v10.5a2.25 2.25 0 01-2.25 2.25h-15a2.25 2.25 0 01-2.25-2.25V6.75m19.5 0A2.25 2.25 0 0019.5 4.5h-15a2.25 2.25 0 00-2.25 2.25m19.5 0v.243a2.25 2.25 0 01-1.07 1.916l-7.5 4.615a2.25 2.25 0 01-2.36 0L3.32 8.91a2.25 2.25 0 01-1.07-1.916V6.75"/></svg>
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

  function setupSearch(inputEl, resultsEl) {
    if (!inputEl || !resultsEl) return;
    let timer;
    inputEl.addEventListener('input', () => {
      clearTimeout(timer);
      const q = inputEl.value.trim().toLowerCase();
      if (!q) { resultsEl.classList.remove('show'); resultsEl.innerHTML = ''; return; }
      timer = setTimeout(() => {
        if (typeof PRODUCTS === 'undefined') {
          resultsEl.innerHTML = '<div class="alpha-search-empty">Loading...</div>';
          resultsEl.classList.add('show');
          return;
        }
        const matches = PRODUCTS.filter(p =>
          (p.name||'').toLowerCase().includes(q) ||
          (p.subtitle||'').toLowerCase().includes(q) ||
          (p.desc||'').toLowerCase().includes(q) ||
          (p.cat||'').toLowerCase().includes(q)
        ).slice(0, 5);
        if (!matches.length) {
          resultsEl.innerHTML = '<div class="alpha-search-empty">No products found for "' + q + '"</div>';
        } else {
          resultsEl.innerHTML = matches.map(p => `
            <a href="product.html?id=${p.id}" class="alpha-search-result">
              <img loading="lazy" src="${p.image}" alt="${p.name}" class="alpha-search-result-img" onerror="this.style.display='none'">
              <div class="alpha-search-result-info">
                <div class="alpha-search-result-name">${p.name}</div>
                <div class="alpha-search-result-price">₹${p.price} <span style="color:#9ca3af;text-decoration:line-through;font-weight:normal;margin-left:6px;font-size:0.7rem">₹${p.mrp}</span></div>
              </div>
            </a>
          `).join('') + `<a href="catalogue.html?q=${encodeURIComponent(q)}" class="alpha-search-result" style="justify-content:center;font-size:0.78rem;text-transform:uppercase;letter-spacing:0.1em;color:#D4AF37;font-weight:600;background:rgba(212,175,55,0.05)">View all results →</a>`;
        }
        resultsEl.classList.add('show');
      }, 150);
    });
  }

  function init() {
    if (document.querySelector('.alpha-hamburger')) return;
    const nav = document.querySelector('header nav') || document.querySelector('nav.max-w-7xl') || document.querySelector('header');
    if (!nav) { console.warn('Alpha menu: nav not found'); return; }

    const hamburger = document.createElement('button');
    hamburger.className = 'alpha-hamburger';
    hamburger.setAttribute('aria-label', 'Open menu');
    hamburger.setAttribute('aria-expanded', 'false');
    hamburger.innerHTML = '<span></span><span></span><span></span>';
    nav.insertBefore(hamburger, nav.firstChild);

    const { drawer, overlay } = buildDrawer();

    function openDrawer() {
      drawer.classList.add('open');
      overlay.classList.add('show');
      hamburger.classList.add('open');
      hamburger.setAttribute('aria-expanded', 'true');
      document.body.classList.add('drawer-open');
    }
    function closeDrawer() {
      drawer.classList.remove('open');
      overlay.classList.remove('show');
      hamburger.classList.remove('open');
      hamburger.setAttribute('aria-expanded', 'false');
      document.body.classList.remove('drawer-open');
    }

    hamburger.addEventListener('click', (e) => {
      e.preventDefault();
      e.stopPropagation();
      drawer.classList.contains('open') ? closeDrawer() : openDrawer();
    });

    overlay.addEventListener('click', closeDrawer);
    drawer.querySelector('.alpha-drawer-close').addEventListener('click', closeDrawer);

    document.addEventListener('keydown', e => {
      if (e.key === 'Escape' && drawer.classList.contains('open')) closeDrawer();
    });

    setupSearch(
      drawer.querySelector('#alpha-mobile-search'),
      drawer.querySelector('#alpha-mobile-results')
    );

    console.log('✓ Alphabet mobile menu loaded');
  }

  if (document.readyState === 'loading') {
    document.addEventListener('DOMContentLoaded', init);
  } else {
    init();
  }
})();
