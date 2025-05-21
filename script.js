// Navigation menu toggle
const hamburger = document.querySelector('.hamburger');
const navLinks = document.querySelector('.nav-links');
const splineViewer = document.querySelector('spline-viewer');
const projectCards = document.querySelectorAll('.project-card');

if (hamburger && navLinks) {
  hamburger.addEventListener('click', () => {
    hamburger.classList.toggle('active');
    navLinks.classList.toggle('active');
  });
}

// Close mobile menu when clicking a link
const navItems = document.querySelectorAll('.nav-links a');
navItems.forEach(item => {
  item.addEventListener('click', () => {
    if (navLinks.classList.contains('active')) {
      navLinks.classList.remove('active');
      hamburger.classList.remove('active');
    }
  });
});

// Smooth scrolling for anchor links
document.querySelectorAll('a[href^="#"]').forEach(anchor => {
  anchor.addEventListener('click', function(e) {
    e.preventDefault();
    const target = document.querySelector(this.getAttribute('href'));
    if (target) {
      target.scrollIntoView({
        behavior: 'smooth'
      });
      // Close mobile menu if open
      hamburger.classList.remove('active');
      navLinks.classList.remove('active');
    }
  });
});

// Scroll reveal animation
const revealElements = document.querySelectorAll('.section-title, .about-content, .projects-grid, .skills-content, .contact-content');

function checkScroll() {
  revealElements.forEach(element => {
    const elementTop = element.getBoundingClientRect().top;
    const windowHeight = window.innerHeight;
    
    if (elementTop < windowHeight - 100) {
      element.classList.add('revealed');
    }
  });
}

// Add CSS for scroll reveal
const style = document.createElement('style');
style.textContent = `
  .section-title, .about-content, .projects-grid, .skills-content, .contact-content {
    opacity: 0;
    transform: translateY(30px);
    transition: opacity 0.6s ease, transform 0.6s ease;
  }
  
  .revealed {
    opacity: 1;
    transform: translateY(0);
  }
`;
document.head.appendChild(style);

// Initialize scroll check
window.addEventListener('scroll', checkScroll);
window.addEventListener('load', checkScroll);

// Form submission handler
const contactForm = document.querySelector('.contact-form');
if (contactForm) {
  contactForm.addEventListener('submit', async (e) => {
    e.preventDefault();
    
    const formData = {
      name: contactForm.querySelector('input[type="text"]').value,
      email: contactForm.querySelector('input[type="email"]').value,
      message: contactForm.querySelector('textarea').value
    };

    try {
      // Replace with your actual form submission logic
      console.log('Form submitted:', formData);
      
      // Show success message
      const successMessage = document.createElement('div');
      successMessage.className = 'success-message';
      successMessage.textContent = 'Message sent successfully!';
      document.body.appendChild(successMessage);
      
      // Trigger animation
      setTimeout(() => successMessage.classList.add('show'), 100);
      
      // Remove message after 3 seconds
      setTimeout(() => {
        successMessage.classList.remove('show');
        setTimeout(() => successMessage.remove(), 300);
      }, 3000);
      
      // Reset form
      contactForm.reset();
    } catch (error) {
      console.error('Error submitting form:', error);
      alert('Failed to send message. Please try again.');
    }
  });
}

// Instant Spline loading
if (splineViewer) {
  // Set immediate visibility
  splineViewer.style.opacity = '1';
  splineViewer.style.visibility = 'visible';
}

// Responsive scaling for Spline scene
function adjustSplineScene() {
  if (splineViewer) {
    if (window.innerWidth <= 576) {
      splineViewer.style.transform = 'scale(0.7)';
    } else if (window.innerWidth <= 768) {
      splineViewer.style.transform = 'scale(0.8)';
    } else {
      splineViewer.style.transform = 'scale(1)';
    }
    splineViewer.style.transformOrigin = 'center center';
  }
}

window.addEventListener('load', adjustSplineScene);
window.addEventListener('resize', adjustSplineScene);

