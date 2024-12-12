import Image from "next/image";
import localFont from "next/font/local";
import Layout from "@/presentation/layout/Layout";
import FullCalendar from "@fullcalendar/react";
import dayGridPlugin from '@fullcalendar/daygrid' // a plugin!
import { EventContentArg } from "@fullcalendar/core/index.js";



export default function index() {
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
          plugins={[ dayGridPlugin ]}
          initialView="dayGridMonth"
          height={'75%'}
          fixedWeekCount={false}
          eventContent={renderEventContent}
          eventClassNames={'bg-white border-white h-[50%]'}
          eventMinHeight={50}
          events={[
            { title: 'Marketing Happy hour',
              start  : '2024-09-17 10:09',
              end  : '2024-09-19 15:13', 
              description: 'second description',
            },
            { title: 'Meet with the marketing Team',
              start  : '2024-09-22 10:09',
              end  : '2024-09-25 15:13', 
              description: 'second description',

            },
          ]}
        />
  </Layout>
  );
}


function renderEventContent(eventInfo : EventContentArg) {
  return(
    <div className="bg-blue-200  border-blue-200 lg:h-1/2 h-fit rounded-full ">
      <div className="w-1/3"></div>
      <div className="max-w-2/3 py-3 w-2/3 bg-blue-600 rounded-full h-1/2 px-2 flex justify-start items-center space-x-2">
              <div className="avatar-group -space-x-4 rtl:space-x-reverse">
                    <div className="avatar">
                      <div className="w-8">
                        <img src="https://img.daisyui.com/images/stock/photo-1534528741775-53994a69daeb.webp" />
                      </div>
                    </div>
                    <div className="avatar">
                      <div className="w-8">
                        <img src="https://img.daisyui.com/images/stock/photo-1534528741775-53994a69daeb.webp" />
                      </div>
                    </div>
                    <div className="avatar">
                      <div className="w-8">
                        <img src="https://img.daisyui.com/images/stock/photo-1534528741775-53994a69daeb.webp" />
                      </div>
                    </div>
                    <div className="avatar">
                      <div className="w-8">
                        <img src="https://img.daisyui.com/images/stock/photo-1534528741775-53994a69daeb.webp" />
                      </div>
                    </div>
                </div>
               <div className=" flex flex-col">
                    <span className="">{eventInfo.event.title}</span>
                    <span className="">{eventInfo.timeText}</span>
               </div>
      </div>
    </div>
  )
}