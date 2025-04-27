import React, { useEffect, useRef, useState } from 'react'
import { useAppDispatch, useAppSelector } from '@/app/store/hook';
import { NotificationEnum } from '@/domain/enum/NotificationEnums';
import { NotificationInterface, NotificationInvitationInterface } from '@/domain/entities/notifications.entities';
import { getAllNotification } from '@/Infrastructure/Services/NotificationService';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faClose } from '@fortawesome/free-solid-svg-icons';
import CustomEditor from '../Editor/CustomEditor';
import CustomButton from '../button/CustomButton';
import { Controller, FieldValue, FieldValues, useForm } from 'react-hook-form';
import { type } from 'node:os';
import { createNote, UpdateNote } from '@/Infrastructure/Services/NoteService';
import { StatusStateEnum } from '@/domain/enum/StatusStateEnum';
import { createNoteInit, updateNoteInit } from '@/app/Actions/NoteActions';
import { INote } from '@/domain/entities/note.entities';
import toast from 'react-hot-toast';

export default function UpdateNoteModal({active, setActive, note} : {active : boolean, setActive : React.Dispatch<React.SetStateAction<boolean>>, note : INote}) {
    const { handleSubmit, register,control,setFocus , watch, reset, formState: { errors }, } = useForm();
    const updateNotesState =  useAppSelector(state => state.note).update
    const dispatch = useAppDispatch();
    const [publishNote, setPublishNote] = useState<boolean>(false);

    useEffect(() => {
      setFocus('title')
    }, []);

    useEffect(() => {
        let defaultValues : {
            title : string|undefined,
            description  : string|undefined
        } = {
            title : undefined,
            description : undefined
        }
        defaultValues.title = note.title;
        defaultValues.description = note.description;
        reset({...defaultValues});
     }, [note]);


    const handleCreateNote = (data : FieldValues) => {
        dispatch(updateNoteInit());
        UpdateNote(note.id, {
            title : data.title,
            description : data.description,
            color : note.color,
            is_draft : note.is_draft
        }, publishNote)
    }

    useEffect(() => {
      if (updateNotesState.status === StatusStateEnum.success && updateNotesState.noteId === note.id) {
          toast.success('Your Note has been updated successfully ! ');
          setActive(false);
          setPublishNote(false);
      }
      if (updateNotesState.status === StatusStateEnum.failure && updateNotesState.noteId === note.id) {
        toast.success('Failed, please try again');
        setActive(false);
        setPublishNote(false);
      }
    }, [updateNotesState.status])


    return (
    <>
            <input type="checkbox" id="my_modal_6" checked={active} className="modal-toggle" />
            <div className="modal modal-top backdrop-blur-sm " role="dialog">
            <div className=" mt-10 w-full flex h-full    justify-center">
              <div   className="modal-box  h-fit  overflow-y-hidden p-0 dark:bg-black dark:border-2 dark:border-gray-700 dark:text-white w-[50%]  rounded-md ">
                <form   id={`update-note-form${note.id}`} onSubmit={handleSubmit(handleCreateNote)}>
                  <div style={{
                    backgroundColor : note.color
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
                  
                <div className={`bg-gray-100 py-4  px-3 flex ${!note.is_draft ? 'justify-end' : 'justify-between '} items-center `}>
                 {note.is_draft &&  <CustomButton loader={updateNotesState.status === StatusStateEnum.loading} onClick={() => setPublishNote(true)} variant='dark' type='submit' form={`update-note-form${note.id}`} text='Publish' />}
                  <CustomButton loader={updateNotesState.status === StatusStateEnum.loading} type='submit' form={`update-note-form${note.id}`} text='Save' />
                </div>
              </div>
            </div>
            </div>
        </>
  )
}



