import { StyleSheet, Text, View } from 'react-native';
import * as Location from 'expo-location';
import { useEffect, useState } from 'react';
import MapView from 'react-native-maps';
import axios from 'axios';
import { Marker } from 'react-native-maps';

export default function HomeScreen({ navigation }) {

    const [business, setBusiness] = useState(null);
    const [latitude, setLatitude] = useState("")
    const [longitude, setLongitude] = useState("")
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

            if (status == 'granted') {
                console.log('permission succesful')
            } else {
                console.log('permi non autorisé')
            }

            const position = await Location.getCurrentPositionAsync()
            console.log(position)

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
            // console.log(business);
            })
            .catch(error => {
            console.error(error);
            });
        }
    }, [latitude, longitude]) // latitude et longitude = mes dépendances

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
            />
        ))}
        </MapView>
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
});