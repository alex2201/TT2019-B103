import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import { NavigationContainer } from '@react-navigation/native';
import * as React from 'react';
import CarritoNavigation from '../Carrito/CarritoNavigation';
import { Mapa } from '../Mapa';
import { Promociones } from '../Promociones';
import Icon from 'react-native-vector-icons/Ionicons';
import CuentaScreen from '../Cuenta/CuentaScreen';
import Globals from '../Globals';

const Tab = createBottomTabNavigator();

export default function TabBarPrincipal() {
  return (
    <NavigationContainer>
      <Tab.Navigator
        screenOptions={({ route }) => ({
          tabBarIcon: ({ color }) => {

            if (route.name === 'Carrito') {
              return <Icon name="cart-outline" size={30} color={color} />;
            } else if (route.name === 'Promociones') {
              return <Icon name="pricetag-outline" size={30} color={color} />;
            } else if (route.name === 'Mapa') {
              return <Icon name="map-outline" size={30} color={color} />;
            } else if (route.name === 'Cuenta') {
              return <Icon name="person-outline" size={30} color={color} />;
            }

            // You can return any component that you like here!
            return <Icon name="cart-outline" size={30} color="#900" />;
          },
        })}
        tabBarOptions={{
          activeTintColor: 'tomato',
          inactiveTintColor: 'gray',
        }}
      >
        <Tab.Screen name="Carrito" component={CarritoNavigation} />
        <Tab.Screen name="Promociones" component={Promociones} />
        <Tab.Screen name="Mapa" component={Mapa} />
        <Tab.Screen name="Cuenta" component={CuentaScreen} />
      </Tab.Navigator>
    </NavigationContainer>
  );
}