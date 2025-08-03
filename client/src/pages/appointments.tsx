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
import { Checkbox } from "@/components/ui/checkbox";
import { Calendar, Clock, Users, User, Plus, Edit, Trash2, Move, Repeat, CalendarDays } from "lucide-react";
import { format, addDays, startOfWeek, endOfWeek, eachDayOfInterval, isSameDay, parseISO } from "date-fns";

interface ServiceType {
  id: number;
  name: string;
  description: string;
  defaultDuration: number;
  color: string;
  isActive: boolean;
}

interface Patient {
  id: number;
  firstName: string;
  lastName: string;
  email: string | null;
  phone: string | null;
  status: string;
  primaryTherapistId: number | null;
}

interface Therapist {
  id: number;
  firstName: string;
  lastName: string;
  email: string;
  role: string;
}

interface Appointment {
  id: number;
  patientId: number;
  therapistId: number;
  serviceTypeId: number;
  scheduledAt: string;
  duration: number;
  status: string;
  isRecurring: boolean;
  recurringPatternId: number | null;
  parentAppointmentId: number | null;
  isWalkIn: boolean;
  penalty: boolean;
  notes: string | null;
}

interface AppointmentPatient {
  id: number;
  appointmentId: number;
  patientId: number;
  isPrimary: boolean;
}

