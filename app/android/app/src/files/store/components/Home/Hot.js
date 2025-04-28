import { useNavigation } from '@react-navigation/native';
import React, { useEffect, useState } from 'react';
import { Image, Text, View, Alert, Dimensions, TouchableOpacity } from 'react-native';

export default function Hot() {
    let navigation = useNavigation();
    
    const [data, setData] = useState([]);
    const [imageDimensions, setImageDimensions] = useState({});
    const screenWidth = Dimensions.get('window').width * 0.5; // 50% width
    const [leftColumn, setLeftColumn] = useState([])
    const [rightColumn, setRightColumn] = useState([])
  useEffect(() => {
    fetch(`http://192.168.144.146:9090/products?limit=${25}&category=${btoa('trends')}`, {
      headers: {
        "Content-Type": "Application/json" 
      }
    })
    .then(async (result) => {
        let response = await result.json();
        setData(response.data);
        const left = []
        const right = []
        response.data.forEach((item, index) => {
            if (index % 2 === 0) {
                left.push(item)
            } else {
                right.push(item)
            }
        })

        setLeftColumn(left)
        setRightColumn(right)

        // Fetch image dimensions
        response.data.forEach(item => {
            Image.getSize(item.thumbnail_id, (width, height) => {
            const scaleFactor = width / screenWidth;
            const imageHeight = height / scaleFactor;

            setImageDimensions(prev => ({
                ...prev,
                [item.thumbnail_id]: { width: screenWidth, height: imageHeight }
            }));
            }, (error) => {
            console.error('Error getting image size:', error);
            });
        });
    })
    .catch((err) => {
      Alert.alert('Network error, please try again.');
      console.log(err);
    });
  }, []);

  return (
    <View style={{backgroundColor: '#f9f9f9'}}>
      <View style={{
        height: 50,
        width: '100%',
        paddingLeft: 10,
        flexDirection: 'row',
        alignItems: 'center',
        backgroundColor: '#FFF',
      }}>
        <Text style={{color: '#000', fontSize: 16, fontWeight: 'bold'}}>Trending</Text>
      </View>

      <View style={{
        flexDirection: 'row',
        flexWrap: 'wrap',
        justifyContent: 'space-between',
        backgroundColor: '#f9f9f9',
      }}>
        <View style={{ width: '50%' }}>
            {leftColumn.map((item, index) => {
              const dims = imageDimensions[item.thumbnail_id];
              return (
                <TouchableOpacity activeOpacity={.8} onPress={() => navigation.navigate('user-product', { product_id: item.product_id })}
                  key={index}
                  style={{
                    width: '100%',
                    padding: 5,
                    backgroundColor: '#FFF',
                  }}
                >
                  <View style={{
                    width: '100%',
                    backgroundColor: '#FFF',
                    borderRadius: 5,
                    overflow: 'hidden', // nicely clip borders
                    shadowColor: "#000",
                    shadowOffset: { width: 0, height: 2 },
                    shadowOpacity: 0.1,
                    shadowRadius: 5,
                    elevation: 3,
                  }}>
                    {dims ? (
                      <Image
                        source={{ uri: item.thumbnail_id }}
                        style={{
                          width: dims.width,
                          height: dims.height,
                        }}
                        resizeMode="cover"
                      />
                    ) : (
                      <View style={{
                        width: screenWidth,
                        height: 100,
                        backgroundColor: '#ccc',
                      }} />
                    )}
                    <View style={{ padding: 8 }}>
                      <Text style={{ fontWeight: 'bold', fontSize: 16, color: '#4CAF50' }}>₦{new Intl.NumberFormat('en-us').format(item?.price)}</Text>
                      <Text style={{ fontSize: 14, marginBottom: 8, color: '#000', marginVertical: 2 }}>{item.title}</Text>
                      <Text style={{ fontSize: 10, fontWeight: '500', color: '#000' }}>
                        {item.campus} {item?.others?.condition ? `- ${item.others.condition}` : ''}
                      </Text>
                    </View>
                  </View>
                </TouchableOpacity>
              );
            })}
        </View>
        <View style={{ width: '50%' }}>
            {rightColumn.map((item, index) => {
              const dims = imageDimensions[item.thumbnail_id];
              return (
                <TouchableOpacity activeOpacity={.8}
                  key={index}
                  style={{
                    width: '100%',
                    padding: 5,
                    backgroundColor: '#FFF',
                  }} onPress={() => navigation.navigate('user-product', { product_id: item.product_id })}
                >
                  <View style={{
                    width: '100%',
                    backgroundColor: '#FFF',
                    borderRadius: 5,
                    overflow: 'hidden', // nicely clip borders
                    shadowColor: "#000",
                    shadowOffset: { width: 0, height: 2 },
                    shadowOpacity: 0.1,
                    shadowRadius: 5,
                    elevation: 3,
                  }}>
                    {dims ? (
                      <Image
                        source={{ uri: item.thumbnail_id }}
                        style={{
                          width: dims.width,
                          height: dims.height,
                        }}
                        resizeMode="cover"
                      />
                    ) : (
                      <View style={{
                        width: screenWidth,
                        height: 100,
                        backgroundColor: '#ccc',
                      }} />
                    )}
                    <View style={{ padding: 8 }}>
                      <Text style={{ fontWeight: 'bold', fontSize: 16, color: '#4CAF50' }}>₦{new Intl.NumberFormat('en-us').format(item?.price)}</Text>
                      <Text style={{ fontSize: 14, marginBottom: 8, color: '#000', marginVertical: 2 }}>{item.title}</Text>
                      <Text style={{ fontSize: 10, fontWeight: '500', color: '#000' }}>
                        {item.campus} {item?.others?.condition ? `- ${item.others.condition}` : ''}
                      </Text>
                    </View>
                  </View>
                </TouchableOpacity>
              );
            })}
        </View>
      </View>
    </View>
  );
}
