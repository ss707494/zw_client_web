import React, {useEffect} from 'react'
import {HeaderTitle} from '../../../components/HeaderTitle/HeaderTitle'
import {BScroller} from '../../../components/BScroll/BScroller'
import styled from 'styled-components'
import {modelFactory} from '../../../ModelAction/modelUtil'
import {OrderInfo} from '../../../graphqlTypes/types'
import {doc} from '../../../graphqlTypes/doc'
import {formatDate, fpMergePre} from '../../../tools/utils'
import {useStoreModel} from '../../../ModelAction/useStore'
import {useRouter} from 'next/router'
import {ls} from '../../../tools/dealKey'
import {orderStateToString} from '../../../ss_common/enum'
import {mpStyle} from '../../../style/common'
import {grey} from '@material-ui/core/colors'

export const orderDetailModel = modelFactory('orderDetail', {
  orderInfo: {} as OrderInfo,
}, {
  getDetail: async (value: string, option) => {
    const res = await option.query(doc.orderDetail, {id: value})
    option.setData(fpMergePre({
      orderInfo: res?.orderDetail,
    }))
  },
})

const Box = styled.div`
  padding: 0 20px;
`
const Top = styled.div`
  margin-top: 10px;
  font-size: 18px;
  display: flex;
  > aside {
    margin-left: 20px;
    color: ${mpStyle.red};
  }
`
const InfoLabel = styled.div`
  display: flex;
  margin-top: 16px;
  > aside {
    color: ${grey[600]};
    width: 80px;
  }
  
`

export const OrderDetail = () => {
  const router = useRouter()
  const {state: stateOD, actions: actionsOD} = useStoreModel(orderDetailModel)

  const orderInfo = stateOD.orderInfo
  console.log(orderInfo)

  useEffect(() => {
    if (router.query.id && !stateOD.orderInfo?.id) {
      actionsOD.getDetail(`${router.query?.id}`)
    }
  }, [router.query.id, stateOD.orderInfo])

  return <div>
    <HeaderTitle
        title={'订单详情'}
    />
    {!orderInfo?.id ? <div/> : <BScroller boxHeight={'calc(100vh - 60px)'}>
      <Box>
        <Top>
          <section>{ls(formatDate(orderInfo.createTime))}</section>
          <aside>{orderStateToString(orderInfo?.state)}</aside>
        </Top>
        <InfoLabel>
          <aside>{ls('送货地址')} :</aside>
          <section>{orderInfo.userAddress?.combineAddress}</section>
        </InfoLabel>
        <InfoLabel>
          <aside>{ls('订单编号')} :</aside>
          <section>{orderInfo.number}</section>
        </InfoLabel>
        <InfoLabel>
          <aside>{ls('支付方式')} :</aside>
          <section>
            <header>{orderInfo?.userPayCard?.code}</header>
            <main>{formatDate(orderInfo?.userPayCard?.expirationTime, 'MM/yy')}</main>
            <footer>{orderInfo?.userPayCard?.userName}</footer>
          </section>
        </InfoLabel>
        <div style={{marginTop: '12px', position: 'relative', left: '-20px', width: '100vw', height: '12px', background: grey[200]}}/>
      </Box>
    </BScroller>}

  </div>
}
