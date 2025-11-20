import { useState, useEffect } from 'react';
import { useTheme } from '../context/ThemeContext';
import { useAuth } from '../context/AuthContext';
import supabase from '../supabaseClient';
import toast, { Toaster } from 'react-hot-toast';
import DashboardLayout from '../components/DashboardLayout';

import { ChevronLeft, ChevronRight, Plus, Clock, MapPin, X, Bell, CheckCircle2, Circle, Repeat, Star, AlertCircle } from 'lucide-react';


interface Event {
  id: string;
  title: string;
  description?: string;
  date: string;
  start_time: string;
  end_time: string;
  location?: string;
  type: 'class' | 'assignment' | 'exam' | 'study' | 'personal' | 'meeting';
  color: string;
  priority?: 'low' | 'medium' | 'high';
  reminder_minutes?: number;
  is_recurring?: boolean;
  recurrence_pattern?: 'daily' | 'weekly' | 'monthly';
  completed?: boolean;
  created_at?: string;
}

const SchedulePage = () => {
  const { isDarkMode } = useTheme();
  const { user } = useAuth();
  
  const [currentDate, setCurrentDate] = useState(new Date());
  const [selectedDate, setSelectedDate] = useState<Date | null>(null);
  const [events, setEvents] = useState<Event[]>([]);
  const [showAddEventModal, setShowAddEventModal] = useState(false);
  
  const [newEvent, setNewEvent] = useState({
    title: '',
    description: '',
    date: '',
    start_time: '',
    end_time: '',
    location: '',
    type: 'class' as 'class' | 'assignment' | 'exam' | 'study' | 'personal' | 'meeting',
    color: '#3B82F6',
    priority: 'medium' as 'low' | 'medium' | 'high',
    reminder_minutes: 30,
    is_recurring: false,
    recurrence_pattern: 'weekly' as 'daily' | 'weekly' | 'monthly'
  });

  useEffect(() => {
    if (user) {
      fetchEvents();
    }
  }, [user, currentDate]);

  const fetchEvents = async () => {
    try {
      const { data, error } = await supabase
        .from('calendar_events')
        .select('*')
        .eq('user_id', user?.id)
        .gte('date', getMonthStart(currentDate).toISOString().split('T')[0])
        .lte('date', getMonthEnd(currentDate).toISOString().split('T')[0]);

      if (error) throw error;
      setEvents(data || []);
    } catch (error: any) {
      console.error('Error fetching events:', error);
    }
  };

  const getMonthStart = (date: Date) => {
    return new Date(date.getFullYear(), date.getMonth(), 1);
  };

  const getMonthEnd = (date: Date) => {
    return new Date(date.getFullYear(), date.getMonth() + 1, 0);
  };

  const getDaysInMonth = (date: Date) => {
    const year = date.getFullYear();
    const month = date.getMonth();
    const firstDay = new Date(year, month, 1);
    const lastDay = new Date(year, month + 1, 0);
    const daysInMonth = lastDay.getDate();
    const startingDayOfWeek = firstDay.getDay();

    const days: (Date | null)[] = [];
    
    // Add empty cells for days before month starts
    for (let i = 0; i < startingDayOfWeek; i++) {
      days.push(null);
    }
    
    // Add all days in month
    for (let i = 1; i <= daysInMonth; i++) {
      days.push(new Date(year, month, i));
    }
    
    return days;
  };

  const getEventsForDate = (date: Date | null) => {
    if (!date) return [];
    const dateStr = date.toISOString().split('T')[0];
    return events.filter(event => event.date === dateStr);
  };

  const handlePreviousMonth = () => {
    setCurrentDate(new Date(currentDate.getFullYear(), currentDate.getMonth() - 1));
  };

  const handleNextMonth = () => {
    setCurrentDate(new Date(currentDate.getFullYear(), currentDate.getMonth() + 1));
  };

  const handleToday = () => {
    setCurrentDate(new Date());
  };

  const handleAddEvent = async () => {
    if (!user || !newEvent.title || !newEvent.date) {
      toast.error('Please fill in required fields');
      return;
    }

    try {
      const { data, error } = await supabase
        .from('calendar_events')
        .insert({
          user_id: user.id,
          ...newEvent
        })
        .select()
        .single();

      if (error) throw error;

      setEvents([...events, data]);
      setShowAddEventModal(false);
      setNewEvent({
        title: '',
        description: '',
        date: '',
        start_time: '',
        end_time: '',
        location: '',
        type: 'class',
        color: '#3B82F6',
        priority: 'medium',
        reminder_minutes: 30,
        is_recurring: false,
        recurrence_pattern: 'weekly'
      });
      
      // Dispatch event to refresh dashboard calendar
      window.dispatchEvent(new Event('calendarUpdated'));
      
      toast.success('Event added successfully!');
    } catch (error: any) {
      toast.error('Failed to add event');
      console.error(error);
    }
  };

  const handleDeleteEvent = async (eventId: string) => {
    try {
      const { error } = await supabase
        .from('calendar_events')
        .delete()
        .eq('id', eventId);

      if (error) throw error;

      setEvents(events.filter(e => e.id !== eventId));
      window.dispatchEvent(new Event('calendarUpdated'));
      toast.success('Event deleted');
    } catch (error: any) {
      toast.error('Failed to delete event');
      console.error(error);
    }
  };

  const handleToggleComplete = async (eventId: string, currentStatus: boolean) => {
    try {
      const { error } = await supabase
        .from('calendar_events')
        .update({ completed: !currentStatus })
        .eq('id', eventId);

      if (error) throw error;

      setEvents(events.map(e => 
        e.id === eventId ? { ...e, completed: !currentStatus } : e
      ));
      toast.success(currentStatus ? 'Task marked as incomplete' : 'Task completed! 🎉');
    } catch (error: any) {
      toast.error('Failed to update task');
      console.error(error);
    }
  };

  const getPriorityColor = (priority?: string) => {
    switch (priority) {
      case 'high': return 'text-red-600 bg-red-100 dark:bg-red-900/30';
      case 'medium': return 'text-yellow-600 bg-yellow-100 dark:bg-yellow-900/30';
      case 'low': return 'text-green-600 bg-green-100 dark:bg-green-900/30';
      default: return 'text-gray-600 bg-gray-100 dark:bg-gray-700';
    }
  };

  const getPriorityIcon = (priority?: string) => {
    switch (priority) {
      case 'high': return <AlertCircle size={14} />;
      case 'medium': return <Star size={14} />;
      case 'low': return <Circle size={14} />;
      default: return null;
    }
  };

  const isToday = (date: Date | null) => {
    if (!date) return false;
    const today = new Date();
    return date.toDateString() === today.toDateString();
  };

  const isSelected = (date: Date | null) => {
    if (!date || !selectedDate) return false;
    return date.toDateString() === selectedDate.toDateString();
  };

  const monthNames = ['January', 'February', 'March', 'April', 'May', 'June',
    'July', 'August', 'September', 'October', 'November', 'December'];

  const getEventColor = (type: string) => {
    const colors: { [key: string]: string } = {
      class: 'bg-blue-500',
      assignment: 'bg-orange-500',
      exam: 'bg-red-500',
      study: 'bg-green-500'
    };
    return colors[type] || 'bg-gray-500';
  };

  return (
    <>
      <Toaster position="top-center" reverseOrder={false} />
      <DashboardLayout currentPage="/schedule">
        {/* Calendar Header */}
        <div className="mb-6">
          <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
            <div className="flex items-center gap-4">
              <h2 className={`text-2xl font-bold ${isDarkMode ? 'text-white' : 'text-gray-900'}`}>
                {monthNames[currentDate.getMonth()]} {currentDate.getFullYear()}
              </h2>
              <button
                onClick={handleToday}
                className={`px-4 py-2 rounded-lg text-sm font-medium ${isDarkMode ? 'bg-gray-700 text-white hover:bg-gray-600' : 'bg-gray-200 text-gray-700 hover:bg-gray-300'}`}
              >
                Today
              </button>
            </div>
            
            <div className="flex items-center gap-2">
              <button
                onClick={handlePreviousMonth}
                className={`p-2 rounded-lg ${isDarkMode ? 'hover:bg-gray-700' : 'hover:bg-gray-100'}`}
              >
                <ChevronLeft className={isDarkMode ? 'text-white' : 'text-gray-700'} size={20} />
              </button>
              <button
                onClick={handleNextMonth}
                className={`p-2 rounded-lg ${isDarkMode ? 'hover:bg-gray-700' : 'hover:bg-gray-100'}`}
              >
                <ChevronRight className={isDarkMode ? 'text-white' : 'text-gray-700'} size={20} />
              </button>
              <button
                onClick={() => setShowAddEventModal(true)}
                className="ml-4 px-4 py-2 bg-primary-600 text-white rounded-lg hover:bg-primary-700 flex items-center gap-2"
              >
                <Plus size={20} />
                <span className="hidden sm:inline">Add Event</span>
              </button>
            </div>
          </div>
        </div>

        {/* Calendar Grid */}
        <div className={`${isDarkMode ? 'bg-gray-800' : 'bg-white'} rounded-xl shadow-lg p-4 sm:p-6`}>
          {/* Day Headers */}
          <div className="grid grid-cols-7 gap-2 mb-2">
            {['Sun', 'Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat'].map(day => (
              <div key={day} className={`text-center text-sm font-semibold py-2 ${isDarkMode ? 'text-gray-400' : 'text-gray-600'}`}>
                {day}
              </div>
            ))}
          </div>

          {/* Calendar Days */}
          <div className="grid grid-cols-7 gap-2">
            {getDaysInMonth(currentDate).map((date, index) => {
              const dayEvents = getEventsForDate(date);
              
              return (
                <div
                  key={index}
                  onClick={() => date && setSelectedDate(date)}
                  className={`min-h-[100px] p-2 rounded-lg border cursor-pointer transition-all ${
                    date
                      ? isToday(date)
                        ? 'border-primary-600 bg-primary-50 dark:bg-primary-900/20'
                        : isSelected(date)
                        ? 'border-primary-400 bg-primary-100 dark:bg-primary-900/30'
                        : isDarkMode
                        ? 'border-gray-700 hover:bg-gray-700'
                        : 'border-gray-200 hover:bg-gray-50'
                      : 'border-transparent'
                  }`}
                >
                  {date && (
                    <>
                      <div className={`text-sm font-semibold mb-1 ${
                        isToday(date)
                          ? 'text-primary-600'
                          : isDarkMode
                          ? 'text-white'
                          : 'text-gray-900'
                      }`}>
                        {date.getDate()}
                      </div>
                      <div className="space-y-1">
                        {dayEvents.slice(0, 2).map(event => (
                          <div
                            key={event.id}
                            className={`text-xs px-2 py-1 rounded text-white truncate ${getEventColor(event.type)}`}
                            title={event.title}
                          >
                            {event.title}
                          </div>
                        ))}
                        {dayEvents.length > 2 && (
                          <div className={`text-xs ${isDarkMode ? 'text-gray-400' : 'text-gray-600'}`}>
                            +{dayEvents.length - 2} more
                          </div>
                        )}
                      </div>
                    </>
                  )}
                </div>
              );
            })}
          </div>
        </div>

        {/* Selected Date Events */}
        {selectedDate && (
          <div className={`mt-6 ${isDarkMode ? 'bg-gray-800' : 'bg-white'} rounded-xl shadow-lg p-6`}>
            <h3 className={`text-xl font-bold mb-4 ${isDarkMode ? 'text-white' : 'text-gray-900'}`}>
              Events for {selectedDate.toLocaleDateString('en-US', { weekday: 'long', month: 'long', day: 'numeric' })}
            </h3>
            
            {getEventsForDate(selectedDate).length === 0 ? (
              <p className={`text-center py-8 ${isDarkMode ? 'text-gray-400' : 'text-gray-600'}`}>
                No events scheduled for this day
              </p>
            ) : (
              <div className="space-y-3">
                {getEventsForDate(selectedDate).map(event => (
                  <div
                    key={event.id}
                    className={`p-4 rounded-lg border-l-4 ${
                      isDarkMode ? 'bg-gray-700' : 'bg-gray-50'
                    } ${event.completed ? 'opacity-60' : ''}`}
                    style={{ borderLeftColor: event.color }}
                  >
                    <div className="flex items-start justify-between gap-3">
                      <div className="flex-1">
                        {/* Title and Type Badge */}
                        <div className="flex items-center gap-2 mb-2">
                          <h4 className={`font-semibold ${
                            isDarkMode ? 'text-white' : 'text-gray-900'
                          } ${event.completed ? 'line-through' : ''}`}>
                            {event.title}
                          </h4>
                          <span className={`px-2 py-0.5 rounded-full text-xs font-medium ${getEventColor(event.type)} text-white`}>
                            {event.type}
                          </span>
                          {event.priority && (
                            <span className={`px-2 py-0.5 rounded-full text-xs font-medium flex items-center gap-1 ${getPriorityColor(event.priority)}`}>
                              {getPriorityIcon(event.priority)}
                              {event.priority}
                            </span>
                          )}
                          {event.completed && (
                            <span className="px-2 py-0.5 rounded-full text-xs font-medium bg-green-100 text-green-700 dark:bg-green-900/30 dark:text-green-400 flex items-center gap-1">
                              <CheckCircle2 size={12} />
                              Completed
                            </span>
                          )}
                        </div>

                        {/* Description */}
                        {event.description && (
                          <p className={`text-sm mt-1 mb-3 ${isDarkMode ? 'text-gray-400' : 'text-gray-600'}`}>
                            {event.description}
                          </p>
                        )}

                        {/* Event Details */}
                        <div className={`flex flex-wrap gap-4 text-sm ${isDarkMode ? 'text-gray-400' : 'text-gray-600'}`}>
                          {event.start_time && (
                            <div className="flex items-center gap-1">
                              <Clock size={14} />
                              <span>{event.start_time} {event.end_time && `- ${event.end_time}`}</span>
                            </div>
                          )}
                          {event.location && (
                            <div className="flex items-center gap-1">
                              <MapPin size={14} />
                              <span>{event.location}</span>
                            </div>
                          )}
                          {event.reminder_minutes && event.reminder_minutes > 0 && (
                            <div className="flex items-center gap-1">
                              <Bell size={14} />
                              <span>
                                {event.reminder_minutes >= 1440 
                                  ? `${Math.floor(event.reminder_minutes / 1440)} day${Math.floor(event.reminder_minutes / 1440) > 1 ? 's' : ''} before`
                                  : event.reminder_minutes >= 60
                                  ? `${Math.floor(event.reminder_minutes / 60)} hour${Math.floor(event.reminder_minutes / 60) > 1 ? 's' : ''} before`
                                  : `${event.reminder_minutes} min before`
                                }
                              </span>
                            </div>
                          )}
                          {event.is_recurring && (
                            <div className="flex items-center gap-1">
                              <Repeat size={14} />
                              <span className="capitalize">{event.recurrence_pattern}</span>
                            </div>
                          )}
                        </div>
                      </div>

                      {/* Action Buttons */}
                      <div className="flex items-start gap-2">
                        <button
                          onClick={() => handleToggleComplete(event.id, event.completed || false)}
                          className={`p-2 rounded-lg transition-colors ${
                            event.completed
                              ? 'text-green-600 bg-green-100 dark:bg-green-900/30 hover:bg-green-200'
                              : isDarkMode 
                              ? 'text-gray-400 hover:bg-gray-600' 
                              : 'text-gray-500 hover:bg-gray-200'
                          }`}
                          title={event.completed ? 'Mark as incomplete' : 'Mark as complete'}
                        >
                          {event.completed ? <CheckCircle2 size={20} /> : <Circle size={20} />}
                        </button>
                        <button
                          onClick={() => handleDeleteEvent(event.id)}
                          className="p-2 rounded-lg text-red-500 hover:bg-red-100 dark:hover:bg-red-900/30 transition-colors"
                          title="Delete event"
                        >
                          <X size={20} />
                        </button>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            )}
          </div>
        )}

        {/* Add Event Modal */}
        {showAddEventModal && (
          <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50 p-4">
            <div className={`${isDarkMode ? 'bg-gray-800' : 'bg-white'} rounded-xl p-6 max-w-md w-full max-h-[90vh] overflow-y-auto`}>
              <div className="flex items-center justify-between mb-4">
                <h3 className={`text-xl font-bold ${isDarkMode ? 'text-white' : 'text-gray-900'}`}>
                  Add New Event
                </h3>
                <button
                  onClick={() => setShowAddEventModal(false)}
                  className={`p-2 rounded-lg ${isDarkMode ? 'hover:bg-gray-700' : 'hover:bg-gray-100'}`}
                >
                  <X className={isDarkMode ? 'text-white' : 'text-gray-700'} size={20} />
                </button>
              </div>

              <div className="space-y-4">
                <div>
                  <label className={`block text-sm font-medium mb-2 ${isDarkMode ? 'text-gray-300' : 'text-gray-700'}`}>
                    Event Title *
                  </label>
                  <input
                    type="text"
                    value={newEvent.title}
                    onChange={(e) => setNewEvent({ ...newEvent, title: e.target.value })}
                    className={`w-full px-4 py-2 rounded-lg border ${isDarkMode ? 'bg-gray-700 border-gray-600 text-white' : 'bg-white border-gray-300'} focus:ring-2 focus:ring-primary-500`}
                    placeholder="Enter event title"
                  />
                </div>

                <div>
                  <label className={`block text-sm font-medium mb-2 ${isDarkMode ? 'text-gray-300' : 'text-gray-700'}`}>
                    Description
                  </label>
                  <textarea
                    value={newEvent.description}
                    onChange={(e) => setNewEvent({ ...newEvent, description: e.target.value })}
                    className={`w-full px-4 py-2 rounded-lg border ${isDarkMode ? 'bg-gray-700 border-gray-600 text-white' : 'bg-white border-gray-300'} focus:ring-2 focus:ring-primary-500`}
                    rows={3}
                    placeholder="Enter description"
                  />
                </div>

                <div>
                  <label className={`block text-sm font-medium mb-2 ${isDarkMode ? 'text-gray-300' : 'text-gray-700'}`}>
                    Event Type
                  </label>
                  <select
                    value={newEvent.type}
                    onChange={(e) => setNewEvent({ ...newEvent, type: e.target.value as any })}
                    className={`w-full px-4 py-2 rounded-lg border ${isDarkMode ? 'bg-gray-700 border-gray-600 text-white' : 'bg-white border-gray-300'} focus:ring-2 focus:ring-primary-500`}
                  >
                    <option value="class">Class</option>
                    <option value="assignment">Assignment</option>
                    <option value="exam">Exam</option>
                    <option value="study">Study Session</option>
                  </select>
                </div>

                <div>
                  <label className={`block text-sm font-medium mb-2 ${isDarkMode ? 'text-gray-300' : 'text-gray-700'}`}>
                    Date *
                  </label>
                  <input
                    type="date"
                    value={newEvent.date}
                    onChange={(e) => setNewEvent({ ...newEvent, date: e.target.value })}
                    className={`w-full px-4 py-2 rounded-lg border ${isDarkMode ? 'bg-gray-700 border-gray-600 text-white' : 'bg-white border-gray-300'} focus:ring-2 focus:ring-primary-500`}
                  />
                </div>

                <div className="grid grid-cols-2 gap-4">
                  <div>
                    <label className={`block text-sm font-medium mb-2 ${isDarkMode ? 'text-gray-300' : 'text-gray-700'}`}>
                      Start Time
                    </label>
                    <input
                      type="time"
                      value={newEvent.start_time}
                      onChange={(e) => setNewEvent({ ...newEvent, start_time: e.target.value })}
                      className={`w-full px-4 py-2 rounded-lg border ${isDarkMode ? 'bg-gray-700 border-gray-600 text-white' : 'bg-white border-gray-300'} focus:ring-2 focus:ring-primary-500`}
                    />
                  </div>
                  <div>
                    <label className={`block text-sm font-medium mb-2 ${isDarkMode ? 'text-gray-300' : 'text-gray-700'}`}>
                      End Time
                    </label>
                    <input
                      type="time"
                      value={newEvent.end_time}
                      onChange={(e) => setNewEvent({ ...newEvent, end_time: e.target.value })}
                      className={`w-full px-4 py-2 rounded-lg border ${isDarkMode ? 'bg-gray-700 border-gray-600 text-white' : 'bg-white border-gray-300'} focus:ring-2 focus:ring-primary-500`}
                    />
                  </div>
                </div>

                <div>
                  <label className={`block text-sm font-medium mb-2 ${isDarkMode ? 'text-gray-300' : 'text-gray-700'}`}>
                    Location
                  </label>
                  <input
                    type="text"
                    value={newEvent.location}
                    onChange={(e) => setNewEvent({ ...newEvent, location: e.target.value })}
                    className={`w-full px-4 py-2 rounded-lg border ${isDarkMode ? 'bg-gray-700 border-gray-600 text-white' : 'bg-white border-gray-300'} focus:ring-2 focus:ring-primary-500`}
                    placeholder="Enter location"
                  />
                </div>

                <div className="flex gap-3 pt-4">
                  <button
                    onClick={() => setShowAddEventModal(false)}
                    className={`flex-1 px-4 py-2 rounded-lg font-medium ${isDarkMode ? 'bg-gray-700 text-white hover:bg-gray-600' : 'bg-gray-200 text-gray-700 hover:bg-gray-300'}`}
                  >
                    Cancel
                  </button>
                  <button
                    onClick={handleAddEvent}
                    className="flex-1 px-4 py-2 bg-primary-600 text-white rounded-lg font-medium hover:bg-primary-700"
                  >
                    Add Event
                  </button>
                </div>
              </div>
            </div>
          </div>
        )}
      </DashboardLayout>
    </>
  );
};

export default SchedulePage;
