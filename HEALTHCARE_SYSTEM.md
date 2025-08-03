# Poorvam Care Healthcare Management System

A comprehensive healthcare management system for Poorvam Care & Hearing Solutions, built with React, TypeScript, Express.js, and PostgreSQL.

## 🏗️ System Architecture

### Backend Stack
- **Runtime**: Node.js with Express.js
- **Language**: TypeScript with ES modules
- **Database**: PostgreSQL with Drizzle ORM
- **Authentication**: Role-based (admin, therapist, parent)
- **API**: RESTful endpoints with JSON responses

### Frontend Stack
- **Framework**: React with TypeScript
- **Build Tool**: Vite
- **UI Components**: Radix UI + shadcn/ui
- **Styling**: Tailwind CSS
- **State Management**: TanStack Query
- **Routing**: Wouter

## 🗄️ Database Schema

### Core Tables

#### Users
- **Roles**: `admin`, `therapist`, `parent`
- **Fields**: id, email, password, role, firstName, lastName, phone, createdAt

#### Patients
- **Fields**: id, firstName, lastName, email, phone, dateOfBirth, parentId, primaryTherapistId, status, diagnosis, notes, createdAt
- **Status**: `active`, `inactive`

#### Appointments
- **Fields**: id, patientId, therapistId, scheduledAt, duration, serviceType, status, isWalkIn, penalty, notes, createdAt
- **Status**: `scheduled`, `visited`, `cancelled`

#### Sessions
- **Fields**: id, appointmentId, therapistId, patientId, sessionDate, notes, progress, goals, createdAt

#### Goals
- **Fields**: id, patientId, title, description, status, targetDate, createdAt
- **Status**: `active`, `completed`, `archived`

#### Tasks
- **Fields**: id, patientId, assignedTo, title, description, goalId, status, dueDate, createdAt
- **Status**: `pending`, `completed`

## 🔐 Authentication & Authorization

### User Roles

#### Admin
- Full access to all patients, appointments, and system data
- Can manage therapists and staff
- View comprehensive reports and analytics
- Access to admin dashboard

#### Therapist
- View and manage assigned patients only
- Create and update sessions for their patients
- Set goals and tasks for patients
- View appointment schedule

#### Parent
- View their child's information and progress
- Access to appointment schedule
- View assigned tasks and goals

## 📊 API Endpoints

### Authentication
- `POST /api/auth/login` - User login
- `POST /api/auth/register` - User registration

### Patient Management
- `GET /api/admin/patients` - Get all patients (admin)
- `GET /api/therapist/patients?therapistId=X` - Get therapist's patients
- `POST /api/patients` - Create new patient
- `GET /api/patients/:id` - Get patient details
- `PUT /api/patients/:id` - Update patient

### Appointment Management
- `GET /api/appointments` - Get appointments (with filters)
- `POST /api/appointments` - Create appointment
- `PUT /api/appointments/:id` - Update appointment
- `DELETE /api/appointments/:id` - Cancel appointment

### Session Management
- `GET /api/sessions?patientId=X` - Get patient sessions
- `GET /api/sessions?therapistId=X` - Get therapist sessions
- `POST /api/sessions` - Create session
- `PUT /api/sessions/:id` - Update session

### Goal Management
- `GET /api/goals?patientId=X` - Get patient goals
- `POST /api/goals` - Create goal
- `PUT /api/goals/:id` - Update goal

### Task Management
- `GET /api/tasks?patientId=X` - Get patient tasks
- `GET /api/tasks?assignedTo=X` - Get assigned tasks
- `POST /api/tasks` - Create task
- `PUT /api/tasks/:id` - Update task

### Admin Dashboard
- `GET /api/admin/summary` - Dashboard summary statistics
- `GET /api/admin/contacts` - Contact form submissions

## 🎯 Key Features

### Admin Dashboard
- **Summary Statistics**: Total patients, appointments, therapists
- **Patient Management**: View, add, edit patient records
- **Appointment Management**: Schedule and manage appointments
- **Contact Forms**: Review contact form submissions
- **Employee Management**: Manage therapists and staff

### Patient Management
- **Patient Profiles**: Complete patient information
- **Status Tracking**: Active/inactive patient status
- **Therapist Assignment**: Link patients to primary therapists
- **Medical History**: Diagnosis and notes tracking

### Appointment Scheduling
- **Calendar Integration**: Date and time scheduling
- **Service Types**: Different therapy types (Speech, Occupational, etc.)
- **Status Tracking**: Scheduled, visited, cancelled
- **Duration Management**: Configurable appointment lengths

### Session Management
- **Progress Tracking**: Session notes and progress updates
- **Goal Integration**: Link sessions to patient goals
- **Therapist Notes**: Detailed session documentation

### Goal & Task Management
- **Patient Goals**: Set and track patient objectives
- **Task Assignment**: Assign tasks to therapists or patients
- **Progress Monitoring**: Track completion status
- **Due Date Management**: Set deadlines for tasks

## 🚀 Getting Started

### Prerequisites
- Node.js 18+
- PostgreSQL database
- npm or yarn

### Installation

1. **Clone the repository**
   ```bash
   git clone <repository-url>
   cd poorvam-care
   ```

2. **Install dependencies**
   ```bash
   npm install
   ```

3. **Set up environment variables**
   ```bash
   cp .env.example .env
   # Edit .env with your database URL and email settings
   ```

4. **Initialize sample data**
   ```bash
   npx tsx server/setup-admin.js
   ```

5. **Start development server**
   ```bash
   npm run dev
   ```

### Sample Login Credentials

After running the setup script, you can login with:

- **Admin**: ``admin@poorvam-care.com`` / `admin123`
- **Therapist 1**: `pooja.jaiswal@poorvam-care.com` / `therapist123`
- **Therapist 2**: `niranjana.devi@poorvam-care.com` / `therapist123`
- **Parent 1**: `parent1@example.com` / `parent123`
- **Parent 2**: `parent2@example.com` / `parent123`

## 📱 User Interfaces

### Admin Dashboard
- **Summary Tab**: Key metrics and statistics
- **Patients Tab**: Patient management interface
- **Appointments Tab**: Appointment scheduling and management
- **Contact Forms Tab**: Review contact submissions

### Features Based on Reference Images
- **Patient Management**: Similar to Symplify interface
- **Appointment Scheduling**: Calendar-based scheduling
- **Session Tracking**: Progress notes and goals
- **Task Management**: Assign and track tasks
- **Reporting**: Export data and generate reports

## 🔧 Development

### Database Migrations
```bash
npm run db:push
```

### Type Checking
```bash
npm run check
```

### Building for Production
```bash
npm run build
npm start
```

## 📈 Future Enhancements

### Planned Features
- **Real-time Notifications**: Email/SMS for appointments
- **Calendar Integration**: Google Calendar sync
- **Payment Processing**: Billing and invoicing
- **Advanced Reporting**: Analytics and insights
- **Mobile App**: React Native application
- **Video Consultations**: Telemedicine integration

### Subdomain Structure
- `main-domain.com` - Public website
- `admin.main-domain.com` - Admin dashboard
- `therapist.main-domain.com` - Therapist portal
- `parent.main-domain.com` - Parent portal

## 🤝 Contributing

1. Create a feature branch
2. Make your changes
3. Add tests if applicable
4. Submit a pull request

## 📄 License

MIT License - see LICENSE file for details

## 🆘 Support

For support and questions, contact the development team or create an issue in the repository. 