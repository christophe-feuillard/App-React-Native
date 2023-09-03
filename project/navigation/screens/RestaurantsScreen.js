import { StyleSheet, View, Text, Image, Modal, Pressable, ScrollView } from 'react-native';
import * as Location from 'expo-location';
import { useEffect, useState, useRef } from 'react';
import axios from 'axios';
import MapView from 'react-native-maps';
import { Marker } from 'react-native-maps';
import { useNavigation } from '@react-navigation/native';

export default function RestaurantsScreen() {
    const [business, setBusiness] = useState(null);
    const [latitude, setLatitude] = useState("")
    const [longitude, setLongitude] = useState("")
    const [card, setCard] = useState()
    const [modalVisible, setModalVisible] = useState(false);
    const [businessDetails, setBusinessDetails] = useState({
        name: '',
        review_count: undefined,
        rating: undefined,
        price: '',
        image: '',
    });
    const [businessPhotos, setBusinessPhotos] = useState([])

    const navigation = useNavigation();
    const apiKey = 'SHBWO06_NfmrA1bzhHuSZBYcYB0228f-XNkjAikQ2jTKdTY2Wj11b_HD1l6tYi_ZwQhTPQp1pPJLi_lTNZv2Msr2eTdUOIULGN66DPLwLflfGQlKWa05Yu45mWfOZHYx';
    const headers = {
        'Content-Type': 'application/json',
        Authorization: `Bearer ${apiKey}`
    };
    const mapStyle = [
        {
            "elementType": "geometry",
            "stylers": [
            {
                "color": "#242f3e"
            }
            ]
        },
        {
            "elementType": "labels.text.fill",
            "stylers": [
            {
                "color": "#746855"
            }
            ]
        },
        {
            "elementType": "labels.text.stroke",
            "stylers": [
            {
                "color": "#242f3e"
            }
            ]
        },
        {
            "featureType": "administrative.locality",
            "elementType": "labels.text.fill",
            "stylers": [
            {
                "color": "#d59563"
            }
            ]
        },
        {
            "featureType": "poi",
            "elementType": "labels.text.fill",
            "stylers": [
            {
                "color": "#d59563"
            }
            ]
        },
        {
            "featureType": "poi.park",
            "elementType": "geometry",
            "stylers": [
            {
                "color": "#263c3f"
            }
            ]
        },
        {
            "featureType": "poi.park",
            "elementType": "labels.text.fill",
            "stylers": [
            {
                "color": "#6b9a76"
            }
            ]
        },
        {
            "featureType": "road",
            "elementType": "geometry",
            "stylers": [
            {
                "color": "#38414e"
            }
            ]
        },
        {
            "featureType": "road",
            "elementType": "geometry.stroke",
            "stylers": [
            {
                "color": "#212a37"
            }
            ]
        },
        {
            "featureType": "road",
            "elementType": "labels.text.fill",
            "stylers": [
            {
                "color": "#9ca5b3"
            }
            ]
        },
        {
            "featureType": "road.highway",
            "elementType": "geometry",
            "stylers": [
            {
                "color": "#746855"
            }
            ]
        },
        {
            "featureType": "road.highway",
            "elementType": "geometry.stroke",
            "stylers": [
            {
                "color": "#1f2835"
            }
            ]
        },
        {
            "featureType": "road.highway",
            "elementType": "labels.text.fill",
            "stylers": [
            {
                "color": "#f3d19c"
            }
            ]
        },
        {
            "featureType": "transit",
            "elementType": "geometry",
            "stylers": [
            {
                "color": "#2f3948"
            }
            ]
        },
        {
            "featureType": "transit.station",
            "elementType": "labels.text.fill",
            "stylers": [
            {
                "color": "#d59563"
            }
            ]
        },
        {
            "featureType": "water",
            "elementType": "geometry",
            "stylers": [
            {
                "color": "#17263c"
            }
            ]
        },
        {
            "featureType": "water",
            "elementType": "labels.text.fill",
            "stylers": [
            {
                "color": "#515c6d"
            }
            ]
        },
        {
            "featureType": "water",
            "elementType": "labels.text.stroke",
            "stylers": [
            {
                "color": "#17263c"
            }
            ]
        }
    ]

    useEffect(() => {
        (async() => {

            let { status } = await Location.requestForegroundPermissionsAsync()

            const position = await Location.getCurrentPositionAsync()
            setLatitude(position.coords.latitude)
            setLongitude(position.coords.longitude)
        })()

    }, [])

    useEffect(() => {
        if (latitude !== "" && longitude !== "") {
            axios.get(`https://api.yelp.com/v3/businesses/search?latitude=${latitude}&longitude=${longitude}`, {
            headers: headers
            })
            .then(response => {
            setBusiness(response.data.businesses);
            })
            .catch(error => {
            console.error(error);
            });
        }
    }, [latitude, longitude]) // latitude et longitude = mes dépendances

    const showBusinessDetails = (id) => {
        if (latitude !== "" && longitude !== "") {
            axios.get(`https://api.yelp.com/v3/businesses/${id}`, {
            headers: headers
            })
            .then(response => {
                setCard(true);
                setBusinessPhotos(response.data.photos)
                setBusinessDetails(businessDetails => ({
                    ...businessDetails,
                    name: response.data.name,
                    review_count: response.data.review_count,
                    rating: response.data.rating,
                    price: response.data.price,
                    image: response.data.image_url,
                }));
                console.log(businessPhotos)
            })
            .catch(error => {
            console.error(error);
            });
        }
    }

    return (
    <View style={styles.container}>
        <MapView
        showsUserLocation={true} 
        style={{height: '100%', width: '100%'}} 
        customMapStyle={mapStyle} 
        > 
        {business?.map((business, index) => (
            <Marker
            key={index}
            coordinate={business.coordinates}
            title={business.name}
            image={business.image}
            tappable={true}
            onPress={() => showBusinessDetails(business.id)}
            />
        ))}
        </MapView>

        {card && 
        <View style={styles.card}>
            <View style={styles.textDiv}>
                <Text style={styles.cardTitle}>{businessDetails.name}</Text> 
                <Text style={styles.cardtxt}>{businessDetails.review_count} Avis</Text> 
                <Text style={styles.cardtxt}>{businessDetails.rating}/5</Text> 
                <Text style={styles.cardtxt}>{businessDetails.price}</Text> 
                { businessPhotos ? 
                <Pressable
                    style={styles.openModalBtn}
                    onPress={() => setModalVisible(true)}
                >
                    <Text style={styles.txtbutton}>VOIR LES PHOTOS</Text>
                </Pressable> : null
                }
            </View>
            <View style={styles.imgdiv}>
                <Image
                    source={businessDetails.image ? { uri: businessDetails.image } : null}
                    style={styles.image}
                />
            </View>
        </View>
        }

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
                    <ScrollView style={styles.modalScrollView} horizontal={true}>
                    { businessPhotos?.map((image, index) => (
                        <View style={styles.imgDivModal} key={index}>
                            <Image
                                source={image ? { uri: image } : null}
                                style={styles.imgModal}
                            />
                        </View>
                    ))}
                    </ScrollView>
                    <View style={styles.twoButton}>
                            <Pressable
                                style={styles.shareBtn}
                                onPress={() => navigation.navigate('CameraScreen')}>
                                <Text style={styles.txtbutton}>Prendre une photo</Text>
                            </Pressable>
                        <Pressable
                            style={styles.shareBtn}
                            onPress={() => setModalVisible(!modalVisible)}>
                            <Text style={styles.txtbutton}>Fermer</Text>
                        </Pressable>   
                    </View>
                </View>
            </View>
        </Modal>
    </View>
    );
}

