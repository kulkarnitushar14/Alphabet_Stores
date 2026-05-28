# 🚀 Shiprocket Integration Guide — Alphabet Store

Complete setup guide to integrate Shiprocket with your website for automatic shipping & real order tracking.

---

## ✅ What You'll Get After Setup

1. **Auto order creation** — When customer pays, order auto-pushes to Shiprocket
2. **Real order tracking** — Track page shows actual courier status (Delhivery, Bluedart, etc.)
3. **AWB number to customer** — Automatic email/WhatsApp with tracking link
4. **Shipping rate calculator** — Show real shipping cost at checkout (optional)
5. **Admin dashboard** — See shipment status in your existing admin panel

---

## 📋 PART 1: Get Shiprocket API Credentials (5 min)

### Step 1.1 — Generate API User
1. Login to Shiprocket: https://app.shiprocket.in
2. Go to **Settings → API → Configure**
3. Click **"Create an API User"**
4. Enter:
   - Email: `api@alphabetstores.com` (or any new email)
   - Password: Create a strong password
5. Click **Generate API Credentials**
6. **SAVE THESE** — you'll need them in Step 2

### Step 1.2 — Note Your Pickup Address
1. Go to **Settings → Pickup Address**
2. Make sure your Mumbai pickup address is set
3. Note the **Pickup Location nickname** (e.g., "Primary" or "Mumbai Warehouse")
4. You'll need this exact nickname later

---

## 📋 PART 2: Add Shiprocket to Render Backend (15 min)

Your Razorpay backend on Render needs new endpoints for Shiprocket.

### Step 2.1 — Add Environment Variables on Render

1. Go to https://dashboard.render.com
2. Open your `alphabet-backend` service
3. Click **Environment** tab
4. Add these 3 new variables:

```
SHIPROCKET_EMAIL=api@alphabetstores.com
SHIPROCKET_PASSWORD=your_password_here
SHIPROCKET_PICKUP_LOCATION=Primary
```

5. Click **Save Changes** → Render will auto-redeploy

### Step 2.2 — Update Backend Code (Copy-paste this)

Go to your backend GitHub repo, open `server.js` (or `index.js`), and add these endpoints at the end before `app.listen(...)`:

