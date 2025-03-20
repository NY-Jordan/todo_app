import { GoogleEventInterface } from "@/domain/entities/events.entities";

// Constants
export const GoogleCalendarActionTypes = {
    FETCH_GOOGLE_EVENTS_CALENDAR_INIT: 'FETCH_GOOGLE_EVENTS_CALENDAR_INIT',
    FETCH_GOOGLE_EVENTS_CALENDAR_SUCCESS: 'FETCH_GOOGLE_EVENTS_CALENDAR_SUCCESS',
    FETCH_GOOGLE_EVENTS_CALENDAR_FAILURE: 'FETCH_GOOGLE_EVENTS_CALENDAR_FAILURE',

    EDIT_GOOGLE_EVENT_INIT: 'EDIT_GOOGLE_EVENT_INIT',
    EDIT_GOOGLE_EVENT_SUCCESS: 'EDIT_GOOGLE_EVENT_SUCCESS',
    EDIT_GOOGLE_EVENT_FAILURE: 'EDIT_GOOGLE_EVENT_FAILURE',

    DELETE_GOOGLE_EVENT_INIT: 'DELETE_GOOGLE_EVENT_INIT',
    DELETE_GOOGLE_EVENT_SUCCESS: 'DELETE_GOOGLE_EVENT_SUCCESS',
    DELETE_GOOGLE_EVENT_FAILURE: 'DELETE_GOOGLE_EVENT_FAILURE',
  };
  
  // Action Creators
  export const fetchGoogleEventsCalendarInit = () => ({
    type: GoogleCalendarActionTypes.FETCH_GOOGLE_EVENTS_CALENDAR_INIT,
  });
  
  export const fetchGoogleEventsCalendarSuccess = (events: GoogleEventInterface[]) => ({
    type: GoogleCalendarActionTypes.FETCH_GOOGLE_EVENTS_CALENDAR_SUCCESS,
    payload: events,
  });
  
  export const fetchGoogleEventsCalendarFailure = (error: any) => ({
    type: GoogleCalendarActionTypes.FETCH_GOOGLE_EVENTS_CALENDAR_FAILURE,
    payload: error,
  });
  
  export const editGoogleEventInit = () => ({
    type: GoogleCalendarActionTypes.EDIT_GOOGLE_EVENT_INIT,
  });
  
  export const editGoogleEventSuccess = (event:  GoogleEventInterface[]) => ({
    type: GoogleCalendarActionTypes.EDIT_GOOGLE_EVENT_SUCCESS,
    payload: event,
  });
  
  export const editGoogleEventFailure = (error: any) => ({
    type: GoogleCalendarActionTypes.EDIT_GOOGLE_EVENT_FAILURE,
    payload: error,
  });
  
  export const deleteGoogleEventInit = () => ({
    type: GoogleCalendarActionTypes.DELETE_GOOGLE_EVENT_INIT,
  });
  
  export const deleteGoogleEventSuccess = (eventId: string) => ({
    type: GoogleCalendarActionTypes.DELETE_GOOGLE_EVENT_SUCCESS,
    payload: eventId,
  });
  
  export const deleteGoogleEventFailure = (error: string) => ({
    type: GoogleCalendarActionTypes.DELETE_GOOGLE_EVENT_FAILURE,
    payload: error,
  });
  