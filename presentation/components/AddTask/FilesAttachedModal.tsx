import React from 'react'
import FileAttached from './FileAttached'

export default function FilesAttachedModal() {
  return (
    <div>
       <input type="checkbox" id="files_attached" className="modal-toggle" />
        <div className="modal" role="dialog">
        <div className="modal-box">
            <h3 className="font-bold text-lg">Files Attached</h3>
            <div className='flex  my-8 flex-col justify-left items-left my-4'>
                <FileAttached name='spécificité de la tâche' />
                <FileAttached name='Cahier de charge' />
                <FileAttached name="Mcd faites par l'equipe" />
            </div>
            <div className="modal-action">
                <label htmlFor="files_attached" className="btn">Close</label>
            </div>
        </div>
        </div>
    </div>
  )
}
