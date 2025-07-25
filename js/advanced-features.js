// Advanced Features Management for DazzloCore X

// Enhanced Task Management System
window.taskManager = {
    // Update assignment options based on selected type
    updateAssignmentOptions: function() {
        const assignmentType = document.querySelector('input[name="assignmentType"]:checked').value;
        const optionsContainer = document.getElementById('assignmentOptions');
        
        if (!optionsContainer) return;
        
        let optionsHTML = '';
        
        switch (assignmentType) {
            case 'class':
                const classes = db.getClasses();
                optionsHTML = `
                    <select id="taskClass" class="w-full p-2 border rounded mt-1" required>
                        <option value="">Select Class</option>
                        ${classes.map(cls => `<option value="${cls.id}">${cls.name}</option>`).join('')}
                    </select>
                `;
                break;
                
            case 'student':
                const students = db.getData('students');
                optionsHTML = `
                    <select id="taskStudent" class="w-full p-2 border rounded mt-1" required>
                        <option value="">Select Student</option>
                        ${students.map(student => `<option value="${student.id}">${student.name}</option>`).join('')}
                    </select>
                `;
                break;
                
            case 'teacher':
                const teachers = db.getData('teachers');
                optionsHTML = `
                    <select id="taskTeacher" class="w-full p-2 border rounded mt-1" required>
                        <option value="">Select Teacher</option>
                        ${teachers.map(teacher => `<option value="${teacher.id}">${teacher.name}</option>`).join('')}
                    </select>
                `;
                break;
        }
        
        optionsContainer.innerHTML = optionsHTML;
    },

    // Handle file selection
    handleFileSelection: function() {
        const fileInput = document.getElementById('taskFiles');
        const fileList = document.getElementById('fileList');
        
        if (!fileInput || !fileList) return;
        
        fileInput.addEventListener('change', function() {
            fileList.innerHTML = '';
            
            for (let i = 0; i < this.files.length; i++) {
                const file = this.files[i];
                const fileDiv = document.createElement('div');
                fileDiv.className = 'flex items-center justify-between p-2 bg-gray-50 rounded mt-2';
                fileDiv.innerHTML = `
                    <div class="flex items-center">
                        <i class="fas fa-file mr-2 text-gray-500"></i>
                        <span class="text-sm">${file.name} (${(file.size / 1024).toFixed(1)} KB)</span>
                    </div>
                    <button type="button" onclick="this.parentElement.remove()" class="text-red-500 hover:text-red-700">
                        <i class="fas fa-times"></i>
                    </button>
                `;
                fileList.appendChild(fileDiv);
            }
        });
    },

    // Filter tasks
    filterTasks: function(filter) {
        const tasks = db.getTasks();
        let filteredTasks = tasks;
        
        const now = new Date();
        
        switch (filter) {
            case 'active':
                filteredTasks = tasks.filter(task => task.status === 'active');
                break;
            case 'completed':
                filteredTasks = tasks.filter(task => task.status === 'completed');
                break;
            case 'overdue':
                filteredTasks = tasks.filter(task => 
                    task.status === 'active' && new Date(task.dueDate) < now
                );
                break;
            case 'all':
            default:
                filteredTasks = tasks;
                break;
        }
        
        this.renderTaskList(filteredTasks);
        this.updateFilterButtons(filter);
    },

    // Update filter button styles
    updateFilterButtons: function(activeFilter) {
        const filterButtons = document.querySelectorAll('.task-filter');
        filterButtons.forEach(button => {
            button.classList.remove('active');
            if (button.dataset.filter === activeFilter) {
                button.classList.add('active');
            }
        });
    },

    // Render task list
    renderTaskList: function(tasks) {
        const taskList = document.getElementById('task-list');
        if (!taskList) return;
        
        if (tasks.length === 0) {
            taskList.innerHTML = '<tr><td colspan="7" class="text-center p-4 text-gray-500">No tasks found.</td></tr>';
            return;
        }
        
        taskList.innerHTML = tasks.map(task => {
            const assignedToText = this.getAssignedToText(task);
            const progressText = `${task.progress.submitted}/${task.progress.total}`;
            const statusBadge = this.getStatusBadge(task);
            
            return `
                <tr>
                    <td class="p-3">
                        <div class="font-semibold">${task.title}</div>
                        <div class="text-sm text-gray-500">${task.description.substring(0, 50)}...</div>
                    </td>
                    <td class="p-3">${assignedToText}</td>
                    <td class="p-3">${task.subject}</td>
                    <td class="p-3">${task.dueDate}</td>
                    <td class="p-3">
                        <div class="text-sm">${progressText}</div>
                        <div class="w-full bg-gray-200 rounded-full h-2 mt-1">
                            <div class="bg-blue-600 h-2 rounded-full" style="width: ${(task.progress.submitted / task.progress.total) * 100}%"></div>
                        </div>
                    </td>
                    <td class="p-3">${statusBadge}</td>
                    <td class="p-3">
                        <button onclick="taskManager.viewTask('${task.id}')" class="text-blue-600 hover:text-blue-800 mr-2">
                            <i class="fas fa-eye"></i>
                        </button>
                        <button onclick="taskManager.editTask('${task.id}')" class="text-green-600 hover:text-green-800 mr-2">
                            <i class="fas fa-edit"></i>
                        </button>
                        <button onclick="taskManager.deleteTask('${task.id}')" class="text-red-600 hover:text-red-800">
                            <i class="fas fa-trash"></i>
                        </button>
                    </td>
                </tr>
            `;
        }).join('');
    },

    // Get assigned to text
    getAssignedToText: function(task) {
        if (!task.assignedTo || task.assignedTo.length === 0) return 'None';
        
        if (task.assignedTo.length === 1) {
            return `${task.assignedTo[0].name} (${task.assignedTo[0].type})`;
        } else {
            return `${task.assignedTo.length} ${task.assignedTo[0].type}s`;
        }
    },

    // Get status badge
    getStatusBadge: function(task) {
        const now = new Date();
        let status = task.status;
        let colorClass = 'bg-blue-100 text-blue-800';
        
        if (task.status === 'active' && new Date(task.dueDate) < now) {
            status = 'overdue';
            colorClass = 'bg-red-100 text-red-800';
        } else if (task.status === 'completed') {
            colorClass = 'bg-green-100 text-green-800';
        }
        
        return `<span class="px-2 py-1 rounded text-sm ${colorClass}">${status}</span>`;
    },

    // Update task statistics
    updateTaskStatistics: function() {
        const stats = db.getTaskStatistics();
        
        const elements = {
            'total-tasks': stats.total,
            'active-tasks': stats.active,
            'completed-tasks': stats.completed,
            'overdue-tasks': stats.overdue,
            'submission-rate': `${stats.submissionRate}%`,
            'completion-rate': `${stats.completionRate}%`
        };
        
        Object.entries(elements).forEach(([id, value]) => {
            const element = document.getElementById(id);
            if (element) element.textContent = value;
        });
        
        // Update progress bars
        const submissionProgress = document.getElementById('submission-progress');
        const completionProgress = document.getElementById('completion-progress');
        
        if (submissionProgress) submissionProgress.style.width = `${stats.submissionRate}%`;
        if (completionProgress) completionProgress.style.width = `${stats.completionRate}%`;
    },

    // View task details
    viewTask: function(taskId) {
        const task = db.getTaskById(taskId);
        if (!task) {
            alert('Task not found.');
            return;
        }
        
        // Implementation for viewing task details
        alert(`Task Details:\n\nTitle: ${task.title}\nSubject: ${task.subject}\nDue Date: ${task.dueDate}\nStatus: ${task.status}\n\nSubmissions: ${task.progress.submitted}/${task.progress.total}`);
    },

    // Edit task
    editTask: function(taskId) {
        // Implementation for editing task
        alert('Edit task functionality coming soon!');
    },

    // Delete task
    deleteTask: function(taskId) {
        if (confirm('Are you sure you want to delete this task?')) {
            if (db.deleteTask(taskId)) {
                alert('Task deleted successfully!');
                this.loadTasks();
            } else {
                alert('Error deleting task.');
            }
        }
    },

    // Load all tasks
    loadTasks: function() {
        this.filterTasks('all');
        this.updateTaskStatistics();
    }
};

