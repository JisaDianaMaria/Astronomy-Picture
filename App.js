import React from 'react';
import { Provider } from 'react-redux';
import { NavigationContainer } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import WelcomeScreen from './src/screens/WelcomeScreen';
import GalleryScreen from './src/screens/GalleryScreen';
import DetailsScreen from './src/screens/DetailsScreen';  
import { commonHeaderOptions } from './src/styles/WelcomeScreenStyles.js'; 
import store from './src/store.js';


const Stack = createNativeStackNavigator();

const screens = [
  { name: 'Welcome', component: WelcomeScreen, title: 'Astronomy Picture of the Day' },
  { name: 'Gallery', component: GalleryScreen, title: 'Gallery' },
  { name: 'Details', component: DetailsScreen, title: 'Details' }
];

export default function App() {
  return (
    <Provider store={store}>
      <NavigationContainer>
        <Stack.Navigator initialRouteName="Welcome">
          {screens.map(({ name, component, title }) => (
            <Stack.Screen 
              key={name} 
              name={name} 
              component={component} 
              options={{ title, ...commonHeaderOptions }} 
            />
          ))}
        </Stack.Navigator>
      </NavigationContainer>
    </Provider>
  );
}
