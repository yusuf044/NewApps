1. install these packages {
   @react-native-firebase/messaging
   react-native-push-notification
   @react-native-community/push-notification-ios
   }

2. setup firebase on your project.

3. place all three files in your project.

4. Call this function `fcmService.register()` from fcmservice file in app.js;

5. call this function in component unmount `fcmService.unRegister()` from fcmservice file in app.js;

6. perform you all notification intraction (notification tap functionality) action in notificationAction.js file.

7. get " navigationRef " from notificationAction.js file and set to navigationContainer's ref like : ~<NavigationContainer ref={navigationRef}>~