// Make functions globally accessible
window.updateAssignmentOptions = window.taskManager.updateAssignmentOptions;
window.filterTasks = window.taskManager.filterTasks.bind(window.taskManager);

// Global functions for advanced features
window.openModal = function(modalId) {
    const modal = document.getElementById(modalId);
    if (modal) {
        modal.classList.remove('hidden');
        // Populate modal data if needed
        populateModalData(modalId);
    }
};

window.closeModal = function(modalId) {
    const modal = document.getElementById(modalId);
    if (modal) {
        modal.classList.add('hidden');
        // Reset form if exists
        const form = modal.querySelector('form');
        if (form) form.reset();
    }
};

// Populate modal data based on modal type
function populateModalData(modalId) {
    switch (modalId) {
        case 'addAssignmentModal':
            populateAssignmentModal();
            break;
        case 'addGradeModal':
            populateGradeModal();
            break;
        case 'takeAttendanceModal':
            populateAttendanceModal();
            break;
        case 'attendanceReportModal':
            populateReportModal();
            break;
    }
}

// Populate assignment modal
function populateAssignmentModal() {
    const studentsSelect = document.getElementById('assignmentStudents');
    if (!studentsSelect) return;

    const students = db.getData('students');
    studentsSelect.innerHTML = '';
    students.forEach(student => {
        const option = document.createElement('option');
        option.value = student.id;
        option.textContent = student.name;
        studentsSelect.appendChild(option);
    });
}

