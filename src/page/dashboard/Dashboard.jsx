import { React, useState } from "react"
import FullCalendar from "@fullcalendar/react"
import dayGridPlugin from "@fullcalendar/daygrid"
import timeGridPlugin from "@fullcalendar/timegrid"
import interactionPlugin from "@fullcalendar/interaction"
import listPlugin from "@fullcalendar/list"
import EventModal from "../../components/EventModal"
import kaLocale from '@fullcalendar/core/locales/ka'
import "../../assets/css/Dashboard.css"
import tippy from 'tippy.js';
import 'tippy.js/dist/tippy.css';

const Dashboard = () => {
  const user = true
  const [events, setEvents] = useState([
    {
      id: "1",
      name: "გიორგი",
      category: "შეხვედრა",
      branch: "დიდუბე",
      start: "2025-07-24T10:00:00",
      end: "2025-07-24T10:15:00",
      backgroundColor: "#3788d8",
      borderColor: "#3788d8",
    },
    {
      id: "2",
      name: "თამარი",
      category: "დედლაინი",
      branch: "ვაკე",
      start: "2025-07-24T09:30:00",
      end: "2025-07-24T09:45:00",
      backgroundColor: "#f56565",
      borderColor: "#f56565",
    },
    {
      id: "3",
      name: "ნინო",
      category: "ზარი",
      branch: "წყალსადენი",
      start: "2024-12-18T14:00:00",
      end: "2024-12-18T15:00:00",
      backgroundColor: "#48bb78",
      borderColor: "#48bb78",
    },
    {
      id: "4",
      name: "ლევანი",
      category: "ტრენინგი",
      branch: "გლდანი",
      start: "2024-12-22T09:00:00",
      end: "2024-12-22T17:00:00",
      backgroundColor: "#9f7aea",
      borderColor: "#9f7aea",
    },
    {
      id: "5",
      name: "მარიამი",
      category: "წვეულება",
      branch: "რუსთავი",
      start: "2024-12-25T18:00:00",
      end: "2024-12-25T19:00:00",
      backgroundColor: "#ed8936",
      borderColor: "#ed8936",
    },
  ])

  const [selectedEvent, setSelectedEvent] = useState(null)
  const [modalOpened, setModalOpened] = useState(false)


  const handleDateClick = (arg) => {
    if (!user) {
      alert("Please log in to create an event.");
      return;
    } else {
      setSelectedEvent(arg.date)
      setModalOpened(true)
    }
  }

  // Updated to match new EventModal fields
  const handleSaveEvent = ({ name, category, branch }) => {
    const start = selectedEvent;
    const end = new Date(start.getTime() + 15 * 60 * 1000); // Default to 15 mins

    const newEvent = {
      id: Date.now().toString(),
      name,
      category,
      branch,
      start,
      end,
      backgroundColor: "#3788d8",
      borderColor: "#3788d8",
    };

    setEvents([...events, newEvent]);
    setModalOpened(false);
  };

  const handleEventClick = (clickInfo) => {
    setSelectedEvent(clickInfo.event)
    if (window.confirm(`Delete event '${clickInfo.event.extendedProps.name}'?`)) { //what does extended prop do check itt
      setEvents(events.filter((event) => event.id !== clickInfo.event.id))
      setSelectedEvent(null)
    }
  }

  const handleEventDrop = (dropInfo) => {
    const updatedEvents = events.map((event) => {
      if (event.id === dropInfo.event.id) {
        return {
          ...event,
          start: dropInfo.event.start,
          end: dropInfo.event.end,
        }
      }
      return event
    })
    setEvents(updatedEvents)
  }

  const georgianDays = {
    0: "კვი",
    1: "ორშ",
    2: "სამ",
    3: "ოთხ",
    4: "ხუთ",
    5: "პარ",
    6: "შაბ",
  };

  const georgianMonths = [
    "იანვარი", "თებერვალი", "მარტი", "აპრილი", "მაისი", "ივნისი",
    "ივლისი", "აგვისტო", "სექტემბერი", "ოქტომბერი", "ნოემბერი", "დეკემბერი"
  ];

  return (
    <div style={{ position: "relative" }}>
      {/* Inset box-shadow for aria-pressed="true" buttons */}
      <style>
        {`
          button[aria-pressed="true"] {
            box-shadow: inset 0 2px 8px rgba(1, 125, 190, 0.25), 0 0px 0px transparent !important;
          }

          .fc-button-active {
            box-shadow: inset 0 2px 8px rgba(1, 125, 190, 0.25), 0 0px 0px transparent !important;
          }
        `}
      </style>
      {/* Main Dashboard */}
      <div
        style={{
          padding: "20px",
          fontFamily: "Arial, sans-serif",
          backgroundColor: "#f8f9fa",
          minHeight: "100vh",
        }}
      >

        {/* Event Modal */}
        {modalOpened && (
          <EventModal
            open={modalOpened}
            selectedDate={selectedEvent}
            //selectedEvent={selectedEvent}
            onSave={handleSaveEvent}
            onClose={() => {
              setModalOpened(false);
              setSelectedEvent(null);
            }}
          />
        )}

        {/* Calendar */}
        <div
          style={{
            backgroundColor: "white",
            padding: "20px",
            borderRadius: "8px",
            boxShadow: "0 2px 4px rgba(0,0,0,0.1)",
            marginTop: "80px",
          }}
        >
          <FullCalendar
            plugins={[
              dayGridPlugin,
              timeGridPlugin,
              interactionPlugin,
              listPlugin,
            ]}
            initialView="timeGridWeek"
            locales={[kaLocale]}
            locale="ka"
            headerToolbar={{
              left: "prev,next today",
              center: "title",
              right: "dayGridMonth,timeGridWeek,timeGridDay,listWeek",
            }}
            buttonText={{
              today: "დღეს",
              month: "თვე",
              week: "კვირა",
              day: "დღე",
              list: "სია",
            }}
            events={events}
            dateClick={handleDateClick}
            eventClick={handleEventClick}
            eventDrop={handleEventDrop}
            editable={true}
            droppable={true}
            selectable={true}
            selectMirror={true}
            dayMaxEvents={true}
            weekends={true}
            height="auto"
            eventDisplay="block"
            eventContent={arg => {
              const name = arg.event.extendedProps.name;
              const category = arg.event.extendedProps.category;
              return (
                <div style={{ display: "flex", flexDirection: "column", alignItems: "flex-start" }}>
                  <span style={{ color: "	#BEBEBE" }}>{arg.timeText}</span>
                  <span style={{ fontWeight: 500 }}>{name}</span>
                  <span>{category}</span>
                </div>
              );
            }}
            eventTimeFormat={{
              hour: "numeric",
              minute: "2-digit",
              omitZeroMinute: false,
              meridiem: "short",
            }}
            slotDuration="00:15:00"
            slotLabelInterval="00:15:00"
            slotLabelFormat={{
              hour: "numeric",
              minute: "2-digit",
              omitZeroMinute: false,
              meridiem: "short",
            }}
            slotMinTime="09:00:00"
            slotMaxTime="21:15:00"
            eventClassNames="custom-event"
            dayCellClassNames="custom-day-cell"
            
            dayHeaderContent={(arg) => {
            const viewType = arg.view.type;
            const date = arg.date;

            const weekday = georgianDays[date.getDay()];
            const day = date.getDate();
            const month = date.getMonth() + 1;

            if (viewType === "timeGridWeek" || viewType === "timeGridDay") {
              return (
                <div style={{ display: "flex", flexDirection: "row", gap: "4px", alignItems: "center", justifyContent: "between" }}>
                  <span>{weekday}</span>
                  <span style={{ fontSize: "0.9em", fontWeight: "bold", color: "#017dbe" }}>
                    {`${day}/${month}`}
                  </span>
                </div>
              );
            }

            return weekday;
          }}
            titleFormat={arg => {
              const month = georgianMonths[arg.date.month];
              const year = arg.date.year;
              return `${month} ${year}`;
            }}

            //tooltip for events
            eventDidMount={(info) => {
              tippy(info.el, {
                content: `
                  <strong>მომწოდებელი:</strong> ${info.event.extendedProps.name}<br/>
                  <strong>კატეგორია:</strong> ${info.event.extendedProps.category}<br/>
                `,
                allowHTML: true, 
                placement: 'top',
                theme: 'light-border', 
                arrow: true, 
              });
            }}
          />
        </div>
      </div>
    </div>
      
  )
}

export default Dashboard;
