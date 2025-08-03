import React, { useState, useEffect } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Badge } from '@/components/ui/badge';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { Dialog, DialogContent, DialogFooter, DialogHeader, DialogTitle } from '@/components/ui/dialog';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { Textarea } from '@/components/ui/textarea';
import { apiRequest } from '@/lib/queryClient';
import { 
  User, 
  Phone, 
  Mail, 
  Calendar, 
  Clock, 
  Search, 
  Download,
  Eye,
  Edit,
  Plus,
  FileText,
  Target,
  CreditCard,
  CheckSquare,
  AlertCircle,
  X
} from 'lucide-react';

interface Patient {
  id: number;
  firstName: string;
  lastName: string;
  email: string | null;
  phone: string | null;
  dateOfBirth: string | null;
  status: string;
  primaryTherapistId: number | null;
  diagnosis?: string | null;
  notes?: string | null;
}

interface Appointment {
  id: number;
  therapistId: number;
  therapistName: string;
  scheduledAt: string;
  duration: number;
  serviceType: string;
  status: string;
  notes?: string | null;
}

interface Session {
  id: number;
  appointmentId: number | null;
  therapistId: number | null;
  patientId: number | null;
  sessionDate: string;
  notes: string | null;
  progress: string | null;
  goals: string | null;
  createdAt: string;
}

interface Goal {
  id: number;
  patientId: number | null;
  title: string;
  description: string | null;
  status: string;
  targetDate: string | null;
  createdAt: string;
}

interface Task {
  id: number;
  patientId: number | null;
  assignedTo: number | null;
  title: string;
  description: string | null;
  goalId: number | null;
  status: string;
  dueDate: string | null;
  createdAt: string;
}

interface PatientDetailsProps {
  patient: Patient;
  onEditPatient: (patient: Patient) => void;
  onViewSchedule: (patientId: number) => void;
  onClose: () => void;
}

