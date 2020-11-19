import React from 'react'
import StorefrontIcon from '@material-ui/icons/Storefront'
import AccountBoxIcon from '@material-ui/icons/AccountBox'
import RedeemIcon from '@material-ui/icons/Redeem'
import PeopleIcon from '@material-ui/icons/People'
import {useRouter} from 'next/router'
import red from '@material-ui/core/colors/red'
import {AppFootBar} from '../../ss_common/enum'
import {mpStyle} from '../../style/common'
import styled from 'styled-components'

const Box = styled.div`
  position: fixed;
  bottom: 0;
  height: 45px;
  width: 100vw;
  box-shadow: 0 3px 4px 0 rgba(0,0,0,0.14), 0 3px 3px -2px rgba(0,0,0,0.12), 0 1px 8px 0 rgba(0,0,0,0.20);
  background: #fff;
  display: flex;
  align-items: center;
  > section {
    flex-grow: 1;
    display: flex;
    align-items: center;
    justify-content: center;
    flex-direction: column;
    position: relative;
    > aside {
      position: absolute;
      top: 0;
      right: 20%;
      border-radius: 50%;
      width: 16px;
      height: 16px;
      background: ${mpStyle.red};
      display: flex;
      align-items: center;
      justify-content: center;
      color: #fff;
    }
  }
`
const ActBox = styled.section<{isAct: boolean}>`
  color: ${props => props.isAct ? red[600] : 'auto' };
`

export const FootBar = () => {
  const router = useRouter()

  const isAct = (path: any) => router.pathname.includes(path as string)
  return (
      <Box>
        {[
          ['逛店', <StorefrontIcon/>, `/m/${AppFootBar.home}`],
          ['拼团', <PeopleIcon/>, `/m/${AppFootBar.group}`],
          ['达人区', <RedeemIcon/>, `/m/${AppFootBar.card}`],
          // ['购物车', <ShoppingCartIcon/>, `/${AppFootBar.cart}`, stateShopCart.dealProductNumber(stateShopCart)],
          ['我', <AccountBoxIcon/>, `/m/${AppFootBar.me}`],
        ].map(v => (
            <ActBox
                key={`FootBar_${v[0]}`}
                isAct={isAct(v[2])}
                onClick={() => isAct(v[2]) ? '' : router.push(v[2] as string)}
            >
              {v[1]}
              <span>{v[0]}</span>
              {~~v[3] > 0 && <aside>{v[3]}</aside>}
            </ActBox>
        ))}
      </Box>
  )
}
