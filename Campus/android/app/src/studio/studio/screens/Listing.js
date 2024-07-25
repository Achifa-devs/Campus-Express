import React from 'react'
import ListingCard from '../components/Listing/ListingCard'
import { ScrollView } from 'react-native'

export default function Listing() {
  return (
    <>
      <ScrollView>
            <ListingCard />
        </ScrollView>
    </>
  )
}
