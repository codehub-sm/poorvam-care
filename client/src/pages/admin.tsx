import { useState, useEffect } from "react";
import { useQuery, useMutation, useQueryClient } from "@tanstack/react-query";
import { apiRequest } from "@/lib/queryClient";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogTrigger } from "@/components/ui/dialog";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Textarea } from "@/components/ui/textarea";
import { Calendar, Mail, Phone, User, MessageSquare, Users, Clock, X, FileText, Plus, Edit, Trash2, RefreshCw, Eye, Bell, Search } from "lucide-react";
import { CalendarView } from "@/components/calendar-view";
import { AppointmentModal } from "@/components/appointment-modal";
import { PatientDetails } from "@/components/patient-details";

interface ContactSubmission {
  id: number;
  firstName: string;
  lastName: string;
  email: string;
  phone: string;
  childName: string | null;
  childAge: string | null;
  serviceType: string | null;
  message: string | null;
  consent: boolean;
  createdAt: string;
}

interface Patient {
  id: number;
  firstName: string;
  lastName: string;
  email: string | null;
  phone: string | null;
  status: string;
  primaryTherapistId: number | null;
  createdAt: string;
}

interface Appointment {
  id: number;
  patientId: number;
  therapistId: number;
  scheduledAt: string;
  duration: number;
  serviceType: string | null;
  status: string;
  notes: string | null;
}

interface Summary {
  totalPatients: number;
  activePatients: number;
  inactivePatients: number;
  totalTherapists: number;
  totalAppointments: number;
  todayAppointments: number;
  scheduledAppointments: number;
  completedAppointments: number;
  cancelledAppointments: number;
}

