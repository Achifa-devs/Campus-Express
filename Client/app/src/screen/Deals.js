import React, { useCallback, useEffect, useState } from 'react'
import { ActivityIndicator, Alert, FlatList, RefreshControl, StyleSheet, Text, TouchableOpacity, View } from 'react-native'
import Status from '../components/Deals/Status'
import Card from '../components/Deals/Card';
import { useNavigation } from '@react-navigation/native';
import { SafeAreaView } from 'react-native-safe-area-context';
import axios from 'axios';
import { useSelector } from 'react-redux';

export default function Deals() {

    const [activeStatus, setActiveStatus] = useState('Active');
    const [List, setList] = useState([]);
    const [deals, setDeals] = useState({
        active: [],
        completed: [],
        cancelled: []
    });

    useEffect(() => {
        if(activeStatus === 'Active'){
            setList(deals.active)
        }else if(activeStatus === 'Completed'){
            setList(deals.completed)
        }else{
            setList(deals.cancelled)
        }
    }, [activeStatus, deals]);

    const [refreshing, setRefreshing] = useState(false);
    const [loading, setLoading] = useState(true);
    
    const {
        user
    } = useSelector(s => s.user);

    const navigation = useNavigation()

    const renderDealsCard = useCallback(({item}) => (
        <TouchableOpacity activeOpacity={.9} onPress={e => navigation.navigate(user.user_id === item.vendor_id ? 'deal_vendor' : 'deal_buyer', {
            deal: item
        })}>
            <Card item={item} />
        </TouchableOpacity>
    ), [deals, activeStatus])


    const handleRefresh = async() => {
        setRefreshing(true);
        await initializeSocket();
        fetchChatList();

    };

    function getDeals () {
        axios.get('http://10.253.129.3:5432/deals', {params: {user_id: user?.user_id}}).then(({data}) => {
            const res = data.data;
            setDeals((prev) => {
                const newActive = res.filter(item => item.iscompleted === 'pending');
                const newCompleted = res.filter(item => item.iscompleted === 'completed');
                const newCancelled = res.filter(item => item.iscompleted === 'cancelled');
                return {
                    ...prev,
                    active: newActive,
                    completed: newCompleted,
                    cancelled: newCancelled
                };
            });
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