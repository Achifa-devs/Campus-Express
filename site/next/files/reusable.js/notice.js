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