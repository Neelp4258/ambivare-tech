// Local Storage Database System for DazzloCore X

class LocalDatabase {
    constructor() {
        try {
            this.initializeDatabase();
            // Add a small delay to ensure localStorage operations complete
            setTimeout(() => {
                this.verifyInitialization();
            }, 100);
        } catch (error) {
            console.error('Database constructor error:', error);
            // Retry initialization once
            setTimeout(() => {
                this.initializeDatabase();
            }, 500);
        }
    }

    // Verify that initialization completed successfully
    verifyInitialization() {
        const adminCreds = localStorage.getItem('adminCredentials');
        if (!adminCreds) {
            console.warn('Admin credentials not found, re-initializing...');
            this.initializeDatabase();
        } else {
            console.log('Database initialization verified');
        }
    }

    // Clear all data except admin credentials
    clearAllDataExceptAdmin() {
        // Keep admin credentials, clear everything else
        const adminCreds = localStorage.getItem('adminCredentials');
        
        // Clear all data except admin credentials
        localStorage.removeItem('teachers');
        localStorage.removeItem('students');
        localStorage.removeItem('timetables');
        localStorage.removeItem('exams');
        localStorage.removeItem('homework');
        localStorage.removeItem('attendance');
        localStorage.removeItem('examResults');
        localStorage.removeItem('announcements');
        localStorage.removeItem('assignments');
        localStorage.removeItem('submissions');
        localStorage.removeItem('grades');
        localStorage.removeItem('gradeCategories');
        localStorage.removeItem('attendanceDetails');
        localStorage.removeItem('classes');
        
        // Restore admin credentials if they existed
        if (adminCreds) {
            localStorage.setItem('adminCredentials', adminCreds);
        }
        
        // Reinitialize with fresh empty data
        this.initializeDatabase();
    }

    // Initialize database with default data if empty
    initializeDatabase() {
        // Admin credentials
        if (!localStorage.getItem('adminCredentials')) {
            localStorage.setItem('adminCredentials', JSON.stringify({
                username: 'siddhant_MD',
                password: 'Bhavani@Dazzlo'
            }));
        }

        // Teachers - Initialize empty array
        if (!localStorage.getItem('teachers')) {
            localStorage.setItem('teachers', JSON.stringify([]));
        }

        // Students - Initialize empty array
        if (!localStorage.getItem('students')) {
            localStorage.setItem('students', JSON.stringify([]));
        }

        // Classes - Initialize empty array
        if (!localStorage.getItem('classes')) {
            localStorage.setItem('classes', JSON.stringify([]));
        }

        // Timetables - Initialize empty array
        if (!localStorage.getItem('timetables')) {
            localStorage.setItem('timetables', JSON.stringify([]));
        }

        // Exams - Initialize empty array
        if (!localStorage.getItem('exams')) {
            localStorage.setItem('exams', JSON.stringify([]));
        }

        // Homework - Initialize empty array
        if (!localStorage.getItem('homework')) {
            localStorage.setItem('homework', JSON.stringify([]));
        }

        // Tasks - Initialize empty array (enhanced task system)
        if (!localStorage.getItem('tasks')) {
            localStorage.setItem('tasks', JSON.stringify([]));
        }

        // Files - Initialize empty array for file storage
        if (!localStorage.getItem('files')) {
            localStorage.setItem('files', JSON.stringify([]));
        }

        // Attendance - Initialize empty array
        if (!localStorage.getItem('attendance')) {
            localStorage.setItem('attendance', JSON.stringify([]));
        }

        // Exam Results - Initialize empty array
        if (!localStorage.getItem('examResults')) {
            localStorage.setItem('examResults', JSON.stringify([]));
        }

        // Announcements - Initialize empty array
        if (!localStorage.getItem('announcements')) {
            localStorage.setItem('announcements', JSON.stringify([]));
        }

        // Assignments - Initialize empty array
        if (!localStorage.getItem('assignments')) {
            localStorage.setItem('assignments', JSON.stringify([]));
        }

        // Submissions - Initialize empty array
        if (!localStorage.getItem('submissions')) {
            localStorage.setItem('submissions', JSON.stringify([]));
        }

        // Grades - Initialize empty array
        if (!localStorage.getItem('grades')) {
            localStorage.setItem('grades', JSON.stringify([]));
        }

        // Grade Categories - Initialize with default categories
        if (!localStorage.getItem('gradeCategories')) {
            localStorage.setItem('gradeCategories', JSON.stringify([
                { id: 'assignments', name: 'Assignments', weight: 30 },
                { id: 'exams', name: 'Exams', weight: 50 },
                { id: 'attendance', name: 'Attendance', weight: 10 },
                { id: 'participation', name: 'Participation', weight: 10 }
            ]));
        }

        // Detailed Attendance - Initialize empty array
        if (!localStorage.getItem('attendanceDetails')) {
            localStorage.setItem('attendanceDetails', JSON.stringify([]));
        }

        // OTP Sessions - Initialize empty array
        if (!localStorage.getItem('otpSessions')) {
            localStorage.setItem('otpSessions', JSON.stringify([]));
        }
    }

