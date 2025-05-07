import { useNavigation } from "@react-navigation/native";
import { StyleSheet } from "react-native";

export function filterProducts(products, filters) {
  return products.filter(product => {
    const {
      category,
      state,
      campus,
      condition,
      cType,
    } = filters;

    const matchesCategory = category ? product.category === category : true;
    const matchesState = state ? product.uni_state === state : true;
    const matchesCampus = campus ? product.campus === campus : true;
    const matchesCondition = condition ? product.others?.condition === condition : true;
    const matchesCType = cType ? product.others?.cType === cType : true;

    return (
      matchesCategory &&
      matchesState &&
      matchesCampus &&
      matchesCondition &&
      matchesCType
    );
  });
}



























export default function TypeProducts() {
    let navigation = useNavigation();
    
    let { type } = useRoute()?.params;
    let { category } = useRoute()?.params;
    const [data, setData] = useState([]);
    const [imageDimensions, setImageDimensions] = useState({});
    const screenWidth = Dimensions.get('window').width * 0.5; // 50% width
    const [leftColumn, setLeftColumn] = useState([])
    const [rightColumn, setRightColumn] = useState([])
  useEffect(() => {
    // Alert.alert(type,category)
    fetch(`http://192.168.209.146:9090/products-type?category=${category}&type=${type}`, {
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
    
    const [filter, setFilter] = useState('Location')
    const [modalVisible, setModalVisible] = useState(false)
    
    function toggleModal(filter) {
        setModalVisible(!modalVisible);
        setFilter(filter)
    }

    const [filterWord, setFilterWord] = useState({})


    function updateFilterWord(data) {
        setFilterWord(data)
    }

    useEffect(() => {
        const filtered = filterProducts([...leftColumn, ...rightColumn], filterWord);
        console.log("filtered: ", filtered)
    }, [filterWord])
    

  return (
    <>
        {
            <BottomNav updateFilterWord={updateFilterWord} toggleModal={toggleModal} modalVisible={modalVisible} filter={filter} />
        }
        <ScrollView style={{backgroundColor: '#FFF'}}>
        <View style={{
            height: 50,
            width: '100%',
            paddingLeft: 10,
            paddingRight: 10,
            justifyContent: 'space-between', 
            flexDirection: 'row',
            alignItems: 'center',
            backgroundColor: '#FFF',
        }}>
            <Text style={{color: '#000', fontSize: 16, fontWeight: 'bold'}}>{category} - {type}</Text>
            <TouchableOpacity onPress={e => toggleModal('Sort')} activeOpacity={.6} style={{
                height: 35,
                width: 'auto',
                paddingLeft: 5,
                borderRadius: 5,
                paddingRight: 5,
                justifyContent: 'space-between',
                flexDirection: 'row',
                alignItems: 'center',
                backgroundColor: '#f3f3f3',
            }}>
                <SortSvg height={20} width={20} />
                
                <Text style={{color: '#000', fontSize: 15, fontWeight: '500'}}> Sort</Text>
            </TouchableOpacity>
        </View>
        
            <View style={styles.filterCnt}>  
                <TouchableOpacity style={styles.btn} onPress={e => toggleModal('Location')}>
                    <Text style={{ fontSize: 14, color: '#000' }}>Location</Text>
                </TouchableOpacity>
                <TouchableOpacity style={styles.btn} onPress={e => toggleModal('Condition')}>
                    <Text style={{ fontSize: 14, color: '#000' }}>Condition</Text>
                </TouchableOpacity>   
                <TouchableOpacity style={styles.btn} onPress={e => toggleModal('Price')}>
                    <Text style={{ fontSize: 14, color: '#000' }}> ₦ Price</Text>
                </TouchableOpacity>   
                {/* <TouchableOpacity style={styles.btn}>
                    <Text>Verified vendors</Text>
                </TouchableOpacity>    */}
            </View>

            <View style={{
                height: 50,
                width: '100%',
                paddingLeft: 10,
                flexDirection: 'row',
                alignItems: 'center',
                backgroundColor: '#FFF',
            }}>
                <Text style={{color: '#000', fontSize: 16, fontWeight: 'bold'}}>{leftColumn.length + rightColumn.length} results found</Text>
            </View>
        <View style={{
            flexDirection: 'row',
            flexWrap: 'wrap',
            justifyContent: 'space-between',
            backgroundColor: '#FFF',
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
                            height: 200,
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
                            height: 200,
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
        </ScrollView>
    </>
  );
}



const styles = StyleSheet.create({
  filterCnt:{
      height: 'auto',
      //   width: '100%',
      paddingTop: 5,
      paddingBottom: 5,
      paddingLeft: 5,
      paddingRight: 5,
      backgroundColor: '#f9f9f9',
      display: 'flex',
      flexDirection: 'row',
      justifyContent: 'flex-start',
      alignItems: 'flex-start',
      // marginBottom: 5
  },
  search:{
      height: 55,
      borderRadius: 15,
      padding: 10,
      width: '85%',
      backgroundColor: '#efefef',
      float: 'right'
  },
  back:{
    height: 55,
    borderRadius: 15,
    display: 'flex',
    flexDirection: 'row',
    justifyContent: 'center',
    alignItems: 'center',
    width: '10%',
},
  searchFilter:{
    height: 'auto',
    flexShrink: 0,
    display: 'flex',
    flexDirection: 'row',
    justifyContent: 'left',
    alignItems: 'center',
    flexWrap: 'wrap',
    // borderRadius: 20, 
    padding: 8,
    // backgroundColor: 'rgb(255, 244, 224)',
    backgroundColor: 'rgb(255, 255, 255)',
    marginBottom: 1.5
  },

  btn:{
    height: 'auto',
    padding: 0,
    padding: 8,
    display: 'flex',
    borderRadius: 5,
    flexDirection: 'row',
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: '#fff',
    marginLeft: 5,
    marginRight: 5

    },
   radioContainer: {
    flexDirection: 'row-reverse',
    alignItems: 'center',
    justifyContent: 'space-between',
    height: 40,
    width: '100%',
    marginBottom: 15,
  },
  outerCircle: {
    height: 20,
    width: 20,
    borderRadius: 10,
    borderWidth: 2,
    borderColor: '#FF4500',
    justifyContent: 'center',
    alignItems: 'center',
    marginRight: 10,
  },
  innerCircle: {
    height: 10,
    width: 10,
    borderRadius: 5,
    backgroundColor: '#FF4500',
  },
  label: {
      fontSize: 16,
      color: '#000'
  },
});


function Location({updateFilterWord}) {
    
    const [campusLocaleList, setCampusLocaleList] = useState([]);
    const [campus, setCampus] = useState([]);
    const { location } = useSelector(s => s.location);
    let [state, setState] = useState('');
    
    useEffect(() => {
        if (location?.address?.state) {
            setState(location.address.state);
        }
    }, [location]);
    
    useEffect(() => {
        setCampusLocaleList([])
        let stateIndex = data.filter(item =>  item.title.toLowerCase() === state.toLowerCase())
        let index = data.indexOf(stateIndex[0]); 
        let campuses = Object.values(school_choices).reverse();
        // console.log(campuses[index])
        index < 0 ? setCampusLocaleList([]) : setCampusLocaleList(campuses[index])
    }, [state])

    function updateData(data) {
        if (name = 'state') {
            setState(data)
        } else {
            setCampus(data)
        }
    }
    
    return (
        <View style={{ 
            // padding: 16,
            width: '100%',
            display: 'flex',
            flexDirection: 'column',
            justifyContent: 'center',
            alignItems: 'center',
        }}>
            <Text style={{
                height: 'auto',
                padding: 0,
                width: '100%',
                borderRadius: 5,
                padding: 8,
                fontWeight: 'bold',
                fontSize: 18,
                marginBottom: 5,
                color: '#000',textAlign: 'center'
            }}>
                Location filter
            </Text>

            <DropdownExample name='state' updateData={updateData} data={data}  placeholder={'Select state'} />
            <DropdownExample name='campus' updateData={updateData} data={campusLocaleList} placeholder={'Select campus'} />

            <TouchableOpacity activeOpacity={.7} style={{
                height: 50,
                padding: 0,
                borderRadius: 5,
                padding: 8,
                display: 'flex',
                justifyContent: 'center',
                alignItems: 'center',
                flexDirection: 'row',
                marginTop: 25,
                backgroundColor: '#FF4500',
                    width: '92%'
            }} onPress={e => {
                updateFilterWord({
                    campus, state
                })
            }}>
                <Text style={{ fontSize: 14, color: '#fff',  width: 'auto' }}>Set location</Text>
            </TouchableOpacity>
        </View>
    )
}


function Conditon({updateFilterWord}) {
    
    const [selected, setSelected] = useState('male');

    return (
        <>
            <Text style={{
                height: 'auto',
                padding: 0,
                width: '100%',
                borderRadius: 5,
                padding: 8,
                fontWeight: 'bold',
                fontSize: 18,
                marginBottom: 5,
                color: '#000',textAlign: 'center'
            }}>
                Conditions
            </Text>
            {
                ['Brand New', 'Used', 'Refurbished', 'Fairly Used'].map((item, index) => {
                    return(
                        <TouchableOpacity
                            key={index}
                            style={styles.radioContainer}
                            onPress={() => setSelected(item)}
                            >
                            <View style={styles.outerCircle}>
                                {selected === item && <View style={styles.innerCircle} />}
                            </View>
                            <Text style={styles.label}>{item}</Text>
                        </TouchableOpacity>
                    )
                })
            }
        </>
    )
}


function Sort({updateFilterWord}) {
    
    const [selected, setSelected] = useState('male');

    return (
        <>
            <Text style={{
                height: 'auto',
                padding: 0,
                width: '100%',
                borderRadius: 5,
                padding: 8,
                fontWeight: 'bold',
                fontSize: 18,
                marginBottom: 5,
                color: '#000',textAlign: 'center'
            }}>
                Sort by
            </Text>
            {
                ['Recommended', 'Newest', 'Lowest price', 'Highest price'].map((item, index) => {
                    return(
                        <TouchableOpacity
                            key={index}
                            style={styles.radioContainer}
                            onPress={() => setSelected(item)}
                            >
                            <View style={styles.outerCircle}>
                                {selected === item && <View style={styles.innerCircle} />}
                            </View>
                            <Text style={styles.label}>{item}</Text>
                        </TouchableOpacity>
                    )
                })
            }
        </>
    )
}


function Price(updateFilterWord) {
    

    return (
        <>
            
            <Text style={{
                height: 'auto',
                padding: 0,
                width: '100%',
                borderRadius: 5,
                padding: 8,
                fontWeight: 'bold',
                fontSize: 18,
                marginBottom: 5,
                color: '#000',textAlign: 'center'
            }}>
                Price range
            </Text>
            {
                <>
                    <View style={{
                        display: 'flex',
                        justifyContent: 'space-between',
                        marginBottom: 25,
                        alignItems: 'center',
                        flexDirection: 'row',
                         width: '100%'

                    }}>
                        <View style={{
                            width: '48%'
                        }}>
                            <Text style={{ fontSize: 14, color: '#000' }}>Max price</Text>
                            
                            <TextInput style={{height: 50, backgroundColor: '#e9e9e9', borderRadius: 5, width: '100%',  padding: 10}} placeholder='Max price'/>
                        </View>
                        <View style={{
                            width: '48%'
                        }}>
                            <Text style={{ fontSize: 14, color: '#000' }}>Min price</Text>
                            
                            <TextInput style={{height: 50, backgroundColor: '#e9e9e9', borderRadius: 5, width: '100%',  padding: 10}} placeholder='Min price'/>
                        </View>
                    </View>
                    <TouchableOpacity activeOpacity={.7} style={{
                        height: 50,
                        padding: 0,
                        borderRadius: 5,
                        padding: 8,
                        display: 'flex',
                        justifyContent: 'center',
                        alignItems: 'center',
                        flexDirection: 'row',
                        marginBottom: 5,
                        backgroundColor: '#FF4500',
                         width: '100%'
                    }}>
                        <Text style={{ fontSize: 14, color: '#fff',  width: 'auto' }}>Set price range</Text>
                    </TouchableOpacity>
                </>
            }
        </>
    )
}


function BottomNav({modalVisible, toggleModal, filter, updateFilterWord}) {
    return (
        <>
            <BottomModal visible={modalVisible} onClose={toggleModal}>
                <ScrollView style={{
                width: '100%',
                height: 'auto',
                backgroundColor: '#fff',
                position: 'relative',
                }}
                contentContainerStyle={{display: 'flex', alignItems: 'flex-start', flexDirection: 'column', justifyContent: 'flex-start', flexWrap: 'wrap'}}>
                    {
                        filter === 'Location'? <Location  updateFilterWord={updateFilterWord} /> : filter === 'Price'? <Price  updateFilterWord={updateFilterWord} /> : filter === 'Condition'? <Conditon updateFilterWord={updateFilterWord} /> : <Sort />
                    }
                    
                </ScrollView>
            </BottomModal> 
        </>
    )
}