/* ============================================================
   ANNIVERSARY WEBSITE — JavaScript
   Ilham Bachtiar & Kunti Nafi'ah — 2 Tahun Bersama
   ============================================================ */

document.addEventListener('DOMContentLoaded', () => {

    // ======================== SPLASH SCREEN & AUTOPLAY ========================
    const splashScreen = document.getElementById('splashScreen');
    const splashBtn = document.getElementById('splashBtn');
    const splashHeartsContainer = document.getElementById('splashHearts');
    const heartEmojisForSplash = ['❤️', '💕', '💖', '💗', '💘', '💝', '🩷'];

    // Lock scroll while splash is showing
    document.body.style.overflow = 'hidden';

    // Floating hearts on splash
    function createSplashHeart() {
        const heart = document.createElement('span');
        heart.className = 'splash-floating-heart';
        heart.textContent = heartEmojisForSplash[Math.floor(Math.random() * heartEmojisForSplash.length)];
        heart.style.left = Math.random() * 100 + '%';
        heart.style.fontSize = (1 + Math.random() * 1.5) + 'rem';
        heart.style.animationDuration = (4 + Math.random() * 3) + 's';
        heart.style.animationDelay = Math.random() * 2 + 's';
        splashHeartsContainer.appendChild(heart);
        setTimeout(() => heart.remove(), 8000);
    }
    const splashHeartInterval = setInterval(createSplashHeart, 600);
    for (let i = 0; i < 10; i++) setTimeout(createSplashHeart, i * 200);

    // Close splash and start music on button click
    splashBtn.addEventListener('click', () => {
        // Play music (user gesture satisfies browser autoplay policy)
        const bgMusic = document.getElementById('bgMusic');
        if (bgMusic) {
            bgMusic.play().then(() => {
                const musicToggle = document.getElementById('musicToggle');
                const musicIcon = musicToggle ? musicToggle.querySelector('.music-icon') : null;
                const musicPlayer = document.getElementById('musicPlayer');
                if (musicToggle) musicToggle.classList.add('playing');
                if (musicIcon) musicIcon.textContent = '⏸️';
                if (musicPlayer) musicPlayer.classList.add('expanded');
                // Update isPlaying flag via a custom event
                bgMusic.dataset.playing = 'true';
            }).catch(() => {});
        }

        // Hide splash with fade
        splashScreen.classList.add('hidden');
        clearInterval(splashHeartInterval);

        // Re-enable scroll after transition
        setTimeout(() => {
            document.body.style.overflow = '';
            splashScreen.style.display = 'none';
        }, 850);
    });


    // ======================== TYPEWRITER EFFECT ========================
    const typewriterEl = document.getElementById('typewriter');
    const fullText = 'Ilham Bachtiar & Kunti Nafi\'ah';
    let charIndex = 0;

    function typeWriter() {
        if (charIndex < fullText.length) {
            typewriterEl.textContent += fullText.charAt(charIndex);
            charIndex++;
            setTimeout(typeWriter, 80);
        } else {
            // Hide cursor after typing finishes
            const cursor = document.querySelector('.cursor');
            if (cursor) {
                setTimeout(() => {
                    cursor.style.animation = 'none';
                    cursor.style.opacity = '0';
                    cursor.style.transition = 'opacity 0.5s ease';
                }, 1500);
            }
        }
    }

    // Start typewriter after a brief delay
    setTimeout(typeWriter, 1200);


    // ======================== COUNTDOWN TIMER ========================
    const anniversaryDate = new Date('2026-10-14T00:00:00+07:00').getTime();

    // Confetti variables declared early so launchConfetti() can be called from updateCountdown()
    const confettiCanvas = document.getElementById('confettiCanvas');
    var confettiCtx = null;
    var confettiParticles = [];
    var confettiAnimId = null;
    var confettiLaunched = false;

    function updateCountdown() {
        const now = new Date().getTime();
        const distance = anniversaryDate - now;

        if (distance <= 0) {
            // Anniversary day!
            document.getElementById('days').textContent = '🎉';
            document.getElementById('hours').textContent = '🎉';
            document.getElementById('minutes').textContent = '🎉';
            document.getElementById('seconds').textContent = '🎉';

            document.querySelectorAll('.countdown-label').forEach(label => {
                label.textContent = 'YAY!';
            });

            // Trigger celebration
            launchConfetti();
            return;
        }

        const days = Math.floor(distance / (1000 * 60 * 60 * 24));
        const hours = Math.floor((distance % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60));
        const minutes = Math.floor((distance % (1000 * 60 * 60)) / (1000 * 60));
        const seconds = Math.floor((distance % (1000 * 60)) / 1000);

        document.getElementById('days').textContent = String(days).padStart(2, '0');
        document.getElementById('hours').textContent = String(hours).padStart(2, '0');
        document.getElementById('minutes').textContent = String(minutes).padStart(2, '0');
        document.getElementById('seconds').textContent = String(seconds).padStart(2, '0');
    }

    updateCountdown();
    setInterval(updateCountdown, 1000);


    // ======================== FLOATING HEARTS ========================
    const heartsContainer = document.getElementById('floatingHearts');
    const heartEmojis = ['❤️', '💕', '💖', '💗', '💘', '💝', '🤍', '🩷'];

    function createFloatingHeart() {
        const heart = document.createElement('span');
        heart.className = 'floating-heart';
        heart.textContent = heartEmojis[Math.floor(Math.random() * heartEmojis.length)];

        // Random position and timing
        heart.style.left = Math.random() * 100 + '%';
        heart.style.fontSize = (0.8 + Math.random() * 1.2) + 'rem';
        heart.style.animationDuration = (4 + Math.random() * 4) + 's';
        heart.style.animationDelay = Math.random() * 2 + 's';

        heartsContainer.appendChild(heart);

        // Clean up after animation
        setTimeout(() => {
            heart.remove();
        }, 10000);
    }

    // Generate hearts periodically
    setInterval(createFloatingHeart, 800);
    // Initial burst
    for (let i = 0; i < 8; i++) {
        setTimeout(createFloatingHeart, i * 300);
    }


    // ======================== NAVBAR SCROLL EFFECT ========================
    const navbar = document.getElementById('navbar');

    function handleNavScroll() {
        if (window.scrollY > 80) {
            navbar.classList.add('scrolled');
        } else {
            navbar.classList.remove('scrolled');
        }
    }

    window.addEventListener('scroll', handleNavScroll);


    // ======================== HAMBURGER MENU ========================
    const hamburger = document.getElementById('hamburger');
    const navLinks = document.getElementById('navLinks');

    hamburger.addEventListener('click', () => {
        hamburger.classList.toggle('active');
        navLinks.classList.toggle('active');
    });

    // Close menu on link click
    navLinks.querySelectorAll('a').forEach(link => {
        link.addEventListener('click', () => {
            hamburger.classList.remove('active');
            navLinks.classList.remove('active');
        });
    });

    // Close menu on outside click
    document.addEventListener('click', (e) => {
        if (!hamburger.contains(e.target) && !navLinks.contains(e.target)) {
            hamburger.classList.remove('active');
            navLinks.classList.remove('active');
        }
    });


    // ======================== SCROLL ANIMATIONS (AOS) ========================
    const observerOptions = {
        threshold: 0.15,
        rootMargin: '0px 0px -50px 0px'
    };

    const observer = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.classList.add('aos-visible');
            }
        });
    }, observerOptions);

    document.querySelectorAll('[data-aos]').forEach(el => {
        observer.observe(el);
    });


    // ======================== GALLERY FILTER ========================
    const filterBtns = document.querySelectorAll('.filter-btn');
    const galleryItems = document.querySelectorAll('.gallery-item');

    filterBtns.forEach(btn => {
        btn.addEventListener('click', () => {
            // Update active button
            filterBtns.forEach(b => b.classList.remove('active'));
            btn.classList.add('active');

            const filter = btn.getAttribute('data-filter');

            galleryItems.forEach(item => {
                if (filter === 'all' || item.getAttribute('data-category') === filter) {
                    item.classList.remove('hidden');
                    item.style.display = '';
                } else {
                    item.classList.add('hidden');
                    item.style.display = 'none';
                }
            });
        });
    });


    // ======================== LIGHTBOX ========================
    const lightbox = document.getElementById('lightbox');
    const lightboxImg = document.getElementById('lightboxImg');
    const lightboxCaption = document.getElementById('lightboxCaption');
    const lightboxClose = document.getElementById('lightboxClose');
    const lightboxPrev = document.getElementById('lightboxPrev');
    const lightboxNext = document.getElementById('lightboxNext');

    let currentLightboxIndex = 0;
    let lightboxImages = [];

    function getVisibleGalleryItems() {
        return Array.from(galleryItems).filter(item => {
            return !item.classList.contains('hidden') && item.querySelector('img').src && !item.querySelector('img').src.endsWith('/');
        });
    }

    function openLightbox(index) {
        lightboxImages = getVisibleGalleryItems();
        if (lightboxImages.length === 0) return;

        currentLightboxIndex = index;
        const item = lightboxImages[currentLightboxIndex];
        const img = item.querySelector('img');
        const caption = item.querySelector('.gallery-caption');

        lightboxImg.src = img.src;
        lightboxImg.alt = img.alt;
        lightboxCaption.textContent = caption ? caption.textContent : '';

        lightbox.classList.add('active');
        document.body.style.overflow = 'hidden';
    }

    function closeLightbox() {
        lightbox.classList.remove('active');
        document.body.style.overflow = '';
    }

    function navigateLightbox(direction) {
        currentLightboxIndex += direction;
        if (currentLightboxIndex < 0) currentLightboxIndex = lightboxImages.length - 1;
        if (currentLightboxIndex >= lightboxImages.length) currentLightboxIndex = 0;

        const item = lightboxImages[currentLightboxIndex];
        const img = item.querySelector('img');
        const caption = item.querySelector('.gallery-caption');

        // Fade transition
        lightboxImg.style.opacity = '0';
        setTimeout(() => {
            lightboxImg.src = img.src;
            lightboxImg.alt = img.alt;
            lightboxCaption.textContent = caption ? caption.textContent : '';
            lightboxImg.style.opacity = '1';
        }, 200);
    }

    // Gallery click handlers
    galleryItems.forEach((item, index) => {
        item.addEventListener('click', () => {
            // Find index among visible items
            const visibleItems = getVisibleGalleryItems();
            const visibleIndex = visibleItems.indexOf(item);
            if (visibleIndex !== -1) {
                openLightbox(visibleIndex);
            }
        });
    });

    lightboxClose.addEventListener('click', closeLightbox);
    lightboxPrev.addEventListener('click', () => navigateLightbox(-1));
    lightboxNext.addEventListener('click', () => navigateLightbox(1));

    // Keyboard navigation
    document.addEventListener('keydown', (e) => {
        if (!lightbox.classList.contains('active')) return;
        if (e.key === 'Escape') closeLightbox();
        if (e.key === 'ArrowLeft') navigateLightbox(-1);
        if (e.key === 'ArrowRight') navigateLightbox(1);
    });

    // Close on background click
    lightbox.addEventListener('click', (e) => {
        if (e.target === lightbox) closeLightbox();
    });

    // Touch swipe for lightbox
    let touchStartX = 0;
    let touchEndX = 0;

    lightbox.addEventListener('touchstart', (e) => {
        touchStartX = e.changedTouches[0].screenX;
    }, { passive: true });

    lightbox.addEventListener('touchend', (e) => {
        touchEndX = e.changedTouches[0].screenX;
        const diff = touchStartX - touchEndX;
        if (Math.abs(diff) > 50) {
            if (diff > 0) navigateLightbox(1);
            else navigateLightbox(-1);
        }
    }, { passive: true });


    // ======================== ENVELOPE / LOVE LETTER ========================
    const envelope = document.querySelector('.envelope');

    if (envelope) {
        const envelopeObserver = new IntersectionObserver((entries) => {
            entries.forEach(entry => {
                if (entry.isIntersecting) {
                    setTimeout(() => {
                        envelope.classList.add('open');
                    }, 400);
                    envelopeObserver.unobserve(entry.target);
                }
            });
        }, { threshold: 0.3 });

        envelopeObserver.observe(envelope);
    }


    // ======================== MUSIC PLAYER ========================
    const bgMusic = document.getElementById('bgMusic');
    const musicToggle = document.getElementById('musicToggle');
    const musicPlayer = document.getElementById('musicPlayer');
    const musicIcon = musicToggle.querySelector('.music-icon');
    const progressBar = document.getElementById('progressBar');
    const musicProgress = document.getElementById('musicProgress');
    let isPlaying = false;

    // Sync state if music was started from splash screen
    bgMusic.addEventListener('play', () => { isPlaying = true; });
    bgMusic.addEventListener('pause', () => { isPlaying = false; });

    musicToggle.addEventListener('click', () => {
        if (isPlaying) {
            bgMusic.pause();
            musicToggle.classList.remove('playing');
            musicIcon.textContent = '🎵';
            isPlaying = false;
        } else {
            bgMusic.play().then(() => {
                musicToggle.classList.add('playing');
                musicIcon.textContent = '⏸️';
                musicPlayer.classList.add('expanded');
                isPlaying = true;
            }).catch(err => {
                console.log('Audio playback requires user interaction first');
            });
        }
    });

    // Update progress bar
    bgMusic.addEventListener('timeupdate', () => {
        if (bgMusic.duration) {
            const progress = (bgMusic.currentTime / bgMusic.duration) * 100;
            progressBar.style.width = progress + '%';
        }
    });

    // Click on progress bar to seek
    if (musicProgress) {
        musicProgress.addEventListener('click', (e) => {
            const rect = musicProgress.getBoundingClientRect();
            const clickPos = (e.clientX - rect.left) / rect.width;
            bgMusic.currentTime = clickPos * bgMusic.duration;
        });
    }


    // ======================== CONFETTI ========================
    // (variables declared earlier near countdown section)

    function initConfetti() {
        if (!confettiCanvas) return;
        confettiCtx = confettiCanvas.getContext('2d');
        confettiCanvas.width = confettiCanvas.parentElement.offsetWidth;
        confettiCanvas.height = confettiCanvas.parentElement.offsetHeight;
    }

    function createConfettiParticle() {
        const colors = ['#B76E79', '#F4C2C2', '#722F37', '#FFD700', '#FF69B4', '#FFF8F0', '#E8A0A0'];
        return {
            x: Math.random() * confettiCanvas.width,
            y: -10,
            size: Math.random() * 8 + 4,
            color: colors[Math.floor(Math.random() * colors.length)],
            speedX: (Math.random() - 0.5) * 4,
            speedY: Math.random() * 3 + 2,
            rotation: Math.random() * 360,
            rotationSpeed: (Math.random() - 0.5) * 10,
            opacity: 1,
            shape: Math.random() > 0.5 ? 'rect' : 'circle'
        };
    }

    function animateConfetti() {
        if (!confettiCtx) return;
        confettiCtx.clearRect(0, 0, confettiCanvas.width, confettiCanvas.height);

        confettiParticles.forEach((p, i) => {
            p.x += p.speedX;
            p.y += p.speedY;
            p.rotation += p.rotationSpeed;
            p.speedY += 0.05; // gravity
            p.opacity -= 0.003;

            if (p.opacity <= 0 || p.y > confettiCanvas.height + 20) {
                confettiParticles.splice(i, 1);
                return;
            }

            confettiCtx.save();
            confettiCtx.translate(p.x, p.y);
            confettiCtx.rotate((p.rotation * Math.PI) / 180);
            confettiCtx.globalAlpha = p.opacity;
            confettiCtx.fillStyle = p.color;

            if (p.shape === 'rect') {
                confettiCtx.fillRect(-p.size / 2, -p.size / 2, p.size, p.size * 0.6);
            } else {
                confettiCtx.beginPath();
                confettiCtx.arc(0, 0, p.size / 2, 0, Math.PI * 2);
                confettiCtx.fill();
            }

            confettiCtx.restore();
        });

        if (confettiParticles.length > 0) {
            confettiAnimId = requestAnimationFrame(animateConfetti);
        }
    }

    function launchConfetti() {
        if (confettiLaunched) return;
        confettiLaunched = true;
        initConfetti();

        // Create particles in bursts
        for (let burst = 0; burst < 5; burst++) {
            setTimeout(() => {
                for (let i = 0; i < 40; i++) {
                    confettiParticles.push(createConfettiParticle());
                }
            }, burst * 400);
        }

        animateConfetti();

        // Reset after animation
        setTimeout(() => {
            confettiLaunched = false;
        }, 8000);
    }

    // Trigger confetti when footer is in view
    const footer = document.getElementById('footer');
    if (footer) {
        const footerObserver = new IntersectionObserver((entries) => {
            entries.forEach(entry => {
                if (entry.isIntersecting) {
                    launchConfetti();
                }
            });
        }, { threshold: 0.5 });

        footerObserver.observe(footer);
    }

    // Resize confetti canvas
    window.addEventListener('resize', () => {
        if (confettiCanvas && confettiCanvas.parentElement) {
            confettiCanvas.width = confettiCanvas.parentElement.offsetWidth;
            confettiCanvas.height = confettiCanvas.parentElement.offsetHeight;
        }
    });


    // ======================== SMOOTH SCROLL FOR NAV LINKS ========================
    document.querySelectorAll('a[href^="#"]').forEach(anchor => {
        anchor.addEventListener('click', function (e) {
            e.preventDefault();
            const target = document.querySelector(this.getAttribute('href'));
            if (target) {
                const offset = navbar.offsetHeight;
                const targetPos = target.getBoundingClientRect().top + window.scrollY - offset;
                window.scrollTo({
                    top: targetPos,
                    behavior: 'smooth'
                });
            }
        });
    });


    // ======================== IMAGE ERROR HANDLING ========================
    // Show placeholders when images fail to load
    document.querySelectorAll('img').forEach(img => {
        img.addEventListener('error', function () {
            this.style.display = 'none';
            const placeholder = this.parentElement.querySelector('.img-placeholder');
            if (placeholder) {
                placeholder.style.display = 'flex';
            }
        });

        // If image loaded successfully, hide placeholder
        img.addEventListener('load', function () {
            this.style.display = 'block';
            const placeholder = this.parentElement.querySelector('.img-placeholder');
            if (placeholder) {
                placeholder.style.display = 'none';
            }
        });
    });


    // ======================== ACTIVE NAV LINK HIGHLIGHT ========================
    const sections = document.querySelectorAll('section');

    function updateActiveNav() {
        let currentSection = '';
        sections.forEach(section => {
            const sectionTop = section.offsetTop - 100;
            if (window.scrollY >= sectionTop) {
                currentSection = section.getAttribute('id');
            }
        });

        navLinks.querySelectorAll('a').forEach(link => {
            link.classList.remove('active');
            if (link.getAttribute('href') === '#' + currentSection) {
                link.classList.add('active');
            }
        });
    }

    window.addEventListener('scroll', updateActiveNav);

});
