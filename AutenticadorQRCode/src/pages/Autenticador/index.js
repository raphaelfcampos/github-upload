/* eslint-disable react/prop-types */
/* eslint-disable no-unused-vars */
import React, { useState } from 'react'
import { AppRegistry, Text, ToastAndroid, StyleSheet } from 'react-native'
import QRCodeScanner from 'react-native-qrcode-scanner'
import * as auth from '../../services/autenticacao'

const Autenticador = ({ route, navigation }) => {
  const [user, setUser] = useState(route.params.user)

  const onSuccess = qrCode => {
    // console.log(qrCode)
    auth.createSession(user.login, qrCode.data).then((response) => {
      if (response.status === 201) {
        navigation.push('sessao', { user, qrCode: qrCode.data })
      } else {
        ToastAndroid.showWithGravity('Não foi possível se autenticar!', ToastAndroid.LONG,
          ToastAndroid.BOTTOM)
      }
    })
  }

  return (
    <QRCodeScanner
      onRead={onSuccess}
      showMarker={true}
      reactivate={false}
      reactivateTimeout={4000}
      fadeIn={true}
      // flashMode={RNCamera.Constants.FlashMode.torch}
      topContent={
        <Text style={styles.centerText}>
          Aponte sua camera para o QRCode.
        </Text>
      }
    />
  )

  /** bottomContent={
        <TouchableOpacity style={styles.buttonTouchable}>
          <Text style={styles.buttonText}>OK. Got it!</Text>
        </TouchableOpacity>
      } */
}

const styles = StyleSheet.create({
  centerText: {
    flex: 1,
    fontSize: 18,
    padding: 32,
    color: '#777'
  },
  textBold: {
    fontWeight: '500',
    color: '#000'
  },
  buttonText: {
    fontSize: 21,
    color: 'rgb(0,122,255)'
  },
  buttonTouchable: {
    padding: 16
  }
})

AppRegistry.registerComponent('default', () => Autenticador)

export default Autenticador
