// Show alert (success or error)
export function showAlert(message, type = "success") {
    const alertDiv = document.createElement("div");
    alertDiv.className = `alert alert-${type}`;
    alertDiv.textContent = message;

    // Styles
    alertDiv.style.cssText = `
        position: fixed;
        top: 20px;
        right: 20px;
        background: ${type === "success" ? "#d4edda" : "#f8d7da"};
        color: ${type === "success" ? "#155724" : "#721c24"};
        padding: 12px 20px;
        border: 1px solid ${type === "success" ? "#c3e6cb" : "#f5c6cb"};
        border-radius: 4px;
        z-index: 1000;
    `;

    document.body.appendChild(alertDiv);
    setTimeout(() => alertDiv.remove(), 5000);
}

export function showSuccess(message) {
    showAlert(message, "success");
}

export function showError(message) {
    showAlert(message, "error");
}

// Validate email format
export function isValidEmail(email) {
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    return emailRegex.test(email);
}

// Validate password strength (minimum 6 characters)
export function isValidPassword(password) {
    return password && password.length >= 6;
}

// Clear form inputs
export function clearForm(formElement) {
    const inputs = formElement.querySelectorAll("input");
    inputs.forEach((input) => (input.value = ""));
}

// Get current user session
export async function getCurrentUser() {
    try {
        if (!window.supabase) {
            throw new Error(
                "Supabase client not found. Make sure it's attached to window.supabase."
            );
        }
        const {
            data: { session },
            error,
        } = await window.supabase.auth.getSession();
        if (error) throw error;
        return session?.user || null;
    } catch (error) {
        console.error("Error getting current user:", error);
        return null;
    }
}

// Check if user is authenticated
export async function isAuthenticated() {
    const user = await getCurrentUser();
    return !!user;
}

// Redirect to login if not authenticated
export async function requireAuth() {
    const authenticated = await isAuthenticated();
    if (!authenticated) {
        window.location.href = "login.html";
        return false;
    }
    return true;
}
// Redirect to dashboard if authenticated
export async function redirectIfAuthenticated() {
    const authenticated = await isAuthenticated();
    if (authenticated) {
        window.location.href = "dashboard.html";
        return true;
    }
    return false;
}
