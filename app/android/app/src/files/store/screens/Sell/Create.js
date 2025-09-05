import React, { useEffect, useRef, useState } from 'react'
import { ActivityIndicator, Alert, Dimensions, ScrollView, View } from 'react-native'
import Category from '../../components/Create.js/Category';
import Price from '../../components/Create.js/Price';
import Stock from '../../components/Create.js/Stock';
import Condition from '../../components/Create.js/Condition';  
import items from '../../../../../../../items.json';
import lodge from '../../../../../../../lodge.json';
import service from '../../../../../../../services.json';
import Photo from '../../components/Create.js/Photo';
import SubCategory from '../../components/Create.js/SubCategory';
import Gender from '../../components/Create.js/Gender';
import Size from '../../components/Create.js/Size';
import Title from '../../components/Create.js/Title';
import Description from '../../components/Create.js/Description';
import Type from '../../components/Create.js/Type';
import UploadBtn from '../../components/Create.js/UploadBtn';
import { generateId } from '../../utils/IdGen';
import Address1 from '../../components/Create.js/Address1';
import Address2 from '../../components/Create.js/Address2';
import DeliveryRangeSelector from '../../components/Create.js/Delivery';
import ShippingPolicy from '../../components/Create.js/ShippingPolicy';
import ShippingDuration from '../../components/Create.js/ShippingDuration';
import { getData } from '../../../utils/AsyncStore.js';
import { useNavigation } from '@react-navigation/native';
import Features from './Amenities.js';
import Video from '../../components/Create.js/Video.js';
import Freq from '../../components/Create.js/Frequency.js';
import UpfrontPay from '../../components/Create.js/UpfrontPayment.js';

