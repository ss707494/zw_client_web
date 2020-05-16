import React, {useEffect} from 'react'
import {homeTabsModel} from '../Tabs/Tabs'
import {grey} from '@material-ui/core/colors'
import {KeyboardArrowRight} from '@material-ui/icons'
import {ButtonBase} from '@material-ui/core'
import {useStoreModel} from '../../../../ModelAction/useStore'
import {Category, CategoryListInput} from '../../../../graphqlTypes/types'
import {fpMergePre} from '../../../../tools/utils'
import {Loading} from '../../../../components/Loading/Loading'
import {categoryList} from '../../../../graphqlTypes/doc'
import {dealImgUrl} from '../../../../tools/img'
import {CategoryRootName} from '../../../../ss_common/enum'
import {bScrollModel} from '../../../../components/BScroll/BScroller'
import {modelFactory} from '../../../../ModelAction/modelUtil'

export const homeCategorySelectionModel = modelFactory('HomeCategorySelection', {
  listData: [] as Category[],
  total: 0,
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
})

export const CategorySelection = () => {
  const {state: bsState, actions: bsActions} = useStoreModel(bScrollModel)
  const {state: homeTabsState, actions: homeTabsActions} = useStoreModel(homeTabsModel)
  const {state: homeCategorySelectionState, actions: homeCategorySelectionActions, getLoad: hsGetLoad} = useStoreModel(homeCategorySelectionModel)

  useEffect(() => {
    homeCategorySelectionActions.getList()
  }, [])

  return (
      <div>
        {!!hsGetLoad(categoryList) && <Loading/>}
        {homeCategorySelectionState?.listData?.map(value => (
            <ButtonBase
                className={'main'}
                onClick={() => {
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
            </ButtonBase>
        ))}
        <style jsx>{`
          div > :global(.main) {
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
        `}</style>
      </div>
  )
}

export default CategorySelection
