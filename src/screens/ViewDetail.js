
import React, { useState, useRef, useEffect } from 'react';
import { View, Text, ScrollView, Image, TouchableOpacity, Button, TextInput, Alert, Linking } from 'react-native';
import { Colors, Divider } from 'react-native-paper';
import styles from '../styles/screenStyles';
import * as Location from 'expo-location';
import * as Permissions from 'expo-permissions';
import { useForm, useController, Controller } from 'react-hook-form'
import { useDispatch, useSelector } from 'react-redux';
import { fetchProfiles, profilesSelector, addNewProfile } from '../slices/profiles'

function ProfileInput({ name, info, isOptional, control, rules, ref, keyboardType = 'default', onSubmitEditing, isAddingProfile, ...rest }) {
    const { field, fieldState } = useController({
        control,
        name,
        rules
    })
    return (
        <View style={{ marginTop: 20 }}>
            <Text style={styles.viewDetailTitle}>{name} {!isOptional && isAddingProfile ? '*' : ''}</Text>
            <View style={styles.viewDetailItem}>
                <TextInput
                    ref={ref}
                    keyboardType={keyboardType}
                    onSubmitEditing={onSubmitEditing}
                    {...rest}
                    editable={isAddingProfile}
                    disabledInputStyle={{ color: Colors.red, opacity: 1 }}
                    underlineColor='transparent'
                    onChangeText={field.onChange}
                    style={[styles.inputStyle, fieldState.error && { borderColor: 'red' }]}
                    value={isAddingProfile ? field.value : info} />
            </View>
        </View>
    )
}

