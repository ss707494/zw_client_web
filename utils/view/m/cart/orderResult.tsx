import React from 'react'
import { ls } from '../../../tools/dealKey'
import styled from 'styled-components'
import {Button} from '@material-ui/core'
import {useRouter} from 'next/router'

const Box = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  padding-top: 30vh;
  > main {
    font-size: 20px;
    font-weight: bold;
    margin-bottom: 20px;
  }
`
export const OrderResult = () => {
  const router = useRouter()
  return <Box>
    <main>{ls('下单成功')}</main>
    <footer>
      <Button
          fullWidth={true}
          variant={'contained'}
          color={'secondary'}
          onClick={() => {
            router.push('/m/home')
          }}
      >
        {ls('返回首页')}
      </Button>
    </footer>
  </Box>
}
