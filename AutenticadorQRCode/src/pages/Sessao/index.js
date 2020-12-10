/* eslint-disable no-unused-vars */
/* eslint-disable react/prop-types */
import React, { useState, useEffect } from 'react'
import { View, TouchableOpacity, Text, Image, BackHandler, ToastAndroid, StyleSheet } from 'react-native'
import IconAutenticacaoOk from '../../assets/imgs/icon_autenticacaoOk.png'
import { useFocusEffect } from '@react-navigation/native'
import * as auth from '../../services/autenticacao'

const Sessao = ({ route, navigation }) => {
  const [isSelectionModeEnabled, setIsSelectionModeEnabled] = useState(true)
  const [disableSelectionMode, setDisableSelectionMode] = useState(false)
  const [user, setUser] = useState(route.params.user)
  const [qrCode, setQRCode] = useState(route.params.qrCode)

  const logout = () => {
    auth.signOut(user.login, qrCode).then((response) => {
      if (response.status === 201) {
        navigation.popToTop()
      } else {
        ToastAndroid.showWithGravity('Não foi possível encerrar a sessão.', ToastAndroid.SHORT,
          ToastAndroid.CENTER)
      }
    })
  }

  useFocusEffect(
    React.useCallback(() => {
      const onBackPress = () => {
        if (isSelectionModeEnabled) {
          setDisableSelectionMode(true)
          return true
        } else {
          return false
        }
      }

      BackHandler.addEventListener('hardwareBackPress', onBackPress)

      return () =>
        BackHandler.removeEventListener('hardwareBackPress', onBackPress)
    }, [isSelectionModeEnabled, disableSelectionMode])
  )

  return (
    <View style={styles.container}>
      <Text style={styles.textMensagem}>Autenticação realizada com sucesso.</Text>
      <Image source={IconAutenticacaoOk} />
      <Text style={styles.textMensagem}>Pressione o botão abaixo para encerrar a sessão.</Text>
      <TouchableOpacity style={styles.btnLogout} onPress={logout}>
        <Text style={styles.btnText}>Desconectar-se</Text>
      </TouchableOpacity>
    </View>
  )
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: 'center'
  },
  textMensagem: {
    fontSize: 20,
    fontWeight: '700',
    textAlign: 'center',
    padding: 10,
    marginTop: 70,
    marginBottom: 30
  },
  btnLogout: {
    backgroundColor: '#3358cc',
    padding: 15,
    borderRadius: 8,
    width: '80%'
  },
  btnText: {
    fontSize: 16,
    color: '#ffffff',
    textAlign: 'center'
  }
})

export default Sessao
