
import React, { useEffect, useState } from "react";
import { View, Text, StyleSheet, TouchableOpacity, ScrollView, Image } from "react-native";
import * as Contacts from 'expo-contacts';
import axios from 'axios';

export default function EventsScreen({ navigation }){

    const [data, setData] = useState([]);
    const [filteredData, setFilteredData] = useState([]);

    const apiKey = 'SHBWO06_NfmrA1bzhHuSZBYcYB0228f-XNkjAikQ2jTKdTY2Wj11b_HD1l6tYi_ZwQhTPQp1pPJLi_lTNZv2Msr2eTdUOIULGN66DPLwLflfGQlKWa05Yu45mWfOZHYx';

    const headers = {
        'Content-Type': 'application/json',
        Authorization: `Bearer ${apiKey}`
    };
    
    useEffect(() => {
        axios.get(`https://api.yelp.com/v3/events?limit=6&sort_by=asc&location=France`, {
        headers: headers
        })
        .then(response => {
        setData(response.data.events);
        // setFilteredData(response);
        })
        .catch(error => {
        console.error(error);
        });
    }, [])

    useEffect(() => {
        (async () => {
            const { status } = await Contacts.requestPermissionsAsync();
            if (status === 'granted') {
                const { data } = await Contacts.getContactsAsync({
                fields: [Contacts.Fields.Emails],
                });

                if (data.length > 0) {
                const contact = data[0];
                console.log(contact);
                }
            }
        })();
    }, []);

    // const fetchData = async (url, headers) => {

    //     try {
    //         const response = await fetch(url);
    //         console.log(response)
    //         const json = await response.json();
    //         setData(json.results);
    //         setFilteredData(json.results);
    //     } catch (error) {
    //         console.error(error);
    //     }
    // };

    // const searchFilterFunction = (text) => {
    //     if(text){  
    //         const newData = data.filter(item => {
    //             const itemData = item.name.first ? item.name.first.toUpperCase() : ''.toUpperCase();
    //             const textData = text.toUpperCase();
    //             return itemData.indexOf(textData) > -1;
    //         })
    //         setFilteredData(newData);
    //     } else {
    //         setFilteredData(data);
    //     }
    // }

    return (
        <ScrollView>
            <Text style={styles.textFriends}>{data.length} Résultats</Text>
            {
                data.map((item, index) => {
                    return (
                        <View key={index} style={styles.itemContainer}>
                            <Image
                                source={{ uri: item.image_url }}
                                style={styles.image}
                            />
                            <View>
                                <Text style={styles.textName}>{item.name}</Text>
                                <Text style={styles.textEmail}>{item.description}</Text>
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
        marginTop: 10,
    },
    image: {
        width: 50,
        height: 50,
        borderRadius: 25,
    },
    textName: {
        fontSize: 17,
        marginLeft: 10,
        fontWeight: "600",
    },
    textEmail: {
        fontSize: 14,
        marginLeft: 10,
        color: "grey",
    },
});