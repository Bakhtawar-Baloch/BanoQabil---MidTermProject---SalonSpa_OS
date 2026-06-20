// ==================================================================================
// Unified Dashboard JS - Fixed Initializations, Errors & Multi-Page Safety
// ==================================================================================

document.addEventListener('DOMContentLoaded', () => {
    
    // 1. MODAL SELECTION (Safe & Multi-Page Setup)
    const bookingModal = document.getElementById('loginModal');
    const closeModal = document.getElementById('closeModal');
    
    // Selects both 'Book Now' and 'Create Payment' button layout variations
    const bookNowButtons = document.querySelectorAll('.bookNowBtn, .card-link, .card-btn');

    // Open Modal Action
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

    // ==============================================
    // TOTAL CHARGES CALCULATOR LOGIC
    // ==============================================
    const priceInput = document.getElementById('Price');
    const quantityInput = document.getElementById('Quantity');
    const totalDisplay = document.getElementById('Total');
    const bookingForm = document.getElementById('bookingForm');

    function calculateTotal() {
        if (!bookingForm) return;
        let runningTotal = 0;
        let combinedPriceSum = 0;
        let combinedQuantitySum = 0;

        const serviceItems = bookingForm.querySelectorAll('.service-item');

        serviceItems.forEach(item => {
            const checkbox = item.querySelector('.service-checkbox');
            const qtyInput = item.querySelector('.service-qty');

            if (checkbox && checkbox.checked) {
                if (qtyInput) qtyInput.disabled = false; 

                const itemPrice = parseFloat(checkbox.getAttribute('data-price')) || 0;
                const itemQuantity = qtyInput ? (parseInt(qtyInput.value) || 1) : 1;

                combinedQuantitySum += itemQuantity;
                runningTotal += (itemPrice * itemQuantity); 
                combinedPriceSum += (itemPrice * itemQuantity); 
            } else if (qtyInput) {
                qtyInput.disabled = true;  
                qtyInput.value = 1;        
            }
        });

        if (priceInput) priceInput.value = combinedPriceSum > 0 ? combinedPriceSum : '';
        if (quantityInput) quantityInput.value = combinedQuantitySum > 0 ? combinedQuantitySum : '';
        if (totalDisplay) totalDisplay.textContent = runningTotal.toFixed(2);
    }

    if (bookingForm) {
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

        // Booking Form Submission Handler
        bookingForm.addEventListener("submit", function(e) {
            e.preventDefault();

            const clientNameInput = document.getElementById("form-client-name");
            const clientName = clientNameInput ? clientNameInput.value : "Unknown Client";

            const createDate = document.getElementById("createDate").value;
            const appointmentDate = document.getElementById("appointmentDate").value;
            const paymentDate = document.getElementById("paymentDate").value;

            const price = Number(document.getElementById("Price").value) || 0;
            const quantity = Number(document.getElementById("Quantity").value) || 1;
            const totalDisplayElement = document.getElementById("Total");
            const total = totalDisplayElement ? parseFloat(totalDisplayElement.textContent) || 0 : price * quantity;

            const paymentStatus = document.querySelector('input[name="payment"]:checked')?.value || "Pending";
            const appointmentStatus = document.querySelector('input[name="appointment"]:checked')?.value || "Upcoming";

            let selectedServiceArray = [];
            let serviceTypeArray = [];

            document.querySelectorAll(".service-item").forEach(item => {
                const checkbox = item.querySelector('input[type="checkbox"]');
                const qtyInput = item.querySelector('.service-qty');

                if (checkbox && checkbox.checked) {
                    let rawText = item.querySelector("label").innerText.trim();
                    let serviceText = rawText.replace(/\s*\(\$\d+\)/g, "");
                    let itemQty = qtyInput ? parseInt(qtyInput.value) || 1 : 1;
                    
                    selectedServiceArray.push(`${serviceText} (x${itemQty})`);
                    
                    if (serviceText.includes("Haircut") || serviceText.includes("Facial Treatment")) {
                        if (!serviceTypeArray.includes("SALON")) serviceTypeArray.push("SALON");
                    } else if (serviceText.includes("Sauna") || serviceText.includes("Red Light")) {
                        if (!serviceTypeArray.includes("SPA")) serviceTypeArray.push("SPA");
                    } else if (serviceText.includes("Gym") || serviceText.includes("Aerobic")) {
                        if (!serviceTypeArray.includes("GYM")) serviceTypeArray.push("GYM");
                    }
                }
            });

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
                total
            };

            const bookings = JSON.parse(localStorage.getItem("bookings")) || [];
            bookings.push(booking);
            localStorage.setItem("bookings", JSON.stringify(bookings));

            alert("Record added successfully!");
            bookingForm.reset();
            location.reload();
        });
    }

    // ==============================================
    // NAVIGATION SIDEBAR & LOGOUT OVERLAYS
    // ==============================================
    const toggleSidebarBtn = document.getElementById('toggleSidebar');
    const openMobileSidebarBtn = document.getElementById('openMobileSidebar');
    const dashboardWrapper = document.querySelector('.dashboard-wrapper');

    if (toggleSidebarBtn && dashboardWrapper) {
        toggleSidebarBtn.addEventListener('click', () => {
            dashboardWrapper.classList.toggle('sidebar-collapsed');
        });
    }

    if (openMobileSidebarBtn && dashboardWrapper) {
        openMobileSidebarBtn.addEventListener('click', () => {
            dashboardWrapper.classList.toggle('mobile-sidebar-active');
        });
    }

    document.addEventListener('click', (e) => {
        if (window.innerWidth <= 900 && dashboardWrapper && dashboardWrapper.classList.contains('mobile-sidebar-active')) {
            const sidebar = document.querySelector('.sidebar');
            if (sidebar && !sidebar.contains(e.target) && openMobileSidebarBtn && !openMobileSidebarBtn.contains(e.target)) {
                dashboardWrapper.classList.remove('mobile-sidebar-active');
            }
        }
    });

    const logoutBtnSidebar = document.querySelector('.log-out-btn-sidebar');
    const logoutModal = document.getElementById('logoutModal');
    const confirmLogout = document.getElementById('confirmLogout');
    const cancelLogout = document.getElementById('cancelLogout');

    if (logoutBtnSidebar && logoutModal) {
        logoutBtnSidebar.addEventListener('click', (e) => {
            e.preventDefault(); 
            logoutModal.classList.add('show');
        });
    }

    if (cancelLogout && logoutModal) {
        cancelLogout.addEventListener('click', () => {
            logoutModal.classList.remove('show');
        });
    }

    if (logoutModal) {
        logoutModal.addEventListener('click', (e) => {
            if (e.target === logoutModal) logoutModal.classList.remove('show');
        });
    }

    if (confirmLogout && logoutModal) {
        confirmLogout.addEventListener('click', () => {
            alert('Logging out...'); 
            logoutModal.classList.remove('show');
            window.location.href = 'index.html'; 
        });
    }

    // PROFILE ACCOUNT WELCOME RENDERING
    const storedName = localStorage.getItem("userName");
    const welcomeNameElement = document.getElementById("dynamic-user-name");
    const profileNameElement = document.getElementById("dynamic-profile-name");

    if (storedName && storedName.trim() !== "") {
        if (welcomeNameElement) welcomeNameElement.textContent = storedName;
        if (profileNameElement) profileNameElement.textContent = storedName.split(" ")[0] + ".";
    } else {