# OTP-Based Attendance System

This document explains how to use the new OTP-based attendance system in the Classes CRM.

## Overview

The OTP (One-Time Password) attendance system allows teachers to generate a 6-digit code that students must enter to mark their attendance. This provides a simple and secure way to track attendance without complex QR codes or biometric verification.

## How It Works

### For Teachers

1. **Login to Teacher Portal**
   - Navigate to the teacher portal and login with your credentials

2. **Create OTP Session**
   - Go to the "Attendance" section
   - Select your class from the dropdown menu
   - Choose session duration (15, 30, 45, or 60 minutes)
   - Click "Generate OTP"

3. **Share OTP with Students**
   - A modal will appear showing the 6-digit OTP
   - Share this OTP with your students (write on board, say aloud, etc.)
   - The session will automatically expire after the chosen duration

4. **Monitor Attendance**
   - View real-time attendance count in the session modal
   - Click "View Attendees" to see who has marked attendance
   - End session when finished

5. **View Session History**
   - Click "View History" to see all your OTP sessions
   - Review attendance records and session details

### For Students

1. **Login to Student Portal**
   - Navigate to the student portal and login with your credentials

2. **Mark Attendance**
   - Go to the "My Attendance" section
   - Enter the 6-digit OTP provided by your teacher
   - Click "Mark Attendance"

3. **View Attendance History**
   - Click "View History" to see your attendance records
   - View attendance table showing dates, classes, and teachers

## Features

### Security Features
- **Unique OTP**: Each session generates a unique 6-digit code
- **Time-limited**: Sessions automatically expire after the set duration
- **One-time use**: Students can only mark attendance once per session
- **Class-specific**: OTPs only work for the specific class they were generated for

### User Experience
- **Simple interface**: Easy-to-use modals and forms
- **Real-time updates**: Attendance count updates automatically
- **Clear feedback**: Success/error messages for all actions
- **Mobile-friendly**: Works on all device sizes

### Teacher Benefits
- **Quick setup**: Generate OTP in seconds
- **Live monitoring**: See attendance in real-time
- **Session management**: Start, monitor, and end sessions easily
- **History tracking**: Complete record of all sessions

### Student Benefits
- **Simple process**: Just enter 6 digits to mark attendance
- **Immediate feedback**: Know instantly if attendance was marked
- **No special equipment**: Works with any device
- **Clear history**: Easy access to attendance records

## Technical Details

### Database Storage
- OTP sessions are stored in `localStorage` under `otpSessions`
- Each session includes:
  - Session ID, class ID, teacher ID
  - 6-digit OTP code
  - Start/end times
  - List of attendees with timestamps

### Session Lifecycle
1. **Created**: Teacher generates OTP session
2. **Active**: Students can mark attendance
3. **Ended**: Teacher manually ends or session expires
4. **Archived**: Session data preserved for history

### Error Handling
- Invalid OTP codes are rejected
- Expired sessions cannot be used
- Duplicate attendance attempts are prevented
- Missing class assignments are handled gracefully

## Troubleshooting

### Common Issues

**Teacher can't see classes in dropdown**
- Make sure you're assigned to classes in the admin panel
- Check that classes have a teacher ID assigned

**Student can't mark attendance**
- Verify the OTP code is correct (6 digits)
- Check that the session hasn't expired
- Ensure student is assigned to the correct class

**Attendance not showing in history**
- Refresh the page to reload data
- Check that the attendance was successfully marked
- Verify the student is logged in with correct credentials

### Support
For technical issues or questions about the OTP attendance system, please contact the system administrator.

## Future Enhancements

Potential improvements for the OTP attendance system:
- Bulk OTP generation for multiple classes
- Email/SMS OTP delivery
- Advanced analytics and reporting
- Integration with external attendance systems
- Custom OTP formats and lengths 