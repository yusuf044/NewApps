import { Alert, Button, StyleSheet, Text, View } from 'react-native'
import React, { useEffect } from 'react'
import messaging from '@react-native-firebase/messaging';
import notifee, { AndroidImportance, AndroidStyle } from '@notifee/react-native';


const SplashScene = () => {


    useEffect(() => {
        notifee.setNotificationCategories([
            {
                id: 'message-reply',
                actions: [
                    {
                        id: 'yes',
                        title: 'Yes, absolutely',
                    },

                ],
            },
        ]);
    }, [])

    const onPress = async () => {
        const channelId = await notifee.createChannel({
            id: 'message-reply',
            name: 'Default Channel',

        });
        notifee.displayNotification({
            title: 'Checking life',
            subtitle: 'Are you feeling alright ?',
            android: {
                channelId,
                actions: [{ title: "MEddd", pressAction: { id: "hyy" }, input: true }]
            },
        });
    };
    useEffect(() => {
        getDeviceToken()
    }, [])
    const getDeviceToken = async () => {
        let token = await messaging().getToken();
        console.log(token);
    }
    // useEffect(() => {
    //     const unsubscribe = messaging().onMessage(async remoteMessages => {
    //         onDisplayNotification(remoteMessages)
    //     });
    //     return unsubscribe
    // }, [])



    // const onDisplayNotification = async (data) => {
    //     await notifee.requestPermission();
    //     // Create a channel (required for Android)
    //     const channelId = await notifee.createChannel({
    //         id: 'default',
    //         name: 'Default Channel',
    //     });

    //     // Display a notification
    //     await notifee.displayNotification({
    //         title: data.notification.title,
    //         body: data.notification.body,

    //         android: {
    //             channelId,
    //             pressAction: {
    //                 id: 'default',
    //             },
    //             actions: [
    //                 {
    //                     title: 'reply',
    //                     icon: 'https://my-cdn.com/icons/reply.png',
    //                     pressAction: {
    //                         id: 'reply',

    //                     },
    //                     input: {
    //                         allowFreeFormInput: true, // set to false
    //                         choices: ['Yes', 'No', 'Maybe'],
    //                         placeholder: 'Reply to Sarah...',
    //                         allowGeneratedReplies: true,
    //                         editableChoices: true
    //                     },


    //                 },
    //             ],
    //         },
    //     });

    // };
    return (
        <View style={{ flex: 1, backgroundColor: "red" }}>
            <Text>index</Text>
            <Button title='Not' onPress={onPress} />
        </View>
    )
}

export default SplashScene

const styles = StyleSheet.create({})