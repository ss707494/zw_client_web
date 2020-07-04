import React, {useEffect} from 'react'
import StarRoundedIcon from '@material-ui/icons/StarRounded'
import StarBorderRoundedIcon from '@material-ui/icons/StarBorderRounded'
import {useRouter} from 'next/router'
import {modelFactory} from '../../ModelAction/modelUtil'
import {GroupQueue, GroupQueueItemInput, Product} from '../../graphqlTypes/types'
import {doc} from '../../graphqlTypes/doc'
import {useStoreModel} from '../../ModelAction/useStore'
import {dealMoney, fpMergePre} from '../../tools/utils'
import CusCarousel from '../../components/Swipe/Swipe'
import {HeaderTitle} from '../../components/HeaderTitle/HeaderTitle'
import styled from 'styled-components'
import {ls} from '../../tools/dealKey'
import {mpStyle} from '../../style/common'
import {grey} from '@material-ui/core/colors'
import {Button} from '@material-ui/core'
import {GroupOrderPage, groupOrderPageModel} from './groupOrderPage'

export const groupProductModel = modelFactory('groupProductModel', {
  product: {} as Product,
  groupQueneList: [] as GroupQueue[],
  selectNum: 0,
}, {
  getData: async (value: string, option) => {
    const res = await option.query(doc.productListByIds, {
      ids: [value],
    })
    const groupQueneList = await option.query(doc.groupQueueList, {
      groupQueueItemInput: {
        product: {
          id: value,
        },
      } as GroupQueueItemInput,
    })
    option.setData(fpMergePre({
      product: res?.productListByIds?.list[0] ?? {},
      groupQueneList: groupQueneList?.groupQueueList ?? [],
    }))
  },
  updateSelectNum: (value: number, option) => {
    option.setData(fpMergePre({
      selectNum: value === option.data.selectNum ? 0 : value
    }))
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

const YellowStar = () => <StarRoundedIcon fontSize={'small'} style={{color: '#FDD334'}}/>

const Title = styled.header`
  font-size: 20px;
`
const GroupQuene = styled.div`
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

export const GroupProduct = () => {
  const router = useRouter()
  const id = (router.query?.id as string) ?? ''
  const {actions: actionsGroupProduct, state: stateGroupProduct} = useStoreModel(groupProductModel)
  useEffect(() => {
    actionsGroupProduct.getData(id)
  }, [id])
  const {actions: actionsGroupOrderPageModel} = useStoreModel(groupOrderPageModel)

  const product = stateGroupProduct.product

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
        {ls('基准价格')}
        <span>{dealMoney(product.priceOut)}/{product.packingUnitString}</span>
      </main>
      <aside>{ls('已成团')}{23}{ls('单')}</aside>
      <aside>{ls('拼团中')}{2}{ls('单')}</aside>
    </PriceRed>
    <Name>
      <main>{product.name}</main>
      <section>{product.groupRemark}/{product.groupAmount}{product.groupAmountUnitString}<br/>{ls('分团精度')}
      <span>{[...Array(product.groupPrecision)].map((v, i) => i).map(value => <YellowStar key={value} />)}</span>
      </section>
    </Name>
    <GroupQuene>
      <Title>{ls('拼团中')}</Title>
    </GroupQuene>
    <SmartMatch>
      <header>
        <Title>{ls('智能匹配')}</Title>
      </header>
      <section>
        {ls('请点击')}
        <StarBorderRoundedIcon />
        {ls('确定您需要的份数')}
      </section>
      <main>
        {[...Array(product.groupPrecision)].map((v, i) => i).map(value => value + 1 > stateGroupProduct.selectNum ? <StarBorderRoundedIcon
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
          <header>{dealMoney((product.priceOut ?? 0) * stateGroupProduct.selectNum)}</header>
          <footer>{ls('折后价格')}</footer>
        </main>
        <div>=</div>
        <section>
          <header>{dealMoney((product.priceOut ?? 0) * stateGroupProduct.selectNum)}</header>
          <footer>{ls('基准价格')}</footer>
        </section>
        <div>x</div>
        <section>
          <header>1</header>
          <footer>{ls('份数折扣')}</footer>
        </section>
        <div>x</div>
        <section>
          <header>1</header>
          <footer>{ls('成团折上折')}</footer>
        </section>
      </Price>
    </SmartMatch>
    <Submit>
      <aside>{ls('选择了')}{stateGroupProduct.selectNum}{ls('份')}</aside>
      <Button
          style={{height: '100%', padding: '0 32px', borderRadius: '0', fontSize: '18px'}}
          color={'secondary'}
          variant={'contained'}
          onClick={() => {
            actionsGroupOrderPageModel.open()
          }}
      >
        {ls('去结算')}
      </Button>
    </Submit>
    <GroupOrderPage/>
  </div>
}