const styles = StyleSheet.create({
    container: {
        height: '100%',
        flex: 1,
        backgroundColor: '#fff',
        alignItems: 'center',
        justifyContent: 'center',
    },
    card: {
        borderRadius: 10,
        top: '75%',
        height: 150,
        width: '85%',
        position: 'absolute',
        backgroundColor: '#F3EFEF',
        display: 'flex',
        flexDirection: 'row',
        // justifyContent: "space-around"
    },
    image: {
        borderRadius: 10,
        width: 150,
        height: '100%',
    },
    imgdiv: {
        padding: 10,
        maxWidth: 100,
        maxHeight: 150,
    },
    imgDivModal: {
        padding: 5,
        width: 120,
        height: 120,
    },
    imgModal: {
        width: "100%",
        height: "100%",
    },
    textDiv: {
        padding: 10,
        maxWidth: 200,
    },
    cardtxt: {
        fontSize: 14,
        marginLeft: 10,
    },
    cardTitle: {
        fontSize: 16,
        color: 'navy',
        fontWeight: "bold",
        marginLeft: 10,
    },
    openModalBtn: {
        marginTop: 10,
        alignItems: 'center',
        justifyContent: 'center',
        paddingVertical: 12,
        paddingHorizontal: 20,
        borderRadius: 4,
        backgroundColor: 'black',
        textAlign: 'center',
        width: 160,
    },
    txtbutton: {
        fontSize: 13,
        lineHeight: 15,
        letterSpacing: 0.25,
        color: 'white',
    },
    centeredView: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
        marginTop: 22,
    },
    modalView: {
        maxWidth: '85%',
        maxHeight: 210,
        backgroundColor: '#F3EFEF',
        borderRadius: 10,
        padding: 15,
        alignItems: 'center',
        elevation: 5,
        display: "flex",
        flexWrap: "wrap",
    },
    // modalScrollView: {
    //     height: '200',
    // },
    modalText: {
        marginBottom: 15,
        textAlign: 'center',
    },
    test: {
        color: 'white',
    },
    shareBtn: {
        marginTop: 10,
        alignItems: 'center',
        paddingVertical: 12,
        paddingHorizontal: 12,
        borderRadius: 4,
        backgroundColor: 'black',
        textAlign: 'center',
    },
    twoButton: {
        display: 'flex',
        flexDirection: 'row',
        justifyContent: 'space-around',
        width: 300,
        height: 50,
    }
});