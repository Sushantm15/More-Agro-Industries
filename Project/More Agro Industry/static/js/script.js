document.addEventListener("DOMContentLoaded", () => {
    /**
     * Function to switch between sections dynamically
     * @param {string} sectionId - ID of the section to display
     */
    function showSection(sectionId) {
        const sections = document.querySelectorAll("section");
        sections.forEach(section => {
            // Toggle visibility based on section ID
            section.style.display = section.id === sectionId ? "block" : "none";
        });

        // Update active state on navigation links
        const navLinks = document.querySelectorAll("nav a");
        navLinks.forEach(link => {
            link.classList.toggle("active", link.getAttribute("href").includes(sectionId));
        });
    }

    // Initially show the home section
    showSection("home");

    /**
     * Navigation Link Click Event
     * Handles navigation link clicks to display the corresponding section
     */
    const navLinks = document.querySelectorAll("nav a");
    navLinks.forEach(link => {
        link.addEventListener("click", event => {
            event.preventDefault();
            const href = link.getAttribute("href");
            if (href.startsWith("#")) {
                const sectionId = href.substring(1); // Extract section ID
                showSection(sectionId); // Show the corresponding section
            }
        });
    });

    /**
     * Form Validation for the Contact/Order Form
     */
    const orderForm = document.getElementById("orderForm");
    if (orderForm) {
        orderForm.addEventListener("submit", event => {
            // Get form inputs
            const emailInput = document.getElementById("email");
            const quantityInput = document.getElementById("quantity");
            const nameInput = document.getElementById("name");

            // Basic email validation
            const emailPattern = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
            if (!emailPattern.test(emailInput.value)) {
                alert("Please enter a valid email address.");
                emailInput.focus();
                event.preventDefault();
                return;
            }

            // Validate quantity (must be positive)
            if (!quantityInput.value || isNaN(quantityInput.value) || quantityInput.value <= 0) {
                alert("Please enter a valid quantity (greater than 0).");
                quantityInput.focus();
                event.preventDefault();
                return;
            }

            // Validate name (non-empty and trimmed)
            if (!nameInput.value.trim()) {
                alert("Please enter your name.");
                nameInput.focus();
                event.preventDefault();
                return;
            }
        });
    }

    /**
     * Image Carousel Functionality for the Gallery
     */
    const galleryButtons = document.querySelectorAll(".navigation-buttons button");
    const displayedImage = document.getElementById("displayed-image");
    if (galleryButtons && displayedImage) {
        galleryButtons.forEach(button => {
            button.addEventListener("click", () => {
                const newSrc = button.getAttribute("data-src");
                if (newSrc) {
                    displayedImage.src = newSrc; // Update the image source
                }
            });
        });
    }

    /**
     * Dynamic Carousel Slideshow (Optional Enhancement)
     */
    const slides = document.querySelectorAll(".slideshow");
    let slideIndex = 0;
    if (slides.length > 0) {
        function showSlides() {
            slides.forEach((slide, index) => {
                slide.style.display = index === slideIndex ? "block" : "none";
            });
            slideIndex = (slideIndex + 1) % slides.length; // Loop through slides
            setTimeout(showSlides, 5000); // Change slide every 5 seconds
        }
        showSlides(); // Start the slideshow
    }
});
