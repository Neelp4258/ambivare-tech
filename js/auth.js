// Authentication and Session Management System

class AuthManager {
    constructor() {
        this.currentUser = null;
        this.userType = null;
        this.loadSession();
    }

    // Load existing session from localStorage
    loadSession() {
        const session = localStorage.getItem('currentSession');
        if (session) {
            const sessionData = JSON.parse(session);
            this.currentUser = sessionData.user;
            this.userType = sessionData.userType;
        }
    }

    // Save session to localStorage
    saveSession(user, userType) {
        this.currentUser = user;
        this.userType = userType;
        const sessionData = {
            user: user,
            userType: userType,
            timestamp: Date.now()
        };
        localStorage.setItem('currentSession', JSON.stringify(sessionData));
    }

    // Clear session
    clearSession() {
        this.currentUser = null;
        this.userType = null;
        localStorage.removeItem('currentSession');
    }

    // Login function
    login(userType, username, password) {
        try {
            // Debug logging for hosted environments
            console.log('Login attempt:', { userType, username: username ? 'provided' : 'missing' });
            
            // Ensure database is available and initialized
            if (typeof db === 'undefined') {
                console.error('Database object not found');
                return { success: false, message: 'System initialization error. Please refresh the page.' };
            }
            
            // Force database initialization check
            if (typeof db.ensureInitialized === 'function') {
                const isInitialized = db.ensureInitialized();
                if (!isInitialized) {
                    console.error('Database initialization failed');
                    return { success: false, message: 'Database initialization failed. Please try again.' };
                }
            }
            
            const user = db.authenticateUser(userType, username, password);
            
            if (user) {
                console.log('Authentication successful for user:', user.username);
                this.saveSession(user, userType);
                return { success: true, user: user, userType: userType };
            } else {
                console.log('Authentication failed for:', username);
                return { success: false, message: 'Invalid credentials. Please check your username and password.' };
            }
        } catch (error) {
            console.error('Login error:', error);
            return { success: false, message: 'Login system error. Please refresh the page and try again.' };
        }
    }

    // Logout function
    logout() {
        this.clearSession();
        window.location.href = 'index.html';
    }

    // Check if user is authenticated
    isAuthenticated() {
        return this.currentUser !== null;
    }

    // Get current user
    getCurrentUser() {
        return this.currentUser;
    }

    // Get current user type
    getCurrentUserType() {
        return this.userType;
    }

    // Check if user has access to a specific portal
    hasAccess(requiredUserType) {
        return this.userType === requiredUserType;
    }

    // Redirect to appropriate portal based on user type
    redirectToPortal() {
        if (!this.isAuthenticated()) {
            window.location.href = 'index.html';
            return;
        }

        switch (this.userType) {
            case 'admin':
                window.location.href = 'admin_dashboard.html';
                break;
            case 'teachers':
                window.location.href = 'teacher_portal.html';
                break;
            case 'students':
                window.location.href = 'student_portal.html';
                break;
            default:
                window.location.href = 'index.html';
        }
    }

    // Protect pages - redirect if not authenticated
    protectPage(requiredUserType) {
        if (!this.isAuthenticated()) {
            window.location.href = 'index.html';
            return false;
        }

        if (requiredUserType && !this.hasAccess(requiredUserType)) {
            alert('Access denied. You do not have permission to view this page.');
            this.logout();
            return false;
        }

        return true;
    }

    // Update user profile
    updateProfile(updatedData) {
        if (!this.isAuthenticated()) return false;
        
        const success = db.updateUser(this.userType, this.currentUser.id, updatedData);
        if (success) {
            this.currentUser = { ...this.currentUser, ...updatedData };
            this.saveSession(this.currentUser, this.userType);
        }
        return success;
    }

    // Change password
    changePassword(oldPassword, newPassword) {
        if (!this.isAuthenticated()) return false;
        
        if (this.currentUser.password !== oldPassword) {
            return { success: false, message: 'Current password is incorrect' };
        }

        const success = this.updateProfile({ password: newPassword });
        return { success: success, message: success ? 'Password updated successfully' : 'Failed to update password' };
    }
}

// Create global auth instance
const auth = new AuthManager();

// Login form handler
function handleLogin(userType) {
    const username = document.getElementById('username').value;
    const password = document.getElementById('password').value;
    const errorMessage = document.getElementById('errorMessage');

    if (!username || !password) {
        showError('Please enter both username and password');
        return;
    }

    const result = auth.login(userType, username, password);
    
    if (result.success) {
        hideError();
        showSuccess('Login successful! Redirecting...');
        setTimeout(() => {
            auth.redirectToPortal();
        }, 1000);
    } else {
        showError(result.message || 'Invalid credentials');
    }
}

// Show error message
function showError(message) {
    const errorMessage = document.getElementById('errorMessage');
    if (errorMessage) {
        errorMessage.textContent = message;
        errorMessage.classList.remove('hidden');
    }
}

// Hide error message
function hideError() {
    const errorMessage = document.getElementById('errorMessage');
    if (errorMessage) {
        errorMessage.classList.add('hidden');
    }
}

// Show success message
function showSuccess(message) {
    const successMessage = document.getElementById('successMessage');
    if (successMessage) {
        successMessage.textContent = message;
        successMessage.classList.remove('hidden');
    }
}

// Logout function
function logout() {
    auth.logout();
}

// Initialize authentication on page load
document.addEventListener('DOMContentLoaded', function() {
    // Add logout button functionality if it exists
    const logoutBtn = document.getElementById('logoutBtn');
    if (logoutBtn) {
        logoutBtn.addEventListener('click', logout);
    }

    // Update user display if user is logged in
    if (auth.isAuthenticated()) {
        const userDisplay = document.getElementById('userDisplay');
        if (userDisplay) {
            userDisplay.textContent = `Welcome, ${auth.getCurrentUser().name || auth.getCurrentUser().username}!`;
        }
    }
}); 