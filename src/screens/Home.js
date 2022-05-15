import React, { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { View, Text, FlatList, TouchableWithoutFeedback } from 'react-native';
import { Button, ActivityIndicator, Colors, FAB } from 'react-native-paper';
import styles from '../styles/screenStyles';
import { fetchProfiles, profilesSelector } from '../slices/profiles'


function HomeScreen({ navigation }) {
    const dispatch = useDispatch();
    const { profiles, loading, hasErrors } = useSelector(profilesSelector);
    console.log('print this please')
    console.log('profiles: ', profiles)
    useEffect(() => {
        dispatch(fetchProfiles())
    }, [dispatch]);
    const renderSeparator = () => {
        return (
            <View
                style={{
                    height: 1,

                    //width: "86%",
                    backgroundColor: '#CED0CE',
                    //marginLeft: "14%"
                }}
            />
        );
    };
    const FabComponent = () => (
        <FAB
            style={styles.fab}
            label='add profile'
            icon="plus"
            onPress={() => console.log('Pressed')}
        />
    );
    const renderProfiles = () => {
        if (loading) return <ActivityIndicator animating={true} color={Colors.red100} />
        if (hasErrors) return <Text>Cannot display profiles...</Text>
        return <FlatList
            data={profiles}
            ItemSeparatorComponent={renderSeparator}
            renderItem={({ item }) => (
                <TouchableWithoutFeedback onPress={() => navigation.navigate('ViewDetail', { item })}>
                    <View style={styles.listItemView}>
                        <Text style={styles.listItemText}>{item.name}</Text>
                        <Text style={styles.listItemText2}>{item.email}</Text>
                    </View>
                </TouchableWithoutFeedback>
            )}
        />
    }
    return (
        <View style={styles.homeView}>
            {renderProfiles()}
            {FabComponent()}
        </View>
    );
}

export default HomeScreen;