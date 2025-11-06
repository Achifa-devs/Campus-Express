import React, { useCallback, useEffect, useState } from 'react'
import { ActivityIndicator, Alert, FlatList, RefreshControl, StyleSheet, Text, TouchableOpacity, View } from 'react-native'
import Status from '../components/Deals/Status'
import Card from '../components/Deals/Card';
import { useNavigation } from '@react-navigation/native';
import { SafeAreaView } from 'react-native-safe-area-context';
import axios from 'axios';
import { useDispatch, useSelector } from 'react-redux';
import { set_deals } from '../../redux/info/deals';

export default function Deals() {

    const [activeStatus, setActiveStatus] = useState('Purchase(s)');
    const [List, setList] = useState([]);
    const [dealList, setDealList] = useState({
        purchases: [],
        sales: []
    });

    useEffect(() => {
        if(activeStatus === 'Purchase(s)'){
            setList(dealList.purchases)
        }else if(activeStatus === 'Sale(s)'){
            setList(dealList.sales)
        }
    }, [activeStatus, dealList]);

    const [refreshing, setRefreshing] = useState(false);
    const [loading, setLoading] = useState(true);
    
    const {
        user
    } = useSelector(s => s.user);

    const navigation = useNavigation()

    const renderDealsCard = useCallback(({item}) => (
        <TouchableOpacity activeOpacity={.9} onPress={e => navigation.navigate(user.user_id === item.order.vendor_id ? 'deal_vendor' : 'deal_buyer', {
            deal: item
        })}>
            <Card item={item} />
        </TouchableOpacity>
    ), [deals, activeStatus])


    const handleRefresh = async() => {
        setRefreshing(true);
        getDeals();
    };
 
    const dispatch = useDispatch()
    function getDeals () {
        axios.get('http://192.168.0.3:5432/refunds', {params: {user_id: user?.user_id}}).then(({data}) => {
            const res = data.data;
            dispatch(set_deals(res))
            setRefreshing(false);
            setLoading(false)
        }).catch(err => {
            Alert.alert("Internal server error!")
            console.log(err);
            setRefreshing(false);
            setLoading(false)
        })
    }

    const renderEmptyState = () => (
        <TouchableOpacity style={styles.emptyState} onPress={e => navigation.navigate('Home')}>
          <>
            <Text style={styles.emptyStateText}>
              {`No ${activeStatus} deals found`}
            </Text>
          </>
          <Text style={styles.emptyStateSubtext}>
            {'Continue shopping'}
          </Text>
        </TouchableOpacity>
    );

    useEffect(() => {
        if(!user) return;
        getDeals();
    }, [user])

    const {
        deals
    } = useSelector(s => s.deals)
    
    useEffect(() => {
        if(!deals && !Array.isArray(deals))return;
        // console.log("deals: ", deals);
        setDealList((prev) => {
            // const newActive = deals.filter(item => item.order.stage.toLowerCase() !== 'completed' && item.order.stage.toLowerCase() !== 'cancelled');
            // const newCompleted = deals.filter(item => item.order.stage.toLowerCase() === 'completed');
            // const newCancelled = deals.filter(item => item.order.stage.toLowerCase() === 'cancelled');

            const purchases = deals.filter(item => item.order.user_id === user.user_id && item.order.vendor_id !== user.user_id);
            const sales = deals.filter(item => item.order.vendor_id === user.user_id && item.order.user_id !== user.user_id);

            return {
                ...prev,
                purchases: purchases,
                sales: sales,
            };
        });
    }, [deals])
    
    const handleDataFromChild = (data) => {
        setActiveStatus(data)
        console.log("Received from child:", data);
    };
  return (
    <>
        <SafeAreaView style={styles.container}>
            <Status sendData={handleDataFromChild}  />
            <View style={{flex: 1}}>
                {
                    loading ? (
                        <View style={styles.loadingContainer}>
                            <ActivityIndicator size="large" color="#FF4500" />
                            <Text style={styles.loadingText}>Loading deals...</Text>
                        </View>
                    ) : 
                    <FlatList
                        data={List} // Ensure partner exists
                        renderItem={renderDealsCard}
                        keyExtractor={item => item.id}
                        contentContainerStyle={styles.listContent}
                        ListEmptyComponent={renderEmptyState}
                        refreshControl={
                            <RefreshControl
                                refreshing={refreshing}
                                onRefresh={handleRefresh}
                                colors={['#FF4500']}
                                tintColor="#FF4500"
                            />
                        }
                        showsVerticalScrollIndicator={false}
                    />
                }
            </View>
        </SafeAreaView>
    </>
  )
}


const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: '#ffffff',
    },
    listContent: {
        padding: 4,
        flexGrow: 1,
    },
      loadingContainer: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
    },
    loadingText: {
        marginTop: 12,
        color: '#666',
        fontSize: 16,
    },
      emptyState: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
        padding: 40,
    },
    emptyStateText: {
        fontSize: 18,
        fontWeight: '600',
        color: '#333',
        textAlign: 'center',
        marginBottom: 8,
    },
    emptyStateSubtext: {
        fontSize: 14,
        color: '#666',
        textAlign: 'center',
        lineHeight: 20,
    },
})