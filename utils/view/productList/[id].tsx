import React, {useEffect} from 'react'
import SortIcon from '@material-ui/icons/Sort'
import FilterListIcon from '@material-ui/icons/FilterList'
import {modelFactory} from '../../ModelAction/modelUtil'
import {Category, CategoryItemInput, Product} from '../../graphqlTypes/types'
import {useRouter} from 'next/router'
import {fpMergePre} from '../../tools/utils'
import {doc} from '../../graphqlTypes/doc'
import {useStoreModel} from '../../ModelAction/useStore'
import {HeaderTitle} from '../../components/HeaderTitle/HeaderTitle'
import styled from 'styled-components'
import {Button} from '@material-ui/core'
import {ls} from '../../tools/dealKey'
import {ProductItem} from '../../components/ProductItem/ProductItem'
import {BScroller} from '../../components/BScroll/BScroller'

export const productListModel = modelFactory('productListModel', {
  category: {} as Category,
  productList: [] as Product[],
}, {
  getCategory: async (value: CategoryItemInput, option) => {
    const res = await option.query(doc.oneCategory, {data: value})
    option.setData(fpMergePre({
      category: res?.oneCategory ?? {},
    }))
  },
  getData: async (value: CategoryItemInput, option) => {
    const res = await option.query(doc.productsList, {data: value})
    option.setData(fpMergePre({
      productList: res?.productsInCategory[0] ?? [],
    }))
  },

})

const HeaderTab = styled.div`
  display: flex;
  justify-content: space-evenly;
`
const ListBox = styled.div`
  padding: 20px;
  display: grid;
  grid-template-columns: repeat(2, 1fr);
  grid-gap: 15px;
`

export const ProductList = () => {
  const router = useRouter()
  const id = (router.query?.id as string) ?? ''
  const {actions: actionsPLM, state: statePLM} = useStoreModel(productListModel)

  useEffect(() => {
    if (!!id) {
      actionsPLM.getCategory({id})
      actionsPLM.getData({id})
    }
  }, [id])

  return <div>
    <HeaderTitle
        title={statePLM.category?.name}
    />
    <HeaderTab>
      <Button
          fullWidth
      >{ls('排序')}
        <SortIcon/>
      </Button>
      <Button
          fullWidth
      >{ls('筛选')}
        <FilterListIcon/>
      </Button>
    </HeaderTab>
    <BScroller boxHeight={'calc(100vh - 100px)'}>
      <ListBox>
        {statePLM.productList.map(value => <ProductItem
            key={`ProductItem_${value.id}`}
            product={value}
        />)}
      </ListBox>
    </BScroller>
  </div>
}