export default function AppointmentsPage() {
  const [selectedDate, setSelectedDate] = useState(new Date());
  const [selectedTherapist, setSelectedTherapist] = useState<string>("all");
  const [isCreateDialogOpen, setIsCreateDialogOpen] = useState(false);
  const [isEditDialogOpen, setIsEditDialogOpen] = useState(false);
  const [editingAppointment, setEditingAppointment] = useState<Appointment | null>(null);
  const [draggedAppointment, setDraggedAppointment] = useState<Appointment | null>(null);
  const queryClient = useQueryClient();

  // Form state
  const [formData, setFormData] = useState({
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
    },
    multiplePatients: [] as number[]
  });

  // Fetch data
  const { data: appointments, isLoading: appointmentsLoading } = useQuery({
    queryKey: ["appointments", selectedDate, selectedTherapist],
    queryFn: async () => {
      const params = new URLSearchParams();
      if (selectedTherapist !== "all") {
        params.append("therapistId", selectedTherapist);
      }
      const response = await apiRequest("GET", `/api/appointments?${params}`);
      return response.json();
    },
  });

  const { data: serviceTypes } = useQuery({
    queryKey: ["service-types"],
    queryFn: async () => {
      const response = await apiRequest("GET", "/api/service-types");
      return response.json();
    },
  });

  const { data: patients } = useQuery({
    queryKey: ["patients"],
    queryFn: async () => {
      const response = await apiRequest("GET", "/api/admin/patients");
      return response.json();
    },
  });

  const { data: therapists } = useQuery({
    queryKey: ["therapists"],
    queryFn: async () => {
      const response = await apiRequest("GET", "/api/admin/patients"); // We'll get therapists from users
      return response.json();
    },
  });

  // Mutations
  const createAppointmentMutation = useMutation({
    mutationFn: async (data: any) => {
      const response = await apiRequest("POST", "/api/appointments", data);
      return response.json();
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["appointments"] });
      setIsCreateDialogOpen(false);
      setFormData({
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
        },
        multiplePatients: []
      });
    },
  });

  const updateAppointmentMutation = useMutation({
    mutationFn: async ({ id, data }: { id: number; data: any }) => {
      const response = await apiRequest("PUT", `/api/appointments/${id}`, data);
      return response.json();
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["appointments"] });
      setIsEditDialogOpen(false);
      setEditingAppointment(null);
    },
  });

  const moveAppointmentMutation = useMutation({
    mutationFn: async ({ id, newTherapistId, newScheduledAt }: { id: number; newTherapistId: number; newScheduledAt: Date }) => {
      const response = await apiRequest("PUT", `/api/appointments/${id}/move`, {
        newTherapistId,
        newScheduledAt
      });
      return response.json();
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["appointments"] });
      setDraggedAppointment(null);
    },
  });

  const deleteAppointmentMutation = useMutation({
    mutationFn: async (id: number) => {
      const response = await apiRequest("DELETE", `/api/appointments/${id}`);
      return response.json();
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["appointments"] });
    },
  });

  // Calendar helpers
  const weekDays = eachDayOfInterval({
    start: startOfWeek(selectedDate),
    end: endOfWeek(selectedDate)
  });

  const timeSlots = Array.from({ length: 12 }, (_, i) => {
    const hour = i + 9; // 9 AM to 8 PM
    return `${hour.toString().padStart(2, '0')}:00`;
  });

  const getAppointmentsForTimeSlot = (date: Date, time: string) => {
    if (!appointments?.success) return [];
    
    const dateTime = parseISO(`${format(date, 'yyyy-MM-dd')}T${time}`);
    const endTime = new Date(dateTime.getTime() + 60 * 60 * 1000); // 1 hour later
    
    return appointments.appointments.filter((appointment: Appointment) => {
      const appointmentTime = new Date(appointment.scheduledAt);
      return isSameDay(appointmentTime, date) && 
             appointmentTime >= dateTime && 
             appointmentTime < endTime;
    });
  };

  const getServiceTypeColor = (serviceTypeId: number) => {
    const serviceType = serviceTypes?.success?.serviceTypes?.find((st: ServiceType) => st.id === serviceTypeId);
    return serviceType?.color || "#6B7280";
  };

  const getServiceTypeName = (serviceTypeId: number) => {
    const serviceType = serviceTypes?.success?.serviceTypes?.find((st: ServiceType) => st.id === serviceTypeId);
    return serviceType?.name || "Unknown";
  };

  const getPatientName = (patientId: number) => {
    const patient = patients?.success?.patients?.find((p: Patient) => p.id === patientId);
    return patient ? `${patient.firstName} ${patient.lastName}` : "Unknown";
  };

  const getTherapistName = (therapistId: number) => {
    const therapist = therapists?.success?.therapists?.find((t: Therapist) => t.id === therapistId);
    return therapist ? `${therapist.firstName} ${therapist.lastName}` : "Unknown";
  };

  const handleCreateAppointment = () => {
    createAppointmentMutation.mutate({
      patientId: Number(formData.patientId),
      therapistId: Number(formData.therapistId),
      serviceTypeId: Number(formData.serviceTypeId),
      scheduledAt: formData.scheduledAt,
      duration: formData.duration,
      notes: formData.notes,
      isRecurring: formData.isRecurring,
      recurringPatternId: formData.isRecurring ? 1 : null, // Simplified for now
    });
  };

  const handleUpdateAppointment = () => {
    if (!editingAppointment) return;
    
    updateAppointmentMutation.mutate({
      id: editingAppointment.id,
      data: {
        patientId: Number(formData.patientId),
        therapistId: Number(formData.therapistId),
        serviceTypeId: Number(formData.serviceTypeId),
        scheduledAt: formData.scheduledAt,
        duration: formData.duration,
        notes: formData.notes,
      }
    });
  };

  const handleDragStart = (appointment: Appointment) => {
    setDraggedAppointment(appointment);
  };

  const handleDrop = (targetDate: Date, targetTime: string) => {
    if (!draggedAppointment) return;
    
    const newScheduledAt = parseISO(`${format(targetDate, 'yyyy-MM-dd')}T${targetTime}`);
    
    moveAppointmentMutation.mutate({
      id: draggedAppointment.id,
      newTherapistId: draggedAppointment.therapistId, // Keep same therapist for now
      newScheduledAt
    });
  };

  const handleDeleteAppointment = (id: number) => {
    if (confirm("Are you sure you want to delete this appointment?")) {
      deleteAppointmentMutation.mutate(id);
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-50 to-blue-50 p-4">
      <div className="max-w-7xl mx-auto">
        <div className="flex justify-between items-center mb-8">
          <h1 className="text-3xl font-bold text-gray-800">Appointment Scheduling</h1>
          <div className="flex gap-2">
            <Button onClick={() => setSelectedDate(new Date())}>Today</Button>
            <Button variant="outline" onClick={() => setSelectedDate(addDays(selectedDate, -7))}>
              Previous Week
            </Button>
            <Button variant="outline" onClick={() => setSelectedDate(addDays(selectedDate, 7))}>
              Next Week
            </Button>
            <Dialog open={isCreateDialogOpen} onOpenChange={setIsCreateDialogOpen}>
              <DialogTrigger asChild>
                <Button className="flex items-center gap-2">
                  <Plus className="w-4 h-4" />
                  New Appointment
                </Button>
              </DialogTrigger>
              <DialogContent className="max-w-md">
                <DialogHeader>
                  <DialogTitle>Create New Appointment</DialogTitle>
                </DialogHeader>
                <div className="space-y-4">
                  <div>
                    <Label>Patient</Label>
                    <Select value={formData.patientId} onValueChange={(value) => setFormData({...formData, patientId: value})}>
                      <SelectTrigger>
                        <SelectValue placeholder="Select patient" />
                      </SelectTrigger>
                      <SelectContent>
                        {patients?.success?.patients?.map((patient: Patient) => (
                          <SelectItem key={patient.id} value={patient.id.toString()}>
                            {patient.firstName} {patient.lastName}
                          </SelectItem>
                        ))}
                      </SelectContent>
                    </Select>
                  </div>
                  
                  <div>
                    <Label>Therapist</Label>
                    <Select value={formData.therapistId} onValueChange={(value) => setFormData({...formData, therapistId: value})}>
                      <SelectTrigger>
                        <SelectValue placeholder="Select therapist" />
                      </SelectTrigger>
                      <SelectContent>
                        {therapists?.success?.therapists?.filter((t: Therapist) => t.role === "therapist").map((therapist: Therapist) => (
                          <SelectItem key={therapist.id} value={therapist.id.toString()}>
                            {therapist.firstName} {therapist.lastName}
                          </SelectItem>
                        ))}
                      </SelectContent>
                    </Select>
                  </div>
                  
                  <div>
                    <Label>Service Type</Label>
                    <Select value={formData.serviceTypeId} onValueChange={(value) => setFormData({...formData, serviceTypeId: value})}>
                      <SelectTrigger>
                        <SelectValue placeholder="Select service" />
                      </SelectTrigger>
                      <SelectContent>
                        {serviceTypes?.success?.serviceTypes?.map((serviceType: ServiceType) => (
                          <SelectItem key={serviceType.id} value={serviceType.id.toString()}>
                            {serviceType.name}
                          </SelectItem>
                        ))}
                      </SelectContent>
                    </Select>
                  </div>
                  
                  <div>
                    <Label>Date & Time</Label>
                    <Input
                      type="datetime-local"
                      value={formData.scheduledAt}
                      onChange={(e) => setFormData({...formData, scheduledAt: e.target.value})}
                    />
                  </div>
                  
                  <div>
                    <Label>Duration (minutes)</Label>
                    <Input
                      type="number"
                      value={formData.duration}
                      onChange={(e) => setFormData({...formData, duration: Number(e.target.value)})}
                    />
                  </div>
                  
                  <div>
                    <Label>Notes</Label>
                    <Textarea
                      value={formData.notes}
                      onChange={(e) => setFormData({...formData, notes: e.target.value})}
                    />
                  </div>
                  
                  <div className="flex items-center space-x-2">
                    <Checkbox
                      id="recurring"
                      checked={formData.isRecurring}
                      onCheckedChange={(checked) => setFormData({...formData, isRecurring: checked as boolean})}
                    />
                    <Label htmlFor="recurring">Recurring Appointment</Label>
                  </div>
                  
                  <Button onClick={handleCreateAppointment} className="w-full">
                    Create Appointment
                  </Button>
                </div>
              </DialogContent>
            </Dialog>
          </div>
        </div>

        {/* Filters */}
        <div className="flex gap-4 mb-6">
          <Select value={selectedTherapist} onValueChange={setSelectedTherapist}>
            <SelectTrigger className="w-48">
              <SelectValue placeholder="All Therapists" />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="all">All Therapists</SelectItem>
              {therapists?.success?.therapists?.filter((t: Therapist) => t.role === "therapist").map((therapist: Therapist) => (
                <SelectItem key={therapist.id} value={therapist.id.toString()}>
                  {therapist.firstName} {therapist.lastName}
                </SelectItem>
              ))}
            </SelectContent>
          </Select>
        </div>

        {/* Calendar Grid */}
        <div className="bg-white rounded-lg shadow-lg overflow-hidden">
          {/* Header */}
          <div className="grid grid-cols-8 border-b">
            <div className="p-4 font-semibold">Time</div>
            {weekDays.map((day) => (
              <div key={day.toISOString()} className="p-4 text-center font-semibold border-l">
                <div className="text-sm text-gray-600">{format(day, 'EEE')}</div>
                <div className="text-lg">{format(day, 'd')}</div>
              </div>
            ))}
          </div>

          {/* Time slots */}
          {timeSlots.map((time) => (
            <div key={time} className="grid grid-cols-8 border-b">
              <div className="p-4 text-sm text-gray-600 border-r">
                {time}
              </div>
              {weekDays.map((day) => {
                const appointments = getAppointmentsForTimeSlot(day, time);
                return (
                  <div
                    key={`${day.toISOString()}-${time}`}
                    className="p-2 border-l min-h-[80px] relative"
                    onDragOver={(e) => e.preventDefault()}
                    onDrop={() => handleDrop(day, time)}
                  >
                    {appointments.map((appointment: Appointment) => (
                      <Card
                        key={appointment.id}
                        className="mb-2 cursor-move"
                        style={{ borderLeftColor: getServiceTypeColor(appointment.serviceTypeId), borderLeftWidth: '4px' }}
                        draggable
                        onDragStart={() => handleDragStart(appointment)}
                      >
                        <CardContent className="p-2">
                          <div className="text-xs font-semibold">
                            {getServiceTypeName(appointment.serviceTypeId)}
                          </div>
                          <div className="text-xs text-gray-600">
                            {getPatientName(appointment.patientId)}
                          </div>
                          <div className="text-xs text-gray-500">
                            {getTherapistName(appointment.therapistId)}
                          </div>
                          <div className="flex gap-1 mt-1">
                            <Badge variant="outline" size="sm">
                              {appointment.duration}min
                            </Badge>
                            {appointment.isRecurring && (
                              <Badge variant="secondary" size="sm">
                                <Repeat className="w-3 h-3 mr-1" />
                                Recurring
                              </Badge>
                            )}
                          </div>
                          <div className="flex gap-1 mt-1">
                            <Button
                              size="sm"
                              variant="ghost"
                              onClick={() => {
                                setEditingAppointment(appointment);
                                setFormData({
                                  patientId: appointment.patientId.toString(),
                                  therapistId: appointment.therapistId.toString(),
                                  serviceTypeId: appointment.serviceTypeId.toString(),
                                  scheduledAt: appointment.scheduledAt.slice(0, 16),
                                  duration: appointment.duration,
                                  notes: appointment.notes || "",
                                  isRecurring: appointment.isRecurring,
                                  recurringPattern: {
                                    frequency: "weekly",
                                    interval: 1,
                                    daysOfWeek: [],
                                    endDate: "",
                                    maxOccurrences: 12
                                  },
                                  multiplePatients: []
                                });
                                setIsEditDialogOpen(true);
                              }}
                            >
                              <Edit className="w-3 h-3" />
                            </Button>
                            <Button
                              size="sm"
                              variant="ghost"
                              onClick={() => handleDeleteAppointment(appointment.id)}
                            >
                              <Trash2 className="w-3 h-3" />
                            </Button>
                          </div>
                        </CardContent>
                      </Card>
                    ))}
                  </div>
                );
              })}
            </div>
          ))}
        </div>

        {/* Edit Dialog */}
        <Dialog open={isEditDialogOpen} onOpenChange={setIsEditDialogOpen}>
          <DialogContent className="max-w-md">
            <DialogHeader>
              <DialogTitle>Edit Appointment</DialogTitle>
            </DialogHeader>
            <div className="space-y-4">
              <div>
                <Label>Patient</Label>
                <Select value={formData.patientId} onValueChange={(value) => setFormData({...formData, patientId: value})}>
                  <SelectTrigger>
                    <SelectValue placeholder="Select patient" />
                  </SelectTrigger>
                  <SelectContent>
                    {patients?.success?.patients?.map((patient: Patient) => (
                      <SelectItem key={patient.id} value={patient.id.toString()}>
                        {patient.firstName} {patient.lastName}
                      </SelectItem>
                    ))}
                  </SelectContent>
                </Select>
              </div>
              
              <div>
                <Label>Therapist</Label>
                <Select value={formData.therapistId} onValueChange={(value) => setFormData({...formData, therapistId: value})}>
                  <SelectTrigger>
                    <SelectValue placeholder="Select therapist" />
                  </SelectTrigger>
                  <SelectContent>
                    {therapists?.success?.therapists?.filter((t: Therapist) => t.role === "therapist").map((therapist: Therapist) => (
                      <SelectItem key={therapist.id} value={therapist.id.toString()}>
                        {therapist.firstName} {therapist.lastName}
                      </SelectItem>
                    ))}
                  </SelectContent>
                </Select>
              </div>
              
              <div>
                <Label>Service Type</Label>
                <Select value={formData.serviceTypeId} onValueChange={(value) => setFormData({...formData, serviceTypeId: value})}>
                  <SelectTrigger>
                    <SelectValue placeholder="Select service" />
                  </SelectTrigger>
                  <SelectContent>
                    {serviceTypes?.success?.serviceTypes?.map((serviceType: ServiceType) => (
                      <SelectItem key={serviceType.id} value={serviceType.id.toString()}>
                        {serviceType.name}
                      </SelectItem>
                    ))}
                  </SelectContent>
                </Select>
              </div>
              
              <div>
                <Label>Date & Time</Label>
                <Input
                  type="datetime-local"
                  value={formData.scheduledAt}
                  onChange={(e) => setFormData({...formData, scheduledAt: e.target.value})}
                />
              </div>
              
              <div>
                <Label>Duration (minutes)</Label>
                <Input
                  type="number"
                  value={formData.duration}
                  onChange={(e) => setFormData({...formData, duration: Number(e.target.value)})}
                />
              </div>
              
              <div>
                <Label>Notes</Label>
                <Textarea
                  value={formData.notes}
                  onChange={(e) => setFormData({...formData, notes: e.target.value})}
                />
              </div>
              
              <Button onClick={handleUpdateAppointment} className="w-full">
                Update Appointment
              </Button>
            </div>
          </DialogContent>
        </Dialog>
      </div>
    </div>
  );
} 