// Typing animation for hero title
const heroTitle = document.querySelector('.hero-content h1');
if (heroTitle) {
  const originalText = heroTitle.innerHTML;
  heroTitle.innerHTML = '';
  
  let charIndex = 0;
  
  function typeWriter() {
    if (charIndex < originalText.length) {
      heroTitle.innerHTML += originalText.charAt(charIndex);
      charIndex++;
      setTimeout(typeWriter, 50);
    }
  }
  
  // Delay starting the animation
  setTimeout(typeWriter, 500);
}

// Skills animation
const skillBars = document.querySelectorAll('.skill-progress');
skillBars.forEach(bar => {
  bar.style.width = '0';
});

function animateSkills() {
  skillBars.forEach(bar => {
    const barTop = bar.getBoundingClientRect().top;
    const windowHeight = window.innerHeight;
    
    if (barTop < windowHeight - 50) {
      const targetWidth = bar.style.width;
      bar.style.width = '0';
      bar.style.transition = 'width 1s ease-in-out';
      
      setTimeout(() => {
        bar.style.width = targetWidth;
      }, 200);
    }
  });
}

window.addEventListener('scroll', animateSkills);
window.addEventListener('load', () => {
  setTimeout(animateSkills, 1000);
});

// Handle window resize for responsive adjustments
window.addEventListener('resize', () => {
  checkScroll();
  setActiveLink();
  animateProjectCards();
  animateSkills();
});

// Update system time
function updateSystemTime() {
  const now = new Date();
  const timeString = now.toLocaleTimeString('en-US', {
    hour12: false,
    hour: '2-digit',
    minute: '2-digit',
    second: '2-digit'
  });
  document.getElementById('currentTime').textContent = timeString;
}

setInterval(updateSystemTime, 1000);
updateSystemTime();

// Project filters
const filterButtons = document.querySelectorAll('.filter-btn');

filterButtons.forEach(button => {
  button.addEventListener('click', () => {
    filterButtons.forEach(btn => btn.classList.remove('active'));
    button.classList.add('active');
    
    const filter = button.textContent.toLowerCase();
    
    projectCards.forEach(card => {
      if (filter === 'all' || card.dataset.category === filter) {
        card.style.display = 'block';
      } else {
        card.style.display = 'none';
      }
    });
  });
});

// Scroll animations
const observerOptions = {
  root: null,
  rootMargin: '0px',
  threshold: 0.1
};

const observer = new IntersectionObserver((entries) => {
  entries.forEach(entry => {
    if (entry.isIntersecting) {
      entry.target.classList.add('fade-in');
      observer.unobserve(entry.target);
    }
  });
}, observerOptions);

document.querySelectorAll('section').forEach(section => {
  observer.observe(section);
});

// Initialize all animations and interactions
document.addEventListener('DOMContentLoaded', () => {
  checkScroll();
  setActiveLink();
  animateProjectCards();
  setTimeout(animateSkills, 1000);
});

// Active link highlighting
function setActiveLink() {
  const sections = document.querySelectorAll('section');
  const navLinks = document.querySelectorAll('.nav-links a');
  
  let currentSectionId = '';
  
  sections.forEach(section => {
    const sectionTop = section.offsetTop;
    const sectionHeight = section.clientHeight;
    const navHeight = document.querySelector('nav').offsetHeight;
    
    if (window.scrollY >= sectionTop - navHeight - 50) {
      currentSectionId = section.getAttribute('id');
    }
  });
  
  navLinks.forEach(link => {
    link.classList.remove('active');
    if (link.getAttribute('href') === `#${currentSectionId}`) {
      link.classList.add('active');
    }
  });
}

// Add CSS for active link
const activeLinkStyle = document.createElement('style');
activeLinkStyle.textContent = `
  .nav-links a.active {
    color: #6366f1;
    position: relative;
  }
  
  .nav-links a.active::after {
    content: '';
    position: absolute;
    bottom: -5px;
    left: 0;
    width: 100%;
    height: 2px;
    background-color: #6366f1;
    border-radius: 1px;
  }
`;
document.head.appendChild(activeLinkStyle);

// Animation for project cards
const projectCards = document.querySelectorAll('.project-card');
projectCards.forEach((card, index) => {
  card.style.opacity = '0';
  card.style.transform = 'translateY(30px)';
  card.style.transition = 'opacity 0.5s ease, transform 0.5s ease';
  card.style.transitionDelay = `${index * 0.1}s`;
});

