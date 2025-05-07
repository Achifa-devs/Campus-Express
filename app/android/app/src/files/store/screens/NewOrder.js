import React, { useState } from 'react';
import { Dimensions, ScrollView, StyleSheet, Text, TouchableOpacity, View } from 'react-native';
import { useRoute, useNavigation } from '@react-navigation/native';
import Icon from 'react-native-vector-icons/Ionicons';
import OrderCard from '../components/NewOrder/OrderCard';
import Want from '../components/NewOrder/Want';

export default function NewOrder() {
    const navigation = useNavigation();
    const { data } = useRoute()?.params;
    const [units, setUnits] = useState(1);
    const screenHeight = Dimensions.get('window').height;
    const totalPrice = 0.95 * parseInt(data?.price) * units;

    const updateUnits = (newUnits) => {
        setUnits(newUnits);
    };

    const assuranceItems = [
        {
            icon: 'lock-closed-outline',
            title: 'Secured Payments',
            description: 'Payments are secured with Escrow Services',
            color: '#4CAF50'
        },
        {
            icon: 'shield-checkmark-outline',
            title: 'Security And Privacy',
            description: 'We respect your privacy so your personal details are safe',
            color: '#2196F3'
        },
        {
            icon: 'card-outline',
            title: 'Buyer Protection',
            description: "Get your money back if your order isn't delivered by estimated date or if you're not satisfied",
            color: '#FF9800'
        }
    ];

    return (
        <View style={styles.container}>
            <ScrollView 
                style={styles.scrollContainer}
                contentContainerStyle={styles.scrollContent}
                showsVerticalScrollIndicator={false}
            >
                <OrderCard data={data} />
                <Want data={data} updateUnits={updateUnits} units={units} />
                
                {/* Assurance Section */}
                <View style={styles.assuranceContainer}>
                    <Text style={styles.assuranceTitle}>Campus Sphere Assurance</Text>
                    
                    {assuranceItems.map((item, index) => (
                        <View key={index} style={styles.assuranceItem}>
                            <View style={[styles.assuranceIconContainer, { backgroundColor: `${item.color}20` }]}>
                                <Icon name={item.icon} size={20} color={item.color} />
                            </View>
                            <View style={styles.assuranceTextContainer}>
                                <Text style={styles.assuranceItemTitle}>{item.title}</Text>
                                <Text style={styles.assuranceItemDescription}>{item.description}</Text>
                            </View>
                        </View>
                    ))}
                </View>
            </ScrollView>

            {/* Fixed Bottom Button */}
            <View style={styles.bottomBar}>
                <TouchableOpacity 
                    onPress={() => navigation.navigate('user-new-order', { product_id: data?.product_id })}
                    style={styles.orderButton}
                    activeOpacity={0.8}
                >
                    <Text style={styles.orderButtonText}>
                        Create Order Now - ₦{new Intl.NumberFormat('en-US').format(totalPrice)}
                    </Text>
                    <Icon name="arrow-forward" size={20} color="#fff" />
                </TouchableOpacity>
            </View>
        </View>
    );
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: '#f5f5f5',
    },
    scrollContainer: {
        width: '100%',
    },
    scrollContent: {
        padding: 16,
        paddingBottom: 100, // Space for bottom button
    },
    assuranceContainer: {
        backgroundColor: '#fff',
        borderRadius: 12,
        padding: 16,
        marginTop: 16,
        shadowColor: '#000',
        shadowOffset: { width: 0, height: 2 },
        shadowOpacity: 0.1,
        shadowRadius: 4,
        elevation: 2,
    },
    assuranceTitle: {
        fontSize: 18,
        fontWeight: 'bold',
        color: '#333',
        marginBottom: 16,
    },
    assuranceItem: {
        flexDirection: 'row',
        alignItems: 'flex-start',
        marginBottom: 16,
    },
    assuranceIconContainer: {
        width: 40,
        height: 40,
        borderRadius: 20,
        justifyContent: 'center',
        alignItems: 'center',
        marginRight: 12,
    },
    assuranceTextContainer: {
        flex: 1,
    },
    assuranceItemTitle: {
        fontSize: 15,
        fontWeight: '600',
        color: '#333',
        marginBottom: 4,
    },
    assuranceItemDescription: {
        fontSize: 13,
        color: '#666',
        lineHeight: 18,
    },
    bottomBar: {
        position: 'absolute',
        bottom: 0,
        left: 0,
        right: 0,
        height: 80,
        backgroundColor: '#fff',
        paddingHorizontal: 16,
        paddingTop: 12,
        borderTopWidth: 1,
        borderTopColor: '#eee',
        shadowColor: '#000',
        shadowOffset: { width: 0, height: -2 },
        shadowOpacity: 0.1,
        shadowRadius: 4,
        elevation: 5,
    },
    orderButton: {
        backgroundColor: '#FF4500',
        height: 50,
        borderRadius: 8,
        flexDirection: 'row',
        justifyContent: 'center',
        alignItems: 'center',
    },
    orderButtonText: {
        color: '#fff',
        fontSize: 16,
        fontWeight: '600',
        marginRight: 8,
    },
});