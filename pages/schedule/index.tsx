import Image from "next/image";
import localFont from "next/font/local";
import Layout from "@/presentation/layout/Layout";
import FullCalendar from "@fullcalendar/react";
import dayGridPlugin from '@fullcalendar/daygrid'
import { EventContentArg } from "@fullcalendar/core/index.js";
import { fetchGoogleEvents } from "@/Infrastructure/Services/GoogleCalendarService";
import React, { useEffect, useState } from "react";
import timeGridPlugin from '@fullcalendar/timegrid'; 
import { useAppSelector } from "@/app/store/hook";
import { GoogleEventInterface } from "@/domain/entities/events.entities";
import moment from "moment";



export default function index() {

  useEffect(() => {
    fetchGoogleEvents()
  }, [])

  const googleCalendarEventsState : GoogleEventInterface[] = useAppSelector(state  => state.googleCalendar).events
  const events = googleCalendarEventsState ? googleCalendarEventsState.map((item) => {
    return  { title: item.summary,
      start  : moment(item.start.dateTime).format('YYYY-MM-DD hh:mm'),
      end  : moment(item.end.dateTime).format('YYYY-MM-DD hh:mm') , 
      description: item.description,
    }            
  }) : [];

  
 
  return (
  <Layout pageTitle="Schedule">
    <div className="flex items-center space-x-6 ml-10">
      <div>
        <span ><a>Request</a></span>
      </div>
      <div>
        <span className="text-indigo-800 font-medium"><a>Request</a></span>
      </div>
      <div>
        <span ><a>Request</a></span>
      </div>
    </div>
    <div className="divider"></div>
    <FullCalendar
      plugins={[ dayGridPlugin, timeGridPlugin ]}
      initialView="timeGridWeek" // Affiche la vue semaine avec les horaires
      height={'75%'}
      fixedWeekCount={false}
      eventContent={renderEventContent}
      eventClassNames={'bg-white border-white h-[50%]'}
      eventMinHeight={300}
      events={events}
      slotLabelFormat={{
        hour: '2-digit', // Affiche l'heure
        minute: '2-digit', // Affiche les minutes
        meridiem: 'short', // Affiche AM/PM si tu veux en format 12h
      }}
      allDaySlot={false} // Optionnel: Si tu ne veux pas de créneau "journée complète"
    />
  </Layout>
  );
}


function renderEventContent(eventInfo : EventContentArg) {
  return(
    <div className="  border-blue-200 lg:h-full h-full  hover:cursor-pointer ">
      <div className="w-1/3"></div>
      <div className=" py-3 w-full  bg-blue-600  h-full px-2 flex justify-start items-center space-x-2">
              <div className="avatar-group -space-x-4 rtl:space-x-reverse">
                </div>
               <div className=" flex flex-col">
                    <span className="">{eventInfo.event.title}</span>
                    <span className="">{eventInfo.timeText}</span>
               </div>
      </div>
    </div>
  )
}