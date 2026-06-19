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

// --- NEW CODE ADDED AT THE END ---
document.addEventListener("DOMContentLoaded", () => {
    const storedName = localStorage.getItem("userName");

    const welcomeNameElement = document.getElementById("dynamic-user-name");
    const profileNameElement = document.getElementById("dynamic-profile-name");

    if (storedName && storedName.trim() !== "") {
        welcomeNameElement.textContent = storedName;

        const firstName = storedName.split(" ")[0];
        profileNameElement.textContent = firstName + ".";
    } else {
        welcomeNameElement.textContent = "Valued Member";
        profileNameElement.textContent = "Guest";
    }
});


// ==================================================================================
// Form JS to display entries saved on the Booking and Payment Dashboard - Bakhtawar
// ==================================================================================


document.addEventListener("DOMContentLoaded", () => {

    const bookingForm = document.getElementById("bookingForm");

    if (!bookingForm) return;

    bookingForm.addEventListener("submit", function(e) {

        e.preventDefault();

        const clientName =
            document.getElementById("form-client-name").value;

        const createDate =
            document.getElementById("createDate").value;

        const appointmentDate =
            document.getElementById("appointmentDate").value;

        const paymentDate =
            document.getElementById("paymentDate").value;

        const price =
            Number(document.getElementById("Price").value) || 0;

        const quantity =
            Number(document.getElementById("Quantity").value) || 1;

        const total = price * quantity;

        const paymentStatus =
            document.querySelector(
                'input[name="payment"]:checked'
            )?.value || "Pending";

        const appointmentStatus =
            document.querySelector(
                'input[name="appointment"]:checked'
            )?.value || "Upcoming";

        // Selected Service
        let selectedService = "General Service";

        document
            .querySelectorAll(".service-item")
            .forEach(item => {

                const checkbox =
                    item.querySelector(
                        'input[type="checkbox"]'
                    );

                if (checkbox.checked) {

                    selectedService =
                        item.querySelector("label")
                            .innerText
                            .trim();
                }
            });

        const booking = {

            id: Date.now(),

            clientName,
            createDate,
            appointmentDate,
            paymentDate,

            service: selectedService,

            appointmentStatus,
            paymentStatus,

            price,
            quantity,
            total
        };

        const bookings =
            JSON.parse(
                localStorage.getItem("bookings")
            ) || [];

        bookings.push(booking);

        localStorage.setItem(
            "bookings",
            JSON.stringify(bookings)
        );

        alert("Appointment booked successfully!");

        bookingForm.reset();

        location.reload();
    });
});


// ====================================================
// Display Records in Booking Dashboard - Bakhtawar
// ====================================================


function loadBookings() {

    const tableBody =
        document.getElementById(
            "bookingTableBody"
        );

    if (!tableBody) return;

    const bookings =
        JSON.parse(
            localStorage.getItem("bookings")
        ) || [];

    bookings.forEach(booking => {

        const row = document.createElement("tr");

        row.innerHTML = `
            <td><input type="checkbox"></td>
            <td>${booking.clientName}</td>
            <td><span class="service-badge">SERVICE</span></td>
            <td>${booking.service}</td>
            <td>${booking.appointmentStatus}</td>
            <td>$${booking.total}</td>
            <td>${booking.quantity}</td>
            <td>${booking.createDate}</td>
            <td>${booking.appointmentDate}</td>
        `;

        tableBody.appendChild(row);
    });
}

loadBookings();



// ====================================================
// Display Records in Payment Dashboard - Bakhtawar
// ====================================================


function loadPayments() {

    const paymentTable =
        document.getElementById(
            "paymentTableBody"
        );

    if (!paymentTable) return;

    const bookings =
        JSON.parse(
            localStorage.getItem("bookings")
        ) || [];

    bookings.forEach(booking => {

        const row = document.createElement("tr");

        row.innerHTML = `
            <td>${booking.clientName}</td>
            <td>${booking.service}</td>
            <td>$${booking.total}</td>
            <td>${booking.paymentStatus}</td>
            <td>${booking.paymentDate}</td>
        `;

        paymentTable.appendChild(row);
    });
}

loadPayments();