function ViewDetail({ route, navigation }) {
    const { item, isAddingProfile, profiles } = route.params;
    const [profile, setProfile] = useState(item);
    const dispatch = useDispatch();
    const { control, handleSubmit, getValues } = useForm()
    const [currentloc, setCurrentloc] = useState({ lat: 0.0, lng: 0.0 })

    const fullnameInput = useRef()
    const usernameInput = useRef()
    const phoneInput = useRef()
    //const onSubmit = (data, e) => console.log(data, e);
    const onSubmit = data => {
        console.log('getValues: ', getValues()['Phone']);
        profile.id = profiles.length + 1;
        profile.name = getValues()['Full Name'];
        profile.username = getValues()['UserName'];
        profile.phone = getValues()['Phone'];
        profile.email = getValues()['Email'];
        profile.website = getValues()['Company Website'] != undefined ? getValues()['Company Website'] : '';;
        profile.company.name = getValues()['Company Name'] != undefined ? getValues()['Company Name'] : '';
        profile.company.catchPhrase = getValues()['Catch Phrase'];
        profile.company.bs = getValues()['Slogan'];
        profile.address.geo.lat = currentloc.lat;
        profile.address.geo.lng = currentloc.lng;
        profile.address.city = getValues()['City'];
        profile.address.street = getValues()['Street'];
        profile.address.zipcode = getValues()['Zip Code'];
        profile.address.suite = getValues()['Suite'] != undefined ? getValues()['Suite'] : '';

        console.log('profile: ', profile);
        dispatch(addNewProfile(profile));
        Alert.alert('Form Submitted!', JSON.stringify(data), [{ text: 'OK' }])

    }

    // const onError = (errors, e) => console.log(errors);
    const onError = (errors, e) => {
        console.log('getValues error: ', getValues());

        Alert.alert('Form submission error!', 'Please submit all the required * fields', [{ text: 'OK' }])
    }
    console.log('profile: ', profile)
    console.log('profiles: ', profiles.length)
    // console.log('current location before set: ', currentloc);

    // console.log('onSubmit: ',onSubmit)
    const checkLocationPermission = async () => {
        try {
            let { status } = await Location.requestForegroundPermissionsAsync();
            console.log('status: ', status);
            if (status !== 'granted') {
                Alert.alert(
                    "Insufficient permissions!",
                    "Sorry, we need location permissions to make this work!",
                    [
                        {
                            text: "Okay", onPress: () => {
                                Linking.openSettings();

                            }
                        },
                        { text: "Cancel", onPress: () => navigation.goBack() }], { cancelable: false }

                );
                return;
            }
            let location = await Location.getCurrentPositionAsync({ accuracy: Location.Accuracy.Highest, maximumAge: 10000 });
            console.log('location: ', location);
            let newLocation = { lat: location.coords.latitude, lng: location.coords.longitude }
            setCurrentloc(prevState => ({ ...prevState, lat: location.coords.latitude, lng: location.coords.longitude }))
            // this.updateState(location);
        } catch (error) {
            console.log('error: ', error);
        }
    }
    useEffect(() => {
        if (isAddingProfile) {
            checkLocationPermission();
        }

    }, [])


    const renderCurrentLocation = () => {
        return (
            <View style={{ marginTop: 20, height: 70 }}>
                <Text style={styles.viewDetailTitle}>Your current Location</Text>
                <View style={{ flexDirection: 'row', flex: 1, marginTop: 10, marginLeft: 15 }}>
                    <View style={{ flex: 0.5, flexDirection: 'row', }}>
                        <Text style={styles.locationText}>Latitude: </Text>
                        <Text>{currentloc.lat != 0 ? currentloc.lat : ''}</Text>
                    </View>
                    <View style={{ flex: 0.5, flexDirection: 'row', }}>
                        <Text style={styles.locationText}>Longitude</Text>
                        <Text>{currentloc.lng != 0 ? currentloc.lng : ''}</Text>
                    </View>

                </View>

            </View>
        )
    }
    return (
        <View>
            <ScrollView contentContainerStyle={{ alignItems: 'center' }} style={styles.addDetailView}>
                <View style={styles.viewDetailTopView}>
                    {/* <ProfileInput isAddingProfile={isAddingProfile} rules={{ required: true }} name='Full Name' info={item.name} control={control} /> */}
                    {/* <Button title='Submit' onPress={handleSubmit(onSubmit)}/> */}
                    {isAddingProfile ? <View /> : <View style={styles.viewDetailImgView}>
                        <Image style={styles.image} source={{ uri: 'https://i.pravatar.cc/300' }} />
                    </View>}
                    <ProfileInput ref={fullnameInput} onSubmitEditing={() => usernameInput.current.focus()} isAddingProfile={isAddingProfile} rules={{ required: true }} name='Full Name' info={item.name} control={control} />
                    <ProfileInput ref={usernameInput} isAddingProfile={isAddingProfile} rules={{ required: true }} name='UserName' info={item.username} control={control} />
                    <ProfileInput ref={phoneInput} keyboardType='phone-pad' isAddingProfile={isAddingProfile} rules={{ required: true }} name='Phone' info={item.phone} control={control} />
                    <ProfileInput keyboardType='email-address' isAddingProfile={isAddingProfile} rules={{ required: true }} name='Email' info={item.email} control={control} />
                    <ProfileInput isAddingProfile={isAddingProfile} name='Company Name' info={item.company.name} control={control} isOptional={true} />
                    <ProfileInput isAddingProfile={isAddingProfile} name='Company Website' info={item.website} control={control} isOptional={true} />
                    {isAddingProfile ? renderCurrentLocation() : <TouchableOpacity
                        onPress={() => navigation.navigate('ViewLocation', { companyName: item.company.name, location: item.address.geo })}>
                        <View style={{ marginTop: 20 }}>
                            <Text style={styles.viewDetailTitle}>Location</Text>
                            <View style={styles.viewDetailItem}>
                                <Text style={{ height: 20, backgroundColor: Colors.white, marginLeft: 10 }}>Click to view location on map </Text>

                            </View>
                        </View>
                    </TouchableOpacity>}
                    <ProfileInput isAddingProfile={isAddingProfile} rules={{ required: true }} name='Catch Phrase' info={item.company.catchPhrase} control={control} />
                    <ProfileInput isAddingProfile={isAddingProfile} rules={{ required: true }} name='Slogan' info={item.company.bs} control={control} />
                    <View style={{ flexDirection: 'row', marginTop: 20 }}>
                        <View style={styles.dividerView} />
                        <Text style={{ alignSelf: 'center', paddingHorizontal: 5, fontSize: 18 }}>Adress</Text>
                        <View style={styles.dividerView} />
                    </View>
                    <ProfileInput isAddingProfile={isAddingProfile} name='City' rules={{ required: true }} info={item.address.city} control={control} />
                    <ProfileInput isAddingProfile={isAddingProfile} name='Street' rules={{ required: true }} info={item.address.street} control={control} />
                    <ProfileInput isAddingProfile={isAddingProfile} name='Suite' info={item.address.suite} control={control} isOptional={true} />
                    <ProfileInput isAddingProfile={isAddingProfile} name='Zip Code' rules={{ required: true }} info={item.address.zipcode} control={control} />

                    {/* <Button
                    labelStyle={{ color: "white", fontSize: 18 }}
                    style={styles.submitButton}
                    onPress={()=> handleSubmit(onSubmit)}
                >
                    Add
                </Button> */}
                </View>


            </ScrollView>
            {isAddingProfile ? <View style={styles.submitButton}>
                <Button
                    onPress={handleSubmit(onSubmit, onError)}
                    title="Add New Profile"
                    color={Colors.white}
                    accessibilityLabel="Learn more about this purple button"
                /></View> : <View />}

            {/* {isAddingProfile ?
                <Button
                    labelStyle={{ color: "white", fontSize: 18 }}
                    style={styles.submitButton}
                    onPress={()=> handleSubmit(onSubmit)}
                >
                    Add
                </Button>
                : <View />} */}
        </View>
    );
}

export default ViewDetail;