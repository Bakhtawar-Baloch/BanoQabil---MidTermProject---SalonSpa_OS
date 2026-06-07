
// ==============================
// MODAL SELECTION (Class-Based)
// ==============================
const bookNowButtons = document.querySelectorAll('.bookNowBtn');
const bookingModal = document.getElementById('loginModal');
const closeModal = document.getElementById('closeModal');

// Open Modal via Book Now buttons
bookNowButtons.forEach(btn => {
    btn.addEventListener('click', (e) => {
        e.preventDefault();
        if (bookingModal) {
            bookingModal.style.display = 'flex';
            document.body.style.overflow = 'hidden';
        }
    });
});


// Close Modal Button Action
if (closeModal) {
    closeModal.addEventListener('click', closeBookingModal);
}


// Close When Clicking Outside Modal Box
window.addEventListener('click', (e) => {
    if (e.target === bookingModal) {
        closeBookingModal();
    }
});

function closeBookingModal() {
    if (bookingModal) {
        bookingModal.style.display = 'none';
        document.body.style.overflow = 'auto';
    }
}


// ==============================
// TOTAL CHARGES CALCULATOR
// ==============================

const priceInput = document.getElementById('Price');
const quantityInput = document.getElementById('Quantity');
const totalDisplay = document.getElementById('Total');

if (priceInput && quantityInput) {

    priceInput.addEventListener('input', calculateTotal);
    quantityInput.addEventListener('input', calculateTotal);

}

function calculateTotal() {

    const price =
        parseFloat(priceInput.value) || 0;

    const quantity =
        parseInt(quantityInput.value) || 0;

    const total = price * quantity;

    totalDisplay.textContent =
        total.toFixed(2);
}

// --- SIDEBAR TOGGLE LOGIC ---
const toggleSidebarBtn = document.getElementById('toggleSidebar');
const openMobileSidebarBtn = document.getElementById('openMobileSidebar');
const dashboardWrapper = document.querySelector('.dashboard-wrapper');

// Desktop Toggle
if (toggleSidebarBtn) {
    toggleSidebarBtn.addEventListener('click', () => {
        dashboardWrapper.classList.toggle('sidebar-collapsed');
	});
}

// Mobile Toggle
if (openMobileSidebarBtn) {
    openMobileSidebarBtn.addEventListener('click', () => {
        dashboardWrapper.classList.toggle('mobile-sidebar-active');
        });
}


// Click outside to close mobile sidebar
document.addEventListener('click', (e) => {
    if (window.innerWidth <= 900) {
        const sidebar = document.querySelector('.sidebar');
        if (dashboardWrapper.classList.contains('mobile-sidebar-active') && 
              !sidebar.contains(e.target) && 
              !openMobileSidebarBtn.contains(e.target)) {
              dashboardWrapper.classList.remove('mobile-sidebar-active');
            }
       }
});

// --- LOGOUT MODAL LOGIC ---
const logoutBtnSidebar = document.querySelector('.log-out-btn-sidebar');
const logoutModal = document.getElementById('logoutModal');
const confirmLogout = document.getElementById('confirmLogout');
const cancelLogout = document.getElementById('cancelLogout');

// Modal show karne ke liye
if (logoutBtnSidebar) {
    logoutBtnSidebar.addEventListener('click', (e) => {
        e.preventDefault(); 
        logoutModal.classList.add('show');
       });
}

// Modal close karne ke liye ('No, Stay' button)
if (cancelLogout) {
    cancelLogout.addEventListener('click', () => {
        logoutModal.classList.remove('show');
       });
}

// Click outside modal to close
if (logoutModal) {
    logoutModal.addEventListener('click', (e) => {
       if (e.target === logoutModal) {
           logoutModal.classList.remove('show');
           }
       });
}

// Real Action ('Yes, Log Out' button)
if (confirmLogout) {
    confirmLogout.addEventListener('click', () => {
        alert('Logging out...'); 
        logoutModal.classList.remove('show');
        window.location.href = 'index.html'; 
    });
}