
export const isDev = process.env.NODE_ENV === 'development'

export const ssLog = (data: any) => {
  if (isDev) {
    console.log(data)
  }
  return data
}
