// Main JavaScript file for DazzloCore X

// Animation and UI Functions
function reveal() {
    const reveals = document.querySelectorAll(".reveal");
    for (let i = 0; i < reveals.length; i++) {
        const windowHeight = window.innerHeight;
        const elementTop = reveals[i].getBoundingClientRect().top;
        const elementVisible = 150;
        
        if (elementTop < windowHeight - elementVisible) {
            reveals[i].classList.add("active");
        } else {
            reveals[i].classList.remove("active");
        }
    }
}

// Initialize animations
document.addEventListener('DOMContentLoaded', function() {
    // Initialize reveal animations
    reveal();
    window.addEventListener("scroll", reveal);
    
    // Initialize tooltips
    initializeTooltips();
    
    // Initialize form validations
    initializeFormValidations();
    
    // Initialize search functionality
    initializeSearch();
});

// Tooltip functionality
function initializeTooltips() {
    const tooltipElements = document.querySelectorAll('[data-tooltip]');
    tooltipElements.forEach(element => {
        element.addEventListener('mouseenter', showTooltip);
        element.addEventListener('mouseleave', hideTooltip);
    });
}

function showTooltip(event) {
    const tooltip = event.target.getAttribute('data-tooltip');
    if (!tooltip) return;
    
    const tooltipElement = document.createElement('div');
    tooltipElement.className = 'tooltip';
    tooltipElement.textContent = tooltip;
    tooltipElement.style.cssText = `
        position: absolute;
        background: #1f2937;
        color: white;
        padding: 8px 12px;
        border-radius: 6px;
        font-size: 14px;
        z-index: 1000;
        pointer-events: none;
        white-space: nowrap;
    `;
    
    document.body.appendChild(tooltipElement);
    
    const rect = event.target.getBoundingClientRect();
    tooltipElement.style.left = rect.left + (rect.width / 2) - (tooltipElement.offsetWidth / 2) + 'px';
    tooltipElement.style.top = rect.top - tooltipElement.offsetHeight - 8 + 'px';
}

function hideTooltip() {
    const tooltips = document.querySelectorAll('.tooltip');
    tooltips.forEach(tooltip => tooltip.remove());
}

// Form validation
function initializeFormValidations() {
    const forms = document.querySelectorAll('form[data-validate]');
    forms.forEach(form => {
        form.addEventListener('submit', validateForm);
        
        // Real-time validation
        const inputs = form.querySelectorAll('input, select, textarea');
        inputs.forEach(input => {
            input.addEventListener('blur', () => validateField(input));
            input.addEventListener('input', () => clearFieldError(input));
        });
    });
}

function validateForm(event) {
    const form = event.target;
    const inputs = form.querySelectorAll('input[required], select[required], textarea[required]');
    let isValid = true;
    
    inputs.forEach(input => {
        if (!validateField(input)) {
            isValid = false;
        }
    });
    
    if (!isValid) {
        event.preventDefault();
        showNotification('Please fill in all required fields correctly.', 'error');
    }
    
    return isValid;
}

function validateField(field) {
    const value = field.value.trim();
    const type = field.type;
    const required = field.hasAttribute('required');
    
    // Clear previous error
    clearFieldError(field);
    
    // Check if required field is empty
    if (required && !value) {
        showFieldError(field, 'This field is required.');
        return false;
    }
    
    // Validate email
    if (type === 'email' && value) {
        const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
        if (!emailRegex.test(value)) {
            showFieldError(field, 'Please enter a valid email address.');
            return false;
        }
    }
    
    // Validate phone
    if (field.name === 'phone' && value) {
        const phoneRegex = /^[\+]?[1-9][\d]{0,15}$/;
        if (!phoneRegex.test(value.replace(/\s/g, ''))) {
            showFieldError(field, 'Please enter a valid phone number.');
            return false;
        }
    }
    
    // Validate password strength
    if (type === 'password' && value) {
        if (value.length < 6) {
            showFieldError(field, 'Password must be at least 6 characters long.');
            return false;
        }
    }
    
    return true;
}

function showFieldError(field, message) {
    field.classList.add('border-red-500');
    
    const errorDiv = document.createElement('div');
    errorDiv.className = 'field-error text-red-600 text-sm mt-1';
    errorDiv.textContent = message;
    
    field.parentNode.appendChild(errorDiv);
}

function clearFieldError(field) {
    field.classList.remove('border-red-500');
    
    const errorDiv = field.parentNode.querySelector('.field-error');
    if (errorDiv) {
        errorDiv.remove();
    }
}

// Search functionality
function initializeSearch() {
    const searchInputs = document.querySelectorAll('[data-search]');
    searchInputs.forEach(input => {
        input.addEventListener('input', handleSearch);
    });
}

function handleSearch(event) {
    const searchTerm = event.target.value.toLowerCase();
    const searchTarget = event.target.getAttribute('data-search');
    const targetElements = document.querySelectorAll(searchTarget);
    
    targetElements.forEach(element => {
        const text = element.textContent.toLowerCase();
        if (text.includes(searchTerm)) {
            element.style.display = '';
        } else {
            element.style.display = 'none';
        }
    });
}

// Notification system
function showNotification(message, type = 'info', duration = 3000) {
    const notification = document.createElement('div');
    notification.className = `notification notification-${type} fixed top-4 right-4 z-50 p-4 rounded-lg shadow-lg transform transition-all duration-300 translate-x-full`;
    
    const colors = {
        success: 'bg-green-500 text-white',
        error: 'bg-red-500 text-white',
        warning: 'bg-yellow-500 text-white',
        info: 'bg-blue-500 text-white'
    };
    
    notification.className += ` ${colors[type]}`;
    notification.innerHTML = `
        <div class="flex items-center">
            <span class="mr-2">${getNotificationIcon(type)}</span>
            <span>${message}</span>
            <button onclick="this.parentElement.parentElement.remove()" class="ml-4 text-white hover:text-gray-200">
                <i class="fas fa-times"></i>
            </button>
        </div>
    `;
    
    document.body.appendChild(notification);
    
    // Animate in
    setTimeout(() => {
        notification.classList.remove('translate-x-full');
    }, 100);
    
    // Auto remove
    setTimeout(() => {
        notification.classList.add('translate-x-full');
        setTimeout(() => {
            if (notification.parentNode) {
                notification.remove();
            }
        }, 300);
    }, duration);
}

function getNotificationIcon(type) {
    const icons = {
        success: '<i class="fas fa-check-circle"></i>',
        error: '<i class="fas fa-exclamation-circle"></i>',
        warning: '<i class="fas fa-exclamation-triangle"></i>',
        info: '<i class="fas fa-info-circle"></i>'
    };
    return icons[type] || icons.info;
}

// Data export functionality
function exportToCSV(data, filename) {
    const csvContent = convertToCSV(data);
    const blob = new Blob([csvContent], { type: 'text/csv;charset=utf-8;' });
    const link = document.createElement('a');
    
    if (link.download !== undefined) {
        const url = URL.createObjectURL(blob);
        link.setAttribute('href', url);
        link.setAttribute('download', filename);
        link.style.visibility = 'hidden';
        document.body.appendChild(link);
        link.click();
        document.body.removeChild(link);
    }
}

function convertToCSV(data) {
    if (data.length === 0) return '';
    
    const headers = Object.keys(data[0]);
    const csvRows = [headers.join(',')];
    
    data.forEach(row => {
        const values = headers.map(header => {
            const value = row[header];
            return `"${value}"`;
        });
        csvRows.push(values.join(','));
    });
    
    return csvRows.join('\n');
}

// Date utilities
function formatDate(date) {
    return new Date(date).toLocaleDateString('en-US', {
        year: 'numeric',
        month: 'short',
        day: 'numeric'
    });
}

function formatDateTime(date) {
    return new Date(date).toLocaleString('en-US', {
        year: 'numeric',
        month: 'short',
        day: 'numeric',
        hour: '2-digit',
        minute: '2-digit'
    });
}

function getDaysUntil(date) {
    const today = new Date();
    const targetDate = new Date(date);
    const diffTime = targetDate - today;
    const diffDays = Math.ceil(diffTime / (1000 * 60 * 60 * 24));
    return diffDays;
}

// Utility functions
function debounce(func, wait) {
    let timeout;
    return function executedFunction(...args) {
        const later = () => {
            clearTimeout(timeout);
            func(...args);
        };
        clearTimeout(timeout);
        timeout = setTimeout(later, wait);
    };
}

function throttle(func, limit) {
    let inThrottle;
    return function() {
        const args = arguments;
        const context = this;
        if (!inThrottle) {
            func.apply(context, args);
            inThrottle = true;
            setTimeout(() => inThrottle = false, limit);
        }
    };
}

// Local storage utilities
function saveToLocalStorage(key, data) {
    try {
        localStorage.setItem(key, JSON.stringify(data));
        return true;
    } catch (error) {
        console.error('Error saving to localStorage:', error);
        return false;
    }
}

function getFromLocalStorage(key, defaultValue = null) {
    try {
        const item = localStorage.getItem(key);
        return item ? JSON.parse(item) : defaultValue;
    } catch (error) {
        console.error('Error reading from localStorage:', error);
        return defaultValue;
    }
}

// Theme management
function initializeTheme() {
    const theme = getFromLocalStorage('theme', 'light');
    setTheme(theme);
    
    const themeToggle = document.getElementById('theme-toggle');
    if (themeToggle) {
        themeToggle.addEventListener('click', toggleTheme);
    }
}

function setTheme(theme) {
    document.documentElement.setAttribute('data-theme', theme);
    saveToLocalStorage('theme', theme);
}

function toggleTheme() {
    const currentTheme = getFromLocalStorage('theme', 'light');
    const newTheme = currentTheme === 'light' ? 'dark' : 'light';
    setTheme(newTheme);
}

// Initialize theme on page load
document.addEventListener('DOMContentLoaded', function() {
    initializeTheme();
});

