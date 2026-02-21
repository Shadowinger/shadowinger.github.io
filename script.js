const FORMSPREE_ENDPOINT = "https://formspree.io/f/your-form-id";

const form = document.getElementById("waitlist-form");
const statusEl = document.getElementById("form-status");
const submitButton = form.querySelector('button[type="submit"]');
const yearEl = document.getElementById("year");

yearEl.textContent = new Date().getFullYear().toString();

function setStatus(type, message) {
  statusEl.className = type;
  statusEl.textContent = message;
}

function validateEmail(value) {
  return /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(value);
}

form.addEventListener("submit", async (event) => {
  event.preventDefault();
  setStatus("", "");

  const formData = new FormData(form);
  const email = String(formData.get("email") || "").trim();

  if (!email) {
    setStatus("error", "Email is required.");
    return;
  }

  if (!validateEmail(email)) {
    setStatus("error", "Please enter a valid email address.");
    return;
  }

  const payload = {
    email,
    name: String(formData.get("name") || "").trim(),
    goal: String(formData.get("goal") || "").trim(),
    source: "MyTrace Landing Page"
  };

  submitButton.disabled = true;

  try {
    const response = await fetch(FORMSPREE_ENDPOINT, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        Accept: "application/json"
      },
      body: JSON.stringify(payload)
    });

    if (!response.ok) {
      throw new Error("Request failed");
    }

    form.reset();
    setStatus("success", "You are on the list. We will contact you soon.");
  } catch (error) {
    setStatus("error", "Submission failed. Please try again.");
  } finally {
    submitButton.disabled = false;
  }
});
