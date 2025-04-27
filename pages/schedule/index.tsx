import Image from "next/image";
import localFont from "next/font/local";
import Layout from "@/presentation/layout/Layout";
import FullCalendar from "@fullcalendar/react";
import dayGridPlugin from '@fullcalendar/daygrid'
import { EventClickArg, EventContentArg } from "@fullcalendar/core/index.js";
import { fetchGoogleEvents } from "@/Infrastructure/Services/GoogleCalendarService";
import React, { useEffect, useState } from "react";
import timeGridPlugin from '@fullcalendar/timegrid'; 
import { useAppSelector } from "@/app/store/hook";
import { GoogleEventInterface } from "@/domain/entities/events.entities";
import moment from "moment";
import { motion } from 'framer-motion';
import EventModalDetails from "@/presentation/components/Schedule/EventModalDetails";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faPlus } from "@fortawesome/free-solid-svg-icons";



export default function index() {
  const [activeModal, setActiveModal] = useState(false);
  const [eventSelected, setEventSelected] = useState<GoogleEventInterface|undefined>(undefined);
  const [eventPosition, setEventPosition]  = useState<{x : number,  y : number}>()

  useEffect(() => {
    fetchGoogleEvents()
  }, [])

  const googleCalendarEventsState : GoogleEventInterface[] = useAppSelector(state  => state.googleCalendar).events
  const events = googleCalendarEventsState ? googleCalendarEventsState.map((item) => {
    return  { 
      id : item.id,
      title: item.summary,
      start  : moment(item.start.dateTime).format('YYYY-MM-DD hh:mm'),
      end  : moment(item.end.dateTime).format('YYYY-MM-DD hh:mm') , 
      description: item.description,
    }            
  }) : [];


  
  const handleClickEvent = (info: EventClickArg) => {
    if (googleCalendarEventsState) {
      const eventElement = info.el;
      
      // Récupérer la position de l'élément de l'événement
      const rect = eventElement.getBoundingClientRect();
      
      // Calcul des positions ajustées de l'événement
      let xPosition = rect.right + window.scrollX - 500 - rect.width; 
      let yPosition = rect.top + window.scrollY;
  
      // Trouver le conteneur parent de l'événement
      const containerElement = eventElement.closest('.container-first'); // Remplacez '.container-class' par la classe ou l'id du conteneur parent
      
      // Si le conteneur existe, vérifiez l'overflow
      if (containerElement) {
        const containerRect = containerElement.getBoundingClientRect();
  
        // Vérification de l'overflow en X par rapport au conteneur
        const isOverflowingX = xPosition < containerRect.left || xPosition + rect.width > containerRect.right;
        
        // Vérification de l'overflow en Y par rapport au conteneur
        const isOverflowingY = yPosition < containerRect.top || yPosition + rect.height > containerRect.bottom;
  
       if (isOverflowingX) {
         xPosition = rect.left + window.scrollX +  rect.width; 

       }
       console.log(isOverflowingY);
       
        // Enregistrer la position de l'événement
        setEventPosition({ x: xPosition, y: yPosition });
  
        // Sélectionner l'événement et afficher le modal
        setEventSelected(googleCalendarEventsState.find((event) => event.id === info.event.id));
        setActiveModal(true);
      }
    }
  }
  
  

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
      allDaySlot={false} 
      eventClick={(info) => handleClickEvent(info)}
    />
    <div>
      <motion.button whileHover={{ scale : 1.1 }}  className=" tooltip absolute w-20 h-20 rounded-full p-2 bg-[#3577c2] z-50 shadow-lg text-white shadow-[#3577c2] left-[90%] bottom-[12%]" >
        <FontAwesomeIcon size="xl" icon={faPlus}  />
      </motion.button>
    </div>
    {eventSelected && eventPosition  ? <EventModalDetails  position={eventPosition} active={activeModal} setActive={setActiveModal} event={eventSelected}  /> : <></>}

  </Layout>
  );
}


function renderEventContent(eventInfo : EventContentArg) {


  return(
    <>
      <motion.div  whileHover={{ scale : 1.1, border : 2 }} className="  border-blue-200 lg:h-full h-full  hover:cursor-pointer ">
        <div className="w-1/3"></div>
        <div className=" py-3 w-full  bg-[#3577c2]  h-full px-2 flex justify-start items-center space-x-2">
                <div className="avatar-group -space-x-4 rtl:space-x-reverse">
                  </div>
                <div className=" flex flex-col">
                      <span className="">{eventInfo.event.title}</span>
                      <span className="">{eventInfo.timeText}</span>
                </div>
        </div>
      </motion.div>
    </>
  )
}