    // Generic CRUD operations
    getData(key) {
        try {
            return JSON.parse(localStorage.getItem(key)) || [];
        } catch (error) {
            console.error(`Error getting data for key ${key}:`, error);
            return [];
        }
    }

    setData(key, data) {
        try {
            localStorage.setItem(key, JSON.stringify(data));
            return true;
        } catch (error) {
            console.error(`Error setting data for key ${key}:`, error);
            return false;
        }
    }

    // User Management
    addUser(userType, userData) {
        const users = this.getData(userType);
        userData.id = this.generateId(userType);
        users.push(userData);
        return this.setData(userType, users);
    }

    updateUser(userType, userId, updatedData) {
        const users = this.getData(userType);
        const index = users.findIndex(user => user.id === userId);
        if (index !== -1) {
            users[index] = { ...users[index], ...updatedData };
            const result = this.setData(userType, users);
            
            // Force a localStorage sync to ensure data persistence
            try {
                localStorage.setItem(userType, JSON.stringify(users));
                // Trigger a custom event to notify other parts of the app
                window.dispatchEvent(new CustomEvent('userUpdated', { 
                    detail: { userType, userId, updatedData } 
                }));
            } catch (error) {
                console.error('Error updating user:', error);
            }
            
            return result;
        }
        return false;
    }

    deleteUser(userType, userId) {
        const users = this.getData(userType);
        const filteredUsers = users.filter(user => user.id !== userId);
        return this.setData(userType, filteredUsers);
    }

    getUserById(userType, userId) {
        const users = this.getData(userType);
        return users.find(user => user.id === userId);
    }

    getUserByCredentials(userType, username, password) {
        const users = this.getData(userType);
        return users.find(user => user.username === username && user.password === password);
    }

    // Authentication
    authenticateUser(userType, username, password) {
        // Ensure database is initialized before authentication
        this.ensureInitialized();
        
        if (userType === 'admin') {
            const adminCreds = this.getData('adminCredentials');
            
            // Fallback admin credentials in case localStorage fails
            const fallbackAdmin = {
                username: 'siddhant_MD',
                password: 'Bhavani@Dazzlo'
            };
            
            // Check stored credentials first, then fallback
            if (adminCreds && adminCreds.username === username && adminCreds.password === password) {
                return { 
                    username: adminCreds.username, 
                    password: adminCreds.password, 
                    id: 'admin',
                    name: 'Administrator'
                };
            }
            
            // Fallback check for default credentials
            if (fallbackAdmin.username === username && fallbackAdmin.password === password) {
                // Store the credentials in localStorage for future use
                this.setData('adminCredentials', fallbackAdmin);
                return { 
                    username: fallbackAdmin.username, 
                    password: fallbackAdmin.password, 
                    id: 'admin',
                    name: 'Administrator'
                };
            }
            
            return null;
        } else {
            return this.getUserByCredentials(userType, username, password);
        }
    }

