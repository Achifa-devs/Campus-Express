import { Image, ScrollView, StyleSheet, Text, TextInput, TouchableOpacity, View } from 'react-native';
import CloseSVG from '../assets/close-square-svgrepo-com.svg'
import { SelectList } from 'react-native-dropdown-select-list'
import bank from '../bank.json'

const Modal = ({closeModal,setBank}) => {
    
    return ( 

       
          
        <View id='overlay' style={styles.overlay}>
            <View style={styles.modal}>

            <View style={{height: 40, width: '100%', paddingLeft: 10, paddingRight: 10, paddingTop: 10}}>
                <TouchableOpacity onPress={closeModal} style={{width: 50, height: 50}}>
                <CloseSVG height={25} width={25} />
                </TouchableOpacity>
            </View>

            <View style={{height: 80, padding: 10, width: '100%', display: 'flex', alignItems: 'center', justifyContent: 'center'}}>
                <TextInput style={{height: 50, padding: 10, borderRadius: 5, width: '100%', backgroundColor: '#efefef'}} keyboardType='numeric' placeholder='Account Number' />
                
            </View>

            <ScrollView>

               
                {bank.map((item,index) => <TouchableOpacity key={index} onPress={e => {setBank(item); closeModal();}} style={styles.paymentOptions}>
                    <Image source={{uri:item.logo}} style={{width: 30, height: 30}} />
                    <Text>&nbsp;</Text>
                    <Text>{item.name}</Text>
                </TouchableOpacity>)}

            </ScrollView>

            <TouchableOpacity style={{height: 50, width: '100%', display: 'flex', alignItems: 'center', justifyContent: 'center'}}>
                {/* <Text>Pay Now</Text> */}
            </TouchableOpacity>

            </View>
        </View>
    
     );
}
 
export default Modal;

const styles = StyleSheet.create({
    overlay: {
        height: '100%',
        width: '100%',
        position: 'absolute',
        top: 0,
        left: 0,
        backgroundColor: 'transprent',
        zIndex: 1000,
        display: 'flex',
        alignItems: 'flex-end',
        justifyContent: 'flex-end'
      },
    
      modal: {
        height: '80%',
        width: '100%',
        padding: 8,
        backgroundColor: '#fff'
      },

      paymentOptions: {
        backgroundColor: '#fff',
        height: 70,
        padding: 10,
        display: 'flex',
        justifyContent: 'flex-start',
        alignItems: 'center',
        flexDirection: 'row',
        borderRadius: 2.5,
        marginVertical: 5,
        marginHorizontal: 10,
        borderColor: '#000',
        borderWidth: 1,
      }
})