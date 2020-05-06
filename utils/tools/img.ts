
export const dealImgUrl = (src: string | undefined | null = '') => {
  if (src?.includes('blob:')) {
    return src
  }
  return 'http://127.0.0.1:4464/' + src
}
