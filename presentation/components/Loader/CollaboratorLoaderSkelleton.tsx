import React from 'react'

export default function CollaboratorLoaderSkelleton() {
  return (
    <>
      <div className="flex items-center gap-4 w-full">
        <div className="skeleton h-16 w-16 shrink-0 rounded-full"></div>
        <div className="flex flex-col gap-4 w-full">
          <div className="skeleton h-4 w-[60%]"></div>
          <div className="skeleton h-4 w-28"></div>
        </div>
      </div>
      <div className="flex items-center gap-4 w-full">
        <div className="skeleton h-16 w-16 shrink-0 rounded-full"></div>
        <div className="flex flex-col gap-4 w-full">
          <div className="skeleton h-4 w-[60%]"></div>
          <div className="skeleton h-4 w-28"></div>
        </div>
      </div>
      <div className="flex items-center gap-4 w-full">
        <div className="skeleton h-16 w-16 shrink-0 rounded-full"></div>
        <div className="flex flex-col gap-4 w-full">
          <div className="skeleton h-4 w-[60%]"></div>
          <div className="skeleton h-4 w-28"></div>
        </div>
      </div>
    </>
  )
}
