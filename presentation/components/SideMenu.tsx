import React from 'react'
import Section from './Navigation/Section/Section'
import NavItem from './Navigation/Section/NavItem'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faCalendarDays, faComment, faDashboard, faLink, faMessage, faPeopleGroup } from '@fortawesome/free-solid-svg-icons'
import Icon from '@mdi/react'
import { icon } from '@fortawesome/fontawesome-svg-core'
import { mdiCommentAccountOutline, mdiCommentOutline, mdiGrid, mdiMessage, mdiMessageOutline, mdiNoteOutline, mdiWechat } from '@mdi/js'

export default function SideMenu() {

  return (
    <div className='bg-indigo-100 hidden lg:block h-full p-4 w-[16%]'>
        <div className='flex justify-center items-center'>
{/*           <img src={'/images/logo.png'} className='w-full h-fit' width={'100%'} height={'50%'} />
 */}        </div>
        <Section title='Menu'>
            <NavItem to='/dashboard'  title='Dashboard' icon={<FontAwesomeIcon icon={faDashboard} size={'xl'}  />} />
            <NavItem  to='/schedule'  title='Schedule' icon={<FontAwesomeIcon icon={faCalendarDays} size={'xl'} />} />
            <NavItem  to='/team'  title='Team' icon={<FontAwesomeIcon icon={faPeopleGroup} size={'xl'} />} />
            <NavItem title='Chat' icon={<Icon path={mdiWechat} size={3/2} />} />
            <NavItem title='Links' icon={<FontAwesomeIcon icon={faLink} size={'xl'}  />} />
            <NavItem title='Notes' icon={<Icon path={mdiNoteOutline} size={3/2} />} />
        </Section>
    </div>
  )
}

