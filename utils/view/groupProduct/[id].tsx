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

export const groupProductModel = modelFactory('groupProductModel', {
  product: {} as Product,
  groupQueneList: [] as GroupQueue[],
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

export const GroupProduct = () => {
  const router = useRouter()
  const id = (router.query?.id as string) ?? ''
  const {actions: actionsGroupProduct, state: stateGroupProduct} = useStoreModel(groupProductModel)
  useEffect(() => {
    actionsGroupProduct.getData(id)
  }, [id])

  const product = stateGroupProduct.product

  console.log()
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
      <span>{[...Array(4)].map((v, i) => i).map(value => <YellowStar key={value} />)}</span>
      </section>
    </Name>
    <YellowStar/>
    <StarBorderRoundedIcon />
    {id}
    groupProduct
  </div>
}
