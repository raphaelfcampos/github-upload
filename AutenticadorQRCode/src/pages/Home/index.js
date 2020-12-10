/* eslint-disable react/prop-types */
/* eslint-disable no-unused-vars */
import React, { useState } from 'react'
import { View, Text, TouchableOpacity, StyleSheet, Image } from 'react-native'

import QRCode from '../../assets/imgs/qrcode.png'
import QRCodeWhite from '../../assets/imgs/qrcode_white.png'

const Home = ({ route, navigation }) => {
  const [user, setUser] = useState(route.params.user)

  const lerQRCode = () => {
    navigation.push('autenticador', { user })
  }

  return (
    <View style={styles.container}>
      <Image style={styles.icone} source={QRCode} />
      <Text style={styles.title}>Pressione o botão abaixo para ler o QRCode.</Text>

      <View style={styles.content}>
        <TouchableOpacity style={styles.btnLerQrcode} onPress={lerQRCode}>
          <View style={styles.btnContent}>
            <Image style={styles.btnIcone} source={QRCodeWhite} />
            <Text style={styles.btnLerQrcodeText}>Ler QRCode</Text>
          </View>

        </TouchableOpacity>
      </View>
    </View>
  )
}

const styles = StyleSheet.create({
  container: {
    alignItems: 'center',
    flex: 1
  },
  icone: {
    marginTop: 80
  },
  title: {
    fontSize: 25,
    fontWeight: '700',
    textAlign: 'center',
    padding: 10,
    marginTop: 30,
    marginBottom: 50
  },
  content: {
    display: 'flex',
    flexDirection: 'column',
    alignItems: 'center',
    width: '100%'
  },
  btnContent: {
    display: 'flex',
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center'
  },
  btnLerQrcode: {
    backgroundColor: '#3358cc',
    padding: 15,
    borderRadius: 8,
    width: '80%'
  },
  btnLerQrcodeText: {
    textAlign: 'center',
    fontSize: 18,
    color: '#ffffff'
  },
  btnIcone: {
    height: 35,
    width: 35,
    marginRight: 10
  }
})

export default Home
