import { faPlus, faTrash } from '@fortawesome/free-solid-svg-icons'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import React from 'react'

export default function CollaboratorsTab() {
  return (
    <div>
      <div>
        <button className='btn bg-indigo-500 hover:bg-indigo-700 text-white'><FontAwesomeIcon icon={faPlus} />  New Colaborator</button>
      </div>
      <div className="overflow-x-auto">
        <table className="table">
          {/* head */}
          <thead>
            <tr>
              <th></th>
              <th>Name</th>
              <th>Status</th>
              <th>Joint At</th>
              <th></th>
            </tr>
          </thead>
          <tbody>
            {/* row 1 */}
            <tr>
              <th>
                <label>
                  <input type="checkbox" className="checkbox" />
                </label>
              </th>
              <td>
                <div className="flex items-center gap-3">
                  <div className="avatar">
                    <div className="mask mask-squircle h-12 w-12">
                      <img
                        src="https://img.daisyui.com/images/profile/demo/2@94.webp"
                        alt="Avatar Tailwind CSS Component" />
                    </div>
                  </div>
                  <div>
                    <div className="font-bold">Hart Hagerty</div>
                    <div className="text-sm opacity-50">Developer</div>
                  </div>
                </div>
              </td>
              <td>
                <span className='bg-green-600 text-white px-3 py-1 rounded-full text-sm font-semibold'>Joined</span>
              </td>
              <td>
                <span className="badge badge-ghost badge-sm">6 Oct 2023 </span>
              </td>
              <th className='flex justify-center'>
                <button className="btn btn-ghost btn-xs text-red-600">
                  <FontAwesomeIcon icon={faTrash} size='lg' />
                </button>        </th>
            </tr>
            {/* row 2 */}
            <tr>
              <th>
                <label>
                  <input type="checkbox" className="checkbox" />
                </label>
              </th>
              <td>
                <div className="flex items-center gap-3">
                  <div className="avatar">
                    <div className="mask mask-squircle h-12 w-12">
                      <img
                        src="https://img.daisyui.com/images/profile/demo/3@94.webp"
                        alt="Avatar Tailwind CSS Component" />
                    </div>
                  </div>
                  <div>
                    <div className="font-bold">Brice Swyre</div>
                    <div className="text-sm opacity-50">Designer web</div>
                  </div>
                </div>
              </td>
              <td>
                <span className='bg-green-600 text-white px-3 py-1 rounded-full text-sm font-semibold'>Joined</span>
              </td>
              <td>
                <span className="badge badge-ghost badge-sm">10 June 2024</span>
              </td>
              <th className='flex justify-center'>
                <button className="btn btn-ghost btn-xs text-red-600">
                  <FontAwesomeIcon icon={faTrash} size='lg' />
                </button>
              </th>
            </tr>
            {/* row 3 */}
            <tr>
              <th>
                <label>
                  <input type="checkbox" className="checkbox" />
                </label>
              </th>
              <td>
                <div className="flex items-center gap-3">
                  <div className="avatar">
                    <div className="mask mask-squircle h-12 w-12">
                      <img
                        src="https://img.daisyui.com/images/profile/demo/4@94.webp"
                        alt="Avatar Tailwind CSS Component" />
                    </div>
                  </div>
                  <div>
                    <div className="font-bold">Marjy Ferencz</div>
                    <div className="text-sm opacity-50">Project Manager</div>
                  </div>
                </div>
              </td>
              <td>
                <span className='bg-orange-400 text-white px-3 py-1 rounded-full text-sm font-semibold'>pending</span>
              </td>
              <td>
                <span className="badge badge-ghost badge-sm">10 January 2024</span>
              </td>
              <th className='flex justify-center'>
                <button className="btn btn-ghost btn-xs text-red-600">
                  <FontAwesomeIcon icon={faTrash} size='lg' />
                </button>
              </th>
            </tr>
          </tbody>
          {/* foot */}
          <tfoot>
            <tr>
              <th></th>
              <th>Name</th>
              <th>Status</th>
              <th>Join At</th>
              <th></th>
            </tr>
          </tfoot>
        </table>
      </div>
    </div>
  )
}
