import React, { useState } from 'react'
import SectionTaskHeader from './SectionTaskHeader'
import SectionTaskCard from './SectionTaskCard'
import { Reorder } from 'framer-motion'
import AddTask from './AddTask'
import { useResponsive } from '@/Infrastructure/hooks/useResponsive'

type props = {
    showMoreButton? : boolean,
    name: string,
    data : {
      color : string,
      tasks: { 
        id : number,
        title: string
        description: string
      }[]
    },
    
}

export default function SectionTask({showMoreButton, name, data}  : props) {
  const initialItems  =  data.tasks;
    const [items, setItems] = useState(initialItems);
    const {isTabletOrMobile, isSM} = useResponsive();
  return (
    <div style={{  width : isSM ? "100%" : "25%", maxWidth : isSM ? "100%" : "24%", overflowY : 'hidden'}}>
      <SectionTaskHeader count={data.tasks.length} showMoreButton={showMoreButton}  name={name} />
        <Reorder.Group axis="y" style={{ marginTop : isSM ? '0%': "10%",  }} layoutScroll onReorder={setItems} values={items}>
          {items.map((item, key) => (
             <Reorder.Item   key={item.id}  dragTransition={{ bounceStiffness: 100, bounceDamping: 10 }} value={item} id={item.id.toString()} >
                <SectionTaskCard   position={key}  color={data.color}  item={item} />
             </Reorder.Item>
          ))} 
        </Reorder.Group>
   
    </div>
  )
}
