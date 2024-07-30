import { useEffect, useState } from "react";
import { useLocation } from "react-router-dom";

const usePath = () => {

    let location = useLocation()
    // let [role, set_role] = useState('')

    let path = location.pathname.split('/')[1]
    if(path.split('.')[1] === 'signup' || path.split('.')[1] === 'login'){
        return(path.split('.')[1])
    }


 
  
     
  
}
 
export default usePath;