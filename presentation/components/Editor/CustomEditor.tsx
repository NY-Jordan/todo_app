import React, { useState, useRef, useMemo, useEffect } from 'react';
import dynamic from 'next/dynamic';
import { useRouter } from 'next/router';
import toast from 'react-hot-toast';
import { motion } from 'framer-motion';
import classNames from 'classnames';

const JoditEditor = dynamic(() => import("jodit-react"), { ssr: false });

interface CustomEditorProps {
  initialValue: string;
  onChange?: (value: string) => void;
  classStyle?: string;
  maxWords?: number;
  disabled?: boolean;
}

export default function CustomEditor({
    initialValue,
    onChange,
    classStyle,
    maxWords,
    disabled,
  }: CustomEditorProps) {
    
  const editor = useRef<any>(null);
  const router = useRouter();
  const [maxCharacters, setMaxCharacters] = useState<number | undefined>(maxWords);
  const [maxCharactersError, setMaxCharactersError] = useState<boolean>(false);
  const [contentLength, setContentLength] = useState<number>(0);

  useEffect(() => {
    setMaxCharacters(maxWords);
  }, [maxWords]);


  const configs = useMemo(() => ({
    uploader: {
      insertImageAsBase64URI: true,
      imagesExtensions: ['jpg', 'png', 'jpeg', 'gif', 'svg', 'webp']
    },
    readonly: false,
    disabled: disabled,
    placeholder: '',
    defaultLineHeight: 1.5,
    buttons: ['bold', 'italic', '|', 'ul', 'ol', '|', 'font', '|', 'outdent', 'indent', 'align', '|', 'hr', '|', 'image', '|', 'video', '|', 'fullsize', 'brush'],
    language: router.locale,
    autofocus: !disabled,
    statusbar: false,
    limitChars: maxCharacters,
    toolbarAdaptive: false,
    events: {
      paste: (e: any) => {
        const value = e.clipboardData.getData('text/html');
        const plainText = value.replace(/<[^>]+>/g, '').replace(/&nbsp;/g, ' ').replace(/\s+/g, '');
        if (maxCharacters && maxCharacters - plainText.length < 0) {
          toast.error('Le collage a échoué, le nombre maximum de caractères a été atteint.');
        }
      }
    }
  }), [router.locale, maxCharacters, disabled]);

  const handleChange = (content: string) => {
    const plainText = content
        .replace(/<[^>]+>/g, '')
        .replace(/&nbsp;/g, ' ')
        .replace(/\s+/g, '');
    if (onChange) {
      onChange(content);
    }
    setContentLength(plainText.length);
    setMaxCharactersError(maxCharacters ? plainText.length >= maxCharacters : false);
  };

  return (
      <div className={`relative w-full ${disabled ? 'cursor-not-allowed' : ''}`}>
        {disabled && <div className="absolute inset-0 bg-gray-200 pointer-events-none"></div>}
        <JoditEditor
            id="custom-editor"
            value={initialValue}
            ref={editor}
            config={configs}
            className={classStyle || "w-full h-full bg-white"}
            onChange={handleChange}
        />
        {maxCharacters && (
            <motion.div
                animate={{ x: maxCharactersError ? [0, -3, 3, -3, 3, 0] : 0 }}
                transition={{ duration: 0.3 }}
                className={maxCharactersError ? 'text-red-700' : 'text-gray-300'}
            >
              Max: {maxCharacters - contentLength}
            </motion.div>
        )}
      </div>
  );
}