function animateProjectCards() {
  projectCards.forEach(card => {
    const cardTop = card.getBoundingClientRect().top;
    const windowHeight = window.innerHeight;
    
    if (cardTop < windowHeight - 100) {
      card.style.opacity = '1';
      card.style.transform = 'translateY(0)';
    }
  });
}

window.addEventListener('scroll', animateProjectCards);
window.addEventListener('load', animateProjectCards);

// Preload Spline scene
// Modified section of the script.js file
// Find the window.addEventListener('load') function that handles the Spline preload

window.addEventListener('load', () => {
    // Add loading indicator
    const loadingOverlay = document.createElement('div');
    loadingOverlay.className = 'loading-overlay';
    loadingOverlay.innerHTML = `
      <div class="loading-spinner"></div>
      <p>Loading 3D scene...</p>
    `;
    
    const loadingStyle = document.createElement('style');
    loadingStyle.textContent = `
      .loading-overlay {
        position: fixed;
        top: 0;
        left: 0;
        width: 100%;
        height: 100%;
        background-color: rgba(255, 255, 255, 0.9);
        display: flex;
        flex-direction: column;
        justify-content: center;
        align-items: center;
        z-index: 1000;
        transition: opacity 0.5s ease;
      }
      
      .loading-spinner {
        width: 50px;
        height: 50px;
        border: 5px solid #f3f3f3;
        border-top: 5px solid #6366f1;
        border-radius: 50%;
        animation: spin 1s linear infinite;
        margin-bottom: 20px;
      }
      
      @keyframes spin {
        0% { transform: rotate(0deg); }
        100% { transform: rotate(360deg); }
      }
    `;
    document.head.appendChild(loadingStyle);
    document.body.appendChild(loadingOverlay);
    
    // Listen for when Spline viewer is loaded
    const splineViewer = document.querySelector('spline-viewer');
    
    if (splineViewer) {
      // Option 1: Try both load and loadeddata events
      splineViewer.addEventListener('load', handleSplineLoaded);
      splineViewer.addEventListener('loadeddata', handleSplineLoaded);
      
      // Option 2: Add a fallback timer in case the events don't fire
      const fallbackTimer = setTimeout(() => {
        removeLoadingOverlay();
      }, 8000); // 8 second fallback
      
      function handleSplineLoaded() {
        // Clear the fallback timer if the event fired successfully
        clearTimeout(fallbackTimer);
        removeLoadingOverlay();
      }
    } else {
      // If spline viewer isn't found, remove overlay anyway after a short delay
      setTimeout(() => {
        removeLoadingOverlay();
      }, 2000);
    }
    
    function removeLoadingOverlay() {
      // Remove loading overlay with a fade effect
      loadingOverlay.style.opacity = '0';
      setTimeout(() => {
        // Only remove if it's still in the document
        if (document.body.contains(loadingOverlay)) {
          document.body.removeChild(loadingOverlay);
        }
      }, 500);
    }
  });

// Cursor effects
const cursor = document.createElement('div');
cursor.classList.add('cursor');
document.body.appendChild(cursor);

document.addEventListener('mousemove', (e) => {
    cursor.style.left = e.clientX + 'px';
    cursor.style.top = e.clientY + 'px';
});

// Add hover effect to interactive elements
const interactiveElements = document.querySelectorAll('a, button, .project-card');
interactiveElements.forEach(element => {
    element.addEventListener('mouseenter', () => {
        cursor.classList.add('cursor-hover');
    });
    element.addEventListener('mouseleave', () => {
        cursor.classList.remove('cursor-hover');
    });
});

// Matrix Background Animation
const matrixBg = document.createElement('div');
matrixBg.classList.add('matrix-bg');
document.body.appendChild(matrixBg);

const canvas = document.createElement('canvas');
matrixBg.appendChild(canvas);
const ctx = canvas.getContext('2d');

// Set canvas size
function resizeCanvas() {
    canvas.width = window.innerWidth;
    canvas.height = window.innerHeight;
}

resizeCanvas();
window.addEventListener('resize', resizeCanvas);

// Matrix characters
const chars = '01';
const fontSize = 14;
const columns = canvas.width / fontSize;
const drops = [];

