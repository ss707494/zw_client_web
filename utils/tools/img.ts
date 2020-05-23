import getConfig from 'next/config'

const config = getConfig()

const imgDomain = config?.publicRuntimeConfig?.imgDomain ?? 'http://127.0.0.1:4464/'

export const dealImgUrl = (src: string | undefined | null = '') => {
  if (src?.includes('blob:')) {
    return src
  }
  return `${imgDomain}${src}`
}
