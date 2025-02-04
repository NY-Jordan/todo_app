import { faFilter, faSort , faPlus} from '@fortawesome/free-solid-svg-icons'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import React, { useEffect, useState } from 'react'
import DailyTaskITem from './DailyTaskITem'
import { useAppSelector } from '@/app/store/hook'
import classNames from 'classnames';
import CustomButton from './button/CustomButton'
import { ITask } from '@/domain/entities/task.entities'
import { FetchAllDailyTasks } from '@/Infrastructure/Services/Task/DailyTaskService'
import DatePicker from "react-datepicker";
import "react-datepicker/dist/react-datepicker.css";
import moment, { now } from 'moment'
import CreateDailyTaskModal from './Task/Daily/CreateDailyTaskModal'

export default function DailyTodoCard() {
  const [active, setActive] = useState<boolean>(false);
  const fetchDailyTasks = useAppSelector(state => state.dailyTask).fetch;
  const [search, setSearch] = useState<string|undefined>('');
  const [debouncedSearch, setDebouncedSearch] = useState<string|undefined>(search);
  const [selectedDate, setSelectedDate] = useState<Date|null>(new Date());

  useEffect(() => {
    const handler = setTimeout(() => {
      setDebouncedSearch(search);
    }, 500); 

    return () => {
      clearTimeout(handler); 
    };
  }, [search]);

    useEffect(() => {
      FetchAllDailyTasks(debouncedSearch, selectedDate?.toISOString());
    }, [debouncedSearch, selectedDate]);

    

  return (
    <>
    <div className=' mb-4 w-full h-full bg-white border rounded-sm px-5 pb-2 pt-4  '>
      <div className='  max-h-[10%]  w-full flex items-center justify-between'>

        <div>
          <h4 className='text-xl font-bold'>Daily Todo</h4>
          <div>
            <span className='text-gray-500'>Task assigned to me</span>
          </div>
        </div>

        <div className='flex items-center'>
          <label className="input input-bordered  flex items-center h-10 rounded-md">
            <input type="text" onChange={(e) => setSearch(e.target.value)} className="grow rounded-full" placeholder="Search tasks" />
            <svg
                height={30}
                width={30}
                xmlns="http://www.w3.org/2000/svg"
                viewBox="0 0 16 16"
                fill="currentColor"
                className="h-4 w-4 opacity-70">
                <path
                fillRule="evenodd"
                d="M9.965 11.026a5 5 0 1 1 1.06-1.06l2.755 2.754a.75.75 0 1 1-1.06 1.06l-2.755-2.754ZM10.5 7a3.5 3.5 0 1 1-7 0 3.5 3.5 0 0 1 7 0Z"
                clipRule="evenodd" />
            </svg>
          </label>
          <div className='flex  items-center mx-3'>
            <FontAwesomeIcon icon={faFilter} size='xs' />
            <h5 className='text-gray-600 text-sm ml-1'>{fetchDailyTasks.data.length} task(s)</h5>
          </div>
          <div className='flex items-center justify-center'>
            <DatePicker
              selected={selectedDate}
              onChange={(date) => setSelectedDate(date)}
              maxDate={new Date()} // Restrict dates to today and earlier
              className='btn btn-sm'
              dateFormat="yyyy-MM-dd"
              placeholderText="Select a valid date"
            />
          </div>
        </div>
      </div>
      <div className='h-[75%] scrollbar-rounded scrollbar-hidden hover:scrollbar-hover  overflow-y-auto scrollbar-thin scrollbar-thumb-gray-500 scrollbar-track-white'>
       {
        (fetchDailyTasks.data ) && 
        fetchDailyTasks.data.length ?  fetchDailyTasks.data.map((task : ITask) => { return <DailyTaskITem 
            task={task}
           /> }) : 
        <div className=' flex justify-center items-center w-full h-full'>
            {selectedDate?.toDateString() === (new Date()).toDateString() ? <div className='flex flex-col items-center space-y-4 justify-center'>
              <p>Hey there! 👋 It looks like your to-do list is empty. Why not add your first task and get started? 🚀 You've got this! 💪</p>
              <CustomButton text='Add Task'  btnClassName='w-[20%]' onClick={() => setActive(true)}   />
            </div> : <div className='text-red-600'>No tasks found</div>}
        </div>
        }
        
      </div>
      <div className='mt-2'>
          <a onClick={() => setActive(true)} className='flex items-center hover:cursor-pointer font-bold text-indigo-700  space-x-3'>
            <FontAwesomeIcon icon={faPlus} size='xs' />
            <span className='text-sm'>Add new task</span>
          </a>
      </div>
    </div>
    <CreateDailyTaskModal active={active} setActive={setActive} />
    </>
  )
}
