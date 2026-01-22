export function openNotice(mssg) {
    
    let n_cnt = document.querySelector('.notice-cnt');
    let n_cnt_btn = document.querySelector('.notice-cnt-btn');
    if(n_cnt_btn){
        // n_cnt_btn.addEventListener('click', () => n_cnt.removeAttribute('id'))
        n_cnt.setAttribute('id', 'notice-cnt')
        n_cnt.style.zIndex = '1000000'
        n_cnt.style.zIndex = '1000000'
        n_cnt.innerHTML = mssg
    }else{
        n_cnt.setAttribute('id', 'notice-cnt')
        n_cnt.style.zIndex = '1000000'
        n_cnt.style.zIndex = '1000000'
        n_cnt.innerHTML = mssg
    }

    setTimeout(() => {
        n_cnt.removeAttribute('id')
    }, 6000);
}


export function open_notice(bool,mssg) {
    let n_cnt = document.createElement('div');
    n_cnt.className='notice-cnt';

    let n_cnt_btn = document.createElement('button');
    n_cnt_btn.className = '.notice-cnt-btn';

    n_cnt.append(n_cnt_btn)
    document.body.append(n_cnt)

    if(bool){
        // n_cnt_btn.addEventListener('click', () => n_cnt.removeAttribute('id'))
        n_cnt.setAttribute('id', 'notice-cnt')
        n_cnt.style.zIndex = '1000000'
        n_cnt.style.zIndex = '1000000'
        n_cnt.innerHTML = mssg
    }else{
        n_cnt.setAttribute('id', 'notice-cnt')
        n_cnt.style.zIndex = '1000000'
        n_cnt.style.zIndex = '1000000'
        n_cnt.innerHTML = mssg
    }

    setTimeout(() => {
        n_cnt.removeAttribute('id')
    }, 6000);
}