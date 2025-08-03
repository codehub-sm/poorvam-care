import React, { useState, useEffect } from 'react';
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogFooter } from '@/components/ui/dialog';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { Checkbox } from '@/components/ui/checkbox';
import { Label } from '@/components/ui/label';
import { apiRequest } from '@/lib/queryClient';
import { 
  User, 
  Clock, 
  Phone, 
  Calendar, 
  FileText, 
  Edit, 
  X, 
  CheckCircle, 
  Copy, 
  Trash2,
  Eye,
  CreditCard,
  Palette,
  PhoneCall,
  Users
} from 'lucide-react';

interface Appointment {
  id: number;
  patientId: number;
  patientName: string;
  therapistId: number;
  therapistName: string;
  scheduledAt: string;
  duration: number;
  status: string;
  serviceType: string;
  notes?: string;
  patientPhone?: string;
}

interface AppointmentModalProps {
  appointment: Appointment | null;
  isOpen: boolean;
  onClose: () => void;
  onMarkVisit: (id: number) => void;
  onCancel: (id: number) => void;
  onReschedule: (id: number) => void;
  onDelete: (id: number) => void;
  onViewPatient: (patientId: number) => void;
  onRecordPayment: (id: number) => void;
  onEditColor: (id: number) => void;
  onCall: (phone: string) => void;
}

