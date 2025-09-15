import React, { useEffect, useState } from 'react';
import { 
  View, 
  Text, 
  StyleSheet, 
  TextInput, 
  FlatList, 
  TouchableOpacity,
  Platform, 
  StatusBar,
  AppState,
  Linking,
} from 'react-native';
import { PaystackProvider } from 'react-native-paystack-webview';
import { NavigationContainer, useFocusEffect, useNavigationState, useRoute } from '@react-navigation/native';
import { Provider, useDispatch, useSelector } from 'react-redux';
import { SafeAreaProvider, SafeAreaView } from 'react-native-safe-area-context';
import Ionicons from 'react-native-vector-icons/Ionicons';

import store from './redux/store';
import { Shop } from './android/app/src/files/utils/Store.js';
import { DownloadAppScreen } from './android/app/src/files/utils/Stacks/Update.js';
import AuthStackScreen from './android/app/src/files/store/utils/Auth.js';
import { school_choices } from './android/app/src/files/store/utils/location copy.js';
import { set_campus } from './redux/campus.js';
import BottomModal from './android/app/src/files/store/utils/BtmModal.js';
import { set_locale_modal } from './redux/locale.js';
import SubscriptionModal from './android/app/src/files/utils/Sub.js';
import { set_sub_modal } from './redux/sub.js';
import { Header } from 'react-native/Libraries/NewAppScreen';
import { setUserAuthTo } from './redux/reducer/auth.js';
import axios from 'axios';
import { set_subscribed } from './redux/subscribed.js';
import { set_tier } from './redux/tier.js';
import { getData, storeData } from './android/app/src/files/utils/AsyncStore.js.js';
import VendorConnectodal from './android/app/src/files/store/screens/ConnectPurchase.js';
import VendorSubscriptionsModal from './android/app/src/files/store/utils/ToolsModal.js';
import PromotionSubscriptionsModal from './android/app/src/files/store/utils/PromotionModal.js';
import { set_boost_modal } from './redux/boost_modal.js';
import VendorConnectModal from './android/app/src/files/store/utils/ConnectModal.js';
import { set_connect_modal } from './redux/connect.js';
import VendorConnectionsModal from './android/app/src/files/store/screens/ConnectPurchase.js';
import { set_connect_purchase_modal } from './redux/connect_purchase.js';
import AdModal from './android/app/src/files/store/utils/Ads.js';
import { set_ads_modal } from './redux/ads_modal.js';
import DisruptiveAdModal from './android/app/src/files/store/utils/DisruptiveModal.js';
import { set_sponsored_modal } from './redux/disruptor.js';
// import { set_campus } from './redux/reducer/location.js';   // ✅ add correct reducer
// import { closeModal } from './redux/reducer/locale.js';      // ✅ add correct reducer

function App() {
  
  useEffect(() => {
    axios.get('https://cs-server-olive.vercel.app/packages')
    .then((res) => {
      const packageArray = res.data.packageData;
      const formatPackages = (packagesArray) => {
        const formatPrice = (price) => {
          let num = parseFloat(price);
          if (isNaN(num)) return "₦0";
          return "₦" + num.toLocaleString("en-NG");
        };

        return packagesArray.reduce((acc, pkg) => {
          acc[pkg.name] = {
            price: formatPrice(pkg.price),
            discount_price: formatPrice(pkg.discount_price),
            features: pkg.features,
            tier: pkg.tier,
            hint: pkg.hint,
            themeColor: pkg.theme_color
          };
          return acc;
        }, {});
      };
      const PACKAGES = formatPackages(packageArray);
      storeData('PACKAGES', JSON.stringify(PACKAGES))

    }).catch(err => console.log(err))
  }, [])

  
  
 

  return (
    <SafeAreaView style={{ flex: 1 }}>

      <Provider store={store}>
        <AppFinale />
      </Provider>

    </SafeAreaView>
  );
}

export default App;

// --------------------
// AppFinale
// --------------------
function AppFinale() {
  const { payment_method } = useSelector(s=>s?.payment_method)
  Text.defaultProps = Text.defaultProps || {};
  Text.defaultProps.allowFontScaling = false;

  TextInput.defaultProps = TextInput.defaultProps || {};
  TextInput.defaultProps.allowFontScaling = false;

  const [version] = useState('1.0.2');
  const [update, setUpdate] = useState(false);
  const [data, setData] = useState('');

  const checkAppVersion = async () => {
    try {
      const response = await fetch('https://cs-server-olive.vercel.app/version-check', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          current_version: version,
          platform: Platform.OS,
        }),
      });
      return await response.json();
    } catch (error) {
      console.error('Version check failed:', error);
      throw Error('Error occurred');
    }
  };

  useEffect(() => {
    checkAppVersion().then((data) => {
      if (data.success && !data.is_latest) {
        setData(data);
        setUpdate(true);
      }
    }).catch(console.log);
  }, []);
  
  return(
    <>
      {!update ? (
        <PaystackProvider publicKey={'pk_live_13343a7bd4deeebc644070871efcdf8fdcf280f7'} defaultChannels={["card", "bank", "ussd"]} debug={true}>
          
          <NavigationContainer
            onStateChange={(state) => {
              // recursive function to get the deepest active route
              const getActiveRoute = (state) => {
                const route = state.routes[state.index];
                if (route.state) {
                  return getActiveRoute(route.state); // go deeper
                }
                return route;
              };
              const currentRoute = getActiveRoute(state);
              if(currentRoute.name==='user-profile'){
                StatusBar.setBarStyle("light-content");
                StatusBar.setBackgroundColor("#FF4500"); // Android only
              }else{
                StatusBar.setBarStyle("dark-content");
                StatusBar.setBackgroundColor("#fff"); // Android only
              }
            }}
          >
            <NavCnt /> 
          </NavigationContainer>
          
        </PaystackProvider>
        ) : (
        <DownloadAppScreen url={data?.url} summary={data?.summary} />
      )}
    </>
  )
}