// Global error handler
window.addEventListener('error', function(event) {
    console.error('Global error:', event.error);
    // Only show notification if showNotification function exists
    if (typeof showNotification === 'function') {
        showNotification('An error occurred. Please try again.', 'error');
    }
});

// Unhandled promise rejection handler
window.addEventListener('unhandledrejection', function(event) {
    console.error('Unhandled promise rejection:', event.reason);
    // Only show notification if showNotification function exists
    if (typeof showNotification === 'function') {
        showNotification('An error occurred. Please try again.', 'error');
    }
}); 

// Modal functions for portal compatibility
function openModal(modalId) {
    const modal = document.getElementById(modalId);
    if (modal) {
        modal.classList.remove('hidden');
        // Add backdrop blur effect
        document.body.style.overflow = 'hidden';
        
        // Populate modal data if needed
        populateModalData(modalId);
    }
}

function populateModalData(modalId) {
    switch (modalId) {
        case 'addTeacherModal':
            resetSubjectFields();
            populateTeacherModal();
            break;
        case 'editTeacherModal':
            populateTeacherModal();
            break;
        case 'addClassModal':
        case 'editClassModal':
            populateClassModal();
            break;
        case 'addCandidateModal':
        case 'editCandidateModal':
            populateCandidateModal();
            break;
        case 'addTaskModal':
        case 'editTaskModal':
            populateTaskModal();
            break;
        case 'addTimetableModal':
            populateTimetableModal();
            break;
        case 'addExamModal':
        case 'editExamModal':
            populateExamModal();
            break;
        case 'addAssignmentModal':
            populateAssignmentModal();
            break;
        case 'takeAttendanceModal':
            populateAttendanceModal();
            break;
        case 'attendanceReportModal':
            populateReportModal();
            break;
    }
}

// Populate class modal with teacher options
function populateClassModal() {
    const teacherSelect = document.getElementById('classTeacher');
    const editTeacherSelect = document.getElementById('editClassTeacher');
    
    if (teacherSelect) {
        const teachers = db.getData('teachers');
        teacherSelect.innerHTML = '<option value="">Select Teacher (Optional)</option>';
        teachers.forEach(teacher => {
            teacherSelect.innerHTML += `<option value="${teacher.id}">${teacher.name} - ${teacher.subject}</option>`;
        });
    }
    
    if (editTeacherSelect) {
        const teachers = db.getData('teachers');
        editTeacherSelect.innerHTML = '<option value="">Select Teacher (Optional)</option>';
        teachers.forEach(teacher => {
            editTeacherSelect.innerHTML += `<option value="${teacher.id}">${teacher.name} - ${teacher.subject}</option>`;
        });
    }
}

// Populate candidate modal with class options
function populateCandidateModal() {
    const classSelect = document.getElementById('candidateClass');
    if (classSelect) {
        const classes = db.getClasses();
        classSelect.innerHTML = '<option value="">Select Class</option>';
        classes.forEach(cls => {
            classSelect.innerHTML += `<option value="${cls.id}">${cls.name} - ${cls.subject || 'No Subject'}</option>`;
        });
    }
}

// Populate task modal with class options
function populateTaskModal() {
    const classSelect = document.getElementById('taskClass');
    const editClassSelect = document.getElementById('editTaskClass');
    
    if (classSelect) {
        const classes = db.getClasses();
        classSelect.innerHTML = '<option value="">Select Class</option>';
        classes.forEach(cls => {
            classSelect.innerHTML += `<option value="${cls.id}">${cls.name} - ${cls.subject || 'No Subject'}</option>`;
        });
    }
    
    if (editClassSelect) {
        const classes = db.getClasses();
        editClassSelect.innerHTML = '<option value="">Select Class</option>';
        classes.forEach(cls => {
            editClassSelect.innerHTML += `<option value="${cls.id}">${cls.name} - ${cls.subject || 'No Subject'}</option>`;
        });
    }
}

// Populate timetable modal with class and teacher options
function populateTimetableModal() {
    const classSelect = document.getElementById('ttClass');
    const teacherSelect = document.getElementById('ttTeacher');
    
    if (classSelect) {
        const classes = db.getClasses();
        classSelect.innerHTML = '<option value="">Select Class</option>';
        classes.forEach(cls => {
            classSelect.innerHTML += `<option value="${cls.id}">${cls.name} - ${cls.subject || 'No Subject'}</option>`;
        });
    }
    
    if (teacherSelect) {
        const teachers = db.getData('teachers');
        teacherSelect.innerHTML = '<option value="">Select Teacher</option>';
        teachers.forEach(teacher => {
            const subjects = teacher.subjects ? teacher.subjects.join(', ') : teacher.subject || 'No Subject';
            teacherSelect.innerHTML += `<option value="${teacher.id}">${teacher.name} - ${subjects}</option>`;
        });
    }
}

// Populate exam modal with class options
function populateExamModal() {
    const classSelect = document.getElementById('examClass');
    const editClassSelect = document.getElementById('editExamClass');
    
    if (classSelect) {
        const classes = db.getClasses();
        classSelect.innerHTML = '<option value="">Select Class</option>';
        classes.forEach(cls => {
            classSelect.innerHTML += `<option value="${cls.id}">${cls.name} - ${cls.subject || 'No Subject'}</option>`;
        });
    }
    
    if (editClassSelect) {
        const classes = db.getClasses();
        editClassSelect.innerHTML = '<option value="">Select Class</option>';
        classes.forEach(cls => {
            editClassSelect.innerHTML += `<option value="${cls.id}">${cls.name} - ${cls.subject || 'No Subject'}</option>`;
        });
    }
}

function closeModal(modalId) {
    const modal = document.getElementById(modalId);
    if (modal) {
        modal.classList.add('hidden');
        // Remove backdrop blur effect
        document.body.style.overflow = 'auto';
    }
}

// Close modal when clicking outside
document.addEventListener('click', (e) => {
    if (e.target.classList.contains('modal-backdrop')) {
        e.target.classList.add('hidden');
        document.body.style.overflow = 'auto';
    }
});

// Close modal with Escape key
document.addEventListener('keydown', (e) => {
    if (e.key === 'Escape') {
        const openModals = document.querySelectorAll('.modal-backdrop:not(.hidden)');
        openModals.forEach(modal => {
            modal.classList.add('hidden');
            document.body.style.overflow = 'auto';
        });
    }
}); 

// Form submission handlers for admin portal
document.addEventListener('DOMContentLoaded', function() {
    // Add Teacher Form Handler
    const addTeacherForm = document.getElementById('addTeacherForm');
    if (addTeacherForm) {
        addTeacherForm.addEventListener('submit', function(e) {
            e.preventDefault();
            
            // Get all subject values
            const subjects = getAllSubjectValues('teacher');
            
            if (subjects.length === 0) {
                showNotification('Please enter at least one subject.', 'error');
                return;
            }
            
            const teacherData = {
                name: document.getElementById('teacherName').value,
                subject: subjects[0], // Keep for backward compatibility
                subjects: subjects, // New array of all subjects
                classId: document.getElementById('teacherClass').value || null, // Class assignment
                username: document.getElementById('teacherUsername').value,
                password: document.getElementById('teacherPassword').value,
                email: `${document.getElementById('teacherUsername').value}@institute.com`,
                phone: '+91 98765 43210'
            };
            
            if (db.addUser('teachers', teacherData)) {
                showNotification('Teacher added successfully!', 'success');
                closeModal('addTeacherModal');
                addTeacherForm.reset();
                resetSubjectFields(); // Reset the subject fields
                loadTeachersList();
                updateDashboardStats();
            } else {
                showNotification('Failed to add teacher. Please try again.', 'error');
            }
        });
    }

    // Add Candidate Form Handler
    const addCandidateForm = document.getElementById('addCandidateForm');
    if (addCandidateForm) {
        addCandidateForm.addEventListener('submit', function(e) {
            e.preventDefault();
            
            const candidateData = {
                name: document.getElementById('candidateName').value,
                classId: document.getElementById('candidateClass').value,
                username: document.getElementById('candidateUsername').value,
                password: document.getElementById('candidatePassword').value,
                email: document.getElementById('candidateEmail').value || `${document.getElementById('candidateUsername').value}@student.com`,
                phone: document.getElementById('candidatePhone').value || '+91 98765 43210'
            };
            
            if (db.addUser('students', candidateData)) {
                // Update class student count
                db.updateClassStudentCount();
                
                showNotification('Student added successfully!', 'success');
                closeModal('addCandidateModal');
                addCandidateForm.reset();
                if (window.portalManager) {
                    window.portalManager.loadStudents();
                    window.portalManager.updateDashboardStats();
                }
            } else {
                showNotification('Failed to add student. Please try again.', 'error');
            }
        });
    }

    // Add Class Form Handler
    const addClassForm = document.getElementById('addClassForm');
    if (addClassForm) {
        addClassForm.addEventListener('submit', function(e) {
            e.preventDefault();
            
            const classData = {
                name: document.getElementById('className').value,
                subject: document.getElementById('classSubject').value || '',
                description: document.getElementById('classDescription').value || '',
                teacherId: document.getElementById('classTeacher').value || null
            };
            
            if (db.addClass(classData)) {
                showNotification('Class added successfully!', 'success');
                closeModal('addClassModal');
                addClassForm.reset();
                if (window.portalManager) {
                    window.portalManager.loadClasses();
                }
            } else {
                showNotification('Failed to add class. Please try again.', 'error');
            }
        });
    }





    // Add Task/Homework Form Handler
    const addTaskForm = document.getElementById('addTaskForm');
    if (addTaskForm) {
        addTaskForm.addEventListener('submit', function(e) {
            e.preventDefault();
            
            const taskData = {
                title: document.getElementById('taskTitle').value || 'Homework Assignment',
                description: document.getElementById('taskDesc').value,
                classId: document.getElementById('taskClass').value,
                dueDate: document.getElementById('taskDueDate').value,
                subject: document.getElementById('taskSubject').value || '',
                teacherId: auth.getCurrentUser().id,
                status: 'pending',
                assignedDate: new Date().toISOString().split('T')[0]
            };
            
            if (db.addClassHomework(taskData)) {
                showNotification('Homework assigned to class successfully!', 'success');
                closeModal('addTaskModal');
                addTaskForm.reset();
                loadTasksList();
                updateDashboardStats();
            } else {
                showNotification('Failed to assign homework. Please try again.', 'error');
            }
        });
    }

    // Add Timetable Form Handler
    const addTimetableForm = document.getElementById('addTimetableForm');
    if (addTimetableForm) {
        addTimetableForm.addEventListener('submit', function(e) {
            e.preventDefault();
            
            const dayNames = ['Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday'];
            const timetableData = {
                time: document.getElementById('ttTime').value,
                day: dayNames[parseInt(document.getElementById('ttDay').value) - 1],
                subject: document.getElementById('ttSubject').value,
                classId: document.getElementById('ttClass').value,
                teacherId: document.getElementById('ttTeacher').value,
                room: document.getElementById('ttRoom').value || 'Room TBD'
            };
            
            if (db.addTimetableEntry(timetableData)) {
                showNotification('Timetable entry added successfully!', 'success');
                closeModal('addTimetableModal');
                addTimetableForm.reset();
                loadTimetable();
            } else {
                showNotification('Failed to add timetable entry. Please try again.', 'error');
            }
        });
    }

    // Add Exam Form Handler
    const addExamForm = document.getElementById('addExamForm');
    if (addExamForm) {
        addExamForm.addEventListener('submit', function(e) {
            e.preventDefault();
            
            const examData = {
                title: document.getElementById('examName').value,
                subject: document.getElementById('examSubject').value,
                classId: document.getElementById('examClass').value,
                date: document.getElementById('examDate').value,
                time: document.getElementById('examTime').value,
                duration: document.getElementById('examDuration').value || '2 hours',
                totalMarks: document.getElementById('examMarks').value || 100,
                teacherId: auth.getCurrentUser().id
            };
            
            if (db.addExam(examData)) {
                showNotification('Exam scheduled successfully!', 'success');
                closeModal('addExamModal');
                addExamForm.reset();
                loadExamsList();
                updateDashboardStats();
            } else {
                showNotification('Failed to add exam. Please try again.', 'error');
            }
        });
    }
});