export function AppointmentModal({
  appointment,
  isOpen,
  onClose,
  onMarkVisit,
  onCancel,
  onReschedule,
  onDelete,
  onViewPatient,
  onRecordPayment,
  onEditColor,
  onCall
}: AppointmentModalProps) {
  if (!appointment) return null;
  
  const [isMultiPatientModalOpen, setIsMultiPatientModalOpen] = useState(false);
  const [patients, setPatients] = useState<any[]>([]);
  const [selectedPatients, setSelectedPatients] = useState<number[]>([]);
  const [isLoading, setIsLoading] = useState(false);
  
  // Fetch all patients when the multi-patient modal opens
  useEffect(() => {
    if (isMultiPatientModalOpen) {
      const fetchPatients = async () => {
        try {
          setIsLoading(true);
          const response = await apiRequest('GET', '/api/admin/patients');
          const data = await response.json();
          if (data.success) {
            setPatients(data.patients);
            // Pre-select the current patient
            setSelectedPatients([appointment.patientId]);
          }
        } catch (error) {
          console.error('Error fetching patients:', error);
        } finally {
          setIsLoading(false);
        }
      };
      
      fetchPatients();
    }
  }, [isMultiPatientModalOpen, appointment.patientId]);
  
  // Handle marking multiple patients as visited
  const handleMarkMultipleVisits = async () => {
    try {
      const response = await apiRequest('PUT', `/api/appointments/${appointment.id}/visit`, {
        multiplePatients: true,
        patientIds: selectedPatients
      });
      
      const data = await response.json();
      if (data.success) {
        setIsMultiPatientModalOpen(false);
        onMarkVisit(appointment.id);
      }
    } catch (error) {
      console.error('Error marking multiple visits:', error);
    }
  };
  
  // Toggle patient selection
  const togglePatientSelection = (patientId: number) => {
    setSelectedPatients(prev => 
      prev.includes(patientId)
        ? prev.filter(id => id !== patientId)
        : [...prev, patientId]
    );
  };

  const formatDateTime = (dateString: string) => {
    try {
      const date = new Date(dateString);
      return date.toLocaleString('en-US', {
        weekday: 'long',
        year: 'numeric',
        month: 'long',
        day: 'numeric',
        hour: '2-digit',
        minute: '2-digit',
        hour12: true
      });
    } catch (error) {
      console.error("Error formatting date:", error, dateString);
      return "Invalid date";
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
      default:
        return 'bg-gray-100 text-gray-800';
    }
  };

  return (
    <>
      <Dialog open={isOpen} onOpenChange={onClose}>
        <DialogContent className="max-w-md">
          <DialogHeader>
            <DialogTitle className="flex items-center justify-between">
              <span>{appointment.patientName} - {appointment.therapistName}</span>
              <Button variant="ghost" size="sm" onClick={onClose}>
                <X className="h-4 w-4" />
              </Button>
            </DialogTitle>
          </DialogHeader>

          <div className="space-y-4">
            {/* Appointment Details */}
            <div className="space-y-2">
              <div className="flex items-center space-x-2">
                <Calendar className="h-4 w-4 text-gray-500" />
                <span className="text-sm">{formatDateTime(appointment.scheduledAt)}</span>
              </div>
              <div className="flex items-center space-x-2">
                <Clock className="h-4 w-4 text-gray-500" />
                <span className="text-sm">{appointment.duration} minutes</span>
              </div>
              <div className="flex items-center space-x-2">
                <User className="h-4 w-4 text-gray-500" />
                <span className="text-sm">{appointment.serviceType}</span>
              </div>
              
              {/* Status with dropdown */}
              <div className="flex items-center justify-between">
                <span className="text-sm font-medium">Status:</span>
                <select 
                  value={appointment.status}
                  onChange={(e) => {
                    const newStatus = e.target.value;
                    if (newStatus === 'visited') {
                      onMarkVisit(appointment.id);
                    } else if (newStatus === 'cancelled') {
                      onCancel(appointment.id);
                    } else if (newStatus === 'scheduled') {
                      // Handle reschedule
                      onReschedule(appointment.id);
                    }
                  }}
                  className="text-sm p-1 border rounded-md"
                >
                  <option value="scheduled">Scheduled</option>
                  <option value="visited">Visited</option>
                  <option value="cancelled">Cancelled</option>
                </select>
                <Badge className={getStatusColor(appointment.status)}>
                  {appointment.status}
                </Badge>
              </div>
            </div>

            {/* Action Buttons */}
            <div className="space-y-2">
              {appointment.status === 'scheduled' && (
                <>
                  <Button 
                    variant="outline" 
                    className="w-full justify-start" 
                    onClick={() => onMarkVisit(appointment.id)}
                  >
                    <CheckCircle className="h-4 w-4 mr-2" />
                    Mark Patient Visit
                  </Button>
                  <Button 
                    variant="outline" 
                    className="w-full justify-start" 
                    onClick={() => setIsMultiPatientModalOpen(true)}
                  >
                    <Users className="h-4 w-4 mr-2" />
                    Mark Multiple Patients
                  </Button>
                </>
              )}
              
              {appointment.status !== 'cancelled' && (
                <Button 
                  variant="outline" 
                  className="w-full justify-start"
                  onClick={() => {
                    // TODO: Implement copy recurring appointments
                    console.log('Copy recurring appointments for:', appointment.id);
                    onClose();
                  }}
                >
                  <Copy className="h-4 w-4 mr-2" />
                  Copy Recurring Appointments
                </Button>
              )}
              
              {appointment.status === 'scheduled' && (
                <Button 
                  variant="outline" 
                  className="w-full justify-start" 
                  onClick={() => onCancel(appointment.id)}
                >
                  <X className="h-4 w-4 mr-2" />
                  Cancel Appointment
                </Button>
              )}
              
              {appointment.status === 'scheduled' && (
                <Button 
                  variant="outline" 
                  className="w-full justify-start" 
                  onClick={() => onReschedule(appointment.id)}
                >
                  <Edit className="h-4 w-4 mr-2" />
                  Reschedule Appointment
                </Button>
              )}
              
              <Button 
                variant="outline" 
                className="w-full justify-start" 
                onClick={() => onDelete(appointment.id)}
              >
                <Trash2 className="h-4 w-4 mr-2" />
                Delete Appointment
              </Button>
              
              <Button 
                variant="outline" 
                className="w-full justify-start" 
                onClick={() => onViewPatient(appointment.patientId)}
              >
                <Eye className="h-4 w-4 mr-2" />
                View Patient Details
              </Button>
              
              <Button 
                variant="outline" 
                className="w-full justify-start" 
                onClick={() => onRecordPayment(appointment.id)}
              >
                <CreditCard className="h-4 w-4 mr-2" />
                Record New Payment
              </Button>
              
              <Button 
                variant="outline" 
                className="w-full justify-start" 
                onClick={() => onEditColor(appointment.id)}
              >
                <Palette className="h-4 w-4 mr-2" />
                Edit Color Code
              </Button>
              
              {appointment.patientPhone && (
                <Button 
                  variant="outline" 
                  className="w-full justify-start" 
                  onClick={() => onCall(appointment.patientPhone!)}
                >
                  <PhoneCall className="h-4 w-4 mr-2" />
                  Call ({appointment.patientPhone})
                </Button>
              )}
            </div>
          </div>
        </DialogContent>
      </Dialog>

      {/* Multi-Patient Selection Dialog */}
      <Dialog open={isMultiPatientModalOpen} onOpenChange={setIsMultiPatientModalOpen}>
        <DialogContent className="max-w-md">
          <DialogHeader>
            <DialogTitle>Mark Multiple Patients</DialogTitle>
          </DialogHeader>
          
          <div className="space-y-4">
            <p className="text-sm text-gray-500">
              Select patients who attended this session. The primary patient is selected by default.
            </p>
            
            {isLoading ? (
              <div className="text-center py-4">Loading patients...</div>
            ) : (
              <div className="max-h-60 overflow-y-auto space-y-2">
                {patients.map(patient => (
                  <div key={patient.id} className="flex items-center space-x-2">
                    <Checkbox 
                      id={`patient-${patient.id}`}
                      checked={selectedPatients.includes(patient.id)}
                      onCheckedChange={() => togglePatientSelection(patient.id)}
                    />
                    <Label htmlFor={`patient-${patient.id}`} className="cursor-pointer">
                      {patient.firstName} {patient.lastName}
                      {patient.id === appointment.patientId && (
                        <span className="text-xs text-blue-500 ml-2">(Primary)</span>
                      )}
                    </Label>
                  </div>
                ))}
              </div>
            )}
          </div>
          
          <DialogFooter>
            <Button 
              onClick={handleMarkMultipleVisits}
              disabled={selectedPatients.length === 0 || isLoading}
            >
              Mark Selected Patients
            </Button>
            <Button 
              variant="outline" 
              onClick={() => setIsMultiPatientModalOpen(false)}
            >
              Cancel
            </Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>
    </>
  );
} 