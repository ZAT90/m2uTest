import React, { useEffect, useState } from 'react';
import { View, Text, TouchableWithoutFeedback } from 'react-native';
import MapView, { PROVIDER_GOOGLE, Marker } from 'react-native-maps';
function ViewLocation({ route, navigation }) {
    const { companyName, location } = route.params;
    23.790702301112145, 90.40840483238428
    const [mapRegion, setmapRegion] = useState({
        latitude: parseFloat(location.lat),
        longitude: parseFloat(location.lng),
        latitudeDelta: 0.0922,
        longitudeDelta: 0.0421,
    });
    return (
        <View>
            <MapView
                provider={PROVIDER_GOOGLE}
                region={mapRegion}
                showsUserLocation={true}
                style={{ height: '100%', width: '100%' }} >
                <Marker coordinate={mapRegion} title={companyName} />
            </MapView>
        </View>
    )
}

export default ViewLocation