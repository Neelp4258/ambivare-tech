// OTP-Based Attendance UI System
class OTPAttendanceUI {
    constructor() {
        this.currentSession = null;
    }

    // Teacher: Create OTP session
    createOTPSessionUI(classId, teacherId) {
        const classes = db.getData('classes');
        const classInfo = classes.find(c => c.id === classId);
        
        if (!classInfo) {
            alert('Class not found!');
            return;
        }

        const modal = document.createElement('div');
        modal.className = 'fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50';
        modal.innerHTML = `
            <div class="bg-white rounded-lg p-6 max-w-md w-full mx-4">
                <div class="flex justify-between items-center mb-4">
                    <h3 class="text-lg font-semibold text-gray-800">Create OTP Session</h3>
                    <button onclick="this.closest('.fixed').remove()" class="text-gray-500 hover:text-gray-700">
                        <i class="fas fa-times"></i>
                    </button>
                </div>
                
                <div class="space-y-4">
                    <div>
                        <label class="block text-sm font-medium text-gray-700 mb-2">Class</label>
                        <input type="text" value="${classInfo.name}" readonly class="w-full p-2 border rounded-lg bg-gray-50">
                    </div>
                    
                    <div>
                        <label class="block text-sm font-medium text-gray-700 mb-2">Session Duration (minutes)</label>
                        <select id="sessionDuration" class="w-full p-2 border rounded-lg">
                            <option value="15">15 minutes</option>
                            <option value="30" selected>30 minutes</option>
                            <option value="45">45 minutes</option>
                            <option value="60">60 minutes</option>
                        </select>
                    </div>
                    
                    <div class="flex space-x-3">
                        <button onclick="this.closest('.fixed').remove()" 
                                class="flex-1 px-4 py-2 border border-gray-300 rounded-lg text-gray-700 hover:bg-gray-50">
                            Cancel
                        </button>
                        <button onclick="otpAttendanceUI.startOTPSession('${classId}', '${teacherId}')" 
                                class="flex-1 px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700">
                            Start Session
                        </button>
                    </div>
                </div>
            </div>
        `;
        
        document.body.appendChild(modal);
    }

    // Teacher: Start OTP session
    startOTPSession(classId, teacherId) {
        const duration = parseInt(document.getElementById('sessionDuration').value);
        
        const session = db.createOTPSession({
            classId: classId,
            teacherId: teacherId,
            duration: duration
        });
        
        this.currentSession = session;
        this.showOTPSessionModal(session);
        
        // Close the create session modal
        document.querySelector('.fixed').remove();
        
        // Update active sessions list
        this.updateActiveSessionsList(teacherId);
    }

    // Teacher: Show OTP session modal
    showOTPSessionModal(session) {
        const classes = db.getData('classes');
        const classInfo = classes.find(c => c.id === session.classId);
        
        const modal = document.createElement('div');
        modal.className = 'fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50';
        modal.innerHTML = `
            <div class="bg-white rounded-lg p-6 max-w-md w-full mx-4">
                <div class="flex justify-between items-center mb-4">
                    <h3 class="text-lg font-semibold text-gray-800">Active OTP Session</h3>
                    <button onclick="otpAttendanceUI.endCurrentSession()" class="text-red-600 hover:text-red-800">
                        <i class="fas fa-stop"></i> End Session
                    </button>
                </div>
                
                <div class="text-center space-y-4">
                    <div class="bg-blue-50 p-4 rounded-lg">
                        <h4 class="font-semibold text-blue-800 mb-2">Share this OTP with your students:</h4>
                        <div class="text-3xl font-bold text-blue-600 tracking-wider mb-2">${session.otp}</div>
                        <p class="text-sm text-blue-700">Session expires in ${session.duration} minutes</p>
                    </div>
                    
                    <div class="bg-green-50 p-4 rounded-lg">
                        <h4 class="font-semibold text-green-800 mb-2">Attendance Status</h4>
                        <div class="text-2xl font-bold text-green-600">${session.attendees.length} students</div>
                        <p class="text-sm text-green-700">have marked attendance</p>
                    </div>
                    
                    <div class="bg-gray-50 p-4 rounded-lg">
                        <h4 class="font-semibold text-gray-800 mb-2">Session Details</h4>
                        <p class="text-sm text-gray-600">Class: ${classInfo ? classInfo.name : 'Unknown'}</p>
                        <p class="text-sm text-gray-600">Started: ${new Date(session.startTime).toLocaleTimeString()}</p>
                        <p class="text-sm text-gray-600">Ends: ${new Date(session.endTime).toLocaleTimeString()}</p>
                    </div>
                </div>
                
                <div class="mt-4">
                    <button onclick="otpAttendanceUI.showSessionAttendees('${session.id}')" 
                            class="w-full px-4 py-2 bg-purple-600 text-white rounded-lg hover:bg-purple-700">
                        <i class="fas fa-users mr-2"></i>View Attendees
                    </button>
                </div>
            </div>
        `;
        
        document.body.appendChild(modal);
        
        // Auto-refresh attendees count every 10 seconds
        this.attendeesRefreshInterval = setInterval(() => {
            this.updateSessionAttendeesCount(session.id);
        }, 10000);
    }

