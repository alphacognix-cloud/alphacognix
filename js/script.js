// Main Script


document.addEventListener('DOMContentLoaded', () => {

    // =========================
    // Mobile Menu Toggle
    // =========================
    const mobileMenuToggle = document.querySelector('.mobile-menu-toggle');
    const nav = document.querySelector('.nav');

    if (mobileMenuToggle) {
        mobileMenuToggle.addEventListener('click', () => {
            nav.classList.toggle('active');
            mobileMenuToggle.classList.toggle('active');
        });
    }

    // =========================
    // Project Filtering
    // =========================
    const filterBtns = document.querySelectorAll('.filter-btn');
    const projectCards = document.querySelectorAll('.project-card');

    filterBtns.forEach(btn => {
        btn.addEventListener('click', () => {

            filterBtns.forEach(b => b.classList.remove('active'));
            btn.classList.add('active');

            const filterValue = btn.getAttribute('data-filter');

            projectCards.forEach(card => {
                const cardCategory = card.getAttribute('data-category');

                if (filterValue === 'all' || cardCategory === filterValue) {
                    card.style.display = 'block';
                    card.style.opacity = '0';
                    setTimeout(() => {
                        card.style.opacity = '1';
                    }, 50);
                } else {
                    card.style.display = 'none';
                }
            });
        });
    });

    // =========================
    // Signup Form (Google Sheets)
    // =========================
    const signupForm = document.getElementById("signupForm");

    if (signupForm) {
        signupForm.addEventListener("submit", function (e) {
            e.preventDefault();

            const formData = new FormData(signupForm);

            const messageBox = document.getElementById("formMessage");
            messageBox.textContent = "Registering...";
            messageBox.className = "form-message"; // Reset classes

            fetch("https://script.google.com/macros/s/AKfycbxb7yPWiaBWB-pwqSZFnIwe0G65WaUni5Qr3FIzbIpFHZp5xzOwXOKMOKjfW2dP838I/exec", {
                method: "POST",
                body: formData
            })
                .then(response => response.json())
                .then(data => {

                    if (data.result === "success") {

                        messageBox.textContent = "🎉 Registered Successfully!";
                        messageBox.className = "form-message success";

                        setTimeout(() => {
                            window.location.href = "plans.html";
                        }, 2000);

                    } else {
                        messageBox.textContent = "Something went wrong. Please try again.";
                        messageBox.className = "form-message error";
                    }

                })

                .catch(() => {
                    messageBox.textContent = "Network error. Please try again.";
                    messageBox.className = "form-message error";
                });
        });
    }

});
