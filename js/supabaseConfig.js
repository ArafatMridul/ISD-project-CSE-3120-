import { createClient } from "https://cdn.jsdelivr.net/npm/@supabase/supabase-js/+esm";

const SUPABASE_URL = "https://tjdsuuynhsaeytzawuwn.supabase.co";
const SUPABASE_ANON_KEY =
    "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6InRqZHN1dXluaHNhZXl0emF3dXduIiwicm9sZSI6ImFub24iLCJpYXQiOjE3NTcxNDI0MDIsImV4cCI6MjA3MjcxODQwMn0.ADb2oZKk-pyT_11jCTaWZuc3EJ_XEjT1Nv1UEHe0v_Y";

// Initialize Supabase client
window.supabase = createClient(SUPABASE_URL, SUPABASE_ANON_KEY);

// Simple session management
window.SessionManager = {
    setUser(userData) {
        localStorage.setItem("currentUser", JSON.stringify(userData));
    },
    getUser() {
        const userData = localStorage.getItem("currentUser");
        return userData ? JSON.parse(userData) : null;
    },
    clearUser() {
        localStorage.removeItem("currentUser");
    },
    isLoggedIn() {
        return this.getUser() !== null;
    },
};

export async function signup(name, email, password) {
    try {
        // Insert user into Supabase
        const { data, error } = await supabase
            .from("users")
            .insert([{ fullname: name, email, password }]) // table columns: fullname, email, password
            .select();
        if (error) {
            throw new Error(error.message);
        }
        // Save user session
        SessionManager.setUser(data[0]);
        return { success: true, user: data[0] };
    } catch (err) {
        console.error(err);
        return { success: false, error: err.message };
    }
}

window.supabase = supabase;
window.SessionManager = SessionManager;
