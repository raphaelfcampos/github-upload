import React, {useEffect, useState} from "react";
import QRCode from "react-qr-code";
import md5 from 'md5'
import axios from 'axios'
import {Redirect} from 'react-router'
import Logo from '../../assets/imgs/logo.png'

import './styles.css'

const Login = () => {
  const [token, setToken] = useState(md5(new Date().toLocaleString() + new Date().getMilliseconds()))
  const [repeticao, setRepeticao] = useState(0);
  const [isActive, setIsActive] = useState(true);
  const [autenticado, setAutenticado] = useState(false)
  const [user, setUser] = useState(null)

  const geradorQRCode =  () => {
    let agora = new Date()
    let hash =  md5(agora.toLocaleString() + agora.getMilliseconds())
    setToken(hash)
  }


  const verificandoToken = () => {

    axios.get('http://192.168.105.250:3001/api/users/session-validation',{headers: {'x-token': token}})
      .then((response) => {
        if(response.status === 200) {
          //sucesso
          console.log(response.data.user)
          setUser(response.data.user)
          setAutenticado(true)    

          localStorage.setItem('@AuthQrCode:user', JSON.stringify(response.data.user))
          localStorage.setItem('@AuthQrCode:token',(token))

        } else {
            setAutenticado(false)
            console.log('false')
        }            
      }
    )                               
  }

  //Gerando o token
  useEffect(() => {
    let interval = null;
    if (isActive) {
      interval = setInterval(() => {
        setRepeticao(repeticao => repeticao + 1);
        geradorQRCode()
      }, 20000);
    } else if (!isActive && repeticao !== 0) {
      clearInterval(interval);
    }
     return () => clearInterval(interval);
  }, [isActive, repeticao]);


  //Validando o token
  useEffect(() => {
    console.log('token => ', token)

    if(token) {
      var intervalo = setInterval(() => {
        verificandoToken()
      }, 2000);
    }   

    return () => clearInterval(intervalo);

   },[token])

    return (
        <div className="container">
            <img src={Logo} alt="Logo" width="150px"/>
            <h1>Autenticação QRCode</h1>
            <QRCode level="Q" value={token} />

            {autenticado ? (
                <Redirect push to={{pathname:"/home"}} />
            ) : null}
        </div>
    )
}

export default Login