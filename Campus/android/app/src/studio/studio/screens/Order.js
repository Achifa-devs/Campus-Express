import React from 'react'
import OrderCard from '../components/Order/OrderCard'
import { ScrollView } from 'react-native'

export default function Order() {
  return (
    <>
        <ScrollView>
            <OrderCard />
        </ScrollView>
    </>
  )
}
