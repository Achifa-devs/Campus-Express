import React, { useEffect, useRef, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import Memory from "../utils/memoryHandler";
import { set_user } from "../../redux/info/user";
import GetStartedScreen from "./Intro";
import AuthStackScreen from "./Auth";
import Main from "./Tab";
import Sound from 'react-native-sound';
import WelcomeScreen from "./Welcome";
import { set_mode } from "../../redux/info/mode";
import { NavigationContainer } from "@react-navigation/native";
import { AppState, Dimensions, SafeAreaView, StatusBar, StyleSheet, Text, TouchableOpacity, View } from "react-native";
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
import { set_is_active } from "../../redux/info/is_active";
import { set_unread } from "../../redux/info/unread_chats";
import NetInfo from '@react-native-community/netinfo';
import { set_is_connected } from "../../redux/info/is_connected";
import { getMessaging } from "@react-native-firebase/messaging";
import { navigationRef, notifeeNavigationRef } from "./root_nav";
import NetworkCard from "../components/NetworkCard";
Sound.setCategory("Playback"); // ensure sound plays even in silent mode (iOS)
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
  const [socket, setSocket] = useState(null)
  const [chatBool, setChatBool] = useState(false)
  const dispatch = useDispatch();
  const { chat } = useSelector(s => s?.chat);
  const { is_connected } = useSelector(s => s?.is_connected);
  const [newMessage, setNewMessage] = useState({})

  useEffect(() => {
    const unsubscribe = NetInfo.addEventListener(state => {
      dispatch(set_is_connected(!!(state.isConnected && state.isInternetReachable)));
    });
    return () => unsubscribe(); // clean up properly
  }, [dispatch]);

  const checkInternet = async () => {
    try {
      const res = await fetch("https://clients3.google.com/generate_204", {
        method: "HEAD",
        cache: "no-store",
      });
      dispatch(set_is_connected(res.ok));
    } catch {
      dispatch(set_is_connected(false));
    }
  };

  useEffect(() => {
    checkInternet(); // run once immediately
    const interval = setInterval(checkInternet, 5000); // check every 5s
    return () => clearInterval(interval); // clean up
  }, [dispatch]);


  useEffect(() => {
   async function getFcm () {
     if(!user) return;
     if(user.fcm) return;
     let fcm = await Memory.get('fcm');
     
     axios.post('https://cs-node.vercel.app/update-fcm', {
       user_id: user?.user_id,
       fcm: fcm
     })
     .then((res) => {
      //  console.log(res.data)
     })
     .catch(err => {
      //  console.log(err)
     })
   }
   getFcm()
  }, [user]);

  useEffect(() => {
    getMessaging().onTokenRefresh(token => {
      // Send new token to your backend
      // updateUserFcmToken(token);
      axios.post('https://cs-node.vercel.app/update-fcm', {
        user_id: user?.user_id,
        fcm: token
      })
      .then((res) => {
        // console.log(res.data)
      })
      .catch(err => {
        // console.log(err)
      })
    });
  }, [])

  function fetchChatList() {

    if(!socket) return;
    socket?.emit("get_all_messages", { user_id: user?.user_id }, cb => {
      const { messages, success } = cb;
      if (success) {
        
        let sortedMsgs = [...messages].sort(
          (a, b) => new Date(b.lastMessage.created_at) - new Date(a.lastMessage.created_at)
        );
        dispatch(set_chat(sortedMsgs)); 
        // Memory.store('chat_list', sortedMsgs);
  
      } 
    })
  }

  useEffect(() => {
    if(chatBool){
      const {
        sender_id,
        receiver_id,
        content,
        conversation_id,
        message_type,
        media_url,
        created_at,
      } = newMessage;
      updateChat({
        sender_id,
        receiver_id,
        content,
        conversation_id,
        message_type,
        media_url,
        created_at,
      })
    }
  }, [chat])

  useEffect(() => {
    if(!chat && !socket) return;
    chat && chat.map(room => {
      room.partner && socket?.emit('join_room', { otherUserId: room.partner.user_id });
    })
  }, [chat, socket])

  useEffect(() => {
    if (!chat) return;

    // Accumulate unread messages from all rooms
    let totalUnread = 0;

    chat.forEach((data) => {
      totalUnread += data.unread;
    });

    // ✅ Update Redux state once with the total unread count
    dispatch(set_unread(totalUnread));
  }, [dispatch, chat]);

  

  function updateChat ({
    sender_id,
    receiver_id,
    content,
    conversation_id,
    message_type,
    media_url,
    created_at,
  }) {
    if (user.user_id === receiver_id) {
      // Create a shallow copy of chat array
      const updatedChatList = [...chat];
      // Find the chat index
      const index = updatedChatList.findIndex(
        (item) => item.key === conversation_id
      );
      if (index !== -1) {
        // Clone the chat item to avoid mutating state
        const chatItem = { ...updatedChatList[index] };
  
        chatItem.lastMessage = {
          sender_id,
          receiver_id,
          content,
          conversation_id,
          message_type,
          media_url,
          created_at,
        };
  
        chatItem.unread = (chatItem.unread || 0) + 1;
        updatedChatList[index] = chatItem;
      } else {
        updatedChatList.push({
          key: conversation_id,
          partner: partner,
          lastMessage: {
            sender_id,
            receiver_id,
            content,
            conversation_id,
            message_type,
            media_url,
            created_at,
          },
          unread: 1,
        });
      }
      dispatch(set_chat(updatedChatList));
      setChatBool(false);
      // ✅ Play notification sound
      const ding = new Sound("sound.wav", Sound.MAIN_BUNDLE, (error) => {
        if (error) {
          console.log("Failed to load the sound", error);
          return;
        }
        ding.play((success) => {
          if (!success) {
            console.log("Playback failed due to audio decoding errors");
          }
          ding.release(); // free memory after playback
        });
      });
      // Dispatch updated chat
    }
  }


  useEffect(() => {
    if(!socket)return;
    socket.on("message", async ({ newMessage, partner }) => {
      const {
        sender_id,
        receiver_id,
        content,
        conversation_id,
        message_type,
        media_url,
        created_at,
      } = newMessage;

      setNewMessage({
        sender_id,
        receiver_id,
        content,
        conversation_id,
        message_type,
        media_url,
        created_at,
      })
      try {
        if (Array.isArray(chat)) {
          const {
            sender_id,
            receiver_id,
            content,
            conversation_id,
            message_type,
            media_url,
            created_at,
          } = newMessage
          updateChat({
            sender_id,
            receiver_id,
            content,
            conversation_id,
            message_type,
            media_url,
            created_at,
          });
        }else{
          setChatBool(true)
          fetchChatList()
        }
      } catch (error) {
        console.log("Error: ", error)
      }
    });

    socket.on("partner_offline", async({partnerId, date}) => {
      dispatch(set_is_active({online: false, user_id: partnerId, date, id: Tools.generateId(10)}))
    })

    socket.on("partner_online", async({partnerId}) => {
      dispatch(set_is_active({online: true, user_id: partnerId, id: Tools.generateId(10)}))
    })

  }, [socket])

  useEffect(() => {
    if(user){
      const initializeSocket = async () => {
        try {
          await initSocket(user?.user_id);
          let socket_client = getSocket();
          setSocket(socket_client)
        } catch (error) {
          console.error('Error initializing socket:', error);
        }
      }
      initializeSocket()
    }
    
  }, [user])


  useEffect(() => {
    if (user) {
      const subscription = AppState.addEventListener('change', nextState => {
        console.log('App state changed to:', nextState);
        // setAppState(nextState);
  
        if (nextState === 'background') {
          console.log('🌓 User minimized or exited the app');
          // let socket_client = getSocket();
          async function initializeSocket () {
            try {
              await initSocket(user?.user_id);
              let socket_client = getSocket();
              socket_client.emit('offline', {})
            } catch (error) {
              console.error('Error initializing socket:', error);
            }
          }
          initializeSocket()
          // You can save data, update status to offline, etc.
        }
  
        if (nextState === 'active') {
          console.log('☀️ User opened or returned to the app');
        }
      });
  
      return () => subscription.remove();
    }
  }, [user]);
  useEffect(() => {
    if(!socket) return;
    fetchChatList();
  }, [socket, is_connected])
  
  useEffect(() => {
    const checkAuthStatus = async () => {
      try {
        const user = await Memory.get("user");

        if (user && user?.campus) {
          dispatch(set_user(user));
          dispatch(set_mode("main"));
          dispatch(set_campus(user.campus));
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

    const timer = setTimeout(() => checkAuthStatus(), 3000);
    return () => clearTimeout(timer);
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
  // const navigationRef = useRef(); 

  return (

    <>

      <SafeAreaView style={styles.container}>
        <StatusBar barStyle="dark-content" backgroundColor={"#FF4500"} translucent={false} /> 

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

                if (name === 'home' || name === 'sell' || name === 'profile' || name === 'chat' || name === 'deals') {
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
        {
          !is_connected && <NetworkCard checkInternet={checkInternet} /> 
        }
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
