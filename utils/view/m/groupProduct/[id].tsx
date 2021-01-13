import React, {useEffect} from 'react'
import StarRoundedIcon from '@material-ui/icons/StarRounded'
import StarBorderRoundedIcon from '@material-ui/icons/StarBorderRounded'
import {useRouter} from 'next/router'
import {modelFactory} from '../../../ModelAction/modelUtil'
import {
  DataConfigItemInput,
  GroupOrderItemInput,
  GroupQueue,
  GroupQueueItemInput,
  OrderInfoItemInput,
  Product,
} from '../../../graphqlTypes/types'
import {doc, getDataConfig} from '../../../graphqlTypes/doc'
import {useStoreModel} from '../../../ModelAction/useStore'
import {dealMoney, fpMergePre} from '../../../tools/utils'
import CusCarousel from '../../../components/Swipe/Swipe'
import {HeaderTitle} from '../../../components/HeaderTitle/HeaderTitle'
import styled from 'styled-components'
import {ll} from '../../../tools/dealKey'
import {mpStyle} from '../../../style/common'
import {grey} from '@material-ui/core/colors'
import {Button} from '@material-ui/core'
import {GroupOrderPage, groupOrderPageModel} from './groupOrderPage'
import {DictTypeEnum} from '../../../ss_common/enum'
import {GroupQueueList} from './groupQueueList'
import {PriceBox} from '../../pc/groupProduct/[id]'
import {ShopCartModel} from '../cart'

const dealDiscount = (num: number) => {
  return (100 - num ?? 0) / 100
}
export const dealGroupNumbers = (product: Product) => {
  return ~~((product.groupAmount ?? 0) / (product.groupPrecision ?? 1))
}
export const groupProductModel = modelFactory('groupProductModel', {
  product: {} as Product,
  groupQueueList: [] as GroupQueue[],
  selectNum: 0,
  selectQueueId: '',
  numDiscount: 1,
  groupDiscount: 1,
  groupDiscountConfig: {} as any,
  dealDiscountAmountUnit: (state: any) => {
    return (state.product.priceOut ?? 0) * state.numDiscount * state.groupDiscount
  },
  dealDiscountAmount: (state: any) => {
    return (state.product.priceOut ?? 0) * state.selectNum * dealGroupNumbers(state.product) * state.numDiscount * state.groupDiscount
  },
}, {
  getData: async (value: string, option) => {
    const res = await option.query(doc.productListByIds, {
      ids: [value],
    })
    const groupQueueList = await option.query(doc.groupQueueList, {
      groupQueueItemInput: {
        product: {
          id: value,
        },
      } as GroupQueueItemInput,
    })
    const res2 = await option.query(getDataConfig, {
      data: {
        type: DictTypeEnum.GroupPrecision,
      } as DataConfigItemInput,
    }, {})

    option.setData(fpMergePre({
      product: res?.productListByIds?.list[0] ?? {},
      groupQueueList: groupQueueList?.groupQueueList?.sort((a: GroupQueue, b: GroupQueue) => (a.sumFillAmount ?? 0) - (b.sumFillAmount ?? 0)) ?? [],
      groupDiscountConfig: res2?.getDataConfig?.value,
    }))
  },
  updateSelectNum: (value: number, option) => {
    const groupDiscountConfig = option.data.groupDiscountConfig
    const selectNum = value === option.data.selectNum ? 0 : value
    const selectQueueId = value === option.data.selectNum ? '' : [...option.data.groupQueueList].reverse()?.find(v => (v.sumFillAmount ?? 0) + value <= (option.data?.product?.groupPrecision ?? 0))?.id ?? ''

    option.setData(fpMergePre({
      selectNum,
      selectQueueId,
      groupDiscount: (option.data.groupQueueList.find(value1 => value1.id === selectQueueId)?.sumFillAmount ?? 0) + selectNum === option.data.product.groupPrecision ? dealDiscount(groupDiscountConfig.groupDiscount) : 1,
      numDiscount: dealDiscount(groupDiscountConfig?.[(option.data.product.groupPrecision ?? 0)]?.discount?.[selectNum]) ?? 1,
    }))
  },
  clearData: (value, option) => {
    option.setData(fpMergePre({
      selectNum: 0,
      selectQueueId: '',
      numDiscount: 1,
      groupDiscount: 1,
    }))
  },
  submit: async ({orderInfoItemInput}: { orderInfoItemInput: OrderInfoItemInput }, option) => {
    return await option.mutate(doc.saveGroupOrder, {
      orderInfoItemInput: {
        ...orderInfoItemInput,
      } as OrderInfoItemInput,
      groupOrderItemInput: {
        orderGroupAmount: option.data.selectNum,
      } as GroupOrderItemInput,
      groupQueueItemInput: {
        product: option.data.product,
        ...(option.data.selectQueueId ? {id: option.data.selectQueueId} : {}),
      } as GroupQueueItemInput,
    })
  },
})

