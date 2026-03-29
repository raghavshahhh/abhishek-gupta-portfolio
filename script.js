        // GSAP ScrollTrigger Registration
        gsap.registerPlugin(ScrollTrigger);

        // Accessibility Check - Detect reduced motion preference
        const prefersReducedMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
        const isTouchDevice = ('ontouchstart' in window) || (navigator.maxTouchPoints > 0);

        // Initialize Lenis
        const lenis = new Lenis({
            duration: 1.2,
            easing: (t) => Math.min(1, 1.001 - Math.pow(2, -10 * t)),
            direction: 'vertical',
            gestureDirection: 'vertical',
            smooth: true,
            mouseMultiplier: 1,
            smoothTouch: false,
            touchMultiplier: 2,
            infinite: false,
        });

        // Sync Lenis with GSAP ScrollTrigger
        lenis.on('scroll', ScrollTrigger.update);

        gsap.ticker.add((time) => {
            lenis.raf(time * 1000);
        });

        gsap.ticker.lagSmoothing(0);

        // Page Loader
        window.addEventListener('load', () => {
            setTimeout(() => {
                document.getElementById('loader').classList.add('hidden');
                initAnimations();
            }, 800);
        });

        // Custom Cursor (disabled for reduced motion and touch devices)
        const cursor = document.getElementById('cursor');
        const cursorDot = document.getElementById('cursorDot');
        
        if (prefersReducedMotion || isTouchDevice) {
            if (cursor) cursor.style.display = 'none';
            if (cursorDot) cursorDot.style.display = 'none';
        } else {
            let mouseX = 0, mouseY = 0;
            let cursorX = 0, cursorY = 0;

            document.addEventListener('mousemove', (e) => {
                mouseX = e.clientX;
                mouseY = e.clientY;
            });

            function animateCursor() {
                const dx = mouseX - cursorX;
                const dy = mouseY - cursorY;
                cursorX += dx * 0.15;
                cursorY += dy * 0.15;

                cursor.style.left = cursorX - 6 + 'px';
                cursor.style.top = cursorY - 6 + 'px';
                cursorDot.style.left = mouseX - 2 + 'px';
                cursorDot.style.top = mouseY - 2 + 'px';

                requestAnimationFrame(animateCursor);
            }
            animateCursor();

            // Cursor hover effect
            const hoverElements = document.querySelectorAll('a, button, .glass-card');
            hoverElements.forEach(el => {
                el.addEventListener('mouseenter', () => {
                    cursor.style.transform = 'scale(2)';
                });
                el.addEventListener('mouseleave', () => {
                    cursor.style.transform = 'scale(1)';
                });
            });
        }

        // Mobile Menu
        const menuBtn = document.getElementById('menuBtn');
        const closeMenu = document.getElementById('closeMenu');
        const mobileMenu = document.getElementById('mobileMenu');
        const mobileLinks = document.querySelectorAll('.mobile-link');

        menuBtn.addEventListener('click', () => {
            mobileMenu.classList.add('active');
        });

        closeMenu.addEventListener('click', () => {
            mobileMenu.classList.remove('active');
        });

        mobileLinks.forEach(link => {
            link.addEventListener('click', () => {
                mobileMenu.classList.remove('active');
            });
        });

        // Particles Animation
        const canvas = document.getElementById('particles-canvas');
        const ctx = canvas.getContext('2d');
        let particles = [];

        function resizeCanvas() {
            canvas.width = window.innerWidth;
            canvas.height = window.innerHeight;
        }
        resizeCanvas();
        window.addEventListener('resize', resizeCanvas);

        class Particle {
            constructor() {
                this.reset();
            }

            reset() {
                this.x = Math.random() * canvas.width;
                this.y = Math.random() * canvas.height;
                this.size = Math.random() * 2 + 0.5;
                this.speedX = (Math.random() - 0.5) * 0.3;
                this.speedY = (Math.random() - 0.5) * 0.3;
                this.opacity = Math.random() * 0.5 + 0.2;
            }

            update() {
                this.x += this.speedX;
                this.y += this.speedY;

                if (this.x < 0 || this.x > canvas.width) this.speedX *= -1;
                if (this.y < 0 || this.y > canvas.height) this.speedY *= -1;
            }

            draw() {
                ctx.beginPath();
                ctx.arc(this.x, this.y, this.size, 0, Math.PI * 2);
                ctx.fillStyle = `rgba(124, 58, 237, ${this.opacity})`;
                ctx.fill();
            }
        }

            const isMobile = window.innerWidth < 768;
            const particleCount = isMobile ? 30 : 80;
            
            for (let i = 0; i < particleCount; i++) {
                particles.push(new Particle());
            }

        function animateParticles() {
            ctx.clearRect(0, 0, canvas.width, canvas.height);
            particles.forEach(p => {
                p.update();
                p.draw();
            });

            // Draw connections
            particles.forEach((p1, i) => {
                particles.slice(i + 1).forEach(p2 => {
                    const dist = Math.hypot(p1.x - p2.x, p1.y - p2.y);
                    if (dist < 100) {
                        ctx.beginPath();
                        ctx.moveTo(p1.x, p1.y);
                        ctx.lineTo(p2.x, p2.y);
                        ctx.strokeStyle = `rgba(124, 58, 237, ${0.1 * (1 - dist / 100)})`;
                        ctx.stroke();
                    }
                });
            });

            requestAnimationFrame(animateParticles);
        }
        animateParticles();

        // Stats Counter Animation
        const statNumbers = document.querySelectorAll('.stat-number');
        const statsSection = document.querySelector('.stat-card');
        let counted = false;

        function countUp(element, target) {
            let current = 0;
            const increment = target / 60;
            const timer = setInterval(() => {
                current += increment;
                if (current >= target) {
                    // Format large numbers
                    if (target >= 1000000) {
                        element.textContent = (target / 1000000).toFixed(0) + 'M+';
                    } else if (target >= 1000) {
                        element.textContent = (target / 1000).toFixed(0) + 'K+';
                    } else {
                        element.textContent = target + '+';
                    }
                    clearInterval(timer);
                } else {
                    // Format during animation
                    if (target >= 1000000) {
                        element.textContent = (Math.floor(current) / 1000000).toFixed(1) + 'M';
                    } else if (target >= 1000) {
                        element.textContent = (Math.floor(current) / 1000).toFixed(0) + 'K';
                    } else {
                        element.textContent = Math.floor(current);
                    }
                }
            }, 25);
        }

        const statsObserver = new IntersectionObserver((entries) => {
            entries.forEach(entry => {
                if (entry.isIntersecting && !counted) {
                    counted = true;
                    statNumbers.forEach(stat => {
                        const target = parseInt(stat.dataset.target);
                        countUp(stat, target);
                    });
                }
            });
        }, { threshold: 0.5 });

        document.querySelectorAll('.stat-card').forEach(card => {
            statsObserver.observe(card);
        });

        // Initialize GSAP Animations
        function initAnimations() {
            // Hero Elements Stagger (Restored but faster)
            gsap.from('.hero-element', {
                y: 20,
                opacity: 0,
                scale: 0.98,
                duration: 0.6,
                stagger: 0.1,
                ease: 'power3.out'
            });

            // Phone Mockup 3D Parallax Animation
            gsap.fromTo('.parallax-phone', 
                { rotateX: 15, rotateY: -15, scale: 0.95 },
                {
                    rotateX: -5, rotateY: 5, scale: 1,
                    scrollTrigger: {
                        trigger: '.parallax-phone',
                        start: 'top 80%',
                        end: 'bottom 20%',
                        scrub: 1.5,
                        toggleActions: 'play none none reverse'
                    },
                    ease: 'none'
                }
            );

            // Floating Icons Entrance
            gsap.from('.floating-icon', {
                rotateY: 90,
                scale: 0,
                opacity: 0,
                duration: 1.2,
                delay: 0.5,
                stagger: 0.15,
                ease: 'back.out(1.5)'
            });

            // Section Headings (Restored Scroll Reveal)
            const sections = document.querySelectorAll('section');
            sections.forEach(section => {
                const heading = section.querySelector('h2');
                if (heading) {
                    gsap.from(heading, {
                        scrollTrigger: {
                            trigger: heading,
                            start: 'top 95%',
                            toggleActions: 'play none none none'
                        },
                        y: 20,
                        opacity: 0,
                        duration: 0.5,
                        ease: 'power3.out'
                    });
                }
            });

            // Glass Cards (Restored Scroll Reveal)
            const cards = document.querySelectorAll('.glass-card');
            cards.forEach((card, i) => {
                gsap.from(card, {
                    scrollTrigger: {
                        trigger: card,
                        start: 'top 95%',
                        toggleActions: 'play none none none'
                    },
                    y: 30,
                    opacity: 0,
                    scale: 0.98,
                    duration: 0.5,
                    delay: (i % 3) * 0.05,
                    ease: 'power3.out'
                });
            });

            // Timeline Path Animation (Keep for scroll effect)
            const timelinePath = document.getElementById('timelinePath');
            if (timelinePath) {
                const pathLength = timelinePath.getTotalLength();
                timelinePath.style.strokeDasharray = pathLength;
                timelinePath.style.strokeDashoffset = pathLength;

                gsap.to(timelinePath, {
                    scrollTrigger: {
                        trigger: '#experience',
                        start: 'top 60%',
                        end: 'bottom 80%',
                        scrub: 1
                    },
                    strokeDashoffset: 0,
                    ease: 'none'
                });
            }

            // Timeline Items & Skills (Restored Scroll Reveal)
            const timelineItems = document.querySelectorAll('.timeline-item');
            timelineItems.forEach((item, i) => {
                const isLeft = i % 2 === 0;
                gsap.from(item, {
                    scrollTrigger: {
                        trigger: item,
                        start: 'top 95%',
                        toggleActions: 'play none none none'
                    },
                    x: isLeft ? -30 : 30,
                    opacity: 0,
                    duration: 0.6,
                    ease: 'power3.out'
                });
            });

            const skillTags = document.querySelectorAll('.skill-tag, .tech-logo');
            gsap.from(skillTags, {
                scrollTrigger: {
                    trigger: '#skills',
                    start: 'top 90%',
                    toggleActions: 'play none none none'
                },
                y: 15,
                opacity: 0,
                duration: 0.3,
                stagger: 0.03,
                ease: 'power3.out'
            });

            // Skeleton Hide Logic
            window.addEventListener('load', () => {
                const skeleton = document.getElementById('skeleton-overlay');
                setTimeout(() => {
                    skeleton.classList.add('skeleton-hide');
                }, 800); // Small 800ms shimmer for "premium" load feel
            });
        }

        // Navbar scroll behavior
        let lastScroll = 0;
        const navbar = document.getElementById('navbar');

        window.addEventListener('scroll', { passive: true }, () => {
            const currentScroll = window.pageYOffset;

            if (currentScroll > 100) {
                navbar.querySelector('nav').classList.add('glass');
            } else {
                navbar.querySelector('nav').classList.remove('glass');
            }

            lastScroll = currentScroll;
        });

        // Copy email function
        function copyEmail() {
            navigator.clipboard.writeText('abhishek.gupta.890113@gmail.com');
            alert('Email copied to clipboard!');
        }

        // Smooth scroll for anchor links
        document.querySelectorAll('a[href^="#"]').forEach(anchor => {
            anchor.addEventListener('click', function(e) {
                e.preventDefault();
                const target = document.querySelector(this.getAttribute('href'));
                if (target) {
                    target.scrollIntoView({
                        behavior: 'smooth',
                        block: 'start'
                    });
                }
            });
        });
