interface EventCreatorInterface {
    displayName: string | null;
    email: string;
    id: string | null;
    self: boolean | null;
  }
  
  interface EventOrganizerInterface {
    displayName: string | null;
    email: string;
    id: string | null;
    self: boolean | null;
  }
  
  interface EventStartInterface {
    date: string | null;
    dateTime: string;
    timeZone: string;
  }
  
  interface EventEndInterface {
    date: string | null;
    dateTime: string;
    timeZone: string;
  }
  
  interface AttendeeInterface {
    additionalGuests: number | null;
    comment: string | null;
    displayName: string | null;
    email: string;
    id: string | null;
    optional: boolean | null;
    organizer: boolean | null;
    resource: boolean | null;
    responseStatus: 'needsAction' | 'accepted' | 'declined' | 'tentative';
    self: boolean | null;
  }
  
  interface ConferenceDataCreateRequestInterface {
    requestId: string;
    conferenceSolutionKey: {
      type: string;
    };
    status: {
      statusCode: string;
    };
  }
  
  interface ConferenceDataEntryPointInterface {
    accessCode: string | null;
    entryPointFeatures: string | null;
    entryPointType: string;
    label: string;
    meetingCode: string | null;
    passcode: string | null;
    password: string | null;
    pin: string | null;
    regionCode: string | null;
    uri: string;
  }
  
  interface ConferenceSolutionInterface {
    iconUri: string;
    name: string;
    key: {
      type: string;
    };
  }
  
  interface ConferenceDataInterface {
    conferenceId: string;
    notes: string | null;
    signature: string | null;
    createRequest: ConferenceDataCreateRequestInterface;
    entryPoints: ConferenceDataEntryPointInterface[];
    conferenceSolution: ConferenceSolutionInterface;
  }
  
  interface RemindersInterface {
    useDefault: boolean;
  }
  
  export interface GoogleEventInterface {
    anyoneCanAddSelf: boolean | null;
    attendeesOmitted: boolean | null;
    colorId: string | null;
    created: string;
    description: string | null;
    endTimeUnspecified: boolean | null;
    etag: string;
    eventType: string;
    guestsCanInviteOthers: boolean | null;
    guestsCanModify: boolean | null;
    guestsCanSeeOtherGuests: boolean | null;
    hangoutLink: string;
    htmlLink: string;
    iCalUID: string;
    id: string;
    kind: string;
    location: string | null;
    locked: boolean | null;
    privateCopy: boolean | null;
    recurrence: string | null;
    recurringEventId: string | null;
    sequence: number;
    status: string;
    summary: string;
    transparency: string | null;
    updated: string;
    visibility: string | null;
    creator: EventCreatorInterface;
    organizer: EventOrganizerInterface;
    start: EventStartInterface;
    end: EventEndInterface;
    attendees: AttendeeInterface[];
    conferenceData: ConferenceDataInterface;
    reminders: RemindersInterface;
  }
  