// Multiple subjects management functions
let subjectFieldCounter = 1;
let editSubjectFieldCounter = 1;

function addSubjectField() {
    subjectFieldCounter++;
    const container = document.getElementById('additionalSubjects');
    const newField = document.createElement('div');
    newField.className = 'flex items-center space-x-2';
    newField.innerHTML = `
        <input type="text" id="teacherSubject${subjectFieldCounter}" class="flex-1 p-2 border rounded" placeholder="e.g., Science">
        <button type="button" onclick="removeSubjectField(this)" class="px-3 py-2 bg-red-500 text-white rounded hover:bg-red-600">
            <i class="fas fa-minus"></i>
        </button>
    `;
    container.appendChild(newField);
}

function addEditSubjectField() {
    editSubjectFieldCounter++;
    const container = document.getElementById('editAdditionalSubjects');
    const newField = document.createElement('div');
    newField.className = 'flex items-center space-x-2';
    newField.innerHTML = `
        <input type="text" id="editTeacherSubject${editSubjectFieldCounter}" class="flex-1 p-2 border rounded" placeholder="e.g., Science">
        <button type="button" onclick="removeEditSubjectField(this)" class="px-3 py-2 bg-red-500 text-white rounded hover:bg-red-600">
            <i class="fas fa-minus"></i>
        </button>
    `;
    container.appendChild(newField);
}

function removeSubjectField(button) {
    button.parentElement.remove();
}

function removeEditSubjectField(button) {
    button.parentElement.remove();
}

function resetSubjectFields() {
    // Reset add teacher modal
    subjectFieldCounter = 1;
    const additionalSubjects = document.getElementById('additionalSubjects');
    if (additionalSubjects) {
        additionalSubjects.innerHTML = '';
    }
    
    // Reset edit teacher modal
    editSubjectFieldCounter = 1;
    const editAdditionalSubjects = document.getElementById('editAdditionalSubjects');
    if (editAdditionalSubjects) {
        editAdditionalSubjects.innerHTML = '';
    }
}

function getAllSubjectValues(prefix) {
    const subjects = [];
    
    // Get the first subject (always required)
    const firstSubject = document.getElementById(`${prefix}Subject1`);
    if (firstSubject && firstSubject.value.trim()) {
        subjects.push(firstSubject.value.trim());
    }
    
    // Get additional subjects
    let counter = 2;
    while (true) {
        const subjectField = document.getElementById(`${prefix}Subject${counter}`);
        if (!subjectField) break;
        
        if (subjectField.value.trim()) {
            subjects.push(subjectField.value.trim());
        }
        counter++;
    }
    
    return subjects;
}

// Modal population functions
function populateClassModal() {
    const teacherSelect = document.getElementById('classTeacher');
    const editTeacherSelect = document.getElementById('editClassTeacher');
    
    if (teacherSelect) {
        const teachers = db.getData('teachers');
        teacherSelect.innerHTML = '<option value="">Select Teacher (Optional)</option>';
        teachers.forEach(teacher => {
            const subjects = teacher.subjects ? teacher.subjects.join(', ') : teacher.subject || 'No Subject';
            teacherSelect.innerHTML += `<option value="${teacher.id}">${teacher.name} - ${subjects}</option>`;
        });
    }
    
    if (editTeacherSelect) {
        const teachers = db.getData('teachers');
        editTeacherSelect.innerHTML = '<option value="">Select Teacher (Optional)</option>';
        teachers.forEach(teacher => {
            const subjects = teacher.subjects ? teacher.subjects.join(', ') : teacher.subject || 'No Subject';
            editTeacherSelect.innerHTML += `<option value="${teacher.id}">${teacher.name} - ${subjects}</option>`;
        });
    }
}

function populateTeacherModal() {
    const classSelect = document.getElementById('teacherClass');
    const editClassSelect = document.getElementById('editTeacherClass');
    
    if (classSelect) {
        const classes = db.getClasses();
        classSelect.innerHTML = '<option value="">Select Class (Optional)</option>';
        classes.forEach(cls => {
            classSelect.innerHTML += `<option value="${cls.id}">${cls.name} - ${cls.subject || 'No Subject'}</option>`;
        });
    }
    
    if (editClassSelect) {
        const classes = db.getClasses();
        editClassSelect.innerHTML = '<option value="">Select Class (Optional)</option>';
        classes.forEach(cls => {
            editClassSelect.innerHTML += `<option value="${cls.id}">${cls.name} - ${cls.subject || 'No Subject'}</option>`;
        });
    }
}

function populateCandidateModal() {
    const classSelect = document.getElementById('candidateClass');
    const editClassSelect = document.getElementById('editCandidateClass');
    
    if (classSelect) {
        const classes = db.getClasses();
        classSelect.innerHTML = '<option value="">Select Class</option>';
        classes.forEach(cls => {
            classSelect.innerHTML += `<option value="${cls.id}">${cls.name} - ${cls.subject || 'No Subject'}</option>`;
        });
    }
    
    if (editClassSelect) {
        const classes = db.getClasses();
        editClassSelect.innerHTML = '<option value="">Select Class</option>';
        classes.forEach(cls => {
            editClassSelect.innerHTML += `<option value="${cls.id}">${cls.name} - ${cls.subject || 'No Subject'}</option>`;
        });
    }
}

function populateAssignmentModal() {
    const studentSelect = document.getElementById('assignmentStudents');
    if (studentSelect) {
        const students = db.getData('students');
        studentSelect.innerHTML = '';
        students.forEach(student => {
            const classInfo = student.classId ? db.getClassById(student.classId) : null;
            const displayName = `${student.name} (${classInfo ? classInfo.name : 'No Class'})`;
            studentSelect.innerHTML += `<option value="${student.id}">${displayName}</option>`;
        });
    }
}



function populateAttendanceModal() {
    const classSelect = document.getElementById('attendanceClass');
    const dateInput = document.getElementById('attendanceDate');
    
    if (dateInput) {
        dateInput.value = new Date().toISOString().split('T')[0];
    }
    
    if (classSelect) {
        const classes = db.getClasses();
        classSelect.innerHTML = '<option value="">Select Class</option>';
        classes.forEach(cls => {
            classSelect.innerHTML += `<option value="${cls.id}">${cls.name} - ${cls.subject}</option>`;
        });
    }
}

function populateReportModal() {
    const classSelect = document.getElementById('reportClass');
    const dateFromInput = document.getElementById('reportDateFrom');
    const dateToInput = document.getElementById('reportDateTo');
    
    if (dateFromInput) {
        dateFromInput.value = new Date().toISOString().split('T')[0];
    }
    
    if (dateToInput) {
        dateToInput.value = new Date().toISOString().split('T')[0];
    }
    
    if (classSelect) {
        const classes = db.getClasses();
        classSelect.innerHTML = '<option value="">Select Class</option>';
        classes.forEach(cls => {
            classSelect.innerHTML += `<option value="${cls.id}">${cls.name} - ${cls.subject}</option>`;
        });
    }
}

