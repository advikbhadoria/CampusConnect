import { useState } from 'react';
import { ChevronLeft, ChevronRight, Calendar as CalendarIcon, MapPin, Clock, X, Info, CheckCircle2, AlertCircle, ExternalLink } from 'lucide-react';
import type { ClubEvent } from '../data/clubs';

interface CalendarProps {
  events: ClubEvent[];
}

export function Calendar({ events }: CalendarProps) {
  const [currentDate, setCurrentDate] = useState(new Date(2026, 9, 1)); // Oct 2026 as base since events are mostly in 2026
  const [selectedEvent, setSelectedEvent] = useState<ClubEvent | null>(null);
  const [showModal, setShowModal] = useState(false);

  const getDaysInMonth = (year: number, month: number) => new Date(year, month + 1, 0).getDate();
  const getFirstDayOfMonth = (year: number, month: number) => new Date(year, month, 1).getDay();

  const daysInMonth = getDaysInMonth(currentDate.getFullYear(), currentDate.getMonth());
  const firstDay = getFirstDayOfMonth(currentDate.getFullYear(), currentDate.getMonth());

  const prevMonth = () => setCurrentDate(new Date(currentDate.getFullYear(), currentDate.getMonth() - 1, 1));
  const nextMonth = () => setCurrentDate(new Date(currentDate.getFullYear(), currentDate.getMonth() + 1, 1));

  const monthNames = ["January", "February", "March", "April", "May", "June", "July", "August", "September", "October", "November", "December"];
  const days = ['Sun', 'Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat'];

  // Map events by day (for current month and year)
  const eventsByDay: Record<number, ClubEvent[]> = {};
  events.forEach(event => {
    const eventDate = new Date(event.date);
    if (eventDate.getFullYear() === currentDate.getFullYear() && eventDate.getMonth() === currentDate.getMonth()) {
      const day = eventDate.getDate();
      if (!eventsByDay[day]) eventsByDay[day] = [];
      eventsByDay[day].push(event);
    }
  });

  return (
    <>
      <div className="flex flex-col lg:flex-row gap-8">
        {/* Calendar Grid */}
        <div className="flex-1 bg-white rounded-2xl border border-slate-100 shadow-sm p-6">
          <div className="flex items-center justify-between mb-6">
            <h3 className="text-lg font-bold text-slate-800">
              {monthNames[currentDate.getMonth()]} {currentDate.getFullYear()}
            </h3>
            <div className="flex gap-2">
              <button onClick={prevMonth} className="p-2 hover:bg-slate-100 rounded-full transition-colors"><ChevronLeft size={20} /></button>
              <button onClick={nextMonth} className="p-2 hover:bg-slate-100 rounded-full transition-colors"><ChevronRight size={20} /></button>
            </div>
          </div>

          <div className="grid grid-cols-7 gap-1 mb-2">
            {days.map(day => (
              <div key={day} className="text-center text-xs font-semibold text-slate-400 py-2">
                {day}
              </div>
            ))}
          </div>

          <div className="grid grid-cols-7 gap-1">
            {Array.from({ length: firstDay }).map((_, i) => (
              <div key={`empty-${i}`} className="p-2 h-14 bg-slate-50/50 rounded-lg"></div>
            ))}
            {Array.from({ length: daysInMonth }).map((_, i) => {
              const day = i + 1;
              const dayEvents = eventsByDay[day];
              const hasEvents = dayEvents && dayEvents.length > 0;
              
              return (
                <div 
                  key={day} 
                  onClick={() => {
                    if (hasEvents) {
                      setSelectedEvent(dayEvents[0]);
                      setShowModal(true);
                    }
                  }}
                  className={`relative p-2 h-14 rounded-lg flex flex-col items-center justify-center border transition-all ${
                    hasEvents 
                      ? 'border-purple-200 bg-purple-50 cursor-pointer hover:bg-purple-100' 
                      : 'border-transparent hover:bg-slate-50'
                  }`}
                >
                  <span className={`text-sm font-medium ${hasEvents ? 'text-purple-700' : 'text-slate-600'}`}>{day}</span>
                  {hasEvents && (
                    <div className="absolute bottom-2 flex gap-1">
                      {dayEvents.map((_, idx) => (
                        <span key={idx} className="w-1.5 h-1.5 rounded-full bg-purple-500"></span>
                      ))}
                    </div>
                  )}
                </div>
              );
            })}
          </div>
        </div>

        {/* Event Details Panel */}
        <div className="w-full lg:w-80 flex-shrink-0">
          <h3 className="text-lg font-bold text-slate-800 mb-4 flex items-center gap-2">
            <CalendarIcon className="text-purple-500" size={20} /> Upcoming Events
          </h3>
          
          {events.filter(e => e.isUpcoming).length > 0 ? (
            <div className="space-y-4">
              {events.filter(e => e.isUpcoming).slice(0, 3).map(event => (
                <div 
                  key={event.id}
                  onClick={() => {
                    setSelectedEvent(event);
                    setShowModal(true);
                  }}
                  className="bg-white rounded-xl border border-slate-100 p-4 hover:border-purple-200 hover:shadow-md cursor-pointer transition-all"
                >
                  <h4 className="font-bold text-slate-800 text-sm mb-2">{event.title}</h4>
                  <div className="flex justify-between items-center text-xs text-slate-500">
                    <span className="flex items-center gap-1"><CalendarIcon size={12}/> {event.date}</span>
                    <span className="flex items-center gap-1"><Clock size={12}/> {event.time}</span>
                  </div>
                </div>
              ))}
            </div>
          ) : (
            <div className="bg-slate-50 border border-slate-200 rounded-2xl border-dashed p-8 text-center flex flex-col items-center justify-center text-slate-500 h-full min-h-[250px]">
              <CalendarIcon size={32} className="mb-3 text-slate-300" />
              <p>No upcoming events currently scheduled.</p>
            </div>
          )}
        </div>
      </div>

      {/* Full Screen Modal */}
      {showModal && selectedEvent && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 sm:p-6 md:p-12 bg-slate-900/60 backdrop-blur-sm overflow-y-auto">
          <div className="bg-white w-full max-w-4xl max-h-[90vh] overflow-y-auto rounded-3xl shadow-2xl relative flex flex-col animate-in fade-in zoom-in-95 duration-200">
            {/* Header */}
            <div className="sticky top-0 z-10 bg-white/80 backdrop-blur-md border-b border-slate-100 px-6 py-4 flex justify-between items-center">
              <div className="flex items-center gap-3">
                <div className={`px-3 py-1 rounded-full text-xs font-bold uppercase tracking-wider ${selectedEvent.isUpcoming ? 'bg-purple-100 text-purple-700' : 'bg-slate-100 text-slate-600'}`}>
                  {selectedEvent.isUpcoming ? 'Upcoming Event' : 'Past Event'}
                </div>
              </div>
              <button 
                onClick={() => setShowModal(false)}
                className="p-2 bg-slate-100 hover:bg-slate-200 text-slate-600 rounded-full transition-colors"
              >
                <X size={20} />
              </button>
            </div>

            {/* Content */}
            <div className="p-6 md:p-10 space-y-8">
              <div>
                <h2 className="text-3xl md:text-4xl font-extrabold text-slate-900 mb-6">{selectedEvent.title}</h2>
                <div className="flex flex-wrap gap-4 text-sm font-medium text-slate-600 mb-8 bg-slate-50 p-4 rounded-xl border border-slate-100">
                  <div className="flex items-center gap-2"><CalendarIcon size={18} className="text-purple-500"/> {selectedEvent.date}</div>
                  <div className="hidden sm:block text-slate-300">|</div>
                  <div className="flex items-center gap-2"><Clock size={18} className="text-blue-500"/> {selectedEvent.time}</div>
                  <div className="hidden sm:block text-slate-300">|</div>
                  <div className="flex items-center gap-2"><MapPin size={18} className="text-rose-500"/> {selectedEvent.venue}</div>
                </div>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
                {/* Left Column */}
                <div className="space-y-8">
                  {selectedEvent.description && (
                    <section>
                      <h3 className="text-lg font-bold text-slate-800 mb-3 flex items-center gap-2">
                        <Info className="text-blue-500" size={20} /> Description
                      </h3>
                      <p className="text-slate-600 leading-relaxed">{selectedEvent.description}</p>
                    </section>
                  )}

                  {selectedEvent.eligibility && (
                    <section>
                      <h3 className="text-lg font-bold text-slate-800 mb-3 flex items-center gap-2">
                        <CheckCircle2 className="text-emerald-500" size={20} /> Eligibility
                      </h3>
                      <p className="text-slate-600 leading-relaxed bg-emerald-50 text-emerald-800 p-4 rounded-xl border border-emerald-100">
                        {selectedEvent.eligibility}
                      </p>
                    </section>
                  )}
                </div>

                {/* Right Column */}
                <div className="space-y-8">
                  {selectedEvent.rules && selectedEvent.rules.length > 0 && (
                    <section>
                      <h3 className="text-lg font-bold text-slate-800 mb-3 flex items-center gap-2">
                        <AlertCircle className="text-amber-500" size={20} /> Rules & Instructions
                      </h3>
                      <ul className="space-y-2">
                        {selectedEvent.rules.map((rule, idx) => (
                          <li key={idx} className="flex items-start gap-3 text-slate-600 bg-amber-50/50 p-3 rounded-lg border border-amber-100/50">
                            <span className="w-1.5 h-1.5 rounded-full bg-amber-400 mt-2 flex-shrink-0"></span>
                            <span>{rule}</span>
                          </li>
                        ))}
                      </ul>
                    </section>
                  )}

                  {selectedEvent.registrationSteps && selectedEvent.registrationSteps.length > 0 && (
                    <section>
                      <h3 className="text-lg font-bold text-slate-800 mb-3">Registration Steps</h3>
                      <div className="space-y-3">
                        {selectedEvent.registrationSteps.map((step, idx) => (
                          <div key={idx} className="flex items-start gap-3">
                            <div className="w-6 h-6 rounded-full bg-purple-100 text-purple-700 flex items-center justify-center text-xs font-bold flex-shrink-0">
                              {idx + 1}
                            </div>
                            <p className="text-slate-600 pt-0.5">{step}</p>
                          </div>
                        ))}
                      </div>
                    </section>
                  )}
                </div>
              </div>

              {/* Action Buttons */}
              <div className="pt-8 mt-8 border-t border-slate-100 flex flex-col sm:flex-row gap-4 justify-end">
                <button 
                  onClick={() => setShowModal(false)}
                  className="px-6 py-3 rounded-xl font-bold text-slate-600 bg-slate-100 hover:bg-slate-200 transition-colors"
                >
                  Close
                </button>
                {selectedEvent.isUpcoming && selectedEvent.registrationLink && (
                  <a 
                    href={selectedEvent.registrationLink}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="px-8 py-3 rounded-xl font-bold text-white bg-purple-600 hover:bg-purple-700 transition-colors shadow-lg shadow-purple-200 flex items-center justify-center gap-2 group"
                  >
                    Register Now <ExternalLink size={18} className="group-hover:translate-x-0.5 group-hover:-translate-y-0.5 transition-transform" />
                  </a>
                )}
              </div>
            </div>
          </div>
        </div>
      )}
    </>
  );
}