    // Ensure database is properly initialized
    ensureInitialized() {
        try {
            // Check if localStorage is available
            if (typeof Storage === "undefined") {
                console.error("LocalStorage is not supported");
                return false;
            }
            
            // Force re-initialization if admin credentials are missing
            if (!localStorage.getItem('adminCredentials')) {
                this.initializeDatabase();
            }
            
            return true;
        } catch (error) {
            console.error("Database initialization error:", error);
            return false;
        }
    }

    // Timetable Management
    addTimetableEntry(entry) {
        const timetables = this.getData('timetables');
        entry.id = this.generateId('timetable');
        timetables.push(entry);
        return this.setData('timetables', timetables);
    }

    getTimetableByTeacher(teacherId) {
        const timetables = this.getData('timetables');
        return timetables.filter(entry => entry.teacherId === teacherId);
    }

    // Exam Management
    addExam(examData) {
        const exams = this.getData('exams');
        examData.id = this.generateId('exam');
        exams.push(examData);
        return this.setData('exams', exams);
    }

    // Homework Management
    addHomework(homeworkData) {
        const homework = this.getData('homework');
        homeworkData.id = this.generateId('homework');
        homework.push(homeworkData);
        return this.setData('homework', homework);
    }

    getHomeworkByTeacher(teacherId) {
        const homework = this.getData('homework');
        return homework.filter(hw => hw.teacherId === teacherId);
    }

    // Attendance Management
    addAttendance(attendanceData) {
        const attendance = this.getData('attendance');
        attendanceData.id = this.generateId('attendance');
        attendance.push(attendanceData);
        return this.setData('attendance', attendance);
    }

    getAttendanceByStudent(studentId) {
        const attendance = this.getData('attendance');
        return attendance.filter(att => att.studentId === studentId);
    }

    // Exam Results Management
    addExamResult(resultData) {
        const results = this.getData('examResults');
        resultData.id = this.generateId('examResult');
        results.push(resultData);
        return this.setData('examResults', results);
    }

    getExamResultsByStudent(studentId) {
        const results = this.getData('examResults');
        return results.filter(result => result.studentId === studentId);
    }

    // Announcements
    addAnnouncement(announcementData) {
        const announcements = this.getData('announcements');
        announcementData.id = this.generateId('announcement');
        announcementData.date = new Date().toISOString().split('T')[0];
        announcements.push(announcementData);
        return this.setData('announcements', announcements);
    }

    // NEW: Assignment Management
    addAssignment(assignmentData) {
        const assignments = this.getData('assignments');
        assignmentData.id = this.generateId('assignment');
        assignmentData.createdAt = new Date().toISOString();
        assignmentData.status = 'active';
        assignments.push(assignmentData);
        return this.setData('assignments', assignments);
    }

    getAssignmentsByTeacher(teacherId) {
        const assignments = this.getData('assignments');
        return assignments.filter(assignment => assignment.teacherId === teacherId);
    }

    getAssignmentsByStudent(studentId) {
        const assignments = this.getData('assignments');
        return assignments.filter(assignment => assignment.studentIds && assignment.studentIds.includes(studentId));
    }

    // NEW: Submission Management
    addSubmission(submissionData) {
        const submissions = this.getData('submissions');
        submissionData.id = this.generateId('submission');
        submissionData.submittedAt = new Date().toISOString();
        submissionData.status = 'submitted';
        submissions.push(submissionData);
        return this.setData('submissions', submissions);
    }

    getSubmissionsByAssignment(assignmentId) {
        const submissions = this.getData('submissions');
        return submissions.filter(submission => submission.assignmentId === assignmentId);
    }

    getSubmissionsByStudent(studentId) {
        const submissions = this.getData('submissions');
        return submissions.filter(submission => submission.studentId === studentId);
    }

    updateSubmission(submissionId, updatedData) {
        const submissions = this.getData('submissions');
        const index = submissions.findIndex(sub => sub.id === submissionId);
        if (index !== -1) {
            submissions[index] = { ...submissions[index], ...updatedData };
            return this.setData('submissions', submissions);
        }
        return false;
    }

    // NEW: Grade Management
    addGrade(gradeData) {
        const grades = this.getData('grades');
        gradeData.id = this.generateId('grade');
        gradeData.createdAt = new Date().toISOString();
        grades.push(gradeData);
        return this.setData('grades', grades);
    }

