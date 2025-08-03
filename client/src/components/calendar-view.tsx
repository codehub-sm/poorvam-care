import React, { useState } from 'react';
import { Calendar, ChevronLeft, ChevronRight } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Card, CardContent } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';

interface Appointment {
  id: number;
  patientName: string;
  therapistName: string;
  scheduledAt: string;
  duration: number;
  status: string;
  serviceType: string;
  color?: string;
}

interface CalendarViewProps {
  appointments: Appointment[];
  onAppointmentClick: (appointment: Appointment) => void;
  onAddAppointment: () => void;
  view?: 'day' | 'week' | 'month';
  onViewChange?: (view: 'day' | 'week' | 'month') => void;
}

export function CalendarView({ 
  appointments, 
  onAppointmentClick, 
  onAddAppointment,
  view = 'month',
  onViewChange 
}: CalendarViewProps) {
  const [currentDate, setCurrentDate] = useState(new Date());
  
  const getDaysInMonth = (date: Date) => {
    const year = date.getFullYear();
    const month = date.getMonth();
    const firstDay = new Date(year, month, 1);
    const lastDay = new Date(year, month + 1, 0);
    const startDate = new Date(firstDay);
    startDate.setDate(startDate.getDate() - firstDay.getDay());
    
    const days = [];
    const current = new Date(startDate);
    
    while (current <= lastDay || current.getDay() !== 0) {
      days.push(new Date(current));
      current.setDate(current.getDate() + 1);
    }
    
    return days;
  };

  const getDaysInWeek = (date: Date) => {
    const startOfWeek = new Date(date);
    startOfWeek.setDate(date.getDate() - date.getDay());
    
    const days = [];
    for (let i = 0; i < 7; i++) {
      const day = new Date(startOfWeek);
      day.setDate(startOfWeek.getDate() + i);
      days.push(day);
    }
    
    return days;
  };

  const getAppointmentsForDate = (date: Date) => {
    return appointments.filter(appointment => {
      try {
        const appointmentDate = new Date(appointment.scheduledAt);
        return appointmentDate.toDateString() === date.toDateString();
      } catch (error) {
        console.error("Error parsing appointment date:", error, appointment);
        return false;
      }
    });
  };

  const formatTime = (dateString: string) => {
    return new Date(dateString).toLocaleTimeString('en-US', {
      hour: '2-digit',
      minute: '2-digit',
      hour12: true
    });
  };

  const getMonthName = (date: Date) => {
    return date.toLocaleDateString('en-US', { month: 'long', year: 'numeric' });
  };

  const getWeekRange = (date: Date) => {
    const startOfWeek = new Date(date);
    startOfWeek.setDate(date.getDate() - date.getDay());
    const endOfWeek = new Date(startOfWeek);
    endOfWeek.setDate(startOfWeek.getDate() + 6);
    
    return `${startOfWeek.toLocaleDateString('en-US', { month: 'short', day: 'numeric' })} - ${endOfWeek.toLocaleDateString('en-US', { month: 'short', day: 'numeric', year: 'numeric' })}`;
  };

  const goToPreviousMonth = () => {
    setCurrentDate(new Date(currentDate.getFullYear(), currentDate.getMonth() - 1, 1));
  };

  const goToNextMonth = () => {
    setCurrentDate(new Date(currentDate.getFullYear(), currentDate.getMonth() + 1, 1));
  };

  const goToToday = () => {
    setCurrentDate(new Date());
  };

  const handleViewChange = (newView: 'day' | 'week' | 'month') => {
    onViewChange?.(newView);
  };

  const days = view === 'month' ? getDaysInMonth(currentDate) : 
               view === 'week' ? getDaysInWeek(currentDate) : 
               [currentDate];

  const totalScheduled = appointments.filter(a => a.status === 'scheduled').length;
  const totalVisited = appointments.filter(a => a.status === 'visited').length;
  const totalCancelled = appointments.filter(a => a.status === 'cancelled').length;

  const renderCalendarGrid = () => {
    if (view === 'day') {
      const dayAppointments = getAppointmentsForDate(currentDate);
      return (
        <div className="min-h-[400px] p-4">
          <div className="text-lg font-semibold mb-4">
            {currentDate.toLocaleDateString('en-US', { 
              weekday: 'long', 
              year: 'numeric', 
              month: 'long', 
              day: 'numeric' 
            })}
          </div>
          <div className="space-y-2">
            {dayAppointments.length === 0 ? (
              <div className="text-center text-gray-500 py-8">No appointments for this day</div>
            ) : (
              dayAppointments.map(appointment => (
                <div
                  key={appointment.id}
                  className="text-white p-3 rounded cursor-pointer hover:opacity-90 transition-opacity"
                  style={{ 
                    backgroundColor: appointment.color || 
                      (appointment.status === 'cancelled' ? '#EF4444' : 
                       appointment.status === 'visited' ? '#10B981' : '#3B82F6'),
                    ...(appointment.status === 'cancelled' ? { textDecoration: 'line-through', opacity: 0.7 } : {})
                  }}
                  onClick={() => onAppointmentClick(appointment)}
                >
                  <div className="font-medium">
                    {appointment.patientName} - {appointment.therapistName}
                  </div>
                  <div className="opacity-80">
                    {formatTime(appointment.scheduledAt)} ({appointment.duration} min)
                  </div>
                  {appointment.status !== 'scheduled' && (
                    <Badge className="mt-1 bg-white/20 text-white hover:bg-white/30">
                      {appointment.status}
                    </Badge>
                  )}
                </div>
              ))
            )}
          </div>
        </div>
      );
    }

    if (view === 'week') {
      return (
        <div className="grid grid-cols-7 gap-px bg-gray-200">
          {/* Day Headers */}
          {['Sun', 'Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat'].map(day => (
            <div key={day} className="bg-white p-3 text-center font-semibold text-gray-700">
              {day}
            </div>
          ))}
          
          {/* Week Days */}
          {days.map((day, index) => {
            const isToday = day.toDateString() === new Date().toDateString();
            const dayAppointments = getAppointmentsForDate(day);
            
            return (
              <div
                key={index}
                className={`min-h-[200px] bg-white p-2 ${
                  isToday ? 'bg-blue-50' : ''
                }`}
              >
                <div className={`text-sm font-medium mb-1 ${
                  isToday ? 'text-blue-600' : ''
                }`}>
                  {day.getDate()}
                </div>
                
                <div className="space-y-1">
                  {dayAppointments.map(appointment => (
                    <div
                      key={appointment.id}
                      className="text-white text-xs p-1 rounded cursor-pointer hover:opacity-90 transition-opacity"
                      style={{ 
                        backgroundColor: appointment.color || 
                          (appointment.status === 'cancelled' ? '#EF4444' : 
                           appointment.status === 'visited' ? '#10B981' : '#3B82F6'),
                        ...(appointment.status === 'cancelled' ? { textDecoration: 'line-through', opacity: 0.7 } : {})
                      }}
                      onClick={() => onAppointmentClick(appointment)}
                      title={`${appointment.patientName} - ${appointment.therapistName} at ${formatTime(appointment.scheduledAt)}`}
                    >
                      <div className="font-medium truncate">
                        {appointment.patientName} - {appointment.therapistName}
                      </div>
                      <div className="opacity-80">
                        {formatTime(appointment.scheduledAt)}
                      </div>
                      {appointment.status !== 'scheduled' && (
                        <div className="text-[10px] opacity-80">{appointment.status}</div>
                      )}
                    </div>
                  ))}
                </div>
              </div>
            );
          })}
        </div>
      );
    }

    // Month view (default)
    return (
      <div className="grid grid-cols-7 gap-px bg-gray-200">
        {/* Day Headers */}
        {['Sun', 'Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat'].map(day => (
          <div key={day} className="bg-white p-3 text-center font-semibold text-gray-700">
            {day}
          </div>
        ))}
        
        {/* Calendar Days */}
        {days.map((day, index) => {
          const isCurrentMonth = day.getMonth() === currentDate.getMonth();
          const isToday = day.toDateString() === new Date().toDateString();
          const dayAppointments = getAppointmentsForDate(day);
          
          return (
            <div
              key={index}
              className={`min-h-[120px] bg-white p-2 ${
                !isCurrentMonth ? 'text-gray-400' : ''
              } ${isToday ? 'bg-blue-50' : ''}`}
            >
              <div className={`text-sm font-medium mb-1 ${
                isToday ? 'text-blue-600' : ''
              }`}>
                {day.getDate()}
              </div>
              
              <div className="space-y-1">
                {dayAppointments.map(appointment => (
                  <div
                    key={appointment.id}
                    className="text-white text-xs p-1 rounded cursor-pointer hover:opacity-90 transition-opacity"
                    style={{ 
                      backgroundColor: appointment.color || 
                        (appointment.status === 'cancelled' ? '#EF4444' : 
                         appointment.status === 'visited' ? '#10B981' : '#3B82F6'),
                      ...(appointment.status === 'cancelled' ? { textDecoration: 'line-through', opacity: 0.7 } : {})
                    }}
                    onClick={() => onAppointmentClick(appointment)}
                    title={`${appointment.patientName} - ${appointment.therapistName} at ${formatTime(appointment.scheduledAt)} - ${appointment.status}`}
                  >
                    <div className="font-medium truncate">
                      {appointment.patientName}
                    </div>
                    <div className="opacity-80">
                      {formatTime(appointment.scheduledAt)}
                    </div>
                  </div>
                ))}
              </div>
            </div>
          );
        })}
      </div>
    );
  };

  return (
    <div className="space-y-4">
      {/* Header */}
      <div className="flex items-center justify-between">
        <div className="flex items-center space-x-4">
          <Button variant="outline" size="sm" onClick={goToPreviousMonth}>
            <ChevronLeft className="h-4 w-4" />
          </Button>
          <Button variant="outline" size="sm" onClick={goToToday}>
            Today
          </Button>
          <Button variant="outline" size="sm" onClick={goToNextMonth}>
            <ChevronRight className="h-4 w-4" />
          </Button>
          <h2 className="text-2xl font-bold">
            {view === 'day' ? currentDate.toLocaleDateString('en-US', { 
              weekday: 'long', 
              year: 'numeric', 
              month: 'long', 
              day: 'numeric' 
            }) :
             view === 'week' ? getWeekRange(currentDate) :
             getMonthName(currentDate)}
          </h2>
        </div>
        
        <div className="flex items-center space-x-4">
          <div className="text-sm text-gray-600">
            Scheduled: {totalScheduled} | Visited: {totalVisited} | Cancelled: {totalCancelled}
          </div>
          <div className="flex space-x-2">
            <Button 
              variant={view === 'day' ? 'default' : 'outline'} 
              size="sm"
              onClick={() => handleViewChange('day')}
            >
              Day
            </Button>
            <Button 
              variant={view === 'week' ? 'default' : 'outline'} 
              size="sm"
              onClick={() => handleViewChange('week')}
            >
              Week
            </Button>
            <Button 
              variant={view === 'month' ? 'default' : 'outline'} 
              size="sm"
              onClick={() => handleViewChange('month')}
            >
              Month
            </Button>
          </div>
        </div>
      </div>

      {/* Calendar Grid */}
      <Card>
        <CardContent className="p-0">
          {renderCalendarGrid()}
        </CardContent>
      </Card>
    </div>
  );
} 