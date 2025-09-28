import { store } from "@/app/store/store";
import ApiClient from "../helpers/ApiClient";
import { getBearerAuthToken } from "../helpers/HelperUtils";
import { createNoteFailure, createNoteSuccess, deleteNoteFailure, deleteNoteProgressSuccess, deleteNoteSuccess, fetchNotesFailure, fetchNotesSuccess, updateNoteSuccess } from "@/app/Actions/NoteActions";
import { updateNoteFailure } from '../../app/Actions/NoteActions';

type createNoteType = {
    title  : string,
    description : string,
    color :  string;
    is_draft : boolean
}

export const createNote = async (createNoteData : createNoteType) => {
    try {
        const reponse = await ApiClient().post(`/note/create` , createNoteData ,{
            headers : {
                Authorization : await getBearerAuthToken(),
            }
        });
        const data = reponse.data;
       store.dispatch(createNoteSuccess(data));
    } catch (e) {
        store.dispatch(createNoteFailure(e));
    }
}


export const fetchNotes = async (DraftType : boolean) => {
    try {
        const reponse = await ApiClient().get(`/note/fetch`  ,{
            params : {
                draft : DraftType
            },
            headers : {
                Authorization : await getBearerAuthToken(),
            }
        });
        const data = reponse.data.notes;
        const draft = reponse.data.draft;
       store.dispatch(fetchNotesSuccess(data, draft));
    } catch (e) {
        store.dispatch(fetchNotesFailure(e));
    }
}

export const UpdateNote = async (noteId : number, createNoteData : createNoteType, publishNote : boolean) => {
    try {
        const reponse = await ApiClient().put(`/note/update/${noteId}` , createNoteData ,{
            params : {
                publish : publishNote
            },
            headers : {
                Authorization : await getBearerAuthToken(),
            }
        });
        const data = reponse.data.note;
       store.dispatch(updateNoteSuccess(data));
    } catch (e) {
        store.dispatch(updateNoteFailure(noteId));
    }
}

export const deleteNote = async (noteId : number) => {
    try {
        const reponse = await ApiClient().delete(`/note/delete/${noteId}` ,{
            headers : {
                Authorization : await getBearerAuthToken(),
            }
        });
       store.dispatch(deleteNoteProgressSuccess(noteId));
    } catch (e) {
        store.dispatch(deleteNoteFailure(e));
    }
}


export const associateNote = async (noteId : number) => {
    try {
        const reponse = await ApiClient().post(`/note/associate` ,{
            headers : {
                Authorization : await getBearerAuthToken(),
            }
        });
       store.dispatch(deleteNoteProgressSuccess(noteId));
    } catch (e) {
        store.dispatch(deleteNoteFailure(e));
    }
}