    getGradesByStudent(studentId) {
        const grades = this.getData('grades');
        return grades.filter(grade => grade.studentId === studentId);
    }

    getGradesByAssignment(assignmentId) {
        const grades = this.getData('grades');
        return grades.filter(grade => grade.assignmentId === assignmentId);
    }

    updateGrade(gradeId, updatedData) {
        const grades = this.getData('grades');
        const index = grades.findIndex(grade => grade.id === gradeId);
        if (index !== -1) {
            grades[index] = { ...grades[index], ...updatedData };
            return this.setData('grades', grades);
        }
        return false;
    }

    // NEW: Calculate GPA for a student
    calculateGPA(studentId) {
        const grades = this.getGradesByStudent(studentId);
        const gradeCategories = this.getData('gradeCategories');
        
        if (grades.length === 0) return 0;

        let totalWeightedScore = 0;
        let totalWeight = 0;

        // Group grades by category
        const gradesByCategory = {};
        grades.forEach(grade => {
            if (!gradesByCategory[grade.category]) {
                gradesByCategory[grade.category] = [];
            }
            gradesByCategory[grade.category].push(grade);
        });

        // Calculate weighted average for each category
        gradeCategories.forEach(category => {
            const categoryGrades = gradesByCategory[category.id] || [];
            if (categoryGrades.length > 0) {
                const categoryAverage = categoryGrades.reduce((sum, grade) => {
                    return sum + (grade.score / grade.maxScore) * 100;
                }, 0) / categoryGrades.length;
                
                totalWeightedScore += categoryAverage * category.weight;
                totalWeight += category.weight;
            }
        });

        return totalWeight > 0 ? (totalWeightedScore / totalWeight) / 25 : 0; // Convert to 4.0 scale
    }

    // NEW: Advanced Attendance Management
    addAttendanceDetail(attendanceDetail) {
        const attendanceDetails = this.getData('attendanceDetails');
        attendanceDetail.id = this.generateId('attendanceDetail');
        attendanceDetail.date = new Date().toISOString().split('T')[0];
        attendanceDetails.push(attendanceDetail);
        return this.setData('attendanceDetails', attendanceDetails);
    }

    getAttendanceDetailsByStudent(studentId) {
        const attendanceDetails = this.getData('attendanceDetails');
        return attendanceDetails.filter(att => att.studentId === studentId);
    }

    getAttendanceDetailsByClass(classId, date) {
        const attendanceDetails = this.getData('attendanceDetails');
        return attendanceDetails.filter(att => att.classId === classId && att.date === date);
    }

    // NEW: Calculate attendance percentage
    calculateAttendancePercentage(studentId, startDate = null, endDate = null) {
        const attendanceDetails = this.getAttendanceDetailsByStudent(studentId);
        
        let filteredAttendance = attendanceDetails;
        if (startDate && endDate) {
            filteredAttendance = attendanceDetails.filter(att => 
                att.date >= startDate && att.date <= endDate
            );
        }

        if (filteredAttendance.length === 0) return 0;

        const present = filteredAttendance.filter(att => att.status === 'present').length;
        const total = filteredAttendance.length;

        return Math.round((present / total) * 100);
    }

    // NEW: Get attendance statistics
    getAttendanceStatistics(studentId) {
        const attendanceDetails = this.getAttendanceDetailsByStudent(studentId);
        
        const stats = {
            total: attendanceDetails.length,
            present: attendanceDetails.filter(att => att.status === 'present').length,
            absent: attendanceDetails.filter(att => att.status === 'absent').length,
            late: attendanceDetails.filter(att => att.status === 'late').length,
            excused: attendanceDetails.filter(att => att.status === 'excused').length
        };

        stats.percentage = stats.total > 0 ? Math.round((stats.present / stats.total) * 100) : 0;
        return stats;
    }

    // Enhanced Task Management Functions
    getTasks() {
        return this.getData('tasks') || this.getData('homework');
    }

    getTaskById(taskId) {
        const tasks = this.getTasks();
        return tasks.find(task => task.id === taskId);
    }

