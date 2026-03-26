// Initialize GSAP ScrollTrigger
gsap.registerPlugin(ScrollTrigger);

document.addEventListener("DOMContentLoaded", function() {

    // --- Custom Cursor ---
    const cursor = document.getElementById('magic-cursor');
    const ball = document.getElementById('ball');

    if (window.innerWidth >= 992) {
        document.addEventListener('mousemove', function(e) {
            gsap.to(cursor, {
                duration: 0.3,
                x: e.clientX - 15,
                y: e.clientY - 15,
                ease: 'power2.out'
            });
        });

        // Hover effects for links and buttons
        const interactiveElements = document.querySelectorAll('a, button, .category-card, .product-card');
        interactiveElements.forEach(el => {
            el.addEventListener('mouseenter', () => {
                gsap.to(cursor, {
                    scale: 1.5,
                    borderColor: 'rgba(229, 193, 88, 0.5)',
                    backgroundColor: 'rgba(229, 193, 88, 0.1)',
                    duration: 0.3
                });
            });
            el.addEventListener('mouseleave', () => {
                gsap.to(cursor, {
                    scale: 1,
                    borderColor: '#e5c158',
                    backgroundColor: 'transparent',
                    duration: 0.3
                });
            });
        });
    }

    // --- Hero Animations ---
    const tl = gsap.timeline({ defaults: { ease: "power3.out" } });
    
    // Use from() instead of set+to so elements are visible by default
    tl.from(".hero-title span", { 
          y: 30,
          opacity: 0, 
          duration: 1.2, 
          stagger: 0.1,
          ease: "power4.out"
      }, "+=0.3")
      .from(".hero-tagline", { y: 30, opacity: 0, duration: 1 }, "-=0.8")
      .from(".hero-cta", { y: 30, opacity: 0, duration: 0.8 }, "-=0.6")
      .from(".hero-navigation", { opacity: 0, y: 30, duration: 0.8 }, "-=0.4")
      .from(".header", { y: -80, opacity: 0, duration: 1 }, "-=1.2");

    // Hero Parallax
    if (window.innerWidth > 768) {
        gsap.to(".hero-bg", {
            yPercent: 20,
            ease: "none",
            scrollTrigger: {
                trigger: ".hero-section",
                start: "top top",
                end: "bottom top",
                scrub: true
            }
        });
    }

    // --- Section Animations ---
    const sections = document.querySelectorAll('section');
    sections.forEach(section => {
        const bgText = section.querySelector('.section-bg-text');
        const title = section.querySelector('.section-title');
        
        if (bgText) {
            gsap.from(bgText, {
                scrollTrigger: {
                    trigger: section,
                    start: 'top 80%',
                    end: 'bottom 20%',
                    scrub: 1
                },
                x: -100,
                opacity: 0,
                duration: 2
            });
        }

        if (title && !section.classList.contains('hero-section')) {
            gsap.from(title, {
                scrollTrigger: {
                    trigger: section,
                    start: 'top 85%',
                    toggleActions: 'play none none none'
                },
                y: 50,
                opacity: 0,
                duration: 1,
                ease: 'power2.out'
            });
        }
    });

    // --- Product Cards Animation ---
    gsap.utils.toArray(".product-card").forEach((card, i) => {
        gsap.from(card, {
            scrollTrigger: {
                trigger: card,
                start: "top 85%",
                toggleActions: "play none none none"
            },
            y: 60,
            opacity: 0,
            duration: 0.7,
            delay: (i % 3) * 0.12
        });

        // 3D Tilt Effect on Hover
        card.addEventListener("mousemove", (e) => {
            const rect = card.getBoundingClientRect();
            const x = e.clientX - rect.left;
            const y = e.clientY - rect.top;
            const centerX = rect.width / 2;
            const centerY = rect.height / 2;
            const rotateX = (y - centerY) / 10;
            const rotateY = (centerX - x) / 10;

            gsap.to(card, {
                rotateX: rotateX,
                rotateY: rotateY,
                scale: 1.05,
                duration: 0.5,
                ease: "power2.out",
                perspective: 1000
            });
        });

        card.addEventListener("mouseleave", () => {
            gsap.to(card, {
                rotateX: 0,
                rotateY: 0,
                scale: 1,
                duration: 0.5,
                ease: "power2.out"
            });
        });
    });

    // --- Infinite Marquee ---
    const tickerWrapper = document.querySelector('.ticker-wrapper');
    const tickerContent = document.querySelector('.ticker-content');
    
    if (tickerWrapper && tickerContent) {
        // Clone content for seamless loop
        const clone = tickerContent.cloneNode(true);
        tickerWrapper.appendChild(clone);

        gsap.to([tickerContent, clone], {
            xPercent: -100,
            repeat: -1,
            duration: 20,
            ease: "none"
        });
    }

    // --- Smooth Scrolling for anchor links ---
    document.querySelectorAll('a[href^="#"]').forEach(anchor => {
        anchor.addEventListener('click', function (e) {
            e.preventDefault();
            const target = document.querySelector(this.getAttribute('href'));
            if (target) {
                window.scrollTo({
                    top: target.offsetTop - 70, // Header height
                    behavior: 'smooth'
                });
            }
        });
    });

    // --- Navbar Hide/Show on Scroll ---
    let lastScrollTop = 0;
    const header = document.querySelector('.header');
    const delta = 5;

    window.addEventListener('scroll', function() {
        let st = window.pageYOffset;
        
        if (Math.abs(lastScrollTop - st) <= delta) return;

        if (st > lastScrollTop) {
            // Scroll Down - Hide EVERYTHING (Logo & Menu Button)
            header.classList.remove('nav-down');
            header.classList.add('nav-up');
        } else {
            // Scroll Up - Show EVERYTHING
            if (st + window.innerHeight < document.body.scrollHeight) {
                header.classList.remove('nav-up');
                header.classList.add('nav-down');
            }
        }
        
        // At the very top - hide it if just arrived, or show only when scrolling up
        if (st <= 0) {
            header.classList.remove('nav-up');
            header.classList.remove('nav-down');
        }

        lastScrollTop = st;
    });

    // --- Overlay Menu Toggle ---
    const menuToggle = document.querySelector('.menu-toggle');
    const overlayMenu = document.querySelector('.overlay-menu');
    const overlayLinks = document.querySelectorAll('.overlay-nav li a');

    if (menuToggle) {
        menuToggle.addEventListener('click', function() {
            this.classList.toggle('active');
            overlayMenu.classList.toggle('active');
            
            if (overlayMenu.classList.contains('active')) {
                gsap.fromTo(overlayLinks, 
                    { y: 100, opacity: 0 }, 
                    { y: 0, opacity: 1, duration: 0.6, stagger: 0.1, ease: "power3.out", delay: 0.2 }
                );
                document.body.style.overflow = 'hidden'; // Prevent scrolling
            } else {
                document.body.style.overflow = ''; // Allow scrolling
            }
        });
    }

    // --- Navbar Background on Scroll ---
    // (Already handled by hide/show logic adding nav-down class)

});
