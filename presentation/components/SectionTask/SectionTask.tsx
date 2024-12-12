import React, { useState } from 'react'
import SectionTaskHeader from './SectionTaskHeader'
import SectionTaskCard from './SectionTaskCard'
import { Reorder } from 'framer-motion'
import AddTask from './AddTask'
import { useResponsive } from '@/Infrastructure/Hooks/useResponsive'

type props = {
    showMoreButton? : boolean,
    name: string,
    data : {
      color : string,
      tasks: { 
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
      <Reorder.Group axis="y" style={{ marginTop : isSM ? '0%': "10%",  }} onReorder={setItems} values={items}>
        {items.map((item, key) => (
            <SectionTaskCard key={key.toString()} position={key}  color={data.color}  item={item} />
        ))}
    </Reorder.Group>
    
    </div>
  )
}
