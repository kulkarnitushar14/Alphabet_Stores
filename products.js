// ============================================================
// ALPHABET STORE — Shared Product Data & Cart Logic v3
// ============================================================

// Dark Mode init (runs before body renders)
(function() {
  const saved = localStorage.getItem('alphabet_theme');
  if (saved === 'dark' || (!saved && window.matchMedia('(prefers-color-scheme: dark)').matches)) {
    document.documentElement.setAttribute('data-theme', 'dark');
  }
})();

// ============ COUPON CONFIG ============
// Single source of truth for the store coupon.
// DEFAULT_ENABLED is the fallback; the Admin Dashboard can override
// this live via localStorage key 'alpha_coupon_enabled'.
const COUPON_CONFIG = {
  code: 'ALPHA101',
  discount: 101,      // flat ₹ off
  minOrder: 0,        // minimum subtotal required (0 = no minimum)
  DEFAULT_ENABLED: true
};
function couponEnabled() {
  const v = localStorage.getItem('alpha_coupon_enabled');
  return v === null ? COUPON_CONFIG.DEFAULT_ENABLED : v === 'true';
}

const PRODUCTS = [
  {
    id: 1,
    name: 'LED Digital Hand Fan',
    subtitle: 'Rechargeable • 5 Speeds • Foldable',
    desc: 'Stay cool anywhere with this powerful rechargeable hand fan. Features a real-time LED battery display, 5 adjustable speed settings, foldable neck design, and a built-in power bank function. Lightweight and compact — perfect for home, travel, or outdoor use.',
    price: 289,
    mrp: 1499,
    image: 'images/product-1-1.jpg',
    images: [
      'images/product-1-1.jpg',
      'images/product-1-2.jpg',
      'images/product-1-3.jpg'
    ],
    cat: 'gadgets',
    badge: 'Bestseller',
    reviews: 4,
    features: ['5 adjustable speeds', 'LED battery display', 'Foldable neck design', 'Rechargeable USB-C', 'Lightweight build', '10-day replacement']
  },
  {
    id: 2,
    name: 'Rechargeable Milk Frother',
    subtitle: 'Dual Spring Tech • 3 Speeds • Matte Black',
    desc: 'Make café-quality coffee at home. This rechargeable milk frother features dual spring whisks for extra foam, 3 speed settings, and a matte black finish that looks sleek in any kitchen. USB rechargeable — no batteries needed.',
    price: 278,
    mrp: 1699,
    image: 'images/product-2-1.jpg',
    images: [
      'images/product-2-1.jpg',
      'images/product-2-2.jpg'
    ],
    cat: 'kitchen',
    badge: 'Bestseller',
    reviews: 1,
    features: ['Dual spring whisk', '3 speed settings', 'USB rechargeable', 'Matte black finish', 'Dishwasher-safe whisk', '10-day replacement']
  },
  {
    id: 3,
    name: 'Glass Oil Sprayer & Dispenser',
    subtitle: '500ml • 2-in-1 Design • Anti-drip',
    desc: 'Control your oil usage for healthier cooking. This premium 500ml glass dispenser works as both a sprayer and a pour spout. The 2-in-1 design with anti-drip nozzle keeps your countertop clean and your food perfectly seasoned.',
    price: 249,
    mrp: 899,
    image: 'images/product-3-1.jpg',
    images: [
      'images/product-3-1.jpg',
      'images/product-3-2.jpg',
      'images/product-3-3.jpg',
      'images/product-3-4.jpg'
    ],
    cat: 'kitchen',
    badge: '72% Off',
    reviews: 1,
    features: ['500ml glass body', '2-in-1 spray & pour', 'Anti-drip nozzle', 'Food-grade materials', 'Easy-fill opening', 'Dishwasher safe']
  },
  {
    id: 4,
    name: 'Wireless Water Can Dispenser',
    subtitle: 'For 20L Bottles • Low Noise • USB Charged',
    desc: 'Never lift a heavy water can again. This automatic wireless pump fits standard 20-litre water cans, runs whisper-quiet, and charges via USB. One-touch operation delivers clean water instantly — perfect for home, office, or kitchen.',
    price: 289,
    mrp: 999,
    image: 'images/product-4-1.jpg',
    images: [
      'images/product-4-1.jpg',
      'images/product-4-2.jpg',
      'images/product-4-3.jpg',
      'images/product-4-4.jpg'
    ],
    cat: 'kitchen',
    badge: '71% Off',
    reviews: 12,
    features: ['Fits 20L water cans', 'USB rechargeable', 'Low-noise motor', 'One-touch operation', 'High-efficiency pump', 'Food-grade silicone']
  },
  {
    id: 5,
    name: 'Sticker Book Cover Film',
    subtitle: '60 Pcs • Self-Adhesive • Waterproof',
    desc: 'Protect your books in style. This pack includes 60 transparent self-adhesive book cover sheets in 3 different sizes (20 each). Waterproof PVC film keeps textbooks and notebooks safe without scissors or tape. Perfect for students and parents.',
    price: 249,
    mrp: 1499,
    image: 'images/product-5-1.jpg',
    images: [
      'images/product-5-1.jpg',
      'images/product-5-2.jpg',
      'images/product-5-3.jpg',
      'images/product-5-4.jpg'
    ],
    cat: 'stationery',
    badge: '83% Off',
    reviews: 1,
    features: ['60 pcs total', '3 sizes: 20 each', 'Waterproof PVC film', 'Self-adhesive backing', 'No scissors needed', 'Crystal clear finish']
  },
  {
    id: 6,
    name: 'Photo Frame Wall Hooks',
    subtitle: 'No Drilling • 10 Hooks • Strong Hold',
    desc: 'Hang your frames without damaging your walls. These damage-free adhesive hooks use strong industrial glue to hold up to 2kg each. Includes 10 hooks in a clean white finish. Perfect for picture frames, keys, bags, and décor.',
    price: 178,
    mrp: 999,
    image: 'images/product-6-1.jpg',
    images: [
      'images/product-6-1.jpg',
      'images/product-6-2.jpg',
      'images/product-6-3.jpg',
      'images/product-6-4.jpg'
    ],
    cat: 'home',
    badge: '82% Off',
    reviews: 2,
    features: ['10 hooks included', 'No drilling needed', 'Holds up to 2kg each', 'Damage-free removal', 'White finish', 'For walls, tiles & glass']
  },
  {
    id: 7,
    name: 'Self-Adhesive Resealable Bags',
    subtitle: 'Clear Plastic • Pack of 100 • Medium Size',
    desc: 'Keep everything organised and fresh. These transparent resealable zip-lock bags with self-adhesive backing are ideal for food, stationery, jewellery, and small parts. Airtight seal locks in freshness. Pack of 100.',
    price: 180,
    mrp: 749,
    image: 'images/product-7-1.jpg',
    images: [
      'images/product-7-1.jpg',
      'images/product-7-2.jpg',
      'images/product-7-3.jpg',
      'images/product-7-4.jpg'
    ],
    cat: 'home',
    badge: '76% Off',
    reviews: 1,
    features: ['Pack of 100 bags', 'Self-adhesive closure', 'Crystal clear PVC', 'Airtight resealable seal', 'Multi-use: food, crafts, storage', 'Medium size 19×21cm']
  },
  {
    id: 8,
    name: '4-Piece Wall Storage Set',
    subtitle: 'Mounted • Multi-purpose • Colourful',
    desc: 'Organise your space beautifully. This 4-piece wall-mounted storage set includes holders in 4 soft pastel colours, suitable for phones, remotes, keys, stationery, and toiletries. Strong adhesive backing — no tools required.',
    price: 249,
    mrp: 999,
    image: 'images/product-8-1.jpg',
    images: [
      'images/product-8-1.jpg',
      'images/product-8-2.jpg',
      'images/product-8-3.jpg',
      'images/product-8-4.jpg'
    ],
    cat: 'home',
    badge: '75% Off',
    reviews: 1,
    features: ['4 pieces included', 'Pastel colour set', 'Strong adhesive backing', 'Multi-purpose holder', 'No tools required', 'Waterproof material']
  },
  {
    id: 9,
    name: 'Stainless Steel Straws Set',
    subtitle: 'Pack of 4 • Silver • Reusable',
    desc: 'Ditch single-use plastic for good. This set of 4 premium stainless steel straws includes both straight and bent styles, plus a cleaning brush. BPA-free, food-grade steel that\'s eco-friendly, durable, and easy to clean.',
    price: 129,
    mrp: 499,
    image: 'images/product-9-1.jpg',
    images: [
      'images/product-9-1.jpg',
      'images/product-9-2.jpg',
      'images/product-9-3.jpg',
      'images/product-9-4.jpg'
    ],
    cat: 'kitchen',
    badge: '74% Off',
    reviews: 18,
    features: ['Set of 4 straws', 'Food-grade stainless steel', 'BPA-free & safe', 'Straight + bent styles', 'Includes cleaning brush', 'Dishwasher safe']
  },
  {
    id: 10,
    name: 'Microfibre Striped Bath Mat',
    subtitle: 'Anti-slip • Soft • 60×40cm',
    desc: 'Step onto luxury every morning. This microfibre striped bath mat offers maximum absorbency, a non-slip base, and a plush feel underfoot. Machine washable and quick-drying. Available in a neutral stripe pattern that suits any bathroom.',
    price: 249,
    mrp: 899,
    image: 'https://images.unsplash.com/photo-1552321554-5fefe8c9ef14?w=600&q=80',
    images: [
      'https://images.unsplash.com/photo-1552321554-5fefe8c9ef14?w=600&q=80',
      'https://images.unsplash.com/photo-1507652313519-d4e9174996dd?w=600&q=80',
      'https://images.unsplash.com/photo-1620626011761-996317702782?w=600&q=80',
      'https://images.unsplash.com/photo-1584622650111-993a426fbf0a?w=600&q=80'
    ],
    cat: 'home',
    badge: '72% Off',
    reviews: 5,
    features: ['Microfibre construction', 'Anti-slip rubber base', 'High absorbency', 'Machine washable', 'Quick-drying', '60×40cm size']
  },
  {
    id: 11,
    name: 'Battery Milk Frother',
    subtitle: 'One-Button • Portable • Instant Foam',
    desc: 'The simplest way to froth milk. This compact battery-operated frother creates thick, creamy foam in seconds with one button press. Lightweight and portable — perfect for travel or small kitchens. Ideal for lattes, cappuccinos, and matcha.',
    price: 169,
    mrp: 899,
    image: 'images/product-11-1.jpg',
    images: [
      'images/product-11-1.jpg',
      'images/product-11-2.jpg',
      'images/product-11-3.jpg',
      'images/product-11-4.jpg'
    ],
    cat: 'kitchen',
    badge: '81% Off',
    reviews: 8,
    features: ['One-button operation', 'Battery powered (2×AA)', 'Instant thick foam', 'Compact & portable', 'Stainless steel whisk', 'For milk, matcha & more']
  },
  {
    id: 12,
    name: 'Black Garbage Bags',
    subtitle: '180 Pcs • Medium 19×21 Inch • Pack of 6',
    desc: 'Reliable, heavy-duty garbage bags for your home and office. This value pack contains 180 bags across 6 rolls — each bag is 19×21 inches, made from thick black plastic that won\'t tear or leak. Fits most standard dustbins.',
    price: 289,
    mrp: 2999,
    image: 'https://images.unsplash.com/photo-1612178537253-bccd437b730e?w=600&q=80',
    images: [
      'https://images.unsplash.com/photo-1612178537253-bccd437b730e?w=600&q=80',
      'https://images.unsplash.com/photo-1558618666-fcd25c85cd64?w=600&q=80',
      'https://images.unsplash.com/photo-1600857062241-98e5dba7f33e?w=600&q=80',
      'https://images.unsplash.com/photo-1584464491033-06628f3a6b7b?w=600&q=80'
    ],
    cat: 'home',
    badge: '90% Off',
    reviews: 0,
    features: ['180 bags total', '6 rolls of 30', 'Size: 19×21 inches', 'Heavy-duty thick plastic', 'Tear & leak resistant', 'Fits standard dustbins']
  }
];

