import {
    useNavigation,
    useRoute
} from '@react-navigation/native';
import React, {
    useEffect,
    useState
} from 'react';
import {
    Alert,
    Dimensions,
    StyleSheet,
    Text,
    TouchableOpacity,
    View,
    FlatList,
    TouchableWithoutFeedback
} from 'react-native';

import Top from '../components/Product/Top';
import Mid from '../components/Product/Mid';
import Btm from '../components/Product/Btm';
import Thumbnail from '../utils/Thumbnail';
import CallSvg from '../../media/assets/call-svgrepo-com.svg';
import WpSvg from '../../media/assets/whatsapp-svgrepo-com.svg';
import ReportSvg from '../../media/assets/report-svgrepo-com.svg';

import { getData, storeData } from '../../utils/AsyncStore.js';
import { useDispatch } from 'react-redux';
import { setToggleMessage } from '../../../../../../redux/toggleMssg.js';

export default function Product() {
    const dispatch = useDispatch();
    const [imageIndex, setImageIndex] = useState(0);
    const screenWidth = Dimensions.get('window').width;
    const screenHeight = Dimensions.get('window').height;
    const [data, setData] = useState('');
    const navigation = useNavigation();
    const { product_id } = useRoute()?.params;

    const handleImageTouch = (e) => {
        const { locationX } = e.nativeEvent;
        const isLeft = locationX < screenWidth / 2;

        let samples = data?.sample_images?.length ? data.sample_images : [data?.thumbnail_id];
        if (!samples || samples.length === 0) return;

        let newIndex = imageIndex + (isLeft ? -1 : 1);
        if (newIndex < 0) newIndex = samples.length - 1;
        if (newIndex >= samples.length) newIndex = 0;

        setImageIndex(newIndex);
    };

    useEffect(() => {
        fetch(`http://192.168.75.146:9090/product?product_id=${product_id}`, {
            headers: { "Content-Type": "Application/json" }
        })
        .then(async (result) => {
            const response = await result.json();
            setData(response.data[0]);
        })
        .catch((err) => {
            Alert.alert('Network error, please try again.');
            console.log(err);
        });
    }, []);

    async function saveHistory() {
        try {
            const prevData = await getData('history');
            let newData = [];

            if (prevData) {
                const parsedData = JSON.parse(prevData);
                if (Array.isArray(parsedData)) {
                    newData = parsedData;
                }
            }

            newData.push(data);
            const refinedArray = [...new Set(newData)];
            await storeData('history', JSON.stringify(refinedArray));
        } catch (err) {
            console.log('Error saving data:', err);
        }
    }

    useEffect(() => {
        if (data) {
            setTimeout(() => {
                saveHistory();
            }, 5000);
        }
    }, [data]);

    const renderContent = () => (
        <View style={{ backgroundColor: '#FFF', width: '100%' }}>
            <TouchableWithoutFeedback onPress={handleImageTouch}>
                <View style={{ width: '100%', height: 300, backgroundColor: '#fff' }}>
                    <Thumbnail thumbnail_id={
                        data?.sample_images?.length
                            ? data.sample_images[imageIndex]
                            : data?.thumbnail_id
                    } br={0} />
                </View>
            </TouchableWithoutFeedback>

            <View style={{ backgroundColor: '#FFF', marginBottom: 0, borderRadius: 7, paddingBottom: 6 }}>
                <Top data={data} />

                {/* WhatsApp and Call */}
                <View style={styles.rowButtonContainer}>
                    <TouchableOpacity style={styles.wpButton}>
                        <WpSvg height={25} width={25} />
                        <Text style={styles.wpText}>WhatsApp</Text>
                    </TouchableOpacity>
                    <TouchableOpacity style={styles.callButton}>
                        <CallSvg height={21} width={21} />
                        <Text style={styles.callText}>Call</Text>
                    </TouchableOpacity>
                </View>

                <View style={styles.midContainer}>
                    <Mid description={data?.description} />
                </View>

                {/* Mark unavailable & Report abuse */}
                <View style={styles.rowButtonContainer}>
                    <TouchableOpacity style={styles.markButton}>
                        <Text style={styles.markText}>Mark unavailable</Text>
                    </TouchableOpacity>
                    <TouchableOpacity style={styles.reportButton}>
                        <ReportSvg height={21} width={21} />
                        <Text style={styles.reportText}>Report abuse</Text>
                    </TouchableOpacity>
                </View>

                {/* Post similar ad */}
                <View style={styles.rowButtonContainer}>
                    <TouchableOpacity style={styles.postAdButton}>
                        <Text style={styles.postAdText}>Post ads like this.</Text>
                    </TouchableOpacity>
                </View>

                <View style={styles.bottomContainer}>
                    <Btm user_id={data?.user_id} />
                </View>
            </View>
        </View>
    );

    return (
        <>
            <FlatList
                data={[1]} // dummy item
                keyExtractor={(item, index) => index.toString()}
                renderItem={null}
                ListHeaderComponent={renderContent}
                contentContainerStyle={{ paddingBottom: 60 }}
            />

            <View style={styles.btm}>
                <TouchableOpacity
                    onPress={() => navigation.navigate('user-new-order', { data })}
                    style={[styles.btn, { width: '78%', backgroundColor: '#FF4500' }]}>
                    <Text style={{ fontSize: 15, color: '#fff' }}>Order now with FREE DELIVERY</Text>
                </TouchableOpacity>

                <TouchableOpacity
                    style={[styles.btn, { width: '18%', backgroundColor: 'rgb(0, 0, 0)' }]}
                    onPress={() => dispatch(setToggleMessage('Product saved!'))}>
                    <Text style={{ fontSize: 10, color: '#fff' }}>Save</Text>
                </TouchableOpacity>
            </View>
        </>
    );
}

