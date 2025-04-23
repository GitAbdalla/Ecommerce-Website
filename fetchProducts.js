document.addEventListener("DOMContentLoaded", () => {
    fetch('products.json')
        .then(res => res.json())
        .then(products => {
            const productsContainer = document.querySelector('.slider_products .products');
            productsContainer.innerHTML = ''; 

            products.forEach(product => {
              const productHTML = `
                <div class="product" data-id="${product.id}">
                  <div class="img_product">
                    <a href="product.html?id=${product.id}"><img src="${product.img}" alt="${product.name}"></a>
                  </div>
                  <div class="stars">
                    <i class="fa-solid fa-star"></i>
                    <i class="fa-solid fa-star"></i>
                    <i class="fa-solid fa-star"></i>
                    <i class="fa-solid fa-star"></i>
                    <i class="fa-solid fa-star-half-stroke"></i>
                  </div>
                  <p class="name_product"><a href="product.html?id=${product.id}">${product.name}</a></p>
                  <div class="price">
                    <p><span>$${product.price}</span></p>
                  </div>
                  <div class="icons">
                    <span class="btn_add_cart" data-id="${product.id}">
                      <i class="fa-solid fa-cart-shopping"></i> add to cart
                    </span>
                    <span class="icon_product"><i class="fa-solid fa-heart"></i></span>
                  </div>
                </div>
              `;
              productsContainer.innerHTML += productHTML;
            });

            // Add to cart button logic
            document.querySelectorAll('.btn_add_cart').forEach(btn => {
              btn.addEventListener('click', function(e) {
                e.stopPropagation();
                const user = localStorage.getItem('username');
                if (!user) {
                  if (typeof showNotification === 'function') {
                    showNotification('Please log in to add items to your cart.', false);
                  } else {
                    alert('Please log in to add items to your cart.');
                  }
                  return;
                }
                const id = parseInt(btn.getAttribute('data-id'));
                let cartKey = `cart_${user}`;
                let cart = JSON.parse(localStorage.getItem(cartKey) || '[]');
                const existing = cart.find(item => item.id === id);
                if (existing) {
                  existing.quantity += 1;
                } else {
                  cart.push({ id, quantity: 1 });
                }
                localStorage.setItem(cartKey, JSON.stringify(cart));
                if (typeof updateCartCount === 'function') updateCartCount();
                if (typeof showNotification === 'function') showNotification('Added to cart!', true);
              });
            });
        })
        .catch(error => console.error('Error loading products:', error));
});
