import HelpOutlineIcon from '@material-ui/icons/HelpOutline'
import PersonPinCircleIcon from '@material-ui/icons/PersonPinCircle'
import PinDropIcon from '@material-ui/icons/PinDrop'
import CardGiftcardIcon from '@material-ui/icons/CardGiftcard'
import CardMembershipIcon from '@material-ui/icons/CardMembership'
import HistoryIcon from '@material-ui/icons/History'
import ArrowForwardIosIcon from '@material-ui/icons/ArrowForwardIos'
import React, {useEffect} from 'react'
import styled from 'styled-components'
import {Button, ButtonBase, ButtonBaseProps} from '@material-ui/core'
import {meModel} from './model'
import {grey, red} from '@material-ui/core/colors'
import {useStoreModel} from '../../../ModelAction/useStore'
import {ll} from '../../../tools/dealKey'
import {FootBar} from '../../../components/FootBar/FootBar'
import MonetizationOn from '@material-ui/icons/MonetizationOn'
import PaymentIcon from '@material-ui/icons/Payment'
import {BScroller} from '../../../components/BScroll/BScroller'
import {useRouter} from 'next/router'
import {DealNoAuth} from '../../../components/NoAuth/NoAuth'
import {ShoppingCartIconButton} from '../../../components/ShoppingCartIconButton/ShoppingCartIconButton'
import {cardModel} from '../card/[type]'
import {PromoCodeTypeEnum} from '../../../ss_common/enum'
import {CoinDetailDialog, CoinDetailDialogModel} from './coinDetailDialog/coinDetailDialog'

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
    grid-area: 1/1/2/2;
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
const Card = styled(ButtonBase)`
  &&& {
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
const ShopIcon = styled.div`
  align-self: end;
  justify-self: end;
  margin: 0 16px 16px;
`

export default function Me() {
  const router = useRouter()
  const {actions: actionsCoinDetailDialogModel} = useStoreModel(CoinDetailDialogModel)
  const {actions: actionsCardModel, state: stateCardModel} = useStoreModel(cardModel)
  const {state: stateMeModel, actions: actionsMeModel} = useStoreModel(meModel)
  useEffect(() => {
    if (!stateMeModel.user.id) {
      actionsMeModel.getLoginUser()
    }
  }, [actionsMeModel, stateMeModel.user.id])
  useEffect(() => {
    actionsCardModel.getList()
  }, [actionsCardModel])
  return <Box>
    {DealNoAuth(<BScroller
        boxHeight={'calc(100vh - 45px)'}
    >
      <Header>
        <header>{ll('您好,')}{stateMeModel.user.userInfo?.name}</header>
        <ShopIcon><ShoppingCartIconButton htmlColor={'white'}/></ShopIcon>
        <section>{stateMeModel.user.userInfo?.phone}</section>
        <section>{stateMeModel.user.userInfo?.email}</section>
        <aside>
          <Button
              color={'inherit'}
              variant={'outlined'}
              onClick={() => actionsMeModel.logout()}
          >{ll('登出')}</Button>
        </aside>
      </Header>
      <Tab>
        <Card
            onClick={() => {
              actionsCoinDetailDialogModel.openClick({
                ...stateMeModel.user,
                isNextMonth: false,
              })
            }}
        >
          <MonetizationOn/>
          <main>{stateMeModel.user.orderCoinCurrentMonth ?? 0}</main>
          <footer>{ll('本月可用达人币')}</footer>
        </Card>
        <Parting/>
        <Card
            onClick={() => {
              actionsCoinDetailDialogModel.openClick({
                ...stateMeModel.user,
                isNextMonth: true,
              })
            }}
        >
          <MonetizationOn/>
          <main>{stateMeModel.user.orderCoinNextMonth ?? 0}</main>
          <footer>{ll('下月积攒达人币')}</footer>
        </Card>
        <Parting/>
        <Card
            onClick={() => {
              router.push('/m/card/DarenCard')
            }}
        >
          <PaymentIcon/>
          <main>{stateCardModel.promoCodeList.filter(v => v.promoCodeType === PromoCodeTypeEnum.DarenCard).length}</main>
          <footer>{ll('达人卡')}</footer>
        </Card>
      </Tab>
      <ListItem
          onClick={() => {
            router.push('/m/me/orderHistory')
          }}
      >
        <HistoryIcon/>
        <main>
          <section>{ll('我的订单历史')}</section>
        </main>
        <aside>
          <ArrowForwardIosIcon/>
        </aside>
      </ListItem>
      {/*<ListItem*/}
      {/*    onClick={() => {showMessage('网站建设中...')}}*/}
      {/*>*/}
      {/*  <UpdateIcon/>*/}
      {/*  <main>*/}
      {/*    <section>{ls('下次买清单')}</section>*/}
      {/*    <footer>{ls('')}</footer>*/}
      {/*  </main>*/}
      {/*  <aside>*/}
      {/*    <ArrowForwardIosIcon/>*/}
      {/*  </aside>*/}
      {/*</ListItem>*/}
      <ListItem
          onClick={() => {
            router.push('/m/me/myInfo')
          }}
      >
        <CardMembershipIcon/>
        <main>
          <section>{ll('我的达人证')}</section>
        </main>
        <aside>
          <ArrowForwardIosIcon/>
        </aside>
      </ListItem>
      <ListItem
          onClick={() => {
            router.push('/m/me/myCreditCard')
          }}
      >
        <CardGiftcardIcon/>
        <main>
          <section>{ll('我的信用卡')}</section>
        </main>
        <aside>
          <ArrowForwardIosIcon/>
        </aside>
      </ListItem>
      <ListItem
          onClick={() => {
            router.push('/m/me/pickupAddress')
          }}
      >
        <PinDropIcon/>
        <main>
          <section>{ll('我的取货点')}</section>
        </main>
        <aside>
          <ArrowForwardIosIcon/>
        </aside>
      </ListItem>
      <ListItem
          onClick={() => {
            router.push('/m/me/myAddress')
          }}
      >
        <PersonPinCircleIcon/>
        <main>
          <section>{ll('我的地址')}</section>
        </main>
        <aside>
          <ArrowForwardIosIcon/>
        </aside>
      </ListItem>
      <ListItem
          onClick={() => {
            router.push('/m/me/helpCenter')
          }}
      >
        <HelpOutlineIcon/>
        <main>
          <section>{ll('帮助中心')}</section>
        </main>
        <aside>
          <ArrowForwardIosIcon/>
        </aside>
      </ListItem>
      <section style={{height: '200px', width: '2px'}}/>
    </BScroller>)
    }
    <FootBar/>
    <CoinDetailDialog/>
  </Box>
}