const styles = StyleSheet.create({
    btm: {
        height: 65,
        width: '100%',
        position: 'absolute',
        bottom: 0,
        padding: 10,
        backgroundColor: '#fff',
        flexDirection: 'row-reverse',
        justifyContent: 'space-between',
        alignItems: 'center',
        shadowColor: '#000',
        shadowOffset: { width: 0, height: 2 },
        shadowOpacity: 0.1,
        shadowRadius: 5,
        elevation: 3,
    },
    btn: {
        height: 45,
        borderRadius: 5,
        justifyContent: 'center',
        alignItems: 'center',
    },
    rowButtonContainer: {
        flexDirection: 'row',
        padding: 12,
        justifyContent: 'space-between',
        backgroundColor: '#FFF',
    },
    wpButton: {
        width: '48%',
        height: 45,
        borderWidth: 2,
        borderColor: 'green',
        borderRadius: 5,
        flexDirection: 'row',
        alignItems: 'center',
        justifyContent: 'center',
    },
    wpText: {
        fontSize: 15,
        color: 'green',
        marginLeft: 8,
        fontWeight: 'bold',
    },
    callButton: {
        width: '48%',
        height: 45,
        backgroundColor: '#FF4500',
        borderRadius: 5,
        flexDirection: 'row',
        alignItems: 'center',
        justifyContent: 'center',
    },
    callText: {
        fontSize: 15,
        color: '#fff',
        marginLeft: 8,
        fontWeight: 'bold',
    },
    midContainer: {
        padding: 8,
        backgroundColor: '#FFF',
        alignItems: 'center',
    },
    markButton: {
        width: '48%',
        height: 45,
        borderWidth: 2,
        borderColor: 'blue',
        borderRadius: 5,
        justifyContent: 'center',
        alignItems: 'center',
    },
    markText: {
        fontSize: 15,
        color: 'blue',
        fontWeight: 'bold',
    },
    reportButton: {
        width: '48%',
        height: 45,
        borderWidth: 2,
        borderColor: 'red',
        borderRadius: 5,
        flexDirection: 'row',
        alignItems: 'center',
        justifyContent: 'center',
    },
    reportText: {
        fontSize: 15,
        color: 'red',
        marginLeft: 8,
        fontWeight: 'bold',
    },
    postAdButton: {
        width: '100%',
        height: 45,
        borderWidth: 2,
        borderColor: 'green',
        borderRadius: 5,
        justifyContent: 'center',
        alignItems: 'center',
    },
    postAdText: {
        fontSize: 15,
        color: 'green',
        fontWeight: 'bold',
    },
    bottomContainer: {
        marginBottom: 25,
        padding: 12,
        backgroundColor: '#FFF',
        alignItems: 'center',
    }
});
