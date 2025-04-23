// Cart logic for Ecommerce Website
function getLoggedInUser() {
  return localStorage.getItem('username');
}

function getCartKey() {
  const user = getLoggedInUser();
  return user ? `cart_${user}` : null;
}

function getCart() {
  const cartKey = getCartKey();
  if (!cartKey) return [];
  const cart = localStorage.getItem(cartKey);
  return cart ? JSON.parse(cart) : [];
}

function saveCart(cart) {
  const cartKey = getCartKey();
  if (!cartKey) return;
  localStorage.setItem(cartKey, JSON.stringify(cart));
}

function removeFromCart(productId) {
  let cart = getCart();
  cart = cart.filter(item => item.id !== productId);
  saveCart(cart);
  renderCart();
  if (typeof updateCartCount === 'function') updateCartCount();
}

function updateQuantity(productId, qty) {
  let cart = getCart();
  cart = cart.map(item => item.id === productId ? {...item, quantity: qty} : item);
  saveCart(cart);
  renderCart();
  if (typeof updateCartCount === 'function') updateCartCount();
}

function renderCart() {
  const cartItemsDiv = document.getElementById('cartItems');
  const cartTotalDiv = document.getElementById('cartTotal');
  const cartActionsDiv = document.getElementById('cartActions');
  const user = getLoggedInUser();
  if (!user) {
    cartItemsDiv.innerHTML = '<p>Please log in to view your cart.</p>';
    cartTotalDiv.innerHTML = '';
    cartActionsDiv.innerHTML = '';
    return;
  }
  const cart = getCart();
  if (cart.length === 0) {
    cartItemsDiv.innerHTML = '<p>Your cart is empty.</p>';
    cartTotalDiv.innerHTML = '';
    cartActionsDiv.innerHTML = '';
    return;
  }
  fetch('products.json')
    .then(res => res.json())
    .then(products => {
      let total = 0;
      cartItemsDiv.innerHTML = cart.map(item => {
        const product = products.find(p => p.id === item.id);
        if (!product) return '';
        const subtotal = product.price * item.quantity;
        total += subtotal;
        return `
          <div class="cart-item">
            <img src="${product.img}" alt="${product.name}" class="cart-item-img">
            <div class="cart-item-info">
              <h2>${product.name}</h2>
              <p>Price: $${product.price}</p>
              <div class="cart-qty">
                <button onclick="updateQuantity(${item.id}, Math.max(1, ${item.quantity}-1))">-</button>
                <span>${item.quantity}</span>
                <button onclick="updateQuantity(${item.id}, ${item.quantity}+1)">+</button>
              </div>
              <p>Subtotal: $${subtotal}</p>
              <button onclick="removeFromCart(${item.id})" class="remove-btn">Remove</button>
            </div>
          </div>
        `;
      }).join('');
      cartTotalDiv.innerHTML = `<h3>Total: $${total.toFixed(2)}</h3>`;
      cartActionsDiv.innerHTML = `<button class="checkout-btn" id="checkoutBtn">Checkout</button>`;
      document.getElementById('checkoutBtn').onclick = function() {
        // Fake checkout: show modal, empty cart
        document.getElementById('orderModal').style.display = 'flex';
        saveCart([]);
        renderCart();
        if (typeof updateCartCount === 'function') updateCartCount();
      };
    });
}

document.addEventListener('DOMContentLoaded', renderCart);
