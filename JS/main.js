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

  function prevSlide() {
    if (currentSlide <= 0) {
      currentSlide = slides.length - 1;
    } else {
      currentSlide--;
    }
    setImg();
  }

  function nextSlide() {
    if (currentSlide >= slides.length - 1) {
      currentSlide = 0;
    } else {
      currentSlide++;
    }
    setImg();
  }

  function setImg() {
    wrapper.style.transition = 'transform 0.4s ease-in-out';
    wrapper.style.transform = `translateX(-${currentSlide * 100}%)`;
    const bullets = document.querySelectorAll('.swiper-pagination span');
    if (bullets.length) {
      bullets.forEach(b => b.classList.remove('swiper-pagination-bullet-active'));
      if (bullets[currentSlide]) bullets[currentSlide].classList.add('swiper-pagination-bullet-active');
    }
    setTimeout(() => {
      wrapper.style.transition = '';
    }, 400);
  }

  // Arrow event listeners
  const leftArrow = document.querySelector('.slider_arrow.left');
  const rightArrow = document.querySelector('.slider_arrow.right');
  if (leftArrow && rightArrow) {
    leftArrow.addEventListener('click', function(e) {
      e.preventDefault();
      prevSlide();
    });
    rightArrow.addEventListener('click', function(e) {
      e.preventDefault();
      nextSlide();
    });
  }

  setImg();

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


  const hamburgerBtn = document.getElementById('hamburgerBtn');
  const navLinks = document.getElementById('navLinks');
  if (hamburgerBtn && navLinks) {
    hamburgerBtn.style.display = 'block';
    navLinks.classList.remove('open');
    hamburgerBtn.addEventListener('click', function(e) {
      e.stopPropagation();
      navLinks.classList.toggle('open');
    });
    
    document.addEventListener('click', function(e) {
      if (!navLinks.contains(e.target) && !hamburgerBtn.contains(e.target)) {
        navLinks.classList.remove('open');
      }
    });
  }
});
