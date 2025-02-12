import React, { useState, useRef, useMemo, useEffect } from 'react';
import dynamic from 'next/dynamic';
import Head from 'next/head';
import { useRouter } from 'next/router';


const JoditEditor = dynamic(() => import("jodit-react"), { ssr: false });


export default function CustomEditor({initialValue, onChange, classStyle} : {initialValue : string, onChange? : Function, classStyle? : string}) {
  const editor = useRef(null); 
  const router = useRouter()
  const [content, setContent] = useState(initialValue); 
  const options = [ 'bold', 'italic', '|', 'ul', 'ol', '|', 'font', 'fontsize', '|', 'outdent', 'indent', 'align', '|', 'hr', '|', 'fullsize', 'brush', '|', 'table', 'link', '|', 'undo', 'redo',];
  const sm_options = [ 'bold', 'italic', '|', 'ul', 'ol', '|', 'font', '|', 'outdent', 'indent', 'align','|', 'hr','|', 'image' , '|','video', '|','fullsize', 'brush']
  
  useEffect(() => {
    setContent(initialValue);
  }, [initialValue]);

  

  const config = useMemo( 
    () => ({   
      
    }),
    []
  );

  const configs = useMemo(
    () => ({
    uploader: {         
        insertImageAsBase64URI: true,
        imagesExtensions: ['jpg', 'png', 'jpeg', 'gif', 'svg', 'webp'] // this line is not much important , use if you only strictly want to allow some specific image format
    },
    readonly: false,
    placeholder: '',
/*     defaultActionOnPaste: 'insert_as_html',
 */    defaultLineHeight: 1.5,
/*     enter: 'div',
 */   // options that we defined in above step.
    buttons: sm_options,
    language: router.locale,
    buttonsMD: sm_options,
    buttonsSM: sm_options,
    buttonsXS: sm_options,
    statusbar: false,
    sizeLG: 900,
    sizeMD: 700,
    sizeSM: 400,
    toolbarAdaptive: false,
    }),
    [router.locale],
   );

  const handleChange = (value : string) => {
    if (onChange) {
      onChange(value)
    }
  };

  useEffect(() => {
    if ( onChange) {
      onChange(content);
    }
  }, [])

  return (
    <>
      <JoditEditor 
            ref={editor}            
            value={content}  
            onChange={handleChange}
            config={configs} //handle the changes
            className={classStyle ? classStyle : "w-full h-full  bg-white"}
            />
           {/*  <style>
              {`.jodit-wysiwyg{height:300px !important}`}
            </style> */}
    </>
  );
}