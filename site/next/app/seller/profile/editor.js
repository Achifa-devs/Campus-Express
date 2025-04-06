function seller_shop_overlay_setup(status, content) {
    
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
        // document.querySelector('.seller-overlay').removeAttribute('id');
        if(document.querySelector('.seller-overlay')){
            document.querySelector('.seller-overlay').remove();
            console.log(document.querySelector('.seller-overlay'));
        }
    }

}


import React, { useState } from 'react';
import ReactFroala from 'react-froala-wysiwyg';
import 'froala-editor/css/froala_editor.pkgd.min.css';

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


module.exports={
    seller_shop_overlay_setup,
    MyEditor
}
