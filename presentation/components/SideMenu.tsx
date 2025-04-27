import React from 'react'
import Section from './Navigation/Section/Section'
import NavItem from './Navigation/Section/NavItem'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faCalendarDays, faClipboardList, faComment, faDashboard, faLink, faMessage, faPeopleGroup } from '@fortawesome/free-solid-svg-icons'
import Icon from '@mdi/react'
import { icon } from '@fortawesome/fontawesome-svg-core'
import { mdiCommentAccountOutline, mdiCommentOutline, mdiGrid, mdiMessage, mdiMessageOutline, mdiNoteOutline, mdiWechat } from '@mdi/js'

export default function SideMenu() {

  return (
    <div className='bg-indigo-100 dark:bg-slate-800 hidden lg:block h-full  w-[16%]'>
        <div className='flex justify-center items-center mb-10 mt-10 p-4'>
          <img src={'/images/logo.png'} className='w-full h-fit' width={'10%'} height={'10%'} />
        </div>
       <div className='w-full pl-4'>
        <Section title='Menu'>
              <NavItem to='/dashboard'  title='Dashboard' icon={<FontAwesomeIcon icon={faDashboard} size={'xl'}  />} />
              <NavItem  to='/schedule'  title='Schedule' icon={<FontAwesomeIcon icon={faCalendarDays} size={'xl'} />} />
              <NavItem  to='/team'  title='Team' icon={<FontAwesomeIcon icon={faPeopleGroup} size={'xl'} />} />
              <NavItem title='Chat' icon={<FontAwesomeIcon icon={faComment} size={'xl'} />} />
              <NavItem title='Links' icon={<FontAwesomeIcon icon={faLink} size={'xl'}  />} />
              <NavItem title='Notes' to='/notes' icon={<FontAwesomeIcon icon={faClipboardList} size={'xl'}  />} />
          </Section>
       </div>
    </div>
  )
}

