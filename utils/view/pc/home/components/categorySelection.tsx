import React, {useEffect} from 'react'
import styled from 'styled-components'
import {homeCategorySelectionModel} from '../../../m/home/components/CategorySelection/CategorySelection'
import {useStoreModel} from '../../../../ModelAction/useStore'
import {ButtonBase, ButtonBaseProps, Grow} from '@material-ui/core'
import {Space} from '../../../../components/Box/Box'
import KeyboardArrowRightIcon from '@material-ui/icons/KeyboardArrowRight'
import {mpStyle} from '../../../../style/common'
import {categoryItemModel, CategoryPageModel} from '../../../m/category/[id]'
import {useRouter} from 'next/router'
import {modelFactory} from '../../../../ModelAction/modelUtil'
import {fpMergePre} from '../../../../tools/utils'
import {HomeTabsModel} from '../../../m/home/components/Tabs/Tabs'

export const CategorySelectionModel = modelFactory('CategorySelectionModel', {
  isShow: false,
}, {
  switchIsShow: (value: boolean, option) => option.setData(fpMergePre({isShow: value})),
})

const Box = styled.div`
  display: grid;
  grid-template-columns: repeat(3, 1fr);
  z-index: 4;
`
const Line = styled.div`
  display: grid;
  grid-auto-rows: 40px;
  font-size: 18px;
`
const LinkButton = styled(ButtonBase)<ButtonBaseProps & { isact?: number }>`
  &&& {
    justify-content: start;
    > main {
      flex-grow: 1;
      text-align: left;
    }
    ${prop => prop.isact && `
      background: #FEEBEA;
      color: ${mpStyle.red};
    `}
  }
`
const Mask = styled.div`
  position: fixed;
  top: 0;
  left: 0;
  right: 0;
  bottom: 0;
`

export const CategorySelection = ({className}: { className?: string }) => {
  const router = useRouter()
  const {actions: actionsHomeCategorySelectionModel, state: stateHomeCategorySelectionModel} = useStoreModel(homeCategorySelectionModel)
  const {actions: actionsCategoryPageModel, state: stateCategoryPageModel} = useStoreModel(CategoryPageModel)
  const {actions: actionsCategoryPageModel3, state: stateCategoryPageModel3} = useStoreModel(CategoryPageModel, 'CategoryPageModel3')
  const {actions: actionsCategoryItemModel} = useStoreModel(categoryItemModel)
  const {actions: actionsCategorySelectionModel, state: stateCategorySelectionModel} = useStoreModel(CategorySelectionModel)
  const {state: stateHomeTabs} = useStoreModel(HomeTabsModel)

  useEffect(() => {
    if (stateCategorySelectionModel.isShow) {
      actionsHomeCategorySelectionModel.getList()
    }
  }, [actionsHomeCategorySelectionModel, stateCategorySelectionModel.isShow])

  return <>
    {stateCategorySelectionModel.isShow &&
    <Mask
        onClick={() => actionsCategorySelectionModel.switchIsShow(false)}
    />
    }
    <Grow
        in={stateCategorySelectionModel.isShow}
    >
      <Box className={className}>
        <Line>
          {stateHomeCategorySelectionModel?.listData?.map(value => (
              <LinkButton
                  key={`stateHomeCategorySelectionModel?.listData${value.id}`}
                  onClick={() => {
                    actionsHomeCategorySelectionModel.changeActId(value.id)
                    actionsCategoryPageModel.getProductList({
                      categoryItemInput: {id: value.id},
                      productItemInput: {
                        isGroup: 0,
                      },
                    })
                    actionsCategoryItemModel.getCategory({id: value.id})
                  }}
                  isact={value.id === stateHomeCategorySelectionModel.actId ? 1 : 0}
              >
                <Space w={16}/>
                <main>
                  {value.name}
                </main>
                <KeyboardArrowRightIcon/>
                <Space w={8}/>
              </LinkButton>
          ))}
        </Line>
        <Line>
          {stateCategoryPageModel?.categoryList?.map(value => (
              <LinkButton
                  key={`stateCategoryPageModel?.categoryList${value.id}`}
                  onClick={() => {
                    actionsCategoryItemModel.getCategory({id: value.id})
                    actionsCategoryPageModel.changeActCatId(value.id)
                    actionsCategoryPageModel3.getProductList({
                      categoryItemInput: {id: value.id},
                      productItemInput: {
                        isGroup: 0,
                      },
                    })
                  }}
                  isact={stateCategoryPageModel.actCatId === value.id ? 1 : 0}
              >
                <Space w={16}/>
                <main>
                  {value.name}
                </main>
                <Space w={8}/>
              </LinkButton>
          ))}
        </Line>
        {actionsCategoryItemModel.calcCatLevel() >= 2 &&
        <Line>
          {stateCategoryPageModel3?.categoryList?.map(value => (
              <LinkButton
                  key={`stateCategoryPageModel3?.categoryList${value.id}`}
                  onClick={async () => {
                    await router.push(`/pc/category/[id]?homeType=${stateHomeTabs.homeType}`, `/pc/category/${value.id}?homeType=${stateHomeTabs.homeType}`)
                    actionsCategorySelectionModel.switchIsShow(false)
                  }}
                  isact={stateCategoryPageModel3.actCatId === value.id ? 1 : 0}
              >
                <Space w={16}/>
                <main>
                  {value.name}
                </main>
                <Space w={8}/>
              </LinkButton>
          ))}
        </Line>
        }
      </Box>
    </Grow>
  </> || <React.Fragment/>
}
