
import React, { useEffect, useState } from "react";
import { View, Text, StyleSheet, ScrollView, Image, Pressable, Share, Modal, Alert } from "react-native";
import * as Contacts from 'expo-contacts';
import axios from 'axios';

export default function EventsScreen({ navigation }){

    const [modalVisible, setModalVisible] = useState(false);
    const [data, setData] = useState([]);
    const [eventDetails, setEventDetails] = useState({
        description: '',
        cost: '',
    });

    const apiKey = 'SHBWO06_NfmrA1bzhHuSZBYcYB0228f-XNkjAikQ2jTKdTY2Wj11b_HD1l6tYi_ZwQhTPQp1pPJLi_lTNZv2Msr2eTdUOIULGN66DPLwLflfGQlKWa05Yu45mWfOZHYx';

    const headers = {
        'Content-Type': 'application/json',
        Authorization: `Bearer ${apiKey}`
    };
    
    useEffect(() => {
        axios.get(`https://api.yelp.com/v3/events?limit=10&sort_by=asc&sort_on=popularity&location=France`, {
        headers: headers
        })
        .then(response => {
        setData(response.data.events);
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
                // console.log(contact);
                }
            }
        })();
    }, []);

    const shareData = async (url) => {
        try {
           await Share.share({message: url});
        } catch (err) {
            console.log(err);
        }
    };

    const fetchEventDetails = (id) => {

        if(eventDetails === eventDetails) {     
            setModalVisible(true);

            axios.get(`https://api.yelp.com/v3/events/${id}`, {
            headers: headers
            })
            .then(response => {
                setEventDetails(eventDetails => ({
                    ...eventDetails,
                    description: response.data.description,
                    cost: response.data.cost,
                }));
            })
            .catch(error => {
            console.error(error);
            });
        }
    }

    return (
        <ScrollView>
            <Text style={styles.textFriends}>{data.length} Résultats - à Paris</Text>
            {
                data.map((item, index) => {
                    return (
                        <View key={index} style={styles.itemContainer}>
                            <Image
                                source={item.image_url ? { uri: item.image_url } : null}
                                style={styles.image}
                            />
                            <View style={styles.lesTextes}>
                                <Text style={styles.textName}>{item.name}</Text>
                                <View style={styles.div1}>
                                    <Text style={styles.textEmail}>{item.location.city}</Text>
                                </View>
                                <Text style={styles.paragraphe}>{item.description}</Text>
                                <View style={styles.btnSection}>                      
                                    <Pressable
                                        style={styles.shareBtn}
                                        color="navy"
                                        onPress={async () => {
                                        await shareData(item.event_site_url);
                                        }}
                                    >
                                        <Text style={styles.txtbutton}>PARTAGER</Text>
                                    </Pressable>
                                    <Pressable
                                        style={styles.shareBtn}
                                        onPress={() => fetchEventDetails(item.id)}
                                    >
                                        <Text style={styles.txtbutton}>INFO</Text>
                                    </Pressable>
                                </View>
                            </View>
                            <Modal
                                animationType="fade"
                                transparent={true}
                                visible={modalVisible}
                                onRequestClose={() => {
                                setModalVisible(!modalVisible);
                                }}
                            >
                                <View style={styles.centeredView}>
                                    <View style={styles.modalView}>
                                        {eventDetails.cost ? <Text style={styles.modalText}>{eventDetails.cost} euro </Text> : null}
                                        <Text style={styles.modalText}>{eventDetails.description}</Text>
                                        <Pressable
                                            style={styles.shareBtn}
                                            onPress={() => setModalVisible(!modalVisible)}>
                                            <Text style={styles.txtbutton}>Fermer</Text>
                                        </Pressable>
                                    </View>
                                </View>
                            </Modal>
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