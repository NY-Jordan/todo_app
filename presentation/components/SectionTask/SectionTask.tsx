import React, { SetStateAction, useState } from 'react'
import SectionTaskHeader from './SectionTaskHeader'
import SectionTaskCard from './SectionTaskCard'
import { Reorder } from 'framer-motion'
import AddTask from './AddTask'
import { useResponsive } from '@/Infrastructure/hooks/useResponsive'
type dataType  ={
    color : string,
    tasks: { 
      id : number,
      title: string
      description: string
    }[]
}
type props = {
    showMoreButton? : boolean,
    name: string,
    data : dataType    
}

export default function SectionTask({showMoreButton, name, data}  : props) {
  const initialItems  =  data.tasks;
    const [items, setItems] = useState(initialItems);
    const {isTabletOrMobile, isSM} = useResponsive();
  return (
    <div style={{  width : isSM ? "100%" : "25%", maxWidth : isSM ? "100%" : "24%", overflowX : 'hidden'}} className='z-10'>
      <SectionTaskHeader count={data.tasks.length} showMoreButton={showMoreButton}  name={name} />
        <Reorder.Group 
        axis="y" 
        style={{ marginTop : isSM ? '0%': "10%",  }} 
        layoutScroll 
        onReorder={setItems} 
        values={items}>
          {items.map((item, key) => (
             <Reorder.Item  drag key={item.id}  dragTransition={{ bounceStiffness: 100, bounceDamping: 10 }} value={item} id={item.id.toString()} >
                <SectionTaskCard   position={key}  color={data.color}  item={item} />
             </Reorder.Item>
          ))} 
        </Reorder.Group>
   
    </div>
  )
}
