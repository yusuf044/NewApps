import messaging from '@react-native-firebase/messaging';
import { Platform } from 'react-native';

import { localNotificationService } from './localNotification';

class FCMService {

    register = (notificationCallBack = async(message) => {},notificationPressHandler=(notification)=>{}) => {
        this.checkPermission()
        this.createNotificationListeners(notificationCallBack,notificationPressHandler)

        localNotificationService.configure();

        if (Platform.OS === 'ios') {
            this.registerAppWithFCM();
        }

    }

    registerAppWithFCM = async () => {
        if (Platform.OS === 'ios') {
            await messaging().registerDeviceForRemoteMessages();
            await messaging().setAutoInitEnabled(true)
        }
    }

    checkPermission = () => {
        messaging().hasPermission()
            .then(enabled => {
                if (enabled) {
                    this.getFcmToken()
                } else {
                    this.requestPermission()
                }
            }).catch(error => {

            })
    }

    getFcmToken = () => {
        return new Promise(res => {
            messaging().getToken()
                .then(fcmToken => {
                    if (fcmToken) {
                        console.log('[FCM TOKEN] => ', fcmToken)
                        res(fcmToken)
                    } else {
                        console.log("[FCMService] User Does not have a device token")
                    }
                }).catch(error => {
                    // SimpleToaster('Please check your network connection.')
                    console.log("[FCMService] getToken rejected", error);
                })
        })
    }

    requestPermission = () => {
        messaging().requestPermission()
            .then(() => {
                this.getFcmToken()
            }).catch(error => {
                console.log("[FCMService] Request Permission rejected", error);
            })
    }

    deleteToken = () => {
        messaging().deleteToken()
            .catch(error => {
                console.log("[FCMService] Delete Token error", error);
            })
    }

    createNotificationListeners = (notificationCallBack,notificationPressHandler) => {
        //when the application is running but in background
        messaging()
            .onNotificationOpenedApp(remoteMessage => {
                if (remoteMessage) {
                    notificationPressHandler(remoteMessage)
                }
            });

        //when the application is opened from a quit state.
        messaging()
            .getInitialNotification()
            .then(remoteMessage => {
                if (remoteMessage) {
                    notificationPressHandler(remoteMessage)
                }
            });

        //forgrounnd state messages
        this.messageListener = messaging().onMessage(async remoteMessage => {
            if (remoteMessage) {
                notificationCallBack(remoteMessage)
            }
        });

        messaging().setBackgroundMessageHandler(async remoteMessage => {
            if (remoteMessage) {
                notificationPressHandler(remoteMessage);
            }
        });


        //Triggerd When have new token
        messaging().onTokenRefresh(fcmToken => {
            console.log("[FCMService] new token refresh", fcmToken);
        })
    }

    unRegister = () => {
        if (this.messageListener) {
            this.messageListener()
        }
    };
}

export const fcmService = new FCMService()