// Populate grade modal
function populateGradeModal() {
    const studentSelect = document.getElementById('gradeStudent');
    const assignmentSelect = document.getElementById('gradeAssignment');
    const categorySelect = document.getElementById('gradeCategory');

    if (!studentSelect || !assignmentSelect || !categorySelect) return;

    // Populate students
    const students = db.getData('students');
    studentSelect.innerHTML = '<option value="">Select Student</option>';
    students.forEach(student => {
        studentSelect.innerHTML += `<option value="${student.id}">${student.name}</option>`;
    });

    // Populate assignments
    const assignments = db.getData('assignments');
    assignmentSelect.innerHTML = '<option value="">Select Assignment</option>';
    assignments.forEach(assignment => {
        assignmentSelect.innerHTML += `<option value="${assignment.id}">${assignment.title}</option>`;
    });

    // Populate categories
    const categories = db.getData('gradeCategories');
    categorySelect.innerHTML = '<option value="">Select Category</option>';
    categories.forEach(category => {
        categorySelect.innerHTML += `<option value="${category.id}">${category.name}</option>`;
    });
}

// Populate attendance modal
function populateAttendanceModal() {
    const classSelect = document.getElementById('attendanceClass');
    const dateInput = document.getElementById('attendanceDate');
    const studentsList = document.getElementById('attendanceStudentsList');

    if (!classSelect || !dateInput || !studentsList) return;

    // Set today's date
    dateInput.value = new Date().toISOString().split('T')[0];

    // Populate classes
    const timetables = db.getData('timetables');
    const classes = [...new Set(timetables.map(t => t.subject))];
    classSelect.innerHTML = '<option value="">Select Class</option>';
    classes.forEach(className => {
        classSelect.innerHTML += `<option value="${className}">${className}</option>`;
    });

    // Handle class selection
    classSelect.addEventListener('change', (e) => {
        if (e.target.value) {
            populateAttendanceStudents(e.target.value);
        }
    });
}

// Populate attendance students
function populateAttendanceStudents(className) {
    const studentsList = document.getElementById('attendanceStudentsList');
    if (!studentsList) return;

    const students = db.getData('students');
    studentsList.innerHTML = `
        <h4 class="font-semibold text-gray-800 mb-3">Students in ${className}</h4>
        <div class="space-y-2">
            ${students.map(student => `
                <div class="flex justify-between items-center p-3 bg-gray-50 rounded-lg">
                    <span class="font-medium">${student.name}</span>
                    <select name="attendance_${student.id}" class="p-2 border rounded">
                        <option value="present">Present</option>
                        <option value="absent">Absent</option>
                        <option value="late">Late</option>
                        <option value="excused">Excused</option>
                    </select>
                </div>
            `).join('')}
        </div>
    `;
}

// Populate report modal
function populateReportModal() {
    const studentSelect = document.getElementById('reportStudent');
    if (!studentSelect) return;

    const students = db.getData('students');
    studentSelect.innerHTML = '<option value="">All Students</option>';
    students.forEach(student => {
        studentSelect.innerHTML += `<option value="${student.id}">${student.name}</option>`;
    });
}

