import React from 'react'
import {useRouter} from 'next/router'
import {mpStyle} from '../../utils/style/common'
import {ls} from '../../utils/tools/dealKey'
import {Button} from '@material-ui/core'
import styled from 'styled-components'

const Box = styled.div`
  height: 100vh;
  background: ${mpStyle.red};
  box-sizing: border-box;
  overflow: hidden;
  display: flex;
  flex-direction: column;
  align-items: center;
`
const Title = styled.div`
  display: grid;
  grid-template-columns: 80px min-content;
  grid-template-rows: 40px;
  align-items: center;
  margin-top: 25vh;
  color: #fff;
  font-size: 20px;
  > img {
    width: 80px;
    grid-area: 1/1/3/2;
  }
  > section {
    align-self: end;
  }
  > main {
    font-weight: bold;
    align-self: start;
  }
`
const Actions = styled.div`
  width: calc(100vw - 40px);
  margin-top: 30vh;
  display: flex;
  flex-direction: column;
  &&& {
    .MuiButton-outlined {
      border-color: #fff;
      color: #fff;
    }
    .MuiButton-contained {
      color: ${mpStyle.red};
    }
  }
`

export const HomeRe = () => {
  const router = useRouter()

  return <Box>
    <Title>
      <img src={"/img/home/logo_white.png"}
           alt=""/>
      <section>
        {ls('Market')}
      </section>
      <main>
        {ls('Payless')}
      </main>
    </Title>
    <Actions>
      <Button
          size={'large'}
          style={{marginBottom: '20px'}}
          variant={'contained'}
          onClick={async () => {
            await router.push('/m/login')
          }}
      >{ls('登录')}</Button>
      <Button
          size={'large'}
          variant={'outlined'}
          onClick={async () => {
            await router.push('/m/register')
          }}
      >{ls('注册')}</Button>
    </Actions>
  </Box>
}

export default HomeRe

