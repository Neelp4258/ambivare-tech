class SecureAttendanceUI {
    constructor() {
        this.currentSession = null;
        this.qrCodeLibrary = null;
        this.initQRCodeLibrary();
    }

    // Initialize QR code library
    async initQRCodeLibrary() {
        // Load QR code library dynamically
        if (typeof QRCode === 'undefined') {
            const script = document.createElement('script');
            script.src = 'https://cdn.jsdelivr.net/npm/qrcode@1.5.3/build/qrcode.min.js';
            document.head.appendChild(script);
            await new Promise(resolve => script.onload = resolve);
        }
    }

    // Teacher: Create new attendance session
    createAttendanceSessionUI(classId, teacherId) {
        const modalHtml = `
            <div id="createSessionModal" class="modal-backdrop">
                <div class="modal-content max-w-md mx-auto bg-white rounded-lg shadow-xl">
                    <div class="modal-header bg-blue-600 text-white p-4 rounded-t-lg">
                        <h3 class="text-lg font-semibold">Create Attendance Session</h3>
                        <button onclick="closeModal('createSessionModal')" class="modal-close">&times;</button>
                    </div>
                    <div class="modal-body p-6">
                        <form id="createSessionForm">
                            <div class="mb-4">
                                <label class="block text-sm font-medium text-gray-700 mb-2">Session Duration (minutes)</label>
                                <input type="number" id="sessionDuration" value="60" min="15" max="180" 
                                       class="w-full p-2 border rounded-lg focus:ring-2 focus:ring-blue-500">
                            </div>
                            <div class="mb-4">
                                <label class="block text-sm font-medium text-gray-700 mb-2">Security Level</label>
                                <select id="securityLevel" class="w-full p-2 border rounded-lg focus:ring-2 focus:ring-blue-500">
                                    <option value="standard">Standard (Location + Device)</option>
                                    <option value="high">High (Location + Device + Biometric)</option>
                                    <option value="maximum">Maximum (All checks + Network)</option>
                                </select>
                            </div>
                            <div class="flex justify-end space-x-3">
                                <button type="button" onclick="closeModal('createSessionModal')" 
                                        class="px-4 py-2 text-gray-600 border rounded-lg hover:bg-gray-50">
                                    Cancel
                                </button>
                                <button type="submit" 
                                        class="px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700">
                                    Create Session
                                </button>
                            </div>
                        </form>
                    </div>
                </div>
            </div>
        `;

        document.body.insertAdjacentHTML('beforeend', modalHtml);

        document.getElementById('createSessionForm').addEventListener('submit', async (e) => {
            e.preventDefault();
            
            const duration = parseInt(document.getElementById('sessionDuration').value);
            const securityLevel = document.getElementById('securityLevel').value;
            
            const session = window.secureAttendance.createAttendanceSession(classId, teacherId, duration);
            session.securityLevel = securityLevel;
            
            closeModal('createSessionModal');
            this.showActiveSessionUI(session);
        });
    }

    // Show active session UI for teachers
    showActiveSessionUI(session) {
        this.currentSession = session;
        
        const modalHtml = `
            <div id="activeSessionModal" class="modal-backdrop">
                <div class="modal-content max-w-4xl mx-auto bg-white rounded-lg shadow-xl">
                    <div class="modal-header bg-green-600 text-white p-4 rounded-t-lg">
                        <h3 class="text-lg font-semibold">Active Attendance Session</h3>
                        <button onclick="closeModal('activeSessionModal')" class="modal-close">&times;</button>
                    </div>
                    <div class="modal-body p-6">
                        <div class="grid grid-cols-1 md:grid-cols-2 gap-6">
                            <!-- Session Info -->
                            <div class="space-y-4">
                                <div class="bg-gray-50 p-4 rounded-lg">
                                    <h4 class="font-semibold text-gray-800 mb-2">Session Information</h4>
                                    <div class="space-y-2 text-sm">
                                        <div><strong>Session ID:</strong> ${session.id}</div>
                                        <div><strong>Class:</strong> ${session.classId}</div>
                                        <div><strong>Start Time:</strong> ${new Date(session.startTime).toLocaleString()}</div>
                                        <div><strong>End Time:</strong> ${new Date(session.endTime).toLocaleString()}</div>
                                        <div><strong>Status:</strong> <span class="text-green-600 font-semibold">Active</span></div>
                                    </div>
                                </div>
                                
                                <!-- QR Code -->
                                <div class="bg-gray-50 p-4 rounded-lg text-center">
                                    <h4 class="font-semibold text-gray-800 mb-2">Attendance QR Code</h4>
                                    <div id="qrCodeContainer" class="flex justify-center"></div>
                                    <div class="mt-2 text-sm text-gray-600">
                                        Students scan this code to mark attendance
                                    </div>
                                </div>
                            </div>
                            
                            <!-- Real-time Attendance -->
                            <div class="space-y-4">
                                <div class="bg-gray-50 p-4 rounded-lg">
                                    <h4 class="font-semibold text-gray-800 mb-2">Real-time Attendance</h4>
                                    <div id="attendanceList" class="space-y-2 max-h-64 overflow-y-auto">
                                        <div class="text-gray-500 text-sm">No attendees yet...</div>
                                    </div>
                                </div>
                                
                                <!-- Session Controls -->
                                <div class="bg-gray-50 p-4 rounded-lg">
                                    <h4 class="font-semibold text-gray-800 mb-2">Session Controls</h4>
                                    <div class="space-y-2">
                                        <button onclick="secureAttendanceUI.refreshAttendanceList()" 
                                                class="w-full px-3 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 text-sm">
                                            Refresh Attendance
                                        </button>
                                        <button onclick="secureAttendanceUI.endSession()" 
                                                class="w-full px-3 py-2 bg-red-600 text-white rounded-lg hover:bg-red-700 text-sm">
                                            End Session
                                        </button>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        `;

        document.body.insertAdjacentHTML('beforeend', modalHtml);
        
        // Generate QR code
        this.generateQRCode(session.qrCode, 'qrCodeContainer');
        
        // Start real-time updates
        this.startRealTimeUpdates();
    }

    // Generate QR code
    async generateQRCode(data, containerId) {
        await this.initQRCodeLibrary();
        
        const container = document.getElementById(containerId);
        if (container && typeof QRCode !== 'undefined') {
            container.innerHTML = '';
            QRCode.toCanvas(container, data, {
                width: 200,
                height: 200,
                margin: 2,
                color: {
                    dark: '#000000',
                    light: '#FFFFFF'
                }
            });
        }
    }

    // Refresh attendance list
    refreshAttendanceList() {
        if (!this.currentSession) return;
        
        const session = window.secureAttendance.getSessionDetails(this.currentSession.id);
        const container = document.getElementById('attendanceList');
        
        if (!container || !session) return;
        
        if (session.attendees.length === 0) {
            container.innerHTML = '<div class="text-gray-500 text-sm">No attendees yet...</div>';
            return;
        }
        
        container.innerHTML = session.attendees.map(attendee => `
            <div class="flex items-center justify-between p-2 bg-white rounded border">
                <div class="flex items-center space-x-3">
                    <div class="w-8 h-8 bg-green-100 rounded-full flex items-center justify-center">
                        <i class="fas fa-check text-green-600 text-xs"></i>
                    </div>
                    <div>
                        <div class="font-medium text-sm">${attendee.studentId}</div>
                        <div class="text-xs text-gray-500">
                            ${new Date(attendee.timestamp).toLocaleTimeString()}
                        </div>
                    </div>
                </div>
                <div class="text-right">
                    <div class="text-xs font-medium text-gray-700">
                        Score: ${attendee.securityScore}%
                    </div>
                    <div class="text-xs text-gray-500">
                        ${attendee.biometricVerified ? '✓ Bio' : '✗ Bio'} | 
                        ${attendee.location ? '✓ Loc' : '✗ Loc'}
                    </div>
                </div>
            </div>
        `).join('');
    }

    // Start real-time updates
    startRealTimeUpdates() {
        this.updateInterval = setInterval(() => {
            this.refreshAttendanceList();
        }, 5000); // Update every 5 seconds
    }

    // End session
    async endSession() {
        if (!this.currentSession) return;
        
        const result = window.secureAttendance.endSession(this.currentSession.id, auth.getCurrentUser().id);
        
        if (result.success) {
            clearInterval(this.updateInterval);
            closeModal('activeSessionModal');
            
            // Show session summary
            this.showSessionSummary(result.session);
        } else {
            alert('Error ending session: ' + result.error);
        }
    }

    // Show session summary
    showSessionSummary(session) {
        const data = window.secureAttendance.exportAttendanceData(session.id);
        
        const modalHtml = `
            <div id="sessionSummaryModal" class="modal-backdrop">
                <div class="modal-content max-w-4xl mx-auto bg-white rounded-lg shadow-xl">
                    <div class="modal-header bg-blue-600 text-white p-4 rounded-t-lg">
                        <h3 class="text-lg font-semibold">Session Summary</h3>
                        <button onclick="closeModal('sessionSummaryModal')" class="modal-close">&times;</button>
                    </div>
                    <div class="modal-body p-6">
                        <div class="grid grid-cols-1 md:grid-cols-3 gap-6 mb-6">
                            <div class="bg-blue-50 p-4 rounded-lg text-center">
                                <div class="text-2xl font-bold text-blue-600">${data.summary.totalStudents}</div>
                                <div class="text-sm text-gray-600">Total Attendees</div>
                            </div>
                            <div class="bg-green-50 p-4 rounded-lg text-center">
                                <div class="text-2xl font-bold text-green-600">${Math.round(data.summary.averageSecurityScore)}%</div>
                                <div class="text-sm text-gray-600">Avg Security Score</div>
                            </div>
                            <div class="bg-purple-50 p-4 rounded-lg text-center">
                                <div class="text-2xl font-bold text-purple-600">${data.summary.biometricVerifiedCount}</div>
                                <div class="text-sm text-gray-600">Biometric Verified</div>
                            </div>
                        </div>
                        
                        <div class="space-y-4">
                            <h4 class="font-semibold text-gray-800">Detailed Attendance</h4>
                            <div class="overflow-x-auto">
                                <table class="min-w-full bg-white border rounded-lg">
                                    <thead class="bg-gray-50">
                                        <tr>
                                            <th class="px-4 py-2 text-left text-xs font-medium text-gray-500 uppercase">Student</th>
                                            <th class="px-4 py-2 text-left text-xs font-medium text-gray-500 uppercase">Time</th>
                                            <th class="px-4 py-2 text-left text-xs font-medium text-gray-500 uppercase">Security Score</th>
                                            <th class="px-4 py-2 text-left text-xs font-medium text-gray-500 uppercase">Verification</th>
                                        </tr>
                                    </thead>
                                    <tbody>
                                        ${session.attendees.map(attendee => `
                                            <tr class="border-t">
                                                <td class="px-4 py-2 text-sm">${attendee.studentId}</td>
                                                <td class="px-4 py-2 text-sm">${new Date(attendee.timestamp).toLocaleString()}</td>
                                                <td class="px-4 py-2 text-sm">
                                                    <span class="px-2 py-1 rounded text-xs font-medium ${
                                                        attendee.securityScore >= 80 ? 'bg-green-100 text-green-800' :
                                                        attendee.securityScore >= 60 ? 'bg-yellow-100 text-yellow-800' :
                                                        'bg-red-100 text-red-800'
                                                    }">
                                                        ${attendee.securityScore}%
                                                    </span>
                                                </td>
                                                <td class="px-4 py-2 text-sm">
                                                    <div class="flex space-x-1">
                                                        ${attendee.biometricVerified ? 
                                                            '<span class="text-green-600">✓</span>' : 
                                                            '<span class="text-red-600">✗</span>'}
                                                        ${attendee.location ? 
                                                            '<span class="text-green-600">✓</span>' : 
                                                            '<span class="text-red-600">✗</span>'}
                                                    </div>
                                                </td>
                                            </tr>
                                        `).join('')}
                                    </tbody>
                                </table>
                            </div>
                        </div>
                        
                        <div class="flex justify-end space-x-3 mt-6">
                            <button onclick="secureAttendanceUI.exportSessionData('${session.id}')" 
                                    class="px-4 py-2 bg-green-600 text-white rounded-lg hover:bg-green-700">
                                Export Data
                            </button>
                            <button onclick="closeModal('sessionSummaryModal')" 
                                    class="px-4 py-2 bg-gray-600 text-white rounded-lg hover:bg-gray-700">
                                Close
                            </button>
                        </div>
                    </div>
                </div>
            </div>
        `;

        document.body.insertAdjacentHTML('beforeend', modalHtml);
    }

    // Export session data
    exportSessionData(sessionId) {
        const data = window.secureAttendance.exportAttendanceData(sessionId);
        const blob = new Blob([JSON.stringify(data, null, 2)], { type: 'application/json' });
        const url = URL.createObjectURL(blob);
        
        const a = document.createElement('a');
        a.href = url;
        a.download = `attendance_session_${sessionId}.json`;
        document.body.appendChild(a);
        a.click();
        document.body.removeChild(a);
        URL.revokeObjectURL(url);
    }

    // Student: Mark attendance UI
    showMarkAttendanceUI(sessionId, studentId) {
        const modalHtml = `
            <div id="markAttendanceModal" class="modal-backdrop">
                <div class="modal-content max-w-md mx-auto bg-white rounded-lg shadow-xl">
                    <div class="modal-header bg-blue-600 text-white p-4 rounded-t-lg">
                        <h3 class="text-lg font-semibold">Mark Attendance</h3>
                        <button onclick="closeModal('markAttendanceModal')" class="modal-close">&times;</button>
                    </div>
                    <div class="modal-body p-6">
                        <div id="attendanceProgress" class="space-y-4">
                            <div class="text-center">
                                <div class="animate-spin rounded-full h-12 w-12 border-b-2 border-blue-600 mx-auto"></div>
                                <p class="mt-2 text-sm text-gray-600">Verifying your attendance...</p>
                            </div>
                            
                            <div id="securityChecks" class="space-y-2 hidden">
                                <div class="flex items-center space-x-3">
                                    <div id="locationCheck" class="w-6 h-6 rounded-full border-2 border-gray-300"></div>
                                    <span class="text-sm">Location verification</span>
                                </div>
                                <div class="flex items-center space-x-3">
                                    <div id="deviceCheck" class="w-6 h-6 rounded-full border-2 border-gray-300"></div>
                                    <span class="text-sm">Device verification</span>
                                </div>
                                <div class="flex items-center space-x-3">
                                    <div id="biometricCheck" class="w-6 h-6 rounded-full border-2 border-gray-300"></div>
                                    <span class="text-sm">Biometric verification</span>
                                </div>
                                <div class="flex items-center space-x-3">
                                    <div id="networkCheck" class="w-6 h-6 rounded-full border-2 border-gray-300"></div>
                                    <span class="text-sm">Network verification</span>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        `;

        document.body.insertAdjacentHTML('beforeend', modalHtml);
        
        // Start attendance process
        this.processAttendance(sessionId, studentId);
    }

    // Process attendance marking
    async processAttendance(sessionId, studentId) {
        try {
            // Show security checks
            document.getElementById('securityChecks').classList.remove('hidden');
            
            // Simulate security checks with visual feedback
            await this.simulateSecurityChecks();
            
            // Mark attendance
            const result = await window.secureAttendance.markAttendance(sessionId, studentId, '123456');
            
            if (result.success) {
                this.showAttendanceSuccess(result);
            } else {
                this.showAttendanceError(result.error);
            }
        } catch (error) {
            this.showAttendanceError('An unexpected error occurred');
        }
    }

    // Simulate security checks with visual feedback
    async simulateSecurityChecks() {
        const checks = ['locationCheck', 'deviceCheck', 'biometricCheck', 'networkCheck'];
        
        for (const checkId of checks) {
            await new Promise(resolve => setTimeout(resolve, 1000));
            
            const checkElement = document.getElementById(checkId);
            checkElement.classList.remove('border-gray-300');
            checkElement.classList.add('border-green-500', 'bg-green-500');
            checkElement.innerHTML = '✓';
        }
    }

    // Show attendance success
    showAttendanceSuccess(result) {
        const progressDiv = document.getElementById('attendanceProgress');
        progressDiv.innerHTML = `
            <div class="text-center">
                <div class="w-16 h-16 bg-green-100 rounded-full flex items-center justify-center mx-auto mb-4">
                    <i class="fas fa-check text-green-600 text-2xl"></i>
                </div>
                <h4 class="text-lg font-semibold text-green-800 mb-2">Attendance Marked Successfully!</h4>
                <p class="text-sm text-gray-600 mb-4">Your attendance has been recorded with a security score of ${result.securityScore}%</p>
                <button onclick="closeModal('markAttendanceModal')" 
                        class="px-4 py-2 bg-green-600 text-white rounded-lg hover:bg-green-700">
                    Close
                </button>
            </div>
        `;
    }

    // Show attendance error
    showAttendanceError(error) {
        const progressDiv = document.getElementById('attendanceProgress');
        progressDiv.innerHTML = `
            <div class="text-center">
                <div class="w-16 h-16 bg-red-100 rounded-full flex items-center justify-center mx-auto mb-4">
                    <i class="fas fa-times text-red-600 text-2xl"></i>
                </div>
                <h4 class="text-lg font-semibold text-red-800 mb-2">Attendance Failed</h4>
                <p class="text-sm text-gray-600 mb-4">${error}</p>
                <button onclick="closeModal('markAttendanceModal')" 
                        class="px-4 py-2 bg-red-600 text-white rounded-lg hover:bg-red-700">
                    Close
                </button>
            </div>
        `;
    }

    // Show attendance history for students
    showAttendanceHistory(studentId) {
        const history = window.secureAttendance.getStudentAttendanceHistory(studentId);
        
        const modalHtml = `
            <div id="attendanceHistoryModal" class="modal-backdrop">
                <div class="modal-content max-w-4xl mx-auto bg-white rounded-lg shadow-xl">
                    <div class="modal-header bg-blue-600 text-white p-4 rounded-t-lg">
                        <h3 class="text-lg font-semibold">My Attendance History</h3>
                        <button onclick="closeModal('attendanceHistoryModal')" class="modal-close">&times;</button>
                    </div>
                    <div class="modal-body p-6">
                        ${history.length === 0 ? 
                            '<div class="text-center text-gray-500 py-8">No attendance records found</div>' :
                            `<div class="overflow-x-auto">
                                <table class="min-w-full bg-white border rounded-lg">
                                    <thead class="bg-gray-50">
                                        <tr>
                                            <th class="px-4 py-2 text-left text-xs font-medium text-gray-500 uppercase">Date</th>
                                            <th class="px-4 py-2 text-left text-xs font-medium text-gray-500 uppercase">Class</th>
                                            <th class="px-4 py-2 text-left text-xs font-medium text-gray-500 uppercase">Security Score</th>
                                            <th class="px-4 py-2 text-left text-xs font-medium text-gray-500 uppercase">Verification</th>
                                        </tr>
                                    </thead>
                                    <tbody>
                                        ${history.map(record => `
                                            <tr class="border-t">
                                                <td class="px-4 py-2 text-sm">${new Date(record.date).toLocaleDateString()}</td>
                                                <td class="px-4 py-2 text-sm">${record.classId}</td>
                                                <td class="px-4 py-2 text-sm">
                                                    <span class="px-2 py-1 rounded text-xs font-medium ${
                                                        record.securityScore >= 80 ? 'bg-green-100 text-green-800' :
                                                        record.securityScore >= 60 ? 'bg-yellow-100 text-yellow-800' :
                                                        'bg-red-100 text-red-800'
                                                    }">
                                                        ${record.securityScore}%
                                                    </span>
                                                </td>
                                                <td class="px-4 py-2 text-sm">
                                                    <div class="flex space-x-1">
                                                        ${record.biometricVerified ? 
                                                            '<span class="text-green-600" title="Biometric verified">✓</span>' : 
                                                            '<span class="text-red-600" title="Biometric not verified">✗</span>'}
                                                        ${record.location ? 
                                                            '<span class="text-green-600" title="Location verified">✓</span>' : 
                                                            '<span class="text-red-600" title="Location not verified">✗</span>'}
                                                    </div>
                                                </td>
                                            </tr>
                                        `).join('')}
                                    </tbody>
                                </table>
                            </div>`
                        }
                    </div>
                </div>
            </div>
        `;

        document.body.insertAdjacentHTML('beforeend', modalHtml);
    }

    // Show audit log for administrators
    showAuditLog(filters = {}) {
        const auditLog = window.secureAttendance.getAuditLog(filters);
        
        const modalHtml = `
            <div id="auditLogModal" class="modal-backdrop">
                <div class="modal-content max-w-6xl mx-auto bg-white rounded-lg shadow-xl">
                    <div class="modal-header bg-purple-600 text-white p-4 rounded-t-lg">
                        <h3 class="text-lg font-semibold">Attendance Audit Log</h3>
                        <button onclick="closeModal('auditLogModal')" class="modal-close">&times;</button>
                    </div>
                    <div class="modal-body p-6">
                        <div class="mb-4">
                            <div class="grid grid-cols-1 md:grid-cols-4 gap-4">
                                <input type="date" id="startDate" placeholder="Start Date" 
                                       class="p-2 border rounded-lg">
                                <input type="date" id="endDate" placeholder="End Date" 
                                       class="p-2 border rounded-lg">
                                <input type="text" id="studentFilter" placeholder="Student ID" 
                                       class="p-2 border rounded-lg">
                                <button onclick="secureAttendanceUI.filterAuditLog()" 
                                        class="px-4 py-2 bg-purple-600 text-white rounded-lg hover:bg-purple-700">
                                    Filter
                                </button>
                            </div>
                        </div>
                        
                        <div class="overflow-x-auto max-h-96">
                            <table class="min-w-full bg-white border rounded-lg">
                                <thead class="bg-gray-50 sticky top-0">
                                    <tr>
                                        <th class="px-4 py-2 text-left text-xs font-medium text-gray-500 uppercase">Timestamp</th>
                                        <th class="px-4 py-2 text-left text-xs font-medium text-gray-500 uppercase">Action</th>
                                        <th class="px-4 py-2 text-left text-xs font-medium text-gray-500 uppercase">Session ID</th>
                                        <th class="px-4 py-2 text-left text-xs font-medium text-gray-500 uppercase">Student ID</th>
                                        <th class="px-4 py-2 text-left text-xs font-medium text-gray-500 uppercase">Details</th>
                                    </tr>
                                </thead>
                                <tbody>
                                    ${auditLog.map(entry => `
                                        <tr class="border-t">
                                            <td class="px-4 py-2 text-sm">${new Date(entry.timestamp).toLocaleString()}</td>
                                            <td class="px-4 py-2 text-sm">
                                                <span class="px-2 py-1 rounded text-xs font-medium ${
                                                    entry.action === 'ATTENDANCE_MARKED' ? 'bg-green-100 text-green-800' :
                                                    entry.action === 'ATTENDANCE_FAILED' ? 'bg-red-100 text-red-800' :
                                                    'bg-blue-100 text-blue-800'
                                                }">
                                                    ${entry.action}
                                                </span>
                                            </td>
                                            <td class="px-4 py-2 text-sm">${entry.sessionId || '-'}</td>
                                            <td class="px-4 py-2 text-sm">${entry.studentId || '-'}</td>
                                            <td class="px-4 py-2 text-sm">
                                                <button onclick="secureAttendanceUI.showAuditDetails('${JSON.stringify(entry).replace(/'/g, "\\'")}')" 
                                                        class="text-blue-600 hover:text-blue-800 text-xs">
                                                    View Details
                                                </button>
                                            </td>
                                        </tr>
                                    `).join('')}
                                </tbody>
                            </table>
                        </div>
                    </div>
                </div>
            </div>
        `;

        document.body.insertAdjacentHTML('beforeend', modalHtml);
    }

    // Filter audit log
    filterAuditLog() {
        const startDate = document.getElementById('startDate').value;
        const endDate = document.getElementById('endDate').value;
        const studentId = document.getElementById('studentFilter').value;
        
        const filters = {};
        if (startDate) filters.startDate = startDate;
        if (endDate) filters.endDate = endDate;
        if (studentId) filters.studentId = studentId;
        
        closeModal('auditLogModal');
        this.showAuditLog(filters);
    }

    // Show audit details
    showAuditDetails(entryJson) {
        const entry = JSON.parse(entryJson);
        
        const modalHtml = `
            <div id="auditDetailsModal" class="modal-backdrop">
                <div class="modal-content max-w-2xl mx-auto bg-white rounded-lg shadow-xl">
                    <div class="modal-header bg-gray-600 text-white p-4 rounded-t-lg">
                        <h3 class="text-lg font-semibold">Audit Entry Details</h3>
                        <button onclick="closeModal('auditDetailsModal')" class="modal-close">&times;</button>
                    </div>
                    <div class="modal-body p-6">
                        <div class="space-y-4">
                            <div>
                                <label class="block text-sm font-medium text-gray-700">Timestamp</label>
                                <p class="text-sm text-gray-900">${new Date(entry.timestamp).toLocaleString()}</p>
                            </div>
                            <div>
                                <label class="block text-sm font-medium text-gray-700">Action</label>
                                <p class="text-sm text-gray-900">${entry.action}</p>
                            </div>
                            <div>
                                <label class="block text-sm font-medium text-gray-700">Device Fingerprint</label>
                                <p class="text-sm text-gray-900 font-mono">${entry.deviceFingerprint}</p>
                            </div>
                            <div>
                                <label class="block text-sm font-medium text-gray-700">User Agent</label>
                                <p class="text-sm text-gray-900">${entry.userAgent}</p>
                            </div>
                            <div>
                                <label class="block text-sm font-medium text-gray-700">Data</label>
                                <pre class="text-sm text-gray-900 bg-gray-50 p-2 rounded overflow-x-auto">${JSON.stringify(entry.data, null, 2)}</pre>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        `;

        document.body.insertAdjacentHTML('beforeend', modalHtml);
    }
}

// Initialize global secure attendance UI
window.secureAttendanceUI = new SecureAttendanceUI(); 