// Load data functions
function loadTeachersList() {
    if (typeof db === 'undefined') return;
    
    const teachers = db.getData('teachers');
    const teachersList = document.getElementById('teacher-list');
    const teachersEmpty = document.getElementById('teachers-empty');
    
    if (!teachersList) return;
    
    if (teachers.length === 0) {
        teachersList.innerHTML = '';
        teachersEmpty.style.display = 'block';
    } else {
        teachersEmpty.style.display = 'none';
        teachersList.innerHTML = teachers.map(teacher => {
            const subjects = teacher.subjects ? teacher.subjects.join(', ') : teacher.subject || 'No Subject';
            const classInfo = teacher.classId ? db.getClassById(teacher.classId) : null;
            const className = classInfo ? classInfo.name : 'No Class Assigned';
            
            return `
                <tr>
                    <td class="p-3">${teacher.name}</td>
                    <td class="p-3">
                        <div class="flex flex-wrap gap-1">
                            ${teacher.subjects ? teacher.subjects.map(subject => 
                                `<span class="px-2 py-1 bg-blue-100 text-blue-800 text-xs rounded">${subject}</span>`
                            ).join('') : 
                            `<span class="px-2 py-1 bg-gray-100 text-gray-800 text-xs rounded">${teacher.subject || 'No Subject'}</span>`
                            }
                        </div>
                    </td>
                    <td class="p-3">
                        <span class="px-2 py-1 bg-green-100 text-green-800 text-xs rounded">${className}</span>
                    </td>
                    <td class="p-3">${teacher.username}</td>
                    <td class="p-3">
                        <button onclick="editTeacher('${teacher.id}')" class="text-blue-600 hover:text-blue-800 mr-2" title="Edit Teacher">
                            <i class="fas fa-edit"></i>
                        </button>
                        <button onclick="deleteTeacher('${teacher.id}')" class="text-red-600 hover:text-red-800" title="Delete Teacher">
                            <i class="fas fa-trash"></i>
                        </button>
                    </td>
                </tr>
            `;
        }).join('');
    }
}

function loadStudentsList() {
    if (typeof db === 'undefined') return;
    
    const students = db.getData('students');
    const studentsList = document.getElementById('candidate-list');
    const studentsEmpty = document.getElementById('candidates-empty');
    
    if (!studentsList) return;
    
    if (students.length === 0) {
        studentsList.innerHTML = '';
        studentsEmpty.style.display = 'block';
    } else {
        studentsEmpty.style.display = 'none';
        studentsList.innerHTML = students.map(student => {
            const classInfo = student.classId ? db.getClassById(student.classId) : null;
            
            return `
                <tr>
                    <td class="p-3">${student.name}</td>
                    <td class="p-3">${classInfo ? classInfo.name : 'Not Assigned'}</td>
                    <td class="p-3">${student.email || 'No Email'}</td>
                    <td class="p-3">${student.username}</td>
                    <td class="p-3">
                        <button onclick="editStudent('${student.id}')" class="text-blue-600 hover:text-blue-800 mr-2" title="Edit Student">
                            <i class="fas fa-edit"></i>
                        </button>
                        <button onclick="deleteStudent('${student.id}')" class="text-red-600 hover:text-red-800" title="Delete Student">
                            <i class="fas fa-trash"></i>
                        </button>
                    </td>
                </tr>
            `;
        }).join('');
    }
}

function loadTasksList() {
    if (typeof db === 'undefined') return;
    
    const tasks = db.getData('homework');
    const tasksList = document.getElementById('task-list');
    const tasksEmpty = document.getElementById('tasks-empty');
    
    if (!tasksList) return;
    
    if (tasks.length === 0) {
        tasksList.innerHTML = '';
        tasksEmpty.style.display = 'block';
    } else {
        tasksEmpty.style.display = 'none';
        tasksList.innerHTML = tasks.map(task => {
            const classInfo = task.classId ? db.getClassById(task.classId) : null;
            const teacher = task.teacherId ? db.getUserById('teachers', task.teacherId) : null;
            
            return `
                <tr>
                    <td class="p-3">${task.title || task.description}</td>
                    <td class="p-3">${classInfo ? classInfo.name : 'Unassigned'}</td>
                    <td class="p-3">${task.subject || classInfo?.subject || 'No Subject'}</td>
                    <td class="p-3">${task.dueDate}</td>
                    <td class="p-3">
                        <div class="w-full bg-gray-200 rounded-full h-2">
                            <div class="bg-blue-500 h-2 rounded-full" style="width: 0%"></div>
                        </div>
                        <span class="text-xs text-gray-600">0/0</span>
                    </td>
                    <td class="p-3">
                        <span class="px-2 py-1 rounded text-sm ${task.status === 'completed' ? 'bg-green-100 text-green-800' : 'bg-yellow-100 text-yellow-800'}">
                            ${task.status || 'pending'}
                        </span>
                    </td>
                    <td class="p-3">
                        <button onclick="editTask('${task.id}')" class="text-blue-600 hover:text-blue-800 mr-2" title="Edit Task">
                            <i class="fas fa-edit"></i>
                        </button>
                        <button onclick="deleteTask('${task.id}')" class="text-red-600 hover:text-red-800" title="Delete Task">
                            <i class="fas fa-trash"></i>
                        </button>
                    </td>
                </tr>
            `;
        }).join('');
    }
}

function loadTimetable() {
    if (typeof db === 'undefined') return;
    
    const timetables = db.getData('timetables');
    const timetableBody = document.getElementById('timetable-body');
    const timetableEmpty = document.getElementById('timetable-empty');
    
    if (!timetableBody) return;
    
    if (timetables.length === 0) {
        timetableBody.innerHTML = '';
        timetableEmpty.style.display = 'block';
    } else {
        timetableEmpty.style.display = 'none';
        
        // Group by time slots
        const timeSlots = ['09:00-10:00', '10:00-11:00', '11:00-12:00', '14:00-15:00', '15:00-16:00'];
        const days = ['Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday'];

        let tableHTML = '';
        timeSlots.forEach(timeSlot => {
            tableHTML += '<tr>';
            tableHTML += `<td class="p-3 font-semibold">${timeSlot}</td>`;
            
            days.forEach(day => {
                const entry = timetables.find(t => t.time === timeSlot && t.day === day);
                if (entry) {
                    tableHTML += `<td class="p-3 bg-blue-50 rounded">${entry.subject}<br><small class="text-gray-600">${entry.room || 'Room 101'}</small></td>`;
                } else {
                    tableHTML += '<td class="p-3"></td>';
                }
            });
            
            tableHTML += '</tr>';
        });

        timetableBody.innerHTML = tableHTML;
    }
}

function loadExamsList() {
    if (typeof db === 'undefined') return;
    
    const exams = db.getData('exams');
    const examsList = document.getElementById('exams-list');
    const examsEmpty = document.getElementById('exams-empty');
    
    if (!examsList) return;
    
    if (exams.length === 0) {
        examsList.innerHTML = '';
        examsEmpty.style.display = 'block';
    } else {
        examsEmpty.style.display = 'none';
        examsList.innerHTML = exams.map(exam => {
            const classInfo = exam.classId ? db.getClassById(exam.classId) : null;
            const teacher = exam.teacherId ? db.getUserById('teachers', exam.teacherId) : null;
            
            return `
                <tr>
                    <td class="p-3">${exam.title}</td>
                    <td class="p-3">${classInfo ? classInfo.name : 'No Class'}</td>
                    <td class="p-3">${exam.subject || classInfo?.subject || 'No Subject'}</td>
                    <td class="p-3">${exam.date}</td>
                    <td class="p-3">${exam.time}</td>
                    <td class="p-3">${exam.totalMarks || 100}</td>
                    <td class="p-3">${teacher ? teacher.name : 'No Teacher'}</td>
                    <td class="p-3">
                        <button onclick="editExam('${exam.id}')" class="text-blue-600 hover:text-blue-800 mr-2" title="Edit Exam">
                            <i class="fas fa-edit"></i>
                        </button>
                        <button onclick="deleteExam('${exam.id}')" class="text-red-600 hover:text-red-800" title="Delete Exam">
                            <i class="fas fa-trash"></i>
                        </button>
                    </td>
                </tr>
            `;
        }).join('');
    }
}

function updateDashboardStats() {
    if (typeof db === 'undefined') return;
    
    const stats = db.getDashboardStats();
    
    const teacherCount = document.getElementById('teacher-count');
    const candidateCount = document.getElementById('candidate-count');
    const assignmentCount = document.getElementById('assignment-count');
    const submissionCount = document.getElementById('submission-count');
    
    if (teacherCount) teacherCount.textContent = stats.totalTeachers;
    if (candidateCount) candidateCount.textContent = stats.totalStudents;
    if (assignmentCount) assignmentCount.textContent = stats.totalHomework;
    if (submissionCount) submissionCount.textContent = stats.totalSubmissions;
}

// Initialize data loading when page loads
document.addEventListener('DOMContentLoaded', function() {
    // Wait for db to be available
    if (typeof db !== 'undefined') {
        // Load initial data
        loadTeachersList();
        loadStudentsList();
        loadTasksList();
        loadTimetable();
        loadExamsList();
        updateDashboardStats();
    } else {
        // Retry after a short delay
        setTimeout(function() {
            if (typeof db !== 'undefined') {
                loadTeachersList();
                loadStudentsList();
                loadTasksList();
                loadTimetable();
                loadExamsList();
                updateDashboardStats();
            }
        }, 100);
    }
}); 

// CRUD Functions for Teachers
function editTeacher(teacherId) {
    const teacher = db.getUserById('teachers', teacherId);
    if (teacher) {
        // Reset subject fields first
        resetSubjectFields();
        
        // Populate edit form with null checks
        const nameField = document.getElementById('editTeacherName');
        const usernameField = document.getElementById('editTeacherUsername');
        const classField = document.getElementById('editTeacherClass');
        const idField = document.getElementById('editTeacherId');
        
        if (nameField) nameField.value = teacher.name;
        if (usernameField) usernameField.value = teacher.username;
        if (classField) classField.value = teacher.classId || '';
        if (idField) idField.value = teacherId;
        
        // Populate subject fields
        const subjects = teacher.subjects || [teacher.subject];
        if (subjects && subjects.length > 0) {
            // Set first subject
            const firstSubjectField = document.getElementById('editTeacherSubject1');
            if (firstSubjectField) firstSubjectField.value = subjects[0] || '';
            
            // Add additional subject fields
            for (let i = 1; i < subjects.length; i++) {
                addEditSubjectField();
                const subjectField = document.getElementById(`editTeacherSubject${i + 1}`);
                if (subjectField) subjectField.value = subjects[i] || '';
            }
        }
        
        // Show edit modal
        openModal('editTeacherModal');
    } else {
        showNotification('Teacher not found.', 'error');
    }
}

