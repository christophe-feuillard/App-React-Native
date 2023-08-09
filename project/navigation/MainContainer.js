import * as React from 'react';
import { NavigationContainer } from '@react-navigation/native';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import Ionicons from 'react-native-vector-icons/Ionicons';

// Screens
import RestaurantsScreen from './screens/RestaurantsScreen';
import EventsScreen from './screens/EventsScreen';
import SettingsScreen from './screens/SettingsScreen';

// Screen names
const restaurantsScreen = "Restaurants";
const eventsScreen = "Evénements";
const settingsName = "Settings";

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

            } else if (rn === settingsName) {
              iconName = focused ? 'settings' : 'settings-outline';
            }

            // You can return any component that you like here!
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
        <Tab.Screen name={settingsName} component={SettingsScreen} />

      </Tab.Navigator>
    </NavigationContainer>
  );
}

export default MainContainer;