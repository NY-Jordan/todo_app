import { mdiClockAlert, mdiClockAlertOutline } from '@mdi/js'
import Icon from '@mdi/react'
import React from 'react'

export default function ReminderDateModal() {
    const sampleFunction = (a: number, b: number): string => {
        return (a + b).toString();
    };
  return (
    <>
        <input type="checkbox" id="reminder_date" className="modal-toggle" />
        <div className="modal" role="dialog">
        <div className="modal-box">
            <h3 className="font-bold text-lg">Reminder Date</h3>
            <div className='flex  flex-col justify-center items-center my-4'>
                <input type="datetime-local" placeholder="Type here" className="input input-bordered w-full max-w-xs" />
                <div className='flex flex-row  mr-18 mt-4 space-x-2 items-center'>
                    <input type="radio" name="radio-7" className="radio  radio-info"  />

                    <label>Alert me at the specified time</label>
                    <Icon path={mdiClockAlertOutline} size={1} />
                </div>
            </div>
            <div className="modal-action">
                <button type='submit' className="btn btn-primary">Save</button>
                <label htmlFor="reminder_date" className="btn">Close</label>
            </div>
        </div>
        </div>
    </>
  )
}
