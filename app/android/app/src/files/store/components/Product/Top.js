import js_ago from 'js-ago';
import React from 'react'
import { StyleSheet, Text, View } from 'react-native';
import LocationSvg from '../../../media/assets/location-svgrepo-com (1).svg'
export default function Top({data}) {
    return ( 
        <>
            
            <View style={styles.card}>
                <LocationSvg height={18} width={18} />
            
                <Text style={{fontSize: 15, textDecorationStyle: 'dashed', color: '#000'}} 
                    numberOfLines={2}
                    ellipsizeMode="tail">
                      {data.campus}, {data.uni_state},  {js_ago(new Date(data.date))}
                </Text> 
            </View>

            
            <View style={styles.card}>
                <Text style={{fontSize: 18, color: '#000', fontWeight: 'bold'}} 
                    numberOfLines={2}
                    ellipsizeMode="tail">
                    {data?.title}
                </Text>
            </View>

            <View style={styles.card}>
                <Text style={{fontSize: 16, color: 'green', fontWeight: 'bold'}}>&#8358;&nbsp;</Text>
            
                <Text style={{fontSize: 16, color: 'green', fontWeight: 'bold'}} 
                    numberOfLines={2}
                    ellipsizeMode="tail">
                    {new Intl.NumberFormat('en-us').format(data?.price)}
                </Text> 
            </View>


        </>
      )
    }
    
    
    const styles = StyleSheet.create({
        card:{
            height: 'auto',
            width: '100%',
            padding: 0,
            padding: 8,
            // marginBottom: 2.5,
            display: 'flex',
            flexDirection: 'row',
            alignItems: 'center',
            justifyContent: 'flex-start',
            backgroundColor: '#fff',
            // borderRadius: 7

        },
    
        cardTop:{
            height: 100,
            width: '100%',
            backgroundColor: '#efefef',
            borderRadius: 15,
            padding: 0,
            position: 'relative',
    
            marginBottom: 5
        },
    
        
      });
    