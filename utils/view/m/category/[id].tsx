import React, {useEffect} from 'react'
import Router, {useRouter} from 'next/router'
import {useStoreModel} from '../../../ModelAction/useStore'
import {Category, CategoryItemInput, Maybe, Product, ProductItemInput} from '../../../graphqlTypes/types'
import {KeyboardArrowRight} from '@material-ui/icons'
import {Breadcrumbs, ButtonBase, LinearProgress, Link, Typography} from '@material-ui/core'
import {dealUrlQuery, fpMergePre} from '../../../tools/utils'
import {HeaderTitle} from '../../../components/HeaderTitle/HeaderTitle'
import {doc} from '../../../graphqlTypes/doc'
import {BScroller} from '../../../components/BScroll/BScroller'
import {modelFactory} from '../../../ModelAction/modelUtil'
import styled from 'styled-components'
import {grey} from '@material-ui/core/colors'
import {dealImgUrl} from '../../../tools/img'
import {GroupProductItem, ProductItem} from '../../../components/ProductItem/ProductItem'
import {ll} from '../../../tools/dealKey'
import {NoData} from '../../../components/NoData/NoData'
import {CategoryRootName} from '../../../ss_common/enum'
import {UpdateShopCart} from '../../../components/ProductItem/UpdateShopCart'
import {HomeType} from '../home/appModule'
import {homeTabsModel} from '../home/components/Tabs/Tabs'

export const CategoryPageModel = modelFactory('CategoryPage', {
  productList: [] as Product[],
  categoryList: [] as Category[],
  actCatId: '',
}, {
  getProductList: async (value: {
    categoryItemInput?: CategoryItemInput,
    productItemInput?: ProductItemInput,
  }, option) => {
    const res = await option.query(doc.productsInCategory, {
      data: value.categoryItemInput,
      productItemInput: value.productItemInput,
    })
    option.setData(fpMergePre({
      productList: res?.productsInCategory?.list ?? [],
      categoryList: [
        ...res?.categoryList?.list ?? [],
      ],
    }))
  },
  changeActCatId: async (value: Maybe<string>, option) => {
    option.setData(fpMergePre({
      actCatId: value ?? '',
    }))
  },
})

const Box = styled('div')`
  padding: 18px 20px 0;
  > header {
    font-size: 18px;
    font-weight: bold;
    margin: 10px 0;
  }
`

const CategoryItemStyle = styled(ButtonBase)`
  &&& {
    width: 100%;
    height: 60px;
    display: flex;
    border-radius: 8px;
    overflow: hidden;
    margin-bottom: 10px;
    background: ${grey[700]};
    > img {
      height: 100%;
      width: 70%;
    }
    > span {
      flex: 1;
      color: #fff;
      display: flex;
      align-items: center;
      justify-content: center;
    }
  }
`

export const categoryItemModel = modelFactory('categoryItemModel', {
  test: '',
  category: {} as Category,
}, {
  calcCatLevel: (value, option) => {
    const dealLevel: (obj: Maybe<Category>, level?: number) => number = (obj, level = 1) => {
      if (!obj?.parentCategory || obj?.parentCategory?.id === CategoryRootName) return level
      return dealLevel(obj?.parentCategory, level + 1)
    }
    return dealLevel(option.data?.category)
  },
  getLevel: async (value: CategoryItemInput, option) => {
    return await option.query(doc.categoryLevel, {
      data: value,
    })
  },
  getCategory: async (value: CategoryItemInput, option) => {
    const res = await option.query(doc.categoryRootParent, {categoryItemInput: value})
    option.setData(fpMergePre({
      category: res?.categoryRootParent ?? {},
    }))
    return res?.categoryRootParent
  },
})


const ListBox = styled.div<React.DetailedHTMLProps<React.HTMLAttributes<HTMLDivElement>, HTMLDivElement> & { columns?: number }>`
  display: grid;
  grid-template-columns: repeat(${props => props.columns || 2}, 1fr);
  grid-gap: 16px;
`

export const CategoryPage = () => {
  const router = useRouter()
  const id = (router.query?.id as string) ?? ''
  const {state: stateCPM, actions: actionsCPM, getLoad} = useStoreModel(CategoryPageModel)
  const {actions: actionsCI, state: stateCategoryItemModel} = useStoreModel(categoryItemModel)
  const {state: stateHomeTabs, actions: actionsHomeTabs} = useStoreModel(homeTabsModel)
  useEffect(() => {
    actionsHomeTabs.setHomeType((router.query.homeType as string) ?? HomeType.home)
  }, [router.query.homeType])

  const CategoryItem = (v: Category) => {
    return <CategoryItemStyle
        key={`CategoryItem_${v.id}`}
        onClick={async () => {
          const _query = dealUrlQuery({homeType: router.query.homeType})
          if ((await actionsCI.getLevel({
            id: v.id,
          }))?.categoryLevel === 3) {
            await Router.push(`/m/productList/[id]${_query}`, `/m/productList/${v.id}${_query}`)
          } else {
            await Router.push(`/m/category/[id]${_query}`, `/m/category/${v.id}${_query}`)
          }
        }}
    >
      <img
          src={dealImgUrl(v.imgUrl)}
          alt=''
      />
      <span>{v.name}<KeyboardArrowRight/></span>
    </CategoryItemStyle>
  }

  useEffect(() => {
    if (id) {
      actionsCPM.getProductList({
        categoryItemInput: {id},
        productItemInput: {
          isGroup: router.query.homeType === HomeType.group ? 1 : 0,
        },
      })
      actionsCI.getCategory({id})
    }
  }, [id])

  return <div>
    <HeaderTitle
        title={''}
        showCart={router.query.homeType === HomeType.home}
        showSearch={true}
    />
    {!!getLoad(doc.productsInCategory) && <LinearProgress/>}
    <Breadcrumbs
        style={{margin: '8px 0 0 8px'}}
        separator="›"
        aria-label="breadcrumb">
      {[stateCategoryItemModel.category?.parentCategory?.parentCategory, stateCategoryItemModel.category?.parentCategory].filter(v => !!v?.name && v?.name !== CategoryRootName).map(e =>
          <Link
              key={`Breadcrumbs${e?.id}`}
              color="inherit"
              href="#"
              onClick={async () => {
                const _query = dealUrlQuery({homeType: router.query.homeType})
                await Router.push(`/m/category/[id]${_query}`, `/m/category/${e?.id}${_query}`)
              }}>
            {e?.name}
          </Link>)}
      <Typography color="textPrimary">{stateCategoryItemModel.category.name}</Typography>
    </Breadcrumbs>
    <BScroller boxHeight={'calc(100vh - 60px)'}>
      <Box>
        {((stateCPM.categoryList.length === 0 && stateCPM.productList.length === 0) && <NoData/>) ||
        (
            <>
              {stateCPM.categoryList.map(value => CategoryItem(value))}
              <header>{ll('热门推荐')}</header>
              {(stateCPM.productList.length === 0) && <NoData/>}
              <ListBox
                  columns={stateHomeTabs.homeType === HomeType.group ? 1 : 2}
              >
                {stateCPM.productList.map(value => (stateHomeTabs.homeType === HomeType.group && <GroupProductItem
                    product={value}
                    key={`ProductItem_${value.id}`}
                />) || <ProductItem
                    key={`ProductItem_${value.id}`}
                    product={value}/>)}
              </ListBox>
            </>
        )
        }

      </Box>
    </BScroller>
    <UpdateShopCart/>
  </div>
}