export default function AdminPage() {
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  
  // Check if user is already authenticated on component mount
  useEffect(() => {
    const token = localStorage.getItem('authToken');
    if (token) {
      // Verify token validity by making a request to an authenticated endpoint
      const verifyToken = async () => {
        try {
          const response = await apiRequest("GET", "/api/admin/summary");
          const data = await response.json();
          if (data.success) {
            setIsAuthenticated(true);
          } else {
            // If token is invalid, remove it
            localStorage.removeItem('authToken');
          }
        } catch (error) {
          console.error("Token verification failed:", error);
          localStorage.removeItem('authToken');
        }
      };
      
      verifyToken();
    }
  }, []);
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [activeTab, setActiveTab] = useState<"contacts" | "patients" | "appointments" | "summary">("summary");
  
  // Edit states
  const [editingAppointment, setEditingAppointment] = useState<Appointment | null>(null);
  const [editingPatient, setEditingPatient] = useState<Patient | null>(null);
  const [isEditDialogOpen, setIsEditDialogOpen] = useState(false);
  const [editType, setEditType] = useState<"appointment" | "patient">("appointment");
  
  // Add appointment states
  const [isAddAppointmentOpen, setIsAddAppointmentOpen] = useState(false);
  const [newAppointment, setNewAppointment] = useState({
    patientId: "",
    therapistId: "",
    serviceTypeId: "",
    scheduledAt: "",
    duration: 45,
    notes: "",
    isRecurring: false,
    recurringPattern: {
      frequency: "weekly",
      interval: 1,
      daysOfWeek: [] as number[],
      endDate: "",
      maxOccurrences: 12
    }
  });

  // Add new item states
  const [isAddServiceOpen, setIsAddServiceOpen] = useState(false);
  const [isAddTherapistOpen, setIsAddTherapistOpen] = useState(false);
  const [isAddPatientOpen, setIsAddPatientOpen] = useState(false);
  const [isImportOpen, setIsImportOpen] = useState(false);

  // Calendar and appointment modal states
  const [selectedAppointment, setSelectedAppointment] = useState<any>(null);
  const [isAppointmentModalOpen, setIsAppointmentModalOpen] = useState(false);
  const [selectedPatient, setSelectedPatient] = useState<Patient | null>(null);
  const [isPatientDetailsOpen, setIsPatientDetailsOpen] = useState(false);
  const [calendarView, setCalendarView] = useState<"day" | "week" | "month">("month");
  
  // Filter states
  const [timeFilter, setTimeFilter] = useState({
    from: "09:00",
    to: "19:00",
    breakStart: "13:00",
    breakEnd: "13:00"
  });
  const [selectedDoctors, setSelectedDoctors] = useState<number[]>([]);

  const [newService, setNewService] = useState({
    name: "",
    description: "",
    defaultDuration: 45,
    color: "#3B82F6",
    isActive: true
  });

  const [newTherapist, setNewTherapist] = useState({
    email: "",
    password: "therapist123",
    firstName: "",
    lastName: "",
    phone: "",
    role: "therapist"
  });

  const [newPatient, setNewPatient] = useState({
    firstName: "",
    lastName: "",
    email: "",
    phone: "",
    dateOfBirth: "",
    parentId: "",
    primaryTherapistId: "",
    status: "active",
    diagnosis: "",
    notes: ""
  });
  
  const queryClient = useQueryClient();

  const { data: submissions, isLoading: contactsLoading, refetch: refetchContacts } = useQuery({
    queryKey: ["admin-contacts"],
    queryFn: async () => {
      const response = await apiRequest("GET", "/api/admin/contacts");
      return response.json();
    },
    enabled: isAuthenticated,
  });

  const { data: patients, isLoading: patientsLoading, refetch: refetchPatients } = useQuery({
    queryKey: ["admin-patients"],
    queryFn: async () => {
      const response = await apiRequest("GET", "/api/admin/patients");
      return response.json();
    },
    enabled: isAuthenticated,
  });

  const { data: appointments, isLoading: appointmentsLoading, refetch: refetchAppointments } = useQuery({
    queryKey: ["admin-appointments"],
    queryFn: async () => {
      const response = await apiRequest("GET", "/api/appointments");
      return response.json();
    },
    enabled: isAuthenticated,
  });

  const { data: summary, isLoading: summaryLoading, refetch: refetchSummary } = useQuery({
    queryKey: ["admin-summary"],
    queryFn: async () => {
      const response = await apiRequest("GET", "/api/admin/summary");
      return response.json();
    },
    enabled: isAuthenticated,
  });

  // Fetch data for appointment creation
  const { data: allPatients, isLoading: allPatientsLoading } = useQuery({
    queryKey: ["patients"],
    queryFn: async () => {
      const response = await apiRequest("GET", "/api/admin/patients");
      return response.json();
    },
    enabled: isAuthenticated,
  });

  const { data: therapists } = useQuery({
    queryKey: ["therapists"],
    queryFn: async () => {
      const response = await apiRequest("GET", "/api/admin/users?role=therapist");
      return response.json();
    },
    enabled: isAuthenticated,
  });

  // Fetch all users for mapping names
  const { data: allUsers } = useQuery({
    queryKey: ["all-users"],
    queryFn: async () => {
      const response = await apiRequest("GET", "/api/users");
      return response.json();
    },
    enabled: isAuthenticated,
  });

  const { data: serviceTypes } = useQuery({
    queryKey: ["service-types"],
    queryFn: async () => {
      const response = await apiRequest("GET", "/api/service-types");
      return response.json();
    },
    enabled: isAuthenticated,
  });

  // Mutations
  const updateAppointmentMutation = useMutation({
    mutationFn: async ({ id, data }: { id: number; data: any }) => {
      const response = await apiRequest("PUT", `/api/appointments/${id}`, data);
      return response.json();
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["admin-appointments"] });
      setIsEditDialogOpen(false);
      setEditingAppointment(null);
    },
  });

  const deleteAppointmentMutation = useMutation({
    mutationFn: async (id: number) => {
      const response = await apiRequest("DELETE", `/api/appointments/${id}`);
      return response.json();
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["admin-appointments"] });
    },
  });

  const updatePatientMutation = useMutation({
    mutationFn: async ({ id, data }: { id: number; data: any }) => {
      const response = await apiRequest("PUT", `/api/patients/${id}`, data);
      return response.json();
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["admin-patients"] });
      queryClient.invalidateQueries({ queryKey: ["patients"] });
      setIsEditDialogOpen(false);
      setEditingPatient(null);
    },
    onError: (error) => {
      console.error("Failed to update patient:", error);
      alert("Failed to update patient: " + error);
    }
  });

  const createAppointmentMutation = useMutation({
    mutationFn: async (data: any) => {
      const response = await apiRequest("POST", "/api/appointments", data);
      return response.json();
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["admin-appointments"] });
      setIsAddAppointmentOpen(false);
      setNewAppointment({
        patientId: "",
        therapistId: "",
        serviceTypeId: "",
        scheduledAt: "",
        duration: 45,
        notes: "",
        isRecurring: false,
        recurringPattern: {
          frequency: "weekly",
          interval: 1,
          daysOfWeek: [],
          endDate: "",
          maxOccurrences: 12
        }
      });
    },
  });

  const createServiceMutation = useMutation({
    mutationFn: async (data: any) => {
      const response = await apiRequest("POST", "/api/service-types", data);
      return response.json();
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["service-types"] });
      setIsAddServiceOpen(false);
      setNewService({
        name: "",
        description: "",
        defaultDuration: 45,
        color: "#3B82F6",
        isActive: true
      });
    },
    onError: (error) => {
      console.error("Failed to create service type:", error);
      alert("Failed to create service type: " + error);
    }
  });

  const createTherapistMutation = useMutation({
    mutationFn: async (data: any) => {
      const response = await apiRequest("POST", "/api/auth/register", data);
      return response.json();
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["therapists"] });
      setIsAddTherapistOpen(false);
      setNewTherapist({
        email: "",
        password: "therapist123",
        firstName: "",
        lastName: "",
        phone: "",
        role: "therapist"
      });
    },
  });

  const createPatientMutation = useMutation({
    mutationFn: async (data: any) => {
      const response = await apiRequest("POST", "/api/patients", data);
      return response.json();
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["admin-patients"] });
      queryClient.invalidateQueries({ queryKey: ["patients"] });
      setIsAddPatientOpen(false);
      setNewPatient({
        firstName: "",
        lastName: "",
        email: "",
        phone: "",
        dateOfBirth: "",
        parentId: "",
        primaryTherapistId: "",
        status: "active",
        diagnosis: "",
        notes: ""
      });
    },
    onError: (error) => {
      console.error("Failed to create patient:", error);
      alert("Failed to create patient: " + error);
    }
  });

  const handleLogin = async (e: React.FormEvent) => {
    e.preventDefault();
    try {
      const response = await apiRequest("POST", "/api/auth/login", {
        email,
        password,
        role: "admin"
      });
      const data = await response.json();
      if (data.success) {
        // Store the token in localStorage
        localStorage.setItem('authToken', data.token);
        setIsAuthenticated(true);
        console.log("Login successful!");
      } else {
        alert("Login failed: " + (data.error || "Invalid credentials"));
        console.error("Login failed:", data.error);
      }
    } catch (error) {
      alert("Login error. Please try again.");
      console.error("Login failed:", error);
    }
  };

  const formatDate = (dateString: string) => {
    return new Date(dateString).toLocaleString();
  };

  const formatTime = (dateString: string) => {
    return new Date(dateString).toLocaleTimeString();
  };

  // Handler functions
  const handleEditAppointment = (appointment: Appointment) => {
    setEditingAppointment(appointment);
    setEditType("appointment");
    setIsEditDialogOpen(true);
  };

  const handleEditPatient = (patient: Patient) => {
    setEditingPatient(patient);
    setEditType("patient");
    setIsEditDialogOpen(true);
  };

  const handleCancelAppointment = (id: number) => {
    if (confirm("Are you sure you want to cancel this appointment?")) {
      deleteAppointmentMutation.mutate(id);
    }
  };

  const handleUpdateAppointment = (data: any) => {
    if (editingAppointment) {
      updateAppointmentMutation.mutate({ id: editingAppointment.id, data });
    }
  };

  const handleUpdatePatient = (data: any) => {
    if (editingPatient) {
      // Validate required fields
      if (!data.firstName || !data.lastName) {
        alert("First name and last name are required");
        return;
      }
      
      // Convert string IDs to numbers where needed
      const patientData = {
        ...data,
        parentId: data.parentId ? Number(data.parentId) : null,
        primaryTherapistId: data.primaryTherapistId ? Number(data.primaryTherapistId) : null,
        dateOfBirth: data.dateOfBirth ? new Date(data.dateOfBirth).toISOString() : null
      };
      
      updatePatientMutation.mutate({ id: editingPatient.id, data: patientData });
    }
  };

  const handleCreateAppointment = () => {
    const appointmentData = {
      patientId: Number(newAppointment.patientId),
      therapistId: Number(newAppointment.therapistId),
      serviceTypeId: Number(newAppointment.serviceTypeId),
      scheduledAt: newAppointment.scheduledAt,
      duration: newAppointment.duration,
      notes: newAppointment.notes,
      status: "scheduled",
      isRecurring: newAppointment.isRecurring,
      ...(newAppointment.isRecurring && {
        recurringPattern: {
          frequency: newAppointment.recurringPattern.frequency,
          interval: newAppointment.recurringPattern.interval,
          daysOfWeek: newAppointment.recurringPattern.daysOfWeek,
          endDate: newAppointment.recurringPattern.endDate || undefined,
          maxOccurrences: newAppointment.recurringPattern.maxOccurrences
        }
      })
    };
    createAppointmentMutation.mutate(appointmentData);
  };

  const handleCreateService = () => {
    // Validate required fields
    if (!newService.name || !newService.defaultDuration) {
      alert("Service name and default duration are required");
      return;
    }
    
    // Ensure defaultDuration is a number
    const serviceData = {
      ...newService,
      defaultDuration: Number(newService.defaultDuration)
    };
    
    createServiceMutation.mutate(serviceData);
  };

  const handleCreateTherapist = () => {
    createTherapistMutation.mutate(newTherapist);
  };

  const handleCreatePatient = () => {
    // Validate required fields
    if (!newPatient.firstName || !newPatient.lastName) {
      alert("First name and last name are required");
      return;
    }
    
    // Convert string IDs to numbers where needed
    const patientData = {
      ...newPatient,
      parentId: newPatient.parentId ? Number(newPatient.parentId) : null,
      primaryTherapistId: newPatient.primaryTherapistId ? Number(newPatient.primaryTherapistId) : null,
      dateOfBirth: newPatient.dateOfBirth ? new Date(newPatient.dateOfBirth).toISOString() : null
    };
    
    createPatientMutation.mutate(patientData);
  };

  const handleDaySelection = (day: number) => {
    const currentDays = newAppointment.recurringPattern.daysOfWeek;
    const updatedDays = currentDays.includes(day)
      ? currentDays.filter(d => d !== day)
      : [...currentDays, day];
    
    setNewAppointment({
      ...newAppointment,
      recurringPattern: {
        ...newAppointment.recurringPattern,
        daysOfWeek: updatedDays
      }
    });
  };

  // Calendar and appointment modal handlers
  const handleAppointmentClick = (appointment: any) => {
    setSelectedAppointment(appointment);
    setIsAppointmentModalOpen(true);
  };

  const handleMarkVisit = async (id: number, multiplePatients = false, patientIds = []) => {
    try {
      const payload = multiplePatients ? { multiplePatients, patientIds } : {};
      const response = await apiRequest('PUT', `/api/appointments/${id}/visit`, payload);
      const data = await response.json();
      
      if (data.success) {
        // Refresh appointments
        refetchAppointments();
        refetchSummary(); // Also refresh summary stats
        setIsAppointmentModalOpen(false);
      } else {
        console.error('Failed to mark appointment as visited:', data.error);
        alert('Failed to mark appointment as visited: ' + (data.error || 'Unknown error'));
      }
    } catch (error) {
      console.error('Error marking appointment as visited:', error);
      alert('Error marking appointment as visited. Please try again.');
    }
  };

  const handleCancelAppointmentModal = async (id: number) => {
    try {
      const response = await apiRequest('PUT', `/api/appointments/${id}/cancel`);
      const data = await response.json();
      
      if (data.success) {
        // Refresh appointments
        refetchAppointments();
        refetchSummary(); // Also refresh summary stats
        setIsAppointmentModalOpen(false);
      } else {
        console.error('Failed to cancel appointment:', data.error);
        alert('Failed to cancel appointment: ' + (data.error || 'Unknown error'));
      }
    } catch (error) {
      console.error('Error cancelling appointment:', error);
      alert('Error cancelling appointment. Please try again.');
    }
  };

  const handleRescheduleAppointment = (id: number) => {
    // TODO: Implement reschedule functionality with date picker
    console.log('Reschedule appointment:', id);
    setIsAppointmentModalOpen(false);
  };

  const handleDeleteAppointment = async (id: number) => {
    if (window.confirm('Are you sure you want to delete this appointment?')) {
      try {
        const response = await apiRequest('DELETE', `/api/appointments/${id}`);
        const data = await response.json();
        
        if (data.success) {
          // Refresh appointments
          refetchAppointments();
          refetchSummary(); // Also refresh summary stats
          setIsAppointmentModalOpen(false);
        } else {
          console.error('Failed to delete appointment:', data.error);
          alert('Failed to delete appointment: ' + (data.error || 'Unknown error'));
        }
      } catch (error) {
        console.error('Error deleting appointment:', error);
        alert('Error deleting appointment. Please try again.');
      }
    }
  };

  const handleViewPatient = (patientId: number) => {
    // Find the patient by ID
    const patient = allPatients?.patients?.find((p: any) => p.id === patientId);
    if (patient) {
      setSelectedPatient(patient);
      setIsPatientDetailsOpen(true);
      setIsAppointmentModalOpen(false);
    } else {
      console.error('Patient not found:', patientId);
      alert('Patient not found');
    }
  };

  const [isRecordPaymentOpen, setIsRecordPaymentOpen] = useState(false);
  const [appointmentForPayment, setAppointmentForPayment] = useState<number | null>(null);
  const [paymentDetails, setPaymentDetails] = useState({
    amount: '',
    method: 'cash',
    notes: '',
    date: new Date().toISOString().split('T')[0]
  });
  const [isProcessingPayment, setIsProcessingPayment] = useState(false);

  const handleRecordPayment = (id: number) => {
    // Find the appointment
    const appointment = appointments?.appointments?.find((a: any) => a.id === id);
    if (appointment) {
      setAppointmentForPayment(id);
      setIsRecordPaymentOpen(true);
      setIsAppointmentModalOpen(false);
    }
  };
  
  const handleSavePayment = async () => {
    if (!appointmentForPayment || !paymentDetails.amount) {
      alert('Please enter a payment amount');
      return;
    }
    
    setIsProcessingPayment(true);
    
    try {
      const response = await apiRequest('POST', '/api/payments', {
        appointmentId: appointmentForPayment,
        amount: Number(paymentDetails.amount),
        method: paymentDetails.method,
        notes: paymentDetails.notes,
        paymentDate: paymentDetails.date
      });
      
      const data = await response.json();
      if (data.success) {
        // Reset form and close dialog
        setPaymentDetails({
          amount: '',
          method: 'cash',
          notes: '',
          date: new Date().toISOString().split('T')[0]
        });
        setIsRecordPaymentOpen(false);
        setAppointmentForPayment(null);
        
        // Refresh appointments to update status
        refetchAppointments();
        
        alert('Payment recorded successfully');
      } else {
        console.error('Failed to record payment:', data.error);
        alert('Failed to record payment. Please try again.');
      }
    } catch (error) {
      console.error('Error recording payment:', error);
      alert('Error recording payment. Please try again.');
    } finally {
      setIsProcessingPayment(false);
    }
  };

  const [isEditColorOpen, setIsEditColorOpen] = useState(false);
  const [selectedColor, setSelectedColor] = useState("#3B82F6");
  const [appointmentForColor, setAppointmentForColor] = useState<number | null>(null);
  
  const handleEditColor = (id: number) => {
    // Find the appointment to get its current color
    const appointment = appointments?.appointments?.find((a: any) => a.id === id);
    if (appointment) {
      // Find the service type to get the color
      const serviceType = serviceTypes?.serviceTypes?.find((s: any) => s.id === appointment.serviceTypeId || s.name === appointment.serviceType);
      if (serviceType && serviceType.color) {
        setSelectedColor(serviceType.color);
      }
    }
    
    setAppointmentForColor(id);
    setIsEditColorOpen(true);
    setIsAppointmentModalOpen(false);
  };
  
  const handleSaveColor = async () => {
    if (!appointmentForColor) return;
    
    try {
      const response = await apiRequest("PUT", `/api/appointments/${appointmentForColor}/color`, {
        color: selectedColor
      });
      
      const data = await response.json();
      if (data.success) {
        // Refresh appointments
        refetchAppointments();
        setIsEditColorOpen(false);
        setAppointmentForColor(null);
      } else {
        console.error("Failed to update appointment color:", data.error);
        alert("Failed to update color. Please try again.");
      }
    } catch (error) {
      console.error("Error updating appointment color:", error);
      alert("Error updating color. Please try again.");
    }
  };

  const handleCall = (phone: string) => {
    window.open(`tel:${phone}`, '_blank');
  };

  const handleApplyFilter = () => {
    // TODO: Implement filter functionality
    console.log('Apply filter:', timeFilter, selectedDoctors);
    // This would filter appointments based on time and selected doctors
    // For now, just log the filter values
    // In a real implementation, this would update the appointments query with filters
  };

  const [showCancelled, setShowCancelled] = useState(false);

  // Filter appointments based on selected criteria
  const filteredAppointments = appointments?.appointments?.filter((appointment: Appointment) => {
    try {
      // Filter by cancelled status
      if (showCancelled && appointment.status !== 'cancelled') {
        return false;
      }
      if (!showCancelled && appointment.status === 'cancelled') {
        return false;
      }
      
      // Filter by selected doctors
      if (selectedDoctors.length > 0 && !selectedDoctors.includes(appointment.therapistId)) {
        return false;
      }
      
      // Filter by time
      try {
        const appointmentTime = new Date(appointment.scheduledAt);
        const appointmentHour = appointmentTime.getHours();
        const appointmentMinute = appointmentTime.getMinutes();
        const appointmentTimeMinutes = appointmentHour * 60 + appointmentMinute;
        
        const [fromHour, fromMinute] = timeFilter.from.split(':').map(Number);
        const [toHour, toMinute] = timeFilter.to.split(':').map(Number);
        const fromTimeMinutes = fromHour * 60 + fromMinute;
        const toTimeMinutes = toHour * 60 + toMinute;
        
        if (appointmentTimeMinutes < fromTimeMinutes || appointmentTimeMinutes > toTimeMinutes) {
          return false;
        }
      } catch (error) {
        console.error("Error filtering appointment by time:", error, appointment);
        // If we can't parse the date, don't filter it out
      }
      
      return true;
    } catch (error) {
      console.error("Error filtering appointment:", error, appointment);
      return false;
    }
  }) || [];

  const handleViewCancelled = () => {
    setShowCancelled(!showCancelled);
  };

  const handleRefreshAppointments = () => {
    refetchAppointments();
  };

  const handleDoctorSelection = (doctorId: number) => {
    setSelectedDoctors(prev => 
      prev.includes(doctorId) 
        ? prev.filter(id => id !== doctorId)
        : [...prev, doctorId]
    );
  };

  if (!isAuthenticated) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-gray-50 to-blue-50 flex items-center justify-center p-4">
        <Card className="w-full max-w-md">
          <CardHeader>
            <CardTitle className="text-center">Admin Login</CardTitle>
          </CardHeader>
          <CardContent>
            <form onSubmit={handleLogin} className="space-y-4">
              <div>
                <label className="block text-sm font-medium mb-2">Email</label>
                <input
                  type="email"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  className="w-full p-3 border rounded-lg"
                  required
                />
              </div>
              <div>
                <label className="block text-sm font-medium mb-2">Password</label>
                <input
                  type="password"
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  className="w-full p-3 border rounded-lg"
                  required
                />
              </div>
              <Button type="submit" className="w-full">
                Login
              </Button>
            </form>
          </CardContent>
        </Card>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-50 to-blue-50 p-4">
      <div className="max-w-7xl mx-auto">
        <div className="flex justify-between items-center mb-8">
          <h1 className="text-3xl font-bold text-gray-800">Poorvam Care Admin Dashboard</h1>
          <div className="flex gap-2">
            <Button onClick={() => refetchSummary()}>Refresh</Button>
            <Button variant="outline" onClick={() => {
              localStorage.removeItem('authToken');
              setIsAuthenticated(false);
            }}>Logout</Button>
          </div>
        </div>

        {/* Navigation Tabs */}
        <div className="flex space-x-1 mb-6 bg-white rounded-lg p-1 shadow-sm">
          <Button
            variant={activeTab === "summary" ? "default" : "ghost"}
            onClick={() => setActiveTab("summary")}
            className="flex-1"
          >
            Summary
          </Button>
          <Button
            variant={activeTab === "patients" ? "default" : "ghost"}
            onClick={() => setActiveTab("patients")}
            className="flex-1"
          >
            Patients
          </Button>
          <Button
            variant={activeTab === "appointments" ? "default" : "ghost"}
            onClick={() => setActiveTab("appointments")}
            className="flex-1"
          >
            Appointments
          </Button>
          <Button
            variant={activeTab === "contacts" ? "default" : "ghost"}
            onClick={() => setActiveTab("contacts")}
            className="flex-1"
          >
            Contact Forms
          </Button>
        </div>

        {/* Summary Dashboard */}
        {activeTab === "summary" && (
          <div className="space-y-6">
            {summaryLoading ? (
              <div className="text-center py-8">Loading summary...</div>
            ) : summary?.success ? (
              <>
                <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
                  <Card>
                    <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                      <CardTitle className="text-sm font-medium">Total Patients</CardTitle>
                      <Users className="h-4 w-4 text-muted-foreground" />
                    </CardHeader>
                    <CardContent>
                      <div className="text-2xl font-bold">{summary.summary.totalPatients}</div>
                      <p className="text-xs text-muted-foreground">
                        {summary.summary.activePatients} active, {summary.summary.inactivePatients} inactive
                      </p>
                    </CardContent>
                  </Card>

                  <Card>
                    <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                      <CardTitle className="text-sm font-medium">Today's Appointments</CardTitle>
                      <Calendar className="h-4 w-4 text-muted-foreground" />
                    </CardHeader>
                    <CardContent>
                      <div className="text-2xl font-bold">{summary.summary.todayAppointments}</div>
                      <p className="text-xs text-muted-foreground">
                        {summary.summary.thisWeekAppointments} this week
                      </p>
                    </CardContent>
                  </Card>

                  <Card>
                    <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                      <CardTitle className="text-sm font-medium">Appointment Status</CardTitle>
                      <Clock className="h-4 w-4 text-muted-foreground" />
                    </CardHeader>
                    <CardContent>
                      <div className="text-2xl font-bold">{summary.summary.scheduledAppointments}</div>
                      <p className="text-xs text-muted-foreground">
                        {summary.summary.completedAppointments} completed, {summary.summary.cancelledAppointments} cancelled
                      </p>
                    </CardContent>
                  </Card>

                  <Card>
                    <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                      <CardTitle className="text-sm font-medium">Team</CardTitle>
                      <Users className="h-4 w-4 text-muted-foreground" />
                    </CardHeader>
                    <CardContent>
                      <div className="text-2xl font-bold">{summary.summary.totalTherapists}</div>
                      <p className="text-xs text-muted-foreground">
                        {summary.summary.totalServiceTypes} service types
                      </p>
                    </CardContent>
                  </Card>
                </div>
                
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mt-4">
                  <Card>
                    <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                      <CardTitle className="text-sm font-medium">Recent Activity</CardTitle>
                      <Bell className="h-4 w-4 text-muted-foreground" />
                    </CardHeader>
                    <CardContent>
                      <div className="space-y-2">
                        <div className="flex justify-between items-center">
                          <span className="text-sm">Total Sessions</span>
                          <Badge variant="outline">{summary.summary.totalSessions}</Badge>
                        </div>
                        <div className="flex justify-between items-center">
                          <span className="text-sm">Upcoming Appointments</span>
                          <Badge variant="outline">{summary.summary.upcomingAppointments}</Badge>
                        </div>
                        <div className="flex justify-between items-center">
                          <span className="text-sm">Recent Contacts</span>
                          <Badge variant="outline">{summary.summary.recentContacts}</Badge>
                        </div>
                      </div>
                    </CardContent>
                  </Card>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  <Card>
                    <CardHeader>
                      <CardTitle className="flex items-center gap-2">
                        <Users className="w-5 h-5" />
                        Employees
                      </CardTitle>
                    </CardHeader>
                    <CardContent>
                      <p className="text-gray-500">Manage therapists and staff members</p>
                      <div className="flex gap-2 mt-4">
                        <Button variant="outline" onClick={() => setIsAddTherapistOpen(true)}>
                          Add Therapist
                        </Button>
                        <Button variant="outline">
                          View Employees
                        </Button>
                      </div>
                    </CardContent>
                  </Card>

                  <Card>
                    <CardHeader>
                      <CardTitle className="flex items-center gap-2">
                        <User className="w-5 h-5" />
                        Patients
                      </CardTitle>
                    </CardHeader>
                    <CardContent>
                      <p className="text-gray-500">Manage patient records and information</p>
                      <Button className="mt-4" variant="outline" onClick={() => setActiveTab("patients")}>
                        View Patients
                      </Button>
                    </CardContent>
                  </Card>
                  
                  <Card>
                    <CardHeader>
                      <CardTitle className="flex items-center gap-2">
                        <FileText className="w-5 h-5" />
                        Service Types
                      </CardTitle>
                    </CardHeader>
                    <CardContent>
                      <p className="text-gray-500">Manage therapy services and durations</p>
                      <div className="mt-4 space-y-2">
                        <div className="grid grid-cols-3 gap-2 font-medium text-sm">
                          <div>Name</div>
                          <div>Duration</div>
                          <div>Color</div>
                        </div>
                        {serviceTypes?.serviceTypes?.map((service: any) => (
                          <div key={service.id} className="grid grid-cols-3 gap-2 text-sm items-center">
                            <div>{service.name}</div>
                            <div>{service.defaultDuration} min</div>
                            <div className="flex items-center gap-2">
                              <div 
                                className="w-4 h-4 rounded-full" 
                                style={{ backgroundColor: service.color || '#3B82F6' }}
                              ></div>
                              <span>{service.color}</span>
                            </div>
                          </div>
                        ))}
                        <Button variant="outline" onClick={() => setIsAddServiceOpen(true)}>
                          Add Service Type
                        </Button>
                      </div>
                    </CardContent>
                  </Card>
                </div>
              </>
            ) : (
              <Card>
                <CardContent className="text-center py-8">
                  <p className="text-red-500">Failed to load summary.</p>
                </CardContent>
              </Card>
            )}
          </div>
        )}

        {/* Patients Tab */}
        {activeTab === "patients" && (
          <div className="space-y-6">
            <div className="flex justify-between items-center">
              <h2 className="text-2xl font-bold">Patient Management</h2>
              <div className="flex gap-2">
                <Button 
                  variant="outline"
                  onClick={() => setIsAddPatientOpen(true)}
                >
                  Add Patient
                </Button>
                <Button 
                  variant="outline"
                  onClick={() => setIsImportOpen(true)}
                >
                  Import Data
                </Button>
              </div>
            </div>

            {patientsLoading ? (
              <div className="text-center py-8">Loading patients...</div>
            ) : patients?.success ? (
              <div className="grid gap-4">
                {patients.patients.length === 0 ? (
                  <Card>
                    <CardContent className="text-center py-8">
                      <p className="text-gray-500">No patients found.</p>
                    </CardContent>
                  </Card>
                ) : (
                  patients.patients.map((patient: Patient) => {
                    // Find the therapist name
                    const therapist = allUsers?.users?.find((u: any) => u.id === patient.primaryTherapistId);
                    const therapistName = therapist ? `${therapist.firstName} ${therapist.lastName}` : 'None';
                    
                    return (
                      <Card key={patient.id} className="hover:shadow-lg transition-shadow">
                        <CardHeader>
                          <div className="flex justify-between items-start">
                            <div>
                              <CardTitle className="flex items-center gap-2">
                                <User className="w-5 h-5" />
                                {patient.firstName} {patient.lastName}
                              </CardTitle>
                              <div className="flex items-center gap-4 mt-2 text-sm text-gray-600">
                                {patient.email && (
                                  <div className="flex items-center gap-1">
                                    <Mail className="w-4 h-4" />
                                    {patient.email}
                                  </div>
                                )}
                                {patient.phone && (
                                  <div className="flex items-center gap-1">
                                    <Phone className="w-4 h-4" />
                                    {patient.phone}
                                  </div>
                                )}
                                <div className="flex items-center gap-1">
                                  <Calendar className="w-4 h-4" />
                                  {formatDate(patient.createdAt)}
                                </div>
                              </div>
                            </div>
                            <Badge variant={patient.status === "active" ? "default" : "secondary"}>
                              {patient.status}
                            </Badge>
                          </div>
                        </CardHeader>
                        <CardContent>
                          <div className="mb-3">
                            <p className="text-sm text-gray-600">
                              <strong>Primary Therapist:</strong> {therapistName}
                            </p>
                          </div>
                          <div className="flex gap-2">
                            <Button 
                              variant="outline" 
                              size="sm" 
                              onClick={() => {
                                setSelectedPatient(patient);
                                setIsPatientDetailsOpen(true);
                              }}
                            >
                              View Profile
                            </Button>
                            <Button 
                              variant="outline" 
                              size="sm"
                              onClick={() => handleEditPatient(patient)}
                            >
                              Edit
                            </Button>
                          </div>
                        </CardContent>
                      </Card>
                    );
                  })
                )}
              </div>
            ) : (
              <Card>
                <CardContent className="text-center py-8">
                  <p className="text-red-500">Failed to load patients.</p>
                </CardContent>
              </Card>
            )}
          </div>
        )}

        {/* Appointments Tab */}
        {activeTab === "appointments" && (
          <div className="grid grid-cols-1 lg:grid-cols-4 gap-6">
            {/* Main Calendar View */}
            <div className="lg:col-span-3">
              {appointmentsLoading ? (
                <div className="text-center py-8">Loading appointments...</div>
              ) : appointments?.success ? (
                                                 <CalendarView
                  appointments={filteredAppointments.map((appointment: Appointment) => {
                    try {
                      // Map patient name
                      const patient = allPatients?.patients?.find((p: any) => p.id === appointment.patientId);
                      const patientName = patient ? `${patient.firstName} ${patient.lastName}` : `Patient ${appointment.patientId}`;
                      
                      // Map therapist name
                      const therapist = allUsers?.users?.find((u: any) => u.id === appointment.therapistId && u.role === 'therapist');
                      const therapistName = therapist ? `${therapist.firstName} ${therapist.lastName}` : `Therapist ${appointment.therapistId}`;
                      
                      // Map service type
                      const service = serviceTypes?.serviceTypes?.find((s: any) => s.id === appointment.serviceTypeId);
                      const serviceTypeName = service ? service.name : (appointment.serviceType || 'General');
                      
                      return {
                        id: appointment.id,
                        patientName,
                        therapistName,
                        scheduledAt: appointment.scheduledAt,
                        duration: appointment.duration,
                        status: appointment.status,
                        serviceType: serviceTypeName,
                        patientPhone: patient?.phone
                      };
                    } catch (error) {
                      console.error("Error mapping appointment data:", error, appointment);
                      return {
                        id: appointment.id || 0,
                        patientName: "Error",
                        therapistName: "Error",
                        scheduledAt: new Date().toISOString(),
                        duration: 30,
                        status: "error",
                        serviceType: "Error"
                      };
                    }
                  })}
                  onAppointmentClick={handleAppointmentClick}
                  onAddAppointment={() => setIsAddAppointmentOpen(true)}
                  view={calendarView}
                  onViewChange={setCalendarView}
                />
              ) : (
                <Card>
                  <CardContent className="text-center py-8">
                    <p className="text-red-500">Failed to load appointments.</p>
                  </CardContent>
                </Card>
              )}
            </div>

            {/* Sidebar */}
            <div className="lg:col-span-1 space-y-4">
              {/* Add Appointment */}
              <Card>
                <CardContent className="p-4">
                  <div className="flex gap-2">
                    <Button className="flex-1" onClick={() => setIsAddAppointmentOpen(true)}>
                      <Plus className="h-4 w-4 mr-2" />
                      Add Appointment
                    </Button>
                    <Button variant="outline" size="sm" onClick={handleRefreshAppointments}>
                      <RefreshCw className="h-4 w-4" />
                    </Button>
                  </div>
                </CardContent>
              </Card>

              {/* Time Filters */}
              <Card>
                <CardHeader>
                  <CardTitle className="text-sm">Time Filters</CardTitle>
                </CardHeader>
                <CardContent className="space-y-3">
                  <div>
                    <Label htmlFor="from">From</Label>
                    <Input
                      id="from"
                      type="time"
                      value={timeFilter.from}
                      onChange={(e) => setTimeFilter(prev => ({ ...prev, from: e.target.value }))}
                    />
                  </div>
                  <div>
                    <Label htmlFor="to">To</Label>
                    <Input
                      id="to"
                      type="time"
                      value={timeFilter.to}
                      onChange={(e) => setTimeFilter(prev => ({ ...prev, to: e.target.value }))}
                    />
                  </div>
                  <div>
                    <Label htmlFor="breakStart">Break Start</Label>
                    <Input
                      id="breakStart"
                      type="time"
                      value={timeFilter.breakStart}
                      onChange={(e) => setTimeFilter(prev => ({ ...prev, breakStart: e.target.value }))}
                    />
                  </div>
                  <div>
                    <Label htmlFor="breakEnd">Break End</Label>
                    <Input
                      id="breakEnd"
                      type="time"
                      value={timeFilter.breakEnd}
                      onChange={(e) => setTimeFilter(prev => ({ ...prev, breakEnd: e.target.value }))}
                    />
                  </div>
                  <Button className="w-full" onClick={handleApplyFilter}>
                    Apply Filter
                  </Button>
                </CardContent>
              </Card>

              {/* View Cancelled */}
              <Card>
                <CardContent className="p-4">
                  <Button 
                    variant={showCancelled ? "default" : "outline"} 
                    className="w-full" 
                    onClick={handleViewCancelled}
                  >
                    {showCancelled ? "Hide Cancelled" : "View Cancelled"}
                    {!showCancelled && summary?.summary?.cancelledAppointments > 0 && (
                      <Badge className="ml-2 bg-red-500" variant="secondary">
                        {summary.summary.cancelledAppointments}
                      </Badge>
                    )}
                  </Button>
                </CardContent>
              </Card>

              {/* Doctors */}
              <Card>
                <CardHeader>
                  <CardTitle className="text-sm">Doctors</CardTitle>
                </CardHeader>
                <CardContent className="space-y-2">
                  <div className="relative">
                    <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-gray-400" />
                    <Input placeholder="Search doctors..." className="pl-10" />
                  </div>
                  <div className="space-y-1">
                    {therapists?.users?.filter((user: any) => user.role === 'therapist').map((therapist: any) => (
                      <Button
                        key={therapist.id}
                        variant={selectedDoctors.includes(therapist.id) ? "default" : "outline"}
                        className="w-full justify-start text-sm"
                        onClick={() => handleDoctorSelection(therapist.id)}
                      >
                        {therapist.firstName} {therapist.lastName}
                      </Button>
                    )) || []}
                  </div>
                </CardContent>
              </Card>
            </div>
          </div>
        )}

        {/* Contact Forms Tab */}
        {activeTab === "contacts" && (
          <div className="space-y-6">
            <div className="flex justify-between items-center">
              <h2 className="text-2xl font-bold">Contact Form Submissions</h2>
              <Button onClick={() => refetchContacts()}>Refresh</Button>
            </div>

            {contactsLoading ? (
              <div className="text-center py-8">Loading submissions...</div>
            ) : submissions?.success ? (
              <div className="grid gap-6">
                {submissions.submissions.length === 0 ? (
                  <Card>
                    <CardContent className="text-center py-8">
                      <p className="text-gray-500">No contact submissions yet.</p>
                    </CardContent>
                  </Card>
                ) : (
                  submissions.submissions.map((submission: ContactSubmission) => (
                    <Card key={submission.id} className="hover:shadow-lg transition-shadow">
                      <CardHeader>
                        <div className="flex justify-between items-start">
                          <div>
                            <CardTitle className="flex items-center gap-2">
                              <User className="w-5 h-5" />
                              {submission.firstName} {submission.lastName}
                            </CardTitle>
                            <div className="flex items-center gap-4 mt-2 text-sm text-gray-600">
                              <div className="flex items-center gap-1">
                                <Mail className="w-4 h-4" />
                                {submission.email}
                              </div>
                              <div className="flex items-center gap-1">
                                <Phone className="w-4 h-4" />
                                {submission.phone}
                              </div>
                              <div className="flex items-center gap-1">
                                <Calendar className="w-4 h-4" />
                                {formatDate(submission.createdAt)}
                              </div>
                            </div>
                          </div>
                          {submission.serviceType && (
                            <Badge variant="secondary">{submission.serviceType}</Badge>
                          )}
                        </div>
                      </CardHeader>
                      <CardContent>
                        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                          {(submission.childName || submission.childAge) && (
                            <div>
                              <h4 className="font-semibold mb-2">Child Information</h4>
                              <p className="text-sm text-gray-600">
                                {submission.childName && `Name: ${submission.childName}`}
                                {submission.childName && submission.childAge && " • "}
                                {submission.childAge && `Age: ${submission.childAge}`}
                              </p>
                            </div>
                          )}
                          {submission.message && (
                            <div>
                              <h4 className="font-semibold mb-2 flex items-center gap-1">
                                <MessageSquare className="w-4 h-4" />
                                Message
                              </h4>
                              <p className="text-sm text-gray-600">{submission.message}</p>
                            </div>
                          )}
                        </div>
                      </CardContent>
                    </Card>
                  ))
                )}
              </div>
            ) : (
              <Card>
                <CardContent className="text-center py-8">
                  <p className="text-red-500">Failed to load submissions.</p>
                </CardContent>
              </Card>
            )}
          </div>
        )}

        {/* Edit Dialog */}
        <Dialog open={isEditDialogOpen} onOpenChange={setIsEditDialogOpen}>
          <DialogContent className="max-w-md">
            <DialogHeader>
              <DialogTitle>
                Edit {editType === "appointment" ? "Appointment" : "Patient"}
              </DialogTitle>
            </DialogHeader>
            
            {editType === "appointment" && editingAppointment && (
              <div className="space-y-4">
                <div>
                  <Label htmlFor="notes">Notes</Label>
                  <Textarea
                    id="notes"
                    defaultValue={editingAppointment.notes || ""}
                    onChange={(e) => setEditingAppointment({
                      ...editingAppointment,
                      notes: e.target.value
                    })}
                  />
                </div>
                <div>
                  <Label htmlFor="status">Status</Label>
                  <Select
                    defaultValue={editingAppointment.status}
                    onValueChange={(value) => setEditingAppointment({
                      ...editingAppointment,
                      status: value
                    })}
                  >
                    <SelectTrigger>
                      <SelectValue />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="scheduled">Scheduled</SelectItem>
                      <SelectItem value="visited">Visited</SelectItem>
                      <SelectItem value="cancelled">Cancelled</SelectItem>
                    </SelectContent>
                  </Select>
                </div>
                <div className="flex gap-2">
                  <Button 
                    onClick={() => handleUpdateAppointment({
                      notes: editingAppointment.notes,
                      status: editingAppointment.status
                    })}
                    disabled={updateAppointmentMutation.isPending}
                  >
                    {updateAppointmentMutation.isPending ? "Updating..." : "Update"}
                  </Button>
                  <Button variant="outline" onClick={() => setIsEditDialogOpen(false)}>
                    Cancel
                  </Button>
                </div>
              </div>
            )}

            {editType === "patient" && editingPatient && (
              <div className="space-y-4">
                <div>
                  <Label htmlFor="firstName">First Name</Label>
                  <Input
                    id="firstName"
                    defaultValue={editingPatient.firstName}
                    onChange={(e) => setEditingPatient({
                      ...editingPatient,
                      firstName: e.target.value
                    })}
                  />
                </div>
                <div>
                  <Label htmlFor="lastName">Last Name</Label>
                  <Input
                    id="lastName"
                    defaultValue={editingPatient.lastName}
                    onChange={(e) => setEditingPatient({
                      ...editingPatient,
                      lastName: e.target.value
                    })}
                  />
                </div>
                <div>
                  <Label htmlFor="email">Email</Label>
                  <Input
                    id="email"
                    type="email"
                    defaultValue={editingPatient.email || ""}
                    onChange={(e) => setEditingPatient({
                      ...editingPatient,
                      email: e.target.value
                    })}
                  />
                </div>
                <div>
                  <Label htmlFor="phone">Phone</Label>
                  <Input
                    id="phone"
                    defaultValue={editingPatient.phone || ""}
                    onChange={(e) => setEditingPatient({
                      ...editingPatient,
                      phone: e.target.value
                    })}
                  />
                </div>
                <div>
                  <Label htmlFor="status">Status</Label>
                  <Select
                    defaultValue={editingPatient.status}
                    onValueChange={(value) => setEditingPatient({
                      ...editingPatient,
                      status: value
                    })}
                  >
                    <SelectTrigger>
                      <SelectValue />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="active">Active</SelectItem>
                      <SelectItem value="inactive">Inactive</SelectItem>
                    </SelectContent>
                  </Select>
                </div>
                <div className="flex gap-2">
                  <Button 
                    onClick={() => handleUpdatePatient({
                      firstName: editingPatient.firstName,
                      lastName: editingPatient.lastName,
                      email: editingPatient.email,
                      phone: editingPatient.phone,
                      status: editingPatient.status
                    })}
                    disabled={updatePatientMutation.isPending}
                  >
                    {updatePatientMutation.isPending ? "Updating..." : "Update"}
                  </Button>
                  <Button variant="outline" onClick={() => setIsEditDialogOpen(false)}>
                    Cancel
                  </Button>
                </div>
              </div>
            )}
          </DialogContent>
        </Dialog>

        {/* Add Appointment Dialog */}
        <Dialog open={isAddAppointmentOpen} onOpenChange={setIsAddAppointmentOpen}>
          <DialogContent className="max-w-2xl">
            <DialogHeader>
              <DialogTitle>Add New Appointment</DialogTitle>
            </DialogHeader>
            
            <div className="space-y-4">
              <div className="grid grid-cols-2 gap-4">
                <div>
                  <Label htmlFor="patient">Patient</Label>
                  <Select
                    value={newAppointment.patientId}
                    onValueChange={(value) => setNewAppointment({
                      ...newAppointment,
                      patientId: value
                    })}
                  >
                    <SelectTrigger>
                      <SelectValue placeholder="Select patient" />
                    </SelectTrigger>
                    <SelectContent>
                      {allPatients?.patients?.map((patient: any) => (
                        <SelectItem key={patient.id} value={patient.id.toString()}>
                          {patient.firstName} {patient.lastName}
                        </SelectItem>
                      ))}
                    </SelectContent>
                  </Select>
                </div>

                <div>
                  <Label htmlFor="therapist">Therapist</Label>
                  <Select
                    value={newAppointment.therapistId}
                    onValueChange={(value) => setNewAppointment({
                      ...newAppointment,
                      therapistId: value
                    })}
                  >
                    <SelectTrigger>
                      <SelectValue placeholder="Select therapist" />
                    </SelectTrigger>
                    <SelectContent>
                      {therapists?.users?.map((therapist: any) => (
                        <SelectItem key={therapist.id} value={therapist.id.toString()}>
                          {therapist.firstName} {therapist.lastName}
                        </SelectItem>
                      ))}
                    </SelectContent>
                  </Select>
                </div>
              </div>

              <div className="grid grid-cols-2 gap-4">
                <div>
                  <Label htmlFor="serviceType">Service Type</Label>
                  <Select
                    value={newAppointment.serviceTypeId}
                    onValueChange={(value) => setNewAppointment({
                      ...newAppointment,
                      serviceTypeId: value
                    })}
                  >
                    <SelectTrigger>
                      <SelectValue placeholder="Select service" />
                    </SelectTrigger>
                    <SelectContent>
                      {serviceTypes?.serviceTypes?.map((service: any) => (
                        <SelectItem key={service.id} value={service.id.toString()}>
                          {service.name}
                        </SelectItem>
                      ))}
                    </SelectContent>
                  </Select>
                </div>

                <div>
                  <Label htmlFor="duration">Duration (minutes)</Label>
                  <Input
                    id="duration"
                    type="number"
                    value={newAppointment.duration}
                    onChange={(e) => setNewAppointment({
                      ...newAppointment,
                      duration: Number(e.target.value)
                    })}
                  />
                </div>
              </div>

              <div className="grid grid-cols-2 gap-4">
                <div>
                  <Label htmlFor="scheduledAt">Date & Time</Label>
                  <Input
                    id="scheduledAt"
                    type="datetime-local"
                    value={newAppointment.scheduledAt}
                    onChange={(e) => setNewAppointment({
                      ...newAppointment,
                      scheduledAt: e.target.value
                    })}
                  />
                </div>

                <div className="flex items-center space-x-2">
                  <input
                    type="checkbox"
                    id="isRecurring"
                    checked={newAppointment.isRecurring}
                    onChange={(e) => setNewAppointment({
                      ...newAppointment,
                      isRecurring: e.target.checked
                    })}
                  />
                  <Label htmlFor="isRecurring">Recurring Appointment</Label>
                </div>
              </div>

              {newAppointment.isRecurring && (
                <div className="space-y-4 border p-4 rounded-lg">
                  <h4 className="font-semibold">Recurring Pattern</h4>
                  <div className="grid grid-cols-3 gap-4">
                    <div>
                      <Label htmlFor="frequency">Frequency</Label>
                      <Select
                        value={newAppointment.recurringPattern.frequency}
                        onValueChange={(value) => setNewAppointment({
                          ...newAppointment,
                          recurringPattern: {
                            ...newAppointment.recurringPattern,
                            frequency: value
                          }
                        })}
                      >
                        <SelectTrigger>
                          <SelectValue />
                        </SelectTrigger>
                        <SelectContent>
                          <SelectItem value="daily">Daily</SelectItem>
                          <SelectItem value="weekly">Weekly</SelectItem>
                          <SelectItem value="monthly">Monthly</SelectItem>
                        </SelectContent>
                      </Select>
                    </div>

                    <div>
                      <Label htmlFor="interval">Interval</Label>
                      <Input
                        id="interval"
                        type="number"
                        value={newAppointment.recurringPattern.interval}
                        onChange={(e) => setNewAppointment({
                          ...newAppointment,
                          recurringPattern: {
                            ...newAppointment.recurringPattern,
                            interval: Number(e.target.value)
                          }
                        })}
                      />
                    </div>

                    <div>
                      <Label htmlFor="maxOccurrences">Max Occurrences</Label>
                      <Input
                        id="maxOccurrences"
                        type="number"
                        value={newAppointment.recurringPattern.maxOccurrences}
                        onChange={(e) => setNewAppointment({
                          ...newAppointment,
                          recurringPattern: {
                            ...newAppointment.recurringPattern,
                            maxOccurrences: Number(e.target.value)
                          }
                        })}
                      />
                    </div>
                  </div>

                  {/* Day Selection for Weekly Recurring */}
                  {newAppointment.recurringPattern.frequency === "weekly" && (
                    <div>
                      <Label>Days of Week</Label>
                      <div className="grid grid-cols-7 gap-2 mt-2">
                        {[
                          { day: 0, name: "Sun" },
                          { day: 1, name: "Mon" },
                          { day: 2, name: "Tue" },
                          { day: 3, name: "Wed" },
                          { day: 4, name: "Thu" },
                          { day: 5, name: "Fri" },
                          { day: 6, name: "Sat" }
                        ].map(({ day, name }) => (
                          <Button
                            key={day}
                            type="button"
                            variant={newAppointment.recurringPattern.daysOfWeek.includes(day) ? "default" : "outline"}
                            size="sm"
                            onClick={() => handleDaySelection(day)}
                            className="w-full"
                          >
                            {name}
                          </Button>
                        ))}
                      </div>
                    </div>
                  )}
                </div>
              )}

              <div>
                <Label htmlFor="notes">Notes</Label>
                <Textarea
                  id="notes"
                  value={newAppointment.notes}
                  onChange={(e) => setNewAppointment({
                    ...newAppointment,
                    notes: e.target.value
                  })}
                  placeholder="Add any notes about this appointment..."
                />
              </div>

              <div className="flex gap-2">
                <Button 
                  onClick={handleCreateAppointment}
                  disabled={createAppointmentMutation.isPending}
                >
                  {createAppointmentMutation.isPending ? "Creating..." : "Create Appointment"}
                </Button>
                <Button variant="outline" onClick={() => setIsAddAppointmentOpen(false)}>
                  Cancel
                </Button>
              </div>
            </div>
          </DialogContent>
        </Dialog>

        {/* Add Service Dialog */}
        <Dialog open={isAddServiceOpen} onOpenChange={setIsAddServiceOpen}>
          <DialogContent className="max-w-md">
            <DialogHeader>
              <DialogTitle>Add New Service Type</DialogTitle>
            </DialogHeader>
            
            <div className="space-y-4">
              <div>
                <Label htmlFor="serviceName">Service Name</Label>
                <Input
                  id="serviceName"
                  value={newService.name}
                  onChange={(e) => setNewService({
                    ...newService,
                    name: e.target.value
                  })}
                  placeholder="e.g., Speech Therapy"
                />
              </div>

              <div>
                <Label htmlFor="serviceDescription">Description</Label>
                <Textarea
                  id="serviceDescription"
                  value={newService.description}
                  onChange={(e) => setNewService({
                    ...newService,
                    description: e.target.value
                  })}
                  placeholder="Describe the service..."
                />
              </div>

              <div>
                <Label htmlFor="serviceDuration">Default Duration (minutes)</Label>
                <Input
                  id="serviceDuration"
                  type="number"
                  value={newService.defaultDuration}
                  onChange={(e) => setNewService({
                    ...newService,
                    defaultDuration: Number(e.target.value)
                  })}
                />
              </div>

              <div>
                <Label htmlFor="serviceColor">Color</Label>
                <Input
                  id="serviceColor"
                  type="color"
                  value={newService.color}
                  onChange={(e) => setNewService({
                    ...newService,
                    color: e.target.value
                  })}
                />
              </div>

              <div className="flex gap-2">
                <Button 
                  onClick={handleCreateService}
                  disabled={createServiceMutation.isPending}
                >
                  {createServiceMutation.isPending ? "Creating..." : "Create Service"}
                </Button>
                <Button variant="outline" onClick={() => setIsAddServiceOpen(false)}>
                  Cancel
                </Button>
              </div>
            </div>
          </DialogContent>
        </Dialog>

        {/* Add Therapist Dialog */}
        <Dialog open={isAddTherapistOpen} onOpenChange={setIsAddTherapistOpen}>
          <DialogContent className="max-w-md">
            <DialogHeader>
              <DialogTitle>Add New Therapist</DialogTitle>
            </DialogHeader>
            
            <div className="space-y-4">
              <div className="grid grid-cols-2 gap-4">
                <div>
                  <Label htmlFor="therapistFirstName">First Name</Label>
                  <Input
                    id="therapistFirstName"
                    value={newTherapist.firstName}
                    onChange={(e) => setNewTherapist({
                      ...newTherapist,
                      firstName: e.target.value
                    })}
                  />
                </div>
                <div>
                  <Label htmlFor="therapistLastName">Last Name</Label>
                  <Input
                    id="therapistLastName"
                    value={newTherapist.lastName}
                    onChange={(e) => setNewTherapist({
                      ...newTherapist,
                      lastName: e.target.value
                    })}
                  />
                </div>
              </div>

              <div>
                <Label htmlFor="therapistEmail">Email</Label>
                <Input
                  id="therapistEmail"
                  type="email"
                  value={newTherapist.email}
                  onChange={(e) => setNewTherapist({
                    ...newTherapist,
                    email: e.target.value
                  })}
                />
              </div>

              <div>
                <Label htmlFor="therapistPhone">Phone</Label>
                <Input
                  id="therapistPhone"
                  value={newTherapist.phone}
                  onChange={(e) => setNewTherapist({
                    ...newTherapist,
                    phone: e.target.value
                  })}
                />
              </div>

              <div className="flex gap-2">
                <Button 
                  onClick={handleCreateTherapist}
                  disabled={createTherapistMutation.isPending}
                >
                  {createTherapistMutation.isPending ? "Creating..." : "Create Therapist"}
                </Button>
                <Button variant="outline" onClick={() => setIsAddTherapistOpen(false)}>
                  Cancel
                </Button>
              </div>
            </div>
          </DialogContent>
        </Dialog>

        {/* Add Patient Dialog */}
        <Dialog open={isAddPatientOpen} onOpenChange={setIsAddPatientOpen}>
          <DialogContent className="max-w-2xl">
            <DialogHeader>
              <DialogTitle>Add New Patient</DialogTitle>
            </DialogHeader>
            
            <div className="space-y-4">
              <div className="grid grid-cols-2 gap-4">
                <div>
                  <Label htmlFor="patientFirstName">First Name</Label>
                  <Input
                    id="patientFirstName"
                    value={newPatient.firstName}
                    onChange={(e) => setNewPatient({
                      ...newPatient,
                      firstName: e.target.value
                    })}
                  />
                </div>
                <div>
                  <Label htmlFor="patientLastName">Last Name</Label>
                  <Input
                    id="patientLastName"
                    value={newPatient.lastName}
                    onChange={(e) => setNewPatient({
                      ...newPatient,
                      lastName: e.target.value
                    })}
                  />
                </div>
              </div>

              <div className="grid grid-cols-2 gap-4">
                <div>
                  <Label htmlFor="patientEmail">Email</Label>
                  <Input
                    id="patientEmail"
                    type="email"
                    value={newPatient.email}
                    onChange={(e) => setNewPatient({
                      ...newPatient,
                      email: e.target.value
                    })}
                  />
                </div>
                <div>
                  <Label htmlFor="patientPhone">Phone</Label>
                  <Input
                    id="patientPhone"
                    value={newPatient.phone}
                    onChange={(e) => setNewPatient({
                      ...newPatient,
                      phone: e.target.value
                    })}
                  />
                </div>
              </div>

              <div className="grid grid-cols-2 gap-4">
                <div>
                  <Label htmlFor="patientDateOfBirth">Date of Birth</Label>
                  <Input
                    id="patientDateOfBirth"
                    type="date"
                    value={newPatient.dateOfBirth}
                    onChange={(e) => setNewPatient({
                      ...newPatient,
                      dateOfBirth: e.target.value
                    })}
                  />
                </div>
                <div>
                  <Label htmlFor="patientStatus">Status</Label>
                  <Select
                    value={newPatient.status}
                    onValueChange={(value) => setNewPatient({
                      ...newPatient,
                      status: value
                    })}
                  >
                    <SelectTrigger>
                      <SelectValue />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="active">Active</SelectItem>
                      <SelectItem value="inactive">Inactive</SelectItem>
                    </SelectContent>
                  </Select>
                </div>
              </div>

              <div>
                <Label htmlFor="patientDiagnosis">Diagnosis</Label>
                <Input
                  id="patientDiagnosis"
                  value={newPatient.diagnosis}
                  onChange={(e) => setNewPatient({
                    ...newPatient,
                    diagnosis: e.target.value
                  })}
                />
              </div>

              <div>
                <Label htmlFor="patientNotes">Notes</Label>
                <Textarea
                  id="patientNotes"
                  value={newPatient.notes}
                  onChange={(e) => setNewPatient({
                    ...newPatient,
                    notes: e.target.value
                  })}
                  placeholder="Add any notes about the patient..."
                />
              </div>

              <div className="flex gap-2">
                <Button 
                  onClick={handleCreatePatient}
                  disabled={createPatientMutation.isPending}
                >
                  {createPatientMutation.isPending ? "Creating..." : "Create Patient"}
                </Button>
                <Button variant="outline" onClick={() => setIsAddPatientOpen(false)}>
                  Cancel
                </Button>
              </div>
            </div>
          </DialogContent>
        </Dialog>

        {/* Import Data Dialog */}
        <Dialog open={isImportOpen} onOpenChange={setIsImportOpen}>
          <DialogContent className="max-w-md">
            <DialogHeader>
              <DialogTitle>Import Data</DialogTitle>
            </DialogHeader>
            
            <div className="space-y-4">
              <div>
                <Label htmlFor="importFile">Select CSV File</Label>
                <Input
                  id="importFile"
                  type="file"
                  accept=".csv"
                  onChange={(e) => {
                    const file = e.target.files?.[0];
                    if (file) {
                      // Handle file import logic here
                      console.log("File selected:", file.name);
                    }
                  }}
                />
              </div>

              <div>
                <Label>Import Options</Label>
                <div className="space-y-2 mt-2">
                  <div className="flex items-center space-x-2">
                    <input type="checkbox" id="importPatients" defaultChecked />
                    <Label htmlFor="importPatients">Import Patients</Label>
                  </div>
                  <div className="flex items-center space-x-2">
                    <input type="checkbox" id="importTherapists" defaultChecked />
                    <Label htmlFor="importTherapists">Import Therapists</Label>
                  </div>
                  <div className="flex items-center space-x-2">
                    <input type="checkbox" id="importServices" defaultChecked />
                    <Label htmlFor="importServices">Import Services</Label>
                  </div>
                </div>
              </div>

              <div className="flex gap-2">
                <Button variant="outline">
                  Download Template
                </Button>
                <Button variant="outline" onClick={() => setIsImportOpen(false)}>
                  Cancel
                </Button>
              </div>
            </div>
          </DialogContent>
        </Dialog>

        {/* Appointment Modal */}
        <AppointmentModal
          appointment={selectedAppointment}
          isOpen={isAppointmentModalOpen}
          onClose={() => setIsAppointmentModalOpen(false)}
          onMarkVisit={handleMarkVisit}
          onCancel={handleCancelAppointmentModal}
          onReschedule={handleRescheduleAppointment}
          onDelete={handleDeleteAppointment}
          onViewPatient={handleViewPatient}
          onRecordPayment={handleRecordPayment}
          onEditColor={handleEditColor}
          onCall={handleCall}
        />
        
        {/* Patient Details Modal */}
        <Dialog open={isPatientDetailsOpen} onOpenChange={setIsPatientDetailsOpen}>
          <DialogContent className="max-w-6xl">
            {selectedPatient && (
              <PatientDetails
                patient={selectedPatient}
                onEditPatient={handleEditPatient}
                onViewSchedule={() => {
                  setActiveTab("appointments");
                  setIsPatientDetailsOpen(false);
                }}
                onClose={() => setIsPatientDetailsOpen(false)}
              />
            )}
          </DialogContent>
        </Dialog>
        
        {/* Edit Color Dialog */}
        <Dialog open={isEditColorOpen} onOpenChange={setIsEditColorOpen}>
          <DialogContent className="max-w-md">
            <DialogHeader>
              <DialogTitle>Edit Appointment Color</DialogTitle>
            </DialogHeader>
            
            <div className="space-y-4">
              <div>
                <Label htmlFor="color">Select Color</Label>
                <div className="flex items-center gap-2 mt-2">
                  <input 
                    type="color" 
                    id="color" 
                    value={selectedColor} 
                    onChange={(e) => setSelectedColor(e.target.value)}
                    className="w-10 h-10 border-none cursor-pointer"
                  />
                  <Input 
                    value={selectedColor} 
                    onChange={(e) => setSelectedColor(e.target.value)}
                    className="flex-1"
                  />
                </div>
              </div>
              
              <div className="mt-4">
                <p className="text-sm text-gray-500 mb-2">Preset Colors</p>
                <div className="flex flex-wrap gap-2">
                  {["#3B82F6", "#10B981", "#F59E0B", "#EF4444", "#8B5CF6", "#EC4899", "#6B7280", "#000000"].map(color => (
                    <button
                      key={color}
                      className="w-8 h-8 rounded-full border border-gray-300 focus:outline-none focus:ring-2 focus:ring-blue-500"
                      style={{ backgroundColor: color }}
                      onClick={() => setSelectedColor(color)}
                      aria-label={`Select color ${color}`}
                    />
                  ))}
                </div>
              </div>
              
              <div className="flex gap-2 pt-4">
                <Button onClick={handleSaveColor}>
                  Save Color
                </Button>
                <Button variant="outline" onClick={() => setIsEditColorOpen(false)}>
                  Cancel
                </Button>
              </div>
            </div>
          </DialogContent>
        </Dialog>
        
        {/* Record Payment Dialog */}
        <Dialog open={isRecordPaymentOpen} onOpenChange={setIsRecordPaymentOpen}>
          <DialogContent className="max-w-md">
            <DialogHeader>
              <DialogTitle>Record New Payment</DialogTitle>
            </DialogHeader>
            
            <div className="space-y-4">
              <div>
                <Label htmlFor="amount">Payment Amount</Label>
                <div className="flex items-center">
                  <span className="bg-gray-100 px-3 py-2 border border-r-0 border-gray-300 rounded-l-md">₹</span>
                  <Input 
                    id="amount" 
                    type="number"
                    value={paymentDetails.amount} 
                    onChange={(e) => setPaymentDetails({
                      ...paymentDetails,
                      amount: e.target.value
                    })}
                    className="rounded-l-none"
                    placeholder="0.00"
                  />
                </div>
              </div>
              
              <div>
                <Label htmlFor="method">Payment Method</Label>
                <Select
                  value={paymentDetails.method}
                  onValueChange={(value) => setPaymentDetails({
                    ...paymentDetails,
                    method: value
                  })}
                >
                  <SelectTrigger>
                    <SelectValue />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="cash">Cash</SelectItem>
                    <SelectItem value="card">Card</SelectItem>
                    <SelectItem value="upi">UPI</SelectItem>
                    <SelectItem value="bank_transfer">Bank Transfer</SelectItem>
                    <SelectItem value="other">Other</SelectItem>
                  </SelectContent>
                </Select>
              </div>
              
              <div>
                <Label htmlFor="date">Payment Date</Label>
                <Input 
                  id="date" 
                  type="date"
                  value={paymentDetails.date} 
                  onChange={(e) => setPaymentDetails({
                    ...paymentDetails,
                    date: e.target.value
                  })}
                />
              </div>
              
              <div>
                <Label htmlFor="notes">Notes</Label>
                <Textarea 
                  id="notes" 
                  value={paymentDetails.notes} 
                  onChange={(e) => setPaymentDetails({
                    ...paymentDetails,
                    notes: e.target.value
                  })}
                  placeholder="Additional payment details..."
                />
              </div>
              
              <div className="flex gap-2 pt-4">
                <Button onClick={handleSavePayment} disabled={isProcessingPayment}>
                  {isProcessingPayment ? 'Processing...' : 'Record Payment'}
                </Button>
                <Button variant="outline" onClick={() => setIsRecordPaymentOpen(false)}>
                  Cancel
                </Button>
              </div>
            </div>
          </DialogContent>
        </Dialog>
      </div>
    </div>
  );
} 