    // Teacher: Update session attendees count
    updateSessionAttendeesCount(sessionId) {
        const session = db.getOTPSessionDetails(sessionId);
        if (session && document.querySelector('.fixed')) {
            const attendeesElement = document.querySelector('.text-2xl.font-bold.text-green-600');
            if (attendeesElement) {
                attendeesElement.textContent = `${session.attendees.length} students`;
            }
        }
    }

    // Teacher: Show session attendees
    showSessionAttendees(sessionId) {
        const session = db.getOTPSessionDetails(sessionId);
        const students = db.getData('students');
        
        if (!session) {
            alert('Session not found!');
            return;
        }
        
        const modal = document.createElement('div');
        modal.className = 'fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50';
        modal.innerHTML = `
            <div class="bg-white rounded-lg p-6 max-w-2xl w-full mx-4 max-h-96 overflow-y-auto">
                <div class="flex justify-between items-center mb-4">
                    <h3 class="text-lg font-semibold text-gray-800">Session Attendees</h3>
                    <button onclick="this.closest('.fixed').remove()" class="text-gray-500 hover:text-gray-700">
                        <i class="fas fa-times"></i>
                    </button>
                </div>
                
                <div class="space-y-2">
                    ${session.attendees.length === 0 ? 
                        '<p class="text-gray-500 text-center py-4">No students have marked attendance yet.</p>' :
                        session.attendees.map(attendee => {
                            const student = students.find(s => s.id === attendee.studentId);
                            return `
                                <div class="flex justify-between items-center p-3 bg-gray-50 rounded-lg">
                                    <div>
                                        <div class="font-medium">${student ? student.name : 'Unknown Student'}</div>
                                        <div class="text-sm text-gray-600">${new Date(attendee.timestamp).toLocaleTimeString()}</div>
                                    </div>
                                    <div class="text-green-600">
                                        <i class="fas fa-check-circle"></i>
                                    </div>
                                </div>
                            `;
                        }).join('')
                    }
                </div>
            </div>
        `;
        
        document.body.appendChild(modal);
    }

    // Teacher: End current session
    endCurrentSession() {
        if (!this.currentSession) {
            alert('No active session to end!');
            return;
        }
        
        if (confirm('Are you sure you want to end this session?')) {
            const result = db.endOTPSession(this.currentSession.id, this.currentSession.teacherId);
            
            if (result.success) {
                alert('Session ended successfully!');
                this.currentSession = null;
                
                // Clear refresh interval
                if (this.attendeesRefreshInterval) {
                    clearInterval(this.attendeesRefreshInterval);
                }
                
                // Close modal
                document.querySelector('.fixed').remove();
                
                // Update active sessions list
                this.updateActiveSessionsList(result.session.teacherId);
            } else {
                alert('Error ending session: ' + result.error);
            }
        }
    }

    // Teacher: Update active sessions list
    updateActiveSessionsList(teacherId) {
        const activeSessions = db.getTeacherActiveOTPSessions(teacherId);
        const activeSessionsList = document.getElementById('active-sessions-list');
        
        if (activeSessionsList) {
            if (activeSessions.length === 0) {
                activeSessionsList.innerHTML = '<p class="text-gray-500">No active sessions</p>';
            } else {
                activeSessionsList.innerHTML = activeSessions.map(session => {
                    const classes = db.getData('classes');
                    const classInfo = classes.find(c => c.id === session.classId);
                    return `
                        <div class="flex justify-between items-center p-2 bg-white rounded border">
                            <div>
                                <div class="font-medium">${classInfo ? classInfo.name : 'Unknown Class'}</div>
                                <div class="text-sm text-gray-600">OTP: ${session.otp}</div>
                            </div>
                            <button onclick="otpAttendanceUI.showSessionAttendees('${session.id}')" 
                                    class="px-2 py-1 bg-blue-600 text-white rounded text-sm">
                                View
                            </button>
                        </div>
                    `;
                }).join('');
            }
        }
    }

