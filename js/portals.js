// Portal Functionality for Admin, Teacher, and Student Portals

class PortalManager {
    constructor() {
        this.currentPage = 'dashboard';
        this.init();
    }

    init() {
        this.setupNavigation();
        this.loadDashboard();
        this.setupMobileMenu();
    }

    // Setup navigation between different sections
    setupNavigation() {
        const navLinks = document.querySelectorAll('[data-target]');
        navLinks.forEach(link => {
            link.addEventListener('click', (e) => {
                e.preventDefault();
                const target = link.getAttribute('data-target');
                this.showPage(target);
                
                // Update active state
                navLinks.forEach(l => l.classList.remove('active'));
                link.classList.add('active');
            });
        });
    }

    // Show specific page content
    showPage(pageName) {
        this.currentPage = pageName;
        
        // Hide all page content
        const pages = document.querySelectorAll('.page-content');
        pages.forEach(page => page.classList.add('hidden'));
        
        // Show target page
        const targetPage = document.getElementById(pageName);
        if (targetPage) {
            targetPage.classList.remove('hidden');
        }
        
        // Update page title
        const pageTitle = document.getElementById('page-title');
        if (pageTitle) {
            pageTitle.textContent = this.getPageTitle(pageName);
        }
        
        // Load page-specific content
        this.loadPageContent(pageName);
    }

    // Get page title
    getPageTitle(pageName) {
        const titles = {
            dashboard: 'Dashboard',
            teachers: 'Teachers',
            classes: 'Classes',
            candidates: 'Students',
            tasks: 'Tasks',
            timetable: 'Time Table',
            exams: 'Exam Schedules',
            homework: 'Tasks', // Updated to Tasks
            attendance: 'Attendance',
            assignments: 'Tasks', // Updated to Tasks
            grades: 'Grade Management',
            results: 'Exam Results',
            reports: 'Student Reports',
            announcements: 'Announcements'
        };
        return titles[pageName] || 'Dashboard';
    }

    // Load page-specific content
    loadPageContent(pageName) {
        try {
            switch (pageName) {
                case 'dashboard':
                    this.loadDashboard();
                    break;
                case 'teachers':
                    this.loadTeachers();
                    break;
                case 'classes':
                    if (auth.getCurrentUserType() === 'teachers') {
                        this.loadTeacherClasses();
                    } else {
                        this.loadClasses();
                    }
                    break;
                
                case 'candidates':
                    this.loadStudents();
                    break;
                case 'timetable':
                    this.loadTimetable();
                    break;
                case 'exams':
                    this.loadExams();
                    break;
                case 'homework':
                case 'tasks':
                    this.loadTasks(); // Updated to use unified task system
                    break;
                case 'attendance':
                    this.loadAdvancedAttendance();
                    break;
                case 'assignments':
                    this.loadTasks(); // Updated to use unified task system
                    break;

                case 'results':
                    this.loadExamResults();
                    break;
                case 'announcements':
                    this.loadAnnouncements();
                    break;
                case 'students':
                    if (typeof this.loadTeacherStudents === 'function') {
                        this.loadTeacherStudents();
                    } else {
                        console.error('loadTeacherStudents function not found');
                    }
                    break;
                case 'analytics':
                    if (typeof this.loadTeacherAnalytics === 'function') {
                        this.loadTeacherAnalytics();
                    } else {
                        console.error('loadTeacherAnalytics function not found');
                    }
                    break;
                default:
                    console.warn(`Unknown page: ${pageName}`);
            }
        } catch (error) {
            console.error(`Error loading page content for ${pageName}:`, error);
        }
    }

    // Load dashboard content
    loadDashboard() {
        const userType = auth.getCurrentUserType();
        const stats = db.getDashboardStats();
        
        if (userType === 'admin') {
            this.loadAdminDashboard(stats);
        } else if (userType === 'teachers') {
            this.loadTeacherDashboard();
        } else if (userType === 'students') {
            this.loadStudentDashboard();
        }
    }

    // Load admin dashboard
    loadAdminDashboard(stats) {
        const dashboardContent = document.getElementById('dashboard');
        if (!dashboardContent) return;

        dashboardContent.innerHTML = `
            <div class="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
                <div class="portal-card p-6">
                    <div class="flex items-center">
                        <div class="p-3 rounded-full bg-blue-100">
                            <i class="fas fa-chalkboard-teacher text-2xl text-blue-600"></i>
                        </div>
                        <div class="ml-4">
                            <p class="text-sm font-medium text-gray-600">Total Teachers</p>
                            <p class="text-2xl font-semibold text-gray-900">${stats.totalTeachers}</p>
                        </div>
                    </div>
                </div>
                <div class="portal-card p-6">
                    <div class="flex items-center">
                        <div class="p-3 rounded-full bg-green-100">
                            <i class="fas fa-user-graduate text-2xl text-green-600"></i>
                        </div>
                        <div class="ml-4">
                            <p class="text-sm font-medium text-gray-600">Total Students</p>
                            <p class="text-2xl font-semibold text-gray-900">${stats.totalStudents}</p>
                        </div>
                    </div>
                </div>
                <div class="portal-card p-6">
                    <div class="flex items-center">
                        <div class="p-3 rounded-full bg-yellow-100">
                            <i class="fas fa-file-alt text-2xl text-yellow-600"></i>
                        </div>
                        <div class="ml-4">
                            <p class="text-sm font-medium text-gray-600">Total Exams</p>
                            <p class="text-2xl font-semibold text-gray-900">${stats.totalExams}</p>
                        </div>
                    </div>
                </div>
                <div class="portal-card p-6">
                    <div class="flex items-center">
                        <div class="p-3 rounded-full bg-purple-100">
                            <i class="fas fa-tasks text-2xl text-purple-600"></i>
                        </div>
                        <div class="ml-4">
                            <p class="text-sm font-medium text-gray-600">Total Tasks</p>
                            <p class="text-2xl font-semibold text-gray-900">${stats.totalTasks || 0}</p>
                        </div>
                    </div>
                </div>
            </div>
            <div class="mt-8 grid grid-cols-1 lg:grid-cols-2 gap-6">
                <div class="portal-card p-6">
                    <h3 class="text-lg font-semibold text-gray-900 mb-4">Recent Activities</h3>
                    <div class="space-y-3">
                        <div class="flex items-center text-sm text-gray-600">
                            <i class="fas fa-circle text-blue-500 mr-2"></i>
                            <span>New teacher registration: Dr. Sarah Johnson</span>
                        </div>
                        <div class="flex items-center text-sm text-gray-600">
                            <i class="fas fa-circle text-green-500 mr-2"></i>
                            <span>Exam scheduled: Mid-Term Mathematics</span>
                        </div>
                        <div class="flex items-center text-sm text-gray-600">
                            <i class="fas fa-circle text-yellow-500 mr-2"></i>
                            <span>Task assigned: Algebra Practice Problems</span>
                        </div>
                    </div>
                </div>
                <div class="portal-card p-6">
                    <h3 class="text-lg font-semibold text-gray-900 mb-4">Quick Actions</h3>
                    <div class="space-y-3">
                        <button onclick="showModal('addTeacherModal')" class="w-full text-left p-3 rounded-lg bg-blue-50 hover:bg-blue-100 transition">
                            <i class="fas fa-plus mr-2 text-blue-600"></i>
                            Add New Teacher
                        </button>
                        <button onclick="showModal('addStudentModal')" class="w-full text-left p-3 rounded-lg bg-green-50 hover:bg-green-100 transition">
                            <i class="fas fa-user-plus mr-2 text-green-600"></i>
                            Add New Student
                        </button>
                        <button onclick="showModal('addExamModal')" class="w-full text-left p-3 rounded-lg bg-yellow-50 hover:bg-yellow-100 transition">
                            <i class="fas fa-calendar-plus mr-2 text-yellow-600"></i>
                            Schedule Exam
                        </button>
                    </div>
                </div>
            </div>
        `;
    }

