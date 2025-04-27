function getLoggedInUser() {
  return localStorage.getItem('username');
}

function updateCartCount() {
  const user = getLoggedInUser();
  const cartCountSpan = document.querySelector('.count_item_header');
  if (!cartCountSpan) return;
  if (!user) {
    cartCountSpan.textContent = '0';
    return;
  }
  const cartKey = `cart_${user}`;
  const cart = JSON.parse(localStorage.getItem(cartKey) || '[]');
  const totalItems = cart.reduce((sum, item) => sum + item.quantity, 0);
  cartCountSpan.textContent = totalItems;
}

function setupCartIconRedirect() {
  const cartIcon = document.querySelector('.icon a[href="#"] i.fa-cart-shopping')?.closest('a');
  if (cartIcon) {
    cartIcon.addEventListener('click', function(e) {
      e.preventDefault();
      window.location.href = 'cart.html';
    });
  }
}


window.getLoggedInUser = getLoggedInUser;
window.updateCartCount = updateCartCount;
window.setupCartIconRedirect = setupCartIconRedirect;
