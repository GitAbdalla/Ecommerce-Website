let  category_nav_list = document.querySelector(".category_nav_list")

function openCategoryList(){
    category_nav_list.classList.toggle("active")
}




document.addEventListener("DOMContentLoaded", function () {
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
