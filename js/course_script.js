document.addEventListener('DOMContentLoaded', () => {
    // Navigate to local index.html if user clicks login for now (or handle modal)
    // There's a login modal in signup.html but index.html has links.
    // Let's implement simple interactions.

    // FAQ Toggles
    const faqItems = document.querySelectorAll('.faq-item');
    faqItems.forEach(item => {
        const question = item.querySelector('.faq-question');
        const answer = item.querySelector('.faq-answer'); // Select existing answer

        question.addEventListener('click', () => {
            const isOpen = item.classList.contains('active');

            // Close all others
            faqItems.forEach(i => {
                i.classList.remove('active');
                const ans = i.querySelector('.faq-answer');
                if (ans) ans.style.display = 'none';
                const icon = i.querySelector('i');
                if (icon) icon.className = 'fas fa-chevron-down';
            });

            if (!isOpen) {
                item.classList.add('active');
                if (answer) answer.style.display = 'block';
                const icon = question.querySelector('i');
                if (icon) icon.className = 'fas fa-chevron-up';
            }
        });
    });

    // Syllabus Toggles
    const syllabusItems = document.querySelectorAll('.syllabus-item');
    syllabusItems.forEach(item => {
        // Add hidden content if not present
        if (!item.querySelector('.syllabus-content')) {
            const content = document.createElement('div');
            content.className = 'syllabus-content';
            content.style.display = 'none';
            content.style.padding = '10px 20px';
            content.style.color = '#666';
            content.style.fontSize = '0.9rem';
            content.style.borderTop = '1px solid #eee';
            content.innerHTML = '<p>Detailed topics for this module including hands-on exercises and projects.</p>';
            item.appendChild(content);
        }

        item.addEventListener('click', () => {
            const content = item.querySelector('.syllabus-content');
            const icon = item.querySelector('i');
            const isVisible = content.style.display === 'block';

            content.style.display = isVisible ? 'none' : 'block';
            icon.className = isVisible ? 'fas fa-plus' : 'fas fa-minus';
        });
    });
});





// =========================
// Success Modal Logic
// =========================
function injectSuccessModal() {
    if (document.getElementById('successModal')) return;

    const modalHTML = `
        <div id="successModal" class="custom-modal-overlay">
            <div class="custom-modal-content">
                <div class="custom-modal-icon">
                    <i class="fas fa-check-circle"></i>
                </div>
                <h3>Application Submitted!</h3>
                <p>Thank you for applying. We will connect with you shortly.</p>
                <button id="closeModalBtn">Close</button>
            </div>
        </div>
        <style>
            .custom-modal-overlay {
                position: fixed;
                top: 0;
                left: 0;
                width: 100%;
                height: 100%;
                background: rgba(0, 0, 0, 0.7);
                display: flex;
                justify-content: center;
                align-items: center;
                z-index: 9999;
                visibility: hidden;
                opacity: 0;
                transition: opacity 0.3s ease, visibility 0.3s ease;
                backdrop-filter: blur(5px);
            }
            .custom-modal-overlay.active {
                visibility: visible;
                opacity: 1;
            }
            .custom-modal-content {
                background: rgba(255, 255, 255, 0.95);
                padding: 40px 30px;
                border-radius: 20px;
                text-align: center;
                max-width: 400px;
                width: 90%;
                box-shadow: 0 20px 50px rgba(0,0,0,0.5);
                transform: scale(0.8);
                transition: transform 0.3s cubic-bezier(0.175, 0.885, 0.32, 1.275);
                border: 1px solid rgba(255, 255, 255, 0.5);
            }
            .custom-modal-overlay.active .custom-modal-content {
                transform: scale(1);
            }
            .custom-modal-icon {
                font-size: 4rem;
                color: #2ecc71;
                margin-bottom: 20px;
                animation: popIn 0.5s cubic-bezier(0.175, 0.885, 0.32, 1.275);
            }
            .custom-modal-content h3 {
                margin-bottom: 10px;
                color: #333;
                font-size: 1.5rem;
                font-weight: 700;
            }
            .custom-modal-content p {
                color: #666;
                margin-bottom: 30px;
                font-size: 1rem;
                line-height: 1.5;
            }
            .custom-modal-content button {
                background: linear-gradient(135deg, #00ced1, #008b8b);
                color: white;
                border: none;
                padding: 12px 35px;
                border-radius: 50px;
                cursor: pointer;
                font-weight: 600;
                font-size: 1rem;
                box-shadow: 0 5px 15px rgba(0, 206, 209, 0.4);
                transition: transform 0.2s, box-shadow 0.2s;
            }
            .custom-modal-content button:hover {
                transform: translateY(-2px);
                box-shadow: 0 8px 20px rgba(0, 206, 209, 0.6);
            }
            @keyframes popIn {
                0% { transform: scale(0); opacity: 0; }
                100% { transform: scale(1); opacity: 1; }
            }
        </style>
    `;

    const div = document.createElement('div');
    div.innerHTML = modalHTML;
    document.body.appendChild(div);

    // Close logic
    document.getElementById('closeModalBtn').addEventListener('click', closeSuccessModal);
    document.getElementById('successModal').addEventListener('click', (e) => {
        if (e.target === document.getElementById('successModal')) {
            closeSuccessModal();
        }
    });
}

function showSuccessModal() {
    injectSuccessModal(); // Ensure it exists
    setTimeout(() => {
        document.getElementById('successModal').classList.add('active');
    }, 10);
}

function closeSuccessModal() {
    const modal = document.getElementById('successModal');
    if (modal) {
        modal.classList.remove('active');
    }
}

// Inject on load
document.addEventListener('DOMContentLoaded', injectSuccessModal);

// Apply Button Logic
const applyBtn = document.getElementById("applyBtn");
if (applyBtn) {
    applyBtn.addEventListener("click", function () {
        const btn = this;
        const originalText = btn.textContent;
        btn.textContent = "Submitting...";
        btn.disabled = true;

        const scriptURL = "https://script.google.com/macros/s/AKfycbxb7yPWiaBWB-pwqSZFnIwe0G65WaUni5Qr3FIzbIpFHZp5xzOwXOKMOKjfW2dP838I/exec";
        const form = document.getElementById("applyForm");
        const formData = new FormData(form);

        fetch(scriptURL, {
            method: "POST",
            body: formData
        })
            .then(res => res.json())
            .then(data => {
                showSuccessModal();
                form.reset();
            })
            .catch(err => {
                console.error(err);
                alert("Submission failed. Please try again.");
            })
            .finally(() => {
                btn.textContent = originalText;
                btn.disabled = false;
            });
    });
}

