import HelpOutlineIcon from '@material-ui/icons/HelpOutline'
import PersonPinCircleIcon from '@material-ui/icons/PersonPinCircle'
import PinDropIcon from '@material-ui/icons/PinDrop'
import CardGiftcardIcon from '@material-ui/icons/CardGiftcard'
import CardMembershipIcon from '@material-ui/icons/CardMembership'
import UpdateIcon from '@material-ui/icons/Update'
import HistoryIcon from '@material-ui/icons/History'
import ArrowForwardIosIcon from '@material-ui/icons/ArrowForwardIos'
import React, {useEffect} from 'react'
import styled from 'styled-components'
import {Button, ButtonBase, ButtonBaseProps} from '@material-ui/core'
import {meModel} from './model'
import {grey, red} from '@material-ui/core/colors'
import {useStoreModel} from '../../ModelAction/useStore'
import {ls} from '../../tools/dealKey'
import {FootBar} from '../../components/FootBar/FootBar'
import MonetizationOn from '@material-ui/icons/MonetizationOn'
import PaymentIcon from '@material-ui/icons/Payment'
import {BScroller} from '../../components/BScroll/BScroller'
import {RegisterHeader} from '../../components/RegisterHeader/RegisterHeader'
import {useRouter} from 'next/router'

const BasePadding = styled.div`
  padding: 0 20px;
`
const Box = styled.div`
  //padding-bottom: 100px;
`
const Header = styled.div`
  display: grid;
  grid-template-rows: 20vh 30px 30px;
  grid-template-columns: 1fr 100px;
  padding-left: 20px;
  background: ${red[400]};
  color: #fff;
  > header {
    font-size: 28px;
    grid-area: 1/1/2/3;
    align-self: end;
    margin-bottom: 20px;
  }
  > aside {
    grid-area: 2/2/4/3;
    margin-right: 20px;
  }
`
const Tab = styled(BasePadding)`
  padding: 0 20px;
  display: flex;
  justify-content: space-between;
`
const Card = styled.div`
  display: grid;
  grid-template-columns: min-content 1fr;
  align-items: center;
  padding: 20px 0;
  > svg {
    grid-area: 1/1/3/2;
    margin-right: 5px;
  }
  > footer {
    font-size: 12px;
  }
`
const Parting = styled.div`
  width: 1px;
  height: 30px;
  margin-top: 20px;
  background: ${grey[200]};
`
const ListItem = styled(ButtonBase)<ButtonBaseProps>`
  &&& {
    padding: 20px;
    width: 100%;
    display: flex;
  }
  > main {
    text-align: left;
    font-size: 18px;
    margin-left: 10px;
    flex-grow: 1;
    display: flex;
    flex-direction: column;
    justify-content: center;
    > footer {
      font-size: 14px;
      color: ${grey[700]}
    }
  }
`
const Empty = styled.div`
  padding: 20px;
  > main {
    margin-top: 20vh;
    display: flex;
    flex-direction: column;
    align-items: center;
    > span {
      margin-bottom: 30px;
    }
  }
`

export default function Me() {
  const router = useRouter()
  const {state: stateMe, actions: actionsMe} = useStoreModel(meModel)
  useEffect(() => {
    actionsMe.getLoginUser()
  }, [])
  return <Box>
    {!stateMe.user.id
        ? <Empty>
          <RegisterHeader/>
          <main>
            <span>{ls('您未登录,请先登录')}</span>
            <Button
                fullWidth
                variant={'contained'}
                color={'secondary'}
                onClick={actionsMe.toLogin}
            >{ls('登录')}</Button>
          </main>
        </Empty>
        : <BScroller>
          <Header>
            <header>{ls('您好,')}{stateMe.user.userInfo?.name}</header>
            <section>{stateMe.user.userInfo?.phone}</section>
            <section>{stateMe.user.userInfo?.email}</section>
            <aside>
              <Button
                  color={'inherit'}
                  variant={'outlined'}
                  onClick={() => actionsMe.logout()}
              >{ls('登出')}</Button>
            </aside>
          </Header>
          <Tab>
            <Card>
              <MonetizationOn/>
              <main>{stateMe.user.orderCoinCurrentMonth ?? 0}</main>
              <footer>{ls('当前达人币')}</footer>
            </Card>
            <Parting/>
            <Card>
              <MonetizationOn/>
              <main>{stateMe.user.orderCoinNextMonth ?? 0}</main>
              <footer>{ls('当前达人币')}</footer>
            </Card>
            <Parting/>
            <Card>
              <PaymentIcon/>
              <main>1021</main>
              <footer>{ls('达人卡')}</footer>
            </Card>
          </Tab>
          <ListItem
              onClick={() => {router.push('/me/orderHistory')}}
          >
            <HistoryIcon/>
            <main>
              <section>{ls('我的订单历史')}</section>
            </main>
            <aside>
              <ArrowForwardIosIcon/>
            </aside>
          </ListItem>
          <ListItem>
            <UpdateIcon/>
            <main>
              <section>{ls('下次买清单')}</section>
              <footer>{ls('')}</footer>
            </main>
            <aside>
              <ArrowForwardIosIcon/>
            </aside>
          </ListItem>
          <ListItem>
            <CardMembershipIcon/>
            <main>
              <section>{ls('我的达人证')}</section>
            </main>
            <aside>
              <ArrowForwardIosIcon/>
            </aside>
          </ListItem>
          <ListItem>
            <CardGiftcardIcon/>
            <main>
              <section>{ls('我的信用卡')}</section>
            </main>
            <aside>
              <ArrowForwardIosIcon/>
            </aside>
          </ListItem>
          <ListItem>
            <PinDropIcon/>
            <main>
              <section>{ls('我的取货点')}</section>
            </main>
            <aside>
              <ArrowForwardIosIcon/>
            </aside>
          </ListItem>
          <ListItem>
            <PersonPinCircleIcon/>
            <main>
              <section>{ls('我的地址')}</section>
            </main>
            <aside>
              <ArrowForwardIosIcon/>
            </aside>
          </ListItem>
          <ListItem>
            <HelpOutlineIcon/>
            <main>
              <section>{ls('帮助中心')}</section>
            </main>
            <aside>
              <ArrowForwardIosIcon/>
            </aside>
          </ListItem>
          <section style={{height: '100px', width: '2px'}}/>
        </BScroller>
    }
    <FootBar/>
  </Box>
}
