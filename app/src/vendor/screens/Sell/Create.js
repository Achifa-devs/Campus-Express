import React, { useEffect, useRef, useState } from 'react'
import UploadBtn from '../../components/Create.js/UploadBtn'
import { Dimensions, ScrollView, View } from 'react-native'
import Title from '../../components/Create.js/Title';
import Description from '../../components/Create.js/Description';
import Category from '../../components/Create.js/Category';
import Price from '../../components/Create.js/Price';
import Stock from '../../components/Create.js/Stock';
import Type from '../../components/Create.js/Type';
import Condition from '../../components/Create.js/Condition';
import items from '../../../json/items.json';
import Photo from '../../components/Create.js/Photo';
import SubCategory from '../../components/Create.js/SubCategory';
import Gender from '../../components/Create.js/Gender';
import Size from '../../components/Create.js/Size';
export default function Create({ route }) {
  // const { update } = route?.params;
  let screenWidth = Dimensions.get('window').width;
  let screenHeight = Dimensions.get('window').height;


  let [uploading, set_uploading] = useState(false);

  let user_id;
  let locale;

  let [title, set_title] = useState('')
  let [category, set_category] = useState('')
  let [type, set_type] = useState('')
  let [condition, set_condition] = useState('')
  let [description, set_description] = useState('')
  let [price, set_price] = useState('')
  let [stock, set_stock] = useState('')
  let [photo, set_photo] = useState([])

  let [video, set_video] = useState([])
  let [lodge_address, set_lodge_address] = useState([]);

  let [gender, set_gender] = useState('')
  let [size, set_size] = useState([])
  let [sub_category, set_sub_category] = useState('')
  
  let [category_list, set_category_list] = useState([])
  let [type_list, set_type_list] = useState([])
  let [size_list, set_size_list] = useState([])
  let [sub_type_list, set_sub_type_list] = useState([])


  let data = useRef([title, category, price]);

  useEffect(() => {
    set_category_list(items.items.category.map(item => Object.keys(item)[0]));
  }, [])

  function updateTitle(data) {
    set_title(data)
  }

  function updateCategory(data) {
    set_category(data)
    let x = items.items.category;
    let result = x.filter(item => (Object.keys(item)[0] === data.trim()))
    set_type_list(result[0][data.trim()])
    
    if(data.trim() === 'Fashion'){
      set_sub_type_list(result[0]['ClothingMale'])
    }
  }

  function updateType(data) {
    set_type(data)
  }

  function updateCondition(data) {
    set_condition(data)
  }
 
  function updateGender(data) {
    set_gender(data)  

    let x = items.items.category;
    let result = x.filter(item => (Object.keys(item)[0] === category.trim()))

    if(data.trim().toLowerCase() === 'male'){
      set_sub_type_list(result[0]['ClothingMale'])
    }else{
      set_sub_type_list(result[0]['ClothingFemale'])
      
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

  function updatePhotos(data) {
    set_photo(uris => [...uris, data])
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
    }else if(category === 'Lodge/Apartments' || category === 'Pets' || category === 'Food'){
      //CONDITION, ABSENT
      if(type === 'Lodge/Apartments'){
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
    
    // console.log(response)
    if(update){
      let product_id = searchParams.get('product_id');
      fetch('http://localhost:2222/seller.product-update', {
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
                  photos: photo,
                  videos: video,
                  user_id : user_id,
                  stock: stock,
                  product_id: product_id
                }, 
            
                dynamicData: {
                  type: type,
                  locale: locale_state,
                  sub_category: sub_category,
                  gender: gender,
                  size: size,
                  lodge_address: lodge_address
                }
              }
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

      fetch('https://cs-server-olive.vercel.app/create-product', {
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
              product_id: is_update ? update_product_id : product_id,
              user_id: user_id,
              campus: profile?.campus,
              state: profile?.state,
              stock: stock,
              thumbnail_id: thumbnail_url,
              thumbnail_public_id: thumbnail_id
            }, 
        
            dynamicData: {
                cType: cType,
                locale: locale,
                subCategory: subCategory,
                gender: gender,
                condition: condition_state,
                size: size,

                // lodge_data: {
                //     lodge_active: category_state === "Lodge & Apartments" ? true : false,
                //     lodge_name: lodge_name,
                //     flat_location: flat_location, 
                //     address1: address1,
                //     address2: address2,
                //     address3: address3,
                //     address4: address4,
                //     country: country,
                //     state: state,
                //     city: city
                // }
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


            <Category category_list={category_list} updateCategory={updateCategory} />
            <View style={{width: '100%', marginTop: 5, opacity: category !== '' ? 1 : .5, pointerEvents: category !== '' ? 'auto' : 'none', marginBottom: 5, padding: 0, backgroundColor: '#efefef'}}>

              <Photo updatePhotos={updatePhotos} />
              <Type category={category} type_list={type_list} updateType={updateType} />

              {
                category === 'Fashion' 
                
                ? 
                
                <Gender updateGender={updateGender} />

                :
                ""
              }
              {
                category === 'Fashion' 
                ? 

                  type === 'Clothing' || type === 'Foot Wear'

                  ?
                  <>
                    <SubCategory updateSubCategory={updateSubCategory} sub_type_list={sub_type_list} />

                    <Size size_list={size_list} updateSize={updateSize}  />
                  </>
                  :

                  ""
                : 
                ""
              }
              
              {
                category === 'Lodge/Apartments' || category === 'Pets' || category === 'Food'
                ? 
                ""
                : 
                <Condition category={category} updateCondition={updateCondition} />
              } 
            </View>
            <Description updateDescription={updateDescription} /> 

            <Price updatePrice={updatePrice} />
            <Stock updateStock={updateStock} />

        </ScrollView>
      </View>
      <UploadBtn setUploadToTrue={setUploadToTrue} /> 
    </>
  )
}
