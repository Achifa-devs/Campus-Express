import { useEffect, useRef, useState } from 'react';
import '../../styles/plan_card.css'
import '../../styles/loader.css'
import '../../styles/notice.css'
import '../../styles/Seller/overlay.css'    
import deleteSvg from '../../assets/delete-svgrepo-com (2).svg';

import { useLocation, useNavigate } from 'next/link';
import items from '../../items.json'
import TypeSelect from '../../components/Seller/editor/TypeSelect';
import PriceSelect from '../../components/Seller/editor/PriceSelect';
import ConditionSelect from '../../components/Seller/editor/ConditionSelect';
import GenderSelect from '../../components/Seller/editor/GenderSelect';
import LocationSelect from '../../components/Seller/editor/LocationSelect';
import CategorySelect from '../../components/Seller/editor/CategorySelect';
import EditorTitle from '../../components/Seller/editor/EditorTitle';
import EditorPhotoStore from '../../components/Seller/editor/EditorPhotoStore';
import EditorDescription from '../../components/Seller/editor/EditorDescription';
import SubCategory from '../../components/Seller/editor/ClothingSelect';
import UploadBtn from '../../components/Seller/editor/Button';
import { validate_inputs } from '../../reusable.js/validation';
import SellerLayout from '../../layout/Seller'
import { GetItem, GetItemImages } from '../../api/buyer/get';
import { openNotice } from '../../reusable.js/notice';
import EditorVideoStore from '../../components/Seller/editor/EditorVideoStore';
import Pickup from '../../components/Seller/editor/Pickup';
import PickupChannel from '../../components/Seller/editor/PickupChannel';
import StockSelect from '../../components/Seller/editor/StockSelect';

