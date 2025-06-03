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
      button.style.backgroundColor = originalBgColor;
    }, 2000);
  }
}
