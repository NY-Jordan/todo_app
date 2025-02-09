import CustomButton from '@/presentation/components/button/CustomButton';
import Layout from '@/presentation/layout/Layout'
import { faArrowLeft, faPlus, faReply, faThumbsDown, faThumbsUp } from '@fortawesome/free-solid-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import React from 'react'
import classNames from 'classnames';
import { icon } from '@fortawesome/fontawesome-svg-core';

export default function index() {
  return (
    <Layout pageTitle='Manage Your Tasks'>
        <div className=' flex space-x-5 items-center'>
            <a className=' hover:bg-gray-200 p-3 rounded-full hover:cursor-pointer'><FontAwesomeIcon icon={faArrowLeft} size='xl' /></a>
            <span className='text-2xl font-semibold '>Tasks Title Test</span>
        </div>
        <div>
        <div className='my-8 w-1/2 pl-[3%]'>
                <div className='flex gap-3'>
                    <div className="avatar">
                      <div className="mask mask-squircle rounded-full h-12 w-12">
                        <img
                          src={"https://i.pinimg.com/736x/dc/eb/9d/dceb9d37b7f174925b3e0a562191e07b.jpg"}
                          alt="Avatar Tailwind CSS Component" />
                      </div>
                    </div>
                    <div className='w-full'>
                        <p className='text-md font-semibold'>Yvan Jordan</p>
                        <p>
                            Lorem, ipsum dolor sit amet consectetur adipisicing elit. Cumque ipsam ducimus quisquam aspernatur molestiae quidem corporis quaerat eum fuga debitis reprehenderit, facere eaque accusantium iusto quia! Quia odio soluta voluptatem?
                        </p>
                        <div className='mt-3 flex gap-3'>
                            <a data-tip='reply' className='flex tooltip hover:cursor-pointer items-center gap-2 text-primary'>
                                <span>3</span>
                                <FontAwesomeIcon icon={faReply} />
                            </a>
                            <a  data-tip='Yeah 😎' className='flex tooltip hover:cursor-pointer items-center gap-2 '>
                                <span>3</span>
                                <FontAwesomeIcon icon={faThumbsUp} />
                            </a>
                            <a  data-tip='What??🧐' className='flex  tooltip hover:cursor-pointer items-center gap-2 '>
                                <span>3</span>
                                <FontAwesomeIcon icon={faThumbsDown} />
                            </a>
                        </div>
                        {/* reply Section */}
                        <div>
                            
                        </div>
                    </div>
                </div>
        </div>
        <div className='flex flex-col justify-center gap-3 w-1/3'>
            <textarea
                placeholder="Write here"
                className="textarea  textarea-bordered textarea-lg w-full max-w-xl"></textarea>
                <CustomButton size='sm' btnClassName='w-16 flex self-end ' icon={<FontAwesomeIcon icon={faPlus}  />} text='Add'  variant='primary' />
        </div>
        </div>
    </Layout>);
}