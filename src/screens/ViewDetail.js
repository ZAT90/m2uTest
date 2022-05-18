
import React, { useState, useEffect } from 'react';
import { View, Text, ScrollView, Image, TouchableOpacity, Button, TextInput, Alert, Linking, Platform, KeyboardAvoidingView } from 'react-native';
import { Colors, Divider } from 'react-native-paper';
import styles from '../styles/screenStyles';
import * as Location from 'expo-location';
import * as Permissions from 'expo-permissions';
import { useForm, useController, Controller } from 'react-hook-form'
import { useDispatch, useSelector } from 'react-redux';
import { fetchProfiles, profilesSelector, addNewProfile } from '../slices/profiles'

function ProfileInput({ name, info, isOptional, control, rules, ref, placeholder, keyboardType = 'default', onSubmitEditing, isAddingProfile, ...rest }) {
    const { field, fieldState } = useController({
        control,
        name,
        rules
    })
    return (
        <View style={{ marginTop: 20 }}>
            <View style={{ flexDirection: 'row' }}>
                <Text style={styles.viewDetailTitle}>
                    {name}
                    {!isOptional && isAddingProfile ? '*' : ''}
                </Text>
                <Text>    {fieldState.error ? fieldState.error.message : ''}</Text>
            </View>
            <View style={[styles.viewDetailItem, fieldState.error && { borderColor: 'red' }]}>
                <TextInput
                    ref={ref}
                    keyboardType={keyboardType}
                    onSubmitEditing={onSubmitEditing}
                    autoCapitalize='none'
                    editable={isAddingProfile}
                    placeholder={placeholder}
                    placeholderTextColor={Colors.grey}
                    disabledInputStyle={{ color: Colors.red, opacity: 1 }}
                    underlineColor='transparent'
                    onChangeText={field.onChange}
                    style={[styles.inputStyle]}
                    value={isAddingProfile ? field.value : info} />
            </View>
        </View >
    )
}

