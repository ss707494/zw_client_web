import React, {ReactNode} from 'react'
import styled from 'styled-components'
import {Tab, Tabs} from '@material-ui/core'
import {useRouter} from 'next/router'
import {ls} from '../../../../tools/dealKey'
import {mpStyle} from '../../../../style/common'

const Box = styled.div`
  display: grid;
  grid-template-columns: 120px 1fr;
  grid-gap: ${mpStyle.spacePx.n};
`
const MenuLeftBox = styled.div`
  &&& {
    .MuiTab-root {
      padding: 0;
      min-width: 120px;
      .MuiTab-wrapper {
        align-items: flex-start;
      }
    }
    .Mui-selected {
      color: ${mpStyle.red};
    }
    .MuiTabs-indicator {
      display: none;
    }
  }
`

const meMenuEnum = {
  myInfo: 'myInfo',
  orderHistory: 'orderHistory',
  myAddress: 'myAddress',
  myCreditCard: 'myCreditCard',
}
const menuAct: any = {
  orderHistory: ['orderHistory', 'orderDetail'],
}
const dealMeMenuRouterValue = (pathName: string, meMenuEnum: object) => {
  return Object.keys(meMenuEnum).find(value => (menuAct?.[value] ? menuAct?.[value]?.find((value1: string) => pathName.includes(value1))
      : pathName.includes(value))) ?? ''
}
export const MenuBox = ({children}: { children: ReactNode }) => {
  const router = useRouter()
  const actMenu = dealMeMenuRouterValue(router.pathname, meMenuEnum)

  return <Box>
    <MenuLeftBox>
      <Tabs
          orientation="vertical"
          variant="scrollable"
          value={actMenu}
          onChange={(event, value) => {
            // if (menuAct[actMenu]) {
            //   router.push(menuAct[actMenu].reduce((pre: string, val: string) => pre.replace(val, value), router.asPath))
            // } else {
            //   router.push(router.asPath.replace(actMenu, value))
            // }
            router.push(`/pc/me/${value}`)
          }}
      >
        {[
          ['我的达人证', meMenuEnum.myInfo],
          ['我的订单历史', meMenuEnum.orderHistory],
          ['我的地址', meMenuEnum.myAddress],
          ['支付方式', meMenuEnum.myCreditCard],
        ].map(([label, value]) => <Tab
            key={`MeMenuRouterValue${value}`}
            label={ls(label)}
            value={value}
        />)}
      </Tabs>
    </MenuLeftBox>
    <main>
      {children}
    </main>
  </Box>
}
