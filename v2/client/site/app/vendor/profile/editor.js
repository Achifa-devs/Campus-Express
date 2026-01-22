"use client"
import React, { useState } from 'react';
import dynamic from 'next/dynamic';

// Dynamic import to avoid SSR issues
const ReactFroala = dynamic(() => import('react-froala-wysiwyg'), { ssr: false });

function products_overlay_setup(status, content) {
    if (typeof document === 'undefined') return;
    
    let overlay = document.createElement('div')

    let contentCnt = document.createElement('div')
    contentCnt.innerHTML = content;
    contentCnt.style.color='#fff'

    if(status === true){
        overlay.className='seller-overlay'
        overlay.id='seller-overlay'
        overlay.append(content)
        document.body.append(overlay)
    }else{
        if(document.querySelector('.seller-overlay')){
            document.querySelector('.seller-overlay').remove();
            console.log(document.querySelector('.seller-overlay'));
        }
    }
}

const MyEditor = () => {
  const [editorContent, setEditorContent] = useState('');

  const handleModelChange = (model) => {
    setEditorContent(model);
  };

  return (
    <ReactFroala
      model={editorContent}
      onModelChange={handleModelChange}
    />
  );
};

export {
    products_overlay_setup,
    MyEditor
}
