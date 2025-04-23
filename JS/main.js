let  category_nav_list = document.querySelector(".category_nav_list")

function openCategoryList(){
    category_nav_list.classList.toggle("active")
}

// --- Cart count logic ---
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

document.addEventListener("DOMContentLoaded", function () {
  updateCartCount();
  window.addEventListener('storage', updateCartCount);
  const cartIcon = document.querySelector('.icon a[href="#"] i.fa-cart-shopping')?.closest('a');
  if (cartIcon) {
    cartIcon.addEventListener('click', function(e) {
      e.preventDefault();
      window.location.href = 'cart.html';
    });
  }

  const wrapper = document.querySelector('.swiper-wrapper');
  const slides = document.querySelectorAll('.swiper-slide');
  const pagination = document.querySelector('.swiper-pagination');
  let currentSlide = 0;

  slides.forEach((_, index) => {
    const bullet = document.createElement('span');
    if (index === 0) bullet.classList.add('swiper-pagination-bullet-active');
    pagination.appendChild(bullet);
  });

  const bullets = pagination.querySelectorAll('span');

  function showSlide(index) {
    wrapper.style.transform = `translateX(-${index * 100}%)`;
    bullets.forEach(b => b.classList.remove('swiper-pagination-bullet-active'));
    bullets[index].classList.add('swiper-pagination-bullet-active');
  }

  function nextSlide() {
    currentSlide = (currentSlide + 1) % slides.length;
    showSlide(currentSlide);
  }

  setInterval(nextSlide, 4000);
});

let scrollAmount = 0;
  const step = 5 * 240; 
  const productsEl = document.querySelector(".products");
  const sliderWrapper = document.querySelector(".slider_products");

  function updateSlider(direction) {
    const maxScroll = productsEl.scrollWidth - sliderWrapper.offsetWidth;

    if (direction === "right" && scrollAmount + step <= maxScroll) {
      scrollAmount += step;
    } else if (direction === "left" && scrollAmount - step >= 0) {
      scrollAmount -= step;
    }

    productsEl.style.transform = `translateX(-${scrollAmount}px)`;
  }

  document.querySelector(".slider_arrow.right").addEventListener("click", () => {
    updateSlider("right");
  });

  document.querySelector(".slider_arrow.left").addEventListener("click", () => {
    updateSlider("left");
  });
