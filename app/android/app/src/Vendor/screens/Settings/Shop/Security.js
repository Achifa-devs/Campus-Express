import React, { useState } from 'react'
import { ScrollView, StyleSheet, TextInput, View, Text, TouchableOpacity } from 'react-native'
import PrivacySvg from '../../../../media/assets/privacy-1-svgrepo-com.svg'
import DeleteSvg from '../../../../media/assets/delete-svgrepo-com (3).svg'
import AngleSvg from '../../../../media/assets/angle-right-svgrepo-com.svg'
import RatingSvg from '../../../../media/assets/star-rating-svgrepo-com (1).svg'
import CloseSVG from '../../../../media/assets/close-square-svgrepo-com.svg'
export default function Security() {
  return (
        <>
            

           
            <View style={styles.cnt} >
                <Text style={{fontSize: 30, color: '#000', fontWeight: '600', height: 60, backgroundColor: '#fff'}}>Shop security & privacy</Text>
    
                <ScrollView >
                    {/* <Text style={[styles.label, {borderBottomColor: '#000', borderBottomWidth: .5, paddingBottom: 10, marginBottom: 10, marginTop: 25}]}>General</Text> */}

                    <TouchableOpacity onPress={e => navigation.navigate('user-settings-1')} style={{display: 'flex', alignItems: 'center', justifyContent: 'space-between', padding: 10, marginBottom: 0, flexDirection: 'row', borderTopLeftRadius: 10, borderTopRightRadius: 10, height: 75, width: '100%', backgroundColor: '#fff'}}>
                        <View style={{display: 'flex', alignItems: 'center', justifyContent: 'space-between', flexDirection: 'row'}}>
                            <View style={{display: 'flex', alignItems: 'center', justifyContent: 'flex-start', flexDirection: 'row', backgroundColor: '#efefef', marginRight: 15, borderRadius: 50, padding: 10}}>
                                <PrivacySvg width={25} height={25} />
                            </View>
                            <View style={{width: '100%'}}>
                                <Text style={{fontFamily: 'Roboto', fontWeight: 500, fontSize: 15, color: '#000'}}>Shop Privacy Policy</Text>
                                <Text style={{fontFamily: 'Roboto', fontWeight: 500, fontSize: 12, color: '#464646', width: '70%'}}>Upload or customize a privacy policy.</Text>
                            </View>
                            
                        </View>
                        <View style={{display: 'flex', alignItems: 'center', justifyContent: 'flex-start', flexDirection: 'row', backgroundColor: '#fff', borderRadius: 50, padding: 5}}>
                            <AngleSvg width={35} height={35} />
                        </View>
                       
                    </TouchableOpacity>

                    <TouchableOpacity onPress={e => navigation.navigate('user-settings-1')} style={{display: 'flex', alignItems: 'center', justifyContent: 'space-between', padding: 10, marginBottom: 0, flexDirection: 'row', borderTopLeftRadius: 10, borderTopRightRadius: 10, height: 75, width: '100%', backgroundColor: '#fff'}}>
                        <View style={{display: 'flex', alignItems: 'center', justifyContent: 'space-between', flexDirection: 'row'}}>
                            <View style={{display: 'flex', alignItems: 'center', justifyContent: 'flex-start', flexDirection: 'row', backgroundColor: '#efefef', marginRight: 15, borderRadius: 50, padding: 10}}>
                                <DeleteSvg width={25} height={25} />
                            </View>
                            <View style={{width: '100%'}}>
                                <Text style={{fontFamily: 'Roboto', fontWeight: 500, fontSize: 15, color: '#000'}}>Deactivate your shop</Text>
                                <Text style={{fontFamily: 'Roboto', fontWeight: 500, fontSize: 12, color: '#464646', width: '70%'}}>Option to temporarily or permanently close the shop.</Text>
                            </View>
                            
                        </View>
                        <View style={{display: 'flex', alignItems: 'center', justifyContent: 'flex-start', flexDirection: 'row', backgroundColor: '#fff', borderRadius: 50, padding: 5}}>
                            <AngleSvg width={35} height={35} />
                        </View>
                       
                    </TouchableOpacity>
                    
                </ScrollView>
    
            </View>
        </>
      )
    }
    
    
    const styles = StyleSheet.create({
        cnt: {
            width: '100%',
            padding: 10,
            // position: 'absolute', 
            backgroundColor: '#fff',
            height: '100%'
                
    
        },
        overlay: {
            height: 'auto',
            width: '100%',
            position: 'absolute',
            backgroundColor: 'transprent',
            zIndex: 1000,
            backgroundColor: '#fdfdfd',
            bottom: 0,
            display: 'flex',
            alignItems: 'flex-end',
            justifyContent: 'flex-end'
        },

        modal: {
            height: 60,
            width: '100%',
            padding: 8,
            backgroundColor: '#fff'
        },
          dateInputCnt: {
            width: '100%',
            marginTop: 10, 
            marginBottom: 10,
            backgroundColor: '#fff',
            height: 'auto',
            display: 'flex',
            justifyContent: 'space-between',
            alignItems: 'center',
            flexDirection: 'row',
            flex: 1
          },
          dateInput: {
            width: '30%',
            marginTop: 10, 
            marginBottom: 10,
            backgroundColor: '#fff',
            height: 'auto'
                
    
          },
    
          inputCnt: {
            width: '100%',
            marginTop: 10, 
            marginBottom: 10,
            backgroundColor: '#fff',
            height: 'auto',
            paddingLeft: 8,
            paddingRight: 8,
            
    
          },
          input: {
            width: '100%',
            padding: 15,
            // position: 'absolute', 
            backgroundColor: '#fff',
            height: 50,
            borderColor: '#000',
            borderWidth: .7,
            borderRadius: 7
    
          },
    
          label: {
            fontFamily: 'Roboto',
            fontSize: 12,
            marginLeft: 5,
            fontWeight: '800'
          }
      });