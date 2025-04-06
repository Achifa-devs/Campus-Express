function seller_overlay_setup(status, content) {
    
    let overlay = document.createElement('div')

    let contentCnt = document.createElement('div')
    contentCnt.innerHTML = content;
    contentCnt.style.color='#fff'

    if(status === true){
        overlay.className='seller-overlay'
        overlay.id='seller-overlay'
        overlay.append(contentCnt)
        document.body.append(overlay)
    }else{
        // document.querySelector('.seller-overlay').removeAttribute('id');
        if(document.querySelector('.seller-overlay')){
            [...document.querySelectorAll('.seller-overlay')].map(item => item.hasAttribute('id') ? item.remove() : '');
            console.log(document.querySelector('.seller-overlay'));
        }
    }
}

function buyer_overlay_setup(status, content) {
    
   let overlay = document.createElement('div')

    let contentCnt = document.createElement('div')
    contentCnt.innerHTML = content;
    contentCnt.style.color='#fff'

    if(status === true){
        overlay.className='buyer-overlay'
        overlay.id='buyer-overlay'
        overlay.append(contentCnt)
        document.body.append(overlay)
    }else{
        // document.querySelector('.buyer-overlay').removeAttribute('id');
        if(document.querySelector('.buyer-overlay')){
            [...document.querySelectorAll('.buyer-overlay')].map(item => item.hasAttribute('id') ? item.remove() : '');
            console.log(document.querySelector('.buyer-overlay'));
        }
    }
}

module.exports={
    seller_overlay_setup,
    buyer_overlay_setup
}