    updateTaskProgress(taskId, submissionData) {
        const tasks = this.getTasks();
        const taskIndex = tasks.findIndex(task => task.id === taskId);
        
        if (taskIndex !== -1) {
            const task = tasks[taskIndex];
            
            // Add submission to task
            if (!task.submissions) task.submissions = [];
            task.submissions.push(submissionData);
            
            // Update progress
            const isLate = new Date(submissionData.submittedAt) > new Date(task.dueDate);
            task.progress.submitted += 1;
            if (isLate) task.progress.late += 1;
            
            // Update assignee status
            if (task.assignedTo) {
                const assigneeIndex = task.assignedTo.findIndex(a => a.id === submissionData.submitterId);
                if (assigneeIndex !== -1) {
                    task.assignedTo[assigneeIndex].status = 'submitted';
                    task.assignedTo[assigneeIndex].submittedAt = submissionData.submittedAt;
                }
            }
            
            tasks[taskIndex] = task;
            return this.setData('tasks', tasks);
        }
        return false;
    }

    submitTaskFile(taskId, submitterId, fileData) {
        const submissionData = {
            id: this.generateId('submission'),
            taskId: taskId,
            submitterId: submitterId,
            submittedAt: new Date().toISOString(),
            files: fileData.files || [],
            comments: fileData.comments || '',
            status: 'submitted'
        };
        
        return this.updateTaskProgress(taskId, submissionData);
    }

    getTasksByAssignee(assigneeId, assigneeType) {
        const tasks = this.getTasks();
        return tasks.filter(task => {
            if (!task.assignedTo) return false;
            return task.assignedTo.some(assignee => 
                assignee.id === assigneeId && assignee.type === assigneeType
            );
        });
    }

    getTaskStatistics() {
        const tasks = this.getTasks();
        const now = new Date();
        
        const stats = {
            total: tasks.length,
            active: tasks.filter(t => t.status === 'active').length,
            completed: tasks.filter(t => t.status === 'completed').length,
            overdue: tasks.filter(t => 
                t.status === 'active' && new Date(t.dueDate) < now
            ).length,
            submissionRate: 0,
            completionRate: 0
        };
        
        if (tasks.length > 0) {
            const totalSubmissions = tasks.reduce((sum, task) => sum + (task.progress?.submitted || 0), 0);
            const totalAssigned = tasks.reduce((sum, task) => sum + (task.progress?.total || 0), 0);
            const totalCompleted = tasks.reduce((sum, task) => sum + (task.progress?.completed || 0), 0);
            
            stats.submissionRate = totalAssigned > 0 ? Math.round((totalSubmissions / totalAssigned) * 100) : 0;
            stats.completionRate = totalAssigned > 0 ? Math.round((totalCompleted / totalAssigned) * 100) : 0;
        }
        
        return stats;
    }

    markTaskCompleted(taskId, assigneeId) {
        const tasks = this.getTasks();
        const taskIndex = tasks.findIndex(task => task.id === taskId);
        
        if (taskIndex !== -1) {
            const task = tasks[taskIndex];
            
            // Update assignee status
            if (task.assignedTo) {
                const assigneeIndex = task.assignedTo.findIndex(a => a.id === assigneeId);
                if (assigneeIndex !== -1) {
                    task.assignedTo[assigneeIndex].status = 'completed';
                    task.assignedTo[assigneeIndex].completedAt = new Date().toISOString();
                }
            }
            
            // Update progress
            task.progress.completed += 1;
            
            // Check if all assignees completed
            const allCompleted = task.assignedTo?.every(a => a.status === 'completed');
            if (allCompleted) {
                task.status = 'completed';
            }
            
            tasks[taskIndex] = task;
            return this.setData('tasks', tasks);
        }
        return false;
    }

    deleteTask(taskId) {
        const tasks = this.getTasks();
        const filteredTasks = tasks.filter(task => task.id !== taskId);
        return this.setData('tasks', filteredTasks);
    }

    updateTask(taskId, updatedData) {
        const tasks = this.getTasks();
        const taskIndex = tasks.findIndex(task => task.id === taskId);
        
        if (taskIndex !== -1) {
            tasks[taskIndex] = { ...tasks[taskIndex], ...updatedData };
            return this.setData('tasks', tasks);
        }
        return false;
    }

