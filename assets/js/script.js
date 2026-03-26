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
                    borderColor: 'rgba(212, 175, 55, 0.5)',
                    backgroundColor: 'rgba(212, 175, 55, 0.1)',
                    duration: 0.3
                });
            });
            el.addEventListener('mouseleave', () => {
                gsap.to(cursor, {
                    scale: 1,
                    borderColor: '#d4af37',
                    backgroundColor: 'transparent',
                    duration: 0.3
                });
            });
        });
    }

    // --- Hero Animations ---
    const heroTimeline = gsap.timeline();
    heroTimeline.to('.gsap-reveal-text', {
        opacity: 1,
        y: 0,
        duration: 1,
        stagger: 0.3,
        ease: 'power3.out'
    });

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

        if (title) {
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
    const productCards = document.querySelectorAll('.product-card');
    productCards.forEach((card, index) => {
        gsap.from(card, {
            scrollTrigger: {
                trigger: card,
                start: 'top 90%',
                toggleActions: 'play none none none'
            },
            y: 50,
            opacity: 0,
            duration: 0.8,
            delay: index % 3 * 0.2, // Stagger effect
            ease: 'power2.out'
        });
    });

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
    const navbarHeight = header.offsetHeight;

    window.addEventListener('scroll', function() {
        let st = window.pageYOffset;
        
        if (Math.abs(lastScrollTop - st) <= delta) return;

        if (st > lastScrollTop && st > navbarHeight) {
            // Scroll Down - Hide Navbar
            header.classList.remove('nav-down');
            header.classList.add('nav-up');
        } else {
            // Scroll Up - Show Navbar with background
            if (st + window.innerHeight < document.body.scrollHeight) {
                header.classList.remove('nav-up');
                if (st > 50) {
                    header.classList.add('nav-down');
                } else {
                    header.classList.remove('nav-down');
                }
            }
        }
        
        // At the very top - Keep it transparent
        if (st <= 50) {
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
