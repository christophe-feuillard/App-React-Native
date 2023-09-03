import * as React from 'react';
import { NavigationContainer } from '@react-navigation/native';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import Ionicons from 'react-native-vector-icons/Ionicons';

import RestaurantsScreen from './screens/RestaurantsScreen';
import EventsScreen from './screens/EventsScreen';
import CameraScreen from './screens/CameraScreen';
import CategoriesScreen from './screens/CategoriesScreen';

const restaurantsScreen = "Restaurants";
const eventsScreen = "Evénements populaires";
const cameraScreen = "Camera";
const categoriesScreen = "Catégories";

const Tab = createBottomTabNavigator();

function MainContainer() {
  return (
    <NavigationContainer>
      <Tab.Navigator
        initialRouteName={restaurantsScreen}
        screenOptions={({ route }) => ({
          tabBarIcon: ({ focused, color, size }) => {
            let iconName;
            let rn = route.name;

            if (rn === restaurantsScreen) {
              iconName = focused ? 'restaurant' : 'restaurant-outline';
            } else if (rn === eventsScreen) {
              iconName = focused ? 'calendar' : 'calendar';
            } else if (rn === cameraScreen) {
              iconName = focused ? 'camera' : 'camera-outline';
            } else if (rn === categoriesScreen) {
              iconName = focused ? 'apps' : 'apps-outline';
            }

            return <Ionicons name={iconName} size={size} color={color} />;
          },
          "tabBarActiveTintColor": "navy",
          "tabBarInactiveTintColor": "grey",
          "tabBarLabelStyle": {
            "paddingBottom": 2,
            "fontSize": 12
            },
          "tabBarStyle": [
            {
              "display": "flex"
            },
            null
          ]
        })}
      >

        <Tab.Screen name={restaurantsScreen} component={RestaurantsScreen} />
        <Tab.Screen name={eventsScreen} component={EventsScreen} />
        <Tab.Screen name={cameraScreen} component={CameraScreen} />
        <Tab.Screen name={categoriesScreen} component={CategoriesScreen} />

      </Tab.Navigator>
    </NavigationContainer>
  );
}

export default MainContainer;