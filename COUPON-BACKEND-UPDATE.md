# ⚠️ IMPORTANT: Backend Update Required for Coupon ALPHA101

The coupon shows ₹101 off on the website, BUT for the customer to actually
be CHARGED the discounted amount, you MUST update your Render backend.

Without this change, the customer sees "₹101 off" but Razorpay still charges
full price. This is critical.

## What to change in your server.js (Render backend)

Find your `/api/checkout/create-order` endpoint. It currently calculates the
amount from cartItems. Update it to subtract the coupon discount:

```javascript
app.post('/api/checkout/create-order', async (req, res) => {
  try {
    const { cartItems, coupon } = req.body;  // <-- add coupon

    // ... your existing code that calculates subtotal from cartItems ...
    // Example:
    let subtotal = 0;
    for (const id in cartItems) {
      const product = PRODUCTS.find(p => p.id === parseInt(id));
      if (product) subtotal += product.price * cartItems[id];
    }
    const shipping = subtotal >= 999 ? 0 : 49;

    // ===== APPLY COUPON (NEW) =====
    let discount = 0;
    if (coupon && coupon.code === 'ALPHA101') {
      discount = Math.min(101, subtotal);   // ₹101 off, never below 0
    }
    // ==============================

    const total = Math.max(1, subtotal + shipping - discount);
    const amount = total * 100;  // Razorpay uses paise

    const order = await razorpay.orders.create({
      amount: amount,
      currency: 'INR',
      receipt: 'rcpt_' + Date.now()
    });

    res.json({
      orderId: order.id,
      amount: order.amount,
      currency: order.currency,
      keyId: process.env.RAZORPAY_KEY_ID
    });
  } catch (e) {
    res.status(500).json({ error: e.message });
  }
});
```

## Security note
Always validate the coupon on the BACKEND (as above) — never trust the
discount amount sent from the browser. The frontend sends the code, but the
backend decides the real discount. This prevents anyone from editing the
discount in their browser.

## After updating
1. Save server.js
2. Push to your backend repo (Render auto-deploys)
3. Test a purchase with ALPHA101 — confirm Razorpay shows the discounted amount
