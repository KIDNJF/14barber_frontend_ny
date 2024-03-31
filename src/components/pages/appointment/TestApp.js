import FullCalendar from "@fullcalendar/react";
import daygridPlugin from "@fullcalendar/daygrid";
import interactionPlugin from "@fullcalendar/interaction";
import listPlugin from "@fullcalendar/list";

const TestApp = () => {
  return (
    <div className="mt-24 ml-52 bg-green-500">
      {/* <FullCalendar plugins={[daygridPlugin]} /> */}
      <FullCalendar
        headerToolbar={{
          start: "today prev next",
          end: "dayGridMonth dayGridWeek dayGridDay listWeek",
        }}
        //  events={showData}
        plugins={[daygridPlugin, interactionPlugin, listPlugin]}
        views={["dayGridMonth", "dayGridWeek", "dayGridDay"]}
      />
    </div>
  );
};

export default TestApp;
