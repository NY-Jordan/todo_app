import { faBars, faCog, faSignOut } from '@fortawesome/free-solid-svg-icons'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import React, { useEffect, useState } from 'react'
import Section from './Navigation/Section/Section'
import NavItem from './Navigation/Section/NavItem'
import {LogoutService} from "@/Infrastructure/Services/Auth/LoginService";
import { useRouter } from 'next/router'
import { UserDetailsEntitie } from '@/domain/entities/user.entities'
import Notification from './Notification/Notification'
import Icon from '@mdi/react'
import { mdiBellOutline, mdiCogOutline, mdiMoonFirstQuarter, mdiMoonFull, mdiMoonWaningCrescent, mdiSunWireless, mdiWhiteBalanceSunny } from '@mdi/js'
import { useAppDispatch, useAppSelector } from '@/app/store/hook'
import { toggleTheme } from '@/app/reducers/ThemeReducer'

export default function Menu({pageTitle} : {pageTitle? : string}) {
    const router  = useRouter();
    const [currentUser, setCurrentUser] = useState<UserDetailsEntitie>();
    const [activeNotification , setActiveNotification]  = useState<boolean>(false);

    const handleLogout = () => {
        LogoutService();
        router.push('/auth/login')
    }

    useEffect(() => {
        const user  = localStorage.getItem('user')
        if (user) {
            const userDetails  = JSON.parse(user) as UserDetailsEntitie
            setCurrentUser(userDetails)
        }
       

    }, []);

    const dispatch = useAppDispatch();
    const ThemeState = useAppSelector(state => state.theme);

    
  return (
   <>
    <div className='lg:px-6  xs:px-2 flex  flex-col lg:flex-row justify-between lg:items-center dark:border-l-2 dark:border-l-neutral-900 dark:border-slate-400 '>
        <div className='mb-5 space-x-4 flex items-center'>
            
            <div className="drawer drawer-start w-fit z-200 lg:hidden xs:block ">
                <input id="my-drawer-4" type="checkbox" className="drawer-toggle" />
                <div className="drawer-content w-fit">
                    <label htmlFor="my-drawer-4" className="drawer-button hover:cursor-pointer "> <FontAwesomeIcon icon={faBars} size='xl' /></label>
                </div>
                <div className="drawer-side">
                    <label htmlFor="my-drawer-4" aria-label="close sidebar" className="drawer-overlay"></label>
                    <ul className="menu bg-indigo-100 text-base-content min-h-full w-80 p-4">
                     <div className='bg-indigo-100 h-full p-4 w-full'>
                        <Section title='Menu'>
                            <NavItem title='Dashboard' icon={<svg width="18px"  className="fill-blue-500 ..." height="18px" viewBox="0 -0.5 21 21" version="1.1" xmlns="http://www.w3.org/2000/svg"  fill="#6366f1"><g id="SVGRepo_bgCarrier" stroke-width="0"></g><g id="SVGRepo_tracerCarrier" stroke-linecap="round" stroke-linejoin="round"></g><g id="SVGRepo_iconCarrier"> <title>menu_navigation_grid [#1528]</title> <desc>Created with Sketch.</desc> <defs> </defs> <g id="Page-1" stroke="none" stroke-width="1" fill="none" fill-rule="evenodd"> <g id="Dribbble-Light-Preview" transform="translate(-139.000000, -200.000000)" fill="#000000"> <g id="icons" transform="translate(56.000000, 160.000000)"> <path d="M101.9,57.009 C101.9,57.56 101.38235,58 100.80275,58 L97.65275,58 C97.0742,58 96.65,57.56 96.65,57.009 L96.65,54.009 C96.65,53.458 97.0742,53 97.65275,53 L100.80275,53 C101.38235,53 101.9,53.458 101.9,54.009 L101.9,57.009 Z M100.80275,51 L97.65275,51 C95.9129,51 94.55,52.352 94.55,54.009 L94.55,57.009 C94.55,58.666 95.9129,60 97.65275,60 L100.80275,60 C102.5426,60 104,58.666 104,57.009 L104,54.009 C104,52.352 102.5426,51 100.80275,51 L100.80275,51 Z M90.35,57.009 C90.35,57.56 89.83235,58 89.25275,58 L86.10275,58 C85.5242,58 85.1,57.56 85.1,57.009 L85.1,54.009 C85.1,53.458 85.5242,53 86.10275,53 L89.25275,53 C89.83235,53 90.35,53.458 90.35,54.009 L90.35,57.009 Z M89.25275,51 L86.10275,51 C84.3629,51 83,52.352 83,54.009 L83,57.009 C83,58.666 84.3629,60 86.10275,60 L89.25275,60 C90.9926,60 92.45,58.666 92.45,57.009 L92.45,54.009 C92.45,52.352 90.9926,51 89.25275,51 L89.25275,51 Z M101.9,46.009 C101.9,46.56 101.38235,47 100.80275,47 L97.65275,47 C97.0742,47 96.65,46.56 96.65,46.009 L96.65,43.009 C96.65,42.458 97.0742,42 97.65275,42 L100.80275,42 C101.38235,42 101.9,42.458 101.9,43.009 L101.9,46.009 Z M100.80275,40 L97.65275,40 C95.9129,40 94.55,41.352 94.55,43.009 L94.55,46.009 C94.55,47.666 95.9129,49 97.65275,49 L100.80275,49 C102.5426,49 104,47.666 104,46.009 L104,43.009 C104,41.352 102.5426,40 100.80275,40 L100.80275,40 Z M90.35,46.009 C90.35,46.56 89.83235,47 89.25275,47 L86.10275,47 C85.5242,47 85.1,46.56 85.1,46.009 L85.1,43.009 C85.1,42.458 85.5242,42 86.10275,42 L89.25275,42 C89.83235,42 90.35,42.458 90.35,43.009 L90.35,46.009 Z M89.25275,40 L86.10275,40 C84.3629,40 83,41.352 83,43.009 L83,46.009 C83,47.666 84.3629,49 86.10275,49 L89.25275,49 C90.9926,49 92.45,47.666 92.45,46.009 L92.45,43.009 C92.45,41.352 90.9926,40 89.25275,40 L89.25275,40 Z" id="menu_navigation_grid-[#1528]"> </path> </g> </g> </g> </g></svg>} />
                            <NavItem title='Schedule' icon={<svg width="26px" height="26px" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg"><g id="SVGRepo_bgCarrier" stroke-width="0"></g><g id="SVGRepo_tracerCarrier" stroke-linecap="round" stroke-linejoin="round"></g><g id="SVGRepo_iconCarrier"> <path d="M7 3V6M17 3V6M7.10002 20C7.56329 17.7178 9.58104 16 12 16C14.419 16 16.4367 17.7178 16.9 20M6.2 21H17.8C18.9201 21 19.4802 21 19.908 20.782C20.2843 20.5903 20.5903 20.2843 20.782 19.908C21 19.4802 21 18.9201 21 17.8V8.2C21 7.07989 21 6.51984 20.782 6.09202C20.5903 5.71569 20.2843 5.40973 19.908 5.21799C19.4802 5 18.9201 5 17.8 5H6.2C5.0799 5 4.51984 5 4.09202 5.21799C3.71569 5.40973 3.40973 5.71569 3.21799 6.09202C3 6.51984 3 7.07989 3 8.2V17.8C3 18.9201 3 19.4802 3.21799 19.908C3.40973 20.2843 3.71569 20.5903 4.09202 20.782C4.51984 21 5.07989 21 6.2 21ZM14 11C14 12.1046 13.1046 13 12 13C10.8954 13 10 12.1046 10 11C10 9.89543 10.8954 9 12 9C13.1046 9 14 9.89543 14 11Z" stroke="#000000" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"></path> </g></svg>} />
                            <NavItem title='Team' icon={<svg fill="#000000" width="26px" height="26px" viewBox="0 0 256 256" id="Layer_1" version="1.1"  xmlns="http://www.w3.org/2000/svg" ><g id="SVGRepo_bgCarrier" stroke-width="0"></g><g id="SVGRepo_tracerCarrier" stroke-linecap="round" stroke-linejoin="round"></g><g id="SVGRepo_iconCarrier"> <g> <path d="M184.4,48.5L184.4,48.5c1.9,9.7,10.4,16.8,20.3,16.8c9.9,0,18.4-7.1,20.3-16.8l2.5-12.7c0.8-6.2-1-12.4-5.1-17.1 s-10-7.4-16.2-7.4h-2.9c-6.2,0-12.1,2.7-16.2,7.4s-6,10.9-5.1,17.4L184.4,48.5z M194.6,25.3c2.2-2.5,5.4-4,8.8-4h2.9 c3.4,0,6.5,1.4,8.8,4c2.2,2.5,3.2,5.9,2.8,8.9l-2.4,12.4c-1,5.1-5.4,8.7-10.6,8.7s-9.6-3.7-10.6-8.7l-2.4-12.1 C191.4,31.2,192.4,27.8,194.6,25.3z"></path> <path d="M251.3,114.4l-5.7-27c-0.7-3.3-3.1-6-6.2-7.1l-19.7-7l-14.8,14.8l-14.8-14.8l-19.7,7c-3.1,1.1-5.5,3.8-6.2,7.1l-5.7,27 c-0.6,2.7,1.1,5.3,3.8,5.9c2.7,0.6,5.3-1.1,5.9-3.8l5.6-26.8l13.8-4.9l17.4,17.4l17.4-17.4l13.6,4.7l5.7,27 c0.5,2.3,2.6,3.9,4.9,3.9c0.3,0,0.7,0,1-0.1C250.1,119.8,251.8,117.1,251.3,114.4z"></path> <path d="M30.9,48.5L30.9,48.5c1.9,9.7,10.4,16.8,20.3,16.8c9.9,0,18.4-7.1,20.3-16.8L74,35.8c0.8-6.2-1-12.4-5.1-17.1 s-10-7.4-16.2-7.4h-2.9c-6.2,0-12.1,2.7-16.2,7.4s-6,10.9-5.1,17.4L30.9,48.5z M41.1,25.3c2.2-2.5,5.4-4,8.8-4h2.9 c3.4,0,6.5,1.4,8.8,4c2.2,2.5,3.2,5.9,2.8,8.9l-2.4,12.4c-1,5.1-5.4,8.7-10.6,8.7s-9.6-3.7-10.6-8.7l-2.4-12.1 C37.8,31.2,38.9,27.8,41.1,25.3z"></path> <path d="M68.7,84.8l13.6,4.7l5.7,27c0.5,2.3,2.6,3.9,4.9,3.9c0.3,0,0.7,0,1-0.1c2.7-0.6,4.4-3.2,3.8-5.9l-5.7-27 c-0.7-3.3-3.1-6-6.2-7.1l-19.7-7L51.2,88.2L36.4,73.3l-19.7,7c-3.1,1.1-5.5,3.8-6.2,7.1l-5.7,27c-0.6,2.7,1.1,5.3,3.8,5.9 c2.7,0.6,5.3-1.1,5.9-3.8L20,89.7l13.8-4.9l17.4,17.4L68.7,84.8z"></path> <path d="M128,189.5c9.9,0,18.4-7.1,20.3-16.8l2.5-12.7c0.8-6.2-1-12.4-5.1-17.1c-4.1-4.7-10-7.4-16.2-7.4h-2.9 c-6.2,0-12.1,2.7-16.2,7.4c-4.1,4.7-6,10.9-5.1,17.4l2.4,12.4v0C109.6,182.4,118.1,189.5,128,189.5z M117.8,149.5 c2.2-2.5,5.4-4,8.8-4h2.9c3.4,0,6.5,1.4,8.8,4c2.2,2.5,3.2,5.9,2.8,8.9l-2.4,12.4c-1,5.1-5.4,8.7-10.6,8.7s-9.6-3.7-10.6-8.7 l-2.4-12.1C114.6,155.4,115.6,152,117.8,149.5z"></path> <path d="M168.8,211.7c-0.7-3.3-3.1-6-6.2-7.1l-19.7-7L128,212.4l-14.8-14.8l-19.7,7c-3.1,1.1-5.5,3.8-6.2,7.1l-5.7,27 c-0.6,2.7,1.1,5.3,3.8,5.9c2.7,0.6,5.3-1.1,5.9-3.8l5.5-26.8l13.8-4.9l17.4,17.4l17.4-17.4l13.6,4.7l5.7,27 c0.5,2.3,2.6,3.9,4.9,3.9c0.3,0,0.7,0,1-0.1c2.7-0.6,4.4-3.2,3.8-5.9L168.8,211.7z"></path> <path d="M213.4,133.5c-2.8-0.3-5.2,1.7-5.4,4.5c-2,20.7-11.9,39.5-27.7,53c-2.1,1.8-2.3,4.9-0.6,7c1,1.2,2.4,1.7,3.8,1.7 c1.1,0,2.3-0.4,3.2-1.2c17.8-15.2,28.9-36.3,31.2-59.6C218.1,136.2,216.1,133.8,213.4,133.5z"></path> <path d="M48.1,138c-0.3-2.7-2.7-4.7-5.4-4.5c-2.7,0.3-4.7,2.7-4.5,5.4c2.3,23.3,13.4,44.5,31.2,59.6c0.9,0.8,2.1,1.2,3.2,1.2 c1.4,0,2.8-0.6,3.8-1.8c1.8-2.1,1.5-5.2-0.6-7C60,177.5,50.1,158.7,48.1,138z"></path> <path d="M101.7,54.1c16.7-5.9,35.9-5.9,52.7,0c0.5,0.2,1.1,0.3,1.7,0.3c2,0,4-1.3,4.7-3.3c0.9-2.6-0.4-5.4-3-6.3 c-18.9-6.7-40.4-6.7-59.3,0c-2.6,0.9-3.9,3.8-3,6.3C96.2,53.7,99.1,55,101.7,54.1z"></path> </g> </g></svg>} />
                            <NavItem title='Tasks' icon={<svg width="26px" height="26px" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg"><g id="SVGRepo_bgCarrier" stroke-width="0"></g><g id="SVGRepo_tracerCarrier" stroke-linecap="round" stroke-linejoin="round"></g><g id="SVGRepo_iconCarrier"> <path opacity="0.4" d="M12.3691 8.87988H17.6191" stroke="#292D32" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round"></path> <path opacity="0.4" d="M6.38086 8.87988L7.13086 9.62988L9.38086 7.37988" stroke="#292D32" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round"></path> <path opacity="0.4" d="M12.3691 15.8799H17.6191" stroke="#292D32" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round"></path> <path opacity="0.4" d="M6.38086 15.8799L7.13086 16.6299L9.38086 14.3799" stroke="#292D32" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round"></path> <path d="M9 22H15C20 22 22 20 22 15V9C22 4 20 2 15 2H9C4 2 2 4 2 9V15C2 20 4 22 9 22Z" stroke="#292D32" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round"></path> </g></svg>} />
                            <NavItem title='Logs Book' icon={<svg width="26px" height="26px" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg"><g id="SVGRepo_bgCarrier" stroke-width="0"></g><g id="SVGRepo_tracerCarrier" stroke-linecap="round" stroke-linejoin="round"></g><g id="SVGRepo_iconCarrier"> <path d="M19.8978 16H7.89778C6.96781 16 6.50282 16 6.12132 16.1022C5.08604 16.3796 4.2774 17.1883 4 18.2235" stroke="#1C274D" stroke-width="1.5"></path> <path d="M8 7H16" stroke="#1C274D" stroke-width="1.5" stroke-linecap="round"></path> <path d="M8 10.5H13" stroke="#1C274D" stroke-width="1.5" stroke-linecap="round"></path> <path d="M10 22C7.17157 22 5.75736 22 4.87868 21.1213C4 20.2426 4 18.8284 4 16V8C4 5.17157 4 3.75736 4.87868 2.87868C5.75736 2 7.17157 2 10 2H14C16.8284 2 18.2426 2 19.1213 2.87868C20 3.75736 20 5.17157 20 8M14 22C16.8284 22 18.2426 22 19.1213 21.1213C20 20.2426 20 18.8284 20 16V12" stroke="#1C274D" stroke-width="1.5" stroke-linecap="round"></path> </g></svg>} />
                            <NavItem title='Hiring' icon={<svg width="26px" height="26px" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg"><g id="SVGRepo_bgCarrier" stroke-width="0"></g><g id="SVGRepo_tracerCarrier" stroke-linecap="round" stroke-linejoin="round"></g><g id="SVGRepo_iconCarrier"> <path d="M18.5 19.5L20 21M4 21C4 17.134 7.13401 14 11 14M19 17.5C19 18.8807 17.8807 20 16.5 20C15.1193 20 14 18.8807 14 17.5C14 16.1193 15.1193 15 16.5 15C17.8807 15 19 16.1193 19 17.5ZM15 7C15 9.20914 13.2091 11 11 11C8.79086 11 7 9.20914 7 7C7 4.79086 8.79086 3 11 3C13.2091 3 15 4.79086 15 7Z" stroke="#000000" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"></path> </g></svg>} />
                        </Section>

                        <Section title='Report'>
                            <NavItem title='Time Clocking' icon={<svg width="26px" height="26px" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg"><g id="SVGRepo_bgCarrier" stroke-width="0"></g><g id="SVGRepo_tracerCarrier" stroke-linecap="round" stroke-linejoin="round"></g><g id="SVGRepo_iconCarrier"> <path d="M12 7V12H15M21 12C21 16.9706 16.9706 21 12 21C7.02944 21 3 16.9706 3 12C3 7.02944 7.02944 3 12 3C16.9706 3 21 7.02944 21 12Z" stroke="#000000" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"></path> </g></svg>} />
                            <NavItem title='Payroll' icon={<svg width="26px" height="26px" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg"><g id="SVGRepo_bgCarrier" stroke-width="0"></g><g id="SVGRepo_tracerCarrier" stroke-linecap="round" stroke-linejoin="round"></g><g id="SVGRepo_iconCarrier"> <path opacity="0.4" d="M12.3691 8.87988H17.6191" stroke="#292D32" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round"></path> <path opacity="0.4" d="M6.38086 8.87988L7.13086 9.62988L9.38086 7.37988" stroke="#292D32" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round"></path> <path opacity="0.4" d="M12.3691 15.8799H17.6191" stroke="#292D32" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round"></path> <path opacity="0.4" d="M6.38086 15.8799L7.13086 16.6299L9.38086 14.3799" stroke="#292D32" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round"></path> <path d="M9 22H15C20 22 22 20 22 15V9C22 4 20 2 15 2H9C4 2 2 4 2 9V15C2 20 4 22 9 22Z" stroke="#292D32" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round"></path> </g></svg>} />
                        </Section>

                        <div className='flex justify-start mt-20'>
                        <img src='/image2.png'  />
                        </div>
                    </div>
                    </ul>
                </div>
            </div>
            <span className='text-3xl  font-semibold ' style={{ color : '#3577c2' }}>{pageTitle}</span>
        </div>
       
        <div className='flex items-center space-x-8 w-fit'>
                <div className='border flex items-center dark:text-white  h-1/2 p-2 rounded-full'>
                    <a href='#' onClick={() => setActiveNotification(!activeNotification)}>
                        <Icon path={mdiBellOutline} size={1} />
                    </a>
                </div>
                <div className='border flex items-center  dark:text-white h-1/2 p-2 rounded-full'>
                    <a onClick={() => dispatch(toggleTheme())} href='#'>
                    {ThemeState.darkMode ?    <Icon path={mdiWhiteBalanceSunny} size={1} /> : <Icon path={mdiMoonWaningCrescent} size={1} /> }
                    </a>
                      
                    
                </div>
                <div className='dark:text-white'>
                    <div className="dropdown dropdown-bottom dropdown-end hover:cursor-pointer">
                        <div tabIndex={0}  className="m-1 flex items-center">
                            <div className="avatar online">
                                <div className="rounded-full w-9">
                                    <img src={currentUser?.picture} />
                                </div>
                                
                            </div>
                            <div className='ml-2'>
                                <div>
                                    <span className=' text-md  font-gray-500'>{currentUser?.username}</span>
                                </div>
                                <div>
                                    <span className=' text-xs font-gray-500'>{currentUser?.email}</span>
                                </div>
                            </div>
                        </div>
                        <ul className="menu dropdown-content bg-base-100 rounded-box z-[1] w-52 p-2 shadow">
                            <li ><a href='#' onClick={() => handleLogout() } className='text-red-800' ><FontAwesomeIcon icon={faSignOut} /> Sign Out</a></li>
                        </ul>
                    </div>
                </div>
        </div>
    </div>
    <Notification active={activeNotification} setActive={setActiveNotification}/>

   </>
  )
}
