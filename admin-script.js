// ===== AUTHENTICATION CHECK =====
function checkAuth() {
    const isAuthenticated = sessionStorage.getItem('glamAdmin');
    const currentPage = window.location.pathname;

    if (!isAuthenticated && !currentPage.includes('admin-login')) {
        window.location.href = 'admin-login';
    }

    // Set username in header
    const username = sessionStorage.getItem('adminUser');
    const usernameElement = document.getElementById('adminUsername');
    if (usernameElement && username) {
        usernameElement.textContent = username;
    }
}

// Check auth on page load
if (!window.location.pathname.includes('admin-login')) {
    checkAuth();
}

// ===== LOGOUT FUNCTION =====
function logout() {
    if (confirm('Are you sure you want to logout?')) {
        sessionStorage.removeItem('glamAdmin');
        sessionStorage.removeItem('adminUser');
        localStorage.removeItem('glamAdminRemember');
        window.location.href = 'admin-login';
    }
}

// ===== MOBILE SIDEBAR TOGGLE =====
const sidebarToggle = document.querySelector('.sidebar-toggle');
const sidebar = document.querySelector('.sidebar');

if (sidebarToggle) {
    sidebarToggle.addEventListener('click', () => {
        sidebar.classList.toggle('active');
    });
}

// ===== FORM VALIDATION =====
function validateForm(formId) {
    const form = document.getElementById(formId);
    if (!form) return true;

    const inputs = form.querySelectorAll('input[required], textarea[required], select[required]');
    let isValid = true;

    inputs.forEach(input => {
        if (!input.value.trim()) {
            isValid = false;
            input.style.borderColor = '#f44336';
        } else {
            input.style.borderColor = '#e0e0e0';
        }
    });

    return isValid;
}

// ===== DELETE CONFIRMATION =====
function confirmDelete(itemName) {
    return confirm(`Are you sure you want to delete "${itemName}"? This action cannot be undone.`);
}

// ===== SUCCESS MESSAGE =====
function showSuccess(message) {
    alert('✓ ' + message);
}

// ===== ERROR MESSAGE =====
function showError(message) {
    alert('✗ ' + message);
}

// ===== TABLE SEARCH =====
function searchTable(inputId, tableId) {
    const input = document.getElementById(inputId);
    const table = document.getElementById(tableId);

    if (!input || !table) return;

    input.addEventListener('keyup', function() {
        const filter = this.value.toLowerCase();
        const rows = table.getElementsByTagName('tr');

        for (let i = 1; i < rows.length; i++) {
            const row = rows[i];
            const cells = row.getElementsByTagName('td');
            let found = false;

            for (let j = 0; j < cells.length; j++) {
                if (cells[j].textContent.toLowerCase().indexOf(filter) > -1) {
                    found = true;
                    break;
                }
            }

            row.style.display = found ? '' : 'none';
        }
    });
}

// ===== IMAGE PREVIEW =====
function previewImage(input, previewId) {
    if (input.files && input.files[0]) {
        const reader = new FileReader();

        reader.onload = function(e) {
            const preview = document.getElementById(previewId);
            if (preview) {
                preview.src = e.target.result;
                preview.style.display = 'block';
            }
        };

        reader.readAsDataURL(input.files[0]);
    }
}

// ===== AUTO-SAVE DRAFT =====
let autoSaveInterval;

function enableAutoSave(formId) {
    const form = document.getElementById(formId);
    if (!form) return;

    autoSaveInterval = setInterval(() => {
        const formData = new FormData(form);
        const data = Object.fromEntries(formData);

        localStorage.setItem('draft_' + formId, JSON.stringify(data));
        console.log('Draft auto-saved');
    }, 30000); // Save every 30 seconds
}

function loadDraft(formId) {
    const draft = localStorage.getItem('draft_' + formId);
    if (!draft) return;

    if (confirm('A draft was found. Would you like to restore it?')) {
        const data = JSON.parse(draft);
        const form = document.getElementById(formId);

        Object.keys(data).forEach(key => {
            const input = form.querySelector(`[name="${key}"]`);
            if (input) {
                input.value = data[key];
            }
        });
    }
}

function clearDraft(formId) {
    localStorage.removeItem('draft_' + formId);
}

// ===== EXPORT TABLE TO CSV =====
function exportTableToCSV(tableId, filename) {
    const table = document.getElementById(tableId);
    if (!table) return;

    let csv = [];
    const rows = table.querySelectorAll('tr');

    rows.forEach(row => {
        const cols = row.querySelectorAll('td, th');
        const rowData = [];

        cols.forEach(col => {
            rowData.push(col.textContent.trim());
        });

        csv.push(rowData.join(','));
    });

    const csvContent = csv.join('\n');
    const blob = new Blob([csvContent], { type: 'text/csv' });
    const url = window.URL.createObjectURL(blob);
    const a = document.createElement('a');

    a.href = url;
    a.download = filename || 'export.csv';
    a.click();

    window.URL.revokeObjectURL(url);
}

console.log('Admin panel scripts loaded successfully');
