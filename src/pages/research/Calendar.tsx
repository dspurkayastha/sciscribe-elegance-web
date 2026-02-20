
import { useState } from "react";
import ResearchLayout from "@/components/research/ResearchLayout";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Avatar, AvatarFallback } from "@/components/ui/avatar";
import { 
  ChevronLeft, ChevronRight, Plus, Calendar as CalendarIcon,
  Clock, MapPin, Users, Video, FileText, MoreHorizontal
} from "lucide-react";

const months = [
  "January", "February", "March", "April", "May", "June",
  "July", "August", "September", "October", "November", "December"
];

const sampleEvents = [
  {
    id: 1,
    title: "Project Kickoff Meeting",
    type: "meeting",
    project: "Protein Folding Analysis",
    date: "2024-01-10",
    time: "09:00",
    duration: "1h",
    location: "Conference Room A",
    attendees: [
      { name: "Dr. Smith", avatar: "DS" },
      { name: "Dr. Johnson", avatar: "DJ" },
      { name: "Dr. Wilson", avatar: "DW" }
    ],
    color: "bg-blue-500"
  },
  {
    id: 2,
    title: "Data Analysis Review",
    type: "review",
    project: "Clinical Trial Data Management",
    date: "2024-01-12",
    time: "14:00",
    duration: "2h",
    location: "Virtual",
    attendees: [
      { name: "Dr. Brown", avatar: "DB" },
      { name: "Dr. Davis", avatar: "DD" }
    ],
    color: "bg-green-500"
  },
  {
    id: 3,
    title: "Manuscript Deadline",
    type: "deadline",
    project: "Gene Expression Study",
    date: "2024-01-15",
    time: "23:59",
    duration: "",
    location: "",
    attendees: [
      { name: "Dr. Garcia", avatar: "DG" },
      { name: "Dr. Taylor", avatar: "DT" }
    ],
    color: "bg-red-500"
  },
  {
    id: 4,
    title: "Weekly Team Standup",
    type: "meeting",
    project: "General",
    date: "2024-01-16",
    time: "10:00",
    duration: "30m",
    location: "Conference Room B",
    attendees: [
      { name: "Dr. Smith", avatar: "DS" },
      { name: "Dr. Brown", avatar: "DB" },
      { name: "Dr. Garcia", avatar: "DG" }
    ],
    color: "bg-purple-500"
  }
];

