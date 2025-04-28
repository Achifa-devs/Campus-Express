import React, {useEffect, useState} from 'react'
import { Alert, Dimensions, Image, StyleSheet, TouchableOpacity, View } from 'react-native'
import { ScrollView, Text, TextInput } from 'react-native-gesture-handler'
import ReviewSvg from '../../../media/assets/review-svgrepo-com.svg'
import StarRating from 'react-native-star-rating-widget';
export default function Reviews() {
    const [rating, setRating] = useState(0);
    const screenHeight = Dimensions.get('window').height;
    const screenWidth = Dimensions.get('window').width;
    let r = [
        // {
        //     review: 'Fast delivery',
        //     comment: 'Experienceed great vendor of all time',
        //     rating: 3.5,
        //     date: new Date().toLocaleString(),
        //     buyer: ''
        // },
        // {
        //     review: 'Broken item',
        //     comment: 'I had to reject my item and ask for refund',
        //     rating: .5,
        //     date: new Date().toLocaleString(),
        //     buyer: ''
        // },
        // {
        //     review: 'Good vend',
        //     comment: 'Was good shaa, at least i got what i wanted',
        //     rating: 2,
        //     date: new Date().toLocaleString(),
        //     buyer: ''
        // }
    ]
  return (
    <>
      <View style={styles.cnt}>
          <ScrollView >
            {
                r.length === 0
                ?
                <View style={{display: 'flex', backgroundColor: '#fff', alignItems: 'center', height: screenHeight, justifyContent: 'center', width: '100%', flexDirection: 'column', flex: 1}}>
                    <ReviewSvg width={90} height={90} />
                    <Text style={{textAlign: 'center', marginTop: 25, marginBottom: 10, fontWeight: '500', width: '100%',  padding: 0, fontSize: 16, color: '#000', opacity: .5}}>Your reviews from clients will be shown here.</Text>
                </View>
                :
                (
          
          
                <View style={{display: 'flex', backgroundColor: '#fff', alignItems: 'center', justifyContent: 'flex-start', marginTop: 5, width: '100%', flexDirection: 'column', padding: .5, flexWrap: 'wrap'}}>
                        {
                            r.map((item, index) =>
                            <View key={index} style={{display: 'flex', alignItems: 'flex-start', justifyContent: 'flex-start', marginTop: 15, height: 'auto', width: '100%', flexDirection: 'column', flexWrap: 'wrap', borderStyle: 'solid', borderBottomWidth: 1, borderBottomColor: '#E9ECEF'}}>
                                <StarRating
                                    rating={item.rating}
                                    onChange={setRating}
                                    starSize={30}
                                    color="#FF4500"
                                />
                                <View style={{paddingLeft: 10}}>
                                    <Text style={{ fontWeight: '400',  padding: 3, width: '100%', fontSize: 20, color: '#000', marginBottom: .5, textAlign: 'left' }}>{item.review}</Text>
        
                                    <Text style={{ fontWeight: '400',  padding: 3, width: '100%', fontSize: 14, color: '#000', marginBottom: .5, textAlign: 'left' }}>{item.comment}</Text>
        
                                    <Text style={{ fontWeight: '400',  padding: 3, width: '100%', fontSize: 14, color: '#000', marginBottom: .5, textAlign: 'left' }}>{item?.date}</Text>
                                </View>
                            </View>
                            )
                    }
                </View>
                )
            }
          </ScrollView>
      </View>
    </>
  )
}
const styles = StyleSheet.create({
    cnt: {
        width: '100%',
        // padding: 15,
        // position: 'absolute', 
        backgroundColor: '#fff',
        height: 'auto'
            

    },
    
  viewCnt: {
    height: '100%',
    // padding: 10,
    fontFamily: 'serif',
    borderRadius: 5,
    width: '100%',
    backgroundColor: '#E9ECEF',
    fontSize: 16,
  },
    editor: {
        height: 300,
        padding: 5,
        // 
        borderRadius: 5,
        // marginBottom: 2,
        overflow: 'scroll',
        width: '100%',
        backgroundColor: '#E9ECEF',
        fontSize: 16,
    },
    divider: {
        height: 50,
        width: '100%',
        zIndex: 1000,
        backgroundColor: '#fff',
        elevation: 2, 
        borderColor: '#f9f9f9', 
        borderStyle: 'solid',
        borderWidth: 1, 
        display: 'flex',
        alignItems: 'flex-end',
        justifyContent: 'flex-end'
    },

    inputCnt: {  
        width: '100%',
        marginTop: 10, 
        marginBottom: 10,
        backgroundColor: '#fff',
        height: 'auto',
            paddingLeft: 8,
        display: 'flex',
        justifyContent: 'space-between',
        alignItems: 'center',
        flexDirection: 'column',
        paddingRight: 8,
        

    },


    label: {
        fontFamily: 'Roboto',
        fontSize: 12, 
        marginLeft: 5,
        fontWeight: '800'
    }
});