const container = document.getElementById("container");
const registerBtn = document.getElementById("register");
const loginBtn = document.getElementById("login");

registerBtn.addEventListener("click", () => {
  container.classList.add("active");
});

loginBtn.addEventListener("click", () => {
  container.classList.remove("active");
});

window.addEventListener("DOMContentLoaded", () => {
  const mode = new URLSearchParams(window.location.search).get("mode");
  if (mode === "signup") {
    container.classList.add("active");
  } else {
    container.classList.remove("active"); // defaults to login
  }
});


// Signup Handler
const signupForm = document.querySelector(".sign-up form");
signupForm.addEventListener("submit", async (e) => {
  e.preventDefault();

  const name = signupForm.querySelector('input[placeholder="Name"]').value;
  const email = signupForm.querySelector('input[placeholder="Email"]').value;
  const password = signupForm.querySelector('input[placeholder="Password"]').value;
  const role = signupForm.querySelector('select[name="role"]').value;

  const res = await fetch("http://localhost:5000/signup", {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({ name, email, password, role }),
  });

  const data = await res.json();

  if (!res.ok) {
    alert(data.error || "Signup failed");
    return;
  }

  alert("Signup successful! You can now login.");
  container.classList.remove("active"); // Switch to login
});

// Login Handler
const loginForm = document.querySelector(".sign-in form");
loginForm.addEventListener("submit", async (e) => {
  e.preventDefault();

  const email = loginForm.querySelector('input[placeholder="Email"]').value;
  const password = loginForm.querySelector('input[placeholder="Password"]').value;
  const role = loginForm.querySelector('select[name="role"]').value;

  const res = await fetch("http://localhost:5000/login", {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({ email, password, role }),
  });

  const data = await res.json();

  if (!res.ok) {
    alert(data.error || "Login failed");
    return;
  }

  alert("Login successful!");
  // You can redirect to dashboard or save user info
  // window.location.href = "dashboard.html";
});
