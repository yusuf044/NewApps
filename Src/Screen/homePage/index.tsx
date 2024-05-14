import React, { Children, useCallback, useMemo, useRef, useState } from 'react';

import {
  ScrollView,
  View,
  Dimensions,
  TouchableOpacity,
  Button,
  Text,
  Alert,
  TextInput,
  SafeAreaView,
} from 'react-native';
import Animated, { useAnimatedStyle, useSharedValue } from 'react-native-reanimated';
import { useTheme } from '../../components/themes';
import notifee, { AndroidStyle } from '@notifee/react-native';
import { Spacer } from '../../components';
import { NativeStackNavigationProp } from '@react-navigation/native-stack';

type Props = {
  navigation: NativeStackNavigationProp;
  //   route: RouteProp<RootStackParamsList, 'NewsDetails'>;
};
const Sizes = 100.0;
const HomePageScene = ({ navigation }: Props) => {

  const { theme } = useTheme();
  const [isError, setisError] = useState(false)
  const onDisplayNotification = async () => {
    await notifee.requestPermission();

    // Create a channel (required for Android)
    const channelId = await notifee.createChannel({
      id: 'default',
      name: 'Default Channel',
    });
    Alert.alert('Sent Notifaction');
    // Display a notification
    await notifee.displayNotification({
      title: 'NEW App',
      body: 'Jaipur Photos and Images Jaipur Photos and Images',
      android: {
        style: {
          type: AndroidStyle.BIGPICTURE,
          picture:
            'data:image/jpeg;base64,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',
        },
        channelId,
        // smallIcon: 'name-of-a-small-icon', // optional, defaults to 'ic_launcher'.
        // pressAction is needed if you want the notification to open the app when pressed
        pressAction: {
          id: 'default',
        },
      },
    });
  };



  // const onDisplayNotification=(async)=>{
  //     // Request permissions (required for iOS)
  //     await notifee.requestPermission()

  //     // Create a channel (required for Android)
  //     const channelId = await notifee.createChannel({
  //       id: 'default',
  //       name: 'Default Channel',
  //     });

  //     // Display a notification
  //     await notifee.displayNotification({
  //       title: 'Notification Title',
  //       body: 'Main body content of the notification',
  //       android: {
  //         channelId,
  //         smallIcon: 'name-of-a-small-icon', // optional, defaults to 'ic_launcher'.
  //         // pressAction is needed if you want the notification to open the app when pressed
  //         pressAction: {
  //           id: 'default',
  //         },
  //       },
  //     });
  //   }}

  return (
    <SafeAreaView style={{ flex: 1, }}>
      <Text style={{ fontSize: 50, textAlign: "center", fontStyle: "italic", fontWeight: "900", color: "red" }}>MY APP</Text>
      <View
        style={{
          flex: 1,
          justifyContent: 'center',
          backgroundColor: theme === 'light' ? '#FFF' : '#000', paddingHorizontal: 14
        }}>
        <Spacer size={6} />
        <View
          style={{
            backgroundColor: '#FFF',
            width: '100%',
            borderRadius: 20,
            paddingHorizontal: 10, elevation: 8, borderTopColor: "#cccc", borderTopWidth: 5
          }}>
          <TextInput placeholder="Phone/Email" />
        </View>
        {isError && <Text style={{ fontSize: 12, color: "red", marginLeft: 8 }}>Wrong Way</Text>}
        <Spacer size={10} />
        <View
          style={{
            backgroundColor: '#FFF',
            width: '100%',
            borderRadius: 20,
            paddingHorizontal: 10, elevation: 8, borderTopColor: "#cccc", borderTopWidth: 5
          }}>
          <TextInput placeholder="Password" />
        </View>
        {isError && <Text style={{ fontSize: 12, color: "red", marginLeft: 8 }}>Wrong Way</Text>}
        <Spacer size={3} />
        <Text style={{ textAlign: 'left', marginLeft: 8 }}>Forgot Password</Text>
        <Button title='Token Screen' onPress={() => navigation.navigate("Splash")} />
      </View>
      <View style={{ borderTopColor: "#000", borderTopWidth: 5, }}>
        <Button color={"red"}
          title="Display Notification"
          onPress={() => onDisplayNotification()}
        />

      </View>
    </SafeAreaView>
  );
};

export default HomePageScene;