const Editor = () => {

    let [lodgeAddress, setLodgeAddress] = useState([]);



    function addLocation(channel) {
        let buyer = window.localStorage.getItem('CE_user_id');
        if(buyer === null || buyer === '' || buyer === 'null'){
        // window.location.href=(`/login?page=product&data=${item.product_id}`)
        }else{ 
        let overlay = document.querySelector('.location-overlay')
        overlay.setAttribute('id', 'location-overlay');
        }
    }
  
    function deleteLocation(data) {
        let newLocaleList = lodgeAddress.filter(item => item.index !== data)
        setLodgeAddress(newLocaleList)
    }

    function updateLocation(data) {
        if(data.locale.split(',')[0]!=='' && data.locale.split(',')[1]!=='' && data.locale.split(',')[2]!=='' && data.locale.split(',')[3]!==''){
            setLodgeAddress(item => [...item,{locale: data.locale, index: locale.length, fee: data.fee}])
        }else{
            openNotice(
              'Please Ensure No Field Is Empty'
            )
        }
    }

   



    let location = useLocation();
    let navigate = useNavigate();

    let book = []
    
    let gender = useRef('')

    let [gender_state, set_gender_state] = useState('')
    let [edit,setEdit] = useState('');
    let [screenWidth, setScreenWidth] = useState('')

    let [categoriesList, setCategoriesList] = useState([])
    let [typeList, setTypeList] = useState([]) 
    let [img_list, setimg_list] = useState([])
    let [vid_list, setvid_list] = useState([])
    let [amenities_list, setamenities_list] = useState([])
    
    let [descriptionActive, setDescriptionActive] = useState(true)
    // let [ideoActive, setVideoActive] = useState(true)
    let [update, setUpdate] = useState(false);
    let [videoActive, setVideoActive] = useState(true)
    let [photoActive, setPhotoActive] = useState(true)

    const searchParams = new URLSearchParams(window.location.search);
    function closeOverlay() {let overlay = document.querySelector('.overlay');overlay.onclick = e => {overlay.removeAttribute('id')}}

   

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
                let result = await GetItemImages(product_id); 
                // alert(result.length)
                result?.map(item => productPhotos(item.file))
                   
            }

        }
        getImages()
    }, [])

    function productGender(data) {
        gender.current = (data);
        set_gender_state(data) 
        window.localStorage.setItem('draft_gender', data)
    }

    let size = useRef('')
    let [size_state,set_size_state] = useState('')
    function productSizeSelect(data) {
        size.current = (data); 
        set_size_state(data)
        window.localStorage.setItem('draft_size', data)
    }
    
    let subCategory = useRef('')
    let [subCategory_state,set_subCategory_state] = useState('')
    function productSubCategory(data) {
        subCategory.current = (data); 
        set_subCategory_state(data);
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
    let [locale_state,set_locale_state] = useState('')
    function productLocale(data) {
        locale.current = (data); 
        set_locale_state(data)
        window.localStorage.setItem('draft_locale', data)
    }

    let condition= useRef('')
    let [condition_state,set_condition_state]= useState('')
    function productCondition(data) {
        set_condition_state(data)
        condition.current = (data); 
        window.localStorage.setItem('draft_condition', data)
    }

    let title = useRef('')
    let [title_state,set_title_state] = useState('')
    function productTitle(data) {
        title.current = (data)
        console.log(title.current)
        set_title_state(data)
        window.localStorage.setItem('draft_title', data)
    } 

    let description = useRef('')
    let [description_state,set_description_state] = useState('')
    function productDescription(data) {
        description.current = (data)
        set_description_state(data)
        window.localStorage.setItem('draft_description', data)
    }

    let category = useRef('')
    let [category_state,set_category_state] = useState('')
    function productCategory(data) {
        category.current = (data); 
        set_category_state(data)
        window.localStorage.setItem('draft_category', data)

        
    }
    
    let cType = useRef('')
    let [cType_state,set_cType_state] = useState('')
    function productType(data) {
        cType.current = (data); 
        set_cType_state(data)
        window.localStorage.setItem('draft_c_type', data)

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
    let [price_state,set_price_state] = useState('')
    function productPrice(data) {
        price.current = (data); 
        set_price_state(data)
        window.localStorage.setItem('draft_price', data)
    }

    // let amenities = useRef('')
    // let [amenities_state,set_amenities_state] = useState('')
    function productAmenities(data) {
        // amenities.current = (data); 
        setamenities_list(item => [...item, data])
        // window.localStorage.setItem('draft_stock', data)
    }

    // let amenities = useRef('')
    // let [amenities_state,set_amenities_state] = useState('')
    function deleteAmenities(data) {
        // amenities.current = (data); 
        let newList = amenities_list.filter(item => item !== data)
        setamenities_list(newList)
        
        // window.localStorage.setItem('draft_stock', data)
    }

    let stock = useRef('')
    let [stock_state,set_stock_state] = useState('')
    function productStock(data) {
        stock.current = (data); 
        set_stock_state(data)
        // window.localStorage.setItem('draft_stock', data)
    }

    let photos = useRef([])
    // let [photos_state,set_photos_state] = useRef([])
   
    function productPhotos(data) {
        let d = data !== '' ? photos.current.push(data) : ''
        setimg_list(item => [...item, data])
        // console.log(photos.current.length)
    }
    function deletePhoto(data) {
        photos.current = data;
        setimg_list(data)
    }

    let videos = useRef([])
    // let [photos_state,set_photos_state] = useRef([])
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
            openNotice("Your Progress Was Saved, Continue From Where You Stopped")
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
    // useEffect(() => {setAllInputsToNull('')},[category_state])
    useEffect(() => {setScreenWidth(window.innerWidth)},[])
    useEffect(() => {let type = categoriesList.filter(item => Object.keys(item)[0] === category.current)[0]; if(type){setTypeList(type[category_state])}},[categoriesList,category_state])
 
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
            let user_id = window.localStorage.getItem("CE_user_id")
            //upload for here

            
            if(update){
                let product_id = searchParams.get('product_id');
                fetch('https://cs-server-olive.vercel.app/seller.product-update', {
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
                                user_id : user_id,
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

                        openNotice('Update Successful, Redirecting...')
                        window.location.href = '/seller.shop';
                        document.querySelector('.overlay').removeAttribute('id')
                    
                        
                    }else{
                        let overlay = document.querySelector('.overlay'); 
                        overlay.removeAttribute('id')
                        openNotice('Upload Failed, Please Try Again')
                    }
                })
                .catch((error) => {
                    console.log('Error:', error.message);
                    let overlay = document.querySelector('.overlay'); 
                    overlay.removeAttribute('id')
                    openNotice('Upload Failed, Please Try Again')
                })  
            }else{

                fetch('https://cs-server-olive.vercel.app/seller.product-upload', {
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
                                user_id : user_id,
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
                    
                        openNotice('Upload Successful, Redirecting...')
                        window.location.href = '/seller.shop';
                        document.querySelector('.overlay').removeAttribute('id')
                    }else{
                        let overlay = document.querySelector('.overlay'); 
                        overlay.removeAttribute('id')
                        openNotice('Upload Failed, Please Try Again')
                    }
                })
                .catch((error) => {
                    console.log('Error:', error);
                    let overlay = document.querySelector('.overlay'); 
                    overlay.removeAttribute('id')
                    openNotice('Upload Failed, Please Try Again')
                })  
             
            }

        }else{
            openNotice("Ensure No Field Is Empty")
        }

    }
    
    return ( 
        <>
            <div className="overlay" >
                <div className="loader">
                </div>
            </div>

            <div className="notice-cnt" style={{margin: 'auto'}}>
                <span style={{margin: "0 15px 0 .5px"}}></span>
                <button className="notice-cnt-btn" style={{width: '40px', height: '30px', background: 'red', borderRadius: '2px', fontWeight: '500', fontSize: 'small'}}>
                    close
                </button>
            </div>

            

            <div className="seller-main">
                <SellerLayout>
                    <div className="seller-shop">

                        <div className='seller-shop-form-body'>
                            <div className="seller-shop-form">
                            
                                

                                {
                                    screenWidth > 761
                                    ?
                                    <UploadBtn update={update} updateForm={update} handleForm={handleForm} />
                                    :
                                    ''
                                }

                            </div>

                            {/* <div style={{padding: '10px', background: '#f9f9f9'}}>
                                <Pickup />
                            </div> */}

                            <div className="seller-shop-description" style={{textAlign: 'left', justifyContent: 'left', height: '100%'}}>
                                
                                <EditorTitle productTitle={productTitle}  edit={edit} />
                                <br />

                                <div className='seller-shop-form-cnt'>

                                    <div className="seller-shop-form-group-2" >

                                        <CategorySelect productCategory={productCategory} edit={edit} /> 

                                        <div style={{opacity: category.current !== '' ? '1' : '.4', pointerEvents: category.current !== '' ? 'all' : 'none'}}>
                                        

                                            {
                                                category_state === 'Fashion' 
                                                
                                                ? 
                                                
                                                <GenderSelect edit={edit} productGender={productGender} />

                                                :
                                                ""
                                            }

                                            <TypeSelect typeList={typeList} category={category_state} edit={edit} productType={productType} />

                                            {
                                                category_state === 'Fashion' 
                                                ? 

                                                    cType_state === 'Clothing' || cType_state === 'Foot Wear'

                                                    ?

                                                    <SubCategory subCategory_state={subCategory_state} categoriesList={categoriesList} category={category_state} edit={edit} gender={gender_state} cType={cType_state} productSubCategory={productSubCategory} />

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
                                                    ""
                                                    :
                                                    ""
                                                : 
                                                ""
                                            }
                                            {/* <SizeSelect edit={edit} productSizeSelect={productSizeSelect} cType={cType_state}  /> */}

                                            

                                            {
                                                category_state === 'Lodge/Apartments' || category_state === 'Pets' || category_state === 'Food'
                                                ? 
                                                ""
                                                : 
                                                <ConditionSelect category={category_state} productCondition={productCondition} edit={edit} subCategory={subCategory_state}  />
                                            }

                                            
                                        </div>
                                        <div style={{opacity: category_state !== '' ? '1' : '.4', pointerEvents: category_state !== '' ? 'all' : 'none'}} className="seller-shop-form-group-1">
                                            
                                            {
                                                category_state === 'Lodge/Apartments' 
                                                ? 
                                                ""
                                                : 
                                                ''
                                                //<StockSelect edit={edit} productStock={productStock} />
                                            }

                                            {/*                                             
                                                <LodgeAmenities deleteAmenities={deleteAmenities} productAmenities={productAmenities} amenities={amenities_list}/> 
                                            */}

                                            <PriceSelect edit={edit} productPrice={productPrice} />

                                            <StockSelect edit={edit} productStock={productStock} />

                                            <LocationSelect productLocale={productLocale} />

                                        </div>
                                        
                                    </div>

                                </div>

                                {
                                    category.current.toLowerCase() !== 'lodge/apartments'
                                    ?
                                        <div className="" style={{display: 'flex', flexDirection: 'column', width: '100%', padding: '10px 0 10px 0'}}>
                                            {/* <section style={{display: 'flex', alignItems: 'center', marginBottom: '10px'}}>
                                                <input style={{
                                                    height: '20px',
                                                    width: '20px'
                                                }} defaultChecked onInput={e => setPhotoActive(!photoActive)} type="checkbox" name="" id="" />
                                                &nbsp;
                                                &nbsp;
                                                <span style={{fontSize: 'small', fontWeight: '500', color: 'orangered'}}>Do you have image samples for this item. (5 Photos Max)</span>

                                            </section> */}
                                            {/* <br /> */}
                                            <section style={{width: '100%', opacity: photoActive ? 1 : .5, pointerEvents: photoActive ? 'all' : 'none'}}>
                                                {
                                                    
                                                    <EditorPhotoStore category={category_state} edit={edit} productPhotos={productPhotos} photos={img_list} deletePhoto={deletePhoto} />  
                                                    
                                                }
                                            </section>
                                        </div> 
                                    :
                                    ''

                                }

                                {
                                    category.current.toLowerCase() === 'lodge/apartments'
                                    ?
                                    <div className="" style={{display: 'flex', flexDirection: 'column', width: '100%', padding: '10px 0 10px 0'}}>
                                        {/* <section style={{display: 'flex', alignItems: 'center', marginBottom: '10px'}}>
                                            <input style={{
                                                height: '20px',
                                                width: '20px'
                                            }} defaultChecked onInput={e => setPhotoActive(!photoActive)} type="checkbox" name="" id="" />
                                            &nbsp;
                                            &nbsp;
                                            <span style={{fontSize: 'small', fontWeight: '500', color: 'orangered'}}>Do you have image samples for this item. (5 Photos Max)</span>

                                        </section> */}
                                        {/* <br /> */}
                                        <section style={{width: '100%', opacity: videoActive ? 1 : .5, pointerEvents: videoActive ? 'all' : 'none'}}>
                                            {
                                                <EditorVideoStore category={category_state} edit={edit} productVideos={productVideos} videos={vid_list} deleteVideo={deleteVideo} />  
                                            }
                                        </section>
                                    </div> 
                                    :
                                    ''
                                }
                                
                                <div className="input-cnt" style={{display: 'flex', flexDirection: 'column', width: '100%', padding: '10px 0 10px 0', background: 'transparent'}}>
                                    <section style={{display: 'flex', alignItems: 'center'}}>
                                        {/* <input style={{
                                            height: '20px',
                                            width: '20px'
                                        }} defaultChecked onInput={e => setDescriptionActive(!descriptionActive)} type="checkbox" name="" id="" />
                                        &nbsp;
                                        &nbsp; */}
                                        <span style={{fontSize: 'small', fontWeight: '500', color: 'orangered'}}>Description (Optional)</span>

                                    </section>
                                    {/* <section style={{width: '100%', opacity: descriptionActive ? 1 : .5, pointerEvents: descriptionActive ? 'all' : 'none'}}> */}
                                        
                                        {
                                           
                                            <EditorDescription productDescription={productDescription} edit={edit} descriptionActive={descriptionActive} />   
                                           
                                        }
                                    {/* </section> */}
                                </div> 


                                {/* <div className="input-cnt" style={{display: 'flex', flexDirection: 'column', width: '100%', padding: '10px 0 10px 0'}}>
                                    <section style={{display: 'flex', alignItems: 'center'}}>
                                        <input style={{
                                            height: '20px',
                                            width: '20px'
                                        }} defaultChecked onInput={e => setDescriptionActive(!videoActive)} type="checkbox" name="" id="" />
                                        &nbsp;
                                        &nbsp;
                                        <span style={{fontSize: 'small', fontWeight: '500', color: 'orangered'}}>Do you have a video sample for this item.</span>

                                    </section>
                                    <section style={{width: '100%', opacity: videoActive ? 1 : .5, pointerEvents: videoActive ? 'all' : 'none'}}>
                                        <EditorVideo productDescription={productDescription} edit={edit} videoActive={videoActive} />   
                                    </section>
                                </div>  */}

                                {

                                    category.current.toLowerCase() === 'lodge/apartments'
                                    ?
                                    <>
                                        <div className="location-overlay" style={{height: '100vh', width: '100vw'}}>
                                            <PickupChannel updateLocation={updateLocation} title={'Lodge'} />
                                        </div>
                                        <div className="buyer-checkout-delivery-info">
                                            <div className="delivery-pick-up-station" >
                                                <div className='delivery-info-head'>
                                                    <span>Lodge Address</span>
                                                    {/* <span>Change</span> */}
                                                </div>

                                                <hr />
                                                <br />
                                                <div className='' style={{display: 'flex', alignItems: 'center', fontWeight: '500', fontSize: '20', justifyContent: 'space-between', border: '1px solid #FF4500', flexDirection: 'row', padding: '0', width: '100%', background: '#fff', position: 'relative', borderRadius: '5px', marginBottom: '10px', border: 'none'}}>
                                                            
                                                <div style={{padding: '0', width: '100%'}}>

                                                    <div className='shadow-sm' style={{display: 'flex', alignItems: 'flex-start', fontWeight: '500', fontSize: '20', justifyContent: 'flex-start', flexDirection: 'column', position: 'relative', border: 'none', padding: '10px'}}>
                                                    {/* <section style={{display: 'flex', alignItems: 'center', fontWeight: '500', fontSize: '20', justifyContent: 'flex-start', flexDirection: 'row-reverse', width: '80%'}}>
                                                        <label style={{height: '20px', padding: '0', width: '100%', display: 'flex', alignItems: 'flex-end', fontSize: 'small'}} htmlFor="">Door Step Delivery</label>
                                                        &nbsp;&nbsp;<input style={{height: '20px', width: '20px'}} type="checkbox" checked name="" id="" />
                                                        
                                                    </section> */}
                                                    <section style={{padding: '10px', fontSize: '12', fontWeight: '400'}}>
                                                        <small style={{fontSize: 'small'}}>
                                                            The Item Will Be Delivered At Your Door Step (Charges Applies)
                                                        </small>
                                                    </section>
                                                    
                                                    <button disabled={lodgeAddress.length > 0 ? true : false} onClick={e => addLocation('Door Step Delivery')} className='shadow-sm' style={{position: 'relative', height: 'auto', width: 'auto', display: 'flex', alignItems: 'center', justifyContents: 'center', padding: '10px', textAlign: 'center', background: '#fff', color: '#FF4500', fontSize: 'small', float: 'right', color: '#fff', background: '#FF4500', opacity: lodgeAddress.length > 0 ? '.5' : '1'}}>Add location</button>
                                                    <section style={{display: 'flex', alignItems: 'flex-start', fontWeight: '500', fontSize: '20', justifyContent: 'flex-start', flexDirection: 'column', padding: '10px', width: '100%', background: '#fff', position: 'relative', borderRadius: '5px'}}>
                                                        {
                                                            lodgeAddress.map((item) => 
                                                                
                                                                <div className='shadow-sm' style={{display: 'flex', alignItems: 'center', fontWeight: '500', fontSize: '20', justifyContent: 'space-between', border: '1px solid #FF4500', flexDirection: 'row', padding: '5px 5px 5px 10px', width: '100%', background: '#fff', position: 'relative', borderRadius: '5px', marginBottom: '10px'}}>
                                                                <div style={{display: 'flex', alignItems: 'flex-start', fontWeight: '500', fontSize: '20', justifyContent: 'space-between', flexDirection: 'column', padding: '0', width: '100%', background: '#fff', position: 'relative', borderRadius: '5px', marginBottom: '10px'}}>
                                                                    <small>{
                                                                    item.locale
                                                                    }</small>
                                                                    <br />
                                                                    <small>
                                                                    Inspection Fee: {
                                                                    item.fee
                                                                    }
                                                                </small>
                                                                </div>
                                                                    <button  onClick={e=>deleteLocation(item.index)} style={{width: '35px', height: '35px', padding: '5px', textAlign: 'center', position: 'relative', display: 'flex', alignItems: 'center', justifyContent: 'center'}}>
                                                                        <img src={deleteSvg} style={{height: '100%', margin: '0', left: 'unset', float: 'unset', width: '100%', position: 'relative'}} alt="" />
                                                                    </button>
                                                                </div>
                                                            
                                                            )
                                                        }
                                                    </section>
                                                    </div>
                                                    </div>
                                                </div>

                                                
                                            </div>
                                        </div>

                                    </>
                                    :
                                    ''
                                }

                            </div>
                            
                        </div>

                        {
                            screenWidth < 761
                            ?
                            <UploadBtn update={update} updateForm={update} handleForm={handleForm} />

                            :
                            '' 
                        }

                        

                    </div>
                </SellerLayout>

            </div>

        </>
     );
}
  
export default Editor;