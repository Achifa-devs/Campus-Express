import { useNavigate } from 'react-router-dom'
import menuSvg from '../../../assets/menu-alt-01-svgrepo-com.svg'
import { useEffect, useState } from 'react'

const Menu = ({handleMenu}) => {
    let navigate = useNavigate()

    let [screenWidth, setScreenWidth] = useState(0)
    let [activeHead, setActiveHead] = useState('')

    useEffect(() => { 
        let width = window.innerWidth;
        setScreenWidth(width)
    }, [])
    return ( 
        <>
            <button onClick={handleMenu} style={{display: screenWidth <= 760 ? 'block' : 'none', float: 'right', width: '50px', outline: 'none', border: 'none', marginTop: '4px',  padding: '10px', borderRadius: '5px', background: '#fff', color: '#fff', position: 'absolute', right: '10px', }}>
                <img src={menuSvg} style={{height: '20px', width: '20px', marginBottom: '5px'}} alt="" />
            </button>
        </>
     );
}
 
export default Menu;