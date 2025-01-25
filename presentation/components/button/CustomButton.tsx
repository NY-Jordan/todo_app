import React from 'react'

type CustomButtonType = {
    variant? : 'primary' | 'secondary' | 'dark'| 'submit',
    loader? : boolean,
    size? : 'xs'| 'sm' | 'md' | 'lg',
    btnClassName? : string,
    form? : string,
    type? : 'submit' | 'button',
    isDisabled? : boolean,
    onClick? : Function
    text : string
}

export default function CustomButton({text, onClick, variant='primary',type = 'button', form, btnClassName, size = 'md', isDisabled = false , loader=false} : CustomButtonType) {
  return (
    <>
       <button type={type} disabled={isDisabled || loader} onClick={() => onClick ?onClick() : {}} form={form} className={`btn-${variant} btn-${size} ${btnClassName} disabled:shadow-gray-400`}>{loader ? <span className="loading loading-dots loading-xs"></span>
 : text}</button>
    </>
  )
}
