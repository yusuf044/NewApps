import { View, Button, Text, StyleSheet, Dimensions } from 'react-native'
import React from 'react'
import NotificationService from './Src/components/notificationComponent'
import Routes from './Src/routes'

const App = () => {
  // const translateX = useSharedValue(0);
  // const translateY = useSharedValue(0);

  // const cardStyle = useAnimatedStyle(() => {
  //   return {
  //     transform: [
  //       { translateX: translateX.value },
  //       { translateY: translateY.value },
  //     ],
  //   };
  // });

  // const onGestureEvent = Animated?.event(
  //   [
  //     {
  //       nativeEvent: {
  //         translationX: (event: { translationX: number; }) => {
  //           translateX.value = event.translationX;
  //         },
  //         translationY: (event: { translationY: number; }) => {
  //           translateY.value = event.translationY;
  //         },
  //       },
  //     },
  //   ],
  //   { useNativeDriver: true }
  // );

  // const onHandlerStateChange = () => {
  //   translateX.value = withSpring(0);
  //   translateY.value = withSpring(0);
  // };

  return (
    // <View>
    //   <NotificationService />
    //   <Button title='Message Reply' />
    //   <Button title='Kiss Back!' />
    //   <Button title='Hug Back!' />
    //   <Button title='Send Back!' />
    //   {/* 
    //   <PanGestureHandler
    //     onGestureEvent={onGestureEvent}
    //     onHandlerStateChange={onHandlerStateChange}
    //   >
    //     <Animated.View style={[styles.card, cardStyle]}>
    //       <Text style={styles.cardNumber}>1234 5678 9012 3456</Text>
    //       <View style={styles.cardDetails}>
    //         <Text style={styles.cardLabel}>Card Holder</Text>
    //         <Text style={styles.cardInfo}>John Doe</Text>
    //       </View>
    //       <View style={styles.cardDetails}>
    //         <Text style={styles.cardLabel}>Expires</Text>
    //         <Text style={styles.cardInfo}>12/23</Text>
    //       </View>
    //     </Animated.View>
    //   </PanGestureHandler> */}

    // </View>
    <View style={{ flex: 1 }}>
      <Routes />
    </View>
  )
}

export default App


const styles = StyleSheet.create({
  card: {
    // width: width - 40,
    height: 200,
    backgroundColor: '#1e1e1e',
    borderRadius: 10,
    padding: 20,
    margin: 20,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 4 },
    shadowOpacity: 0.3,
    shadowRadius: 4,
    elevation: 8,
  },
  cardNumber: {
    color: '#fff',
    fontSize: 24,
    marginBottom: 20,
  },
  cardDetails: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginTop: 10,
  },
  cardLabel: {
    color: '#fff',
    fontSize: 14,
  },
  cardInfo: {
    color: '#fff',
    fontSize: 16,
  },
});

