"use client"
import React, { useEffect, useRef, useState } from 'react'
import '@/app/seller/new-listing/styles/xx-large.css'
import '@/app/seller/new-listing/styles/x-large.css'
import '@/app/seller/new-listing/styles/large.css'
import '@/app/seller/new-listing/styles/medium.css'
import '@/app/seller/new-listing/styles/small.css'
import items from '@/files/items.json'

export default function NewListing() {

    let [screenWidth, setScreenWidth] = useState('');
    useEffect(() => {setScreenWidth(window.innerWidth)},[]);

    let book = []
    let [edit,setEdit] = useState('');
    


    let [categoriesList, setCategoriesList] = useState([])
    let [typeList, setTypeList] = useState([]) 
    let [img_list, setimg_list] = useState([])
    let [thumbnail, set_thumbnail] = useState('')
    let [vid_list, setvid_list] = useState([])
    let [update, setUpdate] = useState(false);
    let searchParams = new URLSearchParams(window.location.search);

   
    useEffect(() => { 
        setCategoriesList(items.items.category)
    },[])
    useEffect(() => {
        if(window.localStorage.getItem('sub-categories') === null || window.localStorage.getItem('sub-categories') === 'null' || window.localStorage.getItem('sub-categories') === '' || window.localStorage.getItem('sub-categories') === undefined){
            window.localStorage.setItem('sub-categories', JSON.stringify(items.items.category))
        }

    },[])
    useEffect(() => {
        let product_id = searchParams.get('product_id'); 
        if(product_id === null){
            setUpdate(false)
        }else{
            setUpdate(true)
        }
    }, [])
    useEffect(() => {
        async function getData() {
            let product_id = searchParams.get('product_id'); // price_descending
            if(product_id !== null){
                let result = await GetItem([product_id]);
                productCategory(result[0]?.category) 
                productTitle(result[0]?.title)
                // setPhotos(result[0].photos.map(item => item.file))
                productDescription(result[0]?.description)
                productPrice(result[0]?.price)
                // setProduct_id(result[0].meta_data[0].product_id)
                productType(JSON.parse(result[0]?.others)?.cType)
                productCondition(JSON.parse(result[0]?.others)?.condition)    
                // productLocale(result[0]?.others?.locale)
                // overlay.removeAttribute('id')
            }
        }
        getData()
        async function getImages() {
            let product_id = searchParams.get('product_id'); 
            if(product_id !== ''){
                result?.map(item => productPhotos(item.file))
            }
        }
        getImages()
    }, [])
    let [sizeList, setSizeList] = useState([])
    useEffect(() => {
        for(let i=1; i<100; i++){
            if(i > 50){
                break;
            }else{
                setSizeList(item => [...item, i])
            }
        }
    },[])

    let [footWear,setFootWear] = useState([])
    let [maleList,setMaleList] = useState([])
    let [feMaleList,setFeMaleList] = useState([])
    useEffect(() => {
        let data = categoriesList.filter(data => Object.keys(data)[0] === category)
        if(data.length > 0){
            setFootWear(data[0]["FootWear"])
            setMaleList(data[0]["ClothingMale"])
            setFeMaleList(data[0]["ClothingFemale"])
        }
    },[categoriesList])

    let handleImage = (e,imgSrc) => {
        let f = e.target;
        let existingFilesCount = photos.length; // Assume this is the number of already uploaded files
        const maxFiles = 5;

        [...f.files].map((item,index) => {

            let typeCheck = item.type.split('/')[0];
            let type = typeCheck === 'image' ? 'img' : typeCheck === 'video' ? 'mp4' : ''
            
            if(type === 'mp4') {
                // openNotice("Only Photo Can Be Uploaded Here")
            }else{
                let reader = new FileReader({type: 'image/*'});

                reader.onload = (result) => {
                    let img = reader.result;
                    if(imgSrc === 'others'){
                        productPhotos(img);
                    }else{
                        set_thumbnail(img)
                    }
                }   
                reader.readAsDataURL(item);
            }
        })
        
         
        // getImage([[...f.files][0],[...f.files][0].type,[...f.files][0].size,[...f.files][0].name])
    } 

    let gender = useRef('')
    let [gender_state, set_gender_state] = useState('')
    function productGender(data) {
        gender.current = (data);
        window.localStorage.setItem('draft_gender', data)
        set_gender_state(data)
    }

    let size = useRef('')
    let [size_state, set_size_state] = useState('')
    function productSizeSelect(data) {
        size.current = (data); 
        window.localStorage.setItem('draft_size', data)
        set_size_state(data)
    }
    
    let subCategory = useRef('')
    let [subCategory_state, set_subCategory_state] = useState('')
    function productSubCategory(data) {
        subCategory.current = (data); 
        set_subCategory_state(data)
        window.localStorage.setItem('draft_sub_category', data)
        if(data === 'Create Custom Item'){
            let value = prompt('Insert Custom Sub Category')
            if(value !== ''){
                subCategory.current = value;
                set_subCategory_state(value);
                categoriesList.map(item => {
                    if(Object.keys(item)[0] === category_state){
                        cType_state === 'Foot Wear' ? item["FootWear"].push(value) : gender === 'Male' ? item["ClothingMale"].push(value) : item["ClothingFemale"].push(value)
                        window.localStorage.setItem('sub-categories', JSON.stringify(categoriesList))
                        setCategoriesList(categoriesList)
                    }
                })
                window.localStorage.setItem('draft_sub_category', value);
            }else{
                window.localStorage.removeItem('draft_sub_category')
            }
        }
    }

    let locale = useRef('')
    let [locale_state, set_locale_state] = useState('')
    function productLocale(data) {
        locale.current = (data); 
        window.localStorage.setItem('draft_locale', data)
    }

    let condition= useRef('')
    let [condition_state, set_condition_state] = useState('')
    function productCondition(data) {
        condition.current = (data); 
        window.localStorage.setItem('draft_condition', data)
        set_condition_state(data)
    }

    let title = useRef('')
    let [title_state, set_title_state] = useState('')
    function productTitle(data) {
        title.current = (data)
        window.localStorage.setItem('draft_title', data)
        set_title_state(data)
    } 

    let description = useRef('')
    let [description_state, set_description_state] = useState('')
    function productDescription(data) {
        description.current = (data)
        window.localStorage.setItem('draft_description', data)
        set_description_state(data)
    }

    let category = useRef('')
    let [category_state, set_category_state] = useState('')
    function productCategory(data) {
        category.current = (data); 
        window.localStorage.setItem('draft_category', data)
        set_category_state(data)
    }
    
    let cType = useRef('')
    let [cType_state, set_cType_state] = useState('')
    function productType(data) {
        cType.current = (data); 
        window.localStorage.setItem('draft_c_type', data)
        set_cType_state(data);

        if(data === 'Create Custom Item'){
            let value = prompt('Insert Custom Sub Category')
            if(value !== ''){
                cType.current = value;
                set_cType_state(value);

                categoriesList.map(item => {
                    if(Object.keys(item)[0] === category_state){
                        item[category_state].push(value)
                        window.localStorage.setItem('sub-categories', JSON.stringify(categoriesList))
                        setCategoriesList(categoriesList)
                    }
                })

                window.localStorage.setItem('draft_c_type', value);

            }else{
                window.localStorage.removeItem('draft_c_type')
            }

        }
    }

    let price = useRef('')
    let [price_state, set_price_state] = useState('')
    function productPrice(data) {
        price.current = (data); 
        window.localStorage.setItem('draft_price', data)
        set_price_state(data)
    }

    let stock = useRef('')
    let [stock_state, set_stock_state] = useState('')
    function productStock(data) {
        stock.current = (data); 
        set_stock_state(data)
        // window.localStorage.setItem('draft_stock', data)
    }

    let photos = useRef([])
    // let [photo_state, set_photo_state] = useState([])
    function productPhotos(data) {
        let d = data !== '' ? photos.current.push(data) : ''
        setimg_list(item => [...item, data])
    }
    function deletePhoto(data) {
        photos.current = data;
        setimg_list(data)
    }

    let videos = useRef([])
    function productVideos(data) {
        let d = data !== '' ? videos.current.push(data) : ''
        setvid_list(item => [...item, data])
        console.log(videos.current.length)
    }
    function deleteVideo(data) {
        videos.current = data;
        setimg_list(data)
    }

    useEffect(() => {
        if(window.localStorage.getItem('draft_category') !== null && window.localStorage.getItem('draft_category') !== undefined && window.localStorage.getItem('draft_category') !== ''){ 

            // productPhotos(())
            // openNotice("Your Progress Was Saved, Continue From Where You Stopped")
            let img = 
            JSON.parse(window.localStorage.getItem('draft_images')) !== null 
            ? 
            JSON.parse(window.localStorage.getItem('draft_images')).map(item => productPhotos(item)) 
            : ''

            productCategory(window.localStorage.getItem('draft_category')) 
            productTitle(window.localStorage.getItem('draft_title'))
            // setPhotos(result.photos.map(item => item.file))
            productDescription(window.localStorage.getItem('draft_description'))
            productPrice(window.localStorage.getItem('draft_price'))
            // setProduct_id(result.meta_data[0].product_id)
            productStock(window.localStorage.getItem('draft_stock'))
            productType(window.localStorage.getItem('draft_c_type'))
            productCondition(window.localStorage.getItem('draft_condition'))
            productLocale(window.localStorage.getItem('draft_locale'))
        }else{
            // setCategory('')
        }
    }, [])
    useEffect(() => {setCategoriesList(JSON.parse(window.localStorage.getItem('sub-categories')))},[])
    useEffect(() => {
        let type = categoriesList.filter(item => Object.keys(item)[0] === category.current)[0]; 
        if(type){
            setTypeList(type[category.current])
        }
    },[category_state])
 
    let handleForm = () => {
        book = []
        // alert()
        let inputs = [...document.querySelectorAll('input')]
        let textareas = [document.querySelector('.seller-shop-title')]
        let selects = [...document.querySelectorAll('select')]
        // let allFields = [...inputs,...textareas,...selects]

        let result1 = validate_inputs('input', inputs, category.current.toLowerCase() === 'lodge/apartments'
        ? videos.current : photos.current)
        let result2 = validate_inputs('textarea', textareas)
        let result3 = validate_inputs('select', selects)

        let response =  [...result1, ...result2, ...result3]
        response.map((item) => {
            if(item !== -1){
                item.err !== '' ?  book.push(false) : book.push(true)
                item.err !== '' ? item.element.style.border = '1px solid red' : item.element.style.border = '1px solid green'
                item.err !== '' ? handleErr(item.element, item.err) : handleErr(item.element, item.err)

                function handleErr(element, err) {
                    let pElem = element.parentElement;

                    if(pElem.lastChild.className === 'err-mssg'){
                        pElem.lastChild.remove()

                        let newElem = document.createElement('div')
                        newElem.className = 'err-mssg';
                        newElem.style.width = '100%';
                        newElem.style.textAlign = 'left';
                        newElem.style.justifyContent = 'left';
                        newElem.innerHTML = err;
                        pElem.append(newElem);
                    }else{
                        let newElem = document.createElement('div')
                        newElem.className = 'err-mssg';
                        newElem.style.textAlign = 'left';
                        newElem.style.justifyContent = 'left';
                        newElem.style.width = '100%';
                        newElem.innerHTML = err;
                        pElem.append(newElem);
                    }
                }


            }
        })

        let checkForError = book.filter(item => item === false)

        if(checkForError.length < 1 && lodgeAddress.length > 0){
            let overlay = document.querySelector('.overlay')
            overlay.setAttribute('id', 'overlay');
            let seller_id = window.localStorage.getItem("CE_seller_id")
            //upload for here

            
            if(update){
                let product_id = searchParams.get('product_id');
                fetch('https://ce-server.vercel.app/seller.product-update', {
                    method: 'post',
                    headers: {
                        "Content-Type": "Application/json"
                    },
                    body: JSON.stringify(
                        {
                            constantData: { 
                                title: title.current,
                                description: description.current,
                                category: category.current,
                                price: price.current,
                                photos: photos.current,
                                videos: videos.current,
                                seller_id : seller_id,
                                product_id: product_id
                                // pickupChannel: ''
                            }, 
                        
                            dynamicData: {
                                cType: cType_state,
                                locale: locale_state,
                                subCategory: window.localStorage.getItem('draft_sub_category'),
                                gender: window.localStorage.getItem('draft_gender'),
                                condition: condition_state,
                                size: window.localStorage.getItem('draft_size')
                            }
                        }
                    )
                })
                .then(async(result) => {
                    let response = await result.json();
                    if(response){
                        window.localStorage.setItem('draft_gender', '')
                        window.localStorage.setItem('draft_size', '')
                        window.localStorage.setItem('draft_sub_category', '')
                        window.localStorage.setItem('draft_locale', '')
                        window.localStorage.setItem('draft_condition', '')
                        window.localStorage.setItem('draft_title', '')
                        window.localStorage.setItem('draft_description', '')
                        window.localStorage.setItem('draft_category', '')
                        window.localStorage.setItem('draft_c_type', '')
                        window.localStorage.setItem('draft_price', '')

                        // openNotice('Update Successful, Redirecting...')
                        window.location.href = '/seller.shop';
                        document.querySelector('.overlay').removeAttribute('id')
                    
                        
                    }else{
                        let overlay = document.querySelector('.overlay'); 
                        overlay.removeAttribute('id')
                        // openNotice('Upload Failed, Please Try Again')
                    }
                })
                .catch((error) => {
                    console.log('Error:', error.message);
                    let overlay = document.querySelector('.overlay'); 
                    overlay.removeAttribute('id')
                    // openNotice('Upload Failed, Please Try Again')
                })  
            }else{

                fetch('https://ce-server.vercel.app/seller.product-upload', {
                    method: 'post',
                    headers: {
                        "Content-Type": "Application/json"
                    },
                    body: JSON.stringify(
                        {
                            constantData: { 
                                title: title.current,
                                description: description.current,
                                category: category.current,
                                price: price.current,
                                photos: photos.current,
                                videos: videos.current,
                                seller_id : seller_id,
                                stock: stock.current
                            }, 
                        
                            dynamicData: {
                                cType: cType_state,
                                locale: locale_state,
                                subCategory: window.localStorage.getItem('draft_sub_category'),
                                gender: window.localStorage.getItem('draft_gender'),
                                condition: condition_state,
                                size: window.localStorage.getItem('draft_size'),
                                lodgeAddress: lodgeAddress
                            }
                        }
                    )
                })
                .then(async(result) => {
                    let response = await result.json();
                    console.log(response)
                    if(response){
                        window.localStorage.setItem('draft_gender', '')
                        window.localStorage.setItem('draft_size', '')
                        window.localStorage.setItem('draft_sub_category', '')
                        window.localStorage.setItem('draft_locale', '')
                        window.localStorage.setItem('draft_condition', '')
                        window.localStorage.setItem('draft_title', '')
                        window.localStorage.setItem('draft_description', '')
                        window.localStorage.setItem('draft_category', '')
                        window.localStorage.setItem('draft_c_type', '')
                        window.localStorage.setItem('draft_price', '')
                    
                        // openNotice('Upload Successful, Redirecting...')
                        window.location.href = '/seller.shop';
                        document.querySelector('.overlay').removeAttribute('id')
                    }else{
                        let overlay = document.querySelector('.overlay'); 
                        overlay.removeAttribute('id')
                        // openNotice('Upload Failed, Please Try Again')
                    }
                })
                .catch((error) => {
                    console.log('Error:', error);
                    let overlay = document.querySelector('.overlay'); 
                    overlay.removeAttribute('id')
                    // openNotice('Upload Failed, Please Try Again')
                })  
             
            }

        }else{
            // openNotice("Ensure No Field Is Empty")
        }

    }

  return (
    <> 
      <div className="seller-editor">
        <div>
            <b>Add Products</b> here
        </div>
        <hr />

        <div className="seller-editor-cnt">
            
            <section className='item-cnt'>
                <div style={{height: 'auto'}}>
                    <div className="input-cnt" style={{width: '100%'}}>
                        <label htmlFor="" >Title</label>
                        <textarea style={{height: '100px'}} defaultValue={title?.current} onInput={e => productTitle(e.target.value)} placeholder='Write A Product Title Here' name="" id=""></textarea>
                    </div>

                    
                    <div className="input-cnt"> 
                        <label htmlFor="">Category</label>
                        <select onInput={e => productCategory(e.target.value)} >
                            <option value="">Select Category</option>
                            {
                                categoriesList.map((item,index) => 
                                    category.current.toLowerCase() === Object.keys(item)[0].toLowerCase()
                                    ?
                                    <option key={index} selected value={Object.keys(item)[0]}>{Object.keys(item)[0]}</option>
                                    :
                                    <option key={index} value={Object.keys(item)[0]}>{Object.keys(item)[0]}</option>
                                )
                            }
                        </select>
                    </div>
                </div>

                <div className='item-cnt-btm' style={{opacity: category_state === '' ? '.5' : '1', pointerEvents: category_state !== '' ? 'all' : 'none'}}>
                    

                    <div className="input-cnt">
                        <label htmlFor="">Type</label>
                        <select onInput={e => productType(e.target.value)} >
                            <option value="">Select {category.current} Type</option>
                            {
                                typeList.map((item,index) => 
                                    cType_state === item
                                    ?
                                    <option selected key={index} value={item}>{item}</option>
                                    :
                                    <option key={index} value={item}>{item}</option>
                                )
                            }
                        </select>
                    </div>
                    {
                        category_state === 'Fashion' 
                        ? 
                        <div className="input-cnt">
                            <label htmlFor="">Gender</label>
                            <select onInput={e => productGender(e.target.value)} >
                                <option value="">Select Gender</option>
                                {
                                    ["Male", "Female", "Unisex"].map ((item, index) => 
                                        item === window.localStorage.getItem('draft_gender')
                                        ?
                                        <option selected key={index} value={item}>{item}</option>
                                        :
                                        <option key={index} value={item}>{item}</option>
                                    )
                                }
                            </select>
                        </div>
                        :
                        ""
                    }

                    {
                        category_state === 'Fashion' 
                        ? 

                            cType_state === 'Clothing' || cType_state === 'Foot Wear'

                            ?
                            <div className="input-cnt">
                                <label htmlFor="">Sub-Category</label>
                                <select onInput={e => productSubCategory(e.target.value)} >
                                    <option value="">Select {category.current} Sub category</option>
                                    {
                                
                                        cType_state === 'Foot Wear'
                                        ?
                                            
                                            footWear?.map((item, index) => 
                                                item === window.localStorage.getItem('draft_sub_category')
                                                ?
                                                <option selected key={index} value={item}>{item}</option>
                                                :
                                                <option key={index} value={item}>{item}</option>
                                            )


                                        :

                                            gender_state === 'Male'

                                            ?

                                            maleList.map((item, index) => 
                                                item === window.localStorage.getItem('draft_sub_category')
                                                ?
                                                <option selected key={index} value={item}>{item}</option>
                                                :
                                                <option key={index} value={item}>{item}</option>
                                            )
                                            :
                                            feMaleList.map((item, index) => 
                                                item === window.localStorage.getItem('draft_sub_category')
                                                ?
                                                <option selected key={index} value={item}>{item}</option>
                                                :
                                                <option key={index} value={item}>{item}</option>
                                            )
                                        
                                    }
                                </select>
                            </div>

                        :

                            ""
                        : 
                        ""
                    }

                    {
                        category_state === 'Fashion'
                        ? 
                            cType_state === 'Clothing' ||  cType_state === 'Foot Wear'
                            ?
                            <div className="input-cnt">
                                <label htmlFor="" onInput={e => productSizeSelect(e.target.value)} >Size</label>
                                {
                                    cType_state === 'Foot Wear'
                                    ?
                                    <select onInput={e => productSizeSelect(e.target.value)} name="size" id="">
                                        <option value={''}>Select Size</option>
                                        {
                                            sizeList.map ((item, index) => 
                                                item === window.localStorage.getItem('draft_size')
                                                ?
                                                <option selected key={index} value={item}>{item}</option>
                                                :
                                                <option key={index} value={item}>{item}</option>
                                            )

                                            
                                        }

                                    </select>

                                    :

                                    <select onInput={e => productSizeSelect(e.target.value)} name="size" id="">
                                        <option value={''}>Select Size</option>
                                        {
                                            ["XX-Large", "X-Large", "Large", "Medium", "Small", "X-Small", "XX-Small"].map ((item, index) => 
                                                item === window.localStorage.getItem('draft_size')
                                                ?
                                                <option selected key={index} value={item}>{item}</option>
                                                :
                                                <option key={index} value={item}>{item}</option>
                                            )
                                        }

                                    </select>
                                }
                            </div>
                            :
                            ""
                        : 
                        ""
                    }

                    

                    {
                        category_state === 'Lodge/Apartments' || category_state === 'Pets' || category_state === 'Food'
                        ? 
                        ""
                        : 
                        <div className="input-cnt">
                            <label htmlFor="">Condition</label>
                            <select onInput={e => productCondition(e.target.value)} >
                                <option value="">Select {category.current} Condition</option>
                                {
                                    category_state === "Health/Beauty" ? ["Brand New"].map ((item, index) => 
                                        item === window.localStorage.getItem('draft_condition') 
                                        ?
                                        <option selected key={index} value={item}>{item}</option>
                                        :
                                        <option key={index} value={item}>{item}</option>
                                    )

                                    :
            
                                    subCategory_state === "Underwear" ? ["Brand New"].map ((item, index) => 
                                        item === window.localStorage.getItem('draft_condition') 
                                        ?
                                        <option selected key={index} value={item}>{item}</option>
                                        :
                                        <option key={index} value={item}>{item}</option>
                                    )
                                    
                                    : 
                                    
                                    ["Brand New", "Fairly Used", "Refurbished","Used"].map((item, index) => 
                                        item === window.localStorage.getItem('draft_condition') 
                                        ?
                                        <option selected key={index} value={item}>{item}</option>
                                        :
                                        <option key={index} value={item}>{item}</option>
                                    )
                                }
                            </select>
                        </div>
                    }

                    {
                        category_state === 'Lodge/Apartments' 
                        ? 
                        ""
                        :
                        <div className="input-cnt">
                            <label htmlFor="">Stock</label>
                            <input defaultValue={stock.current} onInput={e => productStock(e.target.value)}  type="number" name="" id="" />
                        </div>
                    }

                    <div className="input-cnt">
                        <label htmlFor="">Price</label>
                        <input defaultValue={price.current} onInput={e => productPrice(e.target.value)}  type="number" name="" id="" />
                    </div>

                    
                </div>
                <section>
                    <div className="input-cnt" style={{width: '100%'}}>
                        <label htmlFor="">Description (Optional)</label>
                        <textarea style={{height: '200px'}} defaultValue={description?.current} onInput={e => productDescription(e.target.value)} placeholder='Write A  Short Description For The Product Here...' name="" id=""></textarea>
                    </div>
                </section>
            </section>

            <section className='file'>
                <div className='' style={{width: '100%'}}>
                    <b>Image Samples ({img_list.length + (thumbnail !== '' ? 1 : 0)})</b>
                </div>
                <div className='file-cnt'>
                    <div className='img-cnt'>
                        {
                            thumbnail !== ''
                            ?
                                <div style={{position: 'relative',height: '100%', width: '100%'}}>
                                    <div onClick={e => { set_thumbnail('')}} className="delete-sample-img" style={{position: 'absolute', cursor: 'pointer', top: '5px', right: '5px', color: '#fff', background: 'red', zIndex: '1000', width: '20px', display: 'flex', alignItems: 'center', justifyContent: 'center', borderRadius: '2.5px', height: '20px'}}>x</div>   
                                    <img style={{height: '100%', width: '100%'}} src={thumbnail} alt="" />
                                </div>
                            :
                            <>
                                <input onChange={e => handleImage(e, 'thumbnail')} style={{display: 'none'}} type="file" name="" id="image0" />
                                <label htmlFor="image0">
                                    <div>+</div>
                                    <div>Main image</div>
                                </label>
                            </>
                        }
                    </div>

                    
                    {
                        
                        img_list.map((item, index) => 
                            <div className='img-cnt'>
                                <div key={index} style={{position: 'relative',height: '100%', width: '100%'}}>
                                    <div onClick={e => { 
                                        let list = img_list.filter((item, i) => i !== index);
                                        deletePhoto(list);

                                    }} className="delete-sample-img" style={{position: 'absolute', cursor: 'pointer', top: '5px', right: '5px', color: '#fff', background: 'red', zIndex: '1000', width: '20px', display: 'flex', alignItems: 'center', justifyContent: 'center', borderRadius: '2.5px', height: '20px'}}>x</div>
                                    <img style={{height: '100%', width: '100%'}} src={item} alt="" srcset="" />
                                </div>
                            </div>

                        )
                    }

                    <div className="img-cnt">
                        <>
                            <input multiple onChange={e => handleImage(e, 'others')} style={{display: 'none'}} type="file" name="" id="image1" />
                            <label htmlFor="image1">
                                <div>+</div>
                                <div>Image</div>
                            </label>
                        </>
                    </div>
                
                  
                </div>
            </section>

            
        </div>

        
        <section className="seller-editor-btn-cnt">
            <button>
                Submit
            </button>
        </section>
      </div>
    </>
  )
}
