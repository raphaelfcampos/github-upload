/* eslint-disable react/prop-types */
import React, { useState } from 'react'
import { View, Text, TextInput, TouchableOpacity, Image, ToastAndroid, StyleSheet } from 'react-native'
import * as auth from '../../services/autenticacao'
import Logo from '../../assets/imgs/logo.png'
import IconUser from '../../assets/imgs/icon_usuario.png'
import IconPass from '../../assets/imgs/icon_senha.png'

const Login = ({ navigation }) => {
  const [login, setLogin] = useState('')
  const [senha, setSenha] = useState('')

  const logar = () => {
    if (login && senha) {
      auth.signIn(login, senha).then((response) => {
        // console.log(response.data)
        if (response.status === 201) {
          // console.log('login:: user ->', response.data.usuario)
          navigation.push('home', { user: response.data.usuario })
        } else {
          ToastAndroid.showWithGravity('Usuário ou senha inválidos.', ToastAndroid.LONG,
            ToastAndroid.BOTTOM)
        }
      }).catch((error) => {
        console.log(error)
      })
    } else {
      if (!login && !senha) {
        ToastAndroid.showWithGravity('Falta preencher os campos Login e Senha.', ToastAndroid.LONG,
          ToastAndroid.BOTTOM)
      } else {
        if (!login) {
          ToastAndroid.showWithGravity('Falta preencher o campo Login', ToastAndroid.LONG,
            ToastAndroid.BOTTOM)
        } else {
          if (!senha) {
            ToastAndroid.showWithGravity('Falta preencher o campo Senha.', ToastAndroid.LONG,
              ToastAndroid.BOTTOM)
          }
        }
      }
    }
  }

  return (
    <View style={styles.container}>
      <Image style={styles.logo} source={Logo} />

      <Text style={styles.Title}>Autenticador QRCode</Text>

      <View style={styles.loginContainer}>
        <View style={styles.inputsContent}>
          <Image source={IconUser} />
          <TextInput style={styles.inputs} placeholder="Seu login" autoCapitalize="none" onChangeText={text => setLogin(text)}/>
        </View>
        <View style={styles.inputsContent}>
          <Image source={IconPass} />
          <TextInput style={styles.inputs} secureTextEntry={true} placeholder="Sua senha" autoCapitalize="none" onChangeText={text => setSenha(text)}/>
        </View>
        <TouchableOpacity style={styles.btnLogar} onPress={logar}>
          <Text style={styles.btnText}>Logar</Text>
        </TouchableOpacity>
      </View>

    </View>
  )
}

const styles = StyleSheet.create({
  container: {
    display: 'flex',
    flex: 1,
    alignItems: 'center'
  },
  logo: {
    marginTop: 100
  },
  Title: {
    fontSize: 22,
    fontWeight: '700',
    marginTop: 20
  },
  loginContainer: {
    marginTop: 50,
    // margin: 10,
    width: '100%',
    alignItems: 'center',
    padding: 10

  },
  inputsContent: {
    display: 'flex',
    flexDirection: 'row'

  },
  inputs: {
    flex: 1,
    borderColor: 'gray',
    borderWidth: 1,
    marginBottom: 10,
    borderRadius: 8
  },
  btnLogar: {
    backgroundColor: '#3358cc',
    padding: 15,
    borderRadius: 8,
    marginTop: 20,
    width: '100%'
  },
  btnText: {
    fontSize: 18,
    color: '#ffffff',
    textAlign: 'center'
  }
})

export default Login