    // Load teacher dashboard
    loadTeacherDashboard() {
        const currentUser = auth.getCurrentUser();
        const teacherId = currentUser.id;
        
        // Get teacher's timetable and tasks
        const timetable = db.getTimetableByTeacher(teacherId);
        const tasks = db.getTasksByAssignee(teacherId, 'teacher');
        
        const dashboardContent = document.getElementById('dashboard');
        if (!dashboardContent) return;

        dashboardContent.innerHTML = `
            <h2 class="text-3xl font-bold text-gray-800 mb-6">Welcome, ${currentUser.name}!</h2>
            <div class="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div class="portal-card p-6">
                    <h3 class="text-xl font-bold text-gray-800 mb-4 flex items-center">
                        <i class="fas fa-calendar-day mr-3 text-blue-500"></i>Today's Classes
                    </h3>
                    <div class="space-y-3">
                        ${this.renderTodayClasses(timetable)}
                    </div>
                </div>
                <div class="portal-card p-6">
                    <h3 class="text-xl font-bold text-gray-800 mb-4 flex items-center">
                        <i class="fas fa-tasks mr-3 text-green-500"></i>Assigned Tasks
                    </h3>
                    <div class="space-y-3">
                        ${this.renderTeacherTasks(tasks)}
                    </div>
                </div>
            </div>
            <div class="mt-6">
                <div class="portal-card p-6">
                    <h3 class="text-xl font-bold text-gray-800 mb-4 flex items-center">
                        <i class="fas fa-chart-line mr-3 text-purple-500"></i>Task Statistics
                    </h3>
                    <div class="grid grid-cols-2 md:grid-cols-4 gap-4">
                        ${this.renderTeacherTaskStatistics(teacherId)}
                    </div>
                </div>
            </div>
        `;
    }

    // Load student dashboard
    loadStudentDashboard() {
        const currentUser = auth.getCurrentUser();
        const studentId = currentUser.id;
        
        // Get student's data
        const attendance = db.getAttendanceByStudent(studentId);
        const examResults = db.getExamResultsByStudent(studentId);
        const exams = db.getData('exams');
        const tasks = db.getTasksByAssignee(studentId, 'student');
        const classInfo = currentUser.classId ? db.getClassById(currentUser.classId) : null;
        
        const dashboardContent = document.getElementById('dashboard');
        if (!dashboardContent) return;

        dashboardContent.innerHTML = `
            <h2 class="text-3xl font-bold text-gray-800 mb-6">Welcome, ${currentUser.name}!</h2>
            <div class="mb-4 p-4 bg-blue-50 rounded-lg">
                <h3 class="text-lg font-semibold text-blue-800">Class Information</h3>
                <p class="text-blue-600">${classInfo ? `${classInfo.name} - ${classInfo.subject || 'No Subject'}` : 'Not assigned to any class'}</p>
            </div>
            <div class="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div class="portal-card p-6">
                    <h3 class="text-xl font-bold text-gray-800 mb-4 flex items-center">
                        <i class="fas fa-tasks mr-3 text-green-500"></i>Pending Tasks
                    </h3>
                    <div class="space-y-3">
                        ${this.renderStudentTasks(tasks)}
                    </div>
                </div>
                <div class="portal-card p-6">
                    <h3 class="text-xl font-bold text-gray-800 mb-4 flex items-center">
                        <i class="fas fa-file-signature mr-3 text-red-500"></i>Upcoming Exams
                    </h3>
                    <div class="space-y-3">
                        ${this.renderStudentUpcomingExams(exams, currentUser.classId)}
                    </div>
                </div>
            </div>
            <div class="mt-6 grid grid-cols-1 md:grid-cols-2 gap-6">
                <div class="portal-card p-6">
                    <h3 class="text-xl font-bold text-gray-800 mb-4">Today's Schedule</h3>
                    <div class="space-y-3">
                        ${this.renderStudentTodaySchedule(currentUser.classId)}
                    </div>
                </div>
                <div class="portal-card p-6">
                    <h3 class="text-xl font-bold text-gray-800 mb-4">Attendance Summary</h3>
                    <div class="space-y-3">
                        ${this.renderAttendanceSummary(attendance)}
                    </div>
                </div>
            </div>
        `;
    }

    // Render today's classes for teacher
    renderTodayClasses(timetable) {
        const today = new Date().toLocaleDateString('en-US', { weekday: 'long' });
        const todayClasses = timetable.filter(entry => entry.day === today);
        
        if (todayClasses.length === 0) {
            return '<div class="empty-state">No classes scheduled for today.</div>';
        }
        
        return todayClasses.map(entry => `
            <div class="flex justify-between items-center p-3 bg-blue-50 rounded-lg">
                <div>
                    <p class="font-semibold text-gray-800">${entry.subject}</p>
                    <p class="text-sm text-gray-600">${entry.time} - ${entry.room}</p>
                </div>
                <span class="text-sm text-blue-600 font-medium">${entry.time}</span>
            </div>
        `).join('');
    }

    // Render teacher tasks
    renderTeacherTasks(tasks) {
        const pendingTasks = tasks.filter(task => task.status === 'active' && new Date(task.dueDate) > new Date());
        
        if (pendingTasks.length === 0) {
            return '<div class="empty-state">No pending tasks assigned to you.</div>';
        }
        
        return pendingTasks.slice(0, 3).map(task => `
            <div class="p-3 bg-green-50 rounded-lg">
                <p class="font-semibold text-gray-800">${task.title}</p>
                <p class="text-sm text-gray-600">${task.subject}</p>
                <p class="text-sm text-green-600">Due: ${task.dueDate}</p>
                <div class="mt-2">
                    <span class="text-xs px-2 py-1 rounded ${task.priority === 'high' ? 'bg-red-100 text-red-800' : task.priority === 'medium' ? 'bg-yellow-100 text-yellow-800' : 'bg-green-100 text-green-800'}">
                        ${task.priority} priority
                    </span>
                </div>
            </div>
        `).join('');
    }

    // Render teacher task statistics
    renderTeacherTaskStatistics(teacherId) {
        const allTasks = db.getTasks();
        const createdTasks = allTasks.filter(task => task.createdBy === teacherId);
        const assignedTasks = db.getTasksByAssignee(teacherId, 'teacher');
        
        const activeTasks = createdTasks.filter(task => task.status === 'active').length;
        const completedTasks = createdTasks.filter(task => task.status === 'completed').length;
        const overdueTasks = createdTasks.filter(task => 
            task.status === 'active' && new Date(task.dueDate) < new Date()
        ).length;
        
        return `
            <div class="text-center p-3 bg-blue-50 rounded-lg">
                <div class="text-xl font-bold text-blue-600">${createdTasks.length}</div>
                <p class="text-xs text-gray-600">Created</p>
            </div>
            <div class="text-center p-3 bg-green-50 rounded-lg">
                <div class="text-xl font-bold text-green-600">${activeTasks}</div>
                <p class="text-xs text-gray-600">Active</p>
            </div>
            <div class="text-center p-3 bg-yellow-50 rounded-lg">
                <div class="text-xl font-bold text-yellow-600">${completedTasks}</div>
                <p class="text-xs text-gray-600">Completed</p>
            </div>
            <div class="text-center p-3 bg-red-50 rounded-lg">
                <div class="text-xl font-bold text-red-600">${overdueTasks}</div>
                <p class="text-xs text-gray-600">Overdue</p>
            </div>
        `;
    }

