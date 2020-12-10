import API from './api'

export async function signIn (login, senha) {
  const req = {
    login,
    senha
  }

  return await API.post('/users/signIn', req)
    .then(response => {
      return response
    }).catch(error => { return error })
}

export async function signOut (login, token) {
  const req = {
    login,
    token
  }

  return await API.put('/users/signOut', req)
    .then(response => {
      return response
    }).catch(error => { return error })
}

export async function createSession (login, token) {
  const req = {
    id_login: login,
    token: token
  }

  return await API.post('/users/create-session', req)
    .then(response => {
      return response
    }).catch(error => { return error })
}
