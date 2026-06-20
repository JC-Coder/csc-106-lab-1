const contactForm = document.querySelector("#contact-form");
const contactFields = {
  name: document.querySelector("#name"),
  email: document.querySelector("#email"),
  phone: document.querySelector("#phone"),
  message: document.querySelector("#message"),
};
const successMessage = document.querySelector("#form-success");

function showError(fieldName, message) {
  const field = contactFields[fieldName];
  const error = document.querySelector(`#${fieldName}-error`);

  field.setAttribute("aria-invalid", "true");
  error.textContent = message;
}

function clearError(fieldName) {
  const field = contactFields[fieldName];
  const error = document.querySelector(`#${fieldName}-error`);

  field.removeAttribute("aria-invalid");
  error.textContent = "";
}

// Validates the exact empty, email-format, and numeric-phone rules in the brief.
contactForm.addEventListener("submit", (event) => {
  event.preventDefault();
  let isValid = true;

  Object.keys(contactFields).forEach(clearError);
  successMessage.textContent = "";

  Object.entries(contactFields).forEach(([fieldName, field]) => {
    if (!field.value.trim()) {
      showError(fieldName, "This field is required.");
      isValid = false;
    }
  });

  if (contactFields.email.value.trim() && !/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(contactFields.email.value.trim())) {
    showError("email", "Enter a valid email address.");
    isValid = false;
  }

  if (contactFields.phone.value.trim() && !/^\d+$/.test(contactFields.phone.value.trim())) {
    showError("phone", "Phone number must contain digits only.");
    isValid = false;
  }

  if (!isValid) {
    contactForm.querySelector('[aria-invalid="true"]').focus();
    return;
  }

  contactForm.reset();
  successMessage.textContent = "Your message has been validated successfully.";
});

Object.entries(contactFields).forEach(([fieldName, field]) => {
  field.addEventListener("input", () => {
    clearError(fieldName);
    successMessage.textContent = "";
  });
});