function deleteTeacher(teacherId) {
    if (confirm('Are you sure you want to delete this teacher?')) {
        if (db.deleteUser('teachers', teacherId)) {
            showNotification('Teacher deleted successfully!', 'success');
            loadTeachersList();
            updateDashboardStats();
        } else {
            showNotification('Failed to delete teacher. Please try again.', 'error');
        }
    }
}

// CRUD Functions for Students
function editStudent(studentId) {
    const student = db.getUserById('students', studentId);
    if (student) {
        // Populate edit form with null checks
        const nameField = document.getElementById('editCandidateName');
        const classField = document.getElementById('editCandidateClass');
        const emailField = document.getElementById('editCandidateEmail');
        const phoneField = document.getElementById('editCandidatePhone');
        const usernameField = document.getElementById('editCandidateUsername');
        const idField = document.getElementById('editCandidateId');
        
        if (nameField) nameField.value = student.name;
        if (classField) {
            // Populate class options first
            populateCandidateModal();
            classField.value = student.classId || '';
        }
        if (emailField) emailField.value = student.email || '';
        if (phoneField) phoneField.value = student.phone || '';
        if (usernameField) usernameField.value = student.username;
        if (idField) idField.value = studentId;
        
        // Show edit modal
        openModal('editCandidateModal');
    } else {
        showNotification('Student not found.', 'error');
    }
}

function deleteStudent(studentId) {
    if (confirm('Are you sure you want to delete this student?')) {
        if (db.deleteUser('students', studentId)) {
            showNotification('Student deleted successfully!', 'success');
            loadStudentsList();
            updateDashboardStats();
        } else {
            showNotification('Failed to delete student. Please try again.', 'error');
        }
    }
}

// CRUD Functions for Tasks
function editTask(taskId) {
    const task = db.getData('homework').find(t => t.id === taskId);
    if (task) {
        // Populate edit form with null checks
        const titleField = document.getElementById('editTaskTitle');
        const descField = document.getElementById('editTaskDesc');
        const classField = document.getElementById('editTaskClass');
        const dueDateField = document.getElementById('editTaskDueDate');
        const idField = document.getElementById('editTaskId');
        
        if (titleField) titleField.value = task.title || task.description || '';
        if (descField) descField.value = task.description || '';
        if (classField) {
            // Populate class options first
            populateTaskModal();
            classField.value = task.classId || '';
        }
        if (dueDateField) dueDateField.value = task.dueDate || '';
        if (idField) idField.value = taskId;
        
        // Show edit modal
        openModal('editTaskModal');
    } else {
        showNotification('Task not found.', 'error');
    }
}

function deleteTask(taskId) {
    if (confirm('Are you sure you want to delete this task?')) {
        const tasks = db.getData('homework');
        const filteredTasks = tasks.filter(t => t.id !== taskId);
        if (db.setData('homework', filteredTasks)) {
            showNotification('Task deleted successfully!', 'success');
            loadTasksList();
            updateDashboardStats();
        } else {
            showNotification('Failed to delete task. Please try again.', 'error');
        }
    }
}

// CRUD Functions for Exams
function editExam(examId) {
    const exam = db.getData('exams').find(e => e.id === examId);
    if (exam) {
        // Populate edit form with null checks
        const nameField = document.getElementById('editExamName');
        const classField = document.getElementById('editExamClass');
        const subjectField = document.getElementById('editExamSubject');
        const dateField = document.getElementById('editExamDate');
        const timeField = document.getElementById('editExamTime');
        const marksField = document.getElementById('editExamMarks');
        const idField = document.getElementById('editExamId');
        
        if (nameField) nameField.value = exam.title || '';
        if (classField) {
            // Populate class options first
            populateExamModal();
            classField.value = exam.classId || '';
        }
        if (subjectField) subjectField.value = exam.subject || '';
        if (dateField) dateField.value = exam.date || '';
        if (timeField) timeField.value = exam.time || '';
        if (marksField) marksField.value = exam.totalMarks || 100;
        if (idField) idField.value = examId;
        
        // Show edit modal
        openModal('editExamModal');
    } else {
        showNotification('Exam not found.', 'error');
    }
}

function deleteExam(examId) {
    if (confirm('Are you sure you want to delete this exam?')) {
        const exams = db.getData('exams');
        const filteredExams = exams.filter(e => e.id !== examId);
        if (db.setData('exams', filteredExams)) {
            showNotification('Exam deleted successfully!', 'success');
            loadExamsList();
            updateDashboardStats();
        } else {
            showNotification('Failed to delete exam. Please try again.', 'error');
        }
    }
}

// CRUD Functions for Classes
function editClass(classId) {
    const classInfo = db.getClassById(classId);
    if (classInfo) {
        // Populate edit form with null checks
        const nameField = document.getElementById('editClassName');
        const subjectField = document.getElementById('editClassSubject');
        const descriptionField = document.getElementById('editClassDescription');
        const teacherField = document.getElementById('editClassTeacher');
        const idField = document.getElementById('editClassId');
        
        if (nameField) nameField.value = classInfo.name;
        if (subjectField) subjectField.value = classInfo.subject || '';
        if (descriptionField) descriptionField.value = classInfo.description || '';
        if (teacherField) {
            // Populate teacher options first
            populateClassModal();
            teacherField.value = classInfo.teacherId || '';
        }
        if (idField) idField.value = classId;
        
        // Show edit modal
        openModal('editClassModal');
    } else {
        showNotification('Class not found.', 'error');
    }
}

function deleteClass(classId) {
    if (confirm('Are you sure you want to delete this class?')) {
        if (db.deleteClass(classId)) {
            showNotification('Class deleted successfully!', 'success');
            if (window.portalManager) {
                window.portalManager.loadClasses();
            }
        } else {
            showNotification('Failed to delete class. Please try again.', 'error');
        }
    }
}



// View class students
function viewClassStudents(classId) {
    const classInfo = db.getClassById(classId);
    if (!classInfo) {
        showNotification('Class not found.', 'error');
        return;
    }

    const students = db.getStudentsByClass(classId);
    
    let message = `Students in ${classInfo.name} (${classInfo.subject || 'No Subject'}):\n\n`;
    if (students.length === 0) {
        message += 'No students assigned to this class.';
    } else {
        students.forEach((student, index) => {
            message += `${index + 1}. ${student.name} (${student.email || 'No Email'})\n`;
        });
    }
    
    alert(message);
}

// View student details
function viewStudentDetails(studentId) {
    const student = db.getUserById('students', studentId);
    if (!student) {
        showNotification('Student not found.', 'error');
        return;
    }

    const classInfo = student.classId ? db.getClassById(student.classId) : null;
    const attendanceStats = db.getAttendanceStatistics(studentId);
    const grades = db.getGradesByStudent(studentId);
    const gpa = db.calculateGPA(studentId);

    let message = `Student Details: ${student.name}\n\n`;
    message += `Class: ${classInfo ? classInfo.name : 'Not Assigned'}\n`;
    message += `Email: ${student.email || 'No Email'}\n`;
    message += `Attendance: ${attendanceStats.percentage}% (${attendanceStats.present}/${attendanceStats.total})\n`;
    message += `GPA: ${gpa.toFixed(2)}\n\n`;
    
    if (grades.length > 0) {
        message += 'Recent Grades:\n';
        grades.slice(0, 5).forEach(grade => {
            const percentage = ((grade.score / grade.maxScore) * 100).toFixed(1);
            message += `- ${grade.assignmentTitle || 'Assignment'}: ${percentage}%\n`;
        });
    } else {
        message += 'No grades available yet.';
    }
    
    alert(message);
}

// Edit student grade
function editStudentGrade(studentId) {
    const student = db.getUserById('students', studentId);
    if (!student) {
        showNotification('Student not found.', 'error');
        return;
    }

    // For now, show a simple prompt. In a real application, this would open a modal
    const assignmentTitle = prompt('Enter assignment title:');
    if (!assignmentTitle) return;

    const score = parseFloat(prompt('Enter score:'));
    if (isNaN(score)) return;

    const maxScore = parseFloat(prompt('Enter maximum score:'));
    if (isNaN(maxScore) || maxScore <= 0) return;

    const category = prompt('Enter category (assignments/exams/attendance/participation):') || 'assignments';

    const gradeData = {
        studentId: studentId,
        assignmentTitle: assignmentTitle,
        score: score,
        maxScore: maxScore,
        category: category,
        date: new Date().toISOString().split('T')[0]
    };

    if (db.addGrade(gradeData)) {
        showNotification('Grade added successfully!', 'success');
        // Refresh the teacher students list if on teacher portal
        if (window.portalManager && typeof window.portalManager.loadTeacherStudents === 'function') {
            window.portalManager.loadTeacherStudents();
        }
    } else {
        showNotification('Failed to add grade. Please try again.', 'error');
    }
}

// View homework details
function viewHomeworkDetails(homeworkId) {
    const homework = db.getData('homework').find(hw => hw.id === homeworkId);
    if (!homework) {
        showNotification('Homework not found.', 'error');
        return;
    }

    const classInfo = homework.classId ? db.getClassById(homework.classId) : null;
    const teacher = homework.teacherId ? db.getUserById('teachers', homework.teacherId) : null;
    const students = homework.studentIds ? homework.studentIds.map(id => db.getUserById('students', id)).filter(Boolean) : [];
    
    let message = `Homework Details: ${homework.title || 'Homework Assignment'}\n\n`;
    message += `Class: ${classInfo ? classInfo.name : 'No Class'}\n`;
    message += `Subject: ${homework.subject || classInfo?.subject || 'No Subject'}\n`;
    message += `Teacher: ${teacher ? teacher.name : 'No Teacher'}\n`;
    message += `Due Date: ${homework.dueDate}\n`;
    message += `Description: ${homework.description || 'No description'}\n\n`;
    message += `Assigned to ${students.length} students:\n`;
    
    if (students.length > 0) {
        students.forEach((student, index) => {
            message += `${index + 1}. ${student.name}\n`;
        });
    } else {
        message += 'No students assigned.';
    }
    
    alert(message);
}

