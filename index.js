/**
 * @format
 */

import {AppRegistry} from 'react-native';
import App from './App';
import {name as appName} from './app.json';
import messaging from '@react-native-firebase/messaging';
import notifee from '@notifee/react-native';
import {useNotificationService} from './Src/components/notificationComponent';

const {onMessageReceived, handleEvent} = useNotificationService();

messaging().setBackgroundMessageHandler(remoteMessage => {
  if (remoteMessage) {
    onMessageReceived(remoteMessage);
  }
});

notifee.onBackgroundEvent(e => {
  console.log(e, '-]]]]]');
  handleEvent(e);
});

AppRegistry.registerComponent(appName, () => App);
