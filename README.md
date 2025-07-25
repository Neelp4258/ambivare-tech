# DazzloCore X - Coaching Management System

A comprehensive web-based Coaching Institute Management System with local storage database, separated CSS/JS architecture, and interconnected portals.

## 🚀 Features

### **Admin Portal**
- **User Management**: Add, edit, and remove teachers and students
- **Timetable Creation**: Design and publish class schedules
- **Exam Scheduling**: Schedule and manage exams
- **Task Assignment**: Create announcements and administrative tasks
- **Centralized Dashboard**: Overview of institute statistics
- **Secure Authentication**: Role-based access control

### **Teacher Portal**
- **Homework Management**: Assign and track homework
- **Attendance Tracking**: Digital attendance management
- **Exam Results**: Enter and manage student marks
- **Student Analytics**: View individual student reports
- **Personalized Timetable**: View assigned classes only
- **Real-time Updates**: Live data synchronization

### **Student Portal**
- **Personalized Dashboard**: Today's classes and upcoming exams
- **Timetable Access**: Real-time class schedule
- **Exam Information**: View scheduled exams
- **Teacher Directory**: Access teacher information
- **Announcements**: View institute announcements
- **Progress Tracking**: Monitor academic performance

## 🏗️ Project Structure

```
Classes CRM/
├── css/
│   └── styles.css              # Centralized CSS styles
├── js/
│   ├── database.js             # Local storage database system
│   ├── auth.js                 # Authentication and session management
│   ├── portals.js              # Portal functionality and UI
│   └── main.js                 # Common utilities and animations
├── index.html                  # Landing page
├── admin_login.html            # Admin login
├── admin_dashboard.html        # Admin portal
├── teacher_login.html          # Teacher login
├── teacher_portal.html         # Teacher portal
├── student_login.html          # Student login
├── student_portal.html         # Student portal
├── features.html               # Features page
├── about.html                  # About page
└── README.md                   # Documentation
```

## 🔧 Technical Architecture

### **Frontend Technologies**
- **HTML5**: Semantic markup
- **CSS3**: Tailwind CSS framework with custom styles
- **JavaScript (ES6+)**: Modern JavaScript with classes and modules
- **Font Awesome**: Icon library
- **Inter Font**: Typography

### **Database System**
- **Local Storage**: Browser-based persistent storage
- **JSON Data**: Structured data storage
- **Real-time Sync**: Cross-tab data synchronization
- **Session Management**: User authentication and sessions

### **Key Components**

#### **1. Database System (`js/database.js`)**
```javascript
class LocalDatabase {
    // Initialize with default data
    // CRUD operations for all entities
    // User management functions
    // Data validation and error handling
}
```

#### **2. Authentication System (`js/auth.js`)**
```javascript
class AuthManager {
    // Login/logout functionality
    // Session management
    // Page protection
    // User role validation
}
```

#### **3. Portal Management (`js/portals.js`)**
```javascript
class PortalManager {
    // Navigation handling
    // Dynamic content loading
    // Real-time data updates
    // UI state management
}
```

## 🔐 Authentication

### **Default Credentials**

#### **Admin**
- Username: `siddhant_MD`
- Password: `Bhavani@Dazzlo`

#### **Teachers**
- Username: `sarah_teacher`
- Password: `teacher123`
- Username: `michael_teacher`
- Password: `teacher123`

#### **Students**
- Username: `alex_student`
- Password: `student123`
- Username: `priya_student`
- Password: `student123`

## 📊 Data Structure

### **Users**
```javascript
{
    id: "T001",
    name: "Dr. Sarah Johnson",
    email: "sarah.johnson@institute.com",
    phone: "+91 98765 43210",
    subjects: ["Mathematics", "Physics"],
    username: "sarah_teacher",
    password: "teacher123"
}
```

### **Timetables**
```javascript
{
    id: "TT001",
    teacherId: "T001",
    day: "Monday",
    time: "09:00-10:00",
    subject: "Mathematics",
    room: "Room 101"
}
```

### **Exams**
```javascript
{
    id: "E001",
    title: "Mid-Term Mathematics",
    subject: "Mathematics",
    date: "2025-02-15",
    time: "10:00-12:00",
    duration: "2 hours",
    totalMarks: 100
}
```

## 🚀 Getting Started

### **1. Setup**
1. Clone or download the project files
2. Ensure all files are in the same directory
3. Open `index.html` in a modern web browser

### **2. First Time Setup**
- The system automatically initializes with sample data
- Default users are created for testing
- Local storage is automatically populated

### **3. Usage**
1. **Admin Setup**: Login as admin to add teachers and students
2. **Teacher Access**: Teachers can manage their classes and students
3. **Student Access**: Students can view their schedules and progress

## 🔄 Data Flow

### **Real-time Synchronization**
- All portals use the same local storage keys
- Changes in one portal reflect immediately in others
- Browser storage events handle cross-tab updates
- Session management ensures secure access

### **Data Persistence**
- All data is stored in browser's localStorage
- Data persists between browser sessions
- Automatic backup and recovery mechanisms
- Data validation and error handling

## 🎨 UI/UX Features

### **Responsive Design**
- Mobile-first approach
- Tablet and desktop optimized
- Touch-friendly interfaces
- Adaptive layouts

### **Modern Interface**
- Clean, professional design
- Smooth animations and transitions
- Intuitive navigation
- Consistent color scheme

### **Accessibility**
- Semantic HTML structure
- Keyboard navigation support
- Screen reader friendly
- High contrast ratios

## 🔧 Customization

### **Styling**
- Modify `css/styles.css` for visual changes
- Tailwind CSS classes for rapid styling
- Custom CSS variables for theming
- Responsive breakpoints

### **Functionality**
- Extend `js/database.js` for new data types
- Add new features in `js/portals.js`
- Customize authentication in `js/auth.js`
- Enhance utilities in `js/main.js`

## 🛠️ Development

### **Adding New Features**
1. **Data Layer**: Add new data types to `database.js`
2. **UI Layer**: Create HTML templates and CSS styles
3. **Logic Layer**: Implement functionality in `portals.js`
4. **Integration**: Connect all layers and test thoroughly

### **Best Practices**
- Follow existing code structure
- Use consistent naming conventions
- Implement proper error handling
- Test across different browsers
- Maintain responsive design

## 📱 Browser Support

- **Chrome**: 80+
- **Firefox**: 75+
- **Safari**: 13+
- **Edge**: 80+

## 🔒 Security Features

- **Session Management**: Secure user sessions
- **Role-based Access**: Portal-specific permissions
- **Input Validation**: Form validation and sanitization
- **Data Integrity**: Consistent data structure validation

## 📈 Performance

- **Optimized Loading**: Minimal initial load time
- **Efficient Storage**: Optimized local storage usage
- **Smooth Interactions**: Responsive UI updates
- **Memory Management**: Proper cleanup and garbage collection

## 🤝 Contributing

1. Follow the existing code structure
2. Test thoroughly before submitting
3. Maintain responsive design
4. Update documentation as needed
5. Ensure cross-browser compatibility

## 📄 License

This project is developed by Dazzlo Enterprises.
© 2025 DazzloCore X. All Rights Reserved.

## 📞 Support

For support and inquiries:
- Email: contact@dazzlocorex.com
- Location: Solapur, Maharashtra, India

---

**DazzloCore X** - Empowering educational institutes with modern technology solutions. 