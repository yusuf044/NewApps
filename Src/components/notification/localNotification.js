import notifee, { IOSNotificationCategory, AndroidStyle } from '@notifee/react-native';
import  {Platform} from 'react-native';



class LocalNotificationService {

  configure = () => {
    this.createChannel();
  }

  createChannel = () =>{
  
        const channelId =  notifee.createChannel({
            id: 'message-reply',
            name: 'Default Channel',

        });
  }


  configureNotification =async (notificationType: string ) =>{
    notifee.requestPermission();
    let categoryType: IOSNotificationCategory = { id: notificationType };
        switch (notificationType) {
            case ETechNotifications.CONFIRMATION_BUTTON_AVAILABLE:
                categoryType.actions = [{ id: notificationType, title: 'hug!' }];
                break;
                case ETechNotifications.CONFIRMATION_BUTTON_AVAILABLE:
                  categoryType.actions = [{ id: notificationType, title: 'kiss!' }];
                  break;
            default:
                return;
        }
        try {
            await notifee.setNotificationCategories([categoryType]);
        } catch (error: any) {
            throw new Error(error);
        }
  }

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