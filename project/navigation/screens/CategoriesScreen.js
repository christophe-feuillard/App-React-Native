
import React, { useEffect, useState } from "react";
import { View, Text, StyleSheet, ScrollView, Image, Pressable } from "react-native";
import { API_KEY } from '@env';
import axios from 'axios';

export default function CategoriesScreen({ navigation }){

    const [data, setData] = useState([]);

    const apiKey = API_KEY;

    const headers = {
        'Content-Type': 'application/json',
        Authorization: `Bearer ${apiKey}`
    };
    
    useEffect(() => {
        axios.get(`https://api.yelp.com/v3/categories?limit=10`, {
        headers: headers
        })
        .then(response => {
        setData(response.data.categories);
        })
        .catch(error => {
        console.error(error);
        });
    }, [])

    return (
        <ScrollView>
            {
                data.map((item, index) => {
                    return (
                        <View key={index} style={styles.itemContainer}>
                            <View style={styles.lesTextes}>
                                <Text style={styles.textName}>{item.title}</Text>
                            </View>
                        </View>
                    )
                })
            }
        </ScrollView>
    );
}


const styles = StyleSheet.create({
    textFriends: {
        fontSize: 20,
        textAlign: 'left',
        marginLeft: 10,
        fontWeight: 'bold',
        marginTop: 10,
    },
    itemContainer: {
        flexDirection: 'row',
        alignItems: 'center',
        marginLeft: 10,
        marginTop: 20,
        width: "83%",
    },
    image: {
        width: 50,
        height: 50,
        borderRadius: 25,
    },
    textName: {
        fontSize: 17,
        fontWeight: "600",
    },
    textEmail: {
        fontSize: 14,
        color: "grey",
    },
    shareBtn: {
        marginTop: 10,
        alignItems: 'center',
        justifyContent: 'center',
        paddingVertical: 12,
        paddingHorizontal: 32,
        borderRadius: 4,
        backgroundColor: 'navy',
        textAlign: 'center',
        width: 140,
    },
    txtbutton: {
        fontSize: 13,
        lineHeight: 15,
        letterSpacing: 0.25,
        color: 'white',
    },
    lesTextes: {
        marginLeft: 10,
    },
    div1: {
        display: "flex",
        flexDirection: "row",
        width: 100,
    },
    description: {
        overflow: "hidden",
    },
    centeredView: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    marginTop: 22,
    },
    modalView: {
    margin: 20,
    backgroundColor: 'white',
    borderRadius: 10,
    padding: 35,
    alignItems: 'center',
    elevation: 5,
    },
    modalText: {
        marginBottom: 15,
        textAlign: 'center',
    },
    btnSection: {
        display: "flex",
        flexDirection: "row",
        justifyContent: "space-around",
    }
});