export function PatientDetails({ patient, onEditPatient, onViewSchedule, onClose }: PatientDetailsProps) {
  const [searchTherapist, setSearchTherapist] = useState('');
  const [appointments, setAppointments] = useState<Appointment[]>([]);
  const [sessions, setSessions] = useState<Session[]>([]);
  const [goals, setGoals] = useState<Goal[]>([]);
  const [tasks, setTasks] = useState<Task[]>([]);
  const [therapists, setTherapists] = useState<any[]>([]);
  const [loading, setLoading] = useState({
    appointments: true,
    sessions: true,
    goals: true,
    tasks: true,
    therapists: true
  });
  
  // Session management states
  const [isAddSessionOpen, setIsAddSessionOpen] = useState(false);
  const [isEditSessionOpen, setIsEditSessionOpen] = useState(false);
  const [isAddingSession, setIsAddingSession] = useState(false);
  const [isUpdatingSession, setIsUpdatingSession] = useState(false);
  const [editingSession, setEditingSession] = useState<Session | null>(null);
  const [newSession, setNewSession] = useState<{
    patientId: number;
    therapistId: number | null;
    sessionDate: string;
    notes: string | null;
    progress: string | null;
    goals: string | null;
  }>({
    patientId: patient.id,
    therapistId: patient.primaryTherapistId,
    sessionDate: new Date().toISOString().split('T')[0],
    notes: null,
    progress: null,
    goals: null
  });

  useEffect(() => {
    // Fetch patient's appointments
    const fetchAppointments = async () => {
      try {
        const response = await apiRequest('GET', `/api/appointments?patientId=${patient.id}`);
        const data = await response.json();
        if (data.success) {
          setAppointments(data.appointments);
        }
      } catch (error) {
        console.error('Error fetching appointments:', error);
      } finally {
        setLoading(prev => ({ ...prev, appointments: false }));
      }
    };

    // Fetch patient's sessions
    const fetchSessions = async () => {
      try {
        const response = await apiRequest('GET', `/api/sessions?patientId=${patient.id}`);
        const data = await response.json();
        if (data.success) {
          setSessions(data.sessions);
        }
      } catch (error) {
        console.error('Error fetching sessions:', error);
      } finally {
        setLoading(prev => ({ ...prev, sessions: false }));
      }
    };

    // Fetch patient's goals
    const fetchGoals = async () => {
      try {
        const response = await apiRequest('GET', `/api/goals?patientId=${patient.id}`);
        const data = await response.json();
        if (data.success) {
          setGoals(data.goals);
        }
      } catch (error) {
        console.error('Error fetching goals:', error);
      } finally {
        setLoading(prev => ({ ...prev, goals: false }));
      }
    };

    // Fetch patient's tasks
    const fetchTasks = async () => {
      try {
        const response = await apiRequest('GET', `/api/tasks?patientId=${patient.id}`);
        const data = await response.json();
        if (data.success) {
          setTasks(data.tasks);
        }
      } catch (error) {
        console.error('Error fetching tasks:', error);
      } finally {
        setLoading(prev => ({ ...prev, tasks: false }));
      }
    };

    // Fetch therapists for mapping names
    const fetchTherapists = async () => {
      try {
        const response = await apiRequest('GET', `/api/users`);
        const data = await response.json();
        if (data.success) {
          setTherapists(data.users.filter((u: any) => u.role === 'therapist'));
        }
      } catch (error) {
        console.error('Error fetching therapists:', error);
      } finally {
        setLoading(prev => ({ ...prev, therapists: false }));
      }
    };

    fetchAppointments();
    fetchSessions();
    fetchGoals();
    fetchTasks();
    fetchTherapists();
  }, [patient.id]);

  const formatDate = (dateString: string) => {
    try {
      const date = new Date(dateString);
      return date.toLocaleDateString('en-US', {
        weekday: 'long',
        day: 'numeric',
        month: 'long',
        year: 'numeric'
      });
    } catch (error) {
      console.error('Error formatting date:', error);
      return 'Invalid date';
    }
  };

  const formatTime = (dateString: string) => {
    try {
      const date = new Date(dateString);
      return date.toLocaleTimeString('en-US', {
        hour: '2-digit',
        minute: '2-digit',
        hour12: true
      });
    } catch (error) {
      console.error('Error formatting time:', error);
      return 'Invalid time';
    }
  };

  const getStatusColor = (status: string) => {
    switch (status) {
      case 'scheduled':
        return 'bg-blue-100 text-blue-800';
      case 'visited':
        return 'bg-green-100 text-green-800';
      case 'cancelled':
        return 'bg-red-100 text-red-800';
      case 'active':
        return 'bg-blue-100 text-blue-800';
      case 'completed':
        return 'bg-green-100 text-green-800';
      case 'pending':
        return 'bg-yellow-100 text-yellow-800';
      default:
        return 'bg-gray-100 text-gray-800';
    }
  };

  const getTherapistName = (therapistId: number | null) => {
    if (!therapistId) return 'None';
    const therapist = therapists.find(t => t.id === therapistId);
    return therapist ? `${therapist.firstName} ${therapist.lastName}` : `Therapist ${therapistId}`;
  };

  const filteredAppointments = appointments.filter(appointment => {
    if (!appointment.therapistName && appointment.therapistId) {
      appointment.therapistName = getTherapistName(appointment.therapistId);
    }
    return appointment.therapistName?.toLowerCase().includes(searchTherapist.toLowerCase());
  });
  
  const handleAddSession = async () => {
    if (!newSession.therapistId || !newSession.sessionDate) {
      alert('Please select a therapist and session date');
      return;
    }
    
    setIsAddingSession(true);
    
    try {
      const response = await apiRequest('POST', '/api/sessions', newSession);
      const data = await response.json();
      
      if (data.success) {
        // Add the new session to the list
        setSessions([...sessions, data.session]);
        
        // Reset form and close dialog
        setNewSession({
          patientId: patient.id,
          therapistId: patient.primaryTherapistId,
          sessionDate: new Date().toISOString().split('T')[0],
          notes: null,
          progress: null,
          goals: null
        });
        setIsAddSessionOpen(false);
      } else {
        console.error('Failed to add session:', data.error);
        alert('Failed to add session. Please try again.');
      }
    } catch (error) {
      console.error('Error adding session:', error);
      alert('Error adding session. Please try again.');
    } finally {
      setIsAddingSession(false);
    }
  };
  
  const handleEditSession = (session: Session) => {
    setEditingSession(session);
    setIsEditSessionOpen(true);
  };
  
  const handleUpdateSession = async () => {
    if (!editingSession) return;
    
    setIsUpdatingSession(true);
    
    try {
      const response = await apiRequest('PUT', `/api/sessions/${editingSession.id}`, editingSession);
      const data = await response.json();
      
      if (data.success) {
        // Update the session in the list
        setSessions(sessions.map(s => s.id === editingSession.id ? data.session : s));
        
        // Close dialog
        setIsEditSessionOpen(false);
        setEditingSession(null);
      } else {
        console.error('Failed to update session:', data.error);
        alert('Failed to update session. Please try again.');
      }
    } catch (error) {
      console.error('Error updating session:', error);
      alert('Error updating session. Please try again.');
    } finally {
      setIsUpdatingSession(false);
    }
  };

  return (
    <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
      {/* Patient Information Sidebar */}
      <div className="lg:col-span-1">
        <Card>
          <CardHeader className="flex justify-between items-start">
            <CardTitle>Patient Information</CardTitle>
            <Button variant="ghost" size="sm" onClick={onClose}>
              <X className="h-4 w-4" />
            </Button>
          </CardHeader>
          <CardContent className="space-y-4">
            {/* Avatar */}
            <div className="flex justify-center">
              <div className="w-20 h-20 bg-blue-500 rounded-full flex items-center justify-center text-white text-2xl font-bold">
                {patient.firstName.charAt(0)}{patient.lastName.charAt(0)}
              </div>
            </div>

            {/* Status Badge */}
            <div className="flex justify-center">
              <Badge className={getStatusColor(patient.status)}>
                {patient.status}
              </Badge>
            </div>

            {/* Patient Details */}
            <div className="space-y-3">
              <div>
                <Label htmlFor="firstName">First Name</Label>
                <Input id="firstName" value={patient.firstName} readOnly />
              </div>
              
              <div>
                <Label htmlFor="lastName">Last Name</Label>
                <Input id="lastName" value={patient.lastName} readOnly />
              </div>
              
              <div>
                <Label htmlFor="email">E-mail</Label>
                <Input id="email" value={patient.email || ''} readOnly />
              </div>
              
              <div>
                <Label htmlFor="phone">Mobile Number</Label>
                <Input id="phone" value={patient.phone || ''} readOnly />
              </div>
              
              <div>
                <Label htmlFor="dob">Date of Birth</Label>
                <Input id="dob" value={patient.dateOfBirth ? formatDate(patient.dateOfBirth) : 'Not specified'} readOnly />
              </div>

              {patient.diagnosis && (
                <div>
                  <Label htmlFor="diagnosis">Diagnosis</Label>
                  <Input id="diagnosis" value={patient.diagnosis} readOnly />
                </div>
              )}

              {patient.notes && (
                <div>
                  <Label htmlFor="notes">Notes</Label>
                  <Textarea id="notes" value={patient.notes} readOnly />
                </div>
              )}

              <div>
                <Label htmlFor="therapist">Primary Therapist</Label>
                <Input id="therapist" value={getTherapistName(patient.primaryTherapistId)} readOnly />
              </div>
            </div>

            {/* Action Buttons */}
            <div className="flex space-x-2">
              <Button variant="outline" className="flex-1" onClick={() => onEditPatient(patient)}>
                <Edit className="h-4 w-4 mr-2" />
                Edit Patient
              </Button>
              <Button variant="outline" className="flex-1" onClick={() => onViewSchedule(patient.id)}>
                <Calendar className="h-4 w-4 mr-2" />
                View Schedule
              </Button>
            </div>
          </CardContent>
        </Card>
      </div>

      {/* Main Content */}
      <div className="lg:col-span-2">
        <Card>
          <CardHeader>
            <CardTitle>Patient Records</CardTitle>
          </CardHeader>
          <CardContent>
            <Tabs defaultValue="appointments" className="w-full">
              <TabsList className="grid w-full grid-cols-6">
                <TabsTrigger value="appointments">Appointments</TabsTrigger>
                <TabsTrigger value="sessions">Sessions</TabsTrigger>
                <TabsTrigger value="goals">Goals</TabsTrigger>
                <TabsTrigger value="tasks">Tasks</TabsTrigger>
                <TabsTrigger value="notes">Notes</TabsTrigger>
                <TabsTrigger value="transactions">Payments</TabsTrigger>
              </TabsList>

              {/* Appointments Tab */}
              <TabsContent value="appointments" className="space-y-4">
                {/* Search and Actions */}
                <div className="flex items-center justify-between">
                  <div className="relative flex-1 max-w-sm">
                    <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-gray-400" />
                    <Input
                      placeholder="Search therapist..."
                      value={searchTherapist}
                      onChange={(e) => setSearchTherapist(e.target.value)}
                      className="pl-10"
                    />
                  </div>
                  <div className="flex space-x-2">
                    <Button variant="outline" size="sm">
                      <Download className="h-4 w-4 mr-2" />
                      Export
                    </Button>
                  </div>
                </div>

                {loading.appointments ? (
                  <div className="text-center py-8">Loading appointments...</div>
                ) : filteredAppointments.length === 0 ? (
                  <div className="text-center text-gray-500 py-8">
                    <Calendar className="h-12 w-12 mx-auto mb-4 text-gray-300" />
                    <p>No appointments found</p>
                  </div>
                ) : (
                  /* Appointments Table */
                  <div className="border rounded-lg">
                    <div className="grid grid-cols-6 gap-4 p-4 bg-gray-50 font-medium text-sm">
                      <div>Date</div>
                      <div>Time</div>
                      <div>Therapist</div>
                      <div>Duration</div>
                      <div>Service</div>
                      <div>Status</div>
                    </div>
                    
                    <div className="divide-y">
                      {filteredAppointments.map((appointment) => (
                        <div key={appointment.id} className="grid grid-cols-6 gap-4 p-4 text-sm">
                          <div>{formatDate(appointment.scheduledAt).split(',')[1]}</div>
                          <div>{formatTime(appointment.scheduledAt)}</div>
                          <div className="font-medium">{appointment.therapistName}</div>
                          <div>{appointment.duration} min</div>
                          <div>{appointment.serviceType}</div>
                          <div>
                            <Badge className={getStatusColor(appointment.status)}>
                              {appointment.status}
                            </Badge>
                          </div>
                        </div>
                      ))}
                    </div>
                  </div>
                )}
              </TabsContent>

              {/* Sessions Tab */}
              <TabsContent value="sessions">
                <div className="flex justify-between items-center mb-4">
                  <h3 className="text-lg font-semibold">Session History</h3>
                  <Button 
                    variant="outline" 
                    size="sm"
                    onClick={() => setIsAddSessionOpen(true)}
                  >
                    <Plus className="h-4 w-4 mr-2" />
                    Add Session
                  </Button>
                </div>
                
                {loading.sessions ? (
                  <div className="text-center py-8">Loading sessions...</div>
                ) : sessions.length === 0 ? (
                  <div className="text-center text-gray-500 py-8">
                    <FileText className="h-12 w-12 mx-auto mb-4 text-gray-300" />
                    <p>No sessions recorded</p>
                    <Button 
                      variant="outline" 
                      className="mt-4"
                      onClick={() => setIsAddSessionOpen(true)}
                    >
                      <Plus className="h-4 w-4 mr-2" />
                      Record First Session
                    </Button>
                  </div>
                ) : (
                  <div className="space-y-4">
                    {sessions.map(session => (
                      <Card key={session.id}>
                        <CardHeader className="pb-2">
                          <div className="flex justify-between">
                            <CardTitle className="text-base">
                              Session on {formatDate(session.sessionDate)}
                            </CardTitle>
                            <div className="text-sm text-gray-500">
                              {getTherapistName(session.therapistId)}
                            </div>
                          </div>
                        </CardHeader>
                        <CardContent>
                          {session.notes && (
                            <div className="mb-3">
                              <h4 className="font-semibold text-sm">Notes</h4>
                              <p className="text-sm text-gray-700">{session.notes}</p>
                            </div>
                          )}
                          
                          {session.progress && (
                            <div className="mb-3">
                              <h4 className="font-semibold text-sm">Progress</h4>
                              <p className="text-sm text-gray-700">{session.progress}</p>
                            </div>
                          )}
                          
                          {session.goals && (
                            <div>
                              <h4 className="font-semibold text-sm">Goals</h4>
                              <p className="text-sm text-gray-700">{session.goals}</p>
                            </div>
                          )}
                          
                          <div className="flex justify-end mt-3">
                            <Button variant="ghost" size="sm" onClick={() => handleEditSession(session)}>
                              <Edit className="h-4 w-4 mr-2" />
                              Edit
                            </Button>
                          </div>
                        </CardContent>
                      </Card>
                    ))}
                  </div>
                )}
                
                {/* Add Session Dialog */}
                <Dialog open={isAddSessionOpen} onOpenChange={setIsAddSessionOpen}>
                  <DialogContent>
                    <DialogHeader>
                      <DialogTitle>Record New Session</DialogTitle>
                    </DialogHeader>
                    
                    <div className="space-y-4 py-4">
                      <div className="grid grid-cols-2 gap-4">
                        <div>
                          <Label htmlFor="sessionDate">Session Date</Label>
                          <Input 
                            id="sessionDate" 
                            type="date" 
                            value={newSession.sessionDate}
                            onChange={(e) => setNewSession({
                              ...newSession,
                              sessionDate: e.target.value
                            })}
                          />
                        </div>
                        
                        <div>
                          <Label htmlFor="therapistId">Therapist</Label>
                          <Select 
                            value={newSession.therapistId?.toString() || ''} 
                            onValueChange={(value) => setNewSession({
                              ...newSession,
                              therapistId: Number(value)
                            })}
                          >
                            <SelectTrigger>
                              <SelectValue placeholder="Select therapist" />
                            </SelectTrigger>
                            <SelectContent>
                              {therapists.map(therapist => (
                                <SelectItem 
                                  key={therapist.id} 
                                  value={therapist.id.toString()}
                                >
                                  {therapist.firstName} {therapist.lastName}
                                </SelectItem>
                              ))}
                            </SelectContent>
                          </Select>
                        </div>
                      </div>
                      
                      <div>
                        <Label htmlFor="notes">Session Notes</Label>
                        <Textarea 
                          id="notes" 
                          placeholder="Enter session notes"
                          value={newSession.notes || ''}
                          onChange={(e) => setNewSession({
                            ...newSession,
                            notes: e.target.value
                          })}
                          className="min-h-[100px]"
                        />
                      </div>
                      
                      <div>
                        <Label htmlFor="progress">Progress</Label>
                        <Textarea 
                          id="progress" 
                          placeholder="Enter progress details"
                          value={newSession.progress || ''}
                          onChange={(e) => setNewSession({
                            ...newSession,
                            progress: e.target.value
                          })}
                        />
                      </div>
                      
                      <div>
                        <Label htmlFor="goals">Goals</Label>
                        <Textarea 
                          id="goals" 
                          placeholder="Enter goals for next session"
                          value={newSession.goals || ''}
                          onChange={(e) => setNewSession({
                            ...newSession,
                            goals: e.target.value
                          })}
                        />
                      </div>
                    </div>
                    
                    <DialogFooter>
                      <Button variant="outline" onClick={() => setIsAddSessionOpen(false)}>
                        Cancel
                      </Button>
                      <Button onClick={handleAddSession} disabled={isAddingSession}>
                        {isAddingSession ? 'Saving...' : 'Save Session'}
                      </Button>
                    </DialogFooter>
                  </DialogContent>
                </Dialog>
                
                {/* Edit Session Dialog */}
                <Dialog open={isEditSessionOpen} onOpenChange={setIsEditSessionOpen}>
                  <DialogContent>
                    <DialogHeader>
                      <DialogTitle>Edit Session</DialogTitle>
                    </DialogHeader>
                    
                    {editingSession && (
                      <div className="space-y-4 py-4">
                        <div className="grid grid-cols-2 gap-4">
                          <div>
                            <Label htmlFor="editSessionDate">Session Date</Label>
                            <Input 
                              id="editSessionDate" 
                              type="date" 
                              value={editingSession.sessionDate.split('T')[0]}
                              onChange={(e) => setEditingSession({
                                ...editingSession,
                                sessionDate: e.target.value
                              })}
                            />
                          </div>
                          
                          <div>
                            <Label htmlFor="editTherapistId">Therapist</Label>
                            <Select 
                              value={editingSession.therapistId?.toString() || ''} 
                              onValueChange={(value) => setEditingSession({
                                ...editingSession,
                                therapistId: Number(value)
                              })}
                            >
                              <SelectTrigger>
                                <SelectValue placeholder="Select therapist" />
                              </SelectTrigger>
                              <SelectContent>
                                {therapists.map(therapist => (
                                  <SelectItem 
                                    key={therapist.id} 
                                    value={therapist.id.toString()}
                                  >
                                    {therapist.firstName} {therapist.lastName}
                                  </SelectItem>
                                ))}
                              </SelectContent>
                            </Select>
                          </div>
                        </div>
                        
                        <div>
                          <Label htmlFor="editNotes">Session Notes</Label>
                          <Textarea 
                            id="editNotes" 
                            placeholder="Enter session notes"
                            value={editingSession.notes || ''}
                            onChange={(e) => setEditingSession({
                              ...editingSession,
                              notes: e.target.value
                            })}
                            className="min-h-[100px]"
                          />
                        </div>
                        
                        <div>
                          <Label htmlFor="editProgress">Progress</Label>
                          <Textarea 
                            id="editProgress" 
                            placeholder="Enter progress details"
                            value={editingSession.progress || ''}
                            onChange={(e) => setEditingSession({
                              ...editingSession,
                              progress: e.target.value
                            })}
                          />
                        </div>
                        
                        <div>
                          <Label htmlFor="editGoals">Goals</Label>
                          <Textarea 
                            id="editGoals" 
                            placeholder="Enter goals for next session"
                            value={editingSession.goals || ''}
                            onChange={(e) => setEditingSession({
                              ...editingSession,
                              goals: e.target.value
                            })}
                          />
                        </div>
                      </div>
                    )}
                    
                    <DialogFooter>
                      <Button variant="outline" onClick={() => setIsEditSessionOpen(false)}>
                        Cancel
                      </Button>
                      <Button onClick={handleUpdateSession} disabled={isUpdatingSession}>
                        {isUpdatingSession ? 'Saving...' : 'Update Session'}
                      </Button>
                    </DialogFooter>
                  </DialogContent>
                </Dialog>
              </TabsContent>

              {/* Goals Tab */}
              <TabsContent value="goals">
                {loading.goals ? (
                  <div className="text-center py-8">Loading goals...</div>
                ) : goals.length === 0 ? (
                  <div className="text-center text-gray-500 py-8">
                    <Target className="h-12 w-12 mx-auto mb-4 text-gray-300" />
                    <p>No goals set</p>
                  </div>
                ) : (
                  <div className="space-y-4">
                    {goals.map(goal => (
                      <Card key={goal.id}>
                        <CardHeader className="pb-2">
                          <div className="flex justify-between items-center">
                            <CardTitle className="text-base">{goal.title}</CardTitle>
                            <Badge className={getStatusColor(goal.status)}>
                              {goal.status}
                            </Badge>
                          </div>
                        </CardHeader>
                        <CardContent>
                          {goal.description && (
                            <p className="text-sm text-gray-700 mb-2">{goal.description}</p>
                          )}
                          
                          {goal.targetDate && (
                            <div className="flex items-center text-sm text-gray-500">
                              <Calendar className="h-4 w-4 mr-1" />
                              Target: {formatDate(goal.targetDate)}
                            </div>
                          )}
                        </CardContent>
                      </Card>
                    ))}
                  </div>
                )}
              </TabsContent>

              {/* Tasks Tab */}
              <TabsContent value="tasks">
                {loading.tasks ? (
                  <div className="text-center py-8">Loading tasks...</div>
                ) : tasks.length === 0 ? (
                  <div className="text-center text-gray-500 py-8">
                    <CheckSquare className="h-12 w-12 mx-auto mb-4 text-gray-300" />
                    <p>No tasks assigned</p>
                  </div>
                ) : (
                  <div className="space-y-4">
                    {tasks.map(task => (
                      <Card key={task.id}>
                        <CardHeader className="pb-2">
                          <div className="flex justify-between items-center">
                            <CardTitle className="text-base">{task.title}</CardTitle>
                            <Badge className={getStatusColor(task.status)}>
                              {task.status}
                            </Badge>
                          </div>
                        </CardHeader>
                        <CardContent>
                          {task.description && (
                            <p className="text-sm text-gray-700 mb-2">{task.description}</p>
                          )}
                          
                          <div className="flex flex-wrap gap-4 text-sm text-gray-500">
                            {task.assignedTo && (
                              <div className="flex items-center">
                                <User className="h-4 w-4 mr-1" />
                                Assigned to: {getTherapistName(task.assignedTo)}
                              </div>
                            )}
                            
                            {task.dueDate && (
                              <div className="flex items-center">
                                <Calendar className="h-4 w-4 mr-1" />
                                Due: {formatDate(task.dueDate)}
                              </div>
                            )}
                          </div>
                        </CardContent>
                      </Card>
                    ))}
                  </div>
                )}
              </TabsContent>

              {/* Notes Tab */}
              <TabsContent value="notes">
                <div className="text-center text-gray-500 py-8">
                  <FileText className="h-12 w-12 mx-auto mb-4 text-gray-300" />
                  <p>No additional notes available</p>
                </div>
              </TabsContent>

              {/* Transactions Tab */}
              <TabsContent value="transactions">
                <div className="text-center text-gray-500 py-8">
                  <CreditCard className="h-12 w-12 mx-auto mb-4 text-gray-300" />
                  <p>No payment transactions found</p>
                </div>
              </TabsContent>
            </Tabs>
          </CardContent>
        </Card>
      </div>
    </div>
  );
} 