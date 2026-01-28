import { useCallback, useEffect, useState } from "react"
import { Image, StyleSheet, View } from "react-native"

export default function Banner(){
    const banners = [
        {url: ""},
        {url: ""},
        {url: ""}
    ]

    const [activeBanner, setActive] = useState(0);
    
    useEffect(() => {
        const interval = setInterval(() => {
            setActive(prev => {
                if(prev === (banners.length - 1)){
                    return 0;
                }
                return prev + 1;
            });
        }, 2000);
        
        return () => clearInterval(interval);
    }, [banners.length])

    const renderCarousel = useCallback((item) => {
        return (
            <View style={styles.carousel}>
                <Image source={{uri: item.url}} style={{height: "100%", width: "100%"}} />
            </View>
        );
    }, [])

    return(
        <>
            <View style={styles.container}>
                {renderCarousel(banners[activeBanner])}

            </View>
        </>
    )
}


const styles = StyleSheet.create({
    container:{
        height: 150,
        width: "100%",
        backgroundColor: "#fff",
        // padding: 5
    },
    carousel:{
        width: "100%",
        height: "100%",
        borderRadius: 5
    },
    // indicator: {
    //     fontSize: 14, 
    //     fontWeight: "bold",

    // }
})