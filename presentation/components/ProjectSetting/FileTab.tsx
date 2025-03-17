import { faDownload, faEdit, faPlus, faTrash } from '@fortawesome/free-solid-svg-icons'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import React from 'react'

export default function FileTab() {
  return (
    <div>
      <div className='mb-4'>
        <button className='btn bg-indigo-500 hover:bg-indigo-700 text-white dark:bg-slate-600 dark:border-slate-600 dark:hover:bg-slate-600'><FontAwesomeIcon icon={faPlus} />  Add File</button>
      </div>
      <div className="overflow-x-auto">
        <table className="table table-xs">
            <thead>
            <tr>
                <th>Name</th>
                <th>Created At</th>
                <th>Updated At</th>
                <th>Actions</th>
            </tr>
            </thead>
            <tbody>
            <tr>
                <th className='text-sm'>Cahier de Charge</th>
                <td className='text-sm'> 25 June 2025</td>
                <td className='text-sm'>-</td>
                <td className='space-x-8 p-3'>
                    <a href='#' className='text-red-500 tooltip' data-tip='delete'>
                        <FontAwesomeIcon icon={faTrash} size='lg' />
                    </a>
                    <a href='#' className='text-indigo-500 tooltip' data-tip='edit'>
                        <FontAwesomeIcon icon={faEdit} size='lg'/>
                    </a>
                    <a href='#' className='tooltip' data-tip='download'>
                        <FontAwesomeIcon icon={faDownload} size='lg' />
                    </a>
                </td>
            </tr>
            <tr>
                <th className='text-sm'>Fonctionalites</th>
                <td className='text-sm'> 25 June 2025</td>
                <td className='text-sm'>-</td>
                <td className='space-x-8 p-3'>
                    <a href='#' className='text-red-500 tooltip' data-tip='delete'>
                        <FontAwesomeIcon icon={faTrash} size='lg' />
                    </a>
                    <a href='#' className='text-indigo-500 tooltip' data-tip='edit'>
                        <FontAwesomeIcon icon={faEdit} size='lg'/>
                    </a>
                    <a href='#' className='tooltip' data-tip='download'>
                        <FontAwesomeIcon icon={faDownload} size='lg' />
                    </a>
                </td>
            </tr>
            </tbody>
        </table>
    </div>
    </div>
  )
}
