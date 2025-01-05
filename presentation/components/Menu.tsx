import { faBars, faSignOut } from '@fortawesome/free-solid-svg-icons'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import React, { useEffect, useState } from 'react'
import Section from './Navigation/Section/Section'
import NavItem from './Navigation/Section/NavItem'
import {LogoutService} from "@/Infrastructure/Services/Auth/LoginService";
import { useRouter } from 'next/router'
import { UserDetailsEntitie } from '@/domain/entities/user.entities'
import Notification from './Notification/Notification'

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

    
  return (
   <>
    <div className='lg:px-14  xs:px-2 flex flex-col lg:flex-row justify-between lg:items-center '>
        <div className='mb-5 space-x-4 flex items-center'>
            
            <div className="drawer drawer-start w-fit z-200 lg:hidden xs:block ">
                <input id="my-drawer-4" type="checkbox" className="drawer-toggle" />
                <div className="drawer-content w-fit">
                    <label htmlFor="my-drawer-4" className="drawer-button hover:cursor-pointer"> <FontAwesomeIcon icon={faBars} size='xl' /></label>
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
            <span className='text-3xl text-indigo-900 font-semibold '>{pageTitle}</span>
        </div>
       
        <div className='flex items-center space-x-8 w-fit'>
                <label className="input input-bordered flex items-center gap-2 rounded-full">
                    <input type="text" className="grow rounded-full" placeholder="Search" />
                    <svg
                        height={30}
                        width={30}
                        xmlns="http://www.w3.org/2000/svg"
                        viewBox="0 0 16 16"
                        fill="currentColor"
                        className="h-4 w-4 opacity-70">
                        <path
                        fillRule="evenodd"
                        d="M9.965 11.026a5 5 0 1 1 1.06-1.06l2.755 2.754a.75.75 0 1 1-1.06 1.06l-2.755-2.754ZM10.5 7a3.5 3.5 0 1 1-7 0 3.5 3.5 0 0 1 7 0Z"
                        clipRule="evenodd" />
                    </svg>
                </label>
                <div className='border flex items-center  h-1/2 p-2 rounded-full'>
                    <a href='#' onClick={() => setActiveNotification(!activeNotification)}>
                        <svg width="26px" height="26px" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg"><g id="SVGRepo_bgCarrier" stroke-width="0"></g><g id="SVGRepo_tracerCarrier" stroke-linecap="round" stroke-linejoin="round"></g><g id="SVGRepo_iconCarrier"> <g clip-path="url(#clip0_15_159)"> <rect width="24" height="24" fill="white"></rect> <path d="M9.5 19C8.89555 19 7.01237 19 5.61714 19C4.87375 19 4.39116 18.2177 4.72361 17.5528L5.57771 15.8446C5.85542 15.2892 6 14.6774 6 14.0564C6 13.2867 6 12.1434 6 11C6 9 7 5 12 5C17 5 18 9 18 11C18 12.1434 18 13.2867 18 14.0564C18 14.6774 18.1446 15.2892 18.4223 15.8446L19.2764 17.5528C19.6088 18.2177 19.1253 19 18.382 19H14.5M9.5 19C9.5 21 10.5 22 12 22C13.5 22 14.5 21 14.5 19M9.5 19C11.0621 19 14.5 19 14.5 19" stroke="#000000" stroke-linejoin="round"></path> <path d="M12 5V3" stroke="#000000" stroke-linecap="round" stroke-linejoin="round"></path> </g> <defs> <clipPath id="clip0_15_159"> <rect width="24" height="24" fill="white"></rect> </clipPath> </defs> </g></svg>                    
                    </a>
                </div>
                <div className='border flex items-center h-1/2 p-2 rounded-full'>
                    <a href='#'>
                        <svg width="26px" height="26px" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg"><g id="SVGRepo_bgCarrier" stroke-width="0"></g><g id="SVGRepo_tracerCarrier" stroke-linecap="round" stroke-linejoin="round"></g><g id="SVGRepo_iconCarrier"> <rect width="24" height="24" fill="white"></rect> <path d="M13.5 2L13.9961 1.93798C13.9649 1.68777 13.7522 1.5 13.5 1.5V2ZM10.5 2V1.5C10.2478 1.5 10.0351 1.68777 10.0039 1.93798L10.5 2ZM13.7747 4.19754L13.2786 4.25955C13.3047 4.46849 13.4589 4.63867 13.6642 4.68519L13.7747 4.19754ZM16.2617 5.22838L15.995 5.6513C16.1731 5.76362 16.4024 5.75233 16.5687 5.62306L16.2617 5.22838ZM18.0104 3.86826L18.364 3.51471C18.1857 3.3364 17.9025 3.31877 17.7034 3.47359L18.0104 3.86826ZM20.1317 5.98958L20.5264 6.29655C20.6812 6.09751 20.6636 5.81434 20.4853 5.63603L20.1317 5.98958ZM18.7716 7.73831L18.3769 7.43134C18.2477 7.59754 18.2364 7.82693 18.3487 8.00503L18.7716 7.73831ZM19.8025 10.2253L19.3148 10.3358C19.3613 10.5411 19.5315 10.6953 19.7404 10.7214L19.8025 10.2253ZM22 10.5H22.5C22.5 10.2478 22.3122 10.0351 22.062 10.0039L22 10.5ZM22 13.5L22.062 13.9961C22.3122 13.9649 22.5 13.7522 22.5 13.5H22ZM19.8025 13.7747L19.7404 13.2786C19.5315 13.3047 19.3613 13.4589 19.3148 13.6642L19.8025 13.7747ZM18.7716 16.2617L18.3487 15.995C18.2364 16.1731 18.2477 16.4025 18.3769 16.5687L18.7716 16.2617ZM20.1317 18.0104L20.4853 18.364C20.6636 18.1857 20.6812 17.9025 20.5264 17.7034L20.1317 18.0104ZM18.0104 20.1317L17.7034 20.5264C17.9025 20.6812 18.1857 20.6636 18.364 20.4853L18.0104 20.1317ZM16.2617 18.7716L16.5687 18.3769C16.4024 18.2477 16.1731 18.2364 15.995 18.3487L16.2617 18.7716ZM13.7747 19.8025L13.6642 19.3148C13.4589 19.3613 13.3047 19.5315 13.2786 19.7404L13.7747 19.8025ZM13.5 22V22.5C13.7522 22.5 13.9649 22.3122 13.9961 22.062L13.5 22ZM10.5 22L10.0039 22.062C10.0351 22.3122 10.2478 22.5 10.5 22.5V22ZM10.2253 19.8025L10.7214 19.7404C10.6953 19.5315 10.5411 19.3613 10.3358 19.3148L10.2253 19.8025ZM7.73832 18.7716L8.00504 18.3487C7.82694 18.2364 7.59756 18.2477 7.43135 18.3769L7.73832 18.7716ZM5.98959 20.1317L5.63604 20.4853C5.81435 20.6636 6.09752 20.6812 6.29656 20.5264L5.98959 20.1317ZM3.86827 18.0104L3.4736 17.7034C3.31878 17.9025 3.33641 18.1857 3.51472 18.364L3.86827 18.0104ZM5.22839 16.2617L5.62307 16.5687C5.75234 16.4025 5.76363 16.1731 5.65131 15.995L5.22839 16.2617ZM4.19754 13.7747L4.68519 13.6642C4.63867 13.4589 4.46849 13.3047 4.25955 13.2786L4.19754 13.7747ZM2 13.5H1.5C1.5 13.7522 1.68777 13.9649 1.93798 13.9961L2 13.5ZM2 10.5L1.93798 10.0039C1.68777 10.0351 1.5 10.2478 1.5 10.5H2ZM4.19754 10.2253L4.25955 10.7214C4.46849 10.6953 4.63867 10.5411 4.68519 10.3358L4.19754 10.2253ZM5.22839 7.73831L5.65131 8.00503C5.76363 7.82693 5.75234 7.59755 5.62307 7.43134L5.22839 7.73831ZM3.86827 5.98959L3.51472 5.63603C3.33641 5.81434 3.31878 6.09751 3.47359 6.29656L3.86827 5.98959ZM5.98959 3.86827L6.29656 3.47359C6.09752 3.31878 5.81434 3.33641 5.63604 3.51471L5.98959 3.86827ZM7.73832 5.22839L7.43135 5.62306C7.59755 5.75233 7.82694 5.76363 8.00504 5.6513L7.73832 5.22839ZM10.2253 4.19754L10.3358 4.68519C10.5411 4.63867 10.6953 4.46849 10.7214 4.25955L10.2253 4.19754ZM13.5 1.5H10.5V2.5H13.5V1.5ZM14.2708 4.13552L13.9961 1.93798L13.0039 2.06202L13.2786 4.25955L14.2708 4.13552ZM16.5284 4.80547C15.7279 4.30059 14.8369 3.92545 13.8851 3.70989L13.6642 4.68519C14.503 4.87517 15.2886 5.20583 15.995 5.6513L16.5284 4.80547ZM16.5687 5.62306L18.3174 4.26294L17.7034 3.47359L15.9547 4.83371L16.5687 5.62306ZM17.6569 4.22182L19.7782 6.34314L20.4853 5.63603L18.364 3.51471L17.6569 4.22182ZM19.7371 5.68261L18.3769 7.43134L19.1663 8.04528L20.5264 6.29655L19.7371 5.68261ZM20.2901 10.1149C20.0746 9.16313 19.6994 8.27213 19.1945 7.47158L18.3487 8.00503C18.7942 8.71138 19.1248 9.49695 19.3148 10.3358L20.2901 10.1149ZM22.062 10.0039L19.8645 9.72917L19.7404 10.7214L21.938 10.9961L22.062 10.0039ZM22.5 13.5V10.5H21.5V13.5H22.5ZM19.8645 14.2708L22.062 13.9961L21.938 13.0039L19.7404 13.2786L19.8645 14.2708ZM19.1945 16.5284C19.6994 15.7279 20.0746 14.8369 20.2901 13.8851L19.3148 13.6642C19.1248 14.503 18.7942 15.2886 18.3487 15.995L19.1945 16.5284ZM20.5264 17.7034L19.1663 15.9547L18.3769 16.5687L19.7371 18.3174L20.5264 17.7034ZM18.364 20.4853L20.4853 18.364L19.7782 17.6569L17.6569 19.7782L18.364 20.4853ZM15.9547 19.1663L17.7034 20.5264L18.3174 19.7371L16.5687 18.3769L15.9547 19.1663ZM13.8851 20.2901C14.8369 20.0746 15.7279 19.6994 16.5284 19.1945L15.995 18.3487C15.2886 18.7942 14.503 19.1248 13.6642 19.3148L13.8851 20.2901ZM13.9961 22.062L14.2708 19.8645L13.2786 19.7404L13.0039 21.938L13.9961 22.062ZM10.5 22.5H13.5V21.5H10.5V22.5ZM9.72917 19.8645L10.0039 22.062L10.9961 21.938L10.7214 19.7404L9.72917 19.8645ZM7.4716 19.1945C8.27214 19.6994 9.16314 20.0746 10.1149 20.2901L10.3358 19.3148C9.49696 19.1248 8.71139 18.7942 8.00504 18.3487L7.4716 19.1945ZM6.29656 20.5264L8.04529 19.1663L7.43135 18.3769L5.68262 19.7371L6.29656 20.5264ZM3.51472 18.364L5.63604 20.4853L6.34315 19.7782L4.22183 17.6569L3.51472 18.364ZM4.83372 15.9547L3.4736 17.7034L4.26295 18.3174L5.62307 16.5687L4.83372 15.9547ZM3.70989 13.8851C3.92545 14.8369 4.30059 15.7279 4.80547 16.5284L5.65131 15.995C5.20584 15.2886 4.87517 14.503 4.68519 13.6642L3.70989 13.8851ZM1.93798 13.9961L4.13552 14.2708L4.25955 13.2786L2.06202 13.0039L1.93798 13.9961ZM1.5 10.5V13.5H2.5V10.5H1.5ZM4.13552 9.72917L1.93798 10.0039L2.06202 10.9961L4.25955 10.7214L4.13552 9.72917ZM4.80547 7.47159C4.30059 8.27213 3.92545 9.16313 3.70989 10.1149L4.68519 10.3358C4.87517 9.49696 5.20583 8.71138 5.65131 8.00503L4.80547 7.47159ZM3.47359 6.29656L4.83371 8.04528L5.62307 7.43134L4.26295 5.68262L3.47359 6.29656ZM5.63604 3.51471L3.51472 5.63603L4.22182 6.34314L6.34314 4.22182L5.63604 3.51471ZM8.04529 4.83371L6.29656 3.47359L5.68262 4.26294L7.43135 5.62306L8.04529 4.83371ZM10.1149 3.70989C9.16313 3.92545 8.27214 4.30059 7.4716 4.80547L8.00504 5.6513C8.71139 5.20583 9.49696 4.87517 10.3358 4.68519L10.1149 3.70989ZM10.0039 1.93798L9.72917 4.13552L10.7214 4.25955L10.9961 2.06202L10.0039 1.93798Z" fill="#000000"></path> <circle cx="12" cy="12" r="4" stroke="#000000" stroke-linejoin="round"></circle> </g></svg>
                    </a>
                </div>
                <div>
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
