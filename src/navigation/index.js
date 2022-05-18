import * as React from 'react';
import { NavigationContainer } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import ViewDetail from '../screens/ViewDetail';
import HomeScreen from '../screens/Home';
import ViewLocation from '../screens/mapView/ViewLocation';

const Stack = createNativeStackNavigator();

export default function NavigationStack() {
    return (
        <NavigationContainer>
            <Stack.Navigator screenOptions={{ headerBackTitleVisible: false }}>
                <Stack.Screen name="Home" component={HomeScreen} />
                <Stack.Screen name="ViewDetail" component={ViewDetail} options={({ route }) => ({ title: route.params.name })}/>
                <Stack.Screen name="ViewLocation" component={ViewLocation} />
            </Stack.Navigator>
        </NavigationContainer>
    )
} 