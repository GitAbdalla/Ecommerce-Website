const query = new URLSearchParams(window.location.search);
  const productId = query.get('id');

  fetch('products.json')
    .then(res => res.json())
    .then(products => {
      const product = products.find(p => p.id == productId); // compare by id
      if (product) {
        document.getElementById('productDetail').innerHTML = `
        <div class="product-detail-card">
          <div class="product-image">
            <img src="${product.img}" alt="${product.name}" />
          </div>
          <div class="product-info">
            <h1>${product.name}</h1>
            <p class="description">${product.description || "No description available."}</p>
      
            <div class="price-block">
              <span class="price">$${product.price}</span>
              ${product.old_price ? `<span class="old-price">$${product.old_price}</span>` : ""}
            </div>
      
            <div class="colors">
              <p>Available Colors:</p>
              <div class="color-dots">
                <span class="dot" style="background-color: #000;"></span>
                <span class="dot" style="background-color: #555;"></span>
                <span class="dot" style="background-color: #bbb;"></span>
              </div>
            </div>
      
            <div class="extra-info">
              <h3 class="buy-now">🔥 Buy Now & Pay Later</h3>
              <h3 class="delivery">🚚 Fast Delivery Available</h3>
              <h3 class="secure">🔒 Secure Checkout</h3>
            </div>

            
      
            <div class="buttons">
              <button class="btn_add_cart"><i class="fa-solid fa-cart-shopping"></i> Add to Cart</button>
            </div>
          </div>
        </div>
      `;
      
      
      } else {
        document.getElementById('productDetail').textContent = 'Product not found.';
      }
    });