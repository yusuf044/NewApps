import React, { useEffect, useState, useCallback } from 'react';
import notifee, { AndroidStyle, AuthorizationStatus, EventDetail, IOSNotificationCategory, NotificationSettings } from '@notifee/react-native';
import messaging, { FirebaseMessagingTypes } from '@react-native-firebase/messaging';

export enum ETechNotifications {
    NEW_ROUTED_JOB = 'new_routed_job',
    NEW_ASSIGNED_JOB = 'new_assigned_job',
    NEW_UPDATE_IN_WO = 'new_update_in_wo',
    MESSAGE_FROM_CLIENT = 'message_from_client',
    INCOMPLETE_STATUS = 'incomplete_status',
    CONFIRMATION_BUTTON_AVAILABLE = 'confirmation_button_available',
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
            case ETechNotifications.CONFIRMATION_BUTTON_AVAILABLE:
                categoryType.actions = [{ id: notificationType, title: 'Confirm!' }];
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
                android: buildAndroidNotification(message.notification?.title as string, channelId, message),
                ios: buildIOSNotification(message.notification?.title),
            });
        } catch (error: any) {
            throw new Error(error);
        }
    };

    const buildAndroidNotification = (notificationType: string | ETechNotifications, channelId: string, message: any) => {
        return {
            channelId,
            style: { type: AndroidStyle.BIGTEXT as any, text: message.notification?.body as string },
            actions: [{ title: 'Confirm!', pressAction: { id: notificationType } }],
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

    const handleEvent = async (type: any, detail: EventDetail) => {
        if (type === 2 && detail.pressAction?.id === ETechNotifications.CONFIRMATION_BUTTON_AVAILABLE) {
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

const NotificationComponent: React.FC = () => {
    const {
        hasPermission,
        requestPermission,
        onMessageReceived,
        handleEvent,
    } = useNotificationService();

    useEffect(() => {
        // Example of how you could use the service
        const checkPermission = async () => {
            const permission = await hasPermission();
            if (!permission) {
                await requestPermission();
            }
        };

        checkPermission();

        // Example setup for Firebase messaging
        const unsubscribe = messaging().onMessage(async (message) => {
            await onMessageReceived(message);
        });

        // Clean up the subscription
        return () => {
            unsubscribe();
        };
    }, [hasPermission, requestPermission, onMessageReceived]);

    return <></>; // Your component's JSX
};

export default NotificationComponent;
