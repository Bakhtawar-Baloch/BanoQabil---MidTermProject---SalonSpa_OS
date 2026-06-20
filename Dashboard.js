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

document.addEventListener('DOMContentLoaded', () => {
    // 1. Core element selectors
    const priceInput = document.getElementById('Price');
    const quantityInput = document.getElementById('Quantity');
    const totalDisplay = document.getElementById('Total');
    const bookingForm = document.getElementById('bookingForm');

    // 2. Pure row-by-row mathematical calculator function
    function calculateTotal() {
        let runningTotal = 0;
        let combinedPriceSum = 0;
        let combinedQuantitySum = 0;

        // Loop through each service item row independently
        const serviceItems = bookingForm.querySelectorAll('.service-item');

        serviceItems.forEach(item => {
            const checkbox = item.querySelector('.service-checkbox');
            const qtyInput = item.querySelector('.service-qty');

            if (checkbox && checkbox.checked) {
                // Unlock the quantity input box when item is selected
                qtyInput.disabled = false; 

                const itemPrice = parseFloat(checkbox.getAttribute('data-price')) || 0;
                const itemQuantity = parseInt(qtyInput.value) || 1; // Default to 1 if empty or typed over

                // Calculate cumulative values row-by-row
                combinedPriceSum += itemPrice;
                combinedQuantitySum += itemQuantity;
                runningTotal += (itemPrice * itemQuantity); // ✅ Math Core: Price per item multiplied by its quantity
            } else if (qtyInput) {
                // Lock and clean input if item gets unchecked
                qtyInput.disabled = true;  
                qtyInput.value = 1;        
            }
        });

        // Update your bottom summary inputs with accurate stats
        if (priceInput) priceInput.value = combinedPriceSum > 0 ? combinedPriceSum : '';
        if (quantityInput) quantityInput.value = combinedQuantitySum > 0 ? combinedQuantitySum : '';

        // Inject the completely accurate financial sum to the UI display
        if (totalDisplay) {
            totalDisplay.textContent = runningTotal.toFixed(2);
        }
    }

    // 3. Live continuous tracking event listeners
    // Tracks when a checkbox flips status or when a user types numbers inside quantity inputs
    bookingForm.addEventListener('input', (e) => {
        if (e.target.classList.contains('service-checkbox') || e.target.classList.contains('service-qty')) {
            calculateTotal();
        }
    });

    bookingForm.addEventListener('change', (e) => {
        if (e.target.classList.contains('service-checkbox') || e.target.classList.contains('service-qty')) {
            calculateTotal();
        }
    });
});



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

        // Safe fallbacks to prevent errors if elements are missing
        const clientNameInput = document.getElementById("form-client-name");
        const clientName = clientNameInput ? clientNameInput.value : "Unknown Client";

        const createDate = document.getElementById("createDate").value;
        const appointmentDate = document.getElementById("appointmentDate").value;
        const paymentDate = document.getElementById("paymentDate").value;

        const price = Number(document.getElementById("Price").value) || 0;
        const quantity = Number(document.getElementById("Quantity").value) || 1;

        // ✅ FIX 1: Read the accurate textContent from the calculated total span node directly
        const totalDisplayElement = document.getElementById("Total");
        const total = totalDisplayElement ? parseFloat(totalDisplayElement.textContent) || 0 : price * quantity;

        const paymentStatus = document.querySelector('input[name="payment"]:checked')?.value || "Pending";
        const appointmentStatus = document.querySelector('input[name="appointment"]:checked')?.value || "Upcoming";

        // ✅ FIX 2: Group multiple selected checkboxes cleanly into a single entry row string
        let selectedServiceArray = [];
        let serviceTypeArray = [];

        document.querySelectorAll(".service-item").forEach(item => {
            const checkbox = item.querySelector('input[type="checkbox"]');
            const qtyInput = item.querySelector('.service-qty');

            if (checkbox && checkbox.checked) {
                // Read clean labels (e.g., "Haircut")
                let serviceText = item.querySelector("label").innerText.split('(')[0].trim();
                let itemQty = qtyInput ? parseInt(qtyInput.value) || 1 : 1;
                
                // Format nicely for table display: "Haircut (x3)"
                selectedServiceArray.push(`${serviceText} (x${itemQty})`);
                
                // Categorize badges dynamically
                if (serviceText.includes("Haircut") || serviceText.includes("Facial Treatment")) {
                    if (!serviceTypeArray.includes("SALON")) serviceTypeArray.push("SALON");
                } else if (serviceText.includes("Sauna") || serviceText.includes("Red Light")) {
                    if (!serviceTypeArray.includes("SPA")) serviceTypeArray.push("SPA");
                } else if (serviceText.includes("Gym") || serviceText.includes("Aerobic")) {
                    if (!serviceTypeArray.includes("GYM")) serviceTypeArray.push("GYM");
                }
            }
        });

        // Join items with commas if multiple are checked
        const selectedService = selectedServiceArray.length > 0 ? selectedServiceArray.join(", ") : "General Service";
        const serviceType = serviceTypeArray.length > 0 ? serviceTypeArray.join(" / ") : "UNKNOWN";

        const booking = {
            id: Date.now(),
            clientName,
            createDate,
            appointmentDate,
            paymentDate,
            serviceType,
            service: selectedService,
            appointmentStatus,
            paymentStatus,
            price,
            quantity,
            total // Logs accurate fixed price matrix values
        };

        const bookings = JSON.parse(localStorage.getItem("bookings")) || [];
        bookings.push(booking);
        localStorage.setItem("bookings", JSON.stringify(bookings));

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
            <td><span class="service-badge">${booking.serviceType}</span></td>
            <td>${booking.service}</td>
            
            <td><span class="${
            booking.appointmentStatus === "Completed"
                ? "status-confirmed"
                : booking.appointmentStatus === "Cancelled"
                ? "status-cancelled"
                : "status-pending"
        }">
            ${booking.appointmentStatus}
            </span></td>
            
            <td>$${booking.total}</td>
            <td>${booking.quantity}</td>
            <td>${booking.createDate}</td>
            <td>${booking.appointmentDate}</td>
        `;

        tableBody.appendChild(row);
    });
}

loadBookings();





// ================================================================
// Display Records in Dashboard (Recent Appointments) - Bakhtawar
// ================================================================


function loadRecentBookings() {

    const tableBody =
        document.getElementById(
            "recentBookingTableBody"
        );

    if (!tableBody) return;

    tableBody.innerHTML = "";

    const bookings =
        JSON.parse(
            localStorage.getItem("bookings")
        ) || [];

    const latestThree =
        bookings
            .sort((a, b) => b.id - a.id)
            .slice(0, 3);

    latestThree.forEach(booking => {

        const statusClass =
            booking.appointmentStatus === "Completed"
                ? "status-confirmed"
                : booking.appointmentStatus === "Cancelled"
                ? "status-cancelled"
                : "status-pending";

        tableBody.innerHTML += `
            <tr>
                <td>${booking.appointmentDate}</td>

                <td>${booking.clientName}</td>

                <td>${booking.service}</td>

                <td>
                    <span class="${statusClass}">
                        ${booking.appointmentStatus}
                    </span>
                </td>
            </tr>
        `;
    });
}

document.addEventListener(
    "DOMContentLoaded",
    loadRecentBookings
);




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
            <td><input type="checkbox"></td>
            <td>${booking.clientName}</td>

            <td><span class="service-badge">${booking.serviceType}</span></td>

            <td>${booking.service}</td>

            <td><span class="${
                booking.paymentStatus === "Received"
                    ? "status-confirmed"
                    : booking.paymentStatus === "Cancelled"
                    ? "status-cancelled"
                    : "status-pending";
            }">
                ${booking.paymentStatus}
            </span></td>

            <td>$${booking.total}</td>
            <td>${booking.quantity}</td>
            <td>${booking.createDate}</td>
            <td>${booking.paymentDate}</td>
        `;

        paymentTable.appendChild(row);
    });
}

loadPayments();


// ====================================================
// Dashboard Recent Payments Widget - Dashboard
// Shows Last 3 Payments Only
// ====================================================

function loadRecentPayments() {

    const paymentTable =
        document.getElementById(
            "recentPaymentTableBody"
        );

    if (!paymentTable) return;

    paymentTable.innerHTML = "";

    const bookings =
        JSON.parse(
            localStorage.getItem("bookings")
        ) || [];

    // Sort newest first

    const recentPayments =
        bookings
            .sort((a, b) => b.id - a.id)
            .slice(0, 3);

    recentPayments.forEach(payment => {

        let statusClass =
            "status-pending";

        if (
            payment.paymentStatus ===
            "Received"
        ) {
            statusClass =
                "status-confirmed";
        }

        else if (payment.paymentStatus === "Cancelled") {
        statusClass = "status-cancelled";
        }

        const row =
            document.createElement("tr");

        row.innerHTML = `
            <td>${payment.paymentDate || "-"}</td>

            <td>${payment.service}</td>

            <td>$${payment.total}</td>

            <td>
                <span class="${statusClass}">
                    ${payment.paymentStatus}
                </span>
            </td>
        `;

        paymentTable.appendChild(row);
    });
}

loadRecentPayments();
