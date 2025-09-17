import React, { useEffect, useState } from 'react'
import { ScrollView, StyleSheet, TextInput, View, Text, TouchableOpacity, Button, Alert, ActivityIndicator, Image } from 'react-native'
import { useDispatch, useSelector, useStore } from 'react-redux';
import address from '../json/address.json'
import { data, school_choices } from '../json/location.json';
import axios from 'axios';
import { useNavigation } from '@react-navigation/native';
import { launchImageLibrary } from 'react-native-image-picker';
import Ionicons  from 'react-native-vector-icons/Ionicons';
import BottomModal from '../reusables/BtmModal';
import { set_user } from '../../redux/info/user';
import DropdownComp from '../reusables/Dropdown';
export default function UserModification() {
    let {
        user
    } = useSelector(s => s.user);
    // console.log(user)
 
    
    let [fname, set_fname] =  useState('')
    let [lname, set_lname] =  useState('')
    let [states, set_states] =  useState('')
    let [cities, set_cities] =  useState('')
    let [gender, setGender] = useState('')
    let [state, setState] = useState('')
    let [campus, setCampus] = useState('')

    useEffect(() => {
        set_fname(user?.fname)
        set_lname(user?.lname)
        setState(user?.state)
        setCampus(user?.campus)
        setGender(user?.gender)

    }, [user])
    const [campusLocaleList, setCampusLocaleList] = useState([]);

    useEffect(() => {
        if (user !== null && user !== undefined && user !== 'null' && user !== 'undefined') { 
            // setState(user?.state)
            updateData(user?.state, 'state')
            updateData(user?.campus, 'campus')
            updateData(user?.gender, 'gender')
        }
    }, [user])

    
    function updateData(data, name) {
        console.log('updateData',data, name)
        if (name === 'gender') {
            setGender(data)
        } else if (name === 'state') {
            setState(data)
        } else {
            setCampus(data)
        }
    }
    useEffect(() => {
        setCampusLocaleList([])
        let stateIndex = data.filter(item =>  item.title.toLowerCase() === state.toLowerCase())
        let index = data.indexOf(stateIndex[0]); 
        let campuses = Object.values(school_choices).reverse();
        index < 0 ? setCampusLocaleList([]) : setCampusLocaleList(campuses[index])
    }, [state])

    useEffect(() => {
        address.map((item,index) => set_states(data => [...data, {key: index+1, title: item.name}]));
    }, [])
    
    useEffect(() => {
        if (states.length > 0) {
            console.log(address.filter(item => item.name === state)[0]?.cities)
            let cities = address.filter(item => item.name === state)[0]?.cities;
            set_cities([])
            cities?.map((item,index) => set_cities(data => [...data, {key: index+1, title: item}]));
        }

    },[state])

    const nav = useNavigation()
    
    async function update_user(){
        try {
            const req = await axios.post('https://cs-server-olive.vercel.app/profile-update', {
                fname, lname, campus, state, gender, user_id: user?.user_id
            })
            let response = req.data;
            console.log('response: ', response)
            if(response?.success){
                nav.goBack()
            }else{
                Alert.alert("Error", "Internal server error please try again.");
            }
        } catch (error) {
            console.log('error: ', error)
            Alert.alert("Error", "Internal server error please try again.");
        
        }
        
    }

    let [photo, set_photo] = useState(user?.photo)
     useEffect(() => {
        const newUser = {...user};
        newUser.photo = photo;
        dispatch(set_user(newUser))
    }, [photo])
    const [isLoading, setIsLoading] = useState(false);
    const dispatch = useDispatch()

    function updatePhoto() {
        setIsLoading(true)
        axios.post(`https://cs-server-olive.vercel.app/update-photo`, {
            user_id: user?.user_id,
            photo
        })
        .then((response) => {
            setIsLoading(false)
            setModalVisible(false)
            if(response.data.success){
                dispatch(set_user(response?.data?.data))
            }else{
                Alert.alert("Error", "Internal server error please try again.");
            }
        }).catch(err=>{
            console.log(err); 
            setIsLoading(false)

            Alert.alert("Error", "Internal server error please try again.");
        })
    }

    const [modalVisible, setModalVisible] = useState(false);

    const toggleModal = (data) => {
        setModalVisible(!modalVisible);
    };
    
    
    const selectUserPhoto = () => {
        const options = {
            mediaType: 'photo',
            quality: 0.8,
            maxWidth: 500,
            maxHeight: 500,
        };
    
        launchImageLibrary(options, async (response) => {
            if (response.didCancel) {
            console.log('User cancelled image picker');
            } else if (response.errorCode) {
            console.log('ImagePicker Error: ', response.errorMessage);
            } else if (response.assets && response.assets.length > 0) {
            const image = response.assets[0];
            await uploadToServer(image);
            }
        });
    };
    
    const uploadToServer = async (image) => {
        try {
            setIsLoading(true); // Correct loading state
            const formData = new FormData();
            formData.append('file', {
                uri: image.uri,
                name: image.fileName || `photo_${Date.now()}.jpg`,
                type: image.type || 'image/jpeg',
            });
    
            const response = await axios.post('https://cs-server-olive.vercel.app/upload', formData, {
            headers: { 'Content-Type': 'multipart/form-data' },
            });
    
            const result = response.data;
            console.log(result.data.url);
    
            if (result.success && result.data.url) {
                set_photo(result.data.url);
                setIsLoading(false); // Correct loading state
    
            }
        } catch (err) {
            console.error('Upload failed:', err.message);
        } finally {
            setIsLoading(false); // Correct loading state
        }
    };

    const deleteFromServer = async (url) => {
        try {
            setIsLoading(true);
            const response = await axios.post('https://cs-server-olive.vercel.app/delete', {
                url
            });

            if (response.data && response.data.data.result === "ok") {
                selectUserPhoto()
            }
        } catch (err) {
            console.error('Upload failed:', err.message);

        } finally {
            setIsLoading(false);
        }
    };
    if (isLoading) {
        return (
            <View style={styles.loadingContainer}>
                <ActivityIndicator size="large" color="#FF4500" />
            </View>
        );
    }
  return (
    <>
        <BottomModal visible={modalVisible} onClose={toggleModal}>
            <ScrollView style={{padding: 8}} showsVerticalScrollIndicator={false}>
                <View style={styles.modalHeader}>
                    <Text style={styles.modalTitle}>Profile Settings</Text>
                </View>
                
                <View style={styles.infoCard}>
                    <Ionicons name="information-circle" size={24} color="#FF4500" />
                    <Text style={styles.infoText}>You are trying to update your coverphoto.</Text>
                    <Text style={styles.learnMoreText}>Learn more in our help articles.</Text>
                </View>
            
                {/* Image Upload Section */}
                <View style={styles.inputGroup}>
                    <Text style={styles.inputLabel}>My Photo</Text>
                    <View style={{
                        alignItems: 'center',
                        marginBottom: 20,
                    }}>
                        <TouchableOpacity 
                            style={{
                                width: 100,
                                height: 100,
                                borderRadius: 50,
                                backgroundColor: '#F8F9FA',
                                borderWidth: 2,
                                borderColor: '#E9ECEF',
                                borderStyle: 'dashed',
                                justifyContent: 'center',
                                alignItems: 'center',
                                marginBottom: 12,
                            }}
                            onPress={() => {
                                selectUserPhoto()
                                console.log('Open image picker');
                            }}
                        >
                            {user?.photo ? (
                                <Image 
                                    source={{ uri: photo}} 
                                    style={{
                                        width: 96,
                                        height: 96,
                                        borderRadius: 48,
                                    }}
                                />
                            ) : (
                                <Ionicons name="camera" size={32} color="#6C757D" />
                            )}
                        </TouchableOpacity>
                        
                        <TouchableOpacity 
                            style={{
                                flexDirection: 'row',
                                alignItems: 'center',
                                backgroundColor: '#FF4500',
                                paddingHorizontal: 16,
                                paddingVertical: 10,
                                borderRadius: 8,
                            }}
                            onPress={async() => {
                                // Add your image upload logic here
                                console.log('Upload image');
                                const result = await deleteFromServer(user?.photo)
                            }}
                        >
                            <Ionicons name="cloud-upload" size={18} color="#FFF" />
                            <Text style={{
                                color: '#FFF',
                                fontWeight: '600',
                                marginLeft: 8,
                                fontSize: 14,
                            }}>
                                {user?.photo ? 'Change Photo' : 'Upload Photo'}
                            </Text>
                        </TouchableOpacity>
                        
                        
                        {/* <Text style={{
                            fontSize: 12,
                            color: '#6C757D',
                            textAlign: 'center',
                            marginTop: 8,
                        }}>
                            Recommended: 300×300 pixels, JPG or PNG
                        </Text> */}
                    </View>
                </View>

                <TouchableOpacity 
                    onPress={() => updatePhoto()} 
                    style={styles.setupButton}
                >
                    <Text style={styles.setupButtonText}>Set up</Text>
                </TouchableOpacity>
            </ScrollView>
        </BottomModal>
        <View style={styles.cnt} >
            {/* <Text style={{fontSize: 25, color: '#000', fontWeight: '600', height: 40, backgroundColor: '#fff'}}>Tell us about yourself</Text> */}

            <ScrollView >
                <View style={{height: 60, width: '100%', display: 'flex', justifyContent: 'center', alignItems: 'center'}}>
                    {
                        user?.photo
                        ?
                            <TouchableOpacity style={{height: 60, width: 60}} onPress={e => {
                                toggleModal()
                            }}>
                                <Image
                                    source={{ uri: user.photo }}
                                    style={styles.profileImage}
                                    onError={() => console.log('Error loading image')}
                                />
                            </TouchableOpacity>  
                        :
                            <TouchableOpacity style={{height: 60, width: 60}} onPress={e => {
                                toggleModal()
                            }}>
                                <Ionicons color='#FF4500' size={60} />
                            </TouchableOpacity>  
                    }  
                </View>


                <Text style={[styles.label, {borderBottomColor: '#000', borderBottomWidth: .5, paddingBottom: 10, marginBottom: 10, marginTop: 25}]}>Personal Details</Text>
                <View style={{height: 'auto', width: '100%', display: 'flex', marginBottom: 35,  alignItems: 'center', justifyContent: 'space-between', padding: 8, flexDirection: 'row'}}>

                    <View style={{display: 'flex', height: 60, color: '#000', width: '48%', flexDirection: 'column'}}>
                        <Text style={{width: '100%', color: '#000', marginLeft: 4}}>Firstname</Text>
                        <TextInput style={{height: 50, fontFamily: 'Roboto', padding: 10, borderRadius: 10, marginBottom: 2, width: '100%',  backgroundColor: '#fff', borderColor: '#000',borderWidth: .7,borderRadius: 7}}   placeholder="FirstName" defaultValue={user?.fname} onChangeText={e => set_fname(e)} />
                        {/* <Text style={{color: '#000', marginBottom: 15, display: fnameErr.length > 0 ? 'flex' : 'none', fontSize: 10, paddingLeft: 5, color: 'red'}}>{fnameErr}</Text> */}
                    </View>
        

                    <View style={{display: 'flex', height: 60, color: '#000', width: '48%', flexDirection: 'column'}}>
                        <Text style={{width: '100%', color: '#000', marginLeft: 4}}>Lastname</Text>
                        <TextInput style={{height: 50, fontFamily: 'Roboto', padding: 10, borderRadius: 10, marginBottom: 2, width: '100%',  backgroundColor: '#fff', borderColor: '#000',borderWidth: .7,borderRadius: 7}} placeholder="LastName" defaultValue={user?.lname} onChangeText={e => set_lname(e)} />
                        {/* <Text style={{color: '#000', marginBottom: 15, display: lnameErr.length > 0 ? 'flex' : 'none', fontSize: 10, paddingLeft: 5, color: 'red'}}>{lnameErr}</Text> */}
                    </View>

                </View>
                
                 <View style={styles.inputCnt}>
                    <Text style={styles.label}>Gender</Text>
                     <DropdownComp updateData={updateData} default_value={parseInt(gender) === 1 ? "Male" : "Female"} dropdownData={[{ title: 'Male' }, { title: 'Female' }]} input_name={'gender'} placeholder={'Select your gender'} />
                </View>

                

                <View style={styles.inputCnt}>
                    <Text style={styles.label}>Phone number</Text>
                    <TextInput style={styles.input} value={`${user?.phone}`} />
                </View>
                
                <View style={styles.inputCnt}>
                    <Text style={styles.label}>Email</Text>
                    <TextInput style={styles.input} value={`${user?.email}`} />
                </View>

                {/* <Text style={[styles.label, {borderBottomColor: '#000', borderBottomWidth: 1}]}>Change phone number</Text> */}


                <Text style={[styles.label, {borderBottomColor: '#000', borderBottomWidth: .5, paddingBottom: 10, marginBottom: 10, marginTop: 25}]}>Address</Text>

                {/* <View style={styles.inputCnt}>
                    <Text style={styles.label}>Street or junction (e.g. Yahoo junction)</Text>
                    <TextInput style={styles.input} defaultValue={home_address} onChangeText={txt=> set_home_address(txt)}/>
                </View>
                
                <View style={styles.inputCnt}>
                    <Text style={styles.label}>Lodge Name</Text>
                    <TextInput style={styles.input} defaultValue={home_address} onChangeText={txt=> set_home_address(txt)}/>
                </View> */}
                
                {/* <View style={styles.inputCnt}>
                    <Text style={styles.label}>Postal code</Text>
                    <TextInput style={styles.input} defaultValue={postal_code} keyboardType='numeric' onChangeText={txt=> set_postal_code(txt)}/>
                </View> */}

                {/* <View style={styles.inputCnt}>
                    <Text style={styles.label}>Country</Text>
                    <SelectList 
                        setSelected={(val) => set_country(val)} 
                        data={[{key: 1, value: 'Nigeria'}]} 
                        save="value"
                    />
                </View> */}
                
                <View style={styles.inputCnt}>
                    <Text style={styles.label}>State</Text>
                    {/* <SelectList 
                        setSelected={(val) => set_state(val)} 
                        data={states} 
                        defaultOption={{key:'1', value:user?.address?.state}}
                        
                        save="value"
                        placeholder='Select state'
                    /> */}
                    <DropdownComp updateData={updateData} default_value={state} dropdownData={data} dropdownPosition={"top"}  input_name={'state'} placeholder={'Select your state'} />
                    
                </View>
                
                <View style={styles.inputCnt}>
                    <Text style={styles.label}>Campus</Text>
                    {/* <SelectList 
                        setSelected={(val) => set_city(val)} 
                        data={cities} 
                        defaultOption={{key:'1', value:user?.address?.city}}
                        save="value"
                        placeholder='Select city'
                        
                    /> */}
                    <DropdownComp updateData={updateData} default_value={campus}  dropdownData={campusLocaleList} dropdownPosition={"top"} input_name={'campus'} placeholder={'Select your campus'} />
                    
                </View>
                
                

                
            </ScrollView>

            <View style={{height: 80, padding: 10, width: '100%', display: 'flex', justifyContent: 'center', alignItems: 'center'}}>
                <TouchableOpacity onPress={e=> {
                    let validation = ([fname , lname , gender , campus , state]).filter(item => item !== null && item !== '' && item !== 'null');
                    if(validation.length === 5){
                        update_user()
                    }else{
                        Alert.alert("Field missing", 'Please ensure no field is empty!')
                    }
                }} style={{height: 60, width: '100%', display: 'flex', justifyContent: 'center', alignItems: 'center', backgroundColor: '#FF4500', borderRadius: 8}}>
                    <Text style={{color: '#FFF'}}>Save</Text>
                </TouchableOpacity>
            </View>
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
      loadingContainer: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
        backgroundColor: '#F8F9FA',
    },
     profileImage: {
        width: 80,
        height: 80,
        borderRadius: 50,
        marginBottom: 16,
        borderWidth: 3,
        borderColor: '#FF4500',
    },
    loadingText: {
        marginTop: 16,
        fontSize: 16,
        color: '#666',
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
        backgroundColor: '#f9f9f9',
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
      },
      modalHeader: {
        marginBottom: 20,
    },
    modalTitle: {
        fontSize: 24,
        fontWeight: '700',
        color: '#2D3436',
        textAlign: 'center',
    },
    infoCard: {
        backgroundColor: '#FFF8F6',
        padding: 20,
        borderRadius: 12,
        borderWidth: 1,
        borderColor: '#FFE5DE',
        marginBottom: 24,
    },
    infoText: {
        fontSize: 16,
        color: '#2D3436',
        lineHeight: 22,
        marginTop: 8,
        marginBottom: 12,
    },
    loadingContainer: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
        backgroundColor: '#F8F9FA',
    },
    loadingText: {
        marginTop: 16,
        fontSize: 16,
        color: '#666',
    },
    learnMoreText: {
        fontSize: 16,
        color: '#FF4500',
        fontWeight: '600',
    },
    inputGroup: {
        marginBottom: 24,
    },
    inputLabel: {
        fontSize: 16,
        fontWeight: '600',
        color: '#2D3436',
        marginBottom: 8,
    },
    textInput: {
        backgroundColor: '#F8F9FA',
        borderWidth: 1,
        borderColor: '#E9ECEF',
        borderRadius: 8,
        padding: 16,
        fontSize: 16,
        color: '#2D3436',
    },
    multilineInput: {
        height: 120,
        textAlignVertical: 'top',
    },
    sectionTitleModal: {
        fontSize: 18,
        fontWeight: '600',
        color: '#2D3436',
        marginBottom: 16,
    },
    categoryScroll: {
        maxHeight: 200,
        marginBottom: 24,
    },
    categoryContainer: {
        flexDirection: 'row',
        flexWrap: 'wrap',
        gap: 8,
    },
    categoryPill: {
        flexDirection: 'row',
        alignItems: 'center',
        backgroundColor: '#F8F9FA',
        paddingHorizontal: 16,
        paddingVertical: 12,
        borderRadius: 20,
        borderWidth: 1,
        borderColor: '#E9ECEF',
        gap: 8,
    },
    categoryPillSelected: {
        backgroundColor: '#E7F5FF',
        borderColor: '#339AF0',
    },
    categoryText: {
        color: '#2D3436',
        fontSize: 14,
        fontWeight: '500',
    },
    categoryTextSelected: {
        color: '#339AF0',
    },
    selectedCategories: {
        marginBottom: 24,
    },
    selectedScroll: {
        maxHeight: 120,
    },
    selectedContainer: {
        flexDirection: 'row',
        flexWrap: 'wrap',
        gap: 8,
    },
    selectedPill: {
        flexDirection: 'row',
        alignItems: 'center',
        backgroundColor: '#E7F5FF',
        paddingHorizontal: 16,
        paddingVertical: 12,
        borderRadius: 20,
        borderWidth: 1,
        borderColor: '#339AF0',
        gap: 8,
    },
    selectedText: {
        color: '#339AF0',
        fontSize: 14,
        fontWeight: '500',
    },
    setupButton: {
        backgroundColor: '#FF4500',
        borderRadius: 12,
        padding: 18,
        alignItems: 'center',
        marginBottom: 20,
    },
    setupButtonText: {
        color: '#FFF',
        fontSize: 18,
        fontWeight: '700',
    }
  });
