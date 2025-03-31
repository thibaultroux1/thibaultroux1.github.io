// Wait for the DOM to be fully loaded before running scripts
document.addEventListener('DOMContentLoaded', () => {

    // --- Smooth Scrolling ---
    // Select all links with hashes (#) - primarily for same-page links
    const internalLinks = document.querySelectorAll('a[href^="#"]');

    internalLinks.forEach(link => {
        link.addEventListener('click', function(e) {
            // Get the target element's ID from the href
            const targetId = this.getAttribute('href');

            // Ensure it's not just a "#" link with no target
            if (targetId.length > 1) {
                const targetElement = document.querySelector(targetId);

                // Check if the target element exists on the current page
                if (targetElement) {
                    // Prevent default anchor click behavior
                    e.preventDefault();

                    // Smoothly scroll to the target element
                    targetElement.scrollIntoView({
                        behavior: 'smooth',
                        block: 'start' // Optional: Adjust vertical alignment
                    });
                }
                // If targetElement is null, it's likely a link to an anchor
                // on a *different* page. The browser will handle this default navigation.
            }
        });
    });

    // --- Intersection Observer for Animations ---
    // Select all elements designated for animation
    const animatedElements = document.querySelectorAll('.animate-on-scroll');

    // Callback function for the observer
    const observerCallback = (entries, observer) => {
        entries.forEach(entry => {
            // If the element is intersecting (visible)
            if (entry.isIntersecting) {
                // Add the 'is-visible' class to trigger the animation
                entry.target.classList.add('is-visible');
                // Optional: Stop observing the element once it's visible
                observer.unobserve(entry.target);
            }
            // Optional: If you want animations to reverse when scrolling out
            // else {
            //     entry.target.classList.remove('is-visible');
            // }
        });
    };

    // Observer options (e.g., trigger when 10% of the element is visible)
    const observerOptions = {
        root: null, // observes intersections relative to the viewport
        rootMargin: '0px',
        threshold: 0.1 // Percentage of element visibility needed to trigger
    };

    // Create the Intersection Observer
    const intersectionObserver = new IntersectionObserver(observerCallback, observerOptions);

    // Start observing each animated element
    animatedElements.forEach(el => {
        intersectionObserver.observe(el);
    });

}); // End DOMContentLoaded