    // Render student tasks
    renderStudentTasks(tasks) {
        const pendingTasks = tasks.filter(task => {
            const assignedTo = task.assignedTo?.find(assignee => assignee.id === auth.getCurrentUser().id);
            return assignedTo?.status === 'pending' && new Date(task.dueDate) >= new Date();
        });
        
        if (pendingTasks.length === 0) {
            return '<div class="empty-state">No pending tasks assigned.</div>';
        }
        
        return pendingTasks.slice(0, 3).map(task => `
            <div class="p-3 bg-yellow-50 rounded-lg">
                <p class="font-semibold text-gray-800">${task.title}</p>
                <p class="text-sm text-gray-600">${task.subject}</p>
                <p class="text-sm text-yellow-600">Due: ${task.dueDate}</p>
                <div class="mt-2 flex items-center justify-between">
                    <span class="text-xs px-2 py-1 rounded ${task.priority === 'high' ? 'bg-red-100 text-red-800' : task.priority === 'medium' ? 'bg-yellow-100 text-yellow-800' : 'bg-green-100 text-green-800'}">
                        ${task.priority} priority
                    </span>
                    ${task.allowFileSubmission ? '<i class="fas fa-paperclip text-gray-500" title="File submission allowed"></i>' : ''}
                </div>
            </div>
        `).join('');
    }

    // Render student upcoming exams
    renderStudentUpcomingExams(exams, classId) {
        const upcomingExams = exams.filter(exam => 
            new Date(exam.date) >= new Date() && exam.classId === classId
        );
        
        if (upcomingExams.length === 0) {
            return '<div class="empty-state">No upcoming exams for your class.</div>';
        }
        
        return upcomingExams.slice(0, 2).map(exam => `
            <div class="p-3 bg-red-50 rounded-lg">
                <p class="font-semibold text-gray-800">${exam.title}</p>
                <p class="text-sm text-gray-600">${exam.subject || 'No Subject'}</p>
                <p class="text-sm text-red-600">Date: ${exam.date} at ${exam.time}</p>
                <p class="text-xs text-gray-500">Duration: ${exam.duration || '2 hours'}</p>
            </div>
        `).join('');
    }

    // Render student today's schedule
    renderStudentTodaySchedule(classId) {
        if (!classId) {
            return '<div class="empty-state">Not assigned to any class.</div>';
        }
        
        const today = new Date().toLocaleDateString('en-US', { weekday: 'long' });
        const timetables = db.getData('timetables');
        const todaySchedule = timetables.filter(entry => 
            entry.day === today && entry.classId === classId
        );
        
        if (todaySchedule.length === 0) {
            return '<div class="empty-state">No classes scheduled for today.</div>';
        }
        
        return todaySchedule.map(entry => {
            const teacher = entry.teacherId ? db.getUserById('teachers', entry.teacherId) : null;
            return `
                <div class="p-3 bg-blue-50 rounded-lg">
                    <p class="font-semibold text-gray-800">${entry.subject || 'No Subject'}</p>
                    <p class="text-sm text-gray-600">${teacher ? teacher.name : 'No Teacher'}</p>
                    <p class="text-sm text-blue-600">${entry.time} - ${entry.room || 'No Room'}</p>
                </div>
            `;
        }).join('');
    }

    // Render upcoming exam
    renderUpcomingExam(exams) {
        const upcomingExams = exams.filter(exam => new Date(exam.date) > new Date());
        
        if (upcomingExams.length === 0) {
            return '<div class="empty-state">No upcoming exams.</div>';
        }
        
        const nextExam = upcomingExams[0];
        return `
            <div class="p-4 bg-red-50 rounded-lg">
                <p class="font-semibold text-gray-800">${nextExam.title}</p>
                <p class="text-sm text-gray-600">${nextExam.subject}</p>
                <p class="text-sm text-red-600">Date: ${nextExam.date} at ${nextExam.time}</p>
            </div>
        `;
    }

    // Render recent exam results
    renderRecentExamResults(examResults) {
        if (examResults.length === 0) {
            return '<div class="empty-state">No exam results available.</div>';
        }
        
        return examResults.slice(0, 3).map(result => `
            <div class="flex justify-between items-center p-3 bg-gray-50 rounded-lg">
                <div>
                    <p class="font-semibold text-gray-800">Exam ${result.examId}</p>
                    <p class="text-sm text-gray-600">Date: ${result.date}</p>
                </div>
                <span class="text-lg font-bold text-green-600">${result.percentage}%</span>
            </div>
        `).join('');
    }

    // Render attendance summary
    renderAttendanceSummary(attendance) {
        if (attendance.length === 0) {
            return '<div class="empty-state">No attendance records available.</div>';
        }
        
        const present = attendance.filter(att => att.status === 'present').length;
        const total = attendance.length;
        const percentage = Math.round((present / total) * 100);
        
        return `
            <div class="text-center">
                <div class="text-3xl font-bold text-blue-600">${percentage}%</div>
                <p class="text-sm text-gray-600">Attendance Rate</p>
                <p class="text-xs text-gray-500">${present} present out of ${total} classes</p>
            </div>
        `;
    }