    // Student: Show OTP entry modal
    showOTPEntryUI(studentId) {
        const student = db.getUserById('students', studentId);
        const classes = db.getData('classes');
        const studentClass = classes.find(c => c.id === student.classId);
        
        if (!studentClass) {
            alert('You are not assigned to any class!');
            return;
        }
        
        const modal = document.createElement('div');
        modal.className = 'fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50';
        modal.innerHTML = `
            <div class="bg-white rounded-lg p-6 max-w-md w-full mx-4">
                <div class="flex justify-between items-center mb-4">
                    <h3 class="text-lg font-semibold text-gray-800">Mark Attendance</h3>
                    <button onclick="this.closest('.fixed').remove()" class="text-gray-500 hover:text-gray-700">
                        <i class="fas fa-times"></i>
                    </button>
                </div>
                
                <div class="space-y-4">
                    <div class="bg-blue-50 p-4 rounded-lg">
                        <h4 class="font-semibold text-blue-800 mb-2">Enter OTP from your teacher</h4>
                        <p class="text-sm text-blue-700 mb-3">Ask your teacher for the 6-digit OTP code</p>
                        <input type="text" id="otpInput" placeholder="Enter 6-digit OTP" 
                               class="w-full p-3 border rounded-lg text-center text-2xl tracking-wider" 
                               maxlength="6" pattern="[0-9]{6}">
                    </div>
                    
                    <div class="bg-gray-50 p-4 rounded-lg">
                        <h4 class="font-semibold text-gray-800 mb-2">Session Details</h4>
                        <p class="text-sm text-gray-600">Class: ${studentClass.name}</p>
                        <p class="text-sm text-gray-600">Student: ${student.name}</p>
                    </div>
                    
                    <div class="flex space-x-3">
                        <button onclick="this.closest('.fixed').remove()" 
                                class="flex-1 px-4 py-2 border border-gray-300 rounded-lg text-gray-700 hover:bg-gray-50">
                            Cancel
                        </button>
                        <button onclick="otpAttendanceUI.markAttendanceWithOTP('${studentId}', '${studentClass.id}')" 
                                class="flex-1 px-4 py-2 bg-green-600 text-white rounded-lg hover:bg-green-700">
                            <i class="fas fa-check mr-2"></i>Mark Attendance
                        </button>
                    </div>
                </div>
            </div>
        `;
        
        document.body.appendChild(modal);
        
        // Focus on OTP input
        setTimeout(() => {
            document.getElementById('otpInput').focus();
        }, 100);
    }

    // Student: Mark attendance with OTP
    markAttendanceWithOTP(studentId, classId = null) {
        const otp = document.getElementById('otpInput').value.trim();
        
        if (!otp || otp.length !== 6) {
            alert('Please enter a valid 6-digit OTP!');
            return;
        }
        
        // If classId is not provided, get it from the student's class
        if (!classId) {
            const student = db.getUserById('students', studentId);
            if (!student || !student.classId) {
                alert('You are not assigned to any class!');
                return;
            }
            classId = student.classId;
        }
        
        const result = db.verifyOTPAndMarkAttendance(classId, studentId, otp);
        
        if (result.success) {
            alert('✅ Attendance marked successfully!');
            
            // Clear the input
            document.getElementById('otpInput').value = '';
            
            // Update attendance history
            this.updateStudentAttendanceHistory(studentId);
        } else {
            alert('❌ ' + result.error);
        }
    }

    // Student: Show attendance history
    showAttendanceHistory(studentId) {
        const history = db.getStudentOTPAttendanceHistory(studentId);
        const classes = db.getData('classes');
        const teachers = db.getData('teachers');
        
        const modal = document.createElement('div');
        modal.className = 'fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50';
        modal.innerHTML = `
            <div class="bg-white rounded-lg p-6 max-w-2xl w-full mx-4 max-h-96 overflow-y-auto">
                <div class="flex justify-between items-center mb-4">
                    <h3 class="text-lg font-semibold text-gray-800">Attendance History</h3>
                    <button onclick="this.closest('.fixed').remove()" class="text-gray-500 hover:text-gray-700">
                        <i class="fas fa-times"></i>
                    </button>
                </div>
                
                <div class="space-y-2">
                    ${history.length === 0 ? 
                        '<p class="text-gray-500 text-center py-4">No attendance records found.</p>' :
                        history.map(record => {
                            const classInfo = classes.find(c => c.id === record.classId);
                            const teacherInfo = teachers.find(t => t.id === record.teacherId);
                            return `
                                <div class="flex justify-between items-center p-3 bg-gray-50 rounded-lg">
                                    <div>
                                        <div class="font-medium">${classInfo ? classInfo.name : 'Unknown Class'}</div>
                                        <div class="text-sm text-gray-600">
                                            ${teacherInfo ? teacherInfo.name : 'Unknown Teacher'} • 
                                            ${new Date(record.date).toLocaleDateString()}
                                        </div>
                                    </div>
                                    <div class="text-green-600">
                                        <i class="fas fa-check-circle"></i> Present
                                    </div>
                                </div>
                            `;
                        }).join('')
                    }
                </div>
            </div>
        `;
        
        document.body.appendChild(modal);
    }

