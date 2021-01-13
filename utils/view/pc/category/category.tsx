import React, {useCallback, useEffect} from 'react'
import {PcHeader} from '../pcComponents/header/header'
import {PcContentBox} from '../home/pcHome'
import {TopAction} from '../pcComponents/topAction/topAction'
import {HeaderTab, HeaderTabModel} from '../home/components/headerTab'
import {Space} from '../../../components/Box/Box'
import {useStoreModel} from '../../../ModelAction/useStore'
import {useRouter} from 'next/router'
import {productListModel} from '../../m/productList/[id]'
import {HomeType} from '../../m/home/appModule'
import {categoryItemModel, CategoryPageModel} from '../../m/category/[id]'
import {Category} from '../../../graphqlTypes/types'
import {homeCategorySelectionModel} from '../../m/home/components/CategorySelection/CategorySelection'
import styled from 'styled-components'
import {ProductItemBox} from '../pcComponents/productItemBox/productItemBox'
import {ll} from '../../../tools/dealKey'
import {MainBox} from '../pcComponents/mainBox/mainBox'
import {HomeTabsModel} from '../../m/home/components/Tabs/Tabs'

const ProductBox = styled.div`
  display: grid;
  grid-template-columns: repeat(6, 1fr);
  grid-gap: 16px;
  justify-items: center;
`
const Filter = styled.div`
`

export const PcCategory = () => {
  const router = useRouter()
  const id = (router.query?.id as string) ?? ''

  const {actions: actionsHeaderTabModel, state: stateHeaderTabModel} = useStoreModel(HeaderTabModel)
  const {actions: actionsProductListModel, state: stateProductListModel} = useStoreModel(productListModel)
  const {actions: actionsCategoryItemModel, state: stateCategoryItemModel} = useStoreModel(categoryItemModel)
  const {actions: actionsCategoryPageModel, state: stateCategoryPageModel} = useStoreModel(CategoryPageModel)
  const {actions: actionsCategoryPageModel3, state: stateCategoryPageModel3} = useStoreModel(CategoryPageModel, 'CategoryPageModel3')
  const {actions: actionsHomeCategorySelectionModel, state: stateHomeCategorySelectionModel} = useStoreModel(homeCategorySelectionModel)
  const {state: stateHomeTabs, actions: actionsHomeTabs} = useStoreModel(HomeTabsModel)

  useEffect(() => {
    actionsHomeTabs.setHomeType((router.query.homeType as string) ?? HomeType.home)
  }, [actionsHomeTabs, router.query.homeType])

  useEffect(() => {
    actionsHeaderTabModel.switchIsCategory(true)
  }, [actionsHeaderTabModel])
  const getCat = useCallback(async () => {
    if (!!id) {
      const category: Category = await actionsCategoryItemModel.getCategory({id})
      if (category?.parentCategory?.parentCategory?.id) {
        actionsHomeCategorySelectionModel.changeActId(category?.parentCategory?.parentCategory?.id)
        await actionsCategoryPageModel.getProductList({
          categoryItemInput: {id: category?.parentCategory?.parentCategory?.id},
          productItemInput: {
            isGroup: 0,
          },
        })
      }
      if (category?.parentCategory?.id) {
        actionsCategoryPageModel.changeActCatId(category?.parentCategory?.id)
        await actionsCategoryPageModel3.getProductList({
          categoryItemInput: {id: category?.parentCategory?.id},
          productItemInput: {
            isGroup: 0,
          },
        })
      }
      if (category?.id) {
        actionsCategoryPageModel3.changeActCatId(category?.id)
      }

      await actionsProductListModel.getData({
        isGroup: router.query.homeType === HomeType.group ? 1 : 0,
        category: {
          id,
        },
      })
    }
  }, [actionsCategoryItemModel, actionsCategoryPageModel, actionsCategoryPageModel3, actionsHomeCategorySelectionModel, actionsProductListModel, id, router.query.homeType])
  useEffect(() => {
    getCat()
  }, [getCat, id])

  return <MainBox>
    <PcHeader/>
    <PcContentBox>
      <TopAction/>
      <HeaderTab/>
      <Space h={16}/>
      <Filter>
        <div/>
        <div>{stateProductListModel.total}{ll('条结果')}</div>
      </Filter>
      <Space h={16}/>
      <ProductBox>
        {stateProductListModel.productList.map(product => <ProductItemBox
            key={`stateProductListModel.productList_${product.id}`}
            product={product}
            type={stateHomeTabs.homeType}
        />)}
      </ProductBox>
    </PcContentBox>
  </MainBox>
}
