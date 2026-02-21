const GOOGLE_SCRIPT_ENDPOINT = "https://script.google.com/macros/s/AKfycbxZH91-Z0pRifw6KaCjyShQtc9OfjNod3IbxbKi82700Htnj74mIez1DnZFRtJbpSXrOw/exec";

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

  if (!GOOGLE_SCRIPT_ENDPOINT || GOOGLE_SCRIPT_ENDPOINT.includes("PASTE_YOUR")) {
    setStatus("error", "Set your Google Apps Script Web App URL in script.js first.");
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
    // Apps Script web apps usually don't return CORS headers; no-cors allows safe submit from GitHub Pages.
    await fetch(GOOGLE_SCRIPT_ENDPOINT, {
      method: "POST",
      mode: "no-cors",
      headers: {
        "Content-Type": "application/json"
      },
      body: JSON.stringify(payload)
    });

    form.reset();
    setStatus("success", "You are on the list. We will contact you soon.");
  } catch (error) {
    setStatus("error", "Submission failed. Please try again.");
  } finally {
    submitButton.disabled = false;
  }
});
