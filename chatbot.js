// ============================================================
// ALPHABET STORE — AI Customer Support Chatbot
// Knowledge-based chatbot that answers common questions
// ============================================================

(function() {
  // Knowledge base — answers to common questions
  const KB = {
    shipping: {
      keywords: ['shipping', 'delivery', 'deliver', 'ship', 'when will i get', 'how long', 'days', 'time'],
      reply: '📦 We offer FREE shipping on orders over ₹999! Delivery takes 3-7 business days across India. Metro cities get it in 3-4 days. <a href="shipping-policy.html" style="color:#D4AF37">See full shipping policy</a>'
    },
    returns: {
      keywords: ['return', 'refund', 'exchange', 'money back', 'cancel order', 'returns'],
      reply: '↩️ Yes! We offer 7-day hassle-free returns. Refunds processed within 5-7 business days after we receive the item. <a href="refund-policy.html" style="color:#D4AF37">See return policy</a>'
    },
    payment: {
      keywords: ['payment', 'pay', 'upi', 'card', 'cod', 'cash on delivery', 'razorpay', 'how to pay'],
      reply: '💳 We accept all major payment methods — UPI (PhonePe, GPay), Credit/Debit Cards, Net Banking, and Cash on Delivery. All payments are 256-bit SSL secured via Razorpay.'
    },
    track: {
      keywords: ['track', 'where is my order', 'order status', 'tracking', 'tracking id'],
      reply: '🔍 You can track your order anytime! <a href="track-order.html" style="color:#D4AF37">Click here to track →</a> You\'ll need your order ID (sent in confirmation email) or registered email.'
    },
    contact: {
      keywords: ['contact', 'call', 'whatsapp', 'phone', 'speak to', 'talk to human', 'customer care', 'support'],
      reply: '💬 Talk to our founders directly!<br>📞 Tushar: +91 70219 09150<br>📞 Ashish: +91 88048 88885<br>📧 alphabetstores@gmail.com<br>WhatsApp the green button below or <a href="contact.html" style="color:#D4AF37">visit contact page</a>'
    },
    products: {
      keywords: ['product', 'what do you sell', 'catalogue', 'catalog', 'items', 'shop', 'buy'],
      reply: '🛍️ We sell premium home essentials at up to 90% off MRP! Categories: Kitchen, Smart Gadgets, Home & Storage, and Stationery. <a href="catalogue.html" style="color:#D4AF37">Browse all products →</a>'
    },
    discount: {
      keywords: ['discount', 'coupon', 'offer', 'sale', 'cheap', 'price', 'how much off'],
      reply: '🏷️ Every product on our site is already up to 90% off MRP — no extra coupon needed! Subscribe to our newsletter (homepage) for exclusive deals and early access to sales.'
    },
    bulk: {
      keywords: ['bulk', 'wholesale', 'corporate', 'gift', 'large order', 'business'],
      reply: '🏢 Yes! We do bulk orders and corporate gifting. Best to WhatsApp founder Tushar at +91 70219 09150 — he\'ll get you a custom quote within hours.'
    },
    location: {
      keywords: ['where are you', 'location', 'office', 'address', 'based', 'where from', 'mumbai'],
      reply: '📍 We\'re based in Mumbai, Maharashtra 🇮🇳 — but we ship anywhere in India! Founded by Tushar Kulkarni & Ashish Deshmane in 2020.'
    },
    quality: {
      keywords: ['quality', 'genuine', 'original', 'real', 'fake', 'authentic', 'warranty', 'guarantee'],
      reply: '✅ Every product is hand-tested by our team before listing. We offer a 10-day replacement guarantee on damaged/defective items + 7-day returns on everything. Quality you can trust.'
    },
    review: {
      keywords: ['review', 'rating', 'feedback', 'good', 'reliable', 'trust', 'safe to buy'],
      reply: '⭐ We have a 5.0 rating from 100+ verified buyers across India. <a href="reviews.html" style="color:#D4AF37">Read all customer reviews →</a>'
    },
    founder: {
      keywords: ['who founded', 'owner', 'founder', 'tushar', 'ashish', 'team'],
      reply: '👋 Alphabet Store was founded in 2020 by Tushar Kulkarni and Ashish Deshmane in Mumbai. They personally test every product before it goes live and reply to most customer messages themselves!'
    }
  };

  function findReply(text) {
    const lower = text.toLowerCase();
    let bestMatch = null, bestScore = 0;
    for (const [topic, data] of Object.entries(KB)) {
      const score = data.keywords.filter(k => lower.includes(k)).length;
      if (score > bestScore) { bestScore = score; bestMatch = data.reply; }
    }
    if (bestMatch) return bestMatch;

    // Greetings
    if (/(^|\s)(hi|hello|hey|namaste|hola)(\s|$)/i.test(lower)) {
      return '👋 Hi there! I\'m Alpha, your shopping assistant. How can I help you today? You can ask me about products, shipping, returns, or anything else!';
    }
    if (/thank|thanks/i.test(lower)) return '😊 You\'re welcome! Let me know if you have any other questions.';
    if (/bye|goodbye/i.test(lower)) return '👋 Have a great day! Reach out anytime via WhatsApp if you need help.';

    // Fallback
    return '🤔 I\'m not sure about that, but our founders are happy to help! WhatsApp Tushar at +91 70219 09150 or <a href="contact.html" style="color:#D4AF37">send us a message →</a>';
  }

  // Create chatbot UI
  function createChatbot() {
    const css = `
      .alpha-chat-toggle {
        position: fixed; bottom: 24px; right: 92px;
        width: 60px; height: 60px;
        background: #121212;
        border-radius: 50%;
        display: flex; align-items: center; justify-content: center;
        box-shadow: 0 6px 28px rgba(212,175,55,0.4);
        z-index: 9997;
        cursor: pointer;
        border: 2px solid #D4AF37;
        transition: transform 0.2s ease;
        animation: alpha-pulse 2.5s infinite;
      }
      .alpha-chat-toggle:hover { transform: scale(1.1); }
      @keyframes alpha-pulse {
        0%,100% { box-shadow: 0 0 0 0 rgba(212,175,55,0.6); }
        50% { box-shadow: 0 0 0 12px rgba(212,175,55,0); }
      }
      .alpha-chat-toggle svg { width: 28px; height: 28px; fill: #D4AF37; }
      .alpha-chat-badge {
        position: absolute; top: -4px; right: -4px;
        background: #D4AF37; color: #121212;
        font-size: 0.6rem; font-weight: 700;
        width: 18px; height: 18px;
        border-radius: 50%;
        display: flex; align-items: center; justify-content: center;
      }
      .alpha-chat-window {
        position: fixed; bottom: 100px; right: 24px;
        width: 360px; max-width: calc(100vw - 32px);
        height: 540px; max-height: calc(100vh - 130px);
        background: #FAFAFA;
        border: 1px solid #e5e7eb;
        box-shadow: 0 20px 60px rgba(0,0,0,0.25);
        display: none;
        flex-direction: column;
        z-index: 9998;
        font-family: 'Inter', sans-serif;
        overflow: hidden;
      }
      .alpha-chat-window.open { display: flex; animation: alpha-slideup 0.3s ease; }
      @keyframes alpha-slideup {
        from { opacity: 0; transform: translateY(20px); }
        to { opacity: 1; transform: translateY(0); }
      }
      [data-theme="dark"] .alpha-chat-window { background: #1A1A1A; border-color: #333; }
      .alpha-chat-header {
        background: #121212; color: white;
        padding: 16px 18px;
        display: flex; align-items: center; gap: 12px;
        border-bottom: 1px solid #D4AF37;
      }
      .alpha-chat-avatar {
        width: 38px; height: 38px;
        background: #D4AF37;
        border-radius: 50%;
        display: flex; align-items: center; justify-content: center;
        font-weight: 800; color: #121212;
        font-family: 'Inter', sans-serif;
      }
      .alpha-chat-name { font-size: 0.85rem; font-weight: 600; letter-spacing: 0.05em; }
      .alpha-chat-status { font-size: 0.65rem; color: #22c55e; display: flex; align-items: center; gap: 5px; margin-top: 2px; }
      .alpha-chat-status::before { content:''; width: 6px; height: 6px; border-radius: 50%; background: #22c55e; }
      .alpha-chat-close {
        margin-left: auto;
        background: none; border: none;
        color: white; cursor: pointer;
        font-size: 1.3rem; line-height: 1;
        opacity: 0.7;
      }
      .alpha-chat-close:hover { opacity: 1; }
      .alpha-chat-messages {
        flex: 1;
        padding: 18px;
        overflow-y: auto;
        background: linear-gradient(180deg, #FAFAFA, #F3F4F6);
      }
      [data-theme="dark"] .alpha-chat-messages { background: #1A1A1A; }
      .alpha-msg {
        margin-bottom: 12px;
        max-width: 85%;
        animation: alpha-msgin 0.3s ease;
      }
      @keyframes alpha-msgin {
        from { opacity: 0; transform: translateY(8px); }
        to { opacity: 1; transform: translateY(0); }
      }
      .alpha-msg.bot {
        background: white; color: #121212;
        padding: 10px 14px;
        border-radius: 14px 14px 14px 4px;
        border: 1px solid #e5e7eb;
        font-size: 0.85rem;
        line-height: 1.5;
        box-shadow: 0 1px 3px rgba(0,0,0,0.04);
      }
      [data-theme="dark"] .alpha-msg.bot { background: #242424; color: #F5F5F5; border-color: #333; }
      .alpha-msg.user {
        margin-left: auto;
        background: #121212; color: white;
        padding: 10px 14px;
        border-radius: 14px 14px 4px 14px;
        font-size: 0.85rem;
        line-height: 1.5;
      }
      .alpha-msg a { color: #D4AF37; text-decoration: underline; }
      .alpha-chat-input-bar {
        display: flex; gap: 8px;
        padding: 12px;
        border-top: 1px solid #e5e7eb;
        background: white;
      }
      [data-theme="dark"] .alpha-chat-input-bar { background: #1E1E1E; border-color: #333; }
      .alpha-chat-input {
        flex: 1;
        padding: 10px 14px;
        border: 1px solid #e5e7eb;
        background: #F3F4F6;
        font-size: 0.85rem;
        outline: none;
        font-family: 'Inter', sans-serif;
        border-radius: 20px;
      }
      [data-theme="dark"] .alpha-chat-input { background: #242424; color: #F5F5F5; border-color: #333; }
      .alpha-chat-input:focus { border-color: #D4AF37; }
      .alpha-chat-send {
        width: 40px; height: 40px;
        background: #D4AF37;
        border: none;
        border-radius: 50%;
        cursor: pointer;
        display: flex; align-items: center; justify-content: center;
        transition: opacity 0.2s;
      }
      .alpha-chat-send:hover { opacity: 0.85; }
      .alpha-chat-send svg { width: 18px; height: 18px; fill: #121212; }
      .alpha-quick-replies {
        display: flex; flex-wrap: wrap; gap: 6px;
        padding: 0 18px 12px;
      }
      .alpha-quick-reply {
        background: white;
        border: 1px solid #D4AF37;
        color: #121212;
        padding: 6px 12px;
        font-size: 0.72rem;
        border-radius: 20px;
        cursor: pointer;
        transition: all 0.15s;
      }
      [data-theme="dark"] .alpha-quick-reply { background: #242424; color: #F5F5F5; }
      .alpha-quick-reply:hover { background: #D4AF37; color: #121212; }
      .alpha-typing {
        display: inline-flex; gap: 3px;
        padding: 12px 16px;
        background: white;
        border-radius: 14px 14px 14px 4px;
        border: 1px solid #e5e7eb;
        margin-bottom: 12px;
      }
      .alpha-typing span {
        width: 6px; height: 6px;
        background: #888;
        border-radius: 50%;
        animation: alpha-bounce 1.4s infinite;
      }
      .alpha-typing span:nth-child(2) { animation-delay: 0.2s; }
      .alpha-typing span:nth-child(3) { animation-delay: 0.4s; }
      @keyframes alpha-bounce {
        0%, 60%, 100% { transform: translateY(0); opacity: 0.4; }
        30% { transform: translateY(-6px); opacity: 1; }
      }
      @media (max-width: 480px) {
        .alpha-chat-window { right: 8px; bottom: 86px; }
        .alpha-chat-toggle { right: 84px; bottom: 16px; }
      }
    `;
    const style = document.createElement('style');
    style.textContent = css;
    document.head.appendChild(style);

    const html = `
      <div class="alpha-chat-toggle" id="alpha-toggle" aria-label="Open chat">
        <svg viewBox="0 0 24 24"><path d="M12 2C6.48 2 2 6.04 2 11c0 2.39 1.05 4.57 2.75 6.18L4 22l5.27-1.46C10.42 21.5 11.2 21.6 12 21.6c5.52 0 10-4.04 10-9s-4.48-9-10-9z"/></svg>
        <div class="alpha-chat-badge">1</div>
      </div>
      <div class="alpha-chat-window" id="alpha-window" role="dialog" aria-label="Customer support chat">
        <div class="alpha-chat-header">
          <div class="alpha-chat-avatar">A</div>
          <div>
            <div class="alpha-chat-name">Alpha · Support</div>
            <div class="alpha-chat-status">Online · Replies instantly</div>
          </div>
          <button class="alpha-chat-close" id="alpha-close" aria-label="Close chat">✕</button>
        </div>
        <div class="alpha-chat-messages" id="alpha-messages"></div>
        <div class="alpha-quick-replies" id="alpha-quick"></div>
        <div class="alpha-chat-input-bar">
          <input class="alpha-chat-input" id="alpha-input" type="text" placeholder="Type your question..." aria-label="Type message">
          <button class="alpha-chat-send" id="alpha-send" aria-label="Send message">
            <svg viewBox="0 0 24 24"><path d="M2 21l21-9L2 3v7l15 2-15 2v7z"/></svg>
          </button>
        </div>
      </div>
    `;
    const container = document.createElement('div');
    container.innerHTML = html;
    document.body.appendChild(container);

    const toggle = document.getElementById('alpha-toggle');
    const wnd = document.getElementById('alpha-window');
    const closeBtn = document.getElementById('alpha-close');
    const msgs = document.getElementById('alpha-messages');
    const input = document.getElementById('alpha-input');
    const send = document.getElementById('alpha-send');
    const quick = document.getElementById('alpha-quick');
    const badge = container.querySelector('.alpha-chat-badge');

    let opened = false;

    function openChat() {
      wnd.classList.add('open');
      badge.style.display = 'none';
      if (!opened) {
        opened = true;
        addBotMsg('👋 Hi! I\'m Alpha, your Alphabet Store assistant. I can help you with orders, products, shipping, returns and more. What would you like to know?');
        setTimeout(showQuickReplies, 400);
      }
      setTimeout(() => input.focus(), 300);
    }
    function closeChat() { wnd.classList.remove('open'); }
    toggle.addEventListener('click', () => wnd.classList.contains('open') ? closeChat() : openChat());
    closeBtn.addEventListener('click', closeChat);

    function addBotMsg(text) {
      // Show typing
      const typing = document.createElement('div');
      typing.className = 'alpha-typing';
      typing.innerHTML = '<span></span><span></span><span></span>';
      msgs.appendChild(typing);
      msgs.scrollTop = msgs.scrollHeight;
      setTimeout(() => {
        typing.remove();
        const m = document.createElement('div');
        m.className = 'alpha-msg bot';
        m.innerHTML = text;
        msgs.appendChild(m);
        msgs.scrollTop = msgs.scrollHeight;
      }, 600);
    }
    function addUserMsg(text) {
      const m = document.createElement('div');
      m.className = 'alpha-msg user';
      m.textContent = text;
      msgs.appendChild(m);
      msgs.scrollTop = msgs.scrollHeight;
    }
    function showQuickReplies() {
      quick.innerHTML = '';
      const options = ['📦 Track my order', '🚚 Shipping info', '↩️ Returns policy', '💳 Payment options', '💬 Talk to founder'];
      options.forEach(opt => {
        const b = document.createElement('button');
        b.className = 'alpha-quick-reply';
        b.textContent = opt;
        b.onclick = () => { handleUserInput(opt); quick.innerHTML = ''; };
        quick.appendChild(b);
      });
    }
    function handleUserInput(text) {
      text = text.trim();
      if (!text) return;
      addUserMsg(text);
      input.value = '';
      const reply = findReply(text);
      addBotMsg(reply);
      setTimeout(showQuickReplies, 1500);
    }
    send.addEventListener('click', () => handleUserInput(input.value));
    input.addEventListener('keydown', e => { if (e.key === 'Enter') handleUserInput(input.value); });
  }

  // Initialize when DOM is ready
  if (document.readyState === 'loading') {
    document.addEventListener('DOMContentLoaded', createChatbot);
  } else {
    createChatbot();
  }
})();
