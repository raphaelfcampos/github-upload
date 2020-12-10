import React from 'react'
import { createStackNavigator } from '@react-navigation/stack'
import Login from '../pages/Login'
import Home from '../pages/Home'
import Autenticador from '../pages/Autenticador'
import Sessao from '../pages/Sessao'

const Stack = createStackNavigator()

function AppRoutes () {
  return (
    <Stack.Navigator>
      <Stack.Screen
        name='login'
        component={Login}
        options={{
          headerShown: false
        }}
      />
      <Stack.Screen
        name='home'
        component={Home}
        options={{
          title: 'Autenticador QRCode'
        }}
      />
      <Stack.Screen
        name='autenticador'
        component={Autenticador}
        options={{
          title: 'Leitor QRCode'
        }}
      />
      <Stack.Screen
        name='sessao'
        component={Sessao}
        options={{
          headerShown: false,
          title: 'Sessão'
        }}
      />
    </Stack.Navigator>
  )
}

export default AppRoutes
