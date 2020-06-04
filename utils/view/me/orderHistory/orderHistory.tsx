import React, {useEffect} from 'react'
import ArrowForwardIosIcon from '@material-ui/icons/ArrowForwardIos'
import {HeaderTitle} from '../../../components/HeaderTitle/HeaderTitle'
import {Button, ButtonBase, Tab, Tabs} from '@material-ui/core'
import {ls} from '../../../tools/dealKey'
import {modelFactory} from '../../../ModelAction/modelUtil'
import {useStoreModel} from '../../../ModelAction/useStore'
import {formatDate, fpMergePre} from '../../../tools/utils'
import {doc} from '../../../graphqlTypes/doc'
import {OrderInput, OrderPage} from '../../../graphqlTypes/types'
import {BScroller} from '../../../components/BScroll/BScroller'
import styled from 'styled-components'
import {grey} from '@material-ui/core/colors'
import {dealImgUrl} from '../../../tools/img'
import {mpStyle} from '../../../style/common'
import {OrderState, orderStateToString} from '../../../ss_common/enum'
import {useRouter} from 'next/router'

const orderHistoryModel = modelFactory('orderHistoryModel', {
  state: 0,
  orderList: [] as OrderPage,
}, {
  changeState: (value, option) => {
    option.setData(fpMergePre({state: value}))
  },
  getList: async (value, option) => {
    const res = await option.query(doc.orderList, {
      data: {
        state: option.data.state,
      } as OrderInput,
    })
    option.setData(fpMergePre({
      orderList: res?.orderList,
    }))
  },
})

const Parting = styled.div`
    height: 18px;
    width: 100%;
    background: ${grey[100]};
`
const Item = styled('div')`
  &&& {
    padding: 20px;
    display: flex;
    flex-direction: column;
    align-items: stretch;
    > header {
      display: flex;
      justify-content: space-between;
    }
    > section {
      margin-top: 10px;
      text-align: right;
      > span {
        color: ${mpStyle.red};
      }
    }
    > footer {
      text-align: right;
      margin-top: 10px;
    }
  }
`
const ImgList = styled(ButtonBase)`
  &&& {
    display: grid;
    width: 100%;
    grid-template-columns: repeat(4, 1fr) 30px;
    grid-gap: 10px;
    align-items: center;
    min-height: 20vw;
    > img {
      max-width: 16vw;
      border-radius: 8px;
    }
    > aside {
      grid-area: 1/5/2/6;
      justify-self: end;
    }
  }
`

export const OrderHistory = () => {
  const router = useRouter()
  const {state: ohState, actions: ohActions} = useStoreModel(orderHistoryModel)
  useEffect(() => {
    ohActions.getList()
  }, [])

  return <div>
    <HeaderTitle
        title={'订单历史'}
    />
    <Tabs
        variant={'fullWidth'}
        value={ohState.state}
        onChange={(e, value) => {
          ohActions.changeState(value)
          ohActions.getList()
        }}
    >
      <Tab
          value={0}
          label={ls('全部')}
      />
      <Tab
          value={OrderState.Picking}
          label={ls('待收货/取货')}
      />
      <Tab
          value={OrderState.Paid}
          label={ls('代付款')}
      />
    </Tabs>
    <BScroller
        boxHeight={'calc(100vh - 108px)'}
    >
      {ohState.orderList.list?.map(value =>
          <React.Fragment
              key={`ohState.orderList_${value?.id}`}
          >
            <Parting/>
            <Item>
              <header>
                <span>{formatDate(value?.createTime)}</span>
                <aside>{orderStateToString(value?.state)}</aside>
              </header>
              <ImgList
                  onClick={() => router.push('/me/orderDetail/[id]', `/me/orderDetail/${value?.id}`)}
              >
                {value?.rOrderProduct?.filter(value => value?.product?.img?.[0]?.url)?.map(value1 => <img
                    key={`url_${value1?.product?.img?.[0]?.url}`}
                    src={dealImgUrl(value1?.product?.img?.[0]?.url)}
                    alt=""/>)}
                <aside>
                  <ArrowForwardIosIcon htmlColor={grey[400]}/>
                </aside>
              </ImgList>
              <section>
                共{value?.rOrderProduct?.reduce((pre, cur) => pre + (cur?.count ?? 0), 0)}件商品 实付<span>${value?.actuallyPaid ?? 0}</span>
              </section>
              <footer>
                <Button
                    color={'secondary'}
                    variant={'contained'}
                    onClick={e => {
                      console.log('123')
                      e.stopPropagation()
                    }}
                >{ls('确认收货')}</Button>
              </footer>
            </Item>
          </React.Fragment>,
      )}
      <Parting/>
    </BScroller>
  </div>
}