// ============================================================
// CART UTILITIES
// ============================================================
function getCart() {
  try { return JSON.parse(localStorage.getItem('alphabet_cart') || '{}'); }
  catch(e) { return {}; }
}
function saveCart(cart) {
  localStorage.setItem('alphabet_cart', JSON.stringify(cart));
}
function cartTotal() {
  const cart = getCart();
  return Object.values(cart).reduce((a, b) => a + b, 0);
}
function addToCart(id, qty = 1) {
  const cart = getCart();
  cart[id] = (cart[id] || 0) + qty;
  saveCart(cart);
  updateCartBadge();
  showToast('Added to cart! 🛒');
}
function updateCartBadge() {
  const count = cartTotal();
  document.querySelectorAll('#nav-cart-count').forEach(el => el.textContent = count);
  const hdr = document.getElementById('cart-header-count');
  if (hdr) hdr.textContent = `Cart (${count})`;
}
function showToast(msg) {
  let t = document.getElementById('toast-msg');
  if (!t) {
    t = document.createElement('div');
    t.id = 'toast-msg';
    document.body.appendChild(t);
  }
  t.textContent = msg;
  t.style.opacity = '1';
  clearTimeout(window._toastTimer);
  window._toastTimer = setTimeout(() => { t.style.opacity = '0'; }, 2500);
}

// ============================================================
// DARK MODE TOGGLE
// ============================================================
function toggleDarkMode() {
  const current = document.documentElement.getAttribute('data-theme');
  const next = current === 'dark' ? 'light' : 'dark';
  document.documentElement.setAttribute('data-theme', next);
  localStorage.setItem('alphabet_theme', next);
}
