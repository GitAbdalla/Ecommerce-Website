document.addEventListener("DOMContentLoaded", () => {
    fetch('products.json')
        .then(res => res.json())
        .then(products => {
            const productsContainer = document.getElementById('productContainer');
            productsContainer.innerHTML = '';

            // --- Category Filter Logic ---
            const categories = Array.from(new Set(products.map(p => p.category))).sort();
            const categorySelect = document.getElementById('category');
            categorySelect.innerHTML = '<option value="All Categories">All Categories</option>';
            categories.forEach(cat => {
                categorySelect.innerHTML += `<option value="${cat}">${cat.charAt(0).toUpperCase() + cat.slice(1)}</option>`;
            });

            // --- Price Filter Logic ---
            const minPriceInput = document.getElementById('minPrice');
            const maxPriceInput = document.getElementById('maxPrice');
            const applyPriceFilterBtn = document.getElementById('applyPriceFilter');
            let currentCategory = 'All Categories';
            let currentMinPrice = null;
            let currentMaxPrice = null;

            function applyFilters() {
                const filterCat = currentCategory;
                const minPrice = currentMinPrice !== null ? Number(currentMinPrice) : null;
                const maxPrice = currentMaxPrice !== null ? Number(currentMaxPrice) : null;
                renderFilteredProducts(filterCat, minPrice, maxPrice);
            }

            if (applyPriceFilterBtn) {
                applyPriceFilterBtn.addEventListener('click', function() {
                    currentMinPrice = minPriceInput.value;
                    currentMaxPrice = maxPriceInput.value;
                    applyFilters();
                });
            }

            if (minPriceInput && maxPriceInput) {
                minPriceInput.addEventListener('keydown', function(e) { if (e.key === 'Enter') applyFilters(); });
                maxPriceInput.addEventListener('keydown', function(e) { if (e.key === 'Enter') applyFilters(); });
            }

            categorySelect.addEventListener('change', function() {
                currentCategory = this.value;
                applyFilters();
            });

            // --- Updated renderFilteredProducts ---
            function renderFilteredProducts(filterCat, minPrice, maxPrice) {
                productsContainer.innerHTML = '';
                let filtered = filterCat && filterCat !== 'All Categories' ? products.filter(p => p.category === filterCat) : products;
                if (minPrice !== null && minPrice !== '') {
                    filtered = filtered.filter(p => p.price >= minPrice);
                }
                if (maxPrice !== null && maxPrice !== '') {
                    filtered = filtered.filter(p => p.price <= maxPrice);
                }
                if (!filtered.length) {
                    productsContainer.innerHTML = '<div class="no-products">No products available for this filter.</div>';
                    return;
                }
                filtered.forEach(product => {
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
            }

            // Initial render
            applyFilters();
        })
        .catch(error => {
            const productsContainer = document.getElementById('productContainer');
            productsContainer.innerHTML = '<div class="no-products">Failed to load products. Please try again later.</div>';
            console.error('Error loading products:', error);
        });
});
