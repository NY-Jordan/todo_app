import { useDroppable } from '@dnd-kit/core';
import React, { useEffect, useState } from 'react'
import { motion } from 'framer-motion';

export default function DroppableArea({active} : {active : boolean}) {
      
    return (
      <motion.div
      className='h-40'
        style={{
          width: 300,
          border:'2px dashed gray', // Bordure dynamique
          position: 'relative',
          overflow: 'hidden',
          display : active ? "block" : 'none'
        }}
      >
        {active && <p style={{ position: 'absolute', top: '50%', left: '50%', transform: 'translate(-50%, -50%)' }}>Drop here</p>}
      </motion.div>
    );
}
