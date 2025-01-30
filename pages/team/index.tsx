import { useAppSelector } from '@/app/store/hook';
import { IProject } from '@/domain/entities/project.entities';
import { FetchAllProjects } from '@/Infrastructure/Services/projects/ProjectsService';
import Layout from '@/presentation/layout/Layout';
import React, { useEffect } from 'react'
import { useRouter } from 'next/router';

export default function index() {
    const router  = useRouter();
     useEffect(() => {
        FetchAllProjects();
      }, [])
        const fecthProjectsState = useAppSelector(state => state.projects).fetch
    
    
  return (
    <Layout pageTitle="Pick Your Team">
   
        <div className='flex flex-wrap items-center gap-10'>
            {fecthProjectsState.data.projects  &&  fecthProjectsState.data.projects.map((project : IProject) => {
        return <div onClick={() => router.push(`/tasks/${project.id}`)} className="card bg-base-100 w-96 shadow-xl hover:cursor-pointer hover:scale-105 transition-transform duration-150 ease-in-out">
            <div className="card-body flex flex-row justify-center items-center">
                <div className="avatar ">
                    <div className="w-24 rounded-full">
                        <img src={project.logo}  style={{
                            width : "100%",
                            height : "100%",
                            objectFit : "cover"
                        }} />
                    </div>
                </div>
                <p>{project.name}</p>
            </div>
        </div>
    })  }   
        </div>

  </Layout>
  )
}
