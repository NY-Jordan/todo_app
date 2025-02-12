import { useAppDispatch, useAppSelector } from "@/app/store/hook";
import { faArrowLeft, faBug, faClose, faIndent, faListUl } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {  useForm } from "react-hook-form";
import {  useEffect, useMemo, useState } from "react";
import { useRouter } from "next/router";
import useAuth from "@/Infrastructure/hooks/useAuth";
import { ITask } from "@/domain/entities/task.entities";
import CustomButton from "../../button/CustomButton";
import {motion} from "framer-motion"
import TicketTypeCard from "./TicketTypeCard";
import TicketsInProgress from "./TicketsInProgress";
import TaskTicketDone from "./TaskTicketDone";
import CustomEditor from "../../Editor/CustomEditor";
import CreateTickets from "./CreateTickets";

export default function TaskTicketManagement({active, setActive, task} : {active : boolean, setActive : React.Dispatch<React.SetStateAction<boolean>> , task : ITask}) {

  const { handleSubmit, register, watch, reset } = useForm();
  const dispatch = useAppDispatch();
  const router  = useRouter();
  const {id} = router.query;
  const {user} = useAuth();
  const [switchAction, setSwitchAction] = useState(true);

  

  const visible = {
    width :  '100%', 
    opacity : 1, 
    visibility : 'visible'

    
  }
  const hidden = {
    width :  0 , 
    opacity :  0, 
    visibility : 'hidden',
  }

  const animation = {
    hidden: hidden,
    visible: visible,
  };

  

  return (
    <>
        <input type="checkbox" id="my_modal_6" checked={active} className="modal-toggle" />
        <div className="modal modal-top flex justify-center" role="dialog">
        <div className="modal-box max-w-none w-[60%] mt-[5%] max-h-[80%]  rounded-md overflow-x-hidden">
           <div className="w-full flex justify-between items-center">
              <h3 className="text-xl font-bold">{'Tickets Management'}</h3>
              <a onClick={() => setActive(false)} className="hover:cursor-pointer">
                  <FontAwesomeIcon icon={faClose}  />
              </a>
           </div>
            <div className="space-y-6 mt-8">
              <div className="flex ">
                <motion.div  variants={animation} transition={{ duration : 0.5 }} animate={!switchAction ? 'hidden' : 'visible'} role="tablist" className="tabs tabs-bordered w-fit  ">
                  <input 
                  type="radio" 
                  name="ticket_management" 
                  defaultChecked 
                  role="tab" 
                  className="tab text-lg w-1/2" 
                  aria-label="Ticket(s) In progress" />

                  <div role="tabpanel" className="tab-content p-3 w-full">
                    <TicketsInProgress setActive={setSwitchAction} active={active} task={task} />
                  </div>

                  <input
                    type="radio"
                    name="ticket_management"
                    role="tab"
                    className="tab text-lg"
                    aria-label="Ticket(s) Done"
                    />
                  <div role="tabpanel" className="tab-content p-10 ">
                    <TaskTicketDone setActive={setSwitchAction} active={active} task={task}  />
                  </div>

                </motion.div>

                <motion.div  variants={animation} animate={switchAction ? 'hidden' : 'visible'} className="w-full  p-1 h-full">
                    <div>
                      <button onClick={() => setSwitchAction(true)} className=" hover:cursor-pointer"><FontAwesomeIcon size="xl" icon={faArrowLeft} /> </button>
                    </div>
                    <CreateTickets task={task} />
                </motion.div>

              </div>
             

            </div>
           
        </div>
        </div>
    </>
  )
}




