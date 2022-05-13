import * as React from 'react';
import { NavigationContainer } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import AddDetail from '../screens/AddDetail';
import HomeScreen from '../screens/Home';

const Stack = createNativeStackNavigator();

export default function NavigationStack() {
    return (
        <NavigationContainer>
            <Stack.Navigator>
                <Stack.Screen name="Home" component={HomeScreen} />
                <Stack.Screen name="AddDetail" component={AddDetail} />
            </Stack.Navigator>
        </NavigationContainer>
    )
} 