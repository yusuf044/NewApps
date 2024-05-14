import notifee, { AndroidImportance, AndroidStyle } from '@notifee/react-native';
import  {Platform} from 'react-native';


class LocalNotificationService {

  configure = () => {
    this.createChannel();
  }

  createChannel = () =>{
  notifee.requestPermission();
        const channelId =  notifee.createChannel({
            id: 'message-reply',
            name: 'Default Channel',

        });
  }


  // configureNotification = () =>{
  //   let config = {
  //     onRegister: function (token) {},
  //     onNotification: function (notification) {
  //         if (notification.userInteraction) {
  //           notificationOpen(notification)
  //         }
  //       },
  //       permissions: {
  //         alert: true,
  //         badge: true,
  //         sound: true,
  //       },
  //       popInitialNotification: false,
  //       requestPermissions: true,
  //   }

  //   PushNotification.configure(config);
  // }

  // unRegister = () => {
  //   PushNotification.unregister()
  // }

  showlocalNotification = ({notification,data}) => {
    let config ={
      title: 'Checking life',
      subtitle: 'Are you feeling alright ?',
      android: {
          channelId,
          actions: [{ title: "Reply", pressAction: { id: "hyy" }, input: true }]
      },
  }
  notifee.displayNotification(config);
    }
    
  }
  

  cancelAllLocalNotifications = () => {
    
      notifee.cancelAllNotifications();
      notifee.cancelAllNotifications();
      
  }

  clearNotificationBadge = () =>{
    if(Platform.OS=='ios') {
      notifee.getApplicationIconBadgeNumber((num)=>{ // get current number
        if(num >= 1){
          notifee.setApplicationIconBadgeNumber(0) //set number to 0
        }
      });
    }
  }

  removeAllDeliveredNotificationByID = (notificationId) => {
    notifee.cancelAllNotifications({id:`${notificationId}`})
  }



export const localNotificationService = new LocalNotificationService()