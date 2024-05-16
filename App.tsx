import { View, Button } from 'react-native'
import React from 'react'
import NotificationService from './Src/components/notificationComponent'
import Animated, { useSharedValue } from 'react-native-reanimated'
const App = () => {
  const width = useSharedValue(100);

  const handlePress = () => {
    width.value = width.value + 50;
  };
  return (
    <View>
      <NotificationService />
      <Button title='Message Reply' />
      <Button title='Kiss Back!' />
      <Button title='Hug Back!' />
      <Button title='Send Back!' />
      <View style={{ flex: 1, alignItems: 'center' }}>
        <Animated.View
          style={{
            width,
            height: 100,
            backgroundColor: 'violet',
          }}
        />
        <Button onPress={handlePress} title="Click me" />
      </View>
    </View>
  )
}

export default App