// JavaScript for scroll animations.
        document.addEventListener("DOMContentLoaded", () => {
            // Options for the Intersection Observer, which detects when elements enter/exit the viewport.
            const observerOptions = {
                root: null, // The viewport is the root
                rootMargin: "0px", // No margin around the root
                threshold: 0.1, // Trigger when 10% of the element is visible
            };

            // Create a new Intersection Observer instance.
            const observer = new IntersectionObserver((entries, observer) => {
                entries.forEach((entry) => {
                    if (entry.isIntersecting) {
                        // If the element is visible, add the 'visible' class to trigger fade-in animation.
                        entry.target.classList.add("visible");
                        observer.unobserve(entry.target); // Stop observing once the element is visible.
                    }
                });
            }, observerOptions);

            // Observe all elements with the 'fade-in' class for scroll animation.
            document.querySelectorAll(".fade-in").forEach((element) => {
                observer.observe(element);
            });
        });

        function copyToClipboard(text, buttonId) {
            const textarea = document.createElement("textarea");
            textarea.value = text;
            document.body.appendChild(textarea);
            textarea.select();
            let success = false;
            try {
                success = document.execCommand("copy");
            } catch (err) {
                console.error("Failed to copy text: ", err);
            }
            document.body.removeChild(textarea);

            const button = document.querySelector(`button[onclick*="${buttonId}"]`); // Find button by its onclick attribute
            if (button) {
                const originalText = button.textContent;
                // Store the original background color before changing it
                const originalBgColor = window.getComputedStyle(button).backgroundColor;

                if (success) {
                    button.textContent = "Copied!";
                    button.style.backgroundColor = "#28a745"; /* Green for success */
                } else {
                    button.textContent = "Failed!";
                    button.style.backgroundColor = "#dc3545"; /* Red for failure */
                }

                setTimeout(() => {
                    button.textContent = originalText;
                    // Revert to the stored original background color
                    // Check if the button belongs to bkash-card or bank-card and apply the correct color
                    if (button.closest(".bkash-card")) {
                        button.style.backgroundColor = "#d82c6b";
                    } else if (button.closest(".bank-card")) {
                        button.style.backgroundColor = "#1e88e5";
                    } else if (button.closest(".contact-detail-row")) {
                        button.style.backgroundColor = "#3498db"; // For contact section buttons
                    }
                }, 2000);
            }
        }