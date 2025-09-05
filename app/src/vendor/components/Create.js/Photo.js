import React, { useState } from 'react'
import { Dimensions, Image, ScrollView, StyleSheet, Text, TextInput, Touchable, TouchableOpacity, View } from 'react-native'
import { launchImageLibrary } from 'react-native-image-picker';
export default function Photo() {
    let screenWidth = Dimensions.get('window').width;

    const [photo, setPhoto] = useState([]);
    const [uploading, setUploading] = useState(false);

    const selectPhoto = () => {
      const options = {
        mediaType: 'photo',
        quality: 1,
        selectionLimit: 0, // 0 allows multiple selections
      };
      launchImageLibrary(options, (response) => {
        if (response.didCancel) {
          console.log('User cancelled image picker');
        } else if (response.error) {
          console.log('ImagePicker Error: ', response.error);
        } else if (response.assets && response.assets.length > 0) {
          response.assets.map(item => setPhoto(uris=>[...uris, item]))
          
        }
      });
    };
  return (
    <>
      <View style={[styles.photo, {width: '100%'}]}>
        <View style={{
            display: 'flex', 
            flexDirection: 'row',
            alignItems: 'center',
            justifyContent: 'space-between',
            width: '100%',
            marginBottom: 8
        }}>
            <Text style={{paddingLeft: 0, marginBottom: 8, color: '#000', fontSize: 14, fontWeight: '500'}}>Photo ({photo.length})</Text>
            <TouchableOpacity onPress={selectPhoto} style={{padding: 6, borderWidth: 1, borderRadius: 10, borderColor: '#FF4500'}}>
                <Text style={{color: '#FF4500'}}>+ New Photo</Text>
            </TouchableOpacity>
        </View>

        <View style={[styles.input,{width: '100%', marginBottom: 11}]}>
            
            <ScrollView style={{width: '100%', marginBottom: 0, maxHeight: 500, minHeight: 50}} contentContainerStyle={{display: 'flex', justifyContent: 'space-between', flexDirection: 'row', alignItems: 'flex-start', flexWrap: 'wrap'}}>
              { 
                photo.map((item,index) => 
                  <View key={index} style={{position: 'relative'}}>
                    <View style={{position: 'absolute', left: 2.5, top: 2.5, backgroundColor: '#000', zIndex: 1000, width: 25, height: 25, borderRadius: 5, display: 'flex', justifyContent: 'center', flexDirection: 'row', alignItems: 'center'}}>
                      <Text style={{color: '#fff'}}>{index + 1}</Text>
                    </View>
                    <TouchableOpacity onPress={e => setPhoto(photo.filter((item,i) => i !== index))} style={{position: 'absolute', right: 2.5, top: 2.5, backgroundColor: '#FF4500', zIndex: 1000, width: 25, height: 25, borderRadius: 5, display: 'flex', justifyContent: 'center', flexDirection: 'row', alignItems: 'center'}}>
                      <Text style={{color: '#fff'}}>x</Text> 
                    </TouchableOpacity>
                    <Image style={{marginBottom: 10, borderRadius: 5}} key={index} height={180*0.6} width={180*0.6} source={{uri: item.uri}} />
                  </View>
                )
              } 
            </ScrollView> 
        </View> 
        <Text style={{paddingLeft: 10, marginBottom: 0, color: 'red'}}>Error</Text>
      </View>
    </>
  )
}



const styles = StyleSheet.create({
    photo:{
        // maxHeight: 600,
        height: 'auto',
        // padding: 0,
        display: 'flex',
        alignItems: 'flex-start',
        flexDirection: 'column',
        justifyContent: 'space-between',
        padding: 10,
        // marginBottom: 0,
        backgroundColor: '#fff'
    },

    input:{
        minHeight: 180, 
        maxHeight: 'auto', 
        padding: 10,
        width: '100%',
        backgroundColor: '#f9f9f9',
        color: '#000',
        fontSize: 15,
        borderRadius: 5,
        position: 'relative', 
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center'
    },

    
  });
