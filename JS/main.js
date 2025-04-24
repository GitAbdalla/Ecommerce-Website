let category_nav_list = document.querySelector(".category_nav_list")

function openCategoryList(){
    category_nav_list.classList.toggle("active")
}

document.addEventListener("DOMContentLoaded", function () {

  if (typeof setupCartIconRedirect === 'function') {
    setupCartIconRedirect();
  }


  if (typeof updateCartCount === 'function') {
    updateCartCount();
    window.addEventListener('storage', updateCartCount);
  }


  const wrapper = document.querySelector('.swiper-wrapper');
  const slides = document.querySelectorAll('.swiper-slide');
  let currentSlide = 0;

  function showSlide(index) {
    if (index < 0) index = 0;
    if (index > slides.length - 1) index = slides.length - 1;
    wrapper.style.transform = `translateX(-${index * 100}%)`;
    currentSlide = index;
   
    const bullets = document.querySelectorAll('.swiper-pagination span');
    if (bullets.length) {
      bullets.forEach(b => b.classList.remove('swiper-pagination-bullet-active'));
      if (bullets[index]) bullets[index].classList.add('swiper-pagination-bullet-active');
    }
  }

  // Arrow event listeners
  const leftArrow = document.querySelector('.slider_arrow.left');
  const rightArrow = document.querySelector('.slider_arrow.right');
  if (leftArrow && rightArrow) {
    leftArrow.addEventListener('click', function(e) {
      e.preventDefault();
      showSlide(currentSlide - 1);
    });
    rightArrow.addEventListener('click', function(e) {
      e.preventDefault();
      showSlide(currentSlide + 1);
    });
  }

  showSlide(0);

  //  Back to Top 
  const backToTopBtn = document.getElementById('backToTop');
  if (backToTopBtn) {
    window.addEventListener('scroll', function() {
      if (window.scrollY > 350) {
        backToTopBtn.style.display = 'flex';
      } else {
        backToTopBtn.style.display = 'none';
      }
    });
    backToTopBtn.addEventListener('click', function(e) {
      e.preventDefault();
      window.scrollTo({ top: 0, behavior: 'smooth' });
    });
  }
});
