import CookieManager from "@react-native-cookies/cookies";
import { createNativeStackNavigator } from "@react-navigation/native-stack";
import { useDispatch } from "react-redux";
import { getData } from "./AsyncStore.js";
import { set_user } from "../../../../redux/vendor/user.js";

function Shop() {
  let dispatch = useDispatch()
  let Stack = createNativeStackNavigator()

  let {
    cookie
  } = useSelector(s => s.cookie);

  useEffect(() => {
    CookieManager.get('https://campussphere.net')
    .then((result) => {
      if(result.jwt_token.value !== null && result.jwt_token.value !== '') {
        dispatch(set_cookie(true))
      }else{
        dispatch(set_cookie(false))
      }
    })
    .catch(err => console.log(err))
  }, [])
  
  useEffect(() => {
    async function get_user() {
      let data = await getData('user');
      if (data) { 
        dispatch(set_user(JSON.parse(data)))
      }
    }
    if (cookie) {
      get_user() 
    }
  }, [cookie]) 
  
  return (
    <>
        
      <StackNavigator />
    </>
  )
}
