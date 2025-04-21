import React, { useEffect, useState } from 'react'
import ListingCard from '../components/Listing/ListingCard'
import { Alert, ScrollView } from 'react-native'
import { useSelector } from 'react-redux'

export default function Listing() {
  let [review, set_review] = useState('')
  let { user } = useSelector(s => s.user)
  let [server_err, set_server_err] = useState(false)
  let [list, set_list] = useState([])
      
  useEffect(() => {
    if (user) {
      console.log(user)
      get_list_data()
    }
  },[user])

  function get_list_data() {
    fetch(`https://ce-server.vercel.app/seller.listing?id=${user?.seller_id}`, {
      headers: {
        "Content-Type": "Application/json"
      }
    })
    .then(async(result) => {
        
      let response = await result.json()
      console.log(result)
      console.log(response)
      set_list(response)

      // if (response.success) {
      //     console.log(response)
      //     set_list(response.data)
      // } else {
      //     set_server_err(!true)
      //     Alert.alert('Error occured, please try again later')
      // }

    })
    .catch((err) => {
      set_server_err(!true)
      Alert.alert('Network error, please try again.')
      console.log(err)
    })
  }
  return (
    <>
      <ScrollView >
        {
          list.map((item, index) => <ListingCard data={item} index={index}  />)
        }
      </ScrollView>
    </>
  )
}
