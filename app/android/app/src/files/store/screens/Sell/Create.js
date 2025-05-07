import React, { useEffect, useRef, useState } from 'react'
import { ActivityIndicator, Alert, Dimensions, ScrollView, View } from 'react-native'
import Category from '../../components/Create.js/Category';
import Price from '../../components/Create.js/Price';
import Stock from '../../components/Create.js/Stock';
import Condition from '../../components/Create.js/Condition';  
import items from '../../../../../../../items.json';
import Photo from '../../components/Create.js/Photo';
import SubCategory from '../../components/Create.js/SubCategory';
import Gender from '../../components/Create.js/Gender';
import Size from '../../components/Create.js/Size';
import Title from '../../components/Create.js/Title';
import Description from '../../components/Create.js/Description';
import Type from '../../components/Create.js/Type';
import UploadBtn from '../../components/Create.js/UploadBtn';
import { generateId } from '../../utils/IdGen';
export default function Create({ route }) {
  let screenWidth = Dimensions.get('window').width;
  let screenHeight = Dimensions.get('window').height;

  const [user, setUser] = useState('')
  let [shipping_policy, set_shipping_policy] = useState('')
  let [shipping_duration, set_shipping_duration] = useState('')
  let [active_range, set_active_range] = useState('')
  let [shipping_range, set_shipping_range] = useState({
    in_campus: {selected: false, price: 0},
    in_state: {selected: false, price: 0},
    out_state: {selected: false, price: 0}
  })
  const [photos, setPhotos] = useState(Array(6).fill(null));
  const [productId, setProductId] = useState('');
  const [uploading, setUploading] = useState(false);

  function updatePhotos(data) {
    setPhotos(data)
  }
  useEffect(() => {
    const { update } = route?.params;

    if (update) {
      const { productId } = route?.productId;
      setProductId(productId)
    } else {
      setProductId(generateId(12))
    }
  }, [route])

  let [title, set_title] = useState('')
  let [category, set_category] = useState('')
  let [type, set_type] = useState('')
  let [condition, set_condition] = useState('')
  let [description, set_description] = useState('')
  let [price, set_price] = useState('')
  let [stock, set_stock] = useState('')
  let [thumbnail, set_thumbnail] = useState('')
  function updateThumbnail(data) {
    set_thumbnail(data)
  }
  let [gender, set_gender] = useState('')
  let [size, set_size] = useState([])
  let [sub_category, set_sub_category] = useState('')
  
  let [category_list, set_category_list] = useState([])
  let [type_list, set_type_list] = useState([])
  let [size_list, set_size_list] = useState([])
  let [sub_type_list, set_sub_type_list] = useState([])

  useEffect(() => {
    set_size_list([])

    if (type.toLowerCase() === 'clothing') {

      for(let i=1; i<=50; i++){
        // set_size_list([])
        set_size_list(item => [...item, {title: (i).toString()}])
      }
    } else {
      set_size_list([
        {title: 'XXL (Xtra-Xtra large)'},
        {title: 'XL (Xtra Large)'},
        {title: 'L (Large)'},
        {title: 'M (Medium)'},
        {title: 'S (Small)'},
        {title: 'XS (Xtra Small)'},
        {title: 'XXS (Xtra-Xtra Small)'},
      ])
    }
  },[type])

  let data = useRef([title, category, price]);

  useEffect(() => {
    const keys = items.items.category.map(item => Object.keys(item)[0]);
    set_category_list([])
    keys.map(item => set_category_list(data => [...data, { title: item }]));
  }, [])

  function updateTitle(data) {
    set_title(data)
  }

  function updateCategory(data) {
    set_category(data)
    let x = items.items.category;
    let result = x.filter(item => (Object.keys(item)[0] === data.trim()));
    set_type_list([])
    result[0][data.trim()].map(item => set_type_list(data=> [...data, {title: item}]))
    if(data.trim() === 'Fashion'){
      set_sub_type_list([])
      result[0]['ClothingMale'].map(item => set_sub_type_list(data => [...data, {title: item}]))
    }
  }

  function updateType(data) {
    set_type(data);
    const index = data === 'For Single Occupancy' ? 'Single' : 'Roomate';
    let x = items.items.category;
    let result = x.filter(item => (Object.keys(item)[0] === category.trim()))
    set_sub_type_list([])
    category !== 'Fashion' ? result[0][index].map(item => set_sub_type_list(data => [...data, {title: item}])) : ''

  }

  function updateCondition(data) {
    set_condition(data)
  }
 
  function updateGender(data) {
    set_gender(data)  

    let x = items.items.category;
    let result = x.filter(item => (Object.keys(item)[0] === category.trim()))
    set_sub_type_list([])

    if(data.trim().toLowerCase() === 'male'){
      category === 'Fashion' ?result[0]['ClothingMale'].map(item => set_sub_type_list(data => [...data, {title: item}])) : ''
    } else {
      category === 'Fashion' ?result[0]['ClothingFemale'].map(item => set_sub_type_list(data => [...data, {title: item}])) : ''
      
    }
  }

  function updateSubCategory(data) {
    set_sub_category(data)
  }


  function updateDescription(data) {
    set_description(data)
  }

  function updatePrice(data) {
    set_price(data)
  }

  function updateStock(data) {
    set_stock(data)
  }


  function updateSize(data) {
    set_size(data)
  }

  function setUploadToTrue(data) {
    if(category === 'Fashion'){
      // GENDER, SIZE, SUBCATEGORY
      if(type === 'Clothing' || type === 'Foot Wear'){
        //SIZE AND SUBCATEGORY PRESENT
        data.current = ([{title},{category},{price},{ type},{gender},{sub_category},{size},{condition},{stock}])
      }else{
        data.current = ([{title},{category},{price}, {type},{gender},{condition},{stock}])
      }
    }else if(category === 'Lodge & Apartments' || category === 'Pets' || category === 'Food'){
      //CONDITION, ABSENT
      if(type === 'Lodge & Apartments'){
        //SIZE AND SUBCATEGORY PRESENT
        data.current = ([{title},{category},{price}, {type}])
      }else{
        data.current = ([{title},{category},{price}, {type},{stock}])
      }
    }else{
      data.current = ([{title},{category},{price}, {type},{condition},{stock}])
    }
    uploadData()
  }

  

  function validation() {
    
      let result = data.current.filter(item => 
        Array.isArray(item) 
        ?  
          item.length === 0
          ?
          false
          :
          true
        :
          item === ''
          ?
          false
          :
          true
      )
 
    console.log('data: ', data.current)
  }

  function uploadData() {
    let response = validation();

    
    
    console.log(response)
    if(update){
      let product_id = searchParams.get('product_id');
      fetch('http://localhost:2222/seller.product-update', {
          method: 'post',
          headers: {
              "Content-Type": "Application/json"
          },
          body: JSON.stringify(
            {}
          )
      })
      .then(async(result) => {
          let response = await result.json();
          if(response){
              // window.localStorage.setItem('draft_gender', '')
              // window.localStorage.setItem('draft_size', '')
              // window.localStorage.setItem('draft_sub_category', '')
              // window.localStorage.setItem('draft_locale', '')
              // window.localStorage.setItem('draft_condition', '')
              // window.localStorage.setItem('draft_title', '')
              // window.localStorage.setItem('draft_description', '')
              // window.localStorage.setItem('draft_category', '')
              // window.localStorage.setItem('draft_c_type', '')
              // window.localStorage.setItem('draft_price', '')

              // openNotice('Update Successful, Redirecting...')
              // window.location.href = '/seller.shop';
              // document.querySelector('.overlay').removeAttribute('id')
          
              
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

      fetch('http://192.168.209.146:9090/seller.product-upload', {
        method: 'post',
        headers: {
            "Content-Type": "Application/json"
        },
        body: JSON.stringify(
          {
            constantData: { 
              title: title,
              description: description,
              category: category,
              price: price,
              product_id: productId,
              user_id: user.user_id,
              campus: user?.campus,
              state: user?.state,
              stock: stock,
              thumbnail_id: thumbnail,
              thumbnail_public_id: thumbnail_public_id
            }, 
        
            dynamicData: {
              cType: type,
              locale: locale,
              subCategory: sub_category,
              gender: gender,
              condition: condition,
              size: size,

              lodge_data: {
                lodge_active: category === "Lodge & Apartments" ? true : false,
                lodge_name: lodge_name,
                address1: address1,
                address2: address2,
                address3: address3,
                address4: address4,
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
        console.log(response)
        if(response){
            // window.localStorage.setItem('draft_gender', '')
            // window.localStorage.setItem('draft_size', '')
            // window.localStorage.setItem('draft_sub_category', '')
            // window.localStorage.setItem('draft_locale', '')
            // window.localStorage.setItem('draft_condition', '')
            // window.localStorage.setItem('draft_title', '')
            // window.localStorage.setItem('draft_description', '')
            // window.localStorage.setItem('draft_category', '')
            // window.localStorage.setItem('draft_c_type', '')
            // window.localStorage.setItem('draft_price', '')
        
            // openNotice('Upload Successful, Redirecting...')
            // window.location.href = '/seller.shop';
            // document.querySelector('.overlay').removeAttribute('id')
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
  }

  useEffect(() => {
    console.log(data.current)
  }, [data])

  useEffect(() => {

  }, [])

  return (
    <>
      {uploading && 
        <View style={{height: screenHeight, width: screenWidth, position: 'absolute', top: 0, zIndex: 100, backgroundColor: 'rgba(0,0,0,.3  )', display: 'flex', alignItems: 'center', justifyContent: 'center'}}>
          <ActivityIndicator size="small" color="#FF4500" />
        </View>
      }
      
      <View>
        <ScrollView style={{
            width: '100%',
            height: screenHeight - 120,
            backgroundColor: '#efefef',
            position: 'relative',
            padding: .5
          }}
          contentContainerStyle={{display: 'flex', alignItems: 'center', flexDirection: 'column', justifyContent: 'flex-start', flexWrap: 'wrap'}}
          >
            <Title updateTitle={updateTitle} />

            <Price updatePrice={updatePrice} />
            <Stock updateStock={updateStock} />
            <Photo productId={productId} updateThumbnail={updateThumbnail} updatePhotos={updatePhotos} photos={photos} setUploading={setUploading} />
            
            <Category category_list={category_list} updateCategory={updateCategory} />
            <View style={{width: '100%', marginTop: 5, opacity: category !== '' ? 1 : .5, pointerEvents: category !== '' ? 'auto' : 'none', marginBottom: 5, padding: 0, backgroundColor: '#efefef'}}>
              {
                category === 'Fashion' || category === 'Lodge & Apartments' 
                ? 
                <Gender updateGender={updateGender} />
                :
                ""
              }
              <Type category={category} type_list={type_list} updateType={updateType} />

              
              {
                category === 'Fashion' 
                ? 
                  type === 'Clothing' || type === 'Foot Wear'
                  ?
                  <>
                    <SubCategory category={category} updateSubCategory={updateSubCategory} sub_type_list={sub_type_list} />

                    <Size size_list={size_list} updateSize={updateSize}  />
                  </>
                  :
                  ""
                : 
                ""
            }
              {
                category === 'Lodge & Apartments' 
                ? 

                  
                  <>
                    <SubCategory updateSubCategory={updateSubCategory} sub_type_list={sub_type_list} />

                  </>
                : 
                ""
              }
              
              {
                category === 'Lodge & Apartments' || category === 'Pets' || category === 'Food'
                ? 
                ""
                : 
                <Condition category={category} updateCondition={updateCondition} />
              } 
            </View>
            
            <Description updateDescription={updateDescription} /> 

            

        </ScrollView>
      </View>
      <UploadBtn setUploadToTrue={setUploadToTrue} /> 
    </>
  )
}