    // Student: Update attendance history display
    updateStudentAttendanceHistory(studentId) {
        const history = db.getStudentOTPAttendanceHistory(studentId);
        const classes = db.getData('classes');
        const teachers = db.getData('teachers');
        
        const attendanceList = document.getElementById('attendance-list');
        if (attendanceList) {
            if (history.length === 0) {
                attendanceList.innerHTML = '';
                document.getElementById('attendance-empty').style.display = 'block';
            } else {
                document.getElementById('attendance-empty').style.display = 'none';
                attendanceList.innerHTML = history.map(record => {
                    const classInfo = classes.find(c => c.id === record.classId);
                    const teacherInfo = teachers.find(t => t.id === record.teacherId);
                    return `
                        <tr>
                            <td class="p-3">${new Date(record.date).toLocaleDateString()}</td>
                            <td class="p-3">${classInfo ? classInfo.name : 'Unknown'}</td>
                            <td class="p-3">${teacherInfo ? teacherInfo.name : 'Unknown'}</td>
                            <td class="p-3">
                                <span class="px-2 py-1 bg-green-100 text-green-800 rounded-full text-sm">
                                    Present
                                </span>
                            </td>
                        </tr>
                    `;
                }).join('');
            }
        }
    }

    // Teacher: Populate class select dropdown
    populateClassSelect(teacherId) {
        const classSelect = document.getElementById('classSelect');
        if (!classSelect) return;
        
        const classes = db.getData('classes');
        const teacherClasses = classes.filter(c => c.teacherId === teacherId);
        
        classSelect.innerHTML = '<option value="">Select a class...</option>';
        teacherClasses.forEach(cls => {
            const option = document.createElement('option');
            option.value = cls.id;
            option.textContent = cls.name;
            classSelect.appendChild(option);
        });
    }

    // Teacher: Show session history
    showSessionHistory(teacherId) {
        const otpSessions = db.getData('otpSessions');
        const teacherSessions = otpSessions.filter(s => s.teacherId === teacherId);
        const classes = db.getData('classes');
        const students = db.getData('students');
        
        const modal = document.createElement('div');
        modal.className = 'fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50';
        modal.innerHTML = `
            <div class="bg-white rounded-lg p-6 max-w-4xl w-full mx-4 max-h-96 overflow-y-auto">
                <div class="flex justify-between items-center mb-4">
                    <h3 class="text-lg font-semibold text-gray-800">OTP Session History</h3>
                    <button onclick="this.closest('.fixed').remove()" class="text-gray-500 hover:text-gray-700">
                        <i class="fas fa-times"></i>
                    </button>
                </div>
                
                <div class="space-y-4">
                    ${teacherSessions.length === 0 ? 
                        '<p class="text-gray-500 text-center py-4">No OTP sessions found.</p>' :
                        teacherSessions.map(session => {
                            const classInfo = classes.find(c => c.id === session.classId);
                            return `
                                <div class="border rounded-lg p-4">
                                    <div class="flex justify-between items-start mb-2">
                                        <div>
                                            <h4 class="font-semibold">${classInfo ? classInfo.name : 'Unknown Class'}</h4>
                                            <p class="text-sm text-gray-600">
                                                OTP: ${session.otp} • 
                                                ${new Date(session.startTime).toLocaleDateString()} • 
                                                ${session.attendees.length} students attended
                                            </p>
                                        </div>
                                        <span class="px-2 py-1 rounded text-sm ${
                                            session.status === 'active' ? 'bg-green-100 text-green-800' : 'bg-gray-100 text-gray-800'
                                        }">
                                            ${session.status}
                                        </span>
                                    </div>
                                    ${session.attendees.length > 0 ? `
                                        <div class="mt-2">
                                            <p class="text-sm font-medium text-gray-700 mb-1">Attendees:</p>
                                            <div class="text-sm text-gray-600">
                                                ${session.attendees.map(attendee => {
                                                    const student = students.find(s => s.id === attendee.studentId);
                                                    return student ? student.name : 'Unknown Student';
                                                }).join(', ')}
                                            </div>
                                        </div>
                                    ` : ''}
                                </div>
                            `;
                        }).join('')
                    }
                </div>
            </div>
        `;
        
        document.body.appendChild(modal);
    }
}

// Initialize global OTP attendance UI
window.otpAttendanceUI = new OTPAttendanceUI(); 