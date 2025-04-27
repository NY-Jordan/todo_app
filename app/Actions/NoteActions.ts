import { INote } from "@/domain/entities/note.entities";

export const NoteActions = {
    CREATE_INIT: 'NOTE_CREATE_INIT',
    CREATE_SUCCESS: 'NOTE_CREATE_SUCCESS',
    CREATE_FAILURE: 'NOTE_CREATE_FAILURE',
    CREATE_RESET: 'NOTE_CREATE_RESET',
  
    FETCH_INIT: 'NOTE_FETCH_INIT',
    FETCH_SUCCESS: 'NOTE_FETCH_SUCCESS',
    FETCH_FAILURE: 'NOTE_FETCH_FAILURE',
    FETCH_RESET: 'NOTE_FETCH_RESET', 
  
    UPDATE_INIT: 'NOTE_UPDATE_INIT',
    UPDATE_SUCCESS: 'NOTE_UPDATE_SUCCESS',
    UPDATE_FAILURE: 'NOTE_UPDATE_FAILURE',
    UPDATE_RESET: 'NOTE_UPDATE_RESET',
  
    DELETE_INIT: 'NOTE_DELETE_INIT',
    DELETE_SUCCESS: 'NOTE_DELETE_SUCCESS',
    DELETE_FAILURE: 'NOTE_DELETE_FAILURE',
    DELETE_PROGRESS: 'NOTE_DELETE_PROGRESS',
    DELETE_RESET: 'NOTE_DELETE_RESET',
  
    ASSOCIATE_TASK_INIT: 'NOTE_ASSOCIATE_TASK_INIT',
    ASSOCIATE_TASK_SUCCESS: 'NOTE_ASSOCIATE_TASK_SUCCESS',
    ASSOCIATE_TASK_FAILURE: 'NOTE_ASSOCIATE_TASK_FAILURE',
    ASSOCIATE_TASK_RESET: 'NOTE_ASSOCIATE_TASK_RESET',
  
    DISSOCIATE_TASK_INIT: 'NOTE_DISSOCIATE_TASK_INIT',
    DISSOCIATE_TASK_SUCCESS: 'NOTE_DISSOCIATE_TASK_SUCCESS',
    DISSOCIATE_TASK_FAILURE: 'NOTE_DISSOCIATE_TASK_FAILURE',
    DISSOCIATE_TASK_RESET: 'NOTE_DISSOCIATE_TASK_RESET',
  };
  
  // 2. Création des créateurs d'actions
  // CRUD pour les notes
  export const createNoteInit = () => ({
    type: NoteActions.CREATE_INIT,
  });
  
  export const createNoteSuccess = (note : INote) => ({
    type: NoteActions.CREATE_SUCCESS,
    payload: note,
  });
  
  export const createNoteFailure = (error : any) => ({
    type: NoteActions.CREATE_FAILURE,
    payload: error,
  });
  
  export const resetCreateNote = () => ({
    type: NoteActions.CREATE_RESET,
  });
  
  export const fetchNotesInit = () => ({
    type: NoteActions.FETCH_INIT,
  });
  
  export const fetchNotesSuccess = (notes : INote[], draft : number) => ({
    type: NoteActions.FETCH_SUCCESS,
    payload: {notes, draft},
  });
  
  export const fetchNotesFailure = (error : any) => ({
    type: NoteActions.FETCH_FAILURE,
    payload: error,
  });
  
  export const resetFetchNotes = () => ({
    type: NoteActions.FETCH_RESET,  // Ajout du RESET pour fetch
  });
  
  export const updateNoteInit = () => ({
    type: NoteActions.UPDATE_INIT,
  });
  
  export const updateNoteSuccess = (note : INote) => ({
    type: NoteActions.UPDATE_SUCCESS,
    payload: note,
  });
  
  export const updateNoteFailure = (error : any) => ({
    type: NoteActions.UPDATE_FAILURE,
    payload: error,
  });
  
  export const resetUpdateNote = () => ({
    type: NoteActions.UPDATE_RESET,
  });
  
  export const deleteNoteInit = () => ({
    type: NoteActions.DELETE_INIT,
  });
  
  export const deleteNoteSuccess = (noteId : number) => ({
    type: NoteActions.DELETE_SUCCESS,
    payload: noteId,
  });

  export const deleteNoteProgressSuccess = (noteId : number) => ({
    type: NoteActions.DELETE_PROGRESS,
    payload: noteId,
  });
  
  export const deleteNoteFailure = (error : any) => ({
    type: NoteActions.DELETE_FAILURE,
    payload: error,
  });
  
  export const resetDeleteNote = () => ({
    type: NoteActions.DELETE_RESET,
  });
  
  export const associateTaskToNoteInit = (noteId : number, taskId : number) => ({
    type: NoteActions.ASSOCIATE_TASK_INIT,
    payload: { noteId, taskId },
  });
  
  export const associateTaskToNoteSuccess = (noteTask) => ({
    type: NoteActions.ASSOCIATE_TASK_SUCCESS,
    payload: noteTask,
  });
  
  export const associateTaskToNoteFailure = (error : any) => ({
    type: NoteActions.ASSOCIATE_TASK_FAILURE,
    payload: error,
  });
  
  export const resetAssociateTaskToNote = () => ({
    type: NoteActions.ASSOCIATE_TASK_RESET,
  });
  
  export const dissociateTaskFromNoteInit = (noteId : number, taskId : number) => ({
    type: NoteActions.DISSOCIATE_TASK_INIT,
    payload: { noteId, taskId },
  });
  
  export const dissociateTaskFromNoteSuccess = (noteTask ) => ({
    type: NoteActions.DISSOCIATE_TASK_SUCCESS,
    payload: noteTask,
  });
  

  export const dissociateTaskFromNoteFailure = (error) => ({
    type: NoteActions.DISSOCIATE_TASK_FAILURE,
    payload: error,
  });
  
  export const resetDissociateTaskFromNote = () => ({
    type: NoteActions.DISSOCIATE_TASK_RESET,
  });