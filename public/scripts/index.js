document.addEventListener("DOMContentLoaded", () => {
  const observerOptions = {
    root: null,
    rootMargin: "0px",
    threshold: 0.1,
  };

  const observer = new IntersectionObserver((entries, observer) => {
    entries.forEach((entry) => {
      if (entry.isIntersecting) {
        entry.target.classList.add("visible");
        observer.unobserve(entry.target);
      }
    });
  }, observerOptions);

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

  const button = document.querySelector(`button[onclick*="${buttonId}"]`);
  if (button) {
    const originalText = button.textContent;
    const originalBgColor = window.getComputedStyle(button).backgroundColor;

    if (success) {
      button.textContent = "Copied!";
      button.style.backgroundColor = "#28a745";
    } else {
      button.textContent = "Failed!";
      button.style.backgroundColor = "#dc3545";
    }

    setTimeout(() => {
      button.textContent = originalText;
      if (button.closest(".bkash-card")) {
        button.style.backgroundColor = "#d82c6b";
      } else if (button.closest(".bank-card")) {
        button.style.backgroundColor = "#1e88e5";
      } else if (button.closest(".contact-detail-row")) {
        button.style.backgroundColor = "#3498db";
      }
    }, 2000);
  }
}