    // File storage simulation (in a real app, you'd use actual file storage)
    storeFile(fileData) {
        const files = this.getData('files') || [];
        const fileRecord = {
            id: this.generateId('file'),
            name: fileData.name,
            size: fileData.size,
            type: fileData.type,
            uploadedAt: new Date().toISOString(),
            // In a real app, this would be a URL or path to the actual file
            data: fileData.data || null
        };
        
        files.push(fileRecord);
        this.setData('files', files);
        return fileRecord.id;
    }

    getFile(fileId) {
        const files = this.getData('files') || [];
        return files.find(file => file.id === fileId);
    }

    // Utility Functions
    generateId(type) {
        const timestamp = Date.now().toString(36);
        const randomStr = Math.random().toString(36).substr(2, 5);
        return `${type.charAt(0).toUpperCase()}${timestamp}${randomStr}`;
    }

    // Dashboard Statistics
    getDashboardStats() {
        const teachers = this.getData('teachers');
        const students = this.getData('students');
        const exams = this.getData('exams');
        const homework = this.getData('homework');
        const assignments = this.getData('assignments');
        const submissions = this.getData('submissions');

        return {
            totalTeachers: teachers.length,
            totalStudents: students.length,
            totalExams: exams.length,
            totalHomework: homework.length,
            totalAssignments: assignments.length,
            totalSubmissions: submissions.length
        };
    }

    // Clear all data (for testing/reset)
    clearAllData() {
        localStorage.clear();
        this.initializeDatabase();
    }

    // Enhanced timetable management
    addTimetableEntry(entry) {
        const timetables = this.getData('timetables');
        entry.id = this.generateId('timetable');
        entry.createdAt = new Date().toISOString();
        timetables.push(entry);
        return this.setData('timetables', timetables);
    }

    updateTimetableEntry(entryId, updatedData) {
        const timetables = this.getData('timetables');
        const index = timetables.findIndex(entry => entry.id === entryId);
        if (index !== -1) {
            timetables[index] = { ...timetables[index], ...updatedData };
            return this.setData('timetables', timetables);
        }
        return false;
    }

    deleteTimetableEntry(entryId) {
        const timetables = this.getData('timetables');
        const filteredTimetables = timetables.filter(entry => entry.id !== entryId);
        return this.setData('timetables', filteredTimetables);
    }

    getTimetableByClass(classId) {
        const timetables = this.getData('timetables');
        return timetables.filter(entry => entry.classId === classId);
    }

    // Class Management
    addClass(classData) {
        const classes = this.getData('classes');
        const newClass = {
            id: this.generateId('class'),
            name: classData.name,
            subject: classData.subject || '',
            description: classData.description || '',
            teacherId: classData.teacherId || null,
            createdAt: new Date().toISOString(),
            studentCount: 0
        };
        classes.push(newClass);
        this.setData('classes', classes);
        return newClass.id;
    }

    getClasses() {
        return this.getData('classes');
    }

    getClassesByTeacher(teacherId) {
        const classes = this.getData('classes');
        return classes.filter(cls => cls.teacherId === teacherId);
    }

    getClassById(classId) {
        const classes = this.getData('classes');
        return classes.find(cls => cls.id === classId);
    }

    updateClass(classId, updatedData) {
        const classes = this.getData('classes');
        const index = classes.findIndex(cls => cls.id === classId);
        if (index !== -1) {
            classes[index] = { ...classes[index], ...updatedData };
            this.setData('classes', classes);
            
            // Force a localStorage sync to ensure data persistence
            try {
                localStorage.setItem('classes', JSON.stringify(classes));
                // Trigger a custom event to notify other parts of the app
                window.dispatchEvent(new CustomEvent('classesUpdated', { 
                    detail: { classId, updatedData } 
                }));
            } catch (error) {
                console.error('Error updating class:', error);
            }
            
            return true;
        }
        return false;
    }

    deleteClass(classId) {
        const classes = this.getData('classes');
        const filteredClasses = classes.filter(cls => cls.id !== classId);
        this.setData('classes', filteredClasses);
        return true;
    }