// Edit and delete homework functions
function editHomework(homeworkId) {
    const homework = db.getData('homework').find(hw => hw.id === homeworkId);
    if (homework) {
        // Populate edit form with null checks
        const titleField = document.getElementById('editHomeworkTitle');
        const descField = document.getElementById('editHomeworkDesc');
        const classField = document.getElementById('editHomeworkClass');
        const dueDateField = document.getElementById('editHomeworkDueDate');
        const idField = document.getElementById('editHomeworkId');
        
        if (titleField) titleField.value = homework.title || '';
        if (descField) descField.value = homework.description || '';
        if (classField) classField.value = homework.classId || '';
        if (dueDateField) dueDateField.value = homework.dueDate || '';
        if (idField) idField.value = homeworkId;
        
        // Show edit modal
        openModal('editHomeworkModal');
    }
}

function deleteHomework(homeworkId) {
    if (confirm('Are you sure you want to delete this homework assignment?')) {
        const homework = db.getData('homework');
        const filteredHomework = homework.filter(hw => hw.id !== homeworkId);
        if (db.setData('homework', filteredHomework)) {
            showNotification('Homework deleted successfully!', 'success');
            if (window.portalManager) {
                window.portalManager.loadHomework();
            }
        } else {
            showNotification('Failed to delete homework. Please try again.', 'error');
        }
    }
}

// Edit form submission handlers
document.addEventListener('DOMContentLoaded', function() {
    // Edit Teacher Form Handler
    const editTeacherForm = document.getElementById('editTeacherForm');
    if (editTeacherForm) {
        editTeacherForm.addEventListener('submit', function(e) {
            e.preventDefault();
            
            // Get all subject values
            const subjects = getAllSubjectValues('editTeacher');
            
            if (subjects.length === 0) {
                showNotification('Please enter at least one subject.', 'error');
                return;
            }
            
            const teacherId = document.getElementById('editTeacherId').value;
            const updatedData = {
                name: document.getElementById('editTeacherName').value,
                subject: subjects[0], // Keep for backward compatibility
                subjects: subjects, // New array of all subjects
                classId: document.getElementById('editTeacherClass').value || null, // Class assignment
                username: document.getElementById('editTeacherUsername').value
            };
            
            if (db.updateUser('teachers', teacherId, updatedData)) {
                showNotification('Teacher updated successfully!', 'success');
                closeModal('editTeacherModal');
                editTeacherForm.reset();
                resetSubjectFields(); // Reset the subject fields
                loadTeachersList();
                updateDashboardStats();
            } else {
                showNotification('Failed to update teacher. Please try again.', 'error');
            }
        });
    }

    // Edit Class Form Handler
    const editClassForm = document.getElementById('editClassForm');
    if (editClassForm) {
        editClassForm.addEventListener('submit', function(e) {
            e.preventDefault();
            
            const classId = document.getElementById('editClassId').value;
            const updatedData = {
                name: document.getElementById('editClassName').value,
                subject: document.getElementById('editClassSubject').value || '',
                description: document.getElementById('editClassDescription').value || '',
                teacherId: document.getElementById('editClassTeacher').value || null
            };
            
            if (db.updateClass(classId, updatedData)) {
                showNotification('Class updated successfully!', 'success');
                closeModal('editClassModal');
                editClassForm.reset();
                if (window.portalManager) {
                    window.portalManager.loadClasses();
                }
                updateDashboardStats();
            } else {
                showNotification('Failed to update class. Please try again.', 'error');
            }
        });
    }

    // Edit Student Form Handler
    const editCandidateForm = document.getElementById('editCandidateForm');
    if (editCandidateForm) {
        editCandidateForm.addEventListener('submit', function(e) {
            e.preventDefault();
            
            const studentId = document.getElementById('editCandidateId').value;
            const updatedData = {
                name: document.getElementById('editCandidateName').value,
                classId: document.getElementById('editCandidateClass').value,
                email: document.getElementById('editCandidateEmail').value,
                phone: document.getElementById('editCandidatePhone').value,
                username: document.getElementById('editCandidateUsername').value
            };
            
            if (db.updateUser('students', studentId, updatedData)) {
                showNotification('Student updated successfully!', 'success');
                closeModal('editCandidateModal');
                editCandidateForm.reset();
                loadStudentsList();
                updateDashboardStats();
            } else {
                showNotification('Failed to update student. Please try again.', 'error');
            }
        });
    }

    // Edit Task Form Handler
    const editTaskForm = document.getElementById('editTaskForm');
    if (editTaskForm) {
        editTaskForm.addEventListener('submit', function(e) {
            e.preventDefault();
            
            const taskId = document.getElementById('editTaskId').value;
            const tasks = db.getData('homework');
            const taskIndex = tasks.findIndex(t => t.id === taskId);
            
            if (taskIndex !== -1) {
                tasks[taskIndex] = {
                    ...tasks[taskIndex],
                    title: document.getElementById('editTaskTitle').value,
                    description: document.getElementById('editTaskDesc').value,
                    classId: document.getElementById('editTaskClass').value,
                    dueDate: document.getElementById('editTaskDueDate').value
                };
                
                if (db.setData('homework', tasks)) {
                    showNotification('Task updated successfully!', 'success');
                    closeModal('editTaskModal');
                    editTaskForm.reset();
                    loadTasksList();
                    updateDashboardStats();
                } else {
                    showNotification('Failed to update task. Please try again.', 'error');
                }
            }
        });
    }

    // Edit Exam Form Handler
    const editExamForm = document.getElementById('editExamForm');
    if (editExamForm) {
        editExamForm.addEventListener('submit', function(e) {
            e.preventDefault();
            
            const examId = document.getElementById('editExamId').value;
            const exams = db.getData('exams');
            const examIndex = exams.findIndex(e => e.id === examId);
            
            if (examIndex !== -1) {
                exams[examIndex] = {
                    ...exams[examIndex],
                    title: document.getElementById('editExamName').value,
                    classId: document.getElementById('editExamClass').value,
                    subject: document.getElementById('editExamSubject').value,
                    date: document.getElementById('editExamDate').value,
                    time: document.getElementById('editExamTime').value,
                    totalMarks: parseInt(document.getElementById('editExamMarks').value)
                };
                
                if (db.setData('exams', exams)) {
                    showNotification('Exam updated successfully!', 'success');
                    closeModal('editExamModal');
                    editExamForm.reset();
                    loadExamsList();
                    updateDashboardStats();
                } else {
                    showNotification('Failed to update exam. Please try again.', 'error');
                }
            }
        });
    }
}); 

// Teacher Portal Functions
function initializeTeacherPortal() {
    if (typeof db === 'undefined') return;
    
    // Load teacher data
    loadTeacherDashboard();
    loadTeacherStudents();
    loadTeacherTimetable();
    loadTeacherHomework();
    loadTeacherExams();
    loadTeacherAttendance();
    loadTeacherResults();
    loadTeacherAnalytics();
    
    // Initialize form handlers
    initializeTeacherFormHandlers();
}

function loadTeacherDashboard() {
    const currentTeacher = getCurrentTeacher();
    if (!currentTeacher) return;
    
    // Update teacher name
    document.getElementById('teacher-name-display').textContent = currentTeacher.name;
    document.getElementById('userDisplay').textContent = `Welcome, ${currentTeacher.name}!`;
    
    // Load dashboard stats
    const students = db.getData('students');
    const homework = db.getData('homework');
    const exams = db.getData('exams');
    const timetables = db.getData('timetables');
    
    // Update stats
    document.getElementById('total-students-count').textContent = students.length;
    document.getElementById('active-homework-count').textContent = homework.filter(hw => hw.status !== 'completed').length;
    document.getElementById('today-classes-count').textContent = getTodayClassesCount(timetables);
    document.getElementById('upcoming-exams-count').textContent = getUpcomingExamsCount(exams);
    
    // Load today's schedule
    loadTodaySchedule(timetables);
    
    // Load recent activity
    loadRecentActivity();
}

function loadTeacherStudents() {
    const students = db.getData('students');
    const studentsList = document.getElementById('students-list');
    const studentsEmpty = document.getElementById('students-empty');
    
    if (!studentsList) return;
    
    if (students.length === 0) {
        studentsList.innerHTML = '';
        studentsEmpty.style.display = 'block';
    } else {
        studentsEmpty.style.display = 'none';
        studentsList.innerHTML = students.map(student => {
            const attendance = calculateStudentAttendance(student.id);
            const avgGrade = calculateStudentAverageGrade(student.id);
            const classInfo = student.classId ? db.getClassById(student.classId) : null;
            
            return `
                <tr>
                    <td class="p-3">${student.name}</td>
                    <td class="p-3">${classInfo ? classInfo.name : 'Not Assigned'}</td>
                    <td class="p-3">${student.email || 'No Email'}</td>
                    <td class="p-3">
                        <span class="px-2 py-1 rounded text-sm ${attendance >= 80 ? 'bg-green-100 text-green-800' : attendance >= 60 ? 'bg-yellow-100 text-yellow-800' : 'bg-red-100 text-red-800'}">
                            ${attendance}%
                        </span>
                    </td>
                    <td class="p-3">
                        <span class="px-2 py-1 rounded text-sm ${avgGrade >= 80 ? 'bg-green-100 text-green-800' : avgGrade >= 60 ? 'bg-yellow-100 text-yellow-800' : 'bg-red-100 text-red-800'}">
                            ${avgGrade}%
                        </span>
                    </td>
                    <td class="p-3">
                        <button onclick="viewStudentDetails('${student.id}')" class="text-blue-600 hover:text-blue-800 mr-2">
                            <i class="fas fa-eye"></i>
                        </button>
                        <button onclick="editStudent('${student.id}')" class="text-green-600 hover:text-green-800 mr-2">
                            <i class="fas fa-edit"></i>
                        </button>
                    </td>
                </tr>
            `;
        }).join('');
    }
}