function ViewDetail({ route, navigation }) {
    const { item, isAddingProfile, profiles } = route.params;
    const [profile, setProfile] = useState(item);
    const dispatch = useDispatch();
    const { control, handleSubmit, getValues, register } = useForm()
    const [currentloc, setCurrentloc] = useState({ lat: 0.0, lng: 0.0 })

    const regexEmail = /^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w\w+)+$/;
    const regexPhone = /^([+]?[\s0-9]+)?(\d{3}|[(]?[0-9]+[)])?([-]?[\s]?[0-9])+$/i;
    // submitting the form
    const onSubmit = data => {
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
        navigation.goBack();


    }

    // Handling on Error
    const onError = (errors, e) => {
        Alert.alert('Form submission error!', 'Please submit all the required * fields', [{ text: 'OK' }])
    }
    // check location permission
    const checkLocationPermission = async () => {
        try {
            let { status } = await Location.requestForegroundPermissionsAsync();
            console.log('status: ', status);
            if (status !== 'granted') {
                Alert.alert(
                    "Insufficient permissions!",
                    "Sorry, we need location permission to make this work!",
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
            // console.log('location: ', location);
            let newLocation = { lat: location.coords.latitude, lng: location.coords.longitude }
            setCurrentloc(prevState => ({ ...prevState, lat: location.coords.latitude, lng: location.coords.longitude }))
        } catch (error) {
            console.log('error: ', error);
        }
    }
    useEffect(() => {
        if (isAddingProfile) {
            checkLocationPermission();
        }

    }, [isAddingProfile])


    const renderCurrentLocation = () => {
        return (
            <View style={{ marginTop: 20, height: 50 }}>
                <Text style={styles.viewDetailTitle}>Your current Location</Text>
                <View style={{ flexDirection: 'row', flex: 1, marginTop: 10, marginLeft: 15 }}>
                    <View style={{ flex: 0.5, flexDirection: 'row', }}>
                        <Text style={styles.locationText}>Latitude: </Text>
                        <Text>{currentloc.lat != 0 ? currentloc.lat : ''}</Text>
                    </View>
                    <View style={{ flex: 0.5, flexDirection: 'row', }}>
                        <Text style={styles.locationText}>Longitude: </Text>
                        <Text>{currentloc.lng != 0 ? currentloc.lng : ''}</Text>
                    </View>

                </View>

            </View>
        )
    }
    return (
        <View>
            <ScrollView contentContainerStyle={{ alignItems: 'center' }} style={styles.addDetailView}>
                <KeyboardAvoidingView
                    behavior={Platform.OS === "ios" ? "padding" : "height"}
                    style={{ flex: 1 }}
                >
                    <View style={styles.viewDetailTopView}>

                        {isAddingProfile ? <View /> : <View style={styles.viewDetailImgView}>
                            <Image style={styles.image} source={{ uri: 'https://i.pravatar.cc/300' }} />
                        </View>}
                        <ProfileInput
                            isAddingProfile={isAddingProfile}
                            placeholder='Enter your full name'
                            rules={{
                                required: {
                                    value: true,
                                    message: 'This is required'

                                }
                            }}
                            name='Full Name'
                            info={item.name}
                            control={control} />
                        <ProfileInput
                            placeholder='Enter an unique username'
                            name='UserName'
                            rules={{
                                required: {
                                    value: true,
                                    message: 'This is required'

                                }
                            }}
                            isAddingProfile={isAddingProfile}
                            info={item.username} control={control} />
                        <ProfileInput
                            placeholder='0239291'
                            name='Phone'
                            rules={{
                                required: {
                                    value: true,
                                    message: 'Please input a valid phone number'

                                }, validate: value => regexPhone.test(value)
                            }}
                            keyboardType='phone-pad'
                            isAddingProfile={isAddingProfile}
                            info={item.phone} control={control} />
                        <ProfileInput
                            placeholder='xyz@gmail.com' rules={{
                                required: {
                                    value: true,
                                    message: 'Please input a valid email'

                                }, validate: value => regexEmail.test(value)
                            }} keyboardType='email-address' isAddingProfile={isAddingProfile} name='Email' info={item.email} control={control} />
                        <ProfileInput
                            placeholder='MayBank'
                            isAddingProfile={isAddingProfile}
                            name='Company Name'
                            info={item.company.name} control={control} isOptional={true} />
                        <ProfileInput
                            placeholder='www.maybank.com' isAddingProfile={isAddingProfile} name='Company Website' info={item.website} control={control} isOptional={true} />
                        {isAddingProfile ? renderCurrentLocation() : <TouchableOpacity
                            onPress={() => navigation.navigate('ViewLocation', { companyName: item.company.name, location: item.address.geo })}>
                            <View style={{ marginTop: 20 }}>
                                <Text style={styles.viewDetailTitle}>Location</Text>
                                <View style={styles.viewDetailItem}>
                                    <Text style={{ height: 20, backgroundColor: Colors.white, marginLeft: 10 }}>Click to view location on map </Text>

                                </View>
                            </View>
                        </TouchableOpacity>}
                        <ProfileInput placeholder='you can do it' isAddingProfile={isAddingProfile}
                            name='Catch Phrase'
                            rules={{
                                required: {
                                    value: true,
                                    message: 'This is required'

                                }
                            }} info={item.company.catchPhrase} control={control} />
                        <ProfileInput placeholder='go for it' isAddingProfile={isAddingProfile}
                            name='Slogan'
                            rules={{
                                required: {
                                    value: true,
                                    message: 'This is required'

                                }
                            }} info={item.company.bs} control={control} />
                        <View style={{ flexDirection: 'row', marginTop: 20 }}>
                            <View style={styles.dividerView} />
                            <Text style={{ alignSelf: 'center', paddingHorizontal: 5, fontSize: 18 }}>Adress</Text>
                            <View style={styles.dividerView} />
                        </View>
                        <ProfileInput placeholder='Bukit Jalil' isAddingProfile={isAddingProfile}
                            name='City'
                            rules={{
                                required: {
                                    value: true,
                                    message: 'This is required'

                                }
                            }} info={item.address.city} control={control} />
                        <ProfileInput placeholder='Jalan 14/1' isAddingProfile={isAddingProfile}
                            name='Street'
                            rules={{
                                required: {
                                    value: true,
                                    message: 'This is required'

                                }
                            }} info={item.address.street} control={control} />
                        <ProfileInput placeholder='Suite 1.1A' isAddingProfile={isAddingProfile} name='Suite' info={item.address.suite} control={control} isOptional={true} />
                        <ProfileInput placeholder='43322' isAddingProfile={isAddingProfile}
                            name='Zip Code'
                            rules={{
                                required: {
                                    value: true,
                                    message: 'This is required'

                                }
                            }} info={item.address.zipcode} control={control} />


                    </View>
                </KeyboardAvoidingView>

            </ScrollView>
            {isAddingProfile ? <View style={styles.submitButton}>
                <Button
                    onPress={handleSubmit(onSubmit, onError)}
                    title="Add New Profile"
                    color={Colors.white}
                    accessibilityLabel="Learn more about this purple button"
                /></View> : <View />}


        </View>
    );
}

export default ViewDetail;