// Enhanced Task Form Submission Handler
function handleTaskSubmit(e) {
    e.preventDefault();
    
    const formData = new FormData(e.target);
    const assignmentType = document.querySelector('input[name="assignmentType"]:checked').value;
    
    // Get assignment target based on type
    let assignmentTarget = {};
    if (assignmentType === 'class') {
        assignmentTarget.classId = document.getElementById('taskClass').value;
        assignmentTarget.assignmentType = 'class';
    } else if (assignmentType === 'student') {
        assignmentTarget.studentId = document.getElementById('taskStudent').value;
        assignmentTarget.assignmentType = 'student';
    } else if (assignmentType === 'teacher') {
        assignmentTarget.teacherId = document.getElementById('taskTeacher').value;
        assignmentTarget.assignmentType = 'teacher';
    }
    
    // Handle file uploads
    const fileInput = document.getElementById('taskFiles');
    const attachedFiles = [];
    
    if (fileInput.files.length > 0) {
        for (let i = 0; i < fileInput.files.length; i++) {
            const file = fileInput.files[i];
            const fileId = db.storeFile({
                name: file.name,
                size: file.size,
                type: file.type,
                data: null // In a real app, you'd store the actual file data
            });
            attachedFiles.push({
                id: fileId,
                name: file.name,
                size: file.size,
                type: file.type
            });
        }
    }
    
    const taskData = {
        title: document.getElementById('taskTitle').value,
        subject: document.getElementById('taskSubject').value,
        description: document.getElementById('taskDesc').value,
        dueDate: document.getElementById('taskDueDate').value,
        priority: document.getElementById('taskPriority').value,
        allowFileSubmission: document.getElementById('allowFileSubmission').checked,
        allowLateSubmission: document.getElementById('allowLateSubmission').checked,
        attachedFiles: attachedFiles,
        createdBy: auth.getCurrentUser().id || 'admin',
        ...assignmentTarget
    };
    
    if (db.addTask(taskData)) {
        alert('Task created successfully!');
        closeModal('addTaskModal');
        if (window.taskManager) {
            window.taskManager.loadTasks();
        }
        if (window.portalManager) {
            window.portalManager.updateDashboardStats();
        }
    } else {
        alert('Error creating task. Please try again.');
    }
}

// Form submission handlers
document.addEventListener('DOMContentLoaded', function() {
    // Enhanced Task form
    const taskForm = document.getElementById('addTaskForm');
    if (taskForm) {
        taskForm.addEventListener('submit', handleTaskSubmit);
    }

    // Initialize file handling
    if (window.taskManager) {
        window.taskManager.handleFileSelection();
    }

    // Assignment form (kept for backward compatibility)
    const assignmentForm = document.getElementById('addAssignmentForm');
    if (assignmentForm) {
        assignmentForm.addEventListener('submit', handleAssignmentSubmit);
    }

    // Grade form
    const gradeForm = document.getElementById('addGradeForm');
    if (gradeForm) {
        gradeForm.addEventListener('submit', handleGradeSubmit);
    }

    // Attendance form
    const attendanceForm = document.getElementById('takeAttendanceForm');
    if (attendanceForm) {
        attendanceForm.addEventListener('submit', handleAttendanceSubmit);
    }
});

// Handle assignment submission
function handleAssignmentSubmit(e) {
    e.preventDefault();
    
    const formData = new FormData(e.target);
    const assignmentData = {
        title: formData.get('assignmentTitle') || document.getElementById('assignmentTitle').value,
        subject: formData.get('assignmentSubject') || document.getElementById('assignmentSubject').value,
        description: formData.get('assignmentDescription') || document.getElementById('assignmentDescription').value,
        dueDate: formData.get('assignmentDueDate') || document.getElementById('assignmentDueDate').value,
        maxScore: parseInt(formData.get('assignmentMaxScore') || document.getElementById('assignmentMaxScore').value),
        studentIds: Array.from(document.getElementById('assignmentStudents').selectedOptions).map(opt => opt.value),
        teacherId: auth.getCurrentUser().id || 'admin'
    };

    if (db.addAssignment(assignmentData)) {
        alert('Assignment created successfully!');
        closeModal('addAssignmentModal');
        if (window.portalManager) {
            window.portalManager.loadAssignments();
            window.portalManager.updateDashboardStats();
        }
    } else {
        alert('Error creating assignment. Please try again.');
    }
}

