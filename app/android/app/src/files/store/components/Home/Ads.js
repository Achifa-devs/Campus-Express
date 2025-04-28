import React from 'react'
import { Text, TouchableOpacity, View } from 'react-native'
import NewsSvg from '../../../media/assets/news-feed-svgrepo-com.svg'
import LodgeSvg from '../../../media/assets/lodge-house-svgrepo-com.svg'
import ServicesSvg from '../../../media/assets/services-svgrepo-com.svg'
export default function Ads() {
  return (
    <>
        <View style={{
            height: 40,
            width: '100%',
            display: 'flex',
            flexDirection: 'row',
            justifyContent: 'center',
              alignItems: 'center',
            marginBottom: -3,
            
        }}>
            {
                [
                    {
                        title: 'Lodges', svg: <LodgeSvg height={20} width={20} />
                    },
                    {
                        title: 'Services', svg: <ServicesSvg height={20} width={20} />
                    },
                    {
                        title: 'News', svg: <NewsSvg height={20} width={20} />
                    }
                  ].map((item, index) => <TouchableOpacity key={index} style={{
                        height: '100%',
                        padding: 0,
                        width: '33%',
                        // marginLeft: 5, 
                        display: 'flex',
                        flexDirection: 'row',
                        justifyContent: 'center',
                        alignItems: 'center',
                        borderRadius: 5,
                        // marginRight: 5,
                        padding: 8,
                        // marginBottom: 10,
                        backgroundColor: '#fff'
                    }}>
                    <View>
                        {item.svg} 
                    </View>
                    <Text style={{color: '#000', fontSize: 14, fontWeight: '500'}}>  {item.title}</Text>
                </TouchableOpacity>)
            }
        </View>
    </>
  )
}
