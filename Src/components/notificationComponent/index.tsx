import React, { useEffect } from 'react';
import notifee, { AndroidStyle, AuthorizationStatus, EventDetail, IOSNotificationCategory, NotificationSettings } from '@notifee/react-native';
import messaging, { FirebaseMessagingTypes } from '@react-native-firebase/messaging';
import { fcmService } from '../notification/fcmservice';

export enum ETechNotifications {
    NOTIFICATION_TYPE_MESSAGE = 'message_reply',
    NOTIFICATION_TYPE_KISS = 'kiss',
    NOTIFICATION_TYPE_HUG = 'hug',
    NOTIFICATION_TYPE_GOOD_VIBE = 'good_vibe',
}

const useNotificationService = () => {
    const hasPermission = async () => {
        try {
            const settings: NotificationSettings = await notifee.getNotificationSettings();
            return settings.authorizationStatus === AuthorizationStatus.AUTHORIZED;
        } catch (error: any) {
            throw new Error(error);
        }
    };


    const requestPermission = async () => {
        try {
            const settings: NotificationSettings = await notifee.requestPermission();
            return settings.authorizationStatus >= AuthorizationStatus.AUTHORIZED;
        } catch (e: any) {
            throw new Error(e);
        }
    };

    const onMessageReceived = async (message: FirebaseMessagingTypes.RemoteMessage) => {
        try {
            await setNotificationCategories(message.notification?.title as string);
            await showNotification(message);
        } catch (error: any) {
            throw new Error(error);
        }
    };

    const setNotificationCategories = async (notificationType: string | ETechNotifications) => {
        let categoryType: IOSNotificationCategory = { id: notificationType };
        switch (notificationType) {
            case ETechNotifications.NOTIFICATION_TYPE_MESSAGE:
                categoryType.actions = [{ id: notificationType, title: 'Reply',input:true }];
                break;
            case ETechNotifications.NOTIFICATION_TYPE_GOOD_VIBE:
                categoryType.actions = [{ id: notificationType, title: 'Send Back!' }];
                break;
            case ETechNotifications.NOTIFICATION_TYPE_KISS:
                categoryType.actions = [{ id: notificationType, title: 'Kiss Back!' }];
                break;
            case ETechNotifications.NOTIFICATION_TYPE_HUG:
                categoryType.actions = [{ id: notificationType, title: 'Hug Back!' }];
                break;
            default:
                return;
        }
        try {
            await notifee.setNotificationCategories([categoryType]);
        } catch (error: any) {
            throw new Error(error);
        }
    };

    const createChannel = async () => {
        let channelId = 'default';
        try {
            channelId = await notifee.createChannel({ id: 'default', name: 'Default Channel' });
        } catch (e) {
            console.log('Unable to create a channel: ', JSON.stringify(e));
        }
        return channelId;
    };

    const showNotification = async (message: FirebaseMessagingTypes.RemoteMessage) => {
        try {
            const channelId = await createChannel();
            notifee.displayNotification({
                title: message.notification?.title,
                body: message.notification?.body,
                android: buildAndroidNotification(message.data?.type as string, channelId, message),
                ios: buildIOSNotification(message.data?.type as string),
            });
        } catch (error: any) {
            throw new Error(error);
        }
    };

    const buildAndroidNotification = (notificationType: string | ETechNotifications, channelId: string, message: any) => {
        let actions:any = []
        switch (notificationType) {
            case ETechNotifications.NOTIFICATION_TYPE_MESSAGE:
                actions = [{ pressAction: { id: notificationType }, title: 'Reply',input:true }];
                break;
            case ETechNotifications.NOTIFICATION_TYPE_GOOD_VIBE:
                actions = [{ pressAction: { id: notificationType }, title: 'Send Back!' }];
                break;
            case ETechNotifications.NOTIFICATION_TYPE_KISS:
                actions = [{ pressAction: { id: notificationType }, title: 'Kiss Back!' }];
                break;
            case ETechNotifications.NOTIFICATION_TYPE_HUG:
                actions = [{ pressAction: { id: notificationType }, title: 'Hug Back!' }];
                break;
        }
        return {
            channelId,
            style: { type: AndroidStyle.BIGTEXT as any, text: message.notification?.body as string },
            actions,
        };
    };

    const buildIOSNotification = (notificationType: string | ETechNotifications = '') => {
        return {
            ...(notificationType && { categoryId: notificationType }),
            critical: true,
            foregroundPresentationOptions: {
                alert: true,
                badge: true,
                sound: true,
            },
        };
    };

    const handleEvent = async (detail: EventDetail) => {
        console.log(detail,'------>>>>>');
        
        if (detail.pressAction?.id === ETechNotifications.NOTIFICATION_TYPE_HUG) {
            console.log('User pressed the "confirmation_button_available" action.<=======================');
        }
        if (detail.notification?.id) {
            await notifee.cancelNotification(detail.notification?.id as string);
        }
    };

    return {
        hasPermission,
        requestPermission,
        onMessageReceived,
        handleEvent,
    };
};

const NotificationService: React.FC = () => {
    const {
        hasPermission,
        requestPermission,
        onMessageReceived,
        handleEvent
    } = useNotificationService();

    const getFcmToken = () => {
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


    useEffect(() => {
        // Example of how you could use the service
        const checkPermission = async () => {
            await getFcmToken()
            const permission = await hasPermission();
            if (!permission) {
                await requestPermission();
            }
        };

        checkPermission();

        // setup for Firebase messaging
        fcmService.register(onMessageReceived,handleEvent)

        // Clean up the subscription
        return () => {
            fcmService.unRegister()
        };
    }, [hasPermission, requestPermission, onMessageReceived]);

    return <></>; // Your component's JSX
};

export default NotificationService;
