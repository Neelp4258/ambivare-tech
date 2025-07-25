// Teacher Task Management System

// Teacher Task Manager
window.teacherTaskManager = {
    // Initialize teacher task manager
    init: function() {
        this.setupEventListeners();
        this.populateTeacherClasses();
    },

    // Setup event listeners
    setupEventListeners: function() {
        // Teacher task form submission
        const teacherTaskForm = document.getElementById('teacherTaskForm');
        if (teacherTaskForm) {
            teacherTaskForm.addEventListener('submit', this.handleTeacherTaskSubmit.bind(this));
        }

        // File handling
        this.handleTeacherFileSelection();
    },

    // Populate teacher's classes in the dropdown
    populateTeacherClasses: function() {
        const currentUser = auth.getCurrentUser();
        if (!currentUser) return;

        const classes = db.getClassesByTeacher(currentUser.id);
        const classSelect = document.getElementById('teacherTaskClass');
        const studentSelect = document.getElementById('teacherTaskStudent');
        
        if (classSelect) {
            classSelect.innerHTML = '<option value="">Select Class</option>';
            classes.forEach(cls => {
                const option = document.createElement('option');
                option.value = cls.id;
                option.textContent = cls.name;
                classSelect.appendChild(option);
            });
        }

        if (studentSelect) {
            studentSelect.innerHTML = '<option value="">Select Student</option>';
            // Get all students from teacher's classes
            const allStudents = db.getData('students');
            const teacherStudents = allStudents.filter(student => 
                classes.some(cls => cls.id === student.classId)
            );
            
            teacherStudents.forEach(student => {
                const option = document.createElement('option');
                option.value = student.id;
                option.textContent = student.name;
                studentSelect.appendChild(option);
            });
        }
    },

    // Update assignment options based on selected type
    updateAssignmentOptions: function() {
        const assignmentType = document.querySelector('input[name="teacherAssignmentType"]:checked').value;
        const optionsContainer = document.getElementById('teacherAssignmentOptions');
        
        if (!optionsContainer) return;
        
        let optionsHTML = '';
        
        switch (assignmentType) {
            case 'class':
                const currentUser = auth.getCurrentUser();
                const classes = db.getClassesByTeacher(currentUser.id);
                optionsHTML = `
                    <select id="teacherTaskClass" class="w-full p-2 border rounded mt-1" required>
                        <option value="">Select Class</option>
                        ${classes.map(cls => `<option value="${cls.id}">${cls.name}</option>`).join('')}
                    </select>
                `;
                break;
                
            case 'student':
                const allStudents = db.getData('students');
                const teacherClasses = db.getClassesByTeacher(currentUser.id);
                const teacherStudents = allStudents.filter(student => 
                    teacherClasses.some(cls => cls.id === student.classId)
                );
                optionsHTML = `
                    <select id="teacherTaskStudent" class="w-full p-2 border rounded mt-1" required>
                        <option value="">Select Student</option>
                        ${teacherStudents.map(student => `<option value="${student.id}">${student.name}</option>`).join('')}
                    </select>
                `;
                break;
        }
        
        optionsContainer.innerHTML = optionsHTML;
    },

    // Handle file selection for teacher tasks
    handleTeacherFileSelection: function() {
        const fileInput = document.getElementById('teacherTaskFiles');
        const fileList = document.getElementById('teacherFileList');
        
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

    // Handle teacher task form submission
    handleTeacherTaskSubmit: function(e) {
        e.preventDefault();
        
        const currentUser = auth.getCurrentUser();
        if (!currentUser) {
            alert('Please login to create tasks.');
            return;
        }

        const assignmentType = document.querySelector('input[name="teacherAssignmentType"]:checked').value;
        
        // Get assignment target based on type
        let assignmentTarget = {};
        if (assignmentType === 'class') {
            const classId = document.getElementById('teacherTaskClass').value;
            if (!classId) {
                alert('Please select a class.');
                return;
            }
            assignmentTarget.classId = classId;
            assignmentTarget.assignmentType = 'class';
        } else if (assignmentType === 'student') {
            const studentId = document.getElementById('teacherTaskStudent').value;
            if (!studentId) {
                alert('Please select a student.');
                return;
            }
            assignmentTarget.studentId = studentId;
            assignmentTarget.assignmentType = 'student';
        }
        
        // Handle file uploads
        const fileInput = document.getElementById('teacherTaskFiles');
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
            title: document.getElementById('teacherTaskTitle').value,
            subject: document.getElementById('teacherTaskSubject').value,
            description: document.getElementById('teacherTaskDesc').value,
            dueDate: document.getElementById('teacherTaskDueDate').value,
            priority: document.getElementById('teacherTaskPriority').value,
            allowFileSubmission: document.getElementById('teacherAllowFileSubmission').checked,
            allowLateSubmission: document.getElementById('teacherAllowLateSubmission').checked,
            attachedFiles: attachedFiles,
            createdBy: currentUser.id,
            ...assignmentTarget
        };
        
        if (db.addTask(taskData)) {
            alert('Task created successfully!');
            closeTeacherTaskModal();
            this.resetTeacherTaskForm();
            
            // Refresh task list
            if (window.portalManager) {
                window.portalManager.loadTasks();
            }
        } else {
            alert('Error creating task. Please try again.');
        }
    },

    // Reset teacher task form
    resetTeacherTaskForm: function() {
        const form = document.getElementById('teacherTaskForm');
        if (form) {
            form.reset();
        }
        
        const fileList = document.getElementById('teacherFileList');
        if (fileList) {
            fileList.innerHTML = '';
        }
        
        // Reset assignment options to default
        this.updateAssignmentOptions();
    },

    // Load teacher-specific tasks
    loadTeacherTasks: function() {
        const currentUser = auth.getCurrentUser();
        if (!currentUser) return;

        const allTasks = db.getTasks();
        const teacherTasks = allTasks.filter(task => task.createdBy === currentUser.id);
        
        const tasksList = document.getElementById('task-list');
        if (!tasksList) return;

        if (teacherTasks.length === 0) {
            tasksList.innerHTML = '<tr><td colspan="7" class="p-4 text-center text-gray-500">No tasks created yet.</td></tr>';
            return;
        }

        tasksList.innerHTML = teacherTasks.map(task => {
            const assignedToText = this.getTaskAssignedToText(task);
            const progressBar = this.getTaskProgressBar(task);
            const statusBadge = this.getTaskStatusBadge(task);
            
            return `
                <tr>
                    <td class="p-3 font-semibold">${task.title}</td>
                    <td class="p-3">${assignedToText}</td>
                    <td class="p-3">${task.subject}</td>
                    <td class="p-3">${task.dueDate}</td>
                    <td class="p-3">
                        <div class="w-full bg-gray-200 rounded-full h-2">
                            ${progressBar}
                        </div>
                        <span class="text-xs text-gray-600">${task.progress?.submitted || 0}/${task.progress?.total || 0}</span>
                    </td>
                    <td class="p-3">${statusBadge}</td>
                    <td class="p-3">
                        <button onclick="teacherTaskManager.viewTask('${task.id}')" class="text-blue-600 hover:text-blue-800 mr-2">
                            <i class="fas fa-eye"></i>
                        </button>
                        <button onclick="teacherTaskManager.editTask('${task.id}')" class="text-green-600 hover:text-green-800 mr-2">
                            <i class="fas fa-edit"></i>
                        </button>
                        <button onclick="teacherTaskManager.deleteTask('${task.id}')" class="text-red-600 hover:text-red-800">
                            <i class="fas fa-trash"></i>
                        </button>
                    </td>
                </tr>
            `;
        }).join('');
    },

    // Get task assigned to text
    getTaskAssignedToText: function(task) {
        if (!task.assignedTo || task.assignedTo.length === 0) {
            return 'No assignees';
        }
        
        if (task.assignedTo.length === 1) {
            return task.assignedTo[0].name;
        }
        
        if (task.assignmentType === 'class') {
            const classInfo = db.getClassById(task.classId);
            return classInfo ? `Class: ${classInfo.name}` : 'Unknown Class';
        }
        
        return `${task.assignedTo.length} assignees`;
    },

    // Get task progress bar
    getTaskProgressBar: function(task) {
        if (!task.progress || task.progress.total === 0) {
            return '<div class="bg-gray-300 h-2 rounded-full" style="width: 0%"></div>';
        }
        
        const percentage = Math.round((task.progress.submitted / task.progress.total) * 100);
        const color = percentage >= 80 ? 'bg-green-500' : percentage >= 50 ? 'bg-yellow-500' : 'bg-red-500';
        
        return `<div class="${color} h-2 rounded-full" style="width: ${percentage}%"></div>`;
    },

    // Get task status badge
    getTaskStatusBadge: function(task) {
        const isOverdue = new Date(task.dueDate) < new Date() && task.status !== 'completed';
        
        if (isOverdue) {
            return '<span class="px-2 py-1 rounded text-sm bg-red-100 text-red-800">Overdue</span>';
        }
        
        switch (task.status) {
            case 'active':
                return '<span class="px-2 py-1 rounded text-sm bg-green-100 text-green-800">Active</span>';
            case 'completed':
                return '<span class="px-2 py-1 rounded text-sm bg-blue-100 text-blue-800">Completed</span>';
            default:
                return '<span class="px-2 py-1 rounded text-sm bg-gray-100 text-gray-800">Unknown</span>';
        }
    },

    // View task details
    viewTask: function(taskId) {
        const task = db.getTaskById(taskId);
        if (!task) {
            alert('Task not found');
            return;
        }
        
        // Create a modal to display task details
        const modalHtml = `
            <div id="viewTeacherTaskModal" class="modal-backdrop fixed inset-0 bg-black bg-opacity-50 z-50 flex items-center justify-center">
                <div class="bg-white rounded-lg shadow-lg max-w-2xl w-full mx-4 max-h-[90vh] overflow-y-auto">
                    <div class="p-6">
                        <div class="flex justify-between items-center mb-4">
                            <h2 class="text-2xl font-bold text-gray-800">${task.title}</h2>
                            <button onclick="closeModal('viewTeacherTaskModal')" class="text-gray-500 hover:text-gray-700">
                                <i class="fas fa-times"></i>
                            </button>
                        </div>
                        <div class="space-y-4">
                            <div>
                                <label class="block text-sm font-medium text-gray-700">Subject</label>
                                <p class="text-gray-900">${task.subject}</p>
                            </div>
                            <div>
                                <label class="block text-sm font-medium text-gray-700">Description</label>
                                <p class="text-gray-900">${task.description || 'No description provided'}</p>
                            </div>
                            <div class="grid grid-cols-2 gap-4">
                                <div>
                                    <label class="block text-sm font-medium text-gray-700">Due Date</label>
                                    <p class="text-gray-900">${task.dueDate}</p>
                                </div>
                                <div>
                                    <label class="block text-sm font-medium text-gray-700">Priority</label>
                                    <span class="px-2 py-1 rounded text-sm ${task.priority === 'high' ? 'bg-red-100 text-red-800' : task.priority === 'medium' ? 'bg-yellow-100 text-yellow-800' : 'bg-green-100 text-green-800'}">
                                        ${task.priority} priority
                                    </span>
                                </div>
                            </div>
                            <div>
                                <label class="block text-sm font-medium text-gray-700">Progress</label>
                                <div class="w-full bg-gray-200 rounded-full h-2 mt-1">
                                    <div class="bg-blue-500 h-2 rounded-full" style="width: ${task.progress?.total > 0 ? Math.round((task.progress.submitted / task.progress.total) * 100) : 0}%"></div>
                                </div>
                                <p class="text-sm text-gray-600 mt-1">${task.progress?.submitted || 0}/${task.progress?.total || 0} submitted</p>
                            </div>
                            ${task.attachedFiles && task.attachedFiles.length > 0 ? `
                                <div>
                                    <label class="block text-sm font-medium text-gray-700">Attached Files</label>
                                    <div class="space-y-2 mt-1">
                                        ${task.attachedFiles.map(file => `
                                            <div class="flex items-center p-2 bg-gray-50 rounded">
                                                <i class="fas fa-file mr-2 text-gray-500"></i>
                                                <span class="text-sm text-gray-700">${file.name}</span>
                                            </div>
                                        `).join('')}
                                    </div>
                                </div>
                            ` : ''}
                        </div>
                    </div>
                </div>
            </div>
        `;
        
        // Remove existing modal if present
        const existingModal = document.getElementById('viewTeacherTaskModal');
        if (existingModal) {
            existingModal.remove();
        }
        
        document.body.insertAdjacentHTML('beforeend', modalHtml);
    },

    // Edit task (placeholder for future implementation)
    editTask: function(taskId) {
        alert('Task editing functionality will be implemented in a future update.');
    },

    // Delete task
    deleteTask: function(taskId) {
        if (confirm('Are you sure you want to delete this task?')) {
            if (db.deleteTask(taskId)) {
                alert('Task deleted successfully!');
                this.loadTeacherTasks();
            } else {
                alert('Error deleting task. Please try again.');
            }
        }
    }
};

// Global functions for teacher task modal
function openTeacherTaskModal() {
    const modal = document.getElementById('teacherTaskModal');
    if (modal) {
        modal.classList.remove('hidden');
        // Set default due date to tomorrow
        const tomorrow = new Date();
        tomorrow.setDate(tomorrow.getDate() + 1);
        document.getElementById('teacherTaskDueDate').value = tomorrow.toISOString().split('T')[0];
        
        // Initialize assignment options
        if (window.teacherTaskManager) {
            window.teacherTaskManager.updateAssignmentOptions();
        }
    }
}

function closeTeacherTaskModal() {
    const modal = document.getElementById('teacherTaskModal');
    if (modal) {
        modal.classList.add('hidden');
        if (window.teacherTaskManager) {
            window.teacherTaskManager.resetTeacherTaskForm();
        }
    }
}

// Global function to update teacher assignment options
function updateTeacherAssignmentOptions() {
    if (window.teacherTaskManager) {
        window.teacherTaskManager.updateAssignmentOptions();
    }
}

// Initialize teacher task manager when DOM is loaded
document.addEventListener('DOMContentLoaded', function() {
    if (window.teacherTaskManager) {
        window.teacherTaskManager.init();
    }
}); 