function loadTeacherTimetable() {
    const timetables = db.getData('timetables');
    const timetableBody = document.getElementById('timetable-body');
    const timetableEmpty = document.getElementById('timetable-empty');
    
    if (!timetableBody) return;
    
    if (timetables.length === 0) {
        timetableBody.innerHTML = '';
        timetableEmpty.style.display = 'block';
    } else {
        timetableEmpty.style.display = 'none';
        
        // Group by time slots
        const timeSlots = ['09:00-10:00', '10:00-11:00', '11:00-12:00', '14:00-15:00', '15:00-16:00'];
        const days = ['Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday'];

        let tableHTML = '';
        timeSlots.forEach(timeSlot => {
            tableHTML += '<tr>';
            tableHTML += `<td class="p-3 font-semibold">${timeSlot}</td>`;
            
            days.forEach(day => {
                const entry = timetables.find(t => t.time === timeSlot && t.day === day);
                if (entry) {
                    tableHTML += `<td class="p-3 bg-blue-50 rounded">${entry.subject}<br><small class="text-gray-600">${entry.room || 'Room 101'}</small></td>`;
                } else {
                    tableHTML += '<td class="p-3"></td>';
                }
            });
            
            tableHTML += '</tr>';
        });

        timetableBody.innerHTML = tableHTML;
    }
}

function loadTeacherHomework() {
    const homework = db.getData('homework');
    const homeworkList = document.getElementById('homework-list');
    const homeworkEmpty = document.getElementById('homework-empty');
    
    if (!homeworkList) return;
    
    if (homework.length === 0) {
        homeworkList.innerHTML = '';
        homeworkEmpty.style.display = 'block';
    } else {
        homeworkEmpty.style.display = 'none';
        homeworkList.innerHTML = homework.map(hw => `
            <tr>
                <td class="p-3">${hw.description || hw.title}</td>
                <td class="p-3">${hw.subject || 'General'}</td>
                <td class="p-3">${hw.assignedTo === 'all' ? 'All Students' : hw.assignedTo || 'Unassigned'}</td>
                <td class="p-3">${hw.dueDate}</td>
                <td class="p-3">
                    <span class="px-2 py-1 rounded text-sm ${hw.status === 'completed' ? 'bg-green-100 text-green-800' : 'bg-yellow-100 text-yellow-800'}">
                        ${hw.status || 'pending'}
                    </span>
                </td>
                <td class="p-3">
                    <button onclick="editHomework('${hw.id}')" class="text-blue-600 hover:text-blue-800 mr-2">
                        <i class="fas fa-edit"></i>
                    </button>
                    <button onclick="deleteHomework('${hw.id}')" class="text-red-600 hover:text-red-800">
                        <i class="fas fa-trash"></i>
                    </button>
                </td>
            </tr>
        `).join('');
    }
}

function loadTeacherExams() {
    const exams = db.getData('exams');
    const examsList = document.getElementById('exams-list');
    const examsEmpty = document.getElementById('exams-empty');
    
    if (!examsList) return;
    
    if (exams.length === 0) {
        examsList.innerHTML = '';
        examsEmpty.style.display = 'block';
    } else {
        examsEmpty.style.display = 'none';
        examsList.innerHTML = exams.map(exam => `
            <tr>
                <td class="p-3">${exam.title}</td>
                <td class="p-3">${exam.subject}</td>
                <td class="p-3">${exam.date}</td>
                <td class="p-3">${exam.time}</td>
                <td class="p-3">${exam.duration || '2 hours'}</td>
                <td class="p-3">
                    <button onclick="editExam('${exam.id}')" class="text-blue-600 hover:text-blue-800 mr-2">
                        <i class="fas fa-edit"></i>
                    </button>
                    <button onclick="deleteExam('${exam.id}')" class="text-red-600 hover:text-red-800">
                        <i class="fas fa-trash"></i>
                    </button>
                </td>
            </tr>
        `).join('');
    }
}

function loadTeacherAttendance() {
    const attendance = db.getData('attendance');
    const attendanceList = document.getElementById('attendance-list');
    const attendanceEmpty = document.getElementById('attendance-empty');
    
    if (!attendanceList) return;
    
    if (attendance.length === 0) {
        attendanceList.innerHTML = '';
        attendanceEmpty.style.display = 'block';
    } else {
        attendanceEmpty.style.display = 'none';
        attendanceList.innerHTML = attendance.map(att => `
            <tr>
                <td class="p-3">${att.date}</td>
                <td class="p-3">${att.course || 'General'}</td>
                <td class="p-3">${att.studentName}</td>
                <td class="p-3">
                    <span class="px-2 py-1 rounded text-sm ${att.status === 'present' ? 'bg-green-100 text-green-800' : 'bg-red-100 text-red-800'}">
                        ${att.status}
                    </span>
                </td>
                <td class="p-3">
                    <button onclick="editAttendance('${att.id}')" class="text-blue-600 hover:text-blue-800">
                        <i class="fas fa-edit"></i>
                    </button>
                </td>
            </tr>
        `).join('');
    }
}

function loadTeacherResults() {
    const results = db.getData('examResults');
    const resultsList = document.getElementById('results-list');
    const resultsEmpty = document.getElementById('results-empty');
    
    if (!resultsList) return;
    
    if (results.length === 0) {
        resultsList.innerHTML = '';
        resultsEmpty.style.display = 'block';
    } else {
        resultsEmpty.style.display = 'none';
        resultsList.innerHTML = results.map(result => {
            const percentage = Math.round((result.marks / result.totalMarks) * 100);
            const grade = getGradeFromPercentage(percentage);
            
            return `
                <tr>
                    <td class="p-3">${result.examTitle}</td>
                    <td class="p-3">${result.studentName}</td>
                    <td class="p-3">${result.marks}/${result.totalMarks}</td>
                    <td class="p-3">${percentage}%</td>
                    <td class="p-3">
                        <span class="px-2 py-1 rounded text-sm ${grade === 'A' ? 'bg-green-100 text-green-800' : grade === 'B' ? 'bg-blue-100 text-blue-800' : grade === 'C' ? 'bg-yellow-100 text-yellow-800' : 'bg-red-100 text-red-800'}">
                            ${grade}
                        </span>
                    </td>
                    <td class="p-3">
                        <button onclick="editResult('${result.id}')" class="text-blue-600 hover:text-blue-800">
                            <i class="fas fa-edit"></i>
                        </button>
                    </td>
                </tr>
            `;
        }).join('');
    }
}

function loadTeacherAnalytics() {
    const students = db.getData('students');
    const attendance = db.getData('attendance');
    const results = db.getData('examResults');
    const homework = db.getData('homework');
    
    // Update analytics stats
    document.getElementById('total-students-analytics').textContent = students.length;
    document.getElementById('active-students').textContent = students.length; // Simplified for now
    document.getElementById('new-students').textContent = getNewStudentsThisMonth(students);
    document.getElementById('classes-this-week').textContent = getClassesThisWeek();
    document.getElementById('hw-assigned').textContent = homework.length;
    document.getElementById('exams-scheduled').textContent = db.getData('exams').length;
    
    // Load top performers
    loadTopPerformers(results);
    
    // Load course performance
    loadCoursePerformance();
}

function initializeTeacherFormHandlers() {
    // Assign Homework Form
    const assignHomeworkForm = document.getElementById('assignHomeworkForm');
    if (assignHomeworkForm) {
        assignHomeworkForm.addEventListener('submit', function(e) {
            e.preventDefault();
            
            const homeworkData = {
                title: document.getElementById('hwTitle').value,
                description: document.getElementById('hwDesc').value,
                subject: document.getElementById('hwCourse').value,
                assignedTo: document.getElementById('hwAssignedTo').value,
                dueDate: document.getElementById('hwDueDate').value,
                status: 'pending',
                assignedDate: new Date().toISOString().split('T')[0],
                teacherId: getCurrentTeacher()?.id
            };
            
            if (db.addHomework(homeworkData)) {
                showNotification('Homework assigned successfully!', 'success');
                closeModal('assignHomeworkModal');
                assignHomeworkForm.reset();
                loadTeacherHomework();
                loadTeacherDashboard();
            } else {
                showNotification('Failed to assign homework. Please try again.', 'error');
            }
        });
    }
    
    // Take Attendance Form
    const takeAttendanceForm = document.getElementById('takeAttendanceForm');
    if (takeAttendanceForm) {
        takeAttendanceForm.addEventListener('submit', function(e) {
            e.preventDefault();
            
            const date = document.getElementById('attDate').value;
            const course = document.getElementById('attCourse').value;
            const studentCheckboxes = document.querySelectorAll('input[name="attendance"]:checked');
            
            let success = true;
            studentCheckboxes.forEach(checkbox => {
                const attendanceData = {
                    date: date,
                    course: course,
                    studentId: checkbox.value,
                    studentName: checkbox.getAttribute('data-name'),
                    status: checkbox.checked ? 'present' : 'absent',
                    teacherId: getCurrentTeacher()?.id
                };
                
                if (!db.addAttendance(attendanceData)) {
                    success = false;
                }
            });
            
            if (success) {
                showNotification('Attendance saved successfully!', 'success');
                closeModal('takeAttendanceModal');
                takeAttendanceForm.reset();
                loadTeacherAttendance();
            } else {
                showNotification('Failed to save attendance. Please try again.', 'error');
            }
        });
    }
    
    // Enter Results Form
    const enterResultsForm = document.getElementById('enterResultsForm');
    if (enterResultsForm) {
        enterResultsForm.addEventListener('submit', function(e) {
            e.preventDefault();
            
            const examId = document.getElementById('resExam').value;
            const exam = db.getData('exams').find(e => e.id === examId);
            const studentInputs = document.querySelectorAll('input[name="result"]');
            
            let success = true;
            studentInputs.forEach(input => {
                if (input.value) {
                    const resultData = {
                        examId: examId,
                        examTitle: exam.title,
                        studentId: input.getAttribute('data-student-id'),
                        studentName: input.getAttribute('data-student-name'),
                        marks: parseInt(input.value),
                        totalMarks: exam.totalMarks || 100,
                        teacherId: getCurrentTeacher()?.id
                    };
                    
                    if (!db.addExamResult(resultData)) {
                        success = false;
                    }
                }
            });
            
            if (success) {
                showNotification('Results saved successfully!', 'success');
                closeModal('enterResultsModal');
                enterResultsForm.reset();
                loadTeacherResults();
            } else {
                showNotification('Failed to save results. Please try again.', 'error');
            }
        });
    }
    
    // Create Exam Form
    const createExamForm = document.getElementById('createExamForm');
    if (createExamForm) {
        createExamForm.addEventListener('submit', function(e) {
            e.preventDefault();
            
            const examData = {
                title: document.getElementById('examTitle').value,
                subject: document.getElementById('examSubject').value,
                date: document.getElementById('examDate').value,
                time: document.getElementById('examTime').value,
                duration: document.getElementById('examDuration').value + ' hours',
                totalMarks: parseInt(document.getElementById('examTotalMarks').value),
                teacherId: getCurrentTeacher()?.id
            };
            
            if (db.addExam(examData)) {
                showNotification('Exam created successfully!', 'success');
                closeModal('createExamModal');
                createExamForm.reset();
                loadTeacherExams();
                loadTeacherDashboard();
            } else {
                showNotification('Failed to create exam. Please try again.', 'error');
            }
        });
    }
}

