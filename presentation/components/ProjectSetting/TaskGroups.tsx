import { faDownload, faEdit, faPlus, faTrash } from '@fortawesome/free-solid-svg-icons'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import React from 'react'

export default function TaskGroups() {
  return (
    <div>
      <div className='mb-4'>
        <button className='btn bg-indigo-500 hover:bg-indigo-700 text-white'><FontAwesomeIcon icon={faPlus} />  Add Task Group</button>
      </div>
      <div className="overflow-x-auto">
        <table className="table table-xs">
            <thead>
            <tr>
                <th>Name</th>
                <th>Created At</th>
                <th>Backlog</th>
                <th>Started</th>
                <th>In Review</th>
                <th>Done</th>
                <th>Actions</th>
            </tr>
            </thead>
            <tbody>
                <tr>
                    <th className='text-sm'>Authentification (Backend)</th>
                    <td className='text-sm'> 25 June 2025</td>
                    <td className='text-sm'>10</td>
                    <td className='text-sm'>07</td>
                    <td className='text-sm'>04</td>
                    <td className='text-sm'>01</td>
                    <td className='space-x-8 p-3'>
                        <a href='#' className='text-red-500 tooltip' data-tip='delete'>
                            <FontAwesomeIcon icon={faTrash} size='lg' />
                        </a>
                        <a href='#' className='text-indigo-500 tooltip' data-tip='edit'>
                            <FontAwesomeIcon icon={faEdit} size='lg'/>
                        </a>
                    </td>
                </tr>
                <tr>
                    <th className='text-sm'>Authentification (Frontend)</th>
                    <td className='text-sm'> 25 June 2025</td>
                    <td className='text-sm'>10</td>
                    <td className='text-sm'>07</td>
                    <td className='text-sm'>04</td>
                    <td className='text-sm'>01</td>
                    <td className='space-x-8 p-3'>
                        <a href='#' className='text-red-500 tooltip' data-tip='delete'>
                            <FontAwesomeIcon icon={faTrash} size='lg' />
                        </a>
                        <a href='#' className='text-indigo-500 tooltip' data-tip='edit'>
                            <FontAwesomeIcon icon={faEdit} size='lg'/>
                        </a>
                    </td>
                </tr>
            </tbody>
        </table>
    </div>
    </div>
  )
}
