import React, { useEffect } from 'react'
import CustomEditor from '../../Editor/CustomEditor'
import CustomButton from '../../button/CustomButton'
import { Controller, FieldValue, FieldValues, useForm } from 'react-hook-form';
import { createTaskTicket } from '@/Infrastructure/Services/Task/TicketService';
import { ITask } from '@/domain/entities/task.entities';
import { CreateTicketTypeInterface } from '@/domain/entities/ticket.entities';
import { TicketTypeEnum } from '@/domain/enum/TicketTypeEnum';
import { useAppDispatch, useAppSelector } from '@/app/store/hook';
import { StatusStateEnum } from '@/domain/enum/StatusStateEnum';
import toast from 'react-hot-toast';
import { createTicketInit } from '@/app/Actions/TicketsAction';

export default function CreateTickets({task} : {task : ITask}) {
    const { handleSubmit, control, register, watch , reset} = useForm();
    const dispatch = useAppDispatch();
    const createTicketState = useAppSelector(state => state.tickets).create
    const handleCreateTicket = (data : FieldValues) => {
        const options : CreateTicketTypeInterface = {
            title : data.title,
            description : data.description,
            ticket_type_id : parseInt(data.ticket_type_id),
            task_id : task.id,
        }
        dispatch(createTicketInit());
        createTaskTicket(options);
    }

    useEffect(() => {
        if (createTicketState.status === StatusStateEnum.success) {
            reset();
        }
    }, [createTicketState.status])

  return (  
    <form id='create-ticket-form' onSubmit={handleSubmit(handleCreateTicket)}>
      <div>
        <div className="flex  items-center justify-between mt-6">
            <label className=" flex space-x-3 items-center">
                <span className="label ">Sub Tasks</span>
                <input type="radio" value={TicketTypeEnum.SUBTASK}  {...register('ticket_type_id', { required : true })}  className="radio radio-sm" />
            </label>
            <label className=" flex space-x-3 items-center">
                <span className="label ">Bugs</span>
                <input type="radio" value={TicketTypeEnum.BUG} {...register('ticket_type_id', { required : true })}  className="radio radio-sm" />
            </label>
            <label className=" flex space-x-3 items-center">
                <span className="label ">Improvment</span>
                <input type="radio" value={TicketTypeEnum.IMPROVEMENT} {...register('ticket_type_id', { required : true })}  className="radio radio-sm" />
            </label>
            <label className=" flex space-x-3 items-center">
                <span className="label ">Story</span>
                <input type="radio" value={TicketTypeEnum.STORY} {...register('ticket_type_id', { required : true })}  className="radio radio-sm" />
            </label>
        </div>
            <label>
                <span className="label text-lg font-semibold">Title <span className="text-red-400 text-lg">*</span></span>
                <input type="text" {...register('title', { required : true })} className=" input input-lg w-full input-bordered" />
            </label>
            <label>
            <span className="label text-lg font-semibold">Description <span className="text-red-400 text-lg">*</span></span>
                <Controller
                  control={control}
                  name="description"
                  rules={{ required : true }}
                  render={({ field }) => (
                    <CustomEditor onChange={field.onChange} initialValue="" />
                  )}

                 />
               
            </label>
        <div className="flex justify-end mt-3">
            <CustomButton loader={createTicketState.status === StatusStateEnum.loading} form='create-ticket-form' type='submit' text="Submit" size="lg" />
        </div>
        </div>
    </form>
  )
}
