import { mdiDelete, mdiDownload, mdiPencil } from '@mdi/js'
import Icon from '@mdi/react'
import React from 'react'

export default function FileAttached({name} : {name : string}) {
  return (
    <div className='flex flex-row space-x-4 items-left justify-left'>
        <a href='#'>
            <Icon path={mdiDelete} color={'red'} size={1} />
        </a>
        <a href='#'>
            <Icon path={mdiDownload}  size={1} />
        </a>
      <p className='link link-primary'>{name}</p>
    </div>
  )
}
