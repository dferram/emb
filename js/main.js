/* ============================================
   EMB San Juan del Río — Main JavaScript
   ============================================ */

document.addEventListener('DOMContentLoaded', () => {

    // ─── Mobile Menu ───
    const mobileBtn = document.getElementById('mobile-menu-btn');
    const mobileMenu = document.getElementById('mobile-menu');

    if (mobileBtn && mobileMenu) {
        mobileBtn.addEventListener('click', () => {
            mobileMenu.classList.toggle('is-open');
            const icon = mobileBtn.querySelector('i');
            if (mobileMenu.classList.contains('is-open')) {
                icon.classList.replace('fa-bars', 'fa-xmark');
            } else {
                icon.classList.replace('fa-xmark', 'fa-bars');
            }
        });

        // Close on link click
        mobileMenu.querySelectorAll('a').forEach(link => {
            link.addEventListener('click', () => {
                mobileMenu.classList.remove('is-open');
                const icon = mobileBtn.querySelector('i');
                icon.classList.replace('fa-xmark', 'fa-bars');
            });
        });
    }

    // ─── Carousel Engine ───
    class Carousel {
        constructor(el) {
            this.el = el;
            this.track = el.querySelector('.carousel__track');
            this.slides = [...el.querySelectorAll('.carousel__slide')];
            this.prevBtn = el.querySelector('.carousel__btn--prev');
            this.nextBtn = el.querySelector('.carousel__btn--next');
            this.dotsContainer = el.querySelector('.carousel__dots');
            this.currentIndex = 0;
            this.autoplayInterval = null;

            this.updateSlidesPerView();
            this.createDots();
            this.bindEvents();
            this.startAutoplay();
        }

        updateSlidesPerView() {
            const width = window.innerWidth;
            if (width >= 1024) this.slidesPerView = 3;
            else if (width >= 640) this.slidesPerView = 2;
            else this.slidesPerView = 1;

            this.maxIndex = Math.max(0, this.slides.length - this.slidesPerView);
            if (this.currentIndex > this.maxIndex) {
                this.currentIndex = this.maxIndex;
            }
        }

        createDots() {
            if (!this.dotsContainer) return;
            this.dotsContainer.innerHTML = '';
            const totalDots = this.maxIndex + 1;
            for (let i = 0; i < totalDots; i++) {
                const dot = document.createElement('button');
                dot.classList.add('carousel__dot');
                if (i === 0) dot.classList.add('is-active');
                dot.setAttribute('aria-label', `Ir a slide ${i + 1}`);
                dot.addEventListener('click', () => this.goTo(i));
                this.dotsContainer.appendChild(dot);
            }
        }

        updateDots() {
            if (!this.dotsContainer) return;
            const dots = this.dotsContainer.querySelectorAll('.carousel__dot');
            dots.forEach((dot, i) => {
                dot.classList.toggle('is-active', i === this.currentIndex);
            });
        }

        goTo(index) {
            this.currentIndex = Math.max(0, Math.min(index, this.maxIndex));
            const slideWidth = 100 / this.slidesPerView;
            const offset = this.currentIndex * slideWidth;
            this.track.style.transform = `translateX(-${offset}%)`;
            this.updateDots();
        }

        prev() {
            this.goTo(this.currentIndex - 1);
        }

        next() {
            if (this.currentIndex >= this.maxIndex) {
                this.goTo(0);
            } else {
                this.goTo(this.currentIndex + 1);
            }
        }

        startAutoplay() {
            this.autoplayInterval = setInterval(() => this.next(), 4500);
        }

        stopAutoplay() {
            clearInterval(this.autoplayInterval);
        }

        resetAutoplay() {
            this.stopAutoplay();
            this.startAutoplay();
        }

        bindEvents() {
            if (this.prevBtn) {
                this.prevBtn.addEventListener('click', () => {
                    this.prev();
                    this.resetAutoplay();
                });
            }
            if (this.nextBtn) {
                this.nextBtn.addEventListener('click', () => {
                    this.next();
                    this.resetAutoplay();
                });
            }

            // Swipe support
            let startX = 0;
            let isDragging = false;

            this.track.addEventListener('touchstart', (e) => {
                startX = e.touches[0].clientX;
                isDragging = true;
                this.stopAutoplay();
            }, { passive: true });

            this.track.addEventListener('touchend', (e) => {
                if (!isDragging) return;
                const endX = e.changedTouches[0].clientX;
                const diff = startX - endX;
                if (Math.abs(diff) > 50) {
                    diff > 0 ? this.next() : this.prev();
                }
                isDragging = false;
                this.startAutoplay();
            }, { passive: true });

            // Recalculate on resize
            let resizeTimer;
            window.addEventListener('resize', () => {
                clearTimeout(resizeTimer);
                resizeTimer = setTimeout(() => {
                    this.updateSlidesPerView();
                    this.createDots();
                    this.goTo(this.currentIndex);
                }, 250);
            });

            // Pause autoplay on hover
            this.el.addEventListener('mouseenter', () => this.stopAutoplay());
            this.el.addEventListener('mouseleave', () => this.startAutoplay());
        }
    }

    // Initialize all carousels
    document.querySelectorAll('[data-carousel]').forEach(el => {
        new Carousel(el);
    });

    // ─── Lightbox ───
    const lightbox = document.getElementById('lightbox');
    const lightboxImg = lightbox?.querySelector('img');
    const lightboxClose = lightbox?.querySelector('.lightbox__close');

    document.querySelectorAll('[data-lightbox]').forEach(trigger => {
        trigger.addEventListener('click', () => {
            const src = trigger.querySelector('img')?.src || trigger.src;
            if (lightboxImg && src) {
                lightboxImg.src = src;
                lightbox.classList.add('is-open');
                document.body.style.overflow = 'hidden';
            }
        });
    });

    function closeLightbox() {
        lightbox?.classList.remove('is-open');
        document.body.style.overflow = '';
    }

    lightboxClose?.addEventListener('click', (e) => {
        e.stopPropagation();
        closeLightbox();
    });

    lightbox?.addEventListener('click', closeLightbox);

    document.addEventListener('keydown', (e) => {
        if (e.key === 'Escape') closeLightbox();
    });

    // ─── Scroll Reveal Animation ───
    const revealElements = document.querySelectorAll('.reveal');

    if (revealElements.length > 0) {
        const revealObserver = new IntersectionObserver((entries) => {
            entries.forEach(entry => {
                if (entry.isIntersecting) {
                    entry.target.classList.add('is-visible');
                    revealObserver.unobserve(entry.target);
                }
            });
        }, {
            threshold: 0.15,
            rootMargin: '0px 0px -50px 0px'
        });

        revealElements.forEach(el => revealObserver.observe(el));
    }

    // ─── Footer Year ───
    const yearEl = document.getElementById('year');
    if (yearEl) yearEl.textContent = new Date().getFullYear();

    // ─── Navbar active highlight on scroll ───
    const sections = document.querySelectorAll('section[id]');
    const navLinks = document.querySelectorAll('.navbar__link');

    window.addEventListener('scroll', () => {
        const scrollY = window.scrollY + 100;
        sections.forEach(section => {
            const top = section.offsetTop;
            const height = section.offsetHeight;
            const id = section.id;
            if (scrollY >= top && scrollY < top + height) {
                navLinks.forEach(link => {
                    link.style.color = '';
                    if (link.getAttribute('href') === `#${id}`) {
                        link.style.color = '#FF6500';
                    }
                });
            }
        });
    });

});