// Utility Functions
function getCurrentTeacher() {
    const currentUser = JSON.parse(localStorage.getItem('currentUser'));
    if (currentUser && currentUser.userType === 'teachers') {
        return db.getUserById('teachers', currentUser.id);
    }
    return null;
}

function calculateStudentAttendance(studentId) {
    const attendance = db.getData('attendance');
    const studentAttendance = attendance.filter(att => att.studentId === studentId);
    
    if (studentAttendance.length === 0) return 0;
    
    const present = studentAttendance.filter(att => att.status === 'present').length;
    return Math.round((present / studentAttendance.length) * 100);
}

function calculateStudentAverageGrade(studentId) {
    const results = db.getData('examResults');
    const studentResults = results.filter(result => result.studentId === studentId);
    
    if (studentResults.length === 0) return 0;
    
    const totalPercentage = studentResults.reduce((sum, result) => {
        return sum + (result.marks / result.totalMarks) * 100;
    }, 0);
    
    return Math.round(totalPercentage / studentResults.length);
}

function getGradeFromPercentage(percentage) {
    if (percentage >= 90) return 'A';
    if (percentage >= 80) return 'B';
    if (percentage >= 70) return 'C';
    if (percentage >= 60) return 'D';
    return 'F';
}

function getTodayClassesCount(timetables) {
    const today = new Date().toLocaleDateString('en-US', { weekday: 'long' });
    return timetables.filter(t => t.day === today).length;
}

function getUpcomingExamsCount(exams) {
    const today = new Date().toISOString().split('T')[0];
    return exams.filter(exam => exam.date >= today).length;
}

function loadTodaySchedule(timetables) {
    const today = new Date().toLocaleDateString('en-US', { weekday: 'long' });
    const todayClasses = timetables.filter(t => t.day === today);
    const scheduleList = document.getElementById('today-schedule-list');
    const scheduleEmpty = document.getElementById('today-schedule-empty');
    
    if (todayClasses.length === 0) {
        scheduleList.innerHTML = '';
        scheduleEmpty.style.display = 'block';
    } else {
        scheduleEmpty.style.display = 'none';
        scheduleList.innerHTML = todayClasses.map(cls => `
            <div class="flex justify-between items-center p-3 bg-blue-50 rounded-lg">
                <div>
                    <p class="font-semibold">${cls.subject}</p>
                    <p class="text-sm text-gray-600">${cls.time}</p>
                </div>
                <span class="text-sm text-gray-500">${cls.room || 'Room 101'}</span>
            </div>
        `).join('');
    }
}

function loadRecentActivity() {
    const activityList = document.getElementById('recent-activity-list');
    const activityEmpty = document.getElementById('recent-activity-empty');
    
    // Get recent activities from various sources
    const recentActivities = [];
    
    // Add recent homework assignments
    const homework = db.getData('homework');
    homework.slice(0, 3).forEach(hw => {
        recentActivities.push({
            type: 'homework',
            text: `Assigned homework: ${hw.title || hw.description}`,
            date: hw.assignedDate
        });
    });
    
    // Add recent exam results
    const results = db.getData('examResults');
    results.slice(0, 3).forEach(result => {
        recentActivities.push({
            type: 'result',
            text: `Entered result for ${result.studentName}: ${result.marks}/${result.totalMarks}`,
            date: result.date || new Date().toISOString().split('T')[0]
        });
    });
    
    // Sort by date and take top 5
    recentActivities.sort((a, b) => new Date(b.date) - new Date(a.date));
    const topActivities = recentActivities.slice(0, 5);
    
    if (topActivities.length === 0) {
        activityList.innerHTML = '';
        activityEmpty.style.display = 'block';
    } else {
        activityEmpty.style.display = 'none';
        activityList.innerHTML = topActivities.map(activity => `
            <div class="flex items-center p-3 bg-gray-50 rounded-lg">
                <div class="w-2 h-2 bg-blue-500 rounded-full mr-3"></div>
                <div class="flex-1">
                    <p class="text-sm">${activity.text}</p>
                    <p class="text-xs text-gray-500">${activity.date}</p>
                </div>
            </div>
        `).join('');
    }
}

function loadTopPerformers(results) {
    const topPerformersList = document.getElementById('top-performers-list');
    const topPerformersEmpty = document.getElementById('top-performers-empty');
    
    if (results.length === 0) {
        topPerformersList.innerHTML = '';
        topPerformersEmpty.style.display = 'block';
        return;
    }
    
    // Calculate average scores per student
    const studentScores = {};
    results.forEach(result => {
        if (!studentScores[result.studentId]) {
            studentScores[result.studentId] = { total: 0, count: 0, name: result.studentName };
        }
        studentScores[result.studentId].total += (result.marks / result.totalMarks) * 100;
        studentScores[result.studentId].count += 1;
    });
    
    // Calculate averages and sort
    const topStudents = Object.entries(studentScores)
        .map(([id, data]) => ({
            id,
            name: data.name,
            average: Math.round(data.total / data.count)
        }))
        .sort((a, b) => b.average - a.average)
        .slice(0, 5);
    
    if (topStudents.length === 0) {
        topPerformersList.innerHTML = '';
        topPerformersEmpty.style.display = 'block';
    } else {
        topPerformersEmpty.style.display = 'none';
        topPerformersList.innerHTML = topStudents.map((student, index) => `
            <div class="flex items-center justify-between p-3 bg-gray-50 rounded-lg">
                <div class="flex items-center">
                    <span class="w-8 h-8 bg-blue-500 text-white rounded-full flex items-center justify-center text-sm font-bold mr-3">
                        ${index + 1}
                    </span>
                    <div>
                        <p class="font-semibold">${student.name}</p>
                        <p class="text-sm text-gray-600">Average: ${student.average}%</p>
                    </div>
                </div>
                <span class="text-lg font-bold text-blue-600">${student.average}%</span>
            </div>
        `).join('');
    }
}

function loadCoursePerformance() {
    const coursePerformanceList = document.getElementById('course-performance-list');
    const coursePerformanceEmpty = document.getElementById('course-performance-empty');
    
    const students = db.getData('students');
    const results = db.getData('examResults');
    
    // Group students by course
    const courseStats = {};
    students.forEach(student => {
        const course = student.course || student.grade || 'General';
        if (!courseStats[course]) {
            courseStats[course] = { students: 0, totalScore: 0, count: 0 };
        }
        courseStats[course].students += 1;
    });
    
    // Calculate average scores per course
    results.forEach(result => {
        const student = students.find(s => s.id === result.studentId);
        if (student) {
            const course = student.course || student.grade || 'General';
            if (courseStats[course]) {
                courseStats[course].totalScore += (result.marks / result.totalMarks) * 100;
                courseStats[course].count += 1;
            }
        }
    });
    
    const coursePerformance = Object.entries(courseStats)
        .map(([course, stats]) => ({
            course,
            students: stats.students,
            average: stats.count > 0 ? Math.round(stats.totalScore / stats.count) : 0
        }))
        .sort((a, b) => b.average - a.average);
    
    if (coursePerformance.length === 0) {
        coursePerformanceList.innerHTML = '';
        coursePerformanceEmpty.style.display = 'block';
    } else {
        coursePerformanceEmpty.style.display = 'none';
        coursePerformanceList.innerHTML = coursePerformance.map(course => `
            <div class="flex items-center justify-between p-3 bg-gray-50 rounded-lg">
                <div>
                    <p class="font-semibold">${course}</p>
                    <p class="text-sm text-gray-600">${course.students} students</p>
                </div>
                <div class="text-right">
                    <p class="font-bold text-lg">${course.average}%</p>
                    <p class="text-sm text-gray-600">Average</p>
                </div>
            </div>
        `).join('');
    }
}

function getNewStudentsThisMonth(students) {
    const thisMonth = new Date().getMonth();
    const thisYear = new Date().getFullYear();
    
    return students.filter(student => {
        const studentDate = new Date(student.createdDate || new Date());
        return studentDate.getMonth() === thisMonth && studentDate.getFullYear() === thisYear;
    }).length;
}

function getClassesThisWeek() {
    // Simplified - return a random number for now
    return Math.floor(Math.random() * 10) + 5;
}

// Initialize teacher portal when on teacher portal page
document.addEventListener('DOMContentLoaded', function() {
    if (window.location.pathname.includes('teacher_portal.html')) {
        initializeTeacherPortal();
    }
}); 