```javascript
// ============================================
// SHIPROCKET INTEGRATION
// ============================================
const SHIPROCKET_BASE = 'https://apiv2.shiprocket.in/v1/external';
let shiprocketToken = null;
let tokenExpiry = 0;

// Get Shiprocket auth token (cached for 10 days)
async function getShiprocketToken() {
  if (shiprocketToken && Date.now() < tokenExpiry) {
    return shiprocketToken;
  }
  
  try {
    const response = await fetch(`${SHIPROCKET_BASE}/auth/login`, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({
        email: process.env.SHIPROCKET_EMAIL,
        password: process.env.SHIPROCKET_PASSWORD
      })
    });
    const data = await response.json();
    if (data.token) {
      shiprocketToken = data.token;
      tokenExpiry = Date.now() + (9 * 24 * 60 * 60 * 1000); // 9 days
      console.log('✓ Shiprocket authenticated');
      return shiprocketToken;
    }
    throw new Error('Shiprocket auth failed: ' + JSON.stringify(data));
  } catch (err) {
    console.error('Shiprocket auth error:', err);
    throw err;
  }
}

// Create shipment after successful payment
app.post('/api/shiprocket/create-order', async (req, res) => {
  try {
    const { order } = req.body;
    const token = await getShiprocketToken();
    
    // Build Shiprocket order payload
    const shipmentPayload = {
      order_id: order.orderId, // e.g., "ALP-2026-00123"
      order_date: new Date().toISOString().split('T')[0],
      pickup_location: process.env.SHIPROCKET_PICKUP_LOCATION || 'Primary',
      billing_customer_name: order.customer.name.split(' ')[0] || order.customer.name,
      billing_last_name: order.customer.name.split(' ').slice(1).join(' ') || '.',
      billing_address: order.customer.address,
      billing_city: order.customer.city,
      billing_pincode: order.customer.pincode,
      billing_state: order.customer.state,
      billing_country: 'India',
      billing_email: order.customer.email,
      billing_phone: order.customer.phone,
      shipping_is_billing: true,
      order_items: order.items.map(item => ({
        name: item.name,
        sku: 'ALP-' + item.id,
        units: item.quantity,
        selling_price: item.price,
        hsn: 0
      })),
      payment_method: order.paymentMethod === 'cod' ? 'COD' : 'Prepaid',
      sub_total: order.subtotal,
      length: 15,
      breadth: 10,
      height: 5,
      weight: 0.5
    };

    const response = await fetch(`${SHIPROCKET_BASE}/orders/create/adhoc`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        'Authorization': `Bearer ${token}`
      },
      body: JSON.stringify(shipmentPayload)
    });
    
    const data = await response.json();
    console.log('Shiprocket order created:', data);
    res.json({ success: true, data });
  } catch (err) {
    console.error('Create shipment error:', err);
    res.status(500).json({ success: false, error: err.message });
  }
});

// Track an order by your Order ID
app.get('/api/shiprocket/track/:orderId', async (req, res) => {
  try {
    const { orderId } = req.params;
    const token = await getShiprocketToken();
    
    // Search order in Shiprocket by your order ID
    const response = await fetch(`${SHIPROCKET_BASE}/orders?search=${orderId}`, {
      headers: { 'Authorization': `Bearer ${token}` }
    });
    const data = await response.json();
    
    if (!data.data || data.data.length === 0) {
      return res.json({ success: false, message: 'Order not found' });
    }
    
    const order = data.data[0];
    
    // If shipment created, get tracking
    if (order.shipments && order.shipments.length > 0) {
      const awb = order.shipments[0].awb;
      if (awb) {
        const trackRes = await fetch(`${SHIPROCKET_BASE}/courier/track/awb/${awb}`, {
          headers: { 'Authorization': `Bearer ${token}` }
        });
        const trackData = await trackRes.json();
        return res.json({ success: true, order, tracking: trackData });
      }
    }
    
    res.json({ success: true, order, tracking: null });
  } catch (err) {
    console.error('Track error:', err);
    res.status(500).json({ success: false, error: err.message });
  }
});

// Get shipping rates for a pincode
app.post('/api/shiprocket/rates', async (req, res) => {
  try {
    const { pincode, weight = 0.5, cod = 0 } = req.body;
    const token = await getShiprocketToken();
    
    const response = await fetch(
      `${SHIPROCKET_BASE}/courier/serviceability/?pickup_postcode=400001&delivery_postcode=${pincode}&weight=${weight}&cod=${cod}`,
      { headers: { 'Authorization': `Bearer ${token}` } }
    );
    const data = await response.json();
    res.json({ success: true, data });
  } catch (err) {
    res.status(500).json({ success: false, error: err.message });
  }
});
```

### Step 2.3 — Deploy

1. Commit & push to GitHub
2. Render will auto-deploy (~2 minutes)
3. Test by visiting: `https://alphabet-backend-b1sb.onrender.com/api/shiprocket/track/ALP-TEST`

---

## 📋 PART 3: Update Frontend (Already Done!)

I've already updated these files for you:
- ✅ `payment.html` — Auto-pushes order to Shiprocket after successful payment
- ✅ `track-order.html` — Now fetches real tracking from Shiprocket

Just upload the new ZIP and you're done!

---

## 🎯 Final Checklist

- [ ] Generated Shiprocket API credentials
- [ ] Added 3 env variables to Render
- [ ] Added backend endpoints to `server.js`
- [ ] Pushed backend code to GitHub
- [ ] Render redeployed successfully
- [ ] Uploaded new website ZIP to GitHub Pages
- [ ] Placed test order to verify

---

## ❓ Troubleshooting

**"Shiprocket auth failed"**
→ Check email/password in Render env variables match what you set in Shiprocket

**"Pickup location not found"**
→ Login to Shiprocket → Settings → Pickup Address. The nickname must match exactly (case-sensitive)

**"Order not tracking"**
→ Shiprocket takes 5-30 min to assign AWB number after order creation. Be patient on first test.

**Render service sleeping**
→ Already handled by your wake-up ping. First call may take 30s.

---

## 📞 Support

Shiprocket Support: 011-4099-4727 (Mon-Sat 10AM-7PM)
Shiprocket Help: https://www.shiprocket.in/contact/

---

Made with ❤️ for Alphabet Store
