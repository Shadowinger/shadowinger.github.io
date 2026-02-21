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
    setStatus("error", "E-mail je povinný.");
    return;
  }

  if (!validateEmail(email)) {
    setStatus("error", "Zadej prosím platnou e-mailovou adresu.");
    return;
  }

  if (!GOOGLE_SCRIPT_ENDPOINT || GOOGLE_SCRIPT_ENDPOINT.includes("PASTE_YOUR")) {
    setStatus("error", "Nejdřív nastav URL Google Apps Script Web App v souboru script.js.");
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
    // Apps Script web apps are more reliable with form-urlencoded payload from static sites.
    const body = new URLSearchParams(payload).toString();

    await fetch(GOOGLE_SCRIPT_ENDPOINT, {
      method: "POST",
      mode: "no-cors",
      headers: {
        "Content-Type": "application/x-www-form-urlencoded;charset=UTF-8"
      },
      body
    });

    form.reset();
    setStatus("success", "Jsi na čekací listině. Brzy se ti ozveme.");
  } catch (error) {
    setStatus("error", "Odeslání selhalo. Zkus to prosím znovu.");
  } finally {
    submitButton.disabled = false;
  }
});