export default function CalendarPage() {
  const [currentDate, setCurrentDate] = useState(new Date());
  const [viewMode, setViewMode] = useState<"month" | "week" | "day">("month");
  const [selectedDate, setSelectedDate] = useState<Date | null>(null);

  const currentMonth = currentDate.getMonth();
  const currentYear = currentDate.getFullYear();

  const navigateMonth = (direction: "prev" | "next") => {
    const newDate = new Date(currentDate);
    if (direction === "prev") {
      newDate.setMonth(currentMonth - 1);
    } else {
      newDate.setMonth(currentMonth + 1);
    }
    setCurrentDate(newDate);
  };

  const getDaysInMonth = (date: Date) => {
    const year = date.getFullYear();
    const month = date.getMonth();
    const firstDay = new Date(year, month, 1);
    const lastDay = new Date(year, month + 1, 0);
    const daysInMonth = lastDay.getDate();
    const startingDayOfWeek = firstDay.getDay();

    const days = [];
    
    // Previous month's trailing days
    for (let i = 0; i < startingDayOfWeek; i++) {
      const prevDate = new Date(year, month, -startingDayOfWeek + i + 1);
      days.push({ date: prevDate, isCurrentMonth: false });
    }
    
    // Current month's days
    for (let i = 1; i <= daysInMonth; i++) {
      days.push({ date: new Date(year, month, i), isCurrentMonth: true });
    }
    
    // Next month's leading days
    const remainingDays = 42 - days.length; // 6 weeks * 7 days
    for (let i = 1; i <= remainingDays; i++) {
      days.push({ date: new Date(year, month + 1, i), isCurrentMonth: false });
    }
    
    return days;
  };

  const getEventsForDate = (date: Date) => {
    const dateStr = date.toISOString().split('T')[0];
    return sampleEvents.filter(event => event.date === dateStr);
  };

  const getEventTypeIcon = (type: string) => {
    switch (type) {
      case "meeting": return <Users className="w-3 h-3" />;
      case "review": return <FileText className="w-3 h-3" />;
      case "deadline": return <Clock className="w-3 h-3" />;
      default: return <CalendarIcon className="w-3 h-3" />;
    }
  };

  const days = getDaysInMonth(currentDate);
  const today = new Date();

  return (
    <ResearchLayout activeView="calendar">
      <div className="p-6 space-y-6">
        {/* Header */}
        <div className="flex items-center justify-between">
          <div>
            <h1 className="text-3xl font-bold text-sciscribe-navy">Calendar</h1>
            <p className="text-sciscribe-slate mt-1">Manage your research schedule and deadlines</p>
          </div>
          <Button className="bg-sciscribe-navy hover:bg-sciscribe-blue text-white">
            <Plus className="w-4 h-4 mr-2" />
            New Event
          </Button>
        </div>

        {/* Calendar Controls */}
        <div className="flex items-center justify-between">
          <div className="flex items-center space-x-4">
            <div className="flex items-center space-x-2">
              <Button variant="outline" size="icon" onClick={() => navigateMonth("prev")}>
                <ChevronLeft className="w-4 h-4" />
              </Button>
              <h2 className="text-xl font-semibold text-sciscribe-navy min-w-[200px] text-center">
                {months[currentMonth]} {currentYear}
              </h2>
              <Button variant="outline" size="icon" onClick={() => navigateMonth("next")}>
                <ChevronRight className="w-4 h-4" />
              </Button>
            </div>
            <Button 
              variant="outline" 
              onClick={() => setCurrentDate(new Date())}
            >
              Today
            </Button>
          </div>

          <div className="flex items-center space-x-2">
            {["month", "week", "day"].map((mode) => (
              <Button
                key={mode}
                variant={viewMode === mode ? "default" : "outline"}
                size="sm"
                onClick={() => setViewMode(mode as any)}
                className={viewMode === mode ? "bg-sciscribe-navy" : ""}
              >
                {mode.charAt(0).toUpperCase() + mode.slice(1)}
              </Button>
            ))}
          </div>
        </div>

        {/* Calendar Grid */}
        <Card>
          <CardContent className="p-0">
            {/* Day Headers */}
            <div className="grid grid-cols-7 border-b">
              {["Sun", "Mon", "Tue", "Wed", "Thu", "Fri", "Sat"].map((day) => (
                <div key={day} className="p-4 text-center font-medium text-sciscribe-navy border-r last:border-r-0">
                  {day}
                </div>
              ))}
            </div>

            {/* Calendar Days */}
            <div className="grid grid-cols-7">
              {days.map((day, index) => {
                const events = getEventsForDate(day.date);
                const isToday = day.date.toDateString() === today.toDateString();
                const isSelected = selectedDate?.toDateString() === day.date.toDateString();

                return (
                  <div
                    key={index}
                    className={`min-h-[120px] p-2 border-r border-b last:border-r-0 cursor-pointer hover:bg-sciscribe-mist/50 ${
                      !day.isCurrentMonth ? "bg-gray-50 text-gray-400" : ""
                    } ${isSelected ? "bg-sciscribe-gold/10" : ""}`}
                    onClick={() => setSelectedDate(day.date)}
                  >
                    <div className={`text-sm font-medium mb-2 ${
                      isToday ? "bg-sciscribe-navy text-white rounded-full w-6 h-6 flex items-center justify-center" : ""
                    }`}>
                      {day.date.getDate()}
                    </div>
                    
                    <div className="space-y-1">
                      {events.slice(0, 3).map((event) => (
                        <div
                          key={event.id}
                          className={`text-xs p-1 rounded text-white truncate ${event.color}`}
                          title={`${event.title} - ${event.time}`}
                        >
                          <div className="flex items-center space-x-1">
                            {getEventTypeIcon(event.type)}
                            <span>{event.title}</span>
                          </div>
                        </div>
                      ))}
                      {events.length > 3 && (
                        <div className="text-xs text-sciscribe-slate">
                          +{events.length - 3} more
                        </div>
                      )}
                    </div>
                  </div>
                );
              })}
            </div>
          </CardContent>
        </Card>

        {/* Upcoming Events */}
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
          <div className="lg:col-span-2">
            <Card>
              <CardHeader>
                <CardTitle className="text-sciscribe-navy">Upcoming Events</CardTitle>
              </CardHeader>
              <CardContent className="space-y-4">
                {sampleEvents.slice(0, 5).map((event) => (
                  <div key={event.id} className="flex items-start space-x-4 p-3 rounded-lg border border-sciscribe-mist hover:border-sciscribe-gold/50 transition-colors">
                    <div className={`w-3 h-3 rounded-full mt-2 ${event.color}`} />
                    
                    <div className="flex-1">
                      <div className="flex items-start justify-between">
                        <div>
                          <h4 className="font-medium text-sciscribe-navy">{event.title}</h4>
                          <p className="text-sm text-sciscribe-slate">{event.project}</p>
                          
                          <div className="flex items-center space-x-4 mt-2 text-sm text-sciscribe-slate">
                            <div className="flex items-center">
                              <CalendarIcon className="w-4 h-4 mr-1" />
                              {event.date}
                            </div>
                            <div className="flex items-center">
                              <Clock className="w-4 h-4 mr-1" />
                              {event.time} {event.duration && `(${event.duration})`}
                            </div>
                            {event.location && (
                              <div className="flex items-center">
                                {event.location === "Virtual" ? (
                                  <Video className="w-4 h-4 mr-1" />
                                ) : (
                                  <MapPin className="w-4 h-4 mr-1" />
                                )}
                                {event.location}
                              </div>
                            )}
                          </div>
                        </div>

                        <div className="flex items-center space-x-2">
                          <div className="flex -space-x-1">
                            {event.attendees.slice(0, 3).map((attendee, index) => (
                              <Avatar key={index} className="w-6 h-6 border-2 border-white">
                                <AvatarFallback className="bg-sciscribe-gold text-xs text-sciscribe-navy">
                                  {attendee.avatar}
                                </AvatarFallback>
                              </Avatar>
                            ))}
                          </div>
                          <Button variant="ghost" size="icon" className="h-8 w-8">
                            <MoreHorizontal className="w-4 h-4" />
                          </Button>
                        </div>
                      </div>
                    </div>
                  </div>
                ))}
              </CardContent>
            </Card>
          </div>

          {/* Event Types Legend */}
          <div>
            <Card>
              <CardHeader>
                <CardTitle className="text-sciscribe-navy">Event Types</CardTitle>
              </CardHeader>
              <CardContent className="space-y-3">
                <div className="flex items-center space-x-3">
                  <div className="w-3 h-3 rounded-full bg-blue-500" />
                  <span className="text-sm text-sciscribe-navy">Meetings</span>
                </div>
                <div className="flex items-center space-x-3">
                  <div className="w-3 h-3 rounded-full bg-green-500" />
                  <span className="text-sm text-sciscribe-navy">Reviews</span>
                </div>
                <div className="flex items-center space-x-3">
                  <div className="w-3 h-3 rounded-full bg-red-500" />
                  <span className="text-sm text-sciscribe-navy">Deadlines</span>
                </div>
                <div className="flex items-center space-x-3">
                  <div className="w-3 h-3 rounded-full bg-purple-500" />
                  <span className="text-sm text-sciscribe-navy">Team Events</span>
                </div>
              </CardContent>
            </Card>

            <Card className="mt-6">
              <CardHeader>
                <CardTitle className="text-sciscribe-navy">Quick Stats</CardTitle>
              </CardHeader>
              <CardContent className="space-y-3">
                <div className="flex justify-between">
                  <span className="text-sm text-sciscribe-slate">This Week</span>
                  <span className="text-sm font-medium text-sciscribe-navy">8 events</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-sm text-sciscribe-slate">Next Week</span>
                  <span className="text-sm font-medium text-sciscribe-navy">12 events</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-sm text-sciscribe-slate">Overdue</span>
                  <span className="text-sm font-medium text-red-600">2 events</span>
                </div>
              </CardContent>
            </Card>
          </div>
        </div>
      </div>
    </ResearchLayout>
  );
}
