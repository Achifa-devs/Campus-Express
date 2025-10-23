import React from 'react'
import { Image, Text, View } from 'react-native'

export default function Card() {
  return (
    <>
      <View style={{
        padding: 8,
        borderRadius: 4,
        marginHorizontal: 5,
        marginVertical: 5,
        display: 'flex',
        flexDirection: 'column',
        justifyContent: 'space-between',
        alignItems: 'flex-start'
      }}>
        {/* Top for image and product data */}
        <View style={{
            display: 'flex',
            flexDirection: 'row',
            justifyContent: 'space-between',
            alignItems: 'center'
        }}>
            {/* Image container */}
            <View style={{
                position: 'relative',
                width: 80,
                height: 80
            }}>
                <Image 
                    style={{
                        height: '100%',
                        width: '100%',
                        borderRadius: 5
                    }}
                    source={{uri: ''}}
                />
                <Image 
                    style={{
                        height: '40%',
                        width: '40%',
                        borderRadius: 50,
                        position: 'absolute',
                        bottom: 5,
                        right: 5
                    }}
                    source={{uri: ''}}
                />
            </View>
            {/* Product details container */}
            <View>
                <Text numberOfLines={2} style={{
                    color: '#000',
                    padding: 12,
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'flex-start',
                    flexDirection: 'row',
                    fontSize: 12,
                
                }}>

                </Text>
                <Text style={{
                    color: '#FF4500',
                    padding: 12,
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'flex-start',
                    flexDirection: 'row',
                    fontSize: 14,
                }}>

                </Text>
            </View>
        </View>
        {/* Bottom for status and delivery timeline */}
        <View style={{
            display: 'flex',
            flexDirection: 'row',
            justifyContent: 'space-between',
            alignItems: 'center'
        }}>
            <Text style={{
                    backgroundColor: '#ff4e0',
                    color: '#FF4500',
                    borderRadius: 10,
                    padding: 8,
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'center'
                }}>

                </Text>
                <Text style={{
                    color: '#000',
                    padding: 8,
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'center'
                }}>

                </Text>
        </View>
      </View>
    </>
  )
}
