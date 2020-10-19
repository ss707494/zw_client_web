import {useRouter} from 'next/router'

export const usePcOrMobile: () => { isPc: boolean } = () => {
  const router = useRouter()
  if (/\/pc\//.test(router.pathname)) {
    return {
      isPc: true,
    }
  }
  return {
    isPc: false,
  }
}
