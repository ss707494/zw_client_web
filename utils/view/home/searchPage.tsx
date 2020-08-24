import React, {useEffect} from 'react'
import {HeaderTitle} from '../../components/HeaderTitle/HeaderTitle'
import CloseIcon from '@material-ui/icons/Close'
import styled from 'styled-components'
import {Divider, IconButton, InputAdornment, TextField} from '@material-ui/core'
import {Autocomplete} from '@material-ui/lab'
import {Search} from '@material-ui/icons'
import {modelFactory} from '../../ModelAction/modelUtil'
import {Product, PromoCode, User} from '../../graphqlTypes/types'
import {doc} from '../../graphqlTypes/doc'
import {useStoreModel} from '../../ModelAction/useStore'
import {setForm} from '../../tools/commonAction'
import {fpMergePre} from '../../tools/utils'
import {ls} from '../../tools/dealKey'
import {GroupProductItem, ProductItemOneRow} from '../../components/ProductItem/ProductItem'
import {Space} from '../../components/Box/Box'
import {getPromoCodeItem} from '../card/[type]'
import {UpdateShopCart} from '../../components/ProductItem/UpdateShopCart'

export const SearchPageModel = modelFactory('SearchPage', {
  form: {
    keyword: '',
  },
  productList: [] as Product[],
  groupProductList: [] as Product[],
  promoCodePromoCodeList: [] as PromoCode[],
  darenCardPromoCodeList: [] as PromoCode[],
  user: {} as User,
}, {
  setForm: setForm,
  getData: async (value, option) => {
    const res = await option.query(doc.searchData, {
      keyword: option.data.form.keyword ?? '',
    })
    option.setData(fpMergePre({
      productList: res?.productList?.list ?? [],
      groupProductList: res?.groupProductList?.list ?? [],
      promoCodePromoCodeList: res?.promoCodePromoCodeList ?? [],
      darenCardPromoCodeList: res?.darenCardPromoCodeList ?? [],
      user: res?.oneUser ?? {},
    }))
  },
})

const SearchInput = styled.div`
  padding: 0 16px;
`
const Title = styled.div`
  padding: 16px;
  font-size: 18px;
`
const ListBox = styled.div`
  padding: 0 16px;
`
export const SearchPage = () => {
  const {actions: actionsSearchPageModel, state: stateSearchPageModel} = useStoreModel(SearchPageModel)

  useEffect(() => {
  }, [])

  return <div>
    <HeaderTitle
        title={'搜索'}
        LeftIcon={CloseIcon}
        showCart={true}
    />
    <SearchInput>
      <Autocomplete
          size={'small'}
          freeSolo
          disableClearable
          options={[]}
          value={stateSearchPageModel.form.keyword}
          onInputChange={(event, value) => actionsSearchPageModel.setForm(['keyword', value])}
          renderInput={(params) => (
              <TextField
                  {...params}
                  autoFocus={true}
                  margin="normal"
                  variant="outlined"
                  InputProps={{
                    endAdornment: <InputAdornment position={'end'}>
                      <IconButton
                          onClick={() => {
                            actionsSearchPageModel.getData()
                          }}
                      >
                        <Search/>
                      </IconButton>
                    </InputAdornment>,
                  }}
                  onKeyUp={event => {
                    if (event?.keyCode === 13) {
                      actionsSearchPageModel.getData()
                    }
                  }}
              />
          )}
      />
    </SearchInput>
    {stateSearchPageModel.productList.length > 0 && <>
      <Title>{ls('零售商品')}</Title>
      <ListBox>
        {stateSearchPageModel.productList.map(value => <ProductItemOneRow
            key={`productList${value.id}`}
            product={value}
        />)}
      </ListBox>
      <Space h={16}/>
      <Divider />
    </>}
    {stateSearchPageModel.groupProductList.length > 0 && <>
      <Title>{ls('拼团商品')}</Title>
      <ListBox>
        {stateSearchPageModel.groupProductList.map(value => <GroupProductItem
            key={`productList${value.id}`}
            product={value}
        />)}
      </ListBox>
      <Space h={16}/>
      <Divider />
    </>}
    {stateSearchPageModel.darenCardPromoCodeList.length > 0 && <>
      <Title>{ls('达人卡')}</Title>
      <ListBox>
        {stateSearchPageModel.darenCardPromoCodeList.map(value => getPromoCodeItem(value, stateSearchPageModel.user))}
      </ListBox>
      <Space h={16}/>
      <Divider />
    </>}
    {stateSearchPageModel.promoCodePromoCodeList.length > 0 && <>
      <Title>{ls('优惠码')}</Title>
      <ListBox>
        {stateSearchPageModel.promoCodePromoCodeList.map(value => getPromoCodeItem(value, stateSearchPageModel.user))}
      </ListBox>
      <Space h={16}/>
      <Divider />
    </>}
    <UpdateShopCart/>
  </div>
}