// Initialize drops
for (let i = 0; i < columns; i++) {
    drops[i] = 1;
}

// Draw matrix rain
function drawMatrix() {
    ctx.fillStyle = 'rgba(0, 0, 0, 0.05)';
    ctx.fillRect(0, 0, canvas.width, canvas.height);

    ctx.fillStyle = '#fff';
    ctx.font = fontSize + 'px monospace';

    for (let i = 0; i < drops.length; i++) {
        const text = chars[Math.floor(Math.random() * chars.length)];
        ctx.fillText(text, i * fontSize, drops[i] * fontSize);

        if (drops[i] * fontSize > canvas.height && Math.random() > 0.975) {
            drops[i] = 0;
        }
        drops[i]++;
    }
}

// Animate matrix
setInterval(drawMatrix, 33);

// Scroll Progress Bar
const scrollProgress = document.createElement('div');
scrollProgress.classList.add('scroll-progress');
document.body.appendChild(scrollProgress);

const progressBar = document.createElement('div');
progressBar.classList.add('scroll-progress-bar');
scrollProgress.appendChild(progressBar);

window.addEventListener('scroll', () => {
    const windowHeight = document.documentElement.scrollHeight - document.documentElement.clientHeight;
    const scrolled = (window.scrollY / windowHeight) * 100;
    progressBar.style.width = scrolled + '%';
});

// Loading Animation
const loading = document.createElement('div');
loading.classList.add('loading');
document.body.appendChild(loading);

const loadingText = document.createElement('div');
loadingText.classList.add('loading-text');
loadingText.textContent = 'ADARSH_2050';
loading.appendChild(loadingText);

window.addEventListener('load', () => {
    setTimeout(() => {
        loading.style.opacity = '0';
        setTimeout(() => {
            loading.remove();
        }, 500);
    }, 1500);
});

// Spline loading handler
const splineContainer = document.querySelector('.spline-container');
const splineLoader = document.querySelector('.spline-loader');
const splineViewer = document.querySelector('spline-viewer');

if (splineViewer && splineContainer && splineLoader) {
    // Hide loader and show Spline when loaded
    splineViewer.addEventListener('load', () => {
        console.log('Spline scene loaded');
        splineContainer.classList.add('loaded');
        splineLoader.style.opacity = '0';
        setTimeout(() => {
            splineLoader.style.display = 'none';
        }, 500);
    });

    // Show loading error if it takes too long
    const loadingTimeout = setTimeout(() => {
        if (!splineContainer.classList.contains('loaded')) {
            splineLoader.innerHTML = `
                <div class="spline-loader-text">Failed to load 3D scene</div>
                <button onclick="window.location.reload()" class="btn-future" style="margin-top: 1rem;">Retry</button>
            `;
        }
    }, 10000); // 10 second timeout

    // Clear timeout if loaded successfully
    splineViewer.addEventListener('load', () => {
        clearTimeout(loadingTimeout);
    });
}

// Loading Handler
const loadingOverlay = document.querySelector('.loading-overlay');
const splineViewer = document.querySelector('spline-viewer');
let splineLoaded = false;
let contentLoaded = false;

function checkAllLoaded() {
    if (splineLoaded && contentLoaded) {
        // Hide loading overlay
        loadingOverlay.classList.add('hidden');
        // Show page content
        document.body.classList.add('loaded');
        // Remove loading overlay after animation
        setTimeout(() => {
            loadingOverlay.remove();
        }, 500);
    }
}

// Handle Spline loading
if (splineViewer) {
    splineViewer.addEventListener('load', () => {
        console.log('Spline scene loaded');
        splineLoaded = true;
        checkAllLoaded();
    });

    // Fallback in case Spline fails to load
    setTimeout(() => {
        if (!splineLoaded) {
            console.warn('Spline loading timeout - proceeding without 3D scene');
            splineLoaded = true;
            checkAllLoaded();
        }
    }, 10000); // 10 second timeout
}

// Handle content loading
window.addEventListener('load', () => {
    contentLoaded = true;
    checkAllLoaded();
});

