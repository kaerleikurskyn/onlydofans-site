// Simple front-end auth using localStorage
const STORAGE_KEY = "odfUser";

function saveUser(role, email) {
  const user = { role, email };
  localStorage.setItem(STORAGE_KEY, JSON.stringify(user));
  return user;
}

function getUser() {
  try {
    const raw = localStorage.getItem(STORAGE_KEY);
    if (!raw) return null;
    return JSON.parse(raw);
  } catch (e) {
    return null;
  }
}

function clearUser() {
  localStorage.removeItem(STORAGE_KEY);
}

function redirectToRole(role) {
  if (role === "creator") {
    window.location.href = "creator.html";
  } else {
    window.location.href = "subscriber.html";
  }
}

// Called on login.html
function handleLoginSubmit(e) {
  e.preventDefault();
  const form = e.target;
  const email = form.email.value.trim();
  const role = form.role.value;

  if (!email) {
    alert("Settu inn netfang 🙂");
    return;
  }

  saveUser(role, email);
  redirectToRole(role);
}

// Called on signup.html
function handleSignupSubmit(e) {
  e.preventDefault();
  const form = e.target;
  const email = form.email.value.trim();
  const role = form.role.value;

  if (!email) {
    alert("Settu inn netfang 🙂");
    return;
  }

  saveUser(role, email);
  redirectToRole(role);
}

// Called on dashboards
function requireAuth(expectedRole) {
  const user = getUser();
  if (!user) {
    window.location.href = "login.html";
    return null;
  }
  if (expectedRole && user.role !== expectedRole) {
    // send to right place
    redirectToRole(user.role);
    return null;
  }
  return user;
}

function logout() {
  clearUser();
  window.location.href = "index.html";
}