// --------------------
// NavCnt
// --------------------
function NavCnt() {
  const [mode, setMode] = useState('shop');
  const [resumeTick, setResumeTick] = useState(0);
  const { auth } = useSelector(s => s.auth);
  const { user } = useSelector(s => s.user);
  const { locale_modal } = useSelector(s => s.locale_modal);
  const { sub_modal } = useSelector(s => s.sub_modal);
  const { ads_modal } = useSelector(s => s.ads_modal);
  const { boost_modal } = useSelector(s => s.boost_modal);
  const { sponsored_modal } = useSelector(s => s.sponsored_modal);
  const { connect_modal } = useSelector(s => s.connect_modal);
  const { connect_purchase_modal } = useSelector(s => s.connect_purchase_modal);
  const dispatch = useDispatch();

  useEffect(() => {
    setMode(auth ? 'auth' : 'shop');
  }, [auth]);

  // Listen for app returning from background and deep link events
  useEffect(() => {
    const handleAppStateChange = (nextAppState) => {
      if (nextAppState === 'active') {
        setResumeTick(t => t + 1);
      }
    };

    const appStateSubscription = AppState.addEventListener('change', handleAppStateChange);

    const onUrl = ({ url }) => {
      // Treat deep links or return from external share as a resume trigger
      setResumeTick(t => t + 1);
    };

    const linkingSubscription = Linking.addEventListener('url', onUrl);

    // Check if app was opened via a link
    Linking.getInitialURL()
      .then((url) => {
        if (url) onUrl({ url });
      })
      .catch(() => {});

    return () => {
      appStateSubscription.remove();
      linkingSubscription.remove();
    };
  }, []);

  useEffect(() => {
    if (user) {
      dispatch(set_campus(user?.campus));
    }else{
      setUserAuthTo(true)
    }
  }, [user]); 

  useEffect(() => {
    let isMounted = true;

    async function SubWithRetry(retryDelay = 2000) {
      try {
        const resp = await axios.get('https://cs-server-olive.vercel.app/subscription', {
          params: { user_id: user.user_id },
        });

        if (!isMounted) return;

        const data = resp?.data;
        dispatch(set_subscribed(data.subscribed));
        dispatch(set_tier(data.data));

      } catch (error) {
        console.log("Request failed, retrying in", retryDelay / 1000, "seconds:", error.message);

        // Retry after delay
        setTimeout(() => {
          if (isMounted) {
            SubWithRetry(retryDelay); // keeps retrying with same delay
            // OR use exponential backoff:
            // SubWithRetry(Math.min(retryDelay * 2, 30000));
          }
        }, retryDelay);
      }
    }

    SubWithRetry();

    return () => {
      isMounted = false; // stop retries if component unmounts
    };
  }, [user, dispatch, resumeTick]);

  const reqHandler = async () => {
    try {
      const response = await axios.get("https://cs-server-olive.vercel.app/plans");

      // Save different parts separately
      await storeData("promo_plan", JSON.stringify(response.data.promo_plans));
      await storeData("connect_plan", JSON.stringify(response.data.connection_pricing));
      await storeData("tools_plan", JSON.stringify(response.data.vendors));

      console.log("Request successful ✅", response.data); 
      return response.data; // stop retrying if successful
    } catch (err) {
      console.warn("Request failed ❌:", err.message);
    }
  };

  const getPlans = async () => {  
    let promo = await getData("promo_plan");   
    let connect = await getData("connect_plan");   
    let vendor = await getData("tools_plan");

    // If any of them is missing, fetch again
    if (!promo || !connect || !vendor) { 
      return await reqHandler();
    }

    return { promo, connect, vendor };
  };

  useEffect(() => {
    getPlans()
  }, [user])

  
  return (
    <SafeAreaProvider style={{ flex: 1 }}>

      {/* {mode === 'shop' && <Shop />} */}
      {/* {mode === 'auth' && <AuthStackScreen />} */}
      <AuthStackScreen />
      {
        (
          <BottomModal
            visible={locale_modal === 1 ? true : false} 
            
            children={<CampusSelection onCloseModal={e=> {
              dispatch(set_sub_modal(0));
            }} />}
          />
        )
      }
      {
        (
            sub_modal === 1 ? 
            
            <VendorSubscriptionsModal  onSelectPackage={''} onClose={e=> {
              dispatch(set_sub_modal(0))
            }} />: ''
        )
      } 

      {
        (
          connect_modal === 1 ? 
          
          <VendorConnectModal  onSelectPackage={''} onClose={e => {
            dispatch(set_connect_modal(0))
          }} />: ''
        )
      } 

      {
        (
          ads_modal.visible == 1 ? 
          
          <AdModal  onSelectPackage={''} onClose={e => {
            dispatch(set_ads_modal({data: ads_modal.data, visible: 0}))
          }} />: ''
        )
      } 

      {
        (
          connect_purchase_modal === 1 ? 
          
          <VendorConnectionsModal  onSelectPackage={''} onClose={e => {
            dispatch(set_connect_purchase_modal(0))
          }} />: ''
        )
      } 

      {
        (
          boost_modal.visible === 1 ? 
          
          <PromotionSubscriptionsModal  onSelectPackage={''} onClose={e=> dispatch(set_boost_modal(0))} />: ''
        )
      } 

      {
        // (
          // sponsored_modal.visible === 1 ? 
          
          // <DisruptiveAdModal visible={sponsored_modal.visible === 1 ? true: false}  onSelectPackage={''} onClose={e=> dispatch(set_sponsored_modal(0))} />
          // : ''
        // )
      } 

    </SafeAreaProvider>
  );
}
// --------------------
// CampusSelection
// --------------------
const CampusSelection = ({ onCloseModal }) => {
  const dispatch = useDispatch();
  const [schools, setSchools] = useState([]);
  const [filteredSchools, setFilteredSchools] = useState([]);
  const [searchText, setSearchText] = useState('');

  useEffect(() => {
    // Flatten all the schools into one array
    const allSchools = Object.values(school_choices).flat();

    // Add "All campus" option at the top
    const withAllCampus = [{ value: -1, title: "All campus" }, ...allSchools];

    // Save into state
    setSchools(withAllCampus);
    setFilteredSchools(withAllCampus);
  }, []);

  useEffect(() => {
    if (searchText) { 
      setFilteredSchools(
        schools.filter(school =>
          school.title.toLowerCase().includes(searchText.toLowerCase().trim())
        )
      );
    } else {
      setFilteredSchools(schools);
    }
  }, [searchText, schools]);

  const handleCampusSelect = (campus) => {
    dispatch(set_campus(campus.title));
    dispatch(set_locale_modal(0))
  };

  const renderItem = ({ item }) => (
    <TouchableOpacity
      style={campus_styles.itemContainer}
      onPress={() => handleCampusSelect(item)}
    >
      <Text style={campus_styles.name}>{item.title}</Text>
    </TouchableOpacity>
  );

  return (
    <View style={campus_styles.container}>
      <View style={{
        display: 'flex', justifyContentL: 'space-between', marginTop: 10, marginBottom: 16 , flexDirection: 'row', alignItems: 'center',
      }}>
        <TouchableOpacity onPress={e=> {
          dispatch(set_locale_modal(0))
        }} >
          <Ionicons name={'arrow-back'} size={25} />
        </TouchableOpacity>
        <Text style={campus_styles.title}>Select Your Campus</Text>
      </View>
      <View style={campus_styles.searchContainer}>
        <Ionicons name="search" size={20} color="#999" style={campus_styles.searchIcon} />
        <TextInput
          style={campus_styles.searchInput}
          placeholder="Search for your campus..."
          value={searchText}
          onChangeText={setSearchText}
        />
        {searchText ? (
          <TouchableOpacity onPress={() => setSearchText('')}>
            <Ionicons name="close-circle" size={20} color="#999" />
          </TouchableOpacity>
        ) : null}
      </View>

      <FlatList
        data={filteredSchools}
        renderItem={renderItem}
        keyExtractor={item => item.value.toString()}
        initialNumToRender={20}
        maxToRenderPerBatch={20}
        windowSize={10}
        getItemLayout={(data, index) => (
          { length: 60, offset: 60 * index, index }
        )}
        ListEmptyComponent={
          <View style={campus_styles.emptyContainer}>
            <Text style={campus_styles.emptyText}>No campuses found</Text>
          </View>
        }
      />
    </View>
  );
};

const campus_styles = StyleSheet.create({
  container: {
    

    height: '100%',
  },
  title: {
    fontSize: 20,
    fontWeight: 'bold',
    marginBottom: 4,
    marginLeft: '15%',
    // textAlign: 'center',
  },
  searchContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    borderWidth: 1,
    borderColor: '#ddd',
    borderRadius: 8,
    paddingHorizontal: 10,
    marginBottom: 16,
    backgroundColor: '#f9f9f9',
  },
  searchIcon: {
    marginRight: 10,
  },
  searchInput: {
    flex: 1,
    height: 40,
  },
  itemContainer: {
    padding: 15,
    borderBottomWidth: 1,
    borderBottomColor: '#eee',
  },
  name: {
    fontSize: 16,
  },
  emptyContainer: {
    padding: 20,
    alignItems: 'center',
  },
  emptyText: {
    fontSize: 16,
    color: '#999',
  },
});