// Performance Optimizations
document.addEventListener('DOMContentLoaded', () => {
    // Lazy load images
    const lazyImages = document.querySelectorAll('img[data-src]');
    const imageObserver = new IntersectionObserver((entries, observer) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                const img = entry.target;
                img.src = img.dataset.src;
                img.removeAttribute('data-src');
                observer.unobserve(img);
            }
        });
    });

    lazyImages.forEach(img => imageObserver.observe(img));

    // Defer non-critical CSS
    const nonCriticalCSS = document.createElement('link');
    nonCriticalCSS.rel = 'stylesheet';
    nonCriticalCSS.href = 'https://cdnjs.cloudflare.com/ajax/libs/font-awesome/6.4.0/css/all.min.css';
    nonCriticalCSS.media = 'print';
    nonCriticalCSS.onload = function() {
        this.media = 'all';
    };
    document.head.appendChild(nonCriticalCSS);

    // Optimize animations
    const animatedElements = document.querySelectorAll('.fade-in');
    const animationObserver = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.style.opacity = '1';
                entry.target.style.transform = 'translateY(0)';
            }
        });
    }, {
        threshold: 0.1
    });

    animatedElements.forEach(el => animationObserver.observe(el));

    // Debounce scroll events
    let scrollTimeout;
    window.addEventListener('scroll', () => {
        if (scrollTimeout) {
            window.cancelAnimationFrame(scrollTimeout);
        }
        scrollTimeout = window.requestAnimationFrame(() => {
            // Your scroll handling code here
        });
    });

    // Optimize form submission
    const contactForm = document.getElementById('contactForm');
    if (contactForm) {
        contactForm.addEventListener('submit', async (e) => {
            e.preventDefault();
            const submitButton = contactForm.querySelector('button[type="submit"]');
            submitButton.disabled = true;
            submitButton.innerHTML = '<i class="fas fa-spinner fa-spin"></i> Sending...';

            try {
                const formData = new FormData(contactForm);
                const response = await emailjs.sendForm('YOUR_SERVICE_ID', 'YOUR_TEMPLATE_ID', contactForm);
                
                if (response.status === 200) {
                    submitButton.innerHTML = '<i class="fas fa-check"></i> Sent Successfully!';
                    contactForm.reset();
                }
            } catch (error) {
                submitButton.innerHTML = '<i class="fas fa-times"></i> Error Sending';
                console.error('Error:', error);
            }

            setTimeout(() => {
                submitButton.disabled = false;
                submitButton.innerHTML = '<span>Send Message</span><i class="fas fa-paper-plane"></i>';
            }, 3000);
        });
    }

    // Optimize navigation
    const navLinks = document.querySelectorAll('.nav-links a');
    navLinks.forEach(link => {
        link.addEventListener('click', (e) => {
            e.preventDefault();
            const targetId = link.getAttribute('href');
            const targetSection = document.querySelector(targetId);
            
            if (targetSection) {
                window.scrollTo({
                    top: targetSection.offsetTop - 80,
                    behavior: 'smooth'
                });
            }
        });
    });

    // Optimize loading overlay
    const loadingOverlay = document.querySelector('.loading-overlay');
    if (loadingOverlay) {
        window.addEventListener('load', () => {
            loadingOverlay.style.opacity = '0';
            setTimeout(() => {
                loadingOverlay.style.display = 'none';
            }, 500);
        });
    }

    // Optimize 3D scene loading
    const splineContainer = document.querySelector('.spline-container');
    if (splineContainer) {
        const splineLoader = document.querySelector('.spline-loader');
        const splineViewer = document.querySelector('spline-viewer');

        if (splineViewer) {
            splineViewer.addEventListener('load', () => {
                if (splineLoader) {
                    splineLoader.style.opacity = '0';
                    setTimeout(() => {
                        splineLoader.style.display = 'none';
                    }, 500);
                }
            });
        }
    }
});

// Add loading animation styles
const style = document.createElement('style');
style.textContent = `
    .loading-overlay {
        transition: opacity 0.5s ease;
    }
    .spline-loader {
        transition: opacity 0.5s ease;
    }
    .fade-in {
        opacity: 0;
        transform: translateY(20px);
        transition: opacity 0.5s ease, transform 0.5s ease;
    }
`;
document.head.appendChild(style);