    // Load teachers list
    loadTeachers() {
        const teachers = db.getData('teachers');
        const teachersList = document.getElementById('teacher-list');
        if (!teachersList) return;

        if (teachers.length === 0) {
            document.getElementById('teachers-empty').style.display = 'block';
            teachersList.innerHTML = '';
            return;
        }

        document.getElementById('teachers-empty').style.display = 'none';
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

    // Load classes list
    loadClasses() {
        const classes = db.getClasses();
        const classesList = document.getElementById('class-list');
        if (!classesList) return;

        if (classes.length === 0) {
            document.getElementById('classes-empty').style.display = 'block';
            classesList.innerHTML = '';
            return;
        }

        document.getElementById('classes-empty').style.display = 'none';
        classesList.innerHTML = classes.map(cls => {
            const teacher = cls.teacherId ? db.getUserById('teachers', cls.teacherId) : null;
            const studentCount = db.getStudentsByClass(cls.id).length;
            return `
                <tr>
                    <td class="p-3">${cls.name}</td>
                    <td class="p-3">${cls.subject || 'No Subject'}</td>
                    <td class="p-3">${cls.description || '-'}</td>
                    <td class="p-3">${teacher ? teacher.name : 'Not Assigned'}</td>
                    <td class="p-3">${studentCount} students</td>
                    <td class="p-3">
                        <button onclick="editClass('${cls.id}')" class="text-blue-600 hover:text-blue-800 mr-2" title="Edit Class">
                            <i class="fas fa-edit"></i>
                        </button>
                        <button onclick="deleteClass('${cls.id}')" class="text-red-600 hover:text-red-800" title="Delete Class">
                            <i class="fas fa-trash"></i>
                        </button>
                    </td>
                </tr>
            `;
        }).join('');
    }



    // Load teacher classes
    loadTeacherClasses() {
        const currentTeacher = auth.getCurrentUser();
        if (!currentTeacher) return;

        const classes = db.getClassesByTeacher(currentTeacher.id);
        const classesList = document.getElementById('teacher-classes-list');
        if (!classesList) return;

        if (classes.length === 0) {
            document.getElementById('teacher-classes-empty').style.display = 'block';
            classesList.innerHTML = '';
            return;
        }

        document.getElementById('teacher-classes-empty').style.display = 'none';
        classesList.innerHTML = classes.map(cls => {
            const students = db.getStudentsByClass(cls.id);
            return `
                <tr>
                    <td class="p-3">${cls.name}</td>
                    <td class="p-3">${cls.subject}</td>
                    <td class="p-3">${cls.description || '-'}</td>
                    <td class="p-3">${students.length} students</td>
                    <td class="p-3">
                        <button onclick="viewClassStudents('${cls.id}')" class="text-blue-600 hover:text-blue-800 mr-2">
                            <i class="fas fa-users"></i> View Students
                        </button>
                    </td>
                </tr>
            `;
        }).join('');
    }

    // Load teacher students
    loadTeacherStudents() {
        const currentTeacher = auth.getCurrentUser();
        if (!currentTeacher) return;

        // Get all students assigned to this teacher's classes
        const teacherClasses = db.getClasses().filter(cls => cls.teacherId === currentTeacher.id);
        const allStudents = db.getData('students');
        const teacherStudents = allStudents.filter(student => 
            teacherClasses.some(cls => cls.id === student.classId)
        );

        const studentsList = document.getElementById('teacher-students-list');
        if (!studentsList) return;

        if (teacherStudents.length === 0) {
            document.getElementById('teacher-students-empty').style.display = 'block';
            studentsList.innerHTML = '';
            return;
        }

        document.getElementById('teacher-students-empty').style.display = 'none';
        studentsList.innerHTML = teacherStudents.map(student => {
            const classInfo = student.classId ? db.getClassById(student.classId) : null;
            const attendanceStats = db.getAttendanceStatistics(student.id);
            
            return `
                <tr>
                    <td class="p-3">${student.name}</td>
                    <td class="p-3">${classInfo ? classInfo.name : 'Not Assigned'}</td>
                    <td class="p-3">${student.email || 'No Email'}</td>
                    <td class="p-3">${attendanceStats.percentage}%</td>
                    <td class="p-3">
                        <button onclick="viewStudentDetails('${student.id}')" class="text-blue-600 hover:text-blue-800 mr-2">
                            <i class="fas fa-eye"></i>
                        </button>
                        <button onclick="editStudentGrade('${student.id}')" class="text-green-600 hover:text-green-800">
                            <i class="fas fa-edit"></i>
                        </button>
                    </td>
                </tr>
            `;
        }).join('');
    }

    // Load teacher analytics
    loadTeacherAnalytics() {
        const currentTeacher = auth.getCurrentUser();
        if (!currentTeacher) return;

        const teacherClasses = db.getClasses().filter(cls => cls.teacherId === currentTeacher.id);
        const allStudents = db.getData('students');
        const teacherStudents = allStudents.filter(student => 
            teacherClasses.some(cls => cls.id === student.classId)
        );

        const analyticsContainer = document.getElementById('teacher-analytics');
        if (!analyticsContainer) return;

        // Calculate analytics
        const totalStudents = teacherStudents.length;
        const totalClasses = teacherClasses.length;
        const averageAttendance = teacherStudents.length > 0 ? 
            teacherStudents.reduce((sum, student) => {
                const stats = db.getAttendanceStatistics(student.id);
                return sum + stats.percentage;
            }, 0) / teacherStudents.length : 0;

        // Get task statistics instead of assignments
        const allTasks = db.getTasks();
        const teacherTasks = allTasks.filter(task => task.createdBy === currentTeacher.id);
        const totalTasks = teacherTasks.length;
        const completedTasks = teacherTasks.filter(task => task.status === 'completed').length;

        analyticsContainer.innerHTML = `
            <div class="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
                <div class="portal-card p-6">
                    <div class="flex items-center">
                        <div class="p-3 rounded-full bg-blue-100">
                            <i class="fas fa-users text-2xl text-blue-600"></i>
                        </div>
                        <div class="ml-4">
                            <p class="text-sm font-medium text-gray-600">Total Students</p>
                            <p class="text-2xl font-semibold text-gray-900">${totalStudents}</p>
                        </div>
                    </div>
                </div>
                <div class="portal-card p-6">
                    <div class="flex items-center">
                        <div class="p-3 rounded-full bg-green-100">
                            <i class="fas fa-chalkboard text-2xl text-green-600"></i>
                        </div>
                        <div class="ml-4">
                            <p class="text-sm font-medium text-gray-600">Total Classes</p>
                            <p class="text-2xl font-semibold text-gray-900">${totalClasses}</p>
                        </div>
                    </div>
                </div>
                <div class="portal-card p-6">
                    <div class="flex items-center">
                        <div class="p-3 rounded-full bg-yellow-100">
                            <i class="fas fa-percentage text-2xl text-yellow-600"></i>
                        </div>
                        <div class="ml-4">
                            <p class="text-sm font-medium text-gray-600">Avg. Attendance</p>
                            <p class="text-2xl font-semibold text-gray-900">${Math.round(averageAttendance)}%</p>
                        </div>
                    </div>
                </div>
                <div class="portal-card p-6">
                    <div class="flex items-center">
                        <div class="p-3 rounded-full bg-purple-100">
                            <i class="fas fa-tasks text-2xl text-purple-600"></i>
                        </div>
                        <div class="ml-4">
                            <p class="text-sm font-medium text-gray-600">Tasks Created</p>
                            <p class="text-2xl font-semibold text-gray-900">${totalTasks}</p>
                        </div>
                    </div>
                </div>
            </div>
            <div class="grid grid-cols-1 lg:grid-cols-2 gap-6">
                <div class="portal-card p-6">
                    <h3 class="text-lg font-semibold text-gray-900 mb-4">Class Performance</h3>
                    <div class="space-y-3">
                        ${teacherClasses.map(cls => {
                            const classStudents = db.getStudentsByClass(cls.id);
                            const classAttendance = classStudents.length > 0 ? 
                                classStudents.reduce((sum, student) => {
                                    const stats = db.getAttendanceStatistics(student.id);
                                    return sum + stats.percentage;
                                }, 0) / classStudents.length : 0;
                            
                            return `
                                <div class="flex justify-between items-center p-3 bg-gray-50 rounded-lg">
                                    <div>
                                        <p class="font-semibold text-gray-800">${cls.name}</p>
                                        <p class="text-sm text-gray-600">${classStudents.length} students</p>
                                    </div>
                                    <span class="text-lg font-bold text-blue-600">${Math.round(classAttendance)}%</span>
                                </div>
                            `;
                        }).join('')}
                    </div>
                </div>
                <div class="portal-card p-6">
                    <h3 class="text-lg font-semibold text-gray-900 mb-4">Recent Activity</h3>
                    <div class="space-y-3">
                        <div class="flex items-center text-sm text-gray-600">
                            <i class="fas fa-circle text-blue-500 mr-2"></i>
                            <span>${totalStudents} students enrolled in your classes</span>
                        </div>
                        <div class="flex items-center text-sm text-gray-600">
                            <i class="fas fa-circle text-green-500 mr-2"></i>
                            <span>${totalTasks} tasks created</span>
                        </div>
                        <div class="flex items-center text-sm text-gray-600">
                            <i class="fas fa-circle text-purple-500 mr-2"></i>
                            <span>${completedTasks} tasks completed</span>
                        </div>
                        <div class="flex items-center text-sm text-gray-600">
                            <i class="fas fa-circle text-yellow-500 mr-2"></i>
                            <span>${Math.round(averageAttendance)}% average attendance rate</span>
                        </div>
                    </div>
                </div>
            </div>
        `;
    }

    // Load students list
    loadStudents() {
        const students = db.getData('students');
        const studentsList = document.getElementById('candidate-list');
        if (!studentsList) return;

        if (students.length === 0) {
            document.getElementById('candidates-empty').style.display = 'block';
            studentsList.innerHTML = '';
            return;
        }

        document.getElementById('candidates-empty').style.display = 'none';
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

    // Load timetable
    loadTimetable() {
        const timetables = db.getData('timetables');
        const timetableBody = document.getElementById('timetable-body');
        if (!timetableBody) return;

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
                    const teacher = entry.teacherId ? db.getUserById('teachers', entry.teacherId) : null;
                    const classInfo = entry.classId ? db.getClassById(entry.classId) : null;
                    tableHTML += `
                        <td class="p-3 bg-blue-50 rounded">
                            <div class="text-sm font-semibold">${classInfo ? classInfo.name : 'Unknown Class'}</div>
                            <div class="text-xs text-gray-600">${entry.subject || classInfo?.subject || 'No Subject'}</div>
                            <div class="text-xs text-gray-500">${teacher ? teacher.name : 'No Teacher'}</div>
                            <div class="text-xs text-gray-500">${entry.room || 'No Room'}</div>
                        </td>`;
                } else {
                    tableHTML += '<td class="p-3"></td>';
                }
            });
            
            tableHTML += '</tr>';
        });

        timetableBody.innerHTML = tableHTML;
    }

    // Load exams
    loadExams() {
        const exams = db.getData('exams');
        const examsList = document.getElementById('exams-list');
        if (!examsList) return;

        if (exams.length === 0) {
            examsList.innerHTML = '<div class="empty-state">No exams scheduled.</div>';
            return;
        }

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

    // Load tasks (unified for both homework and assignments)
    loadTasks() {
        const currentUser = auth.getCurrentUser();
        const userType = auth.getCurrentUserType();
        
        // For teacher portal, use the teacher task manager
        if (userType === 'teachers' && window.location.pathname.includes('teacher_portal')) {
            if (window.teacherTaskManager) {
                window.teacherTaskManager.loadTeacherTasks();
            }
            return;
        }
        
        let tasks = [];
        
        if (userType === 'admin') {
            tasks = db.getTasks();
        } else if (userType === 'teachers') {
            // Get tasks created by this teacher or assigned to this teacher
            const allTasks = db.getTasks();
            tasks = allTasks.filter(task => 
                task.createdBy === currentUser.id || 
                task.assignedTo?.some(assignee => assignee.id === currentUser.id && assignee.type === 'teacher')
            );
        } else if (userType === 'students') {
            // Get tasks assigned to this student
            tasks = db.getTasksByAssignee(currentUser.id, 'student');
        }
        
        const tasksList = document.getElementById('task-list') || document.getElementById('homework-list') || document.getElementById('assignment-list');
        if (!tasksList) return;

        if (tasks.length === 0) {
            tasksList.innerHTML = '<div class="empty-state">No tasks available.</div>';
            return;
        }

        tasksList.innerHTML = tasks.map(task => {
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
                        <button onclick="viewTask('${task.id}')" class="text-blue-600 hover:text-blue-800 mr-2">
                            <i class="fas fa-eye"></i>
                        </button>
                        ${userType === 'admin' || task.createdBy === currentUser.id ? `
                            <button onclick="editTask('${task.id}')" class="text-green-600 hover:text-green-800 mr-2" title="Edit Task">
                                <i class="fas fa-edit"></i>
                            </button>
                            <button onclick="deleteTask('${task.id}')" class="text-red-600 hover:text-red-800" title="Delete Task">
                                <i class="fas fa-trash"></i>
                            </button>
                        ` : ''}
                        ${userType === 'students' && task.assignedTo?.some(assignee => assignee.id === currentUser.id && assignee.status === 'pending') ? `
                            <button onclick="submitTask('${task.id}')" class="text-green-600 hover:text-green-800">
                                <i class="fas fa-upload"></i> Submit
                            </button>
                        ` : ''}
                    </td>
                </tr>
            `;
        }).join('');
    }

    // Get task assigned to text
    getTaskAssignedToText(task) {
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
    }

    // Get task progress bar
    getTaskProgressBar(task) {
        if (!task.progress || task.progress.total === 0) {
            return '<div class="bg-gray-300 h-2 rounded-full" style="width: 0%"></div>';
        }
        
        const percentage = Math.round((task.progress.submitted / task.progress.total) * 100);
        const color = percentage >= 80 ? 'bg-green-500' : percentage >= 50 ? 'bg-yellow-500' : 'bg-red-500';
        
        return `<div class="${color} h-2 rounded-full" style="width: ${percentage}%"></div>`;
    }

    // Get task status badge
    getTaskStatusBadge(task) {
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
    }

    // NEW: Update dashboard stats
    updateDashboardStats() {
        const stats = db.getDashboardStats();
        
        const teacherCount = document.getElementById('teacher-count');
        const candidateCount = document.getElementById('candidate-count');
        const taskCount = document.getElementById('task-count'); // Updated from assignment-count
        const submissionCount = document.getElementById('submission-count');

        if (teacherCount) teacherCount.textContent = stats.totalTeachers;
        if (candidateCount) candidateCount.textContent = stats.totalStudents;
        if (taskCount) taskCount.textContent = stats.totalTasks || 0; // Updated to use totalTasks
        if (submissionCount) submissionCount.textContent = stats.totalSubmissions || 0;
    }

    // Load exam results
    loadExamResults() {
        const results = db.getData('examResults');
        const resultsList = document.getElementById('results-list');
        if (!resultsList) return;

        if (results.length === 0) {
            resultsList.innerHTML = '<div class="empty-state">No exam results entered yet.</div>';
            return;
        }

        resultsList.innerHTML = results.map(result => {
            const student = db.getUserById('students', result.studentId);
            const exam = db.getData('exams').find(e => e.id === result.examId);
            return `
                <tr>
                    <td class="p-3">${exam ? exam.title : 'Unknown Exam'}</td>
                    <td class="p-3">${student ? student.name : 'Unknown Student'}</td>
                    <td class="p-3">${result.marks}/${result.totalMarks} (${result.percentage}%)</td>
                </tr>
            `;
        }).join('');
    }

    // Load announcements
    loadAnnouncements() {
        const announcements = db.getData('announcements');
        const announcementsList = document.getElementById('announcements-list');
        if (!announcementsList) return;

        if (announcements.length === 0) {
            announcementsList.innerHTML = '<div class="empty-state">No announcements available.</div>';
            return;
        }

        announcementsList.innerHTML = announcements.map(announcement => `
            <div class="p-4 bg-white rounded-lg shadow mb-4">
                <div class="flex justify-between items-start">
                    <div>
                        <h3 class="text-lg font-semibold text-gray-800">${announcement.title}</h3>
                        <p class="text-gray-600 mt-2">${announcement.content}</p>
                        <p class="text-sm text-gray-500 mt-2">Date: ${announcement.date}</p>
                    </div>
                    <span class="px-2 py-1 rounded text-xs ${announcement.priority === 'high' ? 'bg-red-100 text-red-800' : 'bg-blue-100 text-blue-800'}">
                        ${announcement.priority}
                    </span>
                </div>
            </div>
        `).join('');
    }

    // Setup mobile menu
    setupMobileMenu() {
        const menuBtn = document.getElementById('menu-btn');
        const sidebar = document.querySelector('.portal-sidebar');
        
        if (menuBtn && sidebar) {
            // Create mobile overlay
            let mobileOverlay = document.querySelector('.mobile-overlay');
            if (!mobileOverlay) {
                mobileOverlay = document.createElement('div');
                mobileOverlay.className = 'mobile-overlay';
                document.body.appendChild(mobileOverlay);
            }

            menuBtn.addEventListener('click', (e) => {
                e.stopPropagation();
                this.toggleMobileMenu(sidebar, mobileOverlay);
            });

            // Close menu when clicking overlay
            mobileOverlay.addEventListener('click', () => {
                this.closeMobileMenu(sidebar, mobileOverlay);
            });

            // Close menu when clicking on navigation links
            const navLinks = sidebar.querySelectorAll('nav a');
            navLinks.forEach(link => {
                link.addEventListener('click', () => {
                    // Small delay to allow navigation to complete
                    setTimeout(() => {
                        this.closeMobileMenu(sidebar, mobileOverlay);
                    }, 100);
                });
            });

            // Handle swipe to close on mobile
            this.setupSwipeToClose(sidebar, mobileOverlay);
        }
    }

    toggleMobileMenu(sidebar, overlay) {
        const isOpen = sidebar.classList.contains('open');
        
        if (isOpen) {
            this.closeMobileMenu(sidebar, overlay);
        } else {
            this.openMobileMenu(sidebar, overlay);
        }
    }

    openMobileMenu(sidebar, overlay) {
        sidebar.classList.add('open');
        overlay.classList.add('active');
        document.body.style.overflow = 'hidden'; // Prevent background scrolling
    }

    closeMobileMenu(sidebar, overlay) {
        sidebar.classList.remove('open');
        overlay.classList.remove('active');
        document.body.style.overflow = ''; // Restore scrolling
    }

    setupSwipeToClose(sidebar, overlay) {
        let startX = 0;
        let currentX = 0;
        let isDragging = false;

        sidebar.addEventListener('touchstart', (e) => {
            startX = e.touches[0].clientX;
            isDragging = true;
        });

        sidebar.addEventListener('touchmove', (e) => {
            if (!isDragging) return;
            
            currentX = e.touches[0].clientX;
            const diffX = startX - currentX;
            
            // Only allow swipe left to close
            if (diffX > 0) {
                const progress = Math.min(diffX / 200, 1);
                sidebar.style.transform = `translateX(-${progress * 100}%)`;
                overlay.style.opacity = 1 - progress;
            }
        });

        sidebar.addEventListener('touchend', () => {
            if (!isDragging) return;
            
            const diffX = startX - currentX;
            
            if (diffX > 100) { // Threshold for closing
                this.closeMobileMenu(sidebar, overlay);
            } else {
                // Snap back to open position
                sidebar.style.transform = '';
                overlay.style.opacity = '';
            }
            
            isDragging = false;
        });
    }

    // Enhanced load methods with mobile card layouts
    loadTeachers() {
        const teachers = db.getData('teachers');
        this.renderDataTable('teacher', teachers, this.getTeacherTableConfig());
    }

    loadClasses() {
        const classes = db.getClasses();
        this.renderDataTable('class', classes, this.getClassTableConfig());
    }

    loadStudents() {
        const students = db.getData('students');
        this.renderDataTable('candidate', students, this.getStudentTableConfig());
    }

    // Generic method to render both table and mobile card layouts
    renderDataTable(type, data, config) {
        const tableList = document.getElementById(`${type}-list`);
        const emptyElement = document.getElementById(`${type}s-empty`) || document.getElementById(`${type === 'candidate' ? 'candidates' : type + 's'}-empty`);
        
        if (!tableList) return;

        if (data.length === 0) {
            if (emptyElement) emptyElement.style.display = 'block';
            tableList.innerHTML = '';
            this.renderMobileCards(type, [], config);
            return;
        }

        if (emptyElement) emptyElement.style.display = 'none';
        
        // Render desktop table
        tableList.innerHTML = data.map(item => config.renderRow(item)).join('');
        
        // Render mobile cards
        this.renderMobileCards(type, data, config);
    }

    renderMobileCards(type, data, config) {
        let mobileContainer = document.getElementById(`mobile-${type}-cards`);
        
        if (!mobileContainer) {
            // Create mobile container if it doesn't exist
            const tableContainer = document.querySelector(`#${type}s .bg-white, #candidates .bg-white`);
            if (tableContainer) {
                mobileContainer = document.createElement('div');
                mobileContainer.id = `mobile-${type}-cards`;
                mobileContainer.className = 'mobile-card-layout';
                tableContainer.appendChild(mobileContainer);
            }
        }

        if (!mobileContainer) return;

        if (data.length === 0) {
            mobileContainer.innerHTML = '<div class="empty-state">No items found.</div>';
            return;
        }

        mobileContainer.innerHTML = data.map(item => config.renderMobileCard(item)).join('');
    }

    getTeacherTableConfig() {
        return {
            renderRow: (teacher) => `
                <tr>
                    <td class="p-3">${teacher.name}</td>
                    <td class="p-3">${teacher.subject}</td>
                    <td class="p-3">${teacher.username}</td>
                    <td class="p-3">
                        <button onclick="editTeacher('${teacher.id}')" class="text-blue-600 hover:text-blue-800 mr-2">
                            <i class="fas fa-edit"></i>
                        </button>
                        <button onclick="deleteTeacher('${teacher.id}')" class="text-red-600 hover:text-red-800">
                            <i class="fas fa-trash"></i>
                        </button>
                    </td>
                </tr>
            `,
            renderMobileCard: (teacher) => `
                <div class="mobile-table-card">
                    <div class="mobile-table-card-header">
                        <i class="fas fa-chalkboard-teacher mr-2 text-blue-500"></i>
                        ${teacher.name}
                    </div>
                    <div class="mobile-table-card-content">
                        <div class="mobile-table-card-row">
                            <span class="mobile-table-card-label">Subject:</span>
                            <span class="mobile-table-card-value">${teacher.subject}</span>
                        </div>
                        <div class="mobile-table-card-row">
                            <span class="mobile-table-card-label">Username:</span>
                            <span class="mobile-table-card-value">${teacher.username}</span>
                        </div>
                    </div>
                    <div class="mobile-table-card-actions">
                        <button onclick="editTeacher('${teacher.id}')" class="btn-secondary">
                            <i class="fas fa-edit mr-1"></i> Edit
                        </button>
                        <button onclick="deleteTeacher('${teacher.id}')" class="text-red-600 hover:text-red-800 px-3 py-2 rounded">
                            <i class="fas fa-trash mr-1"></i> Delete
                        </button>
                    </div>
                </div>
            `
        };
    }

    getClassTableConfig() {
        return {
            renderRow: (cls) => {
                const teacher = cls.teacherId ? db.getUserById('teachers', cls.teacherId) : null;
                const studentCount = db.getStudentsByClass(cls.id).length;
                return `
                    <tr>
                        <td class="p-3">${cls.name}</td>
                        <td class="p-3">${cls.subject || 'No Subject'}</td>
                        <td class="p-3">${cls.description || '-'}</td>
                        <td class="p-3">${teacher ? teacher.name : 'Not Assigned'}</td>
                        <td class="p-3">${studentCount} students</td>
                        <td class="p-3">
                            <button onclick="editClass('${cls.id}')" class="text-blue-600 hover:text-blue-800 mr-2">
                                <i class="fas fa-edit"></i>
                            </button>
                            <button onclick="deleteClass('${cls.id}')" class="text-red-600 hover:text-red-800">
                                <i class="fas fa-trash"></i>
                            </button>
                        </td>
                    </tr>
                `;
            },
            renderMobileCard: (cls) => {
                const teacher = cls.teacherId ? db.getUserById('teachers', cls.teacherId) : null;
                const studentCount = db.getStudentsByClass(cls.id).length;
                return `
                    <div class="mobile-table-card">
                        <div class="mobile-table-card-header">
                            <i class="fas fa-chalkboard mr-2 text-green-500"></i>
                            ${cls.name}
                        </div>
                        <div class="mobile-table-card-content">
                            <div class="mobile-table-card-row">
                                <span class="mobile-table-card-label">Subject:</span>
                                <span class="mobile-table-card-value">${cls.subject || 'No Subject'}</span>
                            </div>
                            <div class="mobile-table-card-row">
                                <span class="mobile-table-card-label">Description:</span>
                                <span class="mobile-table-card-value">${cls.description || '-'}</span>
                            </div>
                            <div class="mobile-table-card-row">
                                <span class="mobile-table-card-label">Teacher:</span>
                                <span class="mobile-table-card-value">${teacher ? teacher.name : 'Not Assigned'}</span>
                            </div>
                            <div class="mobile-table-card-row">
                                <span class="mobile-table-card-label">Students:</span>
                                <span class="mobile-table-card-value">${studentCount} students</span>
                            </div>
                        </div>
                        <div class="mobile-table-card-actions">
                            <button onclick="editClass('${cls.id}')" class="btn-secondary">
                                <i class="fas fa-edit mr-1"></i> Edit
                            </button>
                            <button onclick="deleteClass('${cls.id}')" class="text-red-600 hover:text-red-800 px-3 py-2 rounded">
                                <i class="fas fa-trash mr-1"></i> Delete
                            </button>
                        </div>
                    </div>
                `;
            }
        };
    }

    getStudentTableConfig() {
        return {
            renderRow: (student) => {
                const classInfo = student.classId ? db.getClassById(student.classId) : null;
                return `
                    <tr>
                        <td class="p-3">${student.name}</td>
                        <td class="p-3">${classInfo ? classInfo.name : 'Not Assigned'}</td>
                        <td class="p-3">${student.email || 'No Email'}</td>
                        <td class="p-3">${student.username}</td>
                        <td class="p-3">
                            <button onclick="editStudent('${student.id}')" class="text-blue-600 hover:text-blue-800 mr-2">
                                <i class="fas fa-edit"></i>
                            </button>
                            <button onclick="deleteStudent('${student.id}')" class="text-red-600 hover:text-red-800">
                                <i class="fas fa-trash"></i>
                            </button>
                        </td>
                    </tr>
                `;
            },
            renderMobileCard: (student) => {
                const classInfo = student.classId ? db.getClassById(student.classId) : null;
                return `
                    <div class="mobile-table-card">
                        <div class="mobile-table-card-header">
                            <i class="fas fa-user-graduate mr-2 text-indigo-500"></i>
                            ${student.name}
                        </div>
                        <div class="mobile-table-card-content">
                            <div class="mobile-table-card-row">
                                <span class="mobile-table-card-label">Class:</span>
                                <span class="mobile-table-card-value">${classInfo ? classInfo.name : 'Not Assigned'}</span>
                            </div>
                            <div class="mobile-table-card-row">
                                <span class="mobile-table-card-label">Email:</span>
                                <span class="mobile-table-card-value">${student.email || 'No Email'}</span>
                            </div>
                            <div class="mobile-table-card-row">
                                <span class="mobile-table-card-label">Username:</span>
                                <span class="mobile-table-card-value">${student.username}</span>
                            </div>
                        </div>
                        <div class="mobile-table-card-actions">
                            <button onclick="editStudent('${student.id}')" class="btn-secondary">
                                <i class="fas fa-edit mr-1"></i> Edit
                            </button>
                            <button onclick="deleteStudent('${student.id}')" class="text-red-600 hover:text-red-800 px-3 py-2 rounded">
                                <i class="fas fa-trash mr-1"></i> Delete
                            </button>
                        </div>
                    </div>
                `;
            }
        };
    }

    // Update loadHomework to use the new task system
    loadHomework() {
        // Redirect to the unified task system
        this.loadTasks();
    }



    // NEW: Load advanced attendance
    loadAdvancedAttendance() {
        // For teacher portal, populate class select and active sessions
        if (window.location.pathname.includes('teacher_portal')) {
            const currentUser = auth.getCurrentUser();
            if (currentUser && currentUser.id) {
                otpAttendanceUI.populateClassSelect(currentUser.id);
                otpAttendanceUI.updateActiveSessionsList(currentUser.id);
            }
        }
        
        // For student portal, load OTP attendance history
        if (window.location.pathname.includes('student_portal')) {
            const currentUser = auth.getCurrentUser();
            if (currentUser && currentUser.id) {
                otpAttendanceUI.updateStudentAttendanceHistory(currentUser.id);
            }
        }
        
        this.loadAttendanceStatistics();
        this.updateDashboardStats();
    }

    // NEW: Populate attendance class select (for admin dashboard)
    populateAttendanceClassSelect() {
        const timetables = db.getData('timetables');
        const select = document.getElementById('attendance-class-select');
        if (!select) return;

        // Get unique classes from timetables
        const classes = [...new Set(timetables.map(t => t.subject))];
        
        select.innerHTML = '<option value="">Select Class</option>';
        classes.forEach(className => {
            select.innerHTML += `<option value="${className}">${className}</option>`;
        });

        select.addEventListener('change', (e) => {
            if (e.target.value) {
                this.loadTodayAttendance(e.target.value);
            }
        });
    }

    // NEW: Load today's attendance
    loadTodayAttendance(className) {
        const today = new Date().toISOString().split('T')[0];
        const attendanceDetails = db.getAttendanceDetailsByClass(className, today);
        const attendanceList = document.getElementById('today-attendance-list');
        if (!attendanceList) return;

        if (attendanceDetails.length === 0) {
            attendanceList.innerHTML = '<div class="empty-state">No attendance taken for this class today.</div>';
            return;
        }

        attendanceList.innerHTML = attendanceDetails.map(att => {
            const student = db.getUserById('students', att.studentId);
            const statusColors = {
                present: 'bg-green-100 text-green-800',
                absent: 'bg-red-100 text-red-800',
                late: 'bg-yellow-100 text-yellow-800',
                excused: 'bg-blue-100 text-blue-800'
            };
            
            return `
                <div class="flex justify-between items-center p-3 bg-gray-50 rounded-lg mb-2">
                    <div>
                        <p class="font-semibold text-gray-800">${student ? student.name : 'Unknown Student'}</p>
                        <p class="text-sm text-gray-600">${att.date}</p>
                    </div>
                    <span class="px-2 py-1 rounded text-sm ${statusColors[att.status] || 'bg-gray-100 text-gray-800'}">
                        ${att.status}
                    </span>
                </div>
            `;
        }).join('');
    }

    // NEW: Load attendance statistics
    loadAttendanceStatistics() {
        const students = db.getData('students');
        const statisticsDiv = document.getElementById('attendance-statistics');
        if (!statisticsDiv) return;

        if (students.length === 0) {
            statisticsDiv.innerHTML = '<div class="empty-state">No students available.</div>';
            return;
        }

        const overallStats = students.reduce((acc, student) => {
            const stats = db.getAttendanceStatistics(student.id);
            acc.total += stats.total;
            acc.present += stats.present;
            acc.absent += stats.absent;
            acc.late += stats.late;
            acc.excused += stats.excused;
            return acc;
        }, { total: 0, present: 0, absent: 0, late: 0, excused: 0 });

        const overallPercentage = overallStats.total > 0 ? Math.round((overallStats.present / overallStats.total) * 100) : 0;

        statisticsDiv.innerHTML = `
            <div class="grid grid-cols-2 gap-4">
                <div class="text-center p-4 bg-green-50 rounded-lg">
                    <div class="text-2xl font-bold text-green-600">${overallPercentage}%</div>
                    <p class="text-sm text-gray-600">Overall Attendance</p>
                </div>
                <div class="text-center p-4 bg-blue-50 rounded-lg">
                    <div class="text-2xl font-bold text-blue-600">${students.length}</div>
                    <p class="text-sm text-gray-600">Total Students</p>
                </div>
            </div>
            <div class="mt-4 space-y-2">
                <div class="flex justify-between text-sm">
                    <span>Present:</span>
                    <span class="font-semibold text-green-600">${overallStats.present}</span>
                </div>
                <div class="flex justify-between text-sm">
                    <span>Absent:</span>
                    <span class="font-semibold text-red-600">${overallStats.absent}</span>
                </div>
                <div class="flex justify-between text-sm">
                    <span>Late:</span>
                    <span class="font-semibold text-yellow-600">${overallStats.late}</span>
                </div>
                <div class="flex justify-between text-sm">
                    <span>Excused:</span>
                    <span class="font-semibold text-blue-600">${overallStats.excused}</span>
                </div>
            </div>
        `;
    }
}

// Modal functions
function showModal(modalId) {
    const modal = document.getElementById(modalId);
    if (modal) {
        modal.classList.remove('hidden');
    }
}

function hideModal(modalId) {
    const modal = document.getElementById(modalId);
    if (modal) {
        modal.classList.add('hidden');
    }
}

// Task interaction functions
function viewTask(taskId) {
    const task = db.getTaskById(taskId);
    if (!task) {
        alert('Task not found');
        return;
    }
    
    // Create a modal to display task details
    const modalHtml = `
        <div id="viewTaskModal" class="modal-backdrop fixed inset-0 bg-black bg-opacity-50 z-50 flex items-center justify-center">
            <div class="bg-white rounded-lg shadow-lg max-w-2xl w-full mx-4 max-h-[90vh] overflow-y-auto">
                <div class="p-6">
                    <div class="flex justify-between items-center mb-4">
                        <h2 class="text-2xl font-bold text-gray-800">${task.title}</h2>
                        <button onclick="closeModal('viewTaskModal')" class="text-gray-500 hover:text-gray-700">
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
                                <div class="bg-blue-500 h-2 rounded-full" style="width: ${task.progress.total > 0 ? Math.round((task.progress.submitted / task.progress.total) * 100) : 0}%"></div>
                            </div>
                            <p class="text-sm text-gray-600 mt-1">${task.progress.submitted}/${task.progress.total} submitted</p>
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
    const existingModal = document.getElementById('viewTaskModal');
    if (existingModal) {
        existingModal.remove();
    }
    
    document.body.insertAdjacentHTML('beforeend', modalHtml);
}

function editTask(taskId) {
    // For now, show an alert. In a full implementation, this would open an edit modal
    alert('Task editing functionality will be implemented in the admin task management section.');
}

function deleteTask(taskId) {
    if (confirm('Are you sure you want to delete this task?')) {
        if (db.deleteTask(taskId)) {
            alert('Task deleted successfully!');
            // Refresh the task list
            if (window.portalManager) {
                window.portalManager.loadTasks();
            }
            if (window.taskManager) {
                window.taskManager.loadTasks();
            }
        } else {
            alert('Error deleting task. Please try again.');
        }
    }
}

function submitTask(taskId) {
    const currentUser = auth.getCurrentUser();
    if (!currentUser) {
        alert('Please login to submit tasks.');
        return;
    }
    
    const task = db.getTaskById(taskId);
    if (!task) {
        alert('Task not found');
        return;
    }
    
    // Create submission modal
    const modalHtml = `
        <div id="submitTaskModal" class="modal-backdrop fixed inset-0 bg-black bg-opacity-50 z-50 flex items-center justify-center">
            <div class="bg-white rounded-lg shadow-lg max-w-md w-full mx-4">
                <div class="p-6">
                    <div class="flex justify-between items-center mb-4">
                        <h2 class="text-xl font-bold text-gray-800">Submit Task</h2>
                        <button onclick="closeModal('submitTaskModal')" class="text-gray-500 hover:text-gray-700">
                            <i class="fas fa-times"></i>
                        </button>
                    </div>
                    <form id="taskSubmissionForm">
                        <div class="space-y-4">
                            <div>
                                <label class="block text-sm font-medium text-gray-700">Task: ${task.title}</label>
                                <p class="text-sm text-gray-600">Due: ${task.dueDate}</p>
                            </div>
                            <div>
                                <label for="submissionNotes" class="block text-sm font-medium text-gray-700">Notes (Optional)</label>
                                <textarea id="submissionNotes" rows="3" class="w-full p-2 border rounded" placeholder="Add any notes about your submission..."></textarea>
                            </div>
                            ${task.allowFileSubmission ? `
                                <div>
                                    <label for="submissionFiles" class="block text-sm font-medium text-gray-700">Upload Files</label>
                                    <input type="file" id="submissionFiles" multiple class="w-full p-2 border rounded">
                                </div>
                            ` : ''}
                            <div class="flex justify-end space-x-3">
                                <button type="button" onclick="closeModal('submitTaskModal')" class="px-4 py-2 text-gray-600 border rounded hover:bg-gray-50">
                                    Cancel
                                </button>
                                <button type="submit" class="px-4 py-2 bg-blue-600 text-white rounded hover:bg-blue-700">
                                    Submit Task
                                </button>
                            </div>
                        </div>
                    </form>
                </div>
            </div>
        </div>
    `;
    
    // Remove existing modal if present
    const existingModal = document.getElementById('submitTaskModal');
    if (existingModal) {
        existingModal.remove();
    }
    
    document.body.insertAdjacentHTML('beforeend', modalHtml);
    
    // Add form submission handler
    document.getElementById('taskSubmissionForm').addEventListener('submit', function(e) {
        e.preventDefault();
        
        const notes = document.getElementById('submissionNotes').value;
        const fileInput = document.getElementById('submissionFiles');
        const submittedFiles = [];
        
        // Handle file uploads if allowed
        if (task.allowFileSubmission && fileInput && fileInput.files.length > 0) {
            for (let i = 0; i < fileInput.files.length; i++) {
                const file = fileInput.files[i];
                const fileId = db.storeFile({
                    name: file.name,
                    size: file.size,
                    type: file.type,
                    data: null // In a real app, you'd store the actual file data
                });
                submittedFiles.push({
                    id: fileId,
                    name: file.name,
                    size: file.size,
                    type: file.type
                });
            }
        }
        
        // Submit the task
        const submissionData = {
            taskId: taskId,
            studentId: currentUser.id,
            notes: notes,
            files: submittedFiles,
            submittedAt: new Date().toISOString()
        };
        
        if (db.submitTaskFile(taskId, currentUser.id, submissionData)) {
            alert('Task submitted successfully!');
            closeModal('submitTaskModal');
            // Refresh the task list
            if (window.portalManager) {
                window.portalManager.loadTasks();
            }
        } else {
            alert('Error submitting task. Please try again.');
        }
    });
}

function closeModal(modalId) {
    const modal = document.getElementById(modalId);
    if (modal) {
        modal.remove();
    }
}

// Close modal when clicking outside
document.addEventListener('click', (e) => {
    if (e.target.classList.contains('modal-backdrop')) {
        e.target.remove();
    }
});

// Initialize portal manager when DOM is loaded
document.addEventListener('DOMContentLoaded', function() {
    // Check if auth object exists
    if (typeof auth === 'undefined') {
        console.error('Auth object not found. Make sure auth.js is loaded before portals.js');
        return;
    }

    // Check authentication
    const userType = auth.getCurrentUserType();
    if (!auth.isAuthenticated()) {
        window.location.href = 'index.html';
        return;
    }

    // Initialize portal manager
    try {
        const portalManager = new PortalManager();
        
        // Make it globally accessible
        window.portalManager = portalManager;
    } catch (error) {
        console.error('Error initializing portal manager:', error);
    }
}); 