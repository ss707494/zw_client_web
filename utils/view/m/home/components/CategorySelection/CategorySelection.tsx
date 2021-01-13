import React, {useEffect} from 'react'
import {grey} from '@material-ui/core/colors'
import {KeyboardArrowRight} from '@material-ui/icons'
import {ButtonBase} from '@material-ui/core'
import {useStoreModel} from '../../../../../ModelAction/useStore'
import {Category, CategoryListInput, Maybe} from '../../../../../graphqlTypes/types'
import {dealUrlQuery, fpMergePre} from '../../../../../tools/utils'
import {Loading} from '../../../../../components/Loading/Loading'
import {categoryList} from '../../../../../graphqlTypes/doc'
import {dealImgUrl} from '../../../../../tools/img'
import {CategoryRootName} from '../../../../../ss_common/enum'
import {modelFactory} from '../../../../../ModelAction/modelUtil'
import {useRouter} from 'next/router'
import {HomeTabsModel} from '../Tabs/Tabs'
import styled from 'styled-components'

export const homeCategorySelectionModel = modelFactory('HomeCategorySelection', {
  listData: [] as Category[],
  total: 0,
  actId: '',
}, {
  getList: async (value, option) => {
    const res = await option.query(categoryList, {
      data: {
        category: {
          parentCategory: {
            id: CategoryRootName,
          },
        },
      } as CategoryListInput
    })
    option.setData(fpMergePre({
      listData: res?.categoryList?.list,
    }))
  },
  changeActId: async (value: Maybe<string>, option) => {
    option.setData(fpMergePre({
      actId: value ?? '',
    }))
  },
})

const ButtonBaseBox = styled(ButtonBase)`
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

export const CategorySelection = () => {
  const router = useRouter()
  const {state: homeCategorySelectionState, actions: homeCategorySelectionActions, getLoad: hsGetLoad} = useStoreModel(homeCategorySelectionModel)
  const {state: homeTabsState} = useStoreModel(HomeTabsModel)

  useEffect(() => {
    homeCategorySelectionActions.getList()
  }, [])

  return (
      <div>
        {!!hsGetLoad(categoryList) && <Loading/>}
        {homeCategorySelectionState?.listData?.map(value => (
            <ButtonBaseBox
                onClick={() => {
                  router.push(`/m/category/[id]${dealUrlQuery({homeType: homeTabsState.homeType})}`, `/m/category/${value.id}${dealUrlQuery({homeType: homeTabsState.homeType})}`)
                }}
                key={`homeCategorySelectionState_${value.id}`}
            >
              <img
                  src={dealImgUrl(value.imgUrl)}
                  alt=''
              />
              <span>
                {value.name}
                <KeyboardArrowRight/>
              </span>
            </ButtonBaseBox>
        ))}
      </div>
  )
}

export default CategorySelection
