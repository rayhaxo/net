function submitContact() {
  var name  = document.getElementById('cf-name').value.trim();
  var phone = document.getElementById('cf-phone').value.trim();
  var area  = document.getElementById('cf-area').value.trim();
  if (!name || !phone || !area) {
    alert('Please fill in your name, phone number, and area.');
    return;
  }
  document.getElementById('contact-form').style.display = 'none';
  var s = document.getElementById('contact-success');
  s.style.display = 'block';
  document.getElementById('success-name').textContent =
    'Thanks, ' + name + '! We\'ll be in touch soon.';
}

/* ---- CHANGE THIS PASSWORD TO YOUR OWN ---- */
var ADMIN_PASSWORD = 'cityinternet2026';

function checkAdminAuth() {
  var auth = sessionStorage.getItem('ci_admin_auth');
  if (auth !== 'true') {
    window.location.href = 'admin.html';
  }
}

function adminLogin(pw) {
  if (pw === ADMIN_PASSWORD) {
    sessionStorage.setItem('ci_admin_auth', 'true');
    return true;
  }
  return false;
}

function adminLogout() {
  sessionStorage.removeItem('ci_admin_auth');
  window.location.href = 'admin.html';
}

var STORAGE_KEY = 'ci_customers';

var SAMPLE_CUSTOMERS = [
  { id: 'CI-001', name: 'Rahim Khan',       phone: '01711000001', area: 'Gulshan-1',   plan: 'Fiber Plus', status: 'Active',   joinDate: '2025-01-15', ip: '192.168.1.1' },
  { id: 'CI-002', name: 'Sultana Ahmed',    phone: '01711000002', area: 'Dhanmondi',   plan: 'Starter',    status: 'Active',   joinDate: '2025-02-10', ip: '192.168.1.2' },
  { id: 'CI-003', name: 'Mohammad Hossain', phone: '01711000003', area: 'Mirpur-10',   plan: 'Fiber Max',  status: 'Active',   joinDate: '2025-03-05', ip: '192.168.1.3' },
  { id: 'CI-004', name: 'Farida Begum',     phone: '01711000004', area: 'Banani',      plan: 'Fiber Pro',  status: 'Inactive', joinDate: '2025-04-20', ip: '192.168.1.4' },
  { id: 'CI-005', name: 'Kamal Uddin',      phone: '01711000005', area: 'Uttara',      plan: 'Starter',    status: 'Pending',  joinDate: '2025-05-01', ip: '192.168.1.5' },
];

function loadCustomers() {
  var raw = localStorage.getItem(STORAGE_KEY);
  if (raw) { try { return JSON.parse(raw); } catch(e) {} }
  localStorage.setItem(STORAGE_KEY, JSON.stringify(SAMPLE_CUSTOMERS));
  return SAMPLE_CUSTOMERS.slice();
}

function saveCustomers(list) {
  localStorage.setItem(STORAGE_KEY, JSON.stringify(list));
}

function generateId(list) {
  var max = 0;
  list.forEach(function(c) {
    var n = parseInt(c.id.replace('CI-',''), 10);
    if (n > max) max = n;
  });
  return 'CI-' + String(max + 1).padStart(3, '0');
}
