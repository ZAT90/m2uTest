
import React, { useState } from 'react';
import { View, Text, TouchableWithoutFeedback, ScrollView } from 'react-native';
import { Colors, TextInput, Divider } from 'react-native-paper';
import styles from '../styles/screenStyles';


function ViewDetail({ route, navigation }) {
    const { item } = route.params;
    const renderProfileDetails = (title, info) => {
        return (
            <View style={{ marginTop: 20 }}>
                <Text style={styles.viewDetailTitle}>{title}</Text>
                <View style={styles.viewDetailItem}>
                    <TextInput editable={false} underlineColor='transparent' style={{ height: 20, backgroundColor: Colors.white }} value={info} />
                </View>
            </View>
        )
    }
    return (
        <ScrollView contentContainerStyle={{ alignItems: 'center' }} style={styles.addDetailView}>
            <View style={{ paddingBottom: 40 }}>
                {renderProfileDetails('Full Name', item.name)}
                {renderProfileDetails('UserName', item.username)}
                {renderProfileDetails('Phone', item.phone)}
                {renderProfileDetails('Email', item.email)}
                {renderProfileDetails('Company Name', item.company.name)}
                <TouchableWithoutFeedback onPress={() => navigation.navigate('ViewLocation', { companyName: item.company.name, location: item.address.geo })}>
                    {renderProfileDetails('Location', 'Click to view location on map')}
                </TouchableWithoutFeedback>
                {renderProfileDetails('Catch Phrase', item.company.catchPhrase)}
                {renderProfileDetails('Slogan', item.company.bs)}
                <View style={{ flexDirection: 'row', marginTop: 20 }}>
                    <View style={styles.dividerView} />
                    <Text style={{ alignSelf: 'center', paddingHorizontal: 5, fontSize: 18 }}>Adress</Text>
                    <View style={styles.dividerView} />
                </View>
                {renderProfileDetails('City', item.address.city)}
                {renderProfileDetails('Street', item.address.street)}
                {renderProfileDetails('Suite', item.address.suite)}
                {renderProfileDetails('Zip Code', item.address.zipcode)}
            </View>
        </ScrollView>
    );
}

export default ViewDetail;