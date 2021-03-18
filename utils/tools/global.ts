import getConfig from 'next/config'

export const isDev = process.env.NODE_ENV === 'development'
const config = getConfig()

export const ssLog = (data: any) => {
  if (isDev) {
    console.log(data)
  }
  return data
}

export const hideShop = () => {
  return config?.publicRuntimeConfig?.HIDE_SHOP === '1'
}