    // Get students by class
    getStudentsByClass(classId) {
        const students = this.getData('students');
        return students.filter(student => student.classId === classId);
    }

    // Update class student count
    updateClassStudentCount() {
        const classes = this.getData('classes');
        const students = this.getData('students');
        
        classes.forEach(cls => {
            cls.studentCount = students.filter(student => student.classId === cls.id).length;
        });
        
        this.setData('classes', classes);
    }

    // OTP Session Management
    createOTPSession(sessionData) {
        const otpSessions = this.getData('otpSessions');
        const otp = this.generateOTP();
        
        const session = {
            id: this.generateId('otpSession'),
            classId: sessionData.classId,
            teacherId: sessionData.teacherId,
            otp: otp,
            startTime: new Date().toISOString(),
            endTime: new Date(Date.now() + (sessionData.duration || 30) * 60000).toISOString(), // Default 30 minutes
            duration: sessionData.duration || 30,
            status: 'active',
            attendees: [],
            createdAt: new Date().toISOString()
        };
        
        otpSessions.push(session);
        this.setData('otpSessions', otpSessions);
        
        return session;
    }

    // Generate 6-digit OTP
    generateOTP() {
        return Math.floor(100000 + Math.random() * 900000).toString();
    }

    // Get active OTP sessions for a class
    getActiveOTPSessions(classId) {
        const otpSessions = this.getData('otpSessions');
        const now = new Date();
        
        return otpSessions.filter(session => 
            session.classId === classId && 
            session.status === 'active' &&
            new Date(session.endTime) > now
        );
    }

    // Get active OTP sessions for a teacher
    getTeacherActiveOTPSessions(teacherId) {
        const otpSessions = this.getData('otpSessions');
        const now = new Date();
        
        return otpSessions.filter(session => 
            session.teacherId === teacherId && 
            session.status === 'active' &&
            new Date(session.endTime) > now
        );
    }

    // Verify OTP and mark attendance
    verifyOTPAndMarkAttendance(classId, studentId, otp) {
        const otpSessions = this.getData('otpSessions');
        const now = new Date();
        
        // Find active session with matching OTP
        const session = otpSessions.find(s => 
            s.classId === classId && 
            s.otp === otp && 
            s.status === 'active' &&
            new Date(s.endTime) > now
        );
        
        if (!session) {
            return { success: false, error: 'Invalid or expired OTP' };
        }
        
        // Check if student already marked attendance
        if (session.attendees.some(a => a.studentId === studentId)) {
            return { success: false, error: 'Attendance already marked for this session' };
        }
        
        // Add student to attendees
        const attendanceRecord = {
            studentId: studentId,
            timestamp: new Date().toISOString(),
            otp: otp
        };
        
        session.attendees.push(attendanceRecord);
        this.setData('otpSessions', otpSessions);
        
        // Also add to detailed attendance for consistency
        this.addAttendanceDetail({
            studentId: studentId,
            classId: classId,
            teacherId: session.teacherId,
            status: 'present',
            sessionId: session.id,
            otp: otp
        });
        
        return { 
            success: true, 
            message: 'Attendance marked successfully',
            session: session
        };
    }

    // End OTP session
    endOTPSession(sessionId, teacherId) {
        const otpSessions = this.getData('otpSessions');
        const sessionIndex = otpSessions.findIndex(s => s.id === sessionId && s.teacherId === teacherId);
        
        if (sessionIndex === -1) {
            return { success: false, error: 'Session not found or unauthorized' };
        }
        
        otpSessions[sessionIndex].status = 'ended';
        otpSessions[sessionIndex].endTime = new Date().toISOString();
        this.setData('otpSessions', otpSessions);
        
        return { success: true, session: otpSessions[sessionIndex] };
    }

    // Get OTP session details
    getOTPSessionDetails(sessionId) {
        const otpSessions = this.getData('otpSessions');
        return otpSessions.find(s => s.id === sessionId);
    }

