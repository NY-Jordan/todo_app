import React, { ReactHTML, ReactNode } from 'react'

type CustomButtonType = {
    variant? : 'primary' | 'secondary' | 'dark'| 'submit',
    loader? : boolean,
    size? : 'xs'| 'sm' | 'md' | 'lg',
    btnClassName? : string,
    form? : string,
    icon? : ReactNode,
    type? : 'submit' | 'button',
    isDisabled? : boolean,
    onClick? : Function
    text : string
}

export default function CustomButton({text, onClick, variant='primary', icon, type = 'button', form, btnClassName, size = 'md', isDisabled = false , loader=false} : CustomButtonType) {
  const variantValue  = `btn-${variant}`;
  return (
    <>
       <button type={type} disabled={isDisabled || loader} onClick={() => onClick ?onClick() : {}} form={form} className={` ${variantValue} ${btnClassName} disabled:shadow-gray-400 flex items-center`}>
        {loader ? <span className="loading loading-dots loading-xs"></span>
 : <span className='flex items-center gap-2'>{icon}{text}</span>}</button>
    </>
  )
}
