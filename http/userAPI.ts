'use client'
import {$authHost, $host} from "./index";
import {jwtDecode} from 'jwt-decode';

interface DecodedToken {
    user_id: string;
  }

export const registration = async (username: string, first_name: string, last_name: string, email: string, password: string) => {
  console.log('Входим в регистрацию!')
    const {data} = await $host.post('registration/', {email, first_name, last_name, password, username})
    return data;
}

export const login = async (username: string, password: string) => {
  try {
    const {data} = await $host.post('token/', {username, password})
    localStorage.setItem('accessToken', data.access)
    localStorage.setItem('refreshToken', data.refresh)
    return jwtDecode<DecodedToken>(data.access)
  } catch (error: any) {
    console.error('Ошибка авторизации: ', error.response?.data || error.message);
    throw error;
  }

}

export const check = async () => {
  try {
    const token = localStorage.getItem('refreshToken');

    if (!token) {
        return null;
    }

    const {data} = await $authHost.post('token/refresh/', {refresh: token})
    localStorage.setItem('accessToken', data.access);
    return jwtDecode<DecodedToken>(data.access)
  } catch (error: any) {
    console.error('Ошибка обновления токена: ', error.response?.data || error.message);
    throw error;
  }
}

export const changePassword = async (oldPassword: string, password: string, confirmedPassword: string) => {
  try {
    const token = localStorage.getItem('accessToken');
    const {data} = await $authHost.put('change-password/', {old_password: oldPassword, password, confirmed_password: confirmedPassword}, {
      headers: {
        'Authorization': `Bearer ${token}`,
      },
    });
    return data;
  } catch (e: any) {
    console.error('Ошибка смены пароля: ', e.response.data)
  }
}