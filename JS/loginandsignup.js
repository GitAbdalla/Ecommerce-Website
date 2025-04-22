function openModal(modalId) {
  document.getElementById(modalId).style.display = "block";
  document.getElementById("overlay").style.display = "block";
}

function closeModal(modalId) {
  document.getElementById(modalId).style.display = "none";
  document.getElementById("overlay").style.display = "none";
}

document.addEventListener("DOMContentLoaded", function () {
  const loginBtn = document.querySelector(".login_signup .btn:nth-child(1)");
  const signupBtn = document.querySelector(".login_signup .btn:nth-child(2)");
  const logoutBtn = document.getElementById("logoutBtn");

  const loginForm = document.querySelector("#loginModal form");
  const signupForm = document.querySelector("#signupModal form");

  // === Handle UI if user is already logged in ===
  const loggedInUser = localStorage.getItem("username");
  if (loggedInUser) {
    loginBtn.textContent = loggedInUser;
    signupBtn.style.display = "none";
    logoutBtn.style.display = "inline-block";
  } else {
    logoutBtn.style.display = "none";
  }

  // === Open Modals ===
  loginBtn?.addEventListener("click", function (e) {
    e.preventDefault();
    // Only open modal if not already logged in
    if (!localStorage.getItem("username")) {
      openModal("loginModal");
    }
  });

  signupBtn?.addEventListener("click", function (e) {
    e.preventDefault();
    openModal("signupModal");
  });

  document.getElementById("overlay").addEventListener("click", function () {
    closeModal("loginModal");
    closeModal("signupModal");
  });

  // === LOGIN ===
  loginForm.addEventListener("submit", async function (e) {
    e.preventDefault();
    const email = this.querySelector('input[type="email"]').value.trim();
    const password = this.querySelector('input[type="password"]').value;

    try {
      const res = await fetch("http://localhost:3000/login", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ email, password }),
      });

      const data = await res.json();
      alert(data.message);

      if (res.ok) {
        localStorage.setItem("username", data.username);
        loginBtn.textContent = data.username;
        signupBtn.style.display = "none";
        logoutBtn.style.display = "inline-block";
        closeModal("loginModal");
      }
    } catch (err) {
      console.error("Login error:", err);
      alert("Login error");
    }
  });

  // === SIGNUP ===
  signupForm.addEventListener("submit", async function (e) {
    e.preventDefault();
    const inputs = this.querySelectorAll("input");
    const username = inputs[0].value.trim();
    const email = inputs[1].value.trim();
    const password = inputs[2].value;
    const confirmPassword = inputs[3].value;

    if (password !== confirmPassword) {
      alert("Passwords do not match.");
      return;
    }

    try {
      const res = await fetch("http://localhost:3000/signup", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ username, email, password, confirmPassword }),
      });

      const data = await res.json();
      alert(data.message);
      closeModal("signupModal"); // Do NOT log them in after signup
    } catch (err) {
      console.error("Signup error:", err);
      alert("Signup error");
    }
  });

  // === LOGOUT ===
  logoutBtn?.addEventListener("click", () => {
    localStorage.removeItem("username");
    loginBtn.textContent = "Login";
    signupBtn.style.display = "inline-block";
    logoutBtn.style.display = "none";
  });
});