    // Get student's OTP attendance history
    getStudentOTPAttendanceHistory(studentId) {
        const otpSessions = this.getData('otpSessions');
        const history = [];
        
        otpSessions.forEach(session => {
            const attendance = session.attendees.find(a => a.studentId === studentId);
            if (attendance) {
                history.push({
                    sessionId: session.id,
                    classId: session.classId,
                    teacherId: session.teacherId,
                    date: session.startTime,
                    status: 'present',
                    otp: attendance.otp
                });
            }
        });
        
        return history.sort((a, b) => new Date(b.date) - new Date(a.date));
    }

    // Enhanced task management with file uploads and progress tracking
    addTask(taskData) {
        const tasks = this.getData('tasks') || this.getData('homework');
        taskData.id = this.generateId('task');
        taskData.createdAt = new Date().toISOString();
        taskData.status = 'active';
        taskData.submissions = [];
        taskData.progress = {
            total: 0,
            submitted: 0,
            completed: 0,
            late: 0
        };
        
        // Handle different assignment types
        if (taskData.assignmentType === 'class' && taskData.classId) {
            const classStudents = this.getStudentsByClass(taskData.classId);
            taskData.assignedTo = classStudents.map(student => ({
                id: student.id,
                name: student.name,
                type: 'student',
                status: 'pending'
            }));
            taskData.progress.total = classStudents.length;
        } else if (taskData.assignmentType === 'student' && taskData.studentId) {
            const student = this.getUserById('students', taskData.studentId);
            taskData.assignedTo = [{
                id: student.id,
                name: student.name,
                type: 'student',
                status: 'pending'
            }];
            taskData.progress.total = 1;
        } else if (taskData.assignmentType === 'teacher' && taskData.teacherId) {
            const teacher = this.getUserById('teachers', taskData.teacherId);
            taskData.assignedTo = [{
                id: teacher.id,
                name: teacher.name,
                type: 'teacher',
                status: 'pending'
            }];
            taskData.progress.total = 1;
        }
        
        tasks.push(taskData);
        return this.setData('tasks', tasks);
    }

    // Add homework with class-based assignment (kept for backward compatibility)
    addClassHomework(homeworkData) {
        const homework = this.getData('homework');
        homeworkData.id = this.generateId('homework');
        homeworkData.createdAt = new Date().toISOString();
        homeworkData.type = 'homework';
        
        // Automatically assign to all students in the class
        if (homeworkData.classId) {
            const classStudents = this.getStudentsByClass(homeworkData.classId);
            homeworkData.studentIds = classStudents.map(student => student.id);
        }
        
        homework.push(homeworkData);
        return this.setData('homework', homework);
    }

    // Add assignment with class-based assignment
    addClassAssignment(assignmentData) {
        const assignments = this.getData('assignments');
        assignmentData.id = this.generateId('assignment');
        assignmentData.createdAt = new Date().toISOString();
        assignmentData.status = 'active';
        assignmentData.type = 'assignment';
        
        // Automatically assign to all students in the class
        if (assignmentData.classId) {
            const classStudents = this.getStudentsByClass(assignmentData.classId);
            assignmentData.studentIds = classStudents.map(student => student.id);
        }
        
        assignments.push(assignmentData);
        return this.setData('assignments', assignments);
    }

    // Get homework/assignments by class
    getHomeworkByClass(classId) {
        const homework = this.getData('homework');
        return homework.filter(hw => hw.classId === classId);
    }

    getAssignmentsByClass(classId) {
        const assignments = this.getData('assignments');
        return assignments.filter(assignment => assignment.classId === classId);
    }
}

// Create global database instance
const db = new LocalDatabase();

// Clear existing data and start fresh (run once on first load)
if (!localStorage.getItem('dataCleared')) {
    db.clearAllDataExceptAdmin();
    localStorage.setItem('dataCleared', 'true');
}

// Global function to reset all data (for testing purposes)
window.resetAllData = function() {
    if (confirm('⚠️ WARNING: This will delete ALL data including teachers, students, classes, homework, exams, and timetables. Only admin login will remain. Are you sure?')) {
        if (confirm('This action cannot be undone. Are you absolutely sure?')) {
            db.clearAllDataExceptAdmin();
            alert('✅ All data has been reset! Please refresh the page.');
            location.reload();
        }
    }
}; 