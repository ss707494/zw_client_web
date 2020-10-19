import React, {useEffect} from 'react'
import SortIcon from '@material-ui/icons/Sort'
import FilterListIcon from '@material-ui/icons/FilterList'
import {modelFactory} from '../../../ModelAction/modelUtil'
import {Category, CategoryItemInput, OrderByInput, Product, ProductItemInput} from '../../../graphqlTypes/types'
import {useRouter} from 'next/router'
import {fpMergePre} from '../../../tools/utils'
import {doc} from '../../../graphqlTypes/doc'
import {useStoreModel} from '../../../ModelAction/useStore'
import {HeaderTitle} from '../../../components/HeaderTitle/HeaderTitle'
import styled from 'styled-components'
import {Button} from '@material-ui/core'
import {ls} from '../../../tools/dealKey'
import {GroupProductItem, ProductItem} from '../../../components/ProductItem/ProductItem'
import {BScroller} from '../../../components/BScroll/BScroller'
import {SortDrawer} from './SortDrawer'
import {FilterDrawer} from './FilterDrawer'
import {ResolverFun} from '../../../commonModel/dialog'
import {HomeType} from '../home/appModule'
import {homeTabsModel} from '../home/components/Tabs/Tabs'
import {UpdateShopCart} from '../../../components/ProductItem/UpdateShopCart'

export const sortTypeEnum = {
  nomalSort: 'nomalSort',
  highestSales: 'highestSales',
  new: 'new',
  priceAsc: 'priceAsc',
  priceDesc: 'priceDesc',
}
export const dealSortSql = (type: string) => {
  const _sql: any = {
    nomalSort: [['id', 'asc'], ['createTime', 'asc']],
    highestSales: [],
    new: [['createTime', 'desc']],
    priceAsc: [['priceOut', 'asc']],
    priceDesc: [['priceOut', 'desc']],
  }
  return _sql[type] || []
}
export const sortTypeLabel: {
  [key in string]: string
} = {
  nomalSort: '综合排序',
  highestSales: '销量最高',
  new: '最新上架',
  priceAsc: '价格由低到高',
  priceDesc: '价格由高到低',
}
export const productListModel = modelFactory('productListModel', {
  category: {} as Category,
  productList: [] as Product[],
  total: 0,
  sortShow: false,
  params: {
    sortType: sortTypeEnum.nomalSort,
  },
  filterShow: false,
  onResolve: (() => {
  }) as ResolverFun,
}, {
  getCategory: async (value: CategoryItemInput, option) => {
    const res = await option.query(doc.oneCategory, {data: value})
    option.setData(fpMergePre({
      category: res?.oneCategory ?? {},
    }))
  },
  getData: async (value: ProductItemInput, option) => {
    const res = await option.query(doc.productList, {
      productInput: value,
      orderByInput: {
        orderByObject: dealSortSql(option.data.params.sortType),
      } as OrderByInput,
    })
    option.setData(fpMergePre({
      productList: res?.productList?.list ?? [],
      total: res?.productList?.total ?? 0
    }))
  },
  openSort: (value, option) => {
    return new Promise(resolve => {
      option.setData(fpMergePre({
        sortShow: true,
        onResolve: resolve,
      }))
    })
  },
  closeSort: (value, option) => {
    option.setData(fpMergePre({
      sortShow: false,
    }))
    option.data.onResolve(value)
  },
  changeSort: async (value, option) => {
    option.setData(fpMergePre({
      params: {
        sortType: value,
      },
    }))
  },
  openFilter: (value, option) => {
    return new Promise(resolve => {
      option.setData(fpMergePre({
        filterShow: true,
        onResolve: resolve,
      }))
    })
  },
  closeFilter: (value, option) => {
    option.setData(fpMergePre({
      filterShow: false,
    }))
    option.data.onResolve(value)
  },
})

const HeaderTab = styled.div`
  display: flex;
  justify-content: space-evenly;
`
const ListBox = styled.div<{columns?: number}>`
  padding: 20px;
  display: grid;
  grid-template-columns: repeat(${props => props.columns || 2}, 1fr);
  grid-gap: 16px;
`

export const ProductList = () => {
  const router = useRouter()
  const id = (router.query?.id as string) ?? ''
  const {actions: actionsPLM, state: statePLM} = useStoreModel(productListModel)
  const {state: stateHomeTabs, actions: actionsHomeTabs} = useStoreModel(homeTabsModel)
  useEffect(() => {
    actionsHomeTabs.setHomeType((router.query.homeType as string) ?? HomeType.home)
  }, [router.query.homeType])

  useEffect(() => {
    if (!!id) {
      actionsPLM.getCategory({id})
      actionsPLM.getData({
        isGroup: router.query.homeType === HomeType.group ? 1 : 0,
        category: {
          id,
        },
      })
    }
  }, [id])

  return <div>
    <HeaderTitle
        title={statePLM.category?.name}
        showCart={router.query.homeType === HomeType.home}
    />
    <HeaderTab>
      <Button
          fullWidth
          onClick={async () => {
            await actionsPLM.openSort()
            actionsPLM.getData({
              isGroup: router.query.homeType === HomeType.group ? 1 : 0,
              category: {
                id,
              },
            })
          }}
      >{ls('排序')}
        <SortIcon/>
      </Button>
      <Button
          fullWidth
          onClick={() => actionsPLM.openFilter()}
      >{ls('筛选')}
        <FilterListIcon/>
      </Button>
    </HeaderTab>
    <BScroller boxHeight={'calc(100vh - 100px)'}>
      <ListBox
          columns={stateHomeTabs.homeType === HomeType.group ? 1 : 2}
      >
        {statePLM.productList.map(value => (stateHomeTabs.homeType === HomeType.group && <GroupProductItem
            product={value}
            key={`ProductItem_${value.id}`}
        />) || <ProductItem
            key={`ProductItem_${value.id}`}
            product={value}/>)}
      </ListBox>
    </BScroller>
    <SortDrawer/>
    <FilterDrawer/>
    <UpdateShopCart/>
  </div>
}
