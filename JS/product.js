const query = new URLSearchParams(window.location.search);
let productId = query.get('id');

function getLoggedInUser() {
  return localStorage.getItem('username');
}

function addToCart(product) {
  const user = getLoggedInUser();
  if (!user) {
    showNotification('Please log in to add items to your cart.', false);
    return;
  }
  const cartKey = `cart_${user}`;
  let cart = JSON.parse(localStorage.getItem(cartKey) || '[]');
  const existing = cart.find(item => item.id === product.id);
  if (existing) {
    existing.quantity += 1;
  } else {
    cart.push({ id: product.id, quantity: 1 });
  }
  localStorage.setItem(cartKey, JSON.stringify(cart));
  if (typeof updateCartCount === 'function') updateCartCount();
  if (typeof showNotification === 'function') showNotification('Added to cart!', true);
}

fetch('products.json')
  .then(res => res.json())
  .then(products => {
    if (!productId) {
      productId = products.length ? products[0].id : null;
    }
    const product = products.find(p => String(p.id) === String(productId));
    if (product) {
      document.getElementById('productDetail').innerHTML = `
        <div class="product-detail-card compact">
          <div class="product-image">
            <img src="${product.img}" alt="${product.name}" />
            <div class="img-gradient"></div>
            <div class="floating-badge">${product.old_price ? 'SALE' : 'NEW'}</div>
          </div>
          <div class="product-info">
            <h1>${product.name}</h1>
            <div class="price-block">
              <span class="price">$${product.price}</span>
              ${product.old_price ? `<span class="old-price">$${product.old_price}</span>` : ""}
            </div>
            <div class="colors">
              <span>Available Colors:</span>
              <div class="color-dots">
                <span class="dot" style="background-color: #000;"></span>
                <span class="dot" style="background-color: #555;"></span>
                <span class="dot" style="background-color: #bbb;"></span>
              </div>
            </div>
            <p class="description">${product.description || "No description available."}</p>
            <div class="extra-info compact-extra">
              <span class="buy-now">&#x1F525; Buy Now &amp; Pay Later</span>
              <span class="delivery">&#x1F69A; Fast Delivery</span>
              <span class="secure">&#x1F510; Secure Checkout</span>
            </div>
            <br>
            <button class="btn_add_cart"><i class="fa-solid fa-cart-shopping"></i> Add to Cart</button>
          </div>
        </div>
      `;
      document.querySelector('.btn_add_cart').addEventListener('click', function() {
        addToCart(product);
      });
    } else {
      document.getElementById('productDetail').textContent = 'Product not found.';
    }
  });
