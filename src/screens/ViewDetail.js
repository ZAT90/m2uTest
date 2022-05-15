
import React, { useState } from 'react';
import { View, Text, TouchableWithoutFeedback } from 'react-native';
import styles from '../styles/screenStyles';


function ViewDetail({ route, navigation }) {
    const { item } = route.params;
    const renderProfileDetails = (title, info) => {
        return (
            <View style={{ marginTop: 20 }}>
                <Text style={styles.viewDetailTitle}>{title}</Text>
                <View style={styles.viewDetailItem}>
                    <Text>{info}</Text>
                </View>
            </View>
        )
    }
    return (
        <View style={styles.addDetailView}>
            {renderProfileDetails('Full Name', item.name)}
            {renderProfileDetails('UserName', item.username)}
            {renderProfileDetails('Phone', item.phone)}
            {renderProfileDetails('Email', item.email)}
            <TouchableWithoutFeedback onPress={() => navigation.navigate('ViewLocation', { companyName: item.company.name, location: item.address.geo })}>
                {renderProfileDetails('Location', 'Click to view location on map')}
            </TouchableWithoutFeedback>
        </View>
    );
}

export default ViewDetail;