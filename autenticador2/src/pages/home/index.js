import React, {useEffect, useState} from "react";
import axios from 'axios'
import {Redirect} from 'react-router'

import IconeAuth from '../../assets/imgs/icon_autenticacaoOk.png'
import './styles.css'

const Home = () => {
    const [user, setUser] = useState(null)
    const [autenticado, setAutenticado] = useState(true)

    useEffect(() => {
        const storageUser = JSON.parse(localStorage.getItem('@AuthQrCode:user'))
        const storageToken = localStorage.getItem('@AuthQrCode:token')
   
        setUser(storageUser)

       setInterval(() => {
            axios.get('http://192.168.105.250:3001/api/users/session-validation',{headers: {'x-token': storageToken}})
                .then((response) => {
                    if(response.status === 200) {
                        setAutenticado(true)
                    } else {
                        localStorage.clear()
                        setAutenticado(false)
                    }
                })
        }, 2000);

    },[])

    return (
        <div className="container">
            
            <h1>Autenticado</h1>
            <img src={IconeAuth} width="120px"/>
            <h4>Bem-vindo, {user?.login}</h4>

            {!autenticado ? (
                <Redirect push to={{pathname:"/"}} />
            ) : null}

        </div>
    )
}

export default Home