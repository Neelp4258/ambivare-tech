class SecureAttendanceSystem {
    constructor() {
        this.currentSession = null;
        this.deviceFingerprint = this.generateDeviceFingerprint();
        this.auditLog = [];
        this.attendanceSessions = new Map();
        this.maxDistance = 100; // meters from school location
        this.schoolLocation = {
            lat: 40.7128, // Default NYC coordinates - should be configured
            lng: -74.0060
        };
    }

    // Generate unique device fingerprint
    generateDeviceFingerprint() {
        const canvas = document.createElement('canvas');
        const ctx = canvas.getContext('2d');
        ctx.textBaseline = 'top';
        ctx.font = '14px Arial';
        ctx.fillText('Device fingerprint', 2, 2);
        
        const fingerprint = [
            navigator.userAgent,
            navigator.language,
            screen.width + 'x' + screen.height,
            new Date().getTimezoneOffset(),
            canvas.toDataURL(),
            navigator.hardwareConcurrency,
            navigator.deviceMemory || 'unknown'
        ].join('|');
        
        return this.hashString(fingerprint);
    }

    // Simple hash function
    hashString(str) {
        let hash = 0;
        for (let i = 0; i < str.length; i++) {
            const char = str.charCodeAt(i);
            hash = ((hash << 5) - hash) + char;
            hash = hash & hash; // Convert to 32-bit integer
        }
        return hash.toString(36);
    }

    // Create a new attendance session (teacher only)
    createAttendanceSession(classId, teacherId, duration = 60) {
        const sessionId = this.generateSessionId();
        const sessionCode = this.generateSessionCode();
        const qrCode = this.generateQRCode(sessionCode);
        
        const session = {
            id: sessionId,
            classId: classId,
            teacherId: teacherId,
            sessionCode: sessionCode,
            qrCode: qrCode,
            startTime: new Date().toISOString(),
            endTime: new Date(Date.now() + duration * 60000).toISOString(),
            duration: duration,
            status: 'active',
            attendees: [],
            attempts: [],
            location: null,
            networkInfo: null
        };

        this.attendanceSessions.set(sessionId, session);
        this.logAudit('SESSION_CREATED', { sessionId, classId, teacherId });
        
        return session;
    }

    // Generate unique session ID
    generateSessionId() {
        return 'session_' + Date.now() + '_' + Math.random().toString(36).substr(2, 9);
    }

    // Generate 6-digit session code
    generateSessionCode() {
        return Math.floor(100000 + Math.random() * 900000).toString();
    }

    // Generate QR code data
    generateQRCode(code) {
        return `attendance://${code}`;
    }

    // Mark attendance (student function)
    async markAttendance(sessionId, studentId, sessionCode, options = {}) {
        const session = this.attendanceSessions.get(sessionId);
        if (!session) {
            this.logAudit('ATTENDANCE_FAILED', { sessionId, studentId, reason: 'Invalid session' });
            return { success: false, error: 'Invalid session' };
        }

        // Check if session is still active
        if (session.status !== 'active') {
            this.logAudit('ATTENDANCE_FAILED', { sessionId, studentId, reason: 'Session expired' });
            return { success: false, error: 'Session has expired' };
        }

        // Verify session code
        if (session.sessionCode !== sessionCode) {
            this.logAudit('ATTENDANCE_FAILED', { sessionId, studentId, reason: 'Invalid code' });
            return { success: false, error: 'Invalid session code' };
        }

        // Check if student already marked attendance
        if (session.attendees.some(a => a.studentId === studentId)) {
            this.logAudit('ATTENDANCE_FAILED', { sessionId, studentId, reason: 'Already marked' });
            return { success: false, error: 'Attendance already marked' };
        }

        // Perform security checks
        const securityChecks = await this.performSecurityChecks(session, studentId, options);
        if (!securityChecks.success) {
            this.logAudit('ATTENDANCE_FAILED', { 
                sessionId, 
                studentId, 
                reason: securityChecks.error 
            });
            return securityChecks;
        }

        // Record attendance
        const attendanceRecord = {
            studentId: studentId,
            timestamp: new Date().toISOString(),
            deviceFingerprint: this.deviceFingerprint,
            location: securityChecks.location,
            networkInfo: securityChecks.networkInfo,
            biometricVerified: securityChecks.biometricVerified,
            securityScore: securityChecks.securityScore
        };

        session.attendees.push(attendanceRecord);
        this.attendanceSessions.set(sessionId, session);
        
        this.logAudit('ATTENDANCE_MARKED', { 
            sessionId, 
            studentId, 
            securityScore: securityChecks.securityScore 
        });

        return { 
            success: true, 
            message: 'Attendance marked successfully',
            securityScore: securityChecks.securityScore
        };
    }

    // Perform comprehensive security checks
    async performSecurityChecks(session, studentId, options) {
        const checks = {
            timeCheck: this.checkTimeRestrictions(session),
            locationCheck: await this.checkLocation(),
            deviceCheck: this.checkDeviceFingerprint(studentId),
            networkCheck: await this.checkNetworkConnection(),
            biometricCheck: await this.performBiometricCheck(options),
            behaviorCheck: this.checkBehaviorPatterns(studentId)
        };

        const failedChecks = Object.entries(checks).filter(([key, result]) => !result.success);
        
        if (failedChecks.length > 0) {
            return {
                success: false,
                error: `Security check failed: ${failedChecks.map(([key]) => key).join(', ')}`,
                failedChecks: failedChecks.map(([key, result]) => ({ check: key, reason: result.reason }))
            };
        }

        // Calculate security score
        const securityScore = this.calculateSecurityScore(checks);

        return {
            success: true,
            location: checks.locationCheck.location,
            networkInfo: checks.networkCheck.networkInfo,
            biometricVerified: checks.biometricCheck.verified,
            securityScore: securityScore
        };
    }

    // Check time restrictions
    checkTimeRestrictions(session) {
        const now = new Date();
        const startTime = new Date(session.startTime);
        const endTime = new Date(session.endTime);

        if (now < startTime) {
            return { success: false, reason: 'Session has not started yet' };
        }

        if (now > endTime) {
            return { success: false, reason: 'Session has ended' };
        }

        return { success: true };
    }

    // Check geolocation
    async checkLocation() {
        try {
            const position = await this.getCurrentPosition();
            const distance = this.calculateDistance(
                position.coords.latitude,
                position.coords.longitude,
                this.schoolLocation.lat,
                this.schoolLocation.lng
            );

            if (distance > this.maxDistance) {
                return { 
                    success: false, 
                    reason: `Location too far from school (${Math.round(distance)}m away)` 
                };
            }

            return { 
                success: true, 
                location: {
                    lat: position.coords.latitude,
                    lng: position.coords.longitude,
                    accuracy: position.coords.accuracy,
                    distance: distance
                }
            };
        } catch (error) {
            return { 
                success: false, 
                reason: 'Location access denied or unavailable' 
            };
        }
    }

    // Get current position with timeout
    getCurrentPosition() {
        return new Promise((resolve, reject) => {
            if (!navigator.geolocation) {
                reject(new Error('Geolocation not supported'));
                return;
            }

            const timeout = setTimeout(() => {
                reject(new Error('Location request timed out'));
            }, 10000);

            navigator.geolocation.getCurrentPosition(
                (position) => {
                    clearTimeout(timeout);
                    resolve(position);
                },
                (error) => {
                    clearTimeout(timeout);
                    reject(error);
                },
                {
                    enableHighAccuracy: true,
                    timeout: 10000,
                    maximumAge: 300000 // 5 minutes
                }
            );
        });
    }

    // Calculate distance between two points (Haversine formula)
    calculateDistance(lat1, lon1, lat2, lon2) {
        const R = 6371e3; // Earth's radius in meters
        const φ1 = lat1 * Math.PI / 180;
        const φ2 = lat2 * Math.PI / 180;
        const Δφ = (lat2 - lat1) * Math.PI / 180;
        const Δλ = (lon2 - lon1) * Math.PI / 180;

        const a = Math.sin(Δφ / 2) * Math.sin(Δφ / 2) +
                  Math.cos(φ1) * Math.cos(φ2) *
                  Math.sin(Δλ / 2) * Math.sin(Δλ / 2);
        const c = 2 * Math.atan2(Math.sqrt(a), Math.sqrt(1 - a));

        return R * c;
    }

    // Check device fingerprint
    checkDeviceFingerprint(studentId) {
        // In a real implementation, you'd store and compare device fingerprints
        // For now, we'll simulate this check
        const storedFingerprint = localStorage.getItem(`device_fingerprint_${studentId}`);
        
        if (storedFingerprint && storedFingerprint !== this.deviceFingerprint) {
            return { 
                success: false, 
                reason: 'Device fingerprint mismatch - possible device switching' 
            };
        }

        // Store current fingerprint
        localStorage.setItem(`device_fingerprint_${studentId}`, this.deviceFingerprint);
        return { success: true };
    }

    // Check network connection
    async checkNetworkConnection() {
        try {
            // Check if connected to school WiFi (simulated)
            const connection = navigator.connection || navigator.mozConnection || navigator.webkitConnection;
            const networkInfo = {
                type: connection ? connection.effectiveType : 'unknown',
                downlink: connection ? connection.downlink : 'unknown',
                rtt: connection ? connection.rtt : 'unknown'
            };

            // In a real implementation, you'd check for specific school WiFi SSID
            // For now, we'll just check if there's an internet connection
            const response = await fetch('/ping', { 
                method: 'HEAD',
                cache: 'no-cache'
            }).catch(() => null);

            if (!response) {
                return { 
                    success: false, 
                    reason: 'No internet connection detected' 
                };
            }

            return { 
                success: true, 
                networkInfo: networkInfo 
            };
        } catch (error) {
            return { 
                success: false, 
                reason: 'Network check failed' 
            };
        }
    }

    // Perform biometric check (simulated)
    async performBiometricCheck(options) {
        // In a real implementation, this would use WebRTC to capture camera
        // and perform face detection/recognition
        if (options.skipBiometric) {
            return { verified: false, reason: 'Biometric check skipped' };
        }

        try {
            // Simulate face detection
            const hasCamera = await this.checkCameraAccess();
            if (!hasCamera) {
                return { verified: false, reason: 'Camera access required' };
            }

            // Simulate face detection process
            const faceDetected = await this.simulateFaceDetection();
            
            return { 
                verified: faceDetected, 
                reason: faceDetected ? 'Face detected' : 'No face detected' 
            };
        } catch (error) {
            return { verified: false, reason: 'Biometric check failed' };
        }
    }

    // Check camera access
    async checkCameraAccess() {
        try {
            const stream = await navigator.mediaDevices.getUserMedia({ video: true });
            stream.getTracks().forEach(track => track.stop());
            return true;
        } catch (error) {
            return false;
        }
    }

    // Simulate face detection
    async simulateFaceDetection() {
        // In a real implementation, this would use a face detection library
        // For now, we'll simulate with a 90% success rate
        return new Promise(resolve => {
            setTimeout(() => {
                resolve(Math.random() > 0.1);
            }, 2000);
        });
    }

    // Check behavior patterns
    checkBehaviorPatterns(studentId) {
        // Check for suspicious patterns like multiple rapid attempts
        const recentAttempts = this.getRecentAttempts(studentId, 5); // Last 5 minutes
        
        if (recentAttempts.length > 3) {
            return { 
                success: false, 
                reason: 'Too many recent attempts - possible abuse' 
            };
        }

        return { success: true };
    }

    // Get recent attendance attempts
    getRecentAttempts(studentId, minutes = 5) {
        const cutoff = new Date(Date.now() - minutes * 60000);
        return this.auditLog.filter(log => 
            log.studentId === studentId && 
            log.action === 'ATTENDANCE_ATTEMPT' &&
            new Date(log.timestamp) > cutoff
        );
    }

    // Calculate security score
    calculateSecurityScore(checks) {
        let score = 100;
        
        if (!checks.locationCheck.success) score -= 30;
        if (!checks.deviceCheck.success) score -= 20;
        if (!checks.networkCheck.success) score -= 15;
        if (!checks.biometricCheck.verified) score -= 25;
        if (!checks.behaviorCheck.success) score -= 10;

        return Math.max(0, score);
    }

    // Log audit events
    logAudit(action, data) {
        const auditEntry = {
            timestamp: new Date().toISOString(),
            action: action,
            data: data,
            sessionId: data.sessionId,
            studentId: data.studentId,
            deviceFingerprint: this.deviceFingerprint,
            userAgent: navigator.userAgent,
            ipAddress: 'unknown' // Would be server-side in real implementation
        };

        this.auditLog.push(auditEntry);
        
        // Store in localStorage for persistence
        const storedLog = JSON.parse(localStorage.getItem('attendance_audit_log') || '[]');
        storedLog.push(auditEntry);
        localStorage.setItem('attendance_audit_log', JSON.stringify(storedLog.slice(-1000))); // Keep last 1000 entries
    }

    // Get session details
    getSessionDetails(sessionId) {
        return this.attendanceSessions.get(sessionId);
    }

    // Get all sessions for a class
    getClassSessions(classId) {
        return Array.from(this.attendanceSessions.values())
            .filter(session => session.classId === classId)
            .sort((a, b) => new Date(b.startTime) - new Date(a.startTime));
    }

    // Get student attendance history
    getStudentAttendanceHistory(studentId) {
        const history = [];
        
        for (const session of this.attendanceSessions.values()) {
            const attendance = session.attendees.find(a => a.studentId === studentId);
            if (attendance) {
                history.push({
                    sessionId: session.id,
                    classId: session.classId,
                    date: session.startTime,
                    status: 'present',
                    securityScore: attendance.securityScore,
                    location: attendance.location,
                    biometricVerified: attendance.biometricVerified
                });
            }
        }
        
        return history.sort((a, b) => new Date(b.date) - new Date(a.date));
    }

    // Get audit log
    getAuditLog(filters = {}) {
        let log = this.auditLog;
        
        if (filters.sessionId) {
            log = log.filter(entry => entry.sessionId === filters.sessionId);
        }
        
        if (filters.studentId) {
            log = log.filter(entry => entry.studentId === filters.studentId);
        }
        
        if (filters.action) {
            log = log.filter(entry => entry.action === filters.action);
        }
        
        if (filters.startDate) {
            log = log.filter(entry => new Date(entry.timestamp) >= new Date(filters.startDate));
        }
        
        if (filters.endDate) {
            log = log.filter(entry => new Date(entry.timestamp) <= new Date(filters.endDate));
        }
        
        return log.sort((a, b) => new Date(b.timestamp) - new Date(a.timestamp));
    }

    // End attendance session
    endSession(sessionId, teacherId) {
        const session = this.attendanceSessions.get(sessionId);
        if (!session || session.teacherId !== teacherId) {
            return { success: false, error: 'Unauthorized or invalid session' };
        }

        session.status = 'ended';
        session.endTime = new Date().toISOString();
        this.attendanceSessions.set(sessionId, session);
        
        this.logAudit('SESSION_ENDED', { sessionId, teacherId });
        
        return { success: true, session };
    }

    // Export attendance data
    exportAttendanceData(sessionId) {
        const session = this.attendanceSessions.get(sessionId);
        if (!session) {
            return null;
        }

        return {
            session: session,
            auditLog: this.getAuditLog({ sessionId: sessionId }),
            summary: {
                totalStudents: session.attendees.length,
                averageSecurityScore: session.attendees.length > 0 ? 
                    session.attendees.reduce((sum, a) => sum + a.securityScore, 0) / session.attendees.length : 0,
                biometricVerifiedCount: session.attendees.filter(a => a.biometricVerified).length,
                locationVerifiedCount: session.attendees.filter(a => a.location).length
            }
        };
    }

    // Set school location
    setSchoolLocation(lat, lng) {
        this.schoolLocation = { lat, lng };
        localStorage.setItem('school_location', JSON.stringify(this.schoolLocation));
    }

    // Get school location
    getSchoolLocation() {
        const stored = localStorage.getItem('school_location');
        if (stored) {
            this.schoolLocation = JSON.parse(stored);
        }
        return this.schoolLocation;
    }

    // Set maximum distance
    setMaxDistance(distance) {
        this.maxDistance = distance;
        localStorage.setItem('max_distance', distance.toString());
    }

    // Get maximum distance
    getMaxDistance() {
        const stored = localStorage.getItem('max_distance');
        if (stored) {
            this.maxDistance = parseInt(stored);
        }
        return this.maxDistance;
    }
}

// Initialize global secure attendance system
window.secureAttendance = new SecureAttendanceSystem(); 