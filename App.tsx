import { StyleSheet, Text, View } from 'react-native'
import React, { useEffect } from 'react'
import Routes from './Src/routes'
import ThemeProvider from './Src/components/themes'
import notifee from '@notifee/react-native';
import { } from './Src/Screen/splash';
import { fcmService } from './Src/components/notification/fcmservice';
import { localNotificationService } from './Src/components/notification/localNotification';
import NotificationComponent from './Src/components/notificationComponent';

const App = () => {
  useEffect(() => {
    // if (auth) {
    fcmService?.register();
    // }

    return fcmService.unRegister();
  }, []);

  useEffect(() => {
    return notifee.onForegroundEvent(({ type, detail }) => {
      // NotificationComponent.handleEvent(type, detail);
    });
  }, []);
  return (
    <View style={{ flex: 1, backgroundColor: "red" }}>
      <ThemeProvider>
        <Routes />
      </ThemeProvider>
    </View>
  )
}

export default App

const styles = StyleSheet.create({})