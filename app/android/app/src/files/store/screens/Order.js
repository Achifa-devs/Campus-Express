import React, { useEffect, useState } from 'react'
import FavSvg from '../../media/icons/order-svgrepo-com (3).svg';
import { Dimensions, ScrollView, Text, TouchableOpacity, View } from 'react-native'
import { useSelector } from 'react-redux';
import { getData } from '../../utils/AsyncStore.js';

export default function Order() {
  let screenHeight = Dimensions.get('window').height;
  let {auth} = useSelector(s => s.auth)
  let [user, set_user] = useState(null)

  useEffect(() => {
    getData('user')
    .then((result) => {
      set_user(result)
    })
    .catch((err) => console.log(err))
  }, [])
  return (
    <>
        <ScrollView>
            {/* <OrderCard /> */}

            <View style={{
              height: screenHeight - 55,
              width: '100%',
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',

            }}>
              <FavSvg height={80} width={80} />
              <Text style={{color: '#FF4500', fontSize: 15, marginTop: 20}}>{
                  user !== null
                  ? 
                  <>You Haven't Ordered Any Item Yet</>
                  :
                  <>Login To View Your Orders</> 
              }</Text>

              <TouchableOpacity>
                <Text style={{color: '#FF4500', fontSize: 10, marginTop: 20}}>
                  {
                    user !== null
                    ? 
                    <>Click Here To Continue Shopping</>
                    :
                    <>Click Here To Login</>
                  }
                </Text>
              </TouchableOpacity>
            </View>
        </ScrollView>
    </>
  )
}
