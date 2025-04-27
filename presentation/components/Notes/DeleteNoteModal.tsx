import { faClose } from '@fortawesome/free-solid-svg-icons'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import React, { useEffect, useState } from 'react'
import CustomButton from '../button/CustomButton'
import { useAppDispatch, useAppSelector } from '@/app/store/hook'
import { deleteProjectInit, resetDeleteProjectState } from '@/app/Actions/ProjectsActions'
import { deleteProject, FetchAllProjects } from '@/Infrastructure/Services/projects/ProjectsService'
import toast from 'react-hot-toast'
import { StatusStateEnum } from '@/domain/enum/StatusStateEnum'
import { INote } from '@/domain/entities/note.entities'
import { deleteNoteInit, resetDeleteNote } from '@/app/Actions/NoteActions'
import { createNote, deleteNote } from '@/Infrastructure/Services/NoteService'

export default function DeleteNoteModal({active, setActive, note} : {active : boolean, setActive : React.Dispatch<React.SetStateAction<boolean>>, note : INote }) {
  const dispatch = useAppDispatch();
  const deleteNoteState = useAppSelector(state => state.note).delete
  const noteDeleteProgress : Array<number>=  useAppSelector(state => state.note).delete_progress

  const handleProjectDeleteAction = () => {
    dispatch(deleteNoteInit());
    deleteNote(note.id);
  }

  useEffect(() => {
    if (deleteNoteState.status === StatusStateEnum.failure  && deleteNoteState.noteId === note.id) {
      toast.error('Note deletion failed. Please try again.');
      setActive(false)
    }
  }, [deleteNoteState.status]);


  useEffect(() => {
      if (noteDeleteProgress.includes(note.id)) {
        setActive(false)
        toast.success('Your Note has been deleted successfully.');
      }
  }, [noteDeleteProgress.length])

  return (
    <>
       <input type="checkbox" id="my_modal_6" checked={active} className="modal-toggle" />
              <div className="modal" role="dialog">
              <div className="modal-box">
                 <div className="w-full flex justify-between items-center">
                    <h3 className="text-lg font-bold text-red-600">Delete Note</h3>
                    <a onClick={() => setActive(false)}>
                        <FontAwesomeIcon icon={faClose}  />
                    </a>
                 </div>
      
                 <p className='my-4'>Are you sure you want to delete this note?</p>
      
                  <div className="modal-action justify-between">
                    <CustomButton  type="submit" btnClassName="w-1/4"  text="Cancel" onClick={() => setActive(false)} size='lg'  variant='dark'  />
                    <CustomButton  type="submit" btnClassName="w-1/4"onClick={() => handleProjectDeleteAction()}  loader={deleteNoteState.status === StatusStateEnum.loading}  text="Yes" size='lg'  variant='primary'  />
                  </div>
              </div>
              </div>
    </>
  )
}
