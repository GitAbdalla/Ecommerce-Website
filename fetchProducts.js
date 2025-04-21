document.addEventListener("DOMContentLoaded", () => {
    fetch('products.json')
        .then(res => res.json())
        .then(products => {
            const productsContainer = document.querySelector('.slider_products .products');
            productsContainer.innerHTML = ''; // Clear the static example product

            products.forEach(product => {
                console.log(product.img)
                const productHTML = `
            <div class="product">
              
              <div class="img_product">
                <a href="#"><img src="${product.img}" alt="${product.name}"></a>
              </div>
              <div class="stars">
                <i class="fa-solid fa-star"></i>
                <i class="fa-solid fa-star"></i>
                <i class="fa-solid fa-star"></i>
                <i class="fa-solid fa-star"></i>
                <i class="fa-solid fa-star-half-stroke"></i>
              </div>
              <p class="name_product"><a href="#">${product.name}</a></p>
              <div class="price">
                <p><span>$${product.price}</span></p>
              </div>
              <div class="icons">
                <span class="btn_add_cart">
                  <i class="fa-solid fa-cart-shopping"></i> add to cart
                </span>
                <span class="icon_product"><i class="fa-solid fa-heart"></i></span>
              </div>
            </div>
          `;
                productsContainer.innerHTML += productHTML;
            });
        })
        .catch(error => console.error('Error loading products:', error));
});

