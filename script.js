// Navigation Header Scroll Effect
const header = document.querySelector('header');
window.addEventListener('scroll', () => {
  if (window.scrollY > 50) {
    header.classList.add('scrolled');
  } else {
    header.classList.remove('scrolled');
  }
});

// Mobile Hamburger Menu Toggle
const menuToggle = document.querySelector('.menu-toggle');
const navLinks = document.querySelector('.nav-links');
const navItems = document.querySelectorAll('.nav-links a');

menuToggle.addEventListener('click', () => {
  menuToggle.classList.toggle('active');
  navLinks.classList.toggle('active');
});

// Close Mobile Menu on Click Navigation Links
navItems.forEach(item => {
  item.addEventListener('click', () => {
    menuToggle.classList.remove('active');
    navLinks.classList.remove('active');
  });
});

// Scroll Reveal Effect using Intersection Observer
const revealElements = document.querySelectorAll('.reveal');

const revealCallback = (entries, observer) => {
  entries.forEach(entry => {
    if (entry.isIntersecting) {
      entry.target.classList.add('active');
      observer.unobserve(entry.target);
    }
  });
};

const revealObserver = new IntersectionObserver(revealCallback, {
  root: null,
  threshold: 0.1,
  rootMargin: '0px 0px -50px 0px'
});

revealElements.forEach(element => {
  revealObserver.observe(element);
});

// Typing Effect for Hero Title
const typingTextElement = document.getElementById('typing-text');
const words = ["가장 쉬운 방법", "실전형 클래스", "확실한 해답"];
let wordIndex = 0;
let charIndex = 0;
let isDeleting = false;
let delay = 150;

function typeEffect() {
  const currentWord = words[wordIndex];
  
  if (isDeleting) {
    typingTextElement.textContent = currentWord.substring(0, charIndex - 1);
    charIndex--;
    delay = 75; // Faster deletion
  } else {
    typingTextElement.textContent = currentWord.substring(0, charIndex + 1);
    charIndex++;
    delay = 150; // Typing speed
  }
  
  if (!isDeleting && charIndex === currentWord.length) {
    isDeleting = true;
    delay = 2000; // Pause at the end of the word
  } else if (isDeleting && charIndex === 0) {
    isDeleting = false;
    wordIndex = (wordIndex + 1) % words.length;
    delay = 500; // Pause before typing next word
  }
  
  setTimeout(typeEffect, delay);
}

// Start typing effect on window load
window.addEventListener('DOMContentLoaded', () => {
  if (typingTextElement) {
    typeEffect();
  }
});

// Form Submission Handling
function handleFormSubmit(event) {
  event.preventDefault();
  
  const name = document.getElementById('userName').value;
  const phone = document.getElementById('userPhone').value;
  const type = document.getElementById('inquiryType');
  const typeText = type.options[type.selectedIndex].text;
  const message = document.getElementById('userMessage').value;

  alert(`✨ 문의가 성공적으로 접수되었습니다!\n\n• 신청자: ${name}님\n• 연락처: ${phone}\n• 문의 구분: ${typeText}\n\n라니쌤이 확인 후 빠른 시일 내에 연락드리겠습니다.`);
  
  document.getElementById('inquiryForm').reset();
}

// Floating Kakao & Font Zoom Functions
const kakaoBtn = document.getElementById('kakaoBtn');
const kakaoTooltip = document.getElementById('kakaoTooltip');
const zoomInBtn = document.getElementById('zoomInBtn');
const zoomOutBtn = document.getElementById('zoomOutBtn');
const zoomResetBtn = document.getElementById('zoomResetBtn');

// Kakao Open Chat Link Click
if (kakaoBtn) {
  kakaoBtn.addEventListener('click', () => {
    window.open('https://open.kakao.com/o/gXlVsxui-', '_blank');
  });
}

// 3-second tooltip trigger
window.addEventListener('load', () => {
  if (kakaoTooltip) {
    setTimeout(() => {
      kakaoTooltip.classList.add('active');
    }, 3000);
  }
});

// Tooltip click to close
if (kakaoTooltip) {
  kakaoTooltip.addEventListener('click', () => {
    kakaoTooltip.classList.remove('active');
  });
}

// Text Resizing Logic
let currentFontSize = 16; // default size in pixels

function setBodyFontSize(size) {
  document.documentElement.style.fontSize = `${size}px`;
}

if (zoomInBtn) {
  zoomInBtn.addEventListener('click', () => {
    if (currentFontSize < 24) {
      currentFontSize += 2;
      setBodyFontSize(currentFontSize);
    }
  });
}

if (zoomOutBtn) {
  zoomOutBtn.addEventListener('click', () => {
    if (currentFontSize > 12) {
      currentFontSize -= 2;
      setBodyFontSize(currentFontSize);
    }
  });
}

if (zoomResetBtn) {
  zoomResetBtn.addEventListener('click', () => {
    currentFontSize = 16;
    setBodyFontSize(currentFontSize);
  });
}

// Reviews Slider Logic
const reviewsTrack = document.getElementById('reviewsTrack');
const reviewSlides = document.querySelectorAll('.review-slide');
const prevReviewBtn = document.getElementById('prevReviewBtn');
const nextReviewBtn = document.getElementById('nextReviewBtn');
const reviewDots = document.querySelectorAll('.slider-dots .dot');

let currentSlideIndex = 0;
let autoSlideInterval;

function updateSliderPosition() {
  if (reviewsTrack) {
    reviewsTrack.style.transform = `translateX(-${currentSlideIndex * 100}%)`;
  }
  
  // Update Dots
  reviewDots.forEach((dot, index) => {
    if (index === currentSlideIndex) {
      dot.classList.add('active');
    } else {
      dot.classList.remove('active');
    }
  });
}

function nextSlide() {
  currentSlideIndex = (currentSlideIndex + 1) % reviewSlides.length;
  updateSliderPosition();
}

function prevSlide() {
  currentSlideIndex = (currentSlideIndex - 1 + reviewSlides.length) % reviewSlides.length;
  updateSliderPosition();
}

function startAutoSlide() {
  stopAutoSlide();
  autoSlideInterval = setInterval(nextSlide, 3000); // 3 seconds interval
}

function stopAutoSlide() {
  if (autoSlideInterval) {
    clearInterval(autoSlideInterval);
  }
}

// Attach Event Listeners
if (nextReviewBtn) {
  nextReviewBtn.addEventListener('click', () => {
    nextSlide();
    startAutoSlide(); // Reset timer on manual click
  });
}

if (prevReviewBtn) {
  prevReviewBtn.addEventListener('click', () => {
    prevSlide();
    startAutoSlide(); // Reset timer on manual click
  });
}

// Dot Indicators Click Events
reviewDots.forEach(dot => {
  dot.addEventListener('click', (e) => {
    currentSlideIndex = parseInt(e.target.getAttribute('data-index'));
    updateSliderPosition();
    startAutoSlide(); // Reset timer on manual click
  });
});

// Start auto slide on DOM Content Loaded
window.addEventListener('DOMContentLoaded', () => {
  if (reviewSlides.length > 0) {
    startAutoSlide();
  }
});



