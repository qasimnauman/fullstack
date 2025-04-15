document.addEventListener("DOMContentLoaded", function () {
    // Login form handling
    const loginForm = document.getElementById("login-form");
    const loginError = document.getElementById("login-error");

    loginForm.addEventListener("submit", function (e) {
        e.preventDefault();
        const loginId = document.getElementById("login-id").value;
        const loginPassword = document.getElementById("login-password").value;

        // Simulated validation (replace with your backend logic)
        if (loginId === "user@example.com" && loginPassword === "password123") {
            alert("Login successful!");
            // Redirect if needed, e.g.: window.location.href = "dashboard.html";
        } else {
            loginError.style.display = "block";
        }
    });

    // Forgot password modal handling
    const forgotPasswordLink = document.getElementById("forgot-password-link");
    const forgotPasswordModal = document.getElementById("forgot-password-modal");
    const closeModal = document.getElementById("close-modal");

    forgotPasswordLink.addEventListener("click", function (e) {
        e.preventDefault();
        forgotPasswordModal.style.display = "block";
    });

    closeModal.addEventListener("click", function () {
        forgotPasswordModal.style.display = "none";
    });

    window.addEventListener("click", function (e) {
        if (e.target == forgotPasswordModal) {
            forgotPasswordModal.style.display = "none";
        }
    });

    // Forgot password form handling
    const forgotPasswordForm = document.getElementById("forgot-password-form");
    forgotPasswordForm.addEventListener("submit", function (e) {
        e.preventDefault();
        const resetEmail = document.getElementById("reset-email").value;
        // Simulated password reset (replace with your actual logic)
        alert("Password reset link has been sent to " + resetEmail);
        forgotPasswordModal.style.display = "none";
    });
});
