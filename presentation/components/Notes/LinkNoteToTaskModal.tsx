import React, { useEffect, useRef, useState } from 'react'
import { useAppDispatch, useAppSelector } from '@/app/store/hook';
import { NotificationEnum } from '@/domain/enum/NotificationEnums';
import { NotificationInterface, NotificationInvitationInterface } from '@/domain/entities/notifications.entities';
import { getAllNotification } from '@/Infrastructure/Services/NotificationService';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faClose, faFilePen, faLink } from '@fortawesome/free-solid-svg-icons';
import CustomEditor from '../Editor/CustomEditor';
import CustomButton from '../button/CustomButton';
import { Controller, FieldValue, FieldValues, useForm } from 'react-hook-form';
import { type } from 'node:os';
import { createNote } from '@/Infrastructure/Services/NoteService';
import { StatusStateEnum } from '@/domain/enum/StatusStateEnum';
import { createNoteInit } from '@/app/Actions/NoteActions';
import { icon } from '@fortawesome/fontawesome-svg-core';
import Icon from '@mdi/react';
import { INote } from '@/domain/entities/note.entities';
import Tag from '../Tag/Tag';
import { TaskPhasesEnum, TaskTypeEnum } from '@/domain/enum/TaskEnum';
import { searchTasks } from '@/Infrastructure/Services/Task/TaskService';
import { ITask } from '@/domain/entities/task.entities';
import TaskNoteCard from './TaskNoteCard';

export default function LinkNoteToTaskModal({active, setActive, note} : {active : boolean, setActive : React.Dispatch<React.SetStateAction<boolean>>, note : INote}) {
    const { handleSubmit, register,control,setFocus , watch, reset, formState: { errors }, } = useForm();
    const createNotesState =  useAppSelector(state => state.note).create
    const dispatch = useAppDispatch();
    const [keysWord, setKeysWord] = useState<string>();
    const [debouncedSearch, setDebouncedSearch] = useState<string|undefined>(keysWord);
    const [tasks, setTasks] = useState<ITask[]|null>([]);
    useEffect(() => {
      const handler = setTimeout(() => {
        setDebouncedSearch(keysWord);
    }, 500);

      return () => {
        clearTimeout(handler);
      };
    }, [keysWord]);

    async function handleSearchTasks(debouncedSearch : string, phaseId? : number) {
      if (debouncedSearch !== undefined) {
          const tasks = await searchTasks(debouncedSearch, phaseId);
          setTasks(tasks);
      }
    }

    useEffect(() => {
      if (debouncedSearch !== undefined) {
          handleSearchTasks(debouncedSearch)
      }
    }, [debouncedSearch]);
    return (
    <>
      <input type="checkbox" id="my_modal_6" checked={active} className="modal-toggle " />
      <div className="modal modal-top backdrop-blur-sm " role="dialog">
      <div className=" mt-10 w-full flex h-full  overflow-y-auto  justify-center">
        <div   className="modal-box overflow-y-auto h-fit   p-0 dark:bg-black dark:border-2 dark:border-gray-700 dark:text-white w-[50%]  rounded-md ">
            <div  className="w-full  p-4 flex justify-between items-center">
                <h3 className="text-lg font-bold w-3/4">Link a Task</h3>
                <a className="hover:cursor-pointer" onClick={() => {
                  setActive(false);

                }}>
                    <FontAwesomeIcon icon={faClose}  />
                </a>
            </div>
            <form   id='create-note-form' onSubmit={handleSubmit(() => {})}>
              <input type="text" placeholder="Search Tasks..." onChange={(e) => setKeysWord(e.target.value)} className="input w-full input-md input2  input-bordered rounded-sm rounded-xs" />
            </form>
            <div className='my-6  space-x-6 px-3'>
                  <Tag text={TaskPhasesEnum.Backlog} />
                  <Tag text={TaskPhasesEnum.Started} />
                  <Tag text={TaskPhasesEnum.InReview} />
                  <Tag text={TaskPhasesEnum.Done} />
            </div>
            <div className='my-6 '>
                  {
                    tasks && tasks.length > 0 ? (
                      <div className='flex flex-col space-y-4'>
                        {tasks.map((task, index) => (
                          <TaskNoteCard task={task} key={index} noteId={note.id} />
                        ))}
                      </div>
                    ) : (
                      <p className='text-gray-500'>No tasks found</p>
                    )
                  }
            </div>
        </div>
      </div>
      </div>
        </>
  )
}