// Handle grade submission
function handleGradeSubmit(e) {
    e.preventDefault();
    
    const formData = new FormData(e.target);
    const gradeData = {
        studentId: formData.get('gradeStudent') || document.getElementById('gradeStudent').value,
        assignmentId: formData.get('gradeAssignment') || document.getElementById('gradeAssignment').value,
        category: formData.get('gradeCategory') || document.getElementById('gradeCategory').value,
        score: parseFloat(formData.get('gradeScore') || document.getElementById('gradeScore').value),
        maxScore: parseInt(formData.get('gradeMaxScore') || document.getElementById('gradeMaxScore').value),
        comments: formData.get('gradeComments') || document.getElementById('gradeComments').value,
        teacherId: auth.getCurrentUser().id || 'admin'
    };

    // Get assignment title for display
    const assignment = db.getData('assignments').find(a => a.id === gradeData.assignmentId);
    if (assignment) {
        gradeData.assignmentTitle = assignment.title;
    }

    if (db.addGrade(gradeData)) {
        alert('Grade added successfully!');
        closeModal('addGradeModal');
        if (window.portalManager) {
            window.portalManager.loadGradeManagement();
        }
    } else {
        alert('Error adding grade. Please try again.');
    }
}

// Handle attendance submission
function handleAttendanceSubmit(e) {
    e.preventDefault();
    
    const classSelect = document.getElementById('attendanceClass');
    const dateInput = document.getElementById('attendanceDate');
    const className = classSelect.value;
    const date = dateInput.value;

    if (!className || !date) {
        alert('Please select class and date.');
        return;
    }

    const students = db.getData('students');
    let successCount = 0;

    students.forEach(student => {
        const statusSelect = document.querySelector(`select[name="attendance_${student.id}"]`);
        if (statusSelect) {
            const attendanceData = {
                studentId: student.id,
                classId: className,
                date: date,
                status: statusSelect.value,
                teacherId: auth.getCurrentUser().id || 'admin'
            };

            if (db.addAttendanceDetail(attendanceData)) {
                successCount++;
            }
        }
    });

    if (successCount > 0) {
        alert(`Attendance saved for ${successCount} students!`);
        closeModal('takeAttendanceModal');
        if (window.portalManager) {
            window.portalManager.loadAdvancedAttendance();
        }
    } else {
        alert('Error saving attendance. Please try again.');
    }
}

// Generate attendance report
window.generateAttendanceReport = function() {
    const studentId = document.getElementById('reportStudent').value;
    const startDate = document.getElementById('reportStartDate').value;
    const endDate = document.getElementById('reportEndDate').value;
    const reportContent = document.getElementById('attendanceReportContent');

    if (!reportContent) return;

    let students = [];
    if (studentId) {
        const student = db.getUserById('students', studentId);
        if (student) students = [student];
    } else {
        students = db.getData('students');
    }

    if (students.length === 0) {
        reportContent.innerHTML = '<div class="empty-state">No students found.</div>';
        return;
    }

    let reportHTML = '<div class="overflow-x-auto"><table class="w-full border-collapse border border-gray-300">';
    reportHTML += '<thead><tr class="bg-gray-100">';
    reportHTML += '<th class="border border-gray-300 p-2">Student</th>';
    reportHTML += '<th class="border border-gray-300 p-2">Total Classes</th>';
    reportHTML += '<th class="border border-gray-300 p-2">Present</th>';
    reportHTML += '<th class="border border-gray-300 p-2">Absent</th>';
    reportHTML += '<th class="border border-gray-300 p-2">Late</th>';
    reportHTML += '<th class="border border-gray-300 p-2">Excused</th>';
    reportHTML += '<th class="border border-gray-300 p-2">Attendance %</th>';
    reportHTML += '</tr></thead><tbody>';

    students.forEach(student => {
        const stats = db.getAttendanceStatistics(student.id);
        const percentage = stats.percentage;
        
        reportHTML += '<tr>';
        reportHTML += `<td class="border border-gray-300 p-2">${student.name}</td>`;
        reportHTML += `<td class="border border-gray-300 p-2 text-center">${stats.total}</td>`;
        reportHTML += `<td class="border border-gray-300 p-2 text-center text-green-600">${stats.present}</td>`;
        reportHTML += `<td class="border border-gray-300 p-2 text-center text-red-600">${stats.absent}</td>`;
        reportHTML += `<td class="border border-gray-300 p-2 text-center text-yellow-600">${stats.late}</td>`;
        reportHTML += `<td class="border border-gray-300 p-2 text-center text-blue-600">${stats.excused}</td>`;
        reportHTML += `<td class="border border-gray-300 p-2 text-center font-bold ${percentage >= 80 ? 'text-green-600' : percentage >= 60 ? 'text-yellow-600' : 'text-red-600'}">${percentage}%</td>`;
        reportHTML += '</tr>';
    });

    reportHTML += '</tbody></table></div>';
    reportContent.innerHTML = reportHTML;
};

