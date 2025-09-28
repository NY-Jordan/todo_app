import Layout from '@/presentation/layout/Layout'
import React, { useEffect, useState } from 'react'
import { AnimatePresence, motion } from 'framer-motion';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faChevronDown, faDraftingCompass, faFileAlt, faFileArchive, faFilePen, faPen, faPlus, faTrash } from '@fortawesome/free-solid-svg-icons';
import classNames from 'classnames';
import CardNote from '@/presentation/components/Notes/CardNote';
import NewNoteModal from '@/presentation/components/Notes/NewNoteModal';
import { colorOptions, getTailwindColor } from '@/Infrastructure/helpers/utils';
import DatePicker from 'react-datepicker';
import "react-datepicker/dist/react-datepicker.css";
import { fetchNotes } from '@/Infrastructure/Services/NoteService';
import { useAppDispatch, useAppSelector } from '@/app/store/hook';
import { INote } from '@/domain/entities/note.entities';
import { StatusStateEnum } from '@/domain/enum/StatusStateEnum';
import toast from 'react-hot-toast';
import { deleteNoteSuccess, fetchNotesInit, resetCreateNote, resetDeleteNote, resetFetchNotes } from '@/app/Actions/NoteActions';
import Tag from '@/presentation/components/Tag/Tag';
import DeleteNoteModal from '@/presentation/components/Notes/DeleteNoteModal';
import { noteButtonColors } from '@/Infrastructure/helpers/Config';
import PageDataLoader from '@/presentation/components/PageDataLoader';
import useRehydrated from '@/Infrastructure/hooks/useRehydrated';
import { useRouter } from 'next/router';
import LinkNoteToTaskModal from '@/presentation/components/Notes/LinkNoteToTaskModal';
export default function index() {
    const router = useRouter();
    const [createNoteModal, setCreateNoteModal] = useState(false);
    const [createNoteColor, setCreateNoteColor] = useState<string>('');
    const [showColorFilter, setShowColorFilter] = useState<boolean>(false);
    const notesState =  useAppSelector(state => state.note).fetch
    const createNotesState =  useAppSelector(state => state.note).create
    const noteDeleteProgress : Array<number>=  useAppSelector(state => state.note).delete_progress;
    const params = new URLSearchParams(window.location.search);
    const draft = params.get('draft');
    const [fetchDraft, setFetchDraft] = useState<boolean>(draft === '1' ? true : false);
    const rehydrated = useRehydrated();
    const dispatch = useAppDispatch();
    const handleActiveCreateNoteModal = (color : string) => {
        setCreateNoteModal(true)
        setCreateNoteColor(color);
    }

    useEffect(() => {
        if (!rehydrated) return;
        if (!notesState.data.length) {
            dispatch(fetchNotesInit());
            fetchNotes(fetchDraft);
          } 
    }, [rehydrated, fetchDraft]);

   useEffect(() => {
    if (createNotesState.status === StatusStateEnum.success) {
        toast.success('Note created sucessfully');
        setCreateNoteModal(false);
        fetchNotes(fetchDraft);
    }
    if (createNotesState.status === StatusStateEnum.failure) {
        toast.error('Note creattion failed, please try again');
        setCreateNoteModal(false);
    }
    dispatch(resetCreateNote());
   }, [createNotesState.status]);

   const handleAnimationComplete = async  (note : INote) => {
        try {
            await dispatch(deleteNoteSuccess(note.id));  
            dispatch(resetDeleteNote());
        } catch (error) {
           toast.error('Something went wrong, please refresh ans try again')
        }
   }

   const handleClickDraftButton = () => {
        dispatch(resetFetchNotes())
        dispatch(fetchNotesInit())
        setTimeout(() => {
            const newFetchDraft =  !fetchDraft;
            setFetchDraft(newFetchDraft); 
            const url = new URL(window.location.href);
            url.searchParams.set('draft', Number(newFetchDraft).toString());
            window.history.replaceState({}, '', url);
        }, 2000);
   }

  return (
    <Layout pageTitle='Your Notes'>
       <div className='flex flex-1 h-screen space-x-4'>
                <div className='  h-full space-y-4 border-r-2 flex  flex-col   py-6  dark:border-r-slate-700 w-[15%]'>
                    <nav onClick={handleClickDraftButton} className={`flex pl-2 ${fetchDraft ? 'bg-indigo-950 text-white hover:bg-indigo-950 ' : ''} w-full justify-between hover:bg-gray-200 py-2 px-2 hover:cursor-pointer rounded-l-full`}>
                        <a className='flex items-center hover:cursor-pointer space-x-3 '>
                            <div><FontAwesomeIcon size='lg' icon={faFilePen} /></div>
                            <div><span>Draft</span></div>
                        </a>
                        <div>
                            <span className='w-6 h-6 rounded-full bg-red-600 text-xs p-1 text-white'>{String(notesState.draft).padStart(2, '0')}</span>
                        </div>
                    </nav>

                   <div className='pr-2'>
                        <div>
                            <span className=' label font-bold'>Create a new note</span>
                        </div>
                        <div className=' grid grid-cols-3 gap-1'>
                            
                            {
                                noteButtonColors.map((color) => {
                                    const HexColor = getTailwindColor(color);
                                    return <motion.div onClick={() => handleActiveCreateNoteModal(HexColor)}      
                                    style={{  backgroundColor : HexColor }}
                                    className='w-10 h-10  rounded-full  hover:cursor-pointer'></motion.div>
                                })
                            }
                        </div>
                   </div>

                   <div className='pr-2'>
                        <div><span className=' label font-bold'>Filter by date </span></div>
                        <div>
                            <DatePicker className='btn btn-sm dark:bg-gray-600 dark:border-gray-600' dateFormat="yyyy-MM-dd" />
                        </div>
                   </div>

                   <div className='mt-5 pr-2'>
                        <div><span className=' label font-bold'>Choose a Type </span></div>
                        <label className='label'>
                            <span>All</span>
                            <input type='radio' name='type' defaultChecked className='radio' />
                        </label>
                        <label className='label'>
                            <span>Associated</span>
                            <input type='radio' name='type' className='radio' />
                        </label>
                        <label className='label'>
                            <span>Unassociated</span>
                            <input type='radio' name='type' className='radio' />
                        </label>
                   </div>


                   <div className='pr-2'>
                        <div><span className=' label font-bold'>Filter by order </span></div>
                        <select defaultValue="More recent" className="select w-full">
                            <option >More recent</option>
                            <option>More older</option>
                        </select>
                   </div>
                   <div className="mt-5 pr-2">
                        <div onClick={() => {setShowColorFilter(!showColorFilter); console.log('cjdjk')}} className='flex items-center justify-between hover:cursor-pointer'>
                            <span className="label font-bold">Filter by Color</span>
                            <span className="label font-bold ">
                                <FontAwesomeIcon icon={faChevronDown} />
                            </span>
                        </div>
                        <motion.div className=' overflow-hidden'  initial={{ height : 0 }}  animate={{ height: !showColorFilter ? 0 : 'auto'}}   transition={{ ease: "easeInOut", duration: 0.4 }}
    > 
                            <AnimatePresence>
                                 <>
                                    { colorOptions.map(option => (
                                <label key={option.value} className="label">
                                    <span className='flex items-center '>{option.label} <div className='h-2 w-2 p-2 rounded-full ml-4' style={{ backgroundColor : getTailwindColor(option.value) }}></div></span>
                                    <input
                                    type="radio"
                                    name="color"
                                    onChange={() => {}}
                                    className="radio"
                                    />
                                </label>
                                ))}
                                <label className="label">
                                <span>All</span>
                                <input
                                    type="radio"
                                    name="color"
                                    defaultChecked
                                    onChange={() => {}}
                                    className="radio"
                                />
                                </label>
                                </>
                            </AnimatePresence>
                        </motion.div>
                    </div>
                </div>
            <div className='h-full w-full'>
                <div className='flex flex-wrap items-center my-6 space-x-4'>
                    <Tag text='Travail' />
                    <Tag text='Maison' />
                    <Tag text='Personnel' />
                    <Tag text='Backend' />
                    <Tag text='frontend' />
                </div>
                <div className='gap-y-3 gap-x-3 grid grid-cols-3 w-full h-fit'>
                    <AnimatePresence>
                    {notesState.status === StatusStateEnum.loading || !notesState.data ? (
                        <PageDataLoader active={true} />
                        ) : notesState.status === StatusStateEnum.success && notesState.data.length > 0 ? (
                        notesState.data.map((note: INote) =>
                            !noteDeleteProgress.includes(note.id) && (
                            <motion.div
                                layout
                                key={note.id}
                                onAnimationComplete={() => {
                                handleAnimationComplete(note);
                                }}
                                exit={{
                                opacity: 0,
                                scale: 0.8,
                                y: -20,
                                transition: { delay: 0.8 },
                                }}
                                className="min-h-[17%] h-[150px]"
                            >
                                <CardNote note={note} />
                            </motion.div>
                            )
                        )
                        ) : notesState.status === StatusStateEnum.success && notesState.data.length === 0 ? (
                        <CardNote
                            note={{
                            title: 'You haven’t written anything yet. Feel free to add your thoughts!',
                            description: '',
                            color: getTailwindColor(noteButtonColors[1]),
                            id: 0,
                            is_draft : false
                            }}
                        />
                        ) : null}
                    </AnimatePresence>
                </div>

            </div>
       </div>
       {createNoteColor ? <NewNoteModal active={createNoteModal} color={createNoteColor} setActive={setCreateNoteModal} /> : <></>}

    </Layout>
  )
}