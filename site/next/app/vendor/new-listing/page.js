"use client"
import React, { useEffect, useRef, useState } from 'react'
import '@/app/vendor/new-listing/styles/xx-large.css'
import '@/app/vendor/new-listing/styles/x-large.css'
import '@/app/vendor/new-listing/styles/large.css'
import '@/app/vendor/new-listing/styles/medium.css'
import '@/app/vendor/new-listing/styles/small.css'
import '@/app/vendor/new-listing/styles/global.css'
import items from '@/files/items.json'
import { 
    usePathname 
} from 'next/navigation'
import { 
    validate_inputs 
} from './validation' 
import country_list from '@/states-and-cities.json'; 
import { 
    useDispatch,
    useSelector 
} from 'react-redux'
import { seller_overlay_setup } from '@/files/reusable.js/overlay-setup'
import axios from 'axios'
import { v4 } from 'uuid'
import { useIsClient } from '@/files/reusable.js/isClieent'
import { open_notice } from '@/files/reusable.js/notice'
import { setItemImagesTo } from '@/redux/buyer_store/ItemImages'
import File from './file'


export default function NewListing() {
    const isClient = useIsClient();
    let [screenWidth, setScreenWidth] = useState(0);
    let book = []
    let {seller_id}=useSelector(s=>s.seller_id);
    let [product_id, set_product_id] = useState('')
    let [categoriesList, setCategoriesList] = useState([])
    let [typeList, setTypeList] = useState([]) 

    let [shipping_policy, set_shipping_policy] = useState('')
    let [shipping_duration, set_shipping_duration] = useState('')
     
    let [thumbnail_id, set_thumbnail_id] = useState('') 

    let [thumbnail, set_thumbnail] = useState('') 
    let [vid_list, setvid_list] = useState([])
    let [update, setUpdate] = useState(false);
    let [is_update, setis_update] = useState(false)
    let [active_range, set_active_range] = useState('')
    let [shipping_range, set_shipping_range] = useState({
        in_campus: {selected: false, price: 0},
        in_state: {selected: false, price: 0},
        out_state: {selected: false, price: 0}
    })
    let [imgFile, setImgFile] = useState([])
    // let [uris, set_uris] = useState('')

    

    useEffect(() => {
        const queryParams = new URLSearchParams(window.location.search);
        const update = queryParams.get("update");
        setis_update(update)
    }, [])
    
    useEffect(() => {
        const queryParams = new URLSearchParams(window.location.search);
        const product_id = queryParams.get("product_id");
        seller_overlay_setup(true, 'Loading')
        if (seller_id !== '' && seller_id !== undefined && seller_id !== 'undefined' && seller_id !== null && seller_id !== 'null') {
            if (is_update) {
                fetch(`/api/vendor/product?product_id=${product_id}`)
                .then(async(result) => {
                    let response = await result.json();  
                    console.log(response)
                    
                    productCategory((response[0]?.category), false) 
                    productTitle((response[0]?.title))
                    productDescription((response[0]?.description))
                    productPrice((response[0]?.price))
                    productStock((response[0]?.stock))
                    productSizeSelect((response[0]?.others?.size))
                    productType((response[0]?.others?.cType))
                    productSubCategory((response[0]?.others?.subCategory))
                    productCondition((response[0]?.others?.condition))
                    productLocale((response[0]?.others?.locale))
                    productGender((response[0]?.others?.gender))
                    productLodgeName((response[0]?.lodge_data?.lodge_name))
                    productFlatLocation((response[0]?.lodge_data?.flat_location))
                    productAddress1((response[0]?.lodge_data?.address1))
                    productAddress2((response[0]?.lodge_data?.address2))
                    productAddress3((response[0]?.lodge_data?.address3))
                    productAddress4((response[0]?.lodge_data?.address4))
                    productCountry((response[0]?.lodge_data?.country))
                    productState((response[0]?.lodge_data?.state))
                    productCity((response[0]?.lodge_data?.city))
                    productToPay((response[0]?.lodge_data?.to_pay))
                    productAgentFee((response[0]?.lodge_data?.agent_fee))
                    console.log(response[0]?.accept_refund)
                    if (response[0]?.accept_refund) {
                        productShippingRange(JSON.parse(response[0]?.shipping_range))
                        productShippingPolicy(response[0]?.accept_refund)
                    }
                    window.localStorage.setItem(`thumbnail-url`, response[0]?.thumbnail_id)
                    set_thumbnail(response[0]?.thumbnail_id)

                    seller_overlay_setup(false, '')

                })
                .catch((error) => {
                    seller_overlay_setup(false, '')
                    console.log(error)
                }) 
            } else {
                seller_overlay_setup(false, '')
                
            }
        }
    }, [seller_id])


    let [sample_img, set_sample_img] = useState('')
    useEffect(() => {
        const queryParams = new URLSearchParams(window.location.search);
        const product_id = queryParams.get("product_id");
        if (thumbnail) {
            try {
                axios.get('/api/vendor/image-folder', {params: {folder: product_id}})
                .then(({data})=>{
                    let duplicate = data.filter(item => item?.secure_url !== thumbnail);
                    set_sample_img(duplicate)
                    // dispatch(setItemImagesTo(data))
                })
                .catch(error=>{
                    console.log(error)
                })
            } catch (error) {
                console.log(error)
            }
        }
    }, [seller_id,thumbnail])
    

    useEffect(() => {
        let file = window.localStorage.getItem(`thumbnail-url`);
        if (file) {
            set_thumbnail(file)
        }

    }, [])

    function resetLog() {
        if(isClient && typeof window !== 'undefined'){
            window.localStorage.setItem('draft_gender', '')
            window.localStorage.setItem('draft_size', '')
            window.localStorage.setItem('draft_sub_category', '')
            window.localStorage.setItem('draft_condition', '')
            window.localStorage.setItem('draft_c_type', '')
            window.localStorage.setItem('draft_price', '')
        }

        productPrice('')
        productType('')
        productStock('')
        productGender('')
        productSubCategory('')
        productSizeSelect('')
        productCondition('')    
    }
    useEffect(() => {
        if(isClient && typeof window !== 'undefined'){
            setScreenWidth(window.innerWidth)
        }
    }, [])
    useEffect(() => { 
        setCategoriesList(items.items.category)
    },[])
    useEffect(() => {
        if(isClient && typeof window !== 'undefined'){
            if(window.localStorage.getItem('sub-categories') === null || window.localStorage.getItem('sub-categories') === 'null' || window.localStorage.getItem('sub-categories') === '' || window.localStorage.getItem('sub-categories') === undefined){
                window.localStorage.setItem('sub-categories', JSON.stringify(items.items.category))
            }
        }

    },[])
    useEffect(() => {
        if(isClient && typeof window !== 'undefined'){
            let product_id = 
            window.location.search.split('?').length > 1 
            ? 
            window.location.search?.split('?')[1]?.split('=')[0] 
            : 
            false;

            if(product_id){
                setUpdate(true)
            }else{
                setUpdate(false)
            }
        }
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
        let data = categoriesList.filter(data => Object.keys(data)[0] === category.current)
        console.log(data)
        if(data.length > 0){
            setFootWear(data[0]["FootWear"])
            setMaleList(data[0]["ClothingMale"])
            setFeMaleList(data[0]["ClothingFemale"])
        }
    },[categoriesList])
   
    function upload_response(response,index,set_src) {
        if (response.status === 200) {
            imgids.current[index] = response.data.fileDetails[0].id;

            // set_src(response.data.fileDetails[0].url)

            seller_overlay_setup(false, '')
            open_notice(true, 'uploaded sample successfully.')
        } else {
            seller_overlay_setup(false, '')
            open_notice(true, 'sample upload was not successful.')
            let list = img_list.filter((item, i) => i !== index);
            deletePhoto(list, index);

        }
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
    function productCategory(data,reload=true) {
        category.current = (data); 
        window.localStorage.setItem('draft_category', data)
        set_category_state(data)
        if(reload){
            resetLog()
        }
        // resetLog()
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

    // useEffect(() => {
    //     if (document.querySelector('#price')) {
    //         alert(price.current)
    //         if (parseInt(price_state)) {
    //         document.querySelector('#price').value = `${new Intl.NumberFormat('en-us').format(parseInt(price.current))}`
    //         }
    //     } 
    // }, [price_state])
    

    let stock = useRef('')
    let [stock_state, set_stock_state] = useState('')
    function productStock(data) {
        stock.current = (data); 
        set_stock_state(data)
        window.localStorage.setItem('draft_stock', data)
    }

    let lodge_name = useRef('')
    let [lodge_name_state, set_lodge_name_state] = useState('')
    function productLodgeName(data) {
        lodge_name.current = (data); 
        set_lodge_name_state(data);
        window.localStorage.setItem('draft_lodge_name', data)
    }

    let flat_location = useRef('')
    let [flat_location_state, set_flat_location_state] = useState('')
    function productFlatLocation(data) {
        flat_location.current = (data); 
        set_flat_location_state(data);
        window.localStorage.setItem('draft_flat_location', data)
    }

    let address1 = useRef('')
    let [address1_state, set_address1_state] = useState('')
    function productAddress1(data) {
        address1.current = (data); 
        set_address1_state(data);
        window.localStorage.setItem('draft_address1', data)
    }

    let address2 = useRef('')
    let [address2_state, set_address2_state] = useState('')
    function productAddress2(data) {
        address2.current = (data); 
        set_address2_state(data);
        window.localStorage.setItem('draft_address2', data)
    }


    let address3 = useRef('')
    let [address3_state, set_address3_state] = useState('')
    function productAddress3(data) {
        address3.current = (data); 
        set_address3_state(data);
        window.localStorage.setItem('draft_address3', data)
    }


    let address4 = useRef('')
    let [address4_state, set_address4_state] = useState('')
    function productAddress4(data) {
        address4.current = (data); 
        set_address4_state(data);
        window.localStorage.setItem('draft_address4', data)
    }


    let country = useRef('')
    let [country_state, set_country_state] = useState('')
    function productCountry(data) {
        country.current = (data); 
        set_country_state(data);
        window.localStorage.setItem('draft_country', data)
    }

    let state = useRef('')
    let [state_state, set_state_state] = useState('')
    function productState(data) {
        state.current = (data); 
        set_state_state(data);
        window.localStorage.setItem('draft_state', data)
    }

    let city = useRef('')
    let [city_state, set_city_state] = useState('')
    function productCity(data) {
        city.current = (data); 
        set_city_state(data);
        window.localStorage.setItem('draft_city', data)
    }

    let to_pay = useRef('')
    let [to_pay_state, set_to_pay_state] = useState('')
    function productToPay(data) {
        to_pay.current = (data); 
        set_to_pay_state(data);
        window.localStorage.setItem('draft_to_pay', data)
    }

    let agent_fee = useRef('')
    let [agent_fee_state, set_agent_fee_state] = useState('')
    function productAgentFee(data) {
        agent_fee.current = (data); 
        set_agent_fee_state(data);
        window.localStorage.setItem('draft_agent_fee', data)
    }
 
   
    let photos = useRef([])
    // let [photo_state, set_photo_state] = useState([])
    function productPhotos(data) {
        let d = data !== '' ? photos.current.push(data) : ''
        // setimg_list(item => [...item, data])
    }

    let shipping_duration_ref = useRef('')
    let [shipping_duration_state, set_shipping_duration_state] = useState('')
    function productShippingDuration(data) {
        set_shipping_duration(data);
        shipping_duration_ref.current = (data); 
        window.localStorage.setItem('draft_shipping_policy', data)
    }

    let shipping_policy_ref = useRef('')
    let [shipping_policy_state, set_shipping_policy_state] = useState('')
    function productShippingPolicy(data) {
        shipping_policy_ref.current = (data); 
        set_shipping_policy(data);
        window.localStorage.setItem('draft_shipping_policy', data)
    }

    let shipping_range_ref = useRef('')
    let [shipping_range_state, set_shipping_range_state] = useState('')
    function productShippingRange(data) {
        shipping_range_ref.current = (JSON.stringify(data)); 
        set_shipping_range((data));
        window.localStorage.setItem('draft_shipping_range', JSON.stringify(data))
    }

    useEffect(() => {
        productShippingPolicy(shipping_policy)
    }, [shipping_policy])

    useEffect(() => {
        productShippingRange(shipping_range)
    }, [shipping_range])

    let videos = useRef([])
    function productVideos(data) {
        let d = data !== '' ? videos.current.push(data) : ''
        setvid_list(item => [...item, data])
    }
    function deleteVideo(data) {
        videos.current = data;
        setvid_list(data)
        setImgFile(imgFile.filter((item,index) => i !== index))

        // setVid(imgFile.filter((item,index) => i !== index))

    }

    useEffect(() => {
        if(window.localStorage.getItem('draft_category') !== null && window.localStorage.getItem('draft_category') !== undefined && window.localStorage.getItem('draft_category') !== ''){ 
            productCategory(window.localStorage.getItem('draft_category'), false) 
            productTitle(window.localStorage.getItem('draft_title'))
            productDescription(window.localStorage.getItem('draft_description'))
            productPrice(window.localStorage.getItem('draft_price'))
            productStock(window.localStorage.getItem('draft_stock'))
            productSizeSelect(window.localStorage.getItem('draft_size'))
            productType(window.localStorage.getItem('draft_c_type'))
            productSubCategory(window.localStorage.getItem('draft_sub_category'))
            productCondition(window.localStorage.getItem('draft_condition'))
            productLocale(window.localStorage.getItem('draft_locale'))
            productGender(window.localStorage.getItem('draft_gender'))
            productLodgeName(window.localStorage.getItem('draft_lodge_name'))
            productFlatLocation(window.localStorage.getItem('draft_flat_location'))
            productAddress1(window.localStorage.getItem('draft_address1'))
            productAddress2(window.localStorage.getItem('draft_address2'))
            productAddress3(window.localStorage.getItem('draft_address3'))
            productAddress4(window.localStorage.getItem('draft_address4'))
            productCountry(window.localStorage.getItem('draft_country'))
            productState(window.localStorage.getItem('draft_state'))
            productCity(window.localStorage.getItem('draft_city'))
            productToPay(window.localStorage.getItem('draft_to_pay'))
            productAgentFee(window.localStorage.getItem('draft_agent_fee'))
            productShippingRange(JSON.parse(window.localStorage.getItem('draft_shipping_range')))
            productShippingPolicy(window.localStorage.getItem('draft_shipping_policy'))

        }
    }, [])
    useEffect(() => {
        if(isClient && typeof window !== 'undefined'){
            setCategoriesList(JSON.parse(window.localStorage.getItem('sub-categories')))
        }
    },[])
    useEffect(() => {

      
        let type = categoriesList.filter(item => Object.keys(item)[0] === category.current)[0]; 
        if(type){ 
            setTypeList(type[category.current])
        }
    }, [category_state])
    let [accessory, setAccessory] = useState([])

    useEffect(() => {
        // alert()
        const fashionCategory = items.items.category.find(cat => cat["Fashion"]);

        const extracted = {
            Footwear: fashionCategory?.FootWear || [],
            ClothingMale: fashionCategory?.ClothingMale || [],
            ClothingFemale: fashionCategory?.ClothingFemale || [],
            Accessories: fashionCategory?.Accessories || []
        };
        if (cType_state === 'Clothing') {
            if (gender_state === 'Female') {
                setFeMaleList(extracted.ClothingFemale)
                window.localStorage.setItem('draft_sub_category', extracted.ClothingFemale)
                
            } else {
                setMaleList(extracted.ClothingMale)
                window.localStorage.setItem('draft_sub_category', extracted.ClothingMale)
            }
            
        } else if (cType_state === 'Foot Wear') {
            setFootWear(extracted.Footwear)
            window.localStorage.setItem('draft_sub_category', extracted.Footwear)
            
        } else if (cType_state === 'Accessories') {
            setAccessory(extracted.Accessories)
            window.localStorage.setItem('draft_sub_category', extracted.Accessories)
            
        }
        
    }, [cType_state])
    
    
    

    let handleForm = () => {

        book = []
        let inputs = [...document.querySelectorAll('input')].filter(item => item.getAttribute('id') !== 'address3' && item.getAttribute('id') !== 'address4' && item.type !=='checkbox' && item.getAttribute('id') !== 'range_price')
        let textareas = [document.querySelector('.seller-shop-title')]
        let selects = [...document.querySelectorAll('select')]

        let result1 = validate_inputs('input', inputs, category.current.toLowerCase() === 'lodge & apartments'
        ? videos.current : photos.current);
        let result2 = validate_inputs('textarea', textareas);
        let result3 = validate_inputs('select', selects);
        let result4 = validate_inputs('input', inputs, category.current.toLowerCase() === 'lodge & apartments'
        ? videos.current : thumbnail);

        let response =  [...result1,...result2,...result3, ...result4];
        response.map((item, index) => {
            if(index !== -1){
                item.err !== '' ?  book.push(false) : book.push(true)
                item.err !== '' ? item.element.style.border = '1px solid red' : item.element.style.border = '1px solid green'
                item.err !== '' ? handleErr(item.element, item.err, item.name) : handleErr(item.element, item.err, item.name)

                function handleErr(element, err, name) {

                    let pElem = name === 'thumbnail' ? element.parentElement : element.parentElement;

                    if(pElem.lastChild.className === 'err-mssg' || pElem.firstChild.className === 'err-mssg'){
                        
                        name ===  'thumbnail' ?  
                            pElem.firstChild.remove()
                        :
                        pElem.lastChild.remove()

                        let newElem = document.createElement('div')
                        newElem.className = 'err-mssg';
                        newElem.style.width = '100%';
                        newElem.style.marginLeft = '2.5px';
                        newElem.style.textAlign = 'left';
                        newElem.style.padding = '0px 10px';
                        newElem.style.justifyContent = 'left';
                        newElem.style.position =  name === 'thumbnail' ? 'absolute' : 'relative';
                        newElem.style.fontSize =  name === 'thumbnail' ? 'x-small' : 'small';
                        newElem.style.bottom = '2px';
                        newElem.style.left = '2px';
                        newElem.innerHTML = err;

                        name ===  'thumbnail' ?  
                            pElem.append(newElem)
                        :
                        pElem.append(newElem);

                    // console.log('error: ',err)

                    }else{
                        let newElem = document.createElement('div')
                        newElem.className = 'err-mssg';
                        newElem.style.textAlign = 'left';
                        newElem.style.padding = '0px 10px';
                        newElem.style.justifyContent = 'left';
                        newElem.style.width = '100%';
                        newElem.style.marginLeft = '2.5px';
                        newElem.style.position = name === 'thumbnail' ? 'absolute' : 'relative';
                        newElem.style.fontSize =  name === 'thumbnail' ? 'x-small' : 'small';
                        newElem.style.bottom = '2px';
                        newElem.style.left = '2px';
                        newElem.innerHTML = err;

                        name ===  'thumbnail' ?  
                            pElem.append(newElem)
                        :
                        pElem.append(newElem);

                    // console.log('error: ',err)


                    }

                    open_notice(true, err)
                }
            }
        })
        handleFileUpload(product_id)

    }

    async function uploadImageFiles(file, product_id) {
        seller_overlay_setup(true, `Uploading ${file.name}`)

        let formData = new FormData();
        // Append each file to formData
        formData.append('file', file);
        formData.append('file_name', `${file.name}`);
        formData.append('product_id', `${product_id}`);

        return await axios.post('/api/upload/files', formData, {
            headers: {
                "Content-Type": "multipart/form-data"
            }
        })
        .then(response => {
            console.log('Upload successful', response);
            

            return response;
        })
        .catch(error => {
            console.error('Upload failed', error);
            
            return error
        });
    
    }
    
    async function uploadThumbnailFiles(thumbnail, product_id) {
        seller_overlay_setup(true, `Uploading Thumbnail`)
        let formData = new FormData();
        formData.append('file', thumbnail);
        formData.append('file_name', `${thumbnail.name}`);
        formData.append('product_id', `${product_id}`);
    
        return await axios.post('/api/upload/thumbnail', formData, {
            headers: {
                "Content-Type": "multipart/form-data" 
            }
        })
        .then(response => {
            console.log('Upload successful', response);
            return response
        })
        .catch(error => {
            console.error('Upload failed', error);
            return error
        });
    }

    async function uploadProduct(product_id, seller_id, thumbnail_url) {
        let url = is_update ? 'http://192.168.24.146:9090/seller.product-update' : 'http://192.168.24.146:9090/seller.product-upload';

        const queryParams = new URLSearchParams(window.location.search);
        const update_product_id = queryParams.get("product_id");
        
        fetch(url, {
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
                        product_id: is_update ? update_product_id : product_id,
                        seller_id: seller_id,
                        campus: profile?.campus,
                        state: profile?.state,
                        stock: stock.current,
                        thumbnail_id: thumbnail_url,
                        thumbnail_public_id: thumbnail_id
                    }, 
                
                    dynamicData: {
                        cType: cType.current,
                        locale: locale.current,
                        subCategory: subCategory.current,
                        gender: gender.current,
                        condition: condition_state,
                        size: size.current,

                        lodge_data: {
                            lodge_active: category_state === "Lodge & Apartments" ? true : false,
                            lodge_name: lodge_name.current,
                            flat_location: flat_location.current, 
                            address1: address1.current,
                            address2: address2.current,
                            address3: address3.current,
                            address4: address4.current,
                            country: country.current,
                            state: state.current,
                            city: city.current,
                            to_pay: to_pay.current,
                            agent_fee: agent_fee.current
                        }
                    },

                    shipping_data: {
                        shipping_range,
                        shipping_policy,
                        shipping_duration: shipping_duration.split(' ')[0]
                    }
                }
            )
        })
        .then(async(result) => {
            let response = await result.json();
            console.log(response);
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

                window.localStorage.getItem('draft_lodge_name', '')
                window.localStorage.getItem('draft_flat_location', '')
                window.localStorage.getItem('draft_address1', '')
                window.localStorage.getItem('draft_address2', '')
                window.localStorage.getItem('draft_address3', '')
                window.localStorage.getItem('draft_address4', '')
                window.localStorage.getItem('draft_country', '')
                window.localStorage.getItem('draft_state', '')
                window.localStorage.getItem('draft_city', '')
                window.localStorage.getItem('draft_to_pay', '')
                window.localStorage.getItem('draft_agent_fee', '')

                window.localStorage.setItem(`thumbnail-url`, '');

                [1, 2, 3, 4, 5].map((item, index) => {
                    window.localStorage.getItem(`file-${index}`)
                    ?
                    window.localStorage.setItem(`file-${index}`, '')
                    : 
                    ''
                });

                
            
                is_update ? open_notice(true, 'Update Successful, Redirecting...') : open_notice(true, 'Upload Successful, Redirecting...') 
                window.location.href = '/seller/listing';
                // seller_overlay_setup(false, '')

            }else{
                open_notice(true, 'Upload Failed, Please Try Again')
                seller_overlay_setup(false, '')

            }
        })
        .catch((error) => {
            console.log('Error:', error);
            seller_overlay_setup(false, '')

            is_update ? open_notice(true, 'Update Failed, Please Try Again') : open_notice(true, 'Upload Failed, Please Try Again')
        })  
    
    }

    const isShippingRangeValid = (shipping_range) => {
        const completed = Object.entries(shipping_range).filter(([key, value]) => {
            return value.selected && value.price >= 500;
        });

        const selectedKeys = completed.map(([key]) => key);

        if (completed.length === 0) {
            return false;
        }

        if (completed.length === 1) {
            return selectedKeys.includes('in_campus');
        }

        if (completed.length === 2) {
            return selectedKeys.includes('in_campus') && selectedKeys.includes('in_state');
        }

        if (completed.length === 3) {
            return selectedKeys.includes('in_campus') && selectedKeys.includes('in_state') && selectedKeys.includes('out_state');
        }

        // If more than 2 are selected, it's invalid
        return false;
    };


    async function handleFileUpload(product_id) {
        let filter = book.filter(item => item === false)
        if (filter.length === 0) {
            let ship = document.querySelector('#shipping-price');
            const valid = isShippingRangeValid(shipping_range);

            if (category_state !== 'Lodge & Apartments') {
                if (valid) {
                    is_update ? seller_overlay_setup(true, 'Updating Product Details...') : seller_overlay_setup(true, 'Uploading Product Details...')
                    await uploadProduct(product_id,seller_id,thumbnail)
                }else{
                    let newElem = document.createElement('div')
                    newElem.className = 'err-mssg';
                    newElem.style.width = '100%';
                    newElem.style.marginLeft = '2.5px';
                    newElem.style.textAlign = 'left';
                    newElem.style.padding = '0px 10px';
                    newElem.style.justifyContent = 'left';
                    newElem.style.position = 'relative';
                    newElem.style.fontSize =  'small';
                    newElem.style.bottom = '2px';
                    newElem.style.left = '2px';
                    newElem.innerHTML = 'Please select delivery range and set the price (price must be at least ₦500)';

                    open_notice(true, 'Please select delivery range and set the price (price must be at least ₦500)')
    
                    ship.append(newElem)
                }
            } else {
                seller_overlay_setup(true, 'Uploading Product Details...')
                await uploadProduct(product_id,seller_id,thumbnail)
            }
            
        }

        // await uploadThumbnailFiles()
    }

    let imgids = useRef([])
    

    useEffect(() => {
        let id = window.localStorage.getItem('draft_product_id')
        if(id !== '' && id !== 'null' && id !== null && id !== undefined && id !== 'undefined'){
            set_product_id(id)
        }else{
            set_product_id(v4())
        }
    }, [])

    let [duration_list, set_duration_list] = useState('');


    const hasRun = useRef(false);

    useEffect(() => {
        if (!hasRun.current) {
            shipping_duration_list();
            hasRun.current = true;
        }
    }, []);

    function shipping_duration_list() {
        for(let i=1; i<31; i++){
            if(i === 1){
                set_duration_list(item => [...item, <option key={i} value={`${i} days`}>{`${i} day`}</option>])
            } else {
                 set_duration_list(item => [...item, <option key={i} value={`${i} days`}>{`${i} days`}</option>])
            }
            
        }
    }
    

    let [profile, setProfile] = useState('')

    useEffect(() => {
        if(seller_id !== 'null' && seller_id !== null && seller_id !== ''){

            fetch(`http://192.168.24.146:9090/seller.profile?seller_id=${seller_id}`)
            .then(async(result) => {
                let response = await result.json(); 
                setProfile(response)
            })
            .catch((error) => {
                console.log(error)
            }) 

        }
    }, [seller_id])

    let [range_price, set_range_price] = useState(0)
    let [edit_range, set_edit_range] = useState(0)

  return (
    <> 

        <div className="seller-overlay" >
            <section style={{width: 'auto', height: 'fit-content', borderRadius: '5px', padding: '10px', background: '#fff'}}>
                <div className="seller-input-cnt" style={{height: 'auto'}}>
                    <label htmlFor="">{active_range}</label>
                    
                    <input type="number" defaultValue={shipping_range?.[edit_range]?.price} onInput={e=>set_range_price(e.target.value)} name="" placeholder={active_range} className='range_price' id="range_price" />
                </div>
                  
                <div className="seller-input-cnt">
                    <button onClick={e=> {
                        let validation = parseInt(range_price) >= 500  && range_price !== '' ? true : false
                        // seller_overlay_setup(true, 'Setting Up Your Shop Name')
                          // set_shop_name()   
                        if(validation){
                            let overlay = document.querySelector('.seller-overlay')
                            overlay.removeAttribute('id')
                            
                            set_shipping_range(prev => ({
                                ...prev,
                                [edit_range]: {
                                    ...prev[edit_range],
                                    price: range_price,
                                }
                            }))
                            
                            set_range_price('') 
                            document.querySelector('#range_price').value = ''
                        } else {
                            open_notice(true, 'Please Enter A Price That is At Least ₦500')
                        }
                          
                    }} style={{
                        background: '#FF4500',
                        color: '#FFF', 
                        border: 'none', 
                        outline: 'none',
                        padding: '10px',
                        borderRadius: '5px'
                    }}>
                        <b><small>Set range price</small></b>
                    </button>
                </div>
            </section> 
        </div>

        {    
            isClient && typeof window !== 'undefined'
            ?
            <div className="seller-editor">
                <div style={{borderBottom: '3px solid #efefef'}}>
                    <b>Add Products</b> here
                </div>
                <hr style={{margin: '0 0 10px 0 '}} />

                <div className="seller-editor-cnt">
                    
                    <section className='item-cnt'>
                        <div style={{height: 'auto'}}>
                            <div className="input-cnt" style={{width: '100%'}}>
                                <label htmlFor="" >Title</label>
                                <textarea className='seller-shop-title' style={{height: '100px'}} defaultValue={title?.current} onInput={e => productTitle(e.target.value)} placeholder='Write A Product Title Here' name="title" id=""></textarea>
                            </div>

                            
                            <div className="input-cnt"> 
                                <label htmlFor="">Category</label>
                                <select onInput={e => productCategory(e.target.value)} name='category'>
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
                                <select onInput={e => productType(e.target.value)} name='type'>
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
                                    <select onInput={e => productGender(e.target.value)} name='gender'>
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
                                category_state === 'Lodge & Apartments' 
                                ? 
                                <div className="input-cnt">
                                    <label htmlFor="">Gender</label>
                                    <select defaultValue={gender.current} onInput={e => productGender(e.target.value)} name='gender'>
                                        <option value="">Select Gender</option>
                                        {
                                            ["Male", "Female"].map ((item, index) => 
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

                                    cType_state === 'Clothing' || cType_state === 'Foot Wear' || cType_state === 'Accessories'

                                    ?
                                    <div className="input-cnt">
                                        <label htmlFor="">Sub-Category</label>
                                        <select onInput={e => productSubCategory(e.target.value)} name='sub-category'>
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
                                                    cType_state === 'Accessories'
                                                ?
                                                    accessory?.map((item, index) => 
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
                                category_state === 'Lodge & Apartments' 
                                ? 
                                <div className="input-cnt">
                                    <label htmlFor="">Inspection Fee</label>
                                    <input defaultValue={agent_fee.current} onInput={e=> productAgentFee(e.target.value)} type="number" name='Agency Fee' placeholder='Agency Fee' />
                                </div>
                                : 
                                <div className="input-cnt">
                                    <label htmlFor="">Condition</label>
                                    <select onInput={e => productCondition(e.target.value)} name='condition'>
                                        <option value="">Select {category.current} Condition</option>
                                        {
                                            category_state === "Health & Beauty" ? ["Brand New"].map ((item, index) => 
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
                                
                                <div className="input-cnt">
                                    <label style={{display: 'flex', width: '250px', fontSize: 'small'}} htmlFor="">Stock {category_state === 'Lodge & Apartments' ? '(How many of this lodge is vacant)' : 'How many of this item is available in your warehouse'}</label>
                                    <input defaultValue={stock.current} onInput={e => productStock(e.target.value)}  type="number" name="stock" id="" />
                                </div>
                            }

                            <div className="input-cnt">
                                <label htmlFor="">Price</label>
                                <input defaultValue={price.current} onInput={e => productPrice(e.target.value)}  type="text" name="price" id="price" />
                            </div>
                                  
                            {
                                category_state !== 'Lodge & Apartments'
                                ? 
                                <>
                                    
                                    <div className="input-cnt">
                                        <label htmlFor="">Shipping Duration (Time before shipping starts)</label>
                                        <select onInput={e => productShippingDuration(e.target.value)} name="shipping duration" id="">
                                            <option value="">Select Shipping Duration</option>
                                            {
                                                duration_list
                                            }
                                        </select>
                                    </div>
                                    
                                    <div className="input-cnt">
                                        <label htmlFor="">Shipping Policy</label>
                                        <select id="" onChange={e => {
                                            set_shipping_policy(e.target.value)
                                        }} on name="shipping policy">
                                            <option value={""}>Select Shipping Policy</option>
                                            <option value={"yes"}>Accept Refund</option>
                                            <option value={"no"}>Do Not Accept Refund</option>
                                        </select>
                                    </div>
                                    
                                    <div className="input-cnt" id="shipping-price" style={{width: '100%'}}>
                                        <label htmlFor="">Shipping Ranges & Prices</label>
                                            
                                        <section className='shadow-md' style={{ pointerEvent: 'all',padding: '10px', display: 'flex', alignItems: 'center', margin: '5px 0px', justifyContent: 'space-between', width: '100%'}}>
                                            <span style={{margin: '8px 0px 0px 0px'}}>
                                                <input checked={!!shipping_range?.in_campus?.selected} onClick={e => 
                                                    {
                                                        set_shipping_range(prev => ({
                                                            ...prev,
                                                            in_campus: {
                                                                ...prev.in_campus,
                                                                selected: !prev.in_campus.selected,
                                                            }
                                                        }))
                                                        let overlay = document.querySelector('.seller-overlay')
                                                        if(!shipping_range.in_campus.selected){
                                                            set_active_range(`Set price for shipping in ${profile?.campus}`)
                                                            overlay.setAttribute('id', 'seller-overlay')
                                                            set_edit_range('in_campus')
                                                        }
                                                    }
                                                } style={{height: '20px', width: '25px'}} type="checkbox" name="" id="" />
                                            </span>
                                            <span style={{fontWeight: '500', width: '30%', opacity: shipping_range?.in_campus?.selected === false ? '.5' : '1', fontSize: screenWidth > 760 ? 'medium' : 'small'}}>Shipping In {profile?.campus}</span>
                                            <span style={{opacity: shipping_range?.in_campus?.selected === false ? '.5' : '1', fontWeight: '500', fontSize: screenWidth > 760 ? 'medium' : 'small'}}>Price: ₦ {new Intl.NumberFormat('en-us').format(shipping_range?.in_campus?.price)}</span>
                                            <button style={{opacity: shipping_range?.in_campus?.selected === false ? '.5' : '1'}} onClick={e=> {
                                                set_edit_range('in_campus')
                                                
                                                let overlay = document.querySelector('.seller-overlay')
                                                if (shipping_range.in_campus.selected) {
                                                    document.querySelector('#range_price').value = shipping_range?.in_campus?.price
                                                    set_active_range(`Set price for shipping in ${profile?.state}`)
                                                    overlay.setAttribute('id', 'seller-overlay')
                                                    set_edit_range('in_campus')
                                                    set_range_price(shipping_range?.in_campus?.price)
                                                }
                                            }}>edit</button>
                                        </section>
                                        <section className='shadow-md' style={{pointerEvent: 'all',padding: '10px', display: 'flex', alignItems: 'center', margin: '5px 0px', justifyContent: 'space-between', width: '100%'}}>
                                            <span style={{margin: '8px 0px 0px 0px'}}>
                                                <input checked={!!shipping_range?.in_state?.selected} onClick={e => 
                                                    {
                                                        set_shipping_range(prev => ({
                                                            ...prev,
                                                            in_state: {
                                                                ...prev.in_state,
                                                                selected: !prev.in_state.selected,
                                                            }
                                                        }))
                                                        let overlay = document.querySelector('.seller-overlay')
                                                        if(!shipping_range.in_state.selected){
                                                            set_active_range(`Set price for shipping in ${profile?.state}`)
                                                            overlay.setAttribute('id', 'seller-overlay')
                                                            set_edit_range('in_state')
                                                        }
                                                    }
                                                } style={{height: '20px', width: '25px'}} type="checkbox" name="" id="" />
                                            </span>
                                            <span style={{fontWeight: '500', width: '30%', opacity: shipping_range?.in_state?.selected === false ? '.5' : '1', fontSize: screenWidth > 760 ? 'medium' : 'small'}}>Shipping Outside {profile?.campus}</span>
                                            <span style={{opacity: shipping_range?.in_state?.selected === false ? '.5' : '1', fontWeight: '500', fontSize: screenWidth > 760 ? 'medium' : 'small'}}>Price: ₦ {new Intl.NumberFormat('en-us').format(shipping_range?.in_state?.price)}</span>
                                            <button style={{opacity: shipping_range?.in_state?.selected === false ? '.5' : '1'}} onClick={e=> {
                                                set_edit_range('in_state')
                                                let overlay = document.querySelector('.seller-overlay')
                                                if(shipping_range.in_state.selected){
                                                    document.querySelector('#range_price').value = shipping_range?.in_campus?.price
                                                    set_active_range(`Set price for shipping in ${profile?.state}`)
                                                    overlay.setAttribute('id', 'seller-overlay')
                                                    set_range_price(shipping_range?.in_campus?.price)
                                                }
                                            }}>edit</button>
                                            
                                        </section>
                                        <section className='shadow-md' style={{pointerEvent: 'all',padding: '10px', display: 'flex', alignItems: 'center', margin: '5px 0px', justifyContent: 'space-between', width: '100%'}}>
                                            <span style={{margin: '8px 0px 0px 0px'}}>
                                                <input checked={!!shipping_range?.out_state?.selected} onClick={e => 
                                                    {
                                                        set_shipping_range(prev => ({
                                                            ...prev,
                                                            out_state: {
                                                                ...prev.out_state,
                                                                selected: !prev.out_state.selected,
                                                            }
                                                        }))
                                                        let overlay = document.querySelector('.seller-overlay')
                                                        if(!shipping_range.out_state.selected){
                                                            set_active_range(`Set price for shipping outside ${profile?.state}`)
                                                            overlay.setAttribute('id', 'seller-overlay')
                                                            set_edit_range('out_state')
                                                        }
                                                    }
                                                } style={{height: '20px', width: '25px'}} type="checkbox" name="" id="" />
                                            </span>
                                            <span style={{fontWeight: '500', width: '30%', opacity: shipping_range?.out_state?.selected === false ? '.5' : '1', fontSize: screenWidth > 760 ? 'medium' : 'small'}}>Shipping Outside {profile?.state}</span>
                                            <span style={{opacity: shipping_range?.out_state?.selected === false ? '.5' : '1', fontWeight: '500', fontSize: screenWidth > 760 ? 'medium' : 'small'}}>Price: ₦ {new Intl.NumberFormat('en-us').format(shipping_range?.out_state?.price)}</span>
                                            <button style={{opacity: shipping_range?.out_state?.selected === false ? '.5' : '1'}} onClick={e=> {
                                                set_edit_range('out_state')
                                                let overlay = document.querySelector('.seller-overlay')
                                                if(shipping_range.out_state.selected){
                                                    document.querySelector('#range_price').value = shipping_range?.out_state?.price
                                                    set_active_range(`Set price for shipping outside ${profile?.state}`)
                                                    overlay.setAttribute('id', 'seller-overlay')
                                                    set_edit_range('out_state')
                                                    set_range_price(shipping_range?.out_state?.price)
                                                }
                                            }}>edit</button>
                                            
                                        </section>
                                        
                                    </div>
                                    
                                </>
                                :
                                ""
                            }


                            {
                                category_state === 'Lodge & Apartments'
                                ? 
                                <div className="input-cnt">
                                    <label htmlFor="">To Pay</label>
                                    <input defaultValue={to_pay.current} onInput={e=> productToPay(e.target.value)} type="number" placeholder='To Pay' />
                                </div>
                                :
                                ""
                            }

                          


                            {
                                category_state === 'Lodge & Apartments'
                                ?
                                    <>
                                    

                                        <div className="input-cnt">
                                            <label htmlFor="">Lodge Name</label>
                                            <input  type="text" onInput={e=> productLodgeName(e.target.value)} name='Lodge Name' defaultValue={lodge_name.current} placeholder="Lodge Name" id="" />
                                        </div>

                                        <div className="input-cnt">
                                            <label htmlFor="">Flat Location (Down/Up Floor)</label>
                                            <input onInput={e=> productFlatLocation(e.target.value)} type="text" name='Flat Location'  defaultValue={flat_location.current} placeholder="Flat Location" id="" />
                                        </div>

                                        <div className="input-cnt">
                                            <label htmlFor="">Address 1 (Street e.g: ifite)</label>
                                            <input onInput={e=> productAddress1(e.target.value)} type="text" name="Address1"  defaultValue={address1.current} placeholder="Address 1" id="" />
                                        </div>

                                        <div className="input-cnt">
                                            <label htmlFor="">Address 2 (Junction e.g: yahoo)</label>
                                            <input onInput={e=> productAddress2(e.target.value)} type="text" name="Address2" defaultValue={address2.current} placeholder="Address 2" id="" />
                                        </div>

                                        <div className="input-cnt">
                                            <label htmlFor="">Address 3 (Optional)</label>
                                            <input onInput={e=> productAddress3(e.target.value)} type="text" name="Address3" defaultValue={address3.current} placeholder="Address 3" id="address3" />
                                        </div>

                                        <div className="input-cnt">
                                            <label htmlFor="">Address 4 (Optional)</label>
                                            <input onInput={e=> productAddress4(e.target.value)} type="text" name="Address4" defaultValue={address4.current} placeholder="Address 4" id="address4" />
                                        </div>

                                        <div className="input-cnt">
                                            <label htmlFor="">Country</label>

                                            <select defaultValue={country.current} onInput={e=> productCountry(e.target.value)} name="Country" placeholder="" id="">
                                                <option value="">Select Country</option>
                                                <option selected={true} value="Nigeria">Nigeria</option>
                                            </select>
                                        </div>

                                        <div className="input-cnt">
                                            <label htmlFor="">State</label>

                                            <select defaultValue={state.current} onInput={e=> productState(e.target.value)} name="State" placeholder="" id="" >
                                                <option value="">Select State</option>
                                                {
                                                    country_list.map((item,index) => 
                                                        true  === item.name
                                                        ?
                                                        <option selected key={index} value={item.name}>{item.name}</option>
                                                        :
                                                        <option key={index} value={item.name}>{item.name}</option>
                                                    )
                                                }
                                            </select>
                                        </div>

                                        <div className="input-cnt">
                                            <label htmlFor="">City/Region <small style={{fontSize: 'x-small'}}>(e.g Ifite-Awka, OKofia-Nnewi)</small></label>
                                            <input onInput={e=> productCity(e.target.value)} city='City' type="text" name='Region' placeholder='City/Region (e.g Ifite-Awka, OKofia-Nnewi)' />

                                        </div>
                                    </>
                                    :
                                    ''
                            }

                            
                        </div>
                        <section>
                            <div className="input-cnt" style={{width: '100%'}}>
                                <label htmlFor="">Description (Optional)</label>
                                <textarea style={{height: '200px'}} defaultValue={description?.current} onInput={e => productDescription(e.target.value)} placeholder='Write A  Short Description For The Product Here...' name="description" id=""></textarea>
                            </div>
                        </section>
                    </section>

                    <section className='file'>
                        <div className='' style={{width: '100%'}}>
                            <b>Product Samples </b>
                        </div>
                        <br />
                        <div className='file-cnt' style={{position: 'relative', height: '100%', justifyContent: 'space-evenly', display: 'flex', alignItems: 'flex-start', flexWrap: 'wrap'}}>
                            <div className="img-cnt" style={{width: '45%', position: 'relative', margin: '5px 0px', flexDirection: 'column'}}>
                                {/* <div style={{color: 'purple'}}>Required</div> */}
                                {
                                    thumbnail !== ''
                                    ?
                                        <div style={{position: 'relative',height: '100%', width: '100%', border: '3px solid #FF4500'}}>
                                            <div onClick={e => { 
                                                seller_overlay_setup(true, `Deleting thumbnail...`)
                            
                                                axios.post('http://192.168.24.146:9090/seller.thumbnail-delete', {
                                                    url: thumbnail,type:'video'
                                                })
                                                .then(response => {
                                                    console.log('delete successful', response);
                                                    seller_overlay_setup(false, '')
                                                    set_thumbnail('')
                                                    open_notice(true, 'deleted thumbnail successfully.')
                                                })
                                                .catch(error => {
                                                    console.error('delete failed', error);
                                                    seller_overlay_setup(false, '')
                                                    open_notice(true, 'thumbnail was not deleted successfully.')
                                                    // return error
                                                });
                                            }} className="delete-sample-img" style={{position: 'absolute', cursor: 'pointer', top: '5px', right: '5px', color: '#fff', background: 'red', zIndex: '1000', width: '20px', display: 'flex', alignItems: 'center', justifyContent: 'center', borderRadius: '2.5px', height: '20px'}}>x</div>   
                                            {
                                                (['jpg', 'jpeg', 'png', 'gif', 'webp'].includes(thumbnail.split('.').pop().toLowerCase())) ? 
                                                <img style={{ height: '100%', width: '100%' }} src={thumbnail} alt="" />
                                                : (['mp4', 'mov', 'avi', 'webm', 'mkv'].includes(thumbnail.split('.').pop().toLowerCase()))  ? 
                                                <video controls style={{ height: '100%', width: '100%' }} src={thumbnail} />
                                                : 
                                                open_notice(true, 'Unsupported format')
                                            }
                                        </div> 
                                    :
                                    <>
                                        <input onChange={async(e) => {
                                            // alert('')
                                            
                                            if(e.target.files[0]?.size <= 15 * 1024 * 1024){
                                                let response = await uploadThumbnailFiles(e.target.files[0], product_id)

                                                if (response.status === 200) {
                                                    let url = response.data.url;
                                                    set_thumbnail(url)
                                                    set_thumbnail_id(response.data.id)

                                                    window.localStorage.setItem(`thumbnail-url`, url)
                                                    
                                                    seller_overlay_setup(false, '')
                                                    open_notice(true, 'uploaded thumbnail successfully.')
                                                } else {
                                                    e.target.value = ''
                                                    seller_overlay_setup(false, '')
                                                    open_notice(true, 'thumbnail upload was not successful.')

                                                }
                                            } else {
                                                open_notice(true, 'File should not exceed 15MB (File too large)')
                                            }
                                        }} style={{display: 'none'}} accept="image/*,video/*" type="file" name="thumbnail" id="image0" />
                                        <label htmlFor="image0">
                                            <div>+</div>
                                            <div>Main File</div>
                                        </label>
                                    </>
                                }
                            </div>

                            
                            <File type={'mp4'} upload_response={upload_response} product_id={product_id} index={[0]} uploadImageFiles={uploadImageFiles} thumbnail={thumbnail} imgids={sample_img[0]} />
                            <File type={'mp4'} upload_response={upload_response} product_id={product_id} index={[1]} uploadImageFiles={uploadImageFiles} thumbnail={thumbnail} imgids={sample_img[1]} />
                            <File type={'mp4'} upload_response={upload_response} product_id={product_id} index={[2]} uploadImageFiles={uploadImageFiles} thumbnail={thumbnail} imgids={sample_img[2]} />
                            <File type={'mp4'} upload_response={upload_response} product_id={product_id} index={[3]} uploadImageFiles={uploadImageFiles} thumbnail={thumbnail} imgids={sample_img[3]} />
                            <File type={'mp4'} upload_response={upload_response} product_id={product_id} index={[4]} uploadImageFiles={uploadImageFiles} thumbnail={thumbnail} imgids={sample_img[4]} />
                            
                        </div>
                    </section>
                    
                </div>

                {
                    screenWidth > 760
                    ?
                    <section className="seller-editor-btn-cnt">
                        <button onClick={e => {
                        
                            handleForm()
                        }}>
                            Upload
                        </button>
                    </section>
                    :
                    ''
                }
                
            </div>
            :
            ''
        }
        
        {
            screenWidth <= 760
            ?
            <section className="seller-editor-btn-cnt">
                <button onClick={e => {
                    handleForm()
                }}>
                    {
                        is_update
                        ?
                        'Update'
                        :
                        'Upload'
                    }
                </button>
            </section>
            :
            ''
        }

    </>
  )
}
