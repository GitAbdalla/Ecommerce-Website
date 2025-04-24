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
    const inputs = this.querySelectorAll("input");
    const email = inputs[0].value.trim();
    const password = inputs[1].value;

    try {
      const res = await fetch("http://localhost:3000/login", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ email, password }),
      });
      const data = await res.json();
      showNotification(data.message, res.ok);

      if (res.ok) {
        localStorage.setItem("username", data.username);
        loginBtn.textContent = data.username;
        signupBtn.style.display = "none";
        logoutBtn.style.display = "inline-block";
        closeModal("loginModal");
        
        if (typeof updateCartCount === 'function') {
          setTimeout(updateCartCount, 0);
        }
      }
    } catch (err) {
      console.error("Login error:", err);
      showNotification("Login error");
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
      showNotification("Passwords do not match.", false); // Show error notification
      return;
    }

    try {
      const res = await fetch("http://localhost:3000/signup", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ username, email, password, confirmPassword }),
      });

      const data = await res.json();

      if (res.ok) {
        // Show success notification and close modal
        showNotification(data.message || "Signup successful!", true);
        closeModal("signupModal");
        // Set username and update cart count
        localStorage.setItem("username", data.username);
        if (typeof updateCartCount === 'function') updateCartCount();
      } else {
        // Show error notification but don't close modal
        showNotification(data.message || "Signup error", false);
      }
    } catch (err) {
      showNotification("Signup error", false); // Show error notification if something goes wrong
    }
  });

  // === LOGOUT ===
  logoutBtn?.addEventListener("click", () => {
    localStorage.removeItem("username");
    loginBtn.textContent = "Login";
    signupBtn.style.display = "inline-block";
    logoutBtn.style.display = "none";
    showNotification("Loggedout Successfully");
    if (typeof updateCartCount === 'function') updateCartCount();
  });
});

//notifications
function showNotification(message, isSuccess = true) {
  const notif = document.getElementById("notification");
  notif.textContent = message;
  notif.style.backgroundColor = isSuccess ? "#4CAF50" : "#f44336";
  notif.classList.add("show");

  setTimeout(() => {
    notif.classList.remove("show");
    setTimeout(() => {
      notif.style.display = "none";
    }, 500);
  }, 3000);

  notif.style.display = "block";
}
