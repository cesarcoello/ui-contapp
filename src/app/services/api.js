import { API_URL } from '../utils/settings'


export const registerUser = async (userData) => {
  const response = await fetch(`${API_URL}/register`, {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
    },
    body: JSON.stringify(userData),
  });

  if (!response.ok) {
    throw new Error('Error en creacion de cuenta');
  }
  return response.json();
};

export const loginUser = async (credentials) => {
  const response = await fetch(`${API_URL}/login`, {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
    },
    body: JSON.stringify(credentials),
  });
  if (!response.ok) {
    throw new Error('Error en el inicio de sesión');
  }
  return response.json();
};

export const getUserData = async (token) => {

  const dataResponse = {
    error: true,
    code: 200,
    data: {}
  }

  const response = await fetch(`${API_URL}/user`, {
    headers: {
      'Authorization': `Bearer ${token}`,
    },
  });


  if (!response.ok) {
    dataResponse.code = false
    dataResponse.data = await response.json();
    dataResponse.code = response.status

  } else {
    dataResponse.code = response.ok
    dataResponse.data = await response.json();
    dataResponse.code = response.status
  }


  return dataResponse
};


export const activeUser = async (token, code) => {

  const response = await fetch(`${API_URL}/active-user`, {
    method: 'POST',
    body: JSON.stringify({ code: Number(code) }),
    headers: {
      'Content-Type': 'application/json',
      'Authorization': `Bearer ${token}`,
    },
  });


  if (!response.ok) {
    throw new Error('Error al activar la cuenta')
  }


  return await response.json()
};


