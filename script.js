document.addEventListener('DOMContentLoaded', () => {
    // Initialize Intersection Observer for scroll animations
    const observerOptions = {
        root: null,
        rootMargin: '0px',
        threshold: 0.15
    };

    const observer = new IntersectionObserver((entries, observer) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.classList.add('show-element');
                // Optional: stop observing once animated
                // observer.unobserve(entry.target);
            }
        });
    }, observerOptions);

    // Collect all elements with the hidden-element class
    const hiddenElements = document.querySelectorAll('.hidden-element');
    hiddenElements.forEach(el => observer.observe(el));

    // Navbar scroll effect
    const navbar = document.querySelector('.navbar');
    window.addEventListener('scroll', () => {
        if (window.scrollY > 50) {
            navbar.style.background = 'rgba(15, 23, 42, 0.95)';
            navbar.style.boxShadow = '0 4px 30px rgba(0, 0, 0, 0.5)';
        } else {
            navbar.style.background = 'rgba(15, 23, 42, 0.8)';
            navbar.style.boxShadow = 'none';
        }
    });

    // Carousel Logic
    const track = document.querySelector('.carousel-track');
    const slides = Array.from(track.children);
    const nextButton = document.querySelector('.next-btn');
    const prevButton = document.querySelector('.prev-btn');
    const indicators = Array.from(document.querySelectorAll('.indicator'));

    let currentSlideIndex = 0;

    const updateCarousel = (index) => {
        track.style.transform = `translateX(-${index * 50}%)`;

        slides.forEach(slide => slide.classList.remove('active'));
        indicators.forEach(indicator => indicator.classList.remove('active'));

        slides[index].classList.add('active');
        indicators[index].classList.add('active');
        currentSlideIndex = index;
    };

    nextButton.addEventListener('click', () => {
        const nextIndex = currentSlideIndex === slides.length - 1 ? 0 : currentSlideIndex + 1;
        updateCarousel(nextIndex);
    });

    prevButton.addEventListener('click', () => {
        const prevIndex = currentSlideIndex === 0 ? slides.length - 1 : currentSlideIndex - 1;
        updateCarousel(prevIndex);
    });

    indicators.forEach((indicator, index) => {
        indicator.addEventListener('click', () => updateCarousel(index));
    });
});
