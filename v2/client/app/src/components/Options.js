import { useEffect, useState } from "react";
import { StyleSheet, Text, TouchableOpacity, View } from "react-native";
import Ionicons from 'react-native-vector-icons/Ionicons';
import api from "../api/Api";
import { useDispatch, useSelector } from "react-redux";
import { set_option } from "../../redux/option";
export default function Options(){

    let dispatch = useDispatch();

    return(
        <>
            <View style={styles.container}>
                {
                    [
                        {text: "Products", svg: "cube", data: []},
                        {text: "Lodges", svg: "bed", data: []},
                        {text: "Services", svg: "construct", data: []}
                    ].map((option, index) => {
                        return(
                            <TouchableOpacity onPress={e => {
                                dispatch(set_option(option.text))
                            }} key={index} style={styles.btn}>
                                <Ionicons name={option.svg} color={"#FFA500"} size={20} />
                                <Text style={styles.txt}>{option.text}</Text>
                            </TouchableOpacity>
                        )
                    })
                }
            </View>
        </>
    )
}


const styles = StyleSheet.create({
    container:{
        height: 65,
        width: "100%",
        backgroundColor: "#fff",
        display: "flex",
        flexDirection: "row",
        justifyContent: "space-between",
        alignItems: "center",
        paddingVertical: 15
    },
    btn:{
        width: "33%",
        height: "100%",
        display: "flex",
        justifyContent: "space-between",
        alignItems: "center",
        borderRadius: 5
    },
    txt: {
        fontSize: 12, 
        fontWeight: "500",
        color: "#000"
    }
})