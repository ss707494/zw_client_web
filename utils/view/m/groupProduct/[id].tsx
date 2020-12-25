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
      } as DataConfigItemInput
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
`

const YellowStar = () => <StarRoundedIcon fontSize={'small'}
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

const Price = styled.div`
  margin-top: 8px;
  display: flex;
  justify-content: space-between;
  align-items: center;
  > main {
    //font-size: 18px;
    font-weight: bold;
  }
  > main, section {
    > * {
      text-align: center;
    }
  }
`

const Submit = styled.div`
  position: fixed;
  height: 60px;
  bottom: 0;
  width: 100vw;
  background: white;
  border-top: 1px solid ${mpStyle.red};
  display: flex;
  align-items: center;
  justify-content: space-between;
  box-shadow: ${mpStyle.shadow['1']};
  > aside {
    padding-left: 16px;
    color: ${mpStyle.red};
  }
`
const GroupQueueListBox = styled.div<{select: boolean}>`
  margin-top: 16px;
  border-radius: 8px;
  background: ${prop => prop.select
    ? `linear-gradient(to right, ${mpStyle.red}, #FC7361)` 
    : grey['200']};
  display: flex;
  justify-content: space-between;
  align-items: center;
  padding: 0 8px;
`

export const GroupProduct = () => {
  const router = useRouter()
  const id = (router.query?.id as string) ?? ''
  const {actions: actionsGroupProduct, state: stateGroupProduct} = useStoreModel(groupProductModel)
  useEffect(() => {
    actionsGroupProduct.getData(id)
  }, [id])
  const {actions: actionsGroupOrderPageModel} = useStoreModel(groupOrderPageModel)

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
        <span>{dealMoney(product.priceOut)}/{product.packingUnitString}</span>
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
      {stateGroupProduct.groupQueueList.filter(v => (v.sumFillAmount ?? 0) < (product?.groupPrecision ?? 0)).map(groupQueue => {
        const select = groupQueue.id === stateGroupProduct.selectQueueId
        return <GroupQueueListBox
            select={select}
            key={`GroupQueueListBox${groupQueue.id}`}
        >
          <aside>
            {[...Array(product.groupPrecision)].map((v, i) => i).map(value => value + 1 > ((groupQueue.sumFillAmount ?? 0) + (select ? stateGroupProduct.selectNum : 0)) ?
                <StarBorderRoundedIcon
                    key={`clickStar${value}`}
                    fontSize={'large'}
                    onClick={() => actionsGroupProduct.updateSelectNum(value + 1)}
                    style={{color: select ? '#fff' : '#000'}}
                /> : <StarRoundedIcon
                    key={`clickStar${value}`}
                    style={{color: '#FDD334'}}
                    fontSize={'large'}
                    onClick={() => actionsGroupProduct.updateSelectNum(value + 1)}
                />)}
          </aside>
          <footer>{ll((groupQueue.sumFillAmount ?? 0) + (select ? stateGroupProduct.selectNum : 0) === product.groupPrecision ? '成团啦' : '未成团')}</footer>
        </GroupQueueListBox>
      })}
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
      <Price>
        <main>
          <header>{dealMoney(stateGroupProduct.dealDiscountAmountUnit(stateGroupProduct))}</header>
          <footer>{ll('折后价格')}</footer>
        </main>
        <div>=</div>
        <section>
          <header>{dealMoney((product.priceOut ?? 0))}</header>
          <footer>{ll('基准价格')}</footer>
        </section>
        <div>x</div>
        <section>
          <header>{stateGroupProduct.numDiscount}</header>
          <footer>{ll('份数折扣')}</footer>
        </section>
        <div>x</div>
        <section>
          <header>{stateGroupProduct.groupDiscount}</header>
          <footer>{ll('成团折上折')}</footer>
        </section>
      </Price>
    </SmartMatch>
    <Submit>
      <aside>{ll('选择了')}{stateGroupProduct.selectNum}{ll('份')}</aside>
      <Button
          disabled={stateGroupProduct.selectNum === 0}
          style={{height: '100%', padding: '0 32px', borderRadius: '0', fontSize: '18px'}}
          color={'secondary'}
          variant={'contained'}
          onClick={() => {
            actionsGroupOrderPageModel.open()
          }}
      >
        {ll('去结算')}
      </Button>
    </Submit>
    <GroupOrderPage/>
  </div>
}
