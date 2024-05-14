import React from 'react';
import {gestureHandlerRootHOC} from 'react-native-gesture-handler';
import {AppRegistry} from 'react-native';
import App from './App';
import {name as appName} from './app.json';
import messaging from '@react-native-firebase/messaging';
import notifee from '@notifee/react-native';
import { notificationService } from './Src/Screen/splash';

messaging().setBackgroundMessageHandler((remoteMessage) => {
  if (remoteMessage) {
    notificationService.onMessageReceived(remoteMessage);
  }
});

notifee.onBackgroundEvent(async ({type, detail}) => {
  const {notification, pressAction} = detail;
  notificationService.handleEvent(type, detail);
});

function HeadlessCheck({isHeadless}) {
  if (isHeadless) return null;

  return ;
}

AppRegistry.registerComponent(appName, () => gestureHandlerRootHOC(HeadlessCheck));