const PriceRed = styled.div`
  background: ${mpStyle.red};
  color: white;
  display: grid;
  grid-template-columns: 1fr 120px;
  grid-template-rows: repeat(2, 30px);
  align-items: center;

  > main {
    grid-area: 1/1/3/2;
    padding-left: 20px;

    > span {
      margin-left: 16px;
    }
  }
`
const Name = styled.div`
  padding: 16px 20px;
  display: flex;
  align-items: flex-end;

  > main {
    font-size: 22px;
    margin-right: 8px;
    flex-shrink: 0;
  }

  > section {
    > span {
      padding: 0 4px;
      background: ${grey['700']};
      border-radius: 4px;
      position: relative;
      bottom: -4px;
      margin-left: 8px;
      display: inline-flex;
      align-items: center;
    }
  }

  grid-auto-flow: column;
`

export const YellowStar = () => <StarRoundedIcon fontSize={'small'}
                                                 style={{color: '#FDD334'}}/>

const Title = styled.header`
  font-size: 20px;
`
const GroupQueueBox = styled.div`
  padding: 16px;
`

const SmartMatch = styled.div`
  padding: 16px 16px 90px;

  > section {
    margin-top: 8px;
    display: flex;
    align-items: center;
  }

  > main {
    > svg {
      font-size: 3.0rem;
    }
  }
`
const Submit = styled.div`
  background: white;
  border-top: 1px solid ${mpStyle.red};
  display: flex;
  align-items: center;
  justify-content: space-between;

  > aside {
    padding-left: 16px;
    color: ${mpStyle.red};
  }
`
export const GroupSubmit = ({className, submitCall}: {className?: string, submitCall?: Function}) => {
  const {actions: actionsShopCartModel} = useStoreModel(ShopCartModel)
  const {state: stateGroupProduct} = useStoreModel(groupProductModel)

  return <Submit
      className={className}
  >
    <aside>{ll('选择了')}{stateGroupProduct.selectNum}{ll('份')}</aside>
    <Button
        disabled={stateGroupProduct.selectNum === 0}
        style={{height: '100%', padding: '0 32px', borderRadius: '0', fontSize: '18px'}}
        color={'secondary'}
        variant={'contained'}
        onClick={() => {
          actionsShopCartModel.updateIsGroupOrder(true)
          submitCall && submitCall()
        }}
    >
      {ll('去结算')}
    </Button>
  </Submit>
}

const GroupSubmitBox = styled(GroupSubmit)`
  &&& {
    position: fixed;
    height: 60px;
    bottom: 0;
    width: 100vw;
    box-shadow: ${mpStyle.shadow['1']};
  }
`

export const GroupProduct = () => {
  const router = useRouter()
  const id = (router.query?.id as string) ?? ''
  const {actions: actionsGroupOrderPageModel} = useStoreModel(groupOrderPageModel)
  const {actions: actionsGroupProduct, state: stateGroupProduct} = useStoreModel(groupProductModel)
  useEffect(() => {
    actionsGroupProduct.getData(id)
  }, [actionsGroupProduct, id])

  const product = stateGroupProduct.product
  // useEffect(() => {
  //   actionsGroupProduct.updateSelectNum(2)
  //   actionsGroupOrderPageModel.open()
  // }, [])

  return <div>
    <HeaderTitle
        title={'产品详情'}
    />
    <CusCarousel
        height={'240px'}
        dataList={product?.img?.map(v => ({
          ...v,
          imgUrl: v?.url,
        })) as []}
    />
    <PriceRed>
      <main>
        {ll('基准价格')}
        <span>{dealMoney(product.priceOut)}/{product.groupAmountUnitString}</span>
      </main>
      <aside>{ll('已成团')}{stateGroupProduct.groupQueueList.filter(v => v.sumFillAmount === product?.groupPrecision).length}{ll('单')}</aside>
      <aside>{ll('拼团中')}{stateGroupProduct.groupQueueList.filter(v => (v.sumFillAmount ?? 0) < (product?.groupPrecision ?? 0)).length}{ll('单')}</aside>
    </PriceRed>
    <Name>
      <main>{product.name}</main>
      <section>{product.groupRemark}/{product.groupAmount}{product.groupAmountUnitString} {`每一份${dealGroupNumbers(product)}${product.groupAmountUnitString}`}<br/>
        {ll('分团精度')}<span>{[...Array(product.groupPrecision)].map((v, i) => i).map(value =>
            <YellowStar key={value}/>)}</span>
      </section>
    </Name>
    <GroupQueueBox>
      <Title>{ll('拼团中')}</Title>
      <GroupQueueList/>
    </GroupQueueBox>
    <SmartMatch>
      <header>
        <Title>{ll('智能匹配')}</Title>
      </header>
      <section>
        {ll('请点击')}
        <StarBorderRoundedIcon/>
        {ll('确定您需要的份数')}
      </section>
      <main>
        {[...Array(product.groupPrecision)].map((v, i) => i).map(value => value + 1 > stateGroupProduct.selectNum ?
            <StarBorderRoundedIcon
                key={`clickStar${value}`}
                fontSize={'large'}
                onClick={() => actionsGroupProduct.updateSelectNum(value + 1)}
            /> : <StarRoundedIcon
                key={`clickStar${value}`}
                style={{color: '#FDD334'}}
                fontSize={'large'}
                onClick={() => actionsGroupProduct.updateSelectNum(value + 1)}
            />)}
      </main>
      <PriceBox/>
    </SmartMatch>
    <GroupSubmitBox
        submitCall={() => {
          actionsGroupOrderPageModel.open()
        }}
    />
    <GroupOrderPage/>
  </div>
}