// Assignment management functions
window.viewAssignment = function(assignmentId) {
    const assignment = db.getData('assignments').find(a => a.id === assignmentId);
    if (!assignment) {
        alert('Assignment not found.');
        return;
    }

    const submissions = db.getSubmissionsByAssignment(assignmentId);
    const students = db.getData('students');
    
    let modalContent = `
        <div class="modal-content w-full max-w-4xl p-6 rounded-lg shadow-xl">
            <h2 class="text-2xl font-bold mb-4">${assignment.title}</h2>
            <div class="mb-4">
                <p class="text-gray-600"><strong>Subject:</strong> ${assignment.subject}</p>
                <p class="text-gray-600"><strong>Due Date:</strong> ${assignment.dueDate}</p>
                <p class="text-gray-600"><strong>Max Score:</strong> ${assignment.maxScore}</p>
                <p class="text-gray-600"><strong>Description:</strong> ${assignment.description}</p>
            </div>
            <h3 class="text-lg font-semibold mb-3">Submissions (${submissions.length})</h3>
            <div class="overflow-x-auto">
                <table class="w-full border-collapse border border-gray-300">
                    <thead><tr class="bg-gray-100">
                        <th class="border border-gray-300 p-2">Student</th>
                        <th class="border border-gray-300 p-2">Submitted</th>
                        <th class="border border-gray-300 p-2">Status</th>
                        <th class="border border-gray-300 p-2">Actions</th>
                    </tr></thead>
                    <tbody>
    `;

    submissions.forEach(submission => {
        const student = students.find(s => s.id === submission.studentId);
        const submittedDate = new Date(submission.submittedAt).toLocaleDateString();
        
        modalContent += `
            <tr>
                <td class="border border-gray-300 p-2">${student ? student.name : 'Unknown'}</td>
                <td class="border border-gray-300 p-2">${submittedDate}</td>
                <td class="border border-gray-300 p-2">
                    <span class="px-2 py-1 rounded text-sm bg-green-100 text-green-800">${submission.status}</span>
                </td>
                <td class="border border-gray-300 p-2">
                    <button onclick="gradeSubmission('${submission.id}')" class="text-blue-600 hover:text-blue-800 mr-2">
                        <i class="fas fa-star"></i> Grade
                    </button>
                </td>
            </tr>
        `;
    });

    modalContent += `
                    </tbody>
                </table>
            </div>
            <div class="flex justify-end mt-4">
                <button onclick="closeModal('viewAssignmentModal')" class="btn-secondary px-4 py-2 rounded-lg">Close</button>
            </div>
        </div>
    `;

    // Create modal if it doesn't exist
    let modal = document.getElementById('viewAssignmentModal');
    if (!modal) {
        modal = document.createElement('div');
        modal.id = 'viewAssignmentModal';
        modal.className = 'modal-backdrop fixed inset-0 flex items-center justify-center hidden';
        document.body.appendChild(modal);
    }
    
    modal.innerHTML = modalContent;
    openModal('viewAssignmentModal');
};

window.editAssignment = function(assignmentId) {
    // Implementation for editing assignment
    alert('Edit assignment functionality coming soon!');
};

window.deleteAssignment = function(assignmentId) {
    if (confirm('Are you sure you want to delete this assignment?')) {
        const assignments = db.getData('assignments');
        const filteredAssignments = assignments.filter(a => a.id !== assignmentId);
        
        if (db.setData('assignments', filteredAssignments)) {
            alert('Assignment deleted successfully!');
            if (window.portalManager) {
                window.portalManager.loadAssignments();
                window.portalManager.updateDashboardStats();
            }
        } else {
            alert('Error deleting assignment.');
        }
    }
};

window.gradeSubmission = function(submissionId) {
    // Implementation for grading submission
    alert('Grade submission functionality coming soon!');
};

window.editGradeCategory = function(categoryId) {
    // Implementation for editing grade category
    alert('Edit grade category functionality coming soon!');
};

// Close modal when clicking outside
document.addEventListener('click', (e) => {
    if (e.target.classList.contains('modal-backdrop')) {
        e.target.classList.add('hidden');
    }
}); 