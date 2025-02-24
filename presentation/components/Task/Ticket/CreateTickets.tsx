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
import { error } from 'console';

export default function CreateTickets({task} : {task : ITask}) {
    const { handleSubmit, control, register, watch , reset, formState : {errors}} = useForm();
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

    console.log(errors);
    
  return (  
    <form id='create-ticket-form' onSubmit={handleSubmit(handleCreateTicket)}>
      <div className='h-full w-full'>
        <div className='mt-3'>
            <span className=" text-sm font-semibold">Ticket Type <span className="text-red-400 text-lg">*</span></span>
            <div className="flex  items-center justify-between ">
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
            {errors.ticket_type_id && <span className='text-red-400 text-sm'>{'Please Choose one ticket type'}</span>}
        </div>
        <div className='space-y-10 mt-2'>
            <div className='my-4'>
                <span className=" text-sm font-semibold">Title <span className="text-red-400 text-lg">*</span></span>
                <input type="text" {...register('title', { required : 'title field is required', minLength: {
              value: 10,
              message: "Title must be at least 10 characters long"
            } })} className=" input input-md w-full input-bordered" />
                {errors.title?.type  && <span className='text-red-400 text-sm'>{errors.title.message?.toString()}</span>}
            </div>

            <div className='my-4'>
                <span className="  text-sm font-semibold">Description <span className="text-red-400 text-lg">*</span></span>
                <Controller
                    control={control}
                    name="description"
                    rules={{ required : 'desctiption field is required', maxLength: {
                        value: 300,
                        message: "The password must have a maximum of 100 characters"
                      }, minLength: {
                        value: 25,
                        message: "Title must be at least 25 characters long"
                      } }}
                    render={({ field }) => (
                        <CustomEditor  onChange={field.onChange} initialValue={field.value} />
                    )}
                />
                <div className='text-sm'>Max : 300 characters</div>     
                {errors.description && <span className='text-red-400 text-sm'>{errors.description.message?.toString()}</span>}
            </div>
        </div>
        <div className="flex justify-end mt-3">
            <CustomButton loader={createTicketState.status === StatusStateEnum.loading} form='create-ticket-form' type='submit' text="Submit" size="lg" />
        </div>
        </div>
    </form>
  )
}
