import React, { useEffect, useRef, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import Memory from "../utils/memoryHandler";
import { set_user } from "../../redux/info/user";
import GetStartedScreen from "./Intro";
import AuthStackScreen from "./Auth";
import Main from "./Tab";
import WelcomeScreen from "./Welcome";
import { set_mode } from "../../redux/info/mode";
import { getFocusedRouteNameFromRoute, NavigationContainer, useNavigation } from "@react-navigation/native";
import { Alert, SafeAreaView, StatusBar, StyleSheet } from "react-native";
import { set_campus } from "../../redux/info/campus";
import { PaystackProvider } from 'react-native-paystack-webview';
import { CampusSelection } from "../modals/Campus";
import { set_sub_modal } from "../../redux/modal/sub";
import BottomModal from "../reusables/BtmModal";
import axios from "axios";
import Subscription from "../modals/Subscription";
import Connect from "../modals/Connect";
import { set_connect_modal } from "../../redux/modal/connect";
import AdModal from "../modals/Ad";
import { set_ads_modal } from "../../redux/modal/ads_modal";
import { set_connect_purchase_modal } from "../../redux/modal/connect_purchase";
import ConnectionPurchase from "../modals/ConnectPurchase";
import Promotion from "../modals/Promotion";
import Sponsorship from "../modals/Sponsorship";
import { set_boost_modal } from "../../redux/modal/boost_modal";
import { set_sponsored_modal } from "../../redux/modal/disruptor";
import { set_nested_nav } from "../../redux/nested_navigation";
import Tools from "../utils/generalHandler";
import { getSocket, initSocket } from "../services/socket";
import { set_chat } from "../../redux/info/chat";

function NavigationHandler() {

  const { locale_modal } = useSelector(s => s.locale_modal);
  const { sub_modal } = useSelector(s => s.sub_modal);
  const { ads_modal } = useSelector(s => s.ads_modal);
  const { boost_modal } = useSelector(s => s.boost_modal);
  const { sponsored_modal } = useSelector(s => s.sponsored_modal);
  const { connect_modal } = useSelector(s => s.connect_modal);
  const { connect_purchase_modal } = useSelector(s => s.connect_purchase_modal);
  const { mode } = useSelector((s) => s.mode);
  const { user } = useSelector(s => s?.user);
  
  const dispatch = useDispatch();



  useEffect(() => {

    if(user){
      const initializeSocket = async () => {
        try {
          await initSocket(user?.user_id);
          let socket_client = getSocket();

          // socket_client.emit("join_room", { otherUserId: 'CE-729d06' }, cb => {
          //   console.log(cb)
          // });

          socket_client.on("new_message", async(data) => {
            Alert.alert("New message", "You have a new message");
           
            // socket.emit("message_delivered", { conversation_id: data.conversation_id, receiver_id: user.user_id }, cb => {
            //   console.log(cb)
            // });

            // console.log("New message received:", data);
            // let prevMssg = await Memory.get('messages');
            // let updatedMssg = [data, ...prevMssg];
            // Memory.store('messages', updatedMssg);
            // dispatch(set_mssg({...mssg, messages: updatedMssg}));
          });

          


        } catch (error) {
          console.error('Error initializing socket:', error);
        }
      }
      initializeSocket()
    }
    
  }, [user])

  

  useEffect(() => {
    const checkAuthStatus = async () => {
      try {
        const user = await Memory.get("user");
        if (user) {
          dispatch(set_user(user));
          dispatch(set_mode("main"));
          dispatch(set_campus(user?.campus))
          return;
        }

        const anon = await Memory.get("anon");
        if (anon) {
          dispatch(set_mode("auth"));
        } else {
          dispatch(set_mode("intro"));
        }
      } catch (error) {
        console.error("Error checking auth status:", error);
        dispatch(set_mode("intro"));
      }
    };

    setTimeout(() => {
      checkAuthStatus();
    }, 3000);
  }, []);


  const reqHandler = async () => {
    try {
      const response = await axios.get("https://cs-node.vercel.app/plans");

      // Save different parts separately
      await Memory.store("promo_plan", (response.data.promo_plans));
      await Memory.store("connect_plan", (response.data.connection_pricing));
      await Memory.store("tools_plan", (response.data.vendors));

      console.log("Request successful ✅", response.data); 
      return response.data; // stop retrying if successful
    } catch (err) {
      console.warn("Request failed ❌:", err.message);
    }
  };

  const getPlans = async () => {  
    let promo = await Memory.get("promo_plan");   
    let connect = await Memory.get("connect_plan");   
    let vendor = await Memory.get("tools_plan");

    // If any of them is missing, fetch again
    if (!promo || !connect || !vendor) { 
      return await reqHandler();
    }

    return { promo, connect, vendor };
  };

  useEffect(() => {
    getPlans()
  }, [user])

  useEffect(() => {
    const fetchSponsors = async () => {
      try {
        const resp = await axios.get('https://cs-node.vercel.app/sponsorship', {
          params: { campus: user?.campus },
        });

        const data = await resp?.data;
        console.log('data from sponsors: ', data);
        Memory.store('sponsored', (data));

      } catch (error) {
        console.log("Request failed, retrying in", error);
      }
    };

    fetchSponsors();
  }, [user]); // runs whenever campus changes

  const routeNameRef = useRef();
  const navigationRef = useRef(); 

  return (

    <>

      <SafeAreaView style={styles.container}>
        <StatusBar barStyle="light-content" backgroundColor={"#FF4500"} />

        <PaystackProvider publicKey={'pk_live_13343a7bd4deeebc644070871efcdf8fdcf280f7'} defaultChannels={["card", "bank", "ussd", "bank_transfer"]} debug={true}>
          <NavigationContainer 
            ref={navigationRef}
            onReady={() =>
              (routeNameRef.current = navigationRef.current.getCurrentRoute()?.name)
            }
            onStateChange={async () => {
              const currentRoute = navigationRef.current?.getCurrentRoute();
              const name = currentRoute?.name;

              if (name) {
                console.log('📍 Current screen:', name);

                if (name === 'home' || name === 'sell' || name === 'profile' || name === 'chat') {
                  dispatch(set_nested_nav({ boolean: true, id: Tools.generateId() }));
                } else {
                  dispatch(set_nested_nav({ boolean: false, id: Tools.generateId() }));
                }
              }
            }}
          >
            {mode === null && <WelcomeScreen />}
            {mode === "main" && <Main />}
            {mode === "intro" && <GetStartedScreen />}
            {mode === "auth" && <AuthStackScreen />}

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
                  
                  <Subscription  onSelectPackage={''} onClose={e=> {
                    dispatch(set_sub_modal(0))
                  }} />: ''
              )
            } 

            {
              (
                connect_modal === 1 ? 
                
                <Connect  onSelectPackage={''} onClose={e => {
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
                
                <ConnectionPurchase  onSelectPackage={''} onClose={e => {
                  dispatch(set_connect_purchase_modal(0))
                }} />: ''
              )
            } 

            {
              (
                boost_modal.visible === 1 ? 
                
                <Promotion  onSelectPackage={''} onClose={e=> dispatch(set_boost_modal(0))} />: ''
              )
            } 

            {
              (
                sponsored_modal.visible === 1 ? 
                
                <Sponsorship visible={sponsored_modal.visible === 1 ? true: false}  onSelectPackage={''} onClose={e=> dispatch(set_sponsored_modal({data: null, visible: 0}))} />
                : ''
              )
            } 

          </NavigationContainer>
        </PaystackProvider>
      </SafeAreaView>


    </>
    
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#fff",
  },
});

export default NavigationHandler;
