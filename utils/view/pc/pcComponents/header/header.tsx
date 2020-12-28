import styled from 'styled-components'
import React from 'react'
import {ll} from '../../../../tools/dealKey'
import {Button, ButtonProps, Divider} from '@material-ui/core'
import {Space} from '../../../../components/Box/Box'
import {mpStyle} from '../../../../style/common'
import {useStoreModel} from '../../../../ModelAction/useStore'
import {homeTabsModel} from '../../../m/home/components/Tabs/Tabs'
import {HomeType} from '../../../m/home/appModule'
import {useRouter} from 'next/router'


const HeaderBox = styled.div`
  width: 100%;
  height: 60px;
  background: #0D0D21;
  display: grid;
  align-items: center;
  justify-items: center;
`
const ContentBox = styled.div`
  width: 1200px;
  display: grid;
  grid-template-columns: max-content 1fr 520px;
  color: white;
  align-items: center;
`
const Welcome = styled.div`
  ${mpStyle.fontType.s};
  color: #FFFFFF;
`

const Center = styled.div`
  &&& {
    .MuiButtonBase-root {
      width: 80px;
      height: 28px;
      background: #F84033;
      border-radius: 4px;
      ${mpStyle.fontType.s};
      font-weight: 600;
      color: #FFFFFF;
      padding: 0;
    }
  }
`
const Right = styled.div`
  display: flex;
  justify-content: flex-end;
  align-items: center;
`
const Tabs = styled.div`
  height: 60px;
  display: grid;
  grid-auto-flow: column;
`
const TabButton = styled(Button)<ButtonProps & {
  active?: boolean
}>`
  &&& {
    padding: 0 21px;
    border-radius: 0;
    color: white;
    ${prop => prop.active ? `
      color: #0D0D21;
      background: #FFFFFF;
    ` : ''};
  }
`
export const PcHeader = () => {
  const router = useRouter()
  const {state: stateHomeTabsModel} = useStoreModel(homeTabsModel)
  console.log(stateHomeTabsModel.homeType)


  return <HeaderBox>
    <ContentBox>
      <Tabs>
        <TabButton
            active={stateHomeTabsModel.homeType === HomeType.home}
            onClick={() => {
              router.push('/pc/home')
            }}
        >{ll('零售超市')}</TabButton>
        <TabButton
            active={stateHomeTabsModel.homeType === HomeType.group}
            onClick={() => {
              router.push('/pc/group')
            }}
        >{ll('团购商城')}</TabButton>
      </Tabs>
      <Center>
        <Space
            w={20}
        />
      </Center>
      <Right>
        <Welcome>{ll('晚上好, 欢迎来到马佩莱超市!')}</Welcome>
        <Space w={20}/>
        <Button
            style={{
              'width': '80px',
              'height': '28px',
              'background': '#F84033',
              'borderRadius': '4px',
              fontSize: '14px',
              padding: '6px 0',
            }}
            variant={'contained'}
            color={'secondary'}
        >{ll('登录/注册')}</Button>
        <Space w={32}/>
        <Button
            variant={'text'}
            color={'inherit'}
        >{ll('帮助中心')}</Button>
        <Space w={22}/>
        <Divider
            style={{height: '16px', alignSelf: 'center'}}
            light={true}
            flexItem={true}
            orientation={'vertical'}/>
        <Space w={22}/>
        <Button
            variant={'text'}
            color={'inherit'}
        >{ll('掌上超市')}</Button>
      </Right>
    </ContentBox>
  </HeaderBox>
}
