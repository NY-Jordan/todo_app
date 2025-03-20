import { GoogleCalendarActionTypes } from "../Actions/Calendar/GoogleCalendarActions";

// Initial State
const initialState = {
  events: [],
  loading: false,
  error: null,
  editingEvent: null,
  deletingEventId: null,
};

// Reducer
export const googleCalendarReducer = (state = initialState, action: any) => {
  switch (action.type) {
    // FETCH_GOOGLE_EVENTS_CALENDAR
    case GoogleCalendarActionTypes.FETCH_GOOGLE_EVENTS_CALENDAR_INIT:
      return {
        ...state,
        loading: true,
        error: null,
      };
    case GoogleCalendarActionTypes.FETCH_GOOGLE_EVENTS_CALENDAR_SUCCESS:
      return {
        ...state,
        loading: false,
        events: action.payload,
      };
    case GoogleCalendarActionTypes.FETCH_GOOGLE_EVENTS_CALENDAR_FAILURE:
      return {
        ...state,
        loading: false,
        error: action.payload,
      };

    // EDIT_GOOGLE_EVENT
    case GoogleCalendarActionTypes.EDIT_GOOGLE_EVENT_INIT:
      return {
        ...state,
        loading: true,
        error: null,
        editingEvent: null,
      };
    case GoogleCalendarActionTypes.EDIT_GOOGLE_EVENT_SUCCESS:
      return {
        ...state,
        loading: false,
        events: state.events.map((event: any) =>
          event.id === action.payload.id ? action.payload : event
        ),
        editingEvent: action.payload,
      };
    case GoogleCalendarActionTypes.EDIT_GOOGLE_EVENT_FAILURE:
      return {
        ...state,
        loading: false,
        error: action.payload,
      };

    // DELETE_GOOGLE_EVENT
    case GoogleCalendarActionTypes.DELETE_GOOGLE_EVENT_INIT:
      return {
        ...state,
        loading: true,
        error: null,
        deletingEventId: null,
      };
    case GoogleCalendarActionTypes.DELETE_GOOGLE_EVENT_SUCCESS:
      return {
        ...state,
        loading: false,
        events: state.events.filter((event: any) => event.id !== action.payload),
        deletingEventId: action.payload,
      };
    case GoogleCalendarActionTypes.DELETE_GOOGLE_EVENT_FAILURE:
      return {
        ...state,
        loading: false,
        error: action.payload,
      };

    default:
      return state;
  }
};