export default function Create({ route }) {
  let screenWidth = Dimensions.get('window').width;
  let screenHeight = Dimensions.get('window').height;

  const [user, setUser] = useState('')
  let [shipping_policy, set_shipping_policy] = useState('')
  let [shipping_duration, set_shipping_duration] = useState('')
  // let [active_range, set_active_range] = useState('')
  // let [shipping_range, set_shipping_range] = useState({
  //   in_campus: {selected: false, price: 0},
  //   in_state: {selected: false, price: 0},
  //   out_state: {selected: false, price: 0}
  // })

  useEffect(() => {
      
    (async function getUser(params) {
      let user = await getData('user');
      const id = JSON.parse(user)
      setUser(id)
    })()
  }, []);
  const [shippingRange, setShippingRange] = useState({
    in_campus: { selected: true, price: '0' },
    in_state: { selected: false, price: '' },
    out_state: { selected: false, price: '' }
  });
  const [photos, setPhotos] = useState(Array(6).fill(null));
  const [productId, setProductId] = useState('');
  const [uploading, setUploading] = useState(false);

  const [purpose, setPurpose] = useState('')

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

  useEffect(() => {
    const { purpose } = route?.params;
    setPurpose(purpose)
  }, [route])

  let [address1, set_address1] = useState('')
  let [address2, set_address2] = useState('')
  let [title, set_title] = useState('')
  let [category, set_category] = useState('')
  let [type, set_type] = useState('')
  let [condition, set_condition] = useState('')
  let [features, set_features] = useState([]);
  let [description, set_description] = useState('')
  let [price, set_price] = useState('')
  let [stock, set_stock] = useState('')
  let [freq, set_freq] = useState('')
  let [upfront_pay, set_upfront_pay] = useState('')
  let [thumbnail, set_thumbnail] = useState('');
  let [thumbnail_public_id, set_thumbnail_public_id] = useState('');

  function updateThumbnail(data,id) {
    validation()
    set_thumbnail(data);
    set_thumbnail_public_id(id)
  }

  function updateShippingRange(range) {
    if (range === 'in_campus') return; // in_campus is mandatory
      
    setShippingRange(prev => ({
      ...prev,
      [range]: {
        ...prev[range],
        selected: !prev[range].selected,
        price: !prev[range].selected ? '0' : ''
      }
    }));

    
  }

  function updateShippingRangePrice(range, value) {
    const numericValue = value.replace(/[^0-9]/g, '');
      setShippingRange(prev => ({
        ...prev,
        [range]: {
          ...prev[range],
          price: numericValue
        }
    }));
  }

  let [gender, set_gender] = useState('')
  let [size, set_size] = useState([])
  let [sub_category, set_sub_category] = useState('')
  let [category_list, set_category_list] = useState([])
  let [type_list, set_type_list] = useState([])
  let [size_list, set_size_list] = useState([])
  let [sub_type_list, set_sub_type_list] = useState([])

  
  useEffect(() => {
    validation()
  },[
    category,
    title,
    thumbnail,
    price,
    type,
    shipping_policy,
    shipping_duration,
    description,
    stock,
    upfront_pay,
    freq,
    sub_category,
    gender,
    features,
    condition,
    size,
    address1,
    address2,
  ]);

  let fields = {
    category,
    title, 
    thumbnail,
    price, 
    type, 
    shippingRange,
    description,
    shipping_policy,
    shipping_duration,
    stock,
    features,
    sub_category,
    gender,
    condition,
    size,
    freq,
    upfront_pay,
    address1, 
    address2, 
  }

  let [errs, setErrs] = useState('');
  let [errList, setErrList] = useState({});

  useEffect(() => {
    if (purpose === 'product') {
      if (category === 'Fashion') {
        if (type !== 'Clothing' && type !== 'Foot Wear') {
          setErrList({
            categoryErr: '',
            titleErr: '',   
            shippingRangeErr: '',          
            genderErr: '',  
            thumbnailErr: '',
            priceErr: '', 
            typeErr: '', 
            conditionErr: '',
            stockErr: '',
            shipping_policyErr: '',
            shipping_durationErr: ''
          })
        } else if (type === 'Accessories') {
          setErrList({
            categoryErr: '',
            titleErr: '',      
            shippingRangeErr: '',          
            genderErr: '',  
            thumbnailErr: '',
            priceErr: '', 
            typeErr: '', 
            sub_categoryErr: '',
            conditionErr: '',
            stockErr: '',
            shipping_policyErr: '',
            shipping_durationErr: ''
          })
        } else {
          setErrList({
            categoryErr: '',
            titleErr: '',
            shippingRangeErr: '',          
            genderErr: '',  
            thumbnailErr: '',
            priceErr: '', 
            typeErr: '', 
            sub_categoryErr: '',
            sizeErr: '',
            conditionErr: '',
            stockErr: '',
            shipping_policyErr: '',
            shipping_durationErr: ''
          })
        }
  
        
      } else if(category === 'Pets'){
        setErrList({
          categoryErr: '',
          titleErr: '',
          shippingRangeErr: '', 
          thumbnailErr: '',
          priceErr: '', 
          typeErr: '', 
          stockErr: '',
          shipping_policyErr: '',
          shipping_durationErr: ''
        })
      }else {
        setErrList({
          categoryErr: '',
          titleErr: '',
          shippingRangeErr: '', 
          thumbnailErr: '',
          conditionErr: '',
          priceErr: '', 
          typeErr: '', 
          stockErr: '',
          shipping_policyErr: '',
            shipping_durationErr: ''
        })
      }
    } else if (purpose === 'accomodation') {
      setErrList({
        categoryErr: '',
        genderErr: '',  
        titleErr: '',
        featuresErr: '',
        thumbnailErr: '',
        priceErr: '', 
        typeErr: '', 
        freqErr: '',
        upfront_payErr: '',
        address1Err: '',
        address2Err: ''
      })
    } else {
      setErrList({
        categoryErr: '',
        titleErr: '',
        typeErr: '',
        genderErr: ''
      })
    } 
  }, [category,type,purpose])



  useEffect(() => {
    set_size_list([])

    if (type === 'Foot Wear') {

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
    if (purpose === 'product') {
      const keys = items.items.category.map(item => Object.keys(item)[0]);
      set_category_list([])
      keys.map(item => set_category_list(data => [...data, { title: item }]));
    } else if(purpose === 'accomodation'){
      const keys = lodge.items.category.map(item => Object.keys(item)[0]);
      set_category_list([])
      keys.map(item => set_category_list(data => [...data, { title: item }]));
    }else{
      const keys = service.items.category.map(item => Object.keys(item)[0]);
      set_category_list([])
      keys.map(item => set_category_list(data => [...data, { title: item }]));
    }  
  }, [purpose])

  function updateTitle(data) {
    set_title(data)
  }

  function updateCategory(data) {
    set_category(data)
    if (purpose === 'product') {
      let x = items.items.category;
      let result = x.filter(item => (Object.keys(item)[0] === data.trim()));
      set_type_list([])
      result[0][data.trim()].map(item => set_type_list(data=> [...data, {title: item}]))
    }else if(purpose === 'accomodation'){
      let x = lodge.items.category;
      let result = x.filter(item => (Object.keys(item)[0] === data.trim()));
      set_type_list([])
      result[0][data.trim()].map(item => set_type_list(data=> [...data, {title: item}]))
    }else{
      let x = service.items.category;
      let result = x.filter(item => (Object.keys(item)[0] === data.trim()));
      set_type_list([])
      result[0][data.trim()].map(item => set_type_list(data=> [...data, {title: item}]))
    }
  }

  function updateType(data) {
    set_type(data);
    set_sub_category('')
    const index = data === 'For Single Occupancy' ? 'Single' : 'Roomate';
    let x = items.items.category;
    let result = x.filter(item => (Object.keys(item)[0] === category.trim()))
    set_sub_type_list([])
    category === 'Lodge & Apartments' ? result[0][index].map(item => set_sub_type_list(data => [...data, { title: item }])) : ''
    
    if(data.trim() === 'Clothing'){
      set_sub_type_list([])
      if (gender === 'Male') {
        result[0]['ClothingMale'].map(item => set_sub_type_list(data => [...data, {title: item}]))
      } else {
        result[0]['ClothingFemale'].map(item => set_sub_type_list(data => [...data, {title: item}]))
      }
    } else if (data.trim() === 'Foot Wear') {
      result[0]['FootWear'].map(item => set_sub_type_list(data => [...data, {title: item}]))
    } else if (data.trim() === 'Accessories') {
      result[0]['Accessories'].map(item => set_sub_type_list(data => [...data, {title: item}]))
    }
  }

  function updateCondition(data) {
    set_condition(data)
  }
 
  function updateGender(data) {
    set_gender(data)  
    // console.log(data)

    let x = items.items.category;
    let result = x.filter(item => (Object.keys(item)[0] === category.trim()))
    set_sub_type_list([])

    if(data.trim().toLowerCase() === 'male'){
      category === 'Fashion' ?result[0]['ClothingMale'].map(item => set_sub_type_list(data => [...data, {title: item}])) : ''
    } else {
      category === 'Fashion' ?result[0]['ClothingFemale'].map(item => set_sub_type_list(data => [...data, {title: item}])) : ''
      
    }
  }

  function updateFeatures(data){
    set_features(data)
  }

  function updateFreq(data){
    set_freq(data)
  }

  function updateUpfrontPay(data){
    set_upfront_pay(data)
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

  function updateShippingPolicy(data) {
    set_shipping_policy(data)
  }

  function updateShippingDuration(data) {
    set_shipping_duration(data)
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

  

  // Update the validation function to include shipping range validation
  function validation() {
    const newErrors = {};
    console.log("errList: ", errList)
    Object.entries(errList).forEach(([key, _]) => {
      const field = key.replace('Err', '');
      const value = fields[field];

      
      if (field !== 'price' && field !== 'upfront_pay') {
        if (!value || (Array.isArray(value) && value.length === 0)) {
          if(purpose === 'product'){
            if (field === 'thumbnail') {
              newErrors[key] = `Image ${field} is required`;
            } else {
              newErrors[key] = `${field} is required`;
            }
          }else{
            if (field === 'thumbnail') {
              newErrors[key] = `Video ${field} is required`;
            } else {
              newErrors[key] = `${field} is required`;
            }
          }
        } else {
          newErrors[key] = ``;
        }
      } else {

        if (field === 'price') {
          const digitsOnly = value.replace(/\D/g, '');
          if (!price) {
            newErrors[key] = `${field} is required`;
          } else {
            if (digitsOnly <= 500) {
              newErrors[key] = ('price must be greater than ₦500');
            }else {
              newErrors[key] = ``;
            }
          }
        } else if(field === 'upfront_pay'){
          const digitsOnly = value.replace(/\D/g, '');
          console.log(field)
          if (!freq) {
            newErrors[key] = `${field} is required`;
          } else {
            if (digitsOnly <= 500) {
              newErrors[key] = ('frequency must be greater than ₦500');
            }else {
              newErrors[key] = ``;
            }
          }
        }
      }
    }); 

    // Add shipping range validation
    if (purpose === 'product') {
      if (parseInt(shippingRange.in_campus.price) < 500) {
        newErrors.shippingRangeErr = 'Campus delivery fee must be at least ₦500';
      }
  
      setErrs(Object.keys(newErrors).length ? 'Please fill all required fields.' : '');
      // console.log(Object.values(newErrors))
      setErrList(prev => ({ ...prev, ...newErrors }));
  
      return !Object.values(newErrors).filter((item) => item !== '').length > 0;
    } 
    setErrList(prev => ({ ...prev, ...newErrors }));
    return !Object.values(newErrors).filter((item) => item !== '').length > 0;
  }

  const navigation = useNavigation()

  // Update the uploadData function to include shipping range in the request
  function uploadData() {
    let response = validation();
    // if (!response) return;

    // Prepare shipping data
    if (response) {
      const shippingData = {
        in_campus: {
          selected: true,
          price: shippingRange.in_campus.price
        },
        in_state: shippingRange.in_state.selected ? {
          selected: true,
          price: shippingRange.in_state.price
        } : null,
        out_state: shippingRange.out_state.selected ? {
          selected: true,
          price: shippingRange.out_state.price
        } : null
      };
  
      setUploading(true)
      console.log(productId)
      fetch('https://cs-server-olive.vercel.app/vendor/create-product', {
        method: 'post',
        headers: {
          "Content-Type": "Application/json"
        },
        body: JSON.stringify({
          constantData: { 
            title: title,
            description: description,
            category: category,
            price: price,
            product_id: productId,
            user_id: user?.user_id,
            campus: user?.campus,
            state: user?.state,
            stock: stock,
            thumbnail_id: thumbnail,
            thumbnail_public_id: thumbnail_public_id,
            purpose: purpose
          }, 
          dynamicData: {
            cType: type,
            subCategory: sub_category,
            gender: gender,
            condition: condition,
            size: size,
            lodge_data: {
                lodge_active: purpose === "accomodation" ? true : false,
                upfront_pay: upfront_pay,
                freq: freq, 
                address1: address1,
                address2: address2,
                amenities: (features)
                // address3: address3,
                // address4: address4,
                // country: country,
                // state: state,
                // city: city
            }
          },
          shipping_data: {
            shipping_range: shippingData,
            shipping_policy,
            shipping_duration: shipping_duration.split(' ')[0]
          }
        })
      })
      .then(async(result) => {
        setUploading(false)

        let response = await result.json();
        console.log(response);
        if (response.success) { 
          // navigation.navigate('user-inventory')
          navigation.goBack()
          // Handle success
        } else {
          // Handle error
          setUploading(false)
  
          Alert.alert('Error occured, please try again!')
        }
      })
      .catch((error) => {
        console.log('Error:', error);
        // Handle error
        setUploading(false)
  
        Alert.alert('Error occured, please try again!')
  
      });  
    } else {
      Alert.alert('Please ensure no field is empty!');
    }
  }

  useEffect(() => {
    console.log(features)
  }, [features])

  function updateAddress1(data) {
    set_address1(data)
  }
  function updateAddress2(data) {
    set_address2(data)
  }

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
            <Category purpose={purpose} error={errList.categoryErr} category_list={category_list} updateCategory={updateCategory} />

            
            {
              purpose === 'product'?
              <Photo error={errList.thumbnailErr} productId={productId} updateThumbnail={updateThumbnail} updatePhotos={updatePhotos} photos={photos} setUploading={setUploading} />
              : purpose === 'accomodation'? <Video error={errList.thumbnailErr} productId={productId} updateThumbnail={updateThumbnail} updatePhotos={updatePhotos} videos={photos} setUploading={setUploading} />
              : ''
            }
            
            <View style={{width: '100%', marginTop: 5, opacity: category !== '' ? 1 : .5, pointerEvents: category !== '' ? 'auto' : 'none', marginBottom: 5, padding: 0, backgroundColor: '#efefef'}}>
              {
                category === 'Fashion'
                ? 
                <Gender error={errList.genderErr} updateGender={updateGender} />
                :
                ""
              }
              {
                purpose === 'accomodation' || purpose === 'service'
                ? 
                <Gender error={errList.genderErr} updateGender={updateGender} />
                :
                ""
              }
              <Type category={category} error={errList.typeErr} type_list={type_list} updateType={updateType} />

              
              {
                category === 'Fashion' 
                ? 
                  type === 'Clothing' || type === 'Foot Wear'
                  ?
                  <>
                    <SubCategory error={errList.sub_categoryErr} category={category} updateSubCategory={updateSubCategory} sub_type_list={sub_type_list} />

                    <Size error={errList.sizeErr} size_list={size_list} updateSize={updateSize}  />
                  </>
                  :
                  ""
                : 
                ""
              }
              {
                category === 'Fashion' 
                ? 
                  type === 'Accessories'
                  ?
                  <>
                    <SubCategory error={errList.sub_categoryErr} category={category} updateSubCategory={updateSubCategory} sub_type_list={sub_type_list} />

                  </>
                  :
                  ""
                : 
                ""
              }
              
              {
                purpose === 'product' ?
                 category === 'Pets' || category === 'Food' 
                  ? 
                  ""
                  : 
                  <Condition error={errList.conditionErr} category={category} updateCondition={updateCondition} />
                :
                ''
              } 
              {
                purpose === 'accomodation'
                ? 
                <>
                  <Address1 error={errList.address1Err} updateAddress1={updateAddress1} category={category} />
                  <Address2 error={errList.address2Err} updateAddress2={updateAddress2} category={category} />
                </>
                :
                ""
            }
            {
                purpose === 'product'
                ? 
                <>
                  <ShippingPolicy updateShippingPolicy={updateShippingPolicy} error={errList.shipping_policyErr} />
                  <ShippingDuration updateShippingDuration={updateShippingDuration} error={errList.shipping_durationErr} />
                </>
              :
              ''
            }
            </View>
            <Title error={errList.titleErr} updateTitle={updateTitle} category={category} purpose={purpose} />

            {purpose === 'accomodation'?<Freq updateFreq={updateFreq} error={errList?.freqErr} />:''}

            {purpose !== 'service'?<Price error={errList.priceErr} updatePrice={updatePrice} purpose={purpose} />: ''}

            {purpose === 'accomodation'?<UpfrontPay error={errList.upfront_payErr} updateUpfrontPay={updateUpfrontPay} purpose={purpose} />: ''}
          
            {
              purpose === 'product'
              ? 
              <Stock error={errList.stockErr} updateStock={updateStock} />   
              :
              ""
            }

            {
              purpose === 'accomodation'?
              <Features updateFeatures={updateFeatures} error={errList.featuresErr}  />
              : '' 
            }
            <Description updateDescription={updateDescription} /> 
            
            {
              purpose === 'product' ?
                <DeliveryRangeSelector 
                shippingRange={shippingRange} 
                updateShippingRangePrice={updateShippingRangePrice} 
                updateShippingRange={updateShippingRange}
                error={errList.shippingRangeErr}
              />
              : ''
            }

            
        </ScrollView>
      </View>
      <UploadBtn setUploadToTrue={setUploadToTrue} /> 
    </>
  )
}
