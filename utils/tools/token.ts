/* global localStorage */
export const setToken = (token: string, name = 'token') => localStorage.setItem(name, token)

export const getToken = (name = 'token') => localStorage.getItem(name) || ''
