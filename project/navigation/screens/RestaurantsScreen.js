import { StyleSheet, View, Text, Image } from 'react-native';
import * as Location from 'expo-location';
import { useEffect, useState } from 'react';
import axios from 'axios';
import MapView from 'react-native-maps';
import { Marker } from 'react-native-maps';

export default function RestaurantsScreen({ navigation }) {

    const [business, setBusiness] = useState(null);
    const [latitude, setLatitude] = useState("")
    const [longitude, setLongitude] = useState("")
    const [card, setCard] = useState()
    const [businessDetails, setBusinessDetails] = useState({
        name: '',
        review_count: undefined,
        rating: undefined,
        price: '',
        phone: undefined,
        image: '',
    });

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

            console.log(position.coords.latitude)
            console.log(position.coords.longitude)
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
                setBusinessDetails(businessDetails => ({
                    ...businessDetails,
                    name: response.data.name,
                    review_count: response.data.review_count,
                    rating: response.data.rating,
                    price: response.data.price,
                    phone: response.data.display_phone,
                    image: response.data.image_url,
                }));
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
            <View style={styles.imgdiv}>
                <Image
                    source={businessDetails.image ? { uri: businessDetails.image } : null}
                    style={styles.image}
                />
            </View>
            <View>
                <Text style={styles.cardTitle}>{businessDetails.name}</Text> 
                <Text style={styles.cardtxt}>{businessDetails.review_count} Avis</Text> 
                <Text style={styles.cardtxt}>{businessDetails.rating}/5</Text> 
                <Text style={styles.cardtxt}>{businessDetails.price}</Text> 
                <Text style={styles.cardtxt}>{businessDetails.phone}</Text> 
            </View>
        </View>
        }
    
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
    height: 100,
    width: '80%',
    position: 'absolute',
    backgroundColor: '#F3EFEF',
    display: 'flex',
    flexDirection: 'row',
  },
  image: {
  borderRadius: 10,
    width: 150,
    height: '100%',
    },
  imgdiv: {
    padding: 5,
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
});