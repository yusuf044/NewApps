import { View, Button } from 'react-native'
import React from 'react'
import NotificationService from './Src/components/notificationComponent'
const App = () => {

  return (
    <View>
      <NotificationService />
      <Button title='Message Reply' />
      <Button title='Kiss Back!' />
      <Button title='Hug Back!' />
      <Button title='Send Back!' />
    </View>
  )
}

export default App