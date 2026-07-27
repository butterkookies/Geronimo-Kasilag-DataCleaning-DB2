// Modern Classroom Presentation Controller
document.addEventListener('DOMContentLoaded', () => {
    const slides = document.querySelectorAll('.slide');
    const prevBtn = document.getElementById('prev-btn');
    const nextBtn = document.getElementById('next-btn');
    const progressBar = document.getElementById('progress-bar');
    const slideIndicator = document.getElementById('slide-indicator');
    const fullscreenBtn = document.getElementById('fullscreen-btn');
    const overviewBtn = document.getElementById('overview-btn');
    const overviewModal = document.getElementById('overview-modal');
    const closeOverview = document.getElementById('close-overview');
    const overviewGrid = document.getElementById('overview-grid');

    let currentSlide = 0;
    const totalSlides = slides.length;

    // Initialize Overview Grid items
    slides.forEach((slide, index) => {
        const title = slide.querySelector('h2, h1')?.innerText || `Slide ${index + 1}`;
        const item = document.createElement('div');
        item.className = 'overview-item';
        item.innerHTML = `<span class="num">${index + 1}</span><span class="title">${title}</span>`;
        item.addEventListener('click', () => {
            goToSlide(index);
            closeOverviewModal();
        });
        overviewGrid.appendChild(item);
    });

    function updateSlide() {
        slides.forEach((slide, index) => {
            slide.classList.remove('active', 'prev', 'next');
            if (index === currentSlide) {
                slide.classList.add('active');
            } else if (index < currentSlide) {
                slide.classList.add('prev');
            } else {
                slide.classList.add('next');
            }
        });

        // Update progress bar & controls
        const progress = ((currentSlide + 1) / totalSlides) * 100;
        if (progressBar) progressBar.style.width = `${progress}%`;
        if (slideIndicator) slideIndicator.innerText = `${currentSlide + 1} / ${totalSlides}`;

        if (prevBtn) prevBtn.disabled = currentSlide === 0;
        if (nextBtn) nextBtn.disabled = currentSlide === totalSlides - 1;

        // Highlight overview items
        document.querySelectorAll('.overview-item').forEach((item, index) => {
            item.classList.toggle('active', index === currentSlide);
        });
    }

    function goToSlide(index) {
        if (index >= 0 && index < totalSlides) {
            currentSlide = index;
            updateSlide();
        }
    }

    function nextSlide() {
        if (currentSlide < totalSlides - 1) {
            currentSlide++;
            updateSlide();
        }
    }

    function prevSlide() {
        if (currentSlide > 0) {
            currentSlide--;
            updateSlide();
        }
    }

    function toggleFullscreen() {
        if (!document.fullscreenElement) {
            document.documentElement.requestFullscreen().catch(err => {
                console.warn('Fullscreen request failed:', err);
            });
        } else {
            if (document.exitFullscreen) {
                document.exitFullscreen();
            }
        }
    }

    function openOverviewModal() {
        if (overviewModal) overviewModal.classList.add('active');
    }

    function closeOverviewModal() {
        if (overviewModal) overviewModal.classList.remove('active');
    }

    // Event Listeners
    if (nextBtn) nextBtn.addEventListener('click', nextSlide);
    if (prevBtn) prevBtn.addEventListener('click', prevSlide);
    if (fullscreenBtn) fullscreenBtn.addEventListener('click', toggleFullscreen);
    if (overviewBtn) overviewBtn.addEventListener('click', openOverviewModal);
    if (closeOverview) closeOverview.addEventListener('click', closeOverviewModal);

    // Keyboard Shortcuts
    document.addEventListener('keydown', (e) => {
        if (overviewModal && overviewModal.classList.contains('active')) {
            if (e.key === 'Escape') closeOverviewModal();
            return;
        }

        switch (e.key) {
            case 'ArrowRight':
            case 'Space':
            case 'PageDown':
                e.preventDefault();
                nextSlide();
                break;
            case 'ArrowLeft':
            case 'PageUp':
                e.preventDefault();
                prevSlide();
                break;
            case 'Home':
                e.preventDefault();
                goToSlide(0);
                break;
            case 'End':
                e.preventDefault();
                goToSlide(totalSlides - 1);
                break;
            case 'f':
            case 'F':
                e.preventDefault();
                toggleFullscreen();
                break;
            case 'o':
            case 'O':
                e.preventDefault();
                if (overviewModal?.classList.contains('active')) {
                    closeOverviewModal();
                } else {
                    openOverviewModal();
                }
                break;
        }
    });

    // Touch Swipe Support
    let touchStartX = 0;
    let touchEndX = 0;

    document.addEventListener('touchstart', (e) => {
        touchStartX = e.changedTouches[0].screenX;
    }, { passive: true });

    document.addEventListener('touchend', (e) => {
        touchEndX = e.changedTouches[0].screenX;
        if (touchStartX - touchEndX > 50) {
            nextSlide();
        } else if (touchEndX - touchStartX > 50) {
            prevSlide();
        }
    }, { passive: true });

    // Initial render
    updateSlide();
});
