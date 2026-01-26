import React from 'react'
import { Dimensions, Text, TouchableOpacity, View } from 'react-native'

export default function NetworkCard({checkInternet}) {
    const screenWidth = Dimensions.get('screen').width
    
  return (
    <>
        <View style={{
            width: screenWidth * 0.95,
            backgroundColor: '#FFA500',
            position: 'absolute',
            bottom: 10,
            left: screenWidth * 0.025,
            zIndex: 1000,
            borderRadius: 12,
            padding: 20,
            shadowColor: '#000',
            shadowOffset: {
                width: 0,
                height: 2,
            },
            shadowOpacity: 0.25,
            shadowRadius: 3.84,
            elevation: 5,
        }}>
            <View style={{
                flexDirection: 'row',
                alignItems: 'center',
                marginBottom: 12,
            }}>
                <View style={{
                    width: 24,
                    height: 24,
                    borderRadius: 12,
                    backgroundColor: 'rgba(255, 255, 255, 0.2)',
                    justifyContent: 'center',
                    alignItems: 'center',
                    marginRight: 10,
                }}>
                <Text style={{ color: 'white', fontSize: 14, fontWeight: 'bold' }}>!</Text>
                </View>
                <Text style={{
                    color: 'white',
                    fontSize: 16,
                    fontWeight: '600',
                }}>
                    Connection Lost
                </Text>
            </View>

            <Text style={{
                color: 'white',
                fontSize: 14,
                fontWeight: '400',
                lineHeight: 20,
                marginBottom: 16,
                opacity: 0.9,
            }}>
                You are currently offline. Please reconnect to the internet to continue enjoying a smooth shopping experience. (This message will disappear automatically when your network connection is restored).
            </Text>

            <TouchableOpacity 
                style={{
                    backgroundColor: 'white',
                    paddingVertical: 12,
                    paddingHorizontal: 20,
                    borderRadius: 8,
                    alignItems: 'center',
                    shadowColor: '#000',
                    shadowOffset: {
                        width: 0,
                        height: 1,
                    },
                    shadowOpacity: 0.2,
                    shadowRadius: 1.41,
                    elevation: 2,
                }}
                activeOpacity={0.8}
                onPress={e => checkInternet()}
            >
                <Text style={{
                    color: '#FFA500',
                    fontSize: 15,
                    fontWeight: '600',
                }}>
                Reconnect Now
                </Text>
            </TouchableOpacity>
        </View>
    </>
  )
}
