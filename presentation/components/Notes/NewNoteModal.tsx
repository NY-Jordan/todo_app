import React, { useEffect, useRef, useState } from 'react'
import { useAppDispatch, useAppSelector } from '@/app/store/hook';
import { NotificationEnum } from '@/domain/enum/NotificationEnums';
import { NotificationInterface, NotificationInvitationInterface } from '@/domain/entities/notifications.entities';
import { getAllNotification } from '@/Infrastructure/Services/NotificationService';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faClose, faFilePen } from '@fortawesome/free-solid-svg-icons';
import CustomEditor from '../Editor/CustomEditor';
import CustomButton from '../button/CustomButton';
import { Controller, FieldValue, FieldValues, useForm } from 'react-hook-form';
import { type } from 'node:os';
import { createNote } from '@/Infrastructure/Services/NoteService';
import { StatusStateEnum } from '@/domain/enum/StatusStateEnum';
import { createNoteInit } from '@/app/Actions/NoteActions';
import { icon } from '@fortawesome/fontawesome-svg-core';
import Icon from '@mdi/react';

export default function NewNoteModal({active, setActive, color} : {active : boolean, setActive : React.Dispatch<React.SetStateAction<boolean>>, color : string}) {
    const { handleSubmit, register,control,setFocus , watch, reset, formState: { errors }, } = useForm();
    const titleRef = useRef();
    const [isDraft, setIsDraft] = useState<boolean>(false);
   const createNotesState =  useAppSelector(state => state.note).create
    const dispatch = useAppDispatch();
    useEffect(() => {
      setFocus('title')
    }, []);

    useEffect(() => {
      if (createNotesState.status === StatusStateEnum.success) {
        reset();
        setIsDraft(false);
      }
     }, [createNotesState.status]);

    const handleCreateNote = (data : FieldValues) => {
      dispatch(createNoteInit());
      createNote({
        title : data.title,
        description : data.description,
        color : color ,
        is_draft  : isDraft  
      })
    }


    return (
    <>
            <input type="checkbox" id="my_modal_6" checked={active} className="modal-toggle" />
            <div className="modal modal-top backdrop-blur-sm " role="dialog">
            <div className=" mt-10 w-full flex h-full    justify-center">
              <div   className="modal-box  h-fit  overflow-y-hidden p-0 dark:bg-black dark:border-2 dark:border-gray-700 dark:text-white w-[50%]  rounded-md ">
               <form   id='create-note-form' onSubmit={handleSubmit(handleCreateNote)}>
                  <div style={{
                    backgroundColor : color
                      }} className="w-full  p-4 flex justify-between items-center">
                      <h3 className="text-lg font-bold w-3/4"><input  {...register('title', {
                        required : true,
                        
                      })} className={` ${ errors?.title ? 'border border-red-500 focus:border-red-500' : 'border-none   focus:border-transparent focus-within:border-transparent border-transparent' } input input-sm w-full placeholder:text-black text-sm  text-black bg-transparent    focus:outline-0`} placeholder={'Create a Note'} /> </h3>
                      <a className="hover:cursor-pointer" onClick={() => {
                        setActive(false);

                      }}>
                          <FontAwesomeIcon icon={faClose}  />
                      </a>
                  </div>
                    <Controller
                      control={control}
                      name="description"
                      rules={{ required : 'desctiption field is required'}}
                      render={({ field }) => (
                        <CustomEditor initialValue={ field.value || '<p></p>'}  onChange={(e) => field.onChange(e)} classStyle='h-full w-full'   />
                      )}
                    />
               </form>
                  
                <div className='bg-gray-100 py-4  px-3 flex justify-between items-center '>
                    <CustomButton loader={createNotesState.status === StatusStateEnum.loading}  icon={<FontAwesomeIcon icon={faFilePen} />} type='submit' onClick={() => {
                      setIsDraft(true);
                    }} form='create-note-form' variant='dark'  text='Draft' />
                    <CustomButton loader={createNotesState.status === StatusStateEnum.loading} type='submit' form='create-note-form' text='Save' />
                </div>
              </div>
            </div>
            </div>
        </>
  )
}



