import React, { useLayoutEffect } from 'react'
import Card from './Card/Card'
import { useAppSelector } from '@/app/store/hook';
import { fetchStats, fetchTasksActivities } from '@/Infrastructure/Services/AppService';

export default function CardStats() {
     const appStatsState = useAppSelector(state => state.app).stats
        const appCollaboratorsState = useAppSelector(state => state.app).collaborators ;
    
      useLayoutEffect(() => {
          fetchStats();

       }, [])
  return (
    <>
      <Card title='Projects' color="blue"   percent={appStatsState.data?.projects} />
      <Card  title='Tasks' color="red"  percent={appStatsState.data?.tasks} />
      <Card title='Notes' color="orange"  percent={appStatsState.data?.notes} />
      <Card title='links'  color="indigo"  percent={appStatsState.data?.links} />
    </>
  )
}
