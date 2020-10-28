import {gql} from 'apollo-boost'
import {fragment} from './fragment'
import {DictTypeEnum, PromoCodeTypeEnum} from '../../ss_common/enum'
import {UserInfoItemInput} from '../types'

export const docFactory: <T = any>(doc: any, variablesType?: T) => GraphqlDoc<T> = (doc: any, variablesType: any) => variablesType ? ({
  doc,
  variablesType,
}) : ({
  doc,
  variablesType: {} as any,
})

export const getUserListDoc = docFactory(gql`
  query refactored643($data: UserListInput!) {
    userList(userListInput: $data) {
      list {
        orderCoinNextMonth
        orderCoinCurrentMonth
        orderAmountCurrentYear
        ...UserInfoFields
        ...UserFields
        ...OrderInfoFields
      }
      total
    }
  }
  ${fragment.UserFields}
  ${fragment.UserInfoFields}
  ${fragment.OrderInfoFields}
`)

export const getDataConfig = docFactory(gql`
  query ($data: DataConfigItemInput) {
    getDataConfig(dataConfigInput: $data) {
      id
      name
      createTime
      updateTime
      isDelete
      type
      value
      remark
    }
  }
`)

export const homeCarouselImgs = docFactory(gql`
  query query_query_testLong137($data: DataConfigItemInput) {
    homeCarouselImgs(dataConfigInput: $data) {
      id
      name
      createTime
      updateTime
      isDelete
      type
      value
      remark
    }
  }
`)

export const categoryList = docFactory(gql`
  query query_query_testLong565($data: CategoryListInput) {
    categoryList(data: $data) {
      total
      list {
        ...Category
      }
    }
  }
  ${fragment.CategoryFields}
`)

export const doc = {
  getUserListDoc,
  categoryList,
  getDataConfig,
  homeCarouselImgs,
  registerUser: docFactory(gql`
    mutation mutation_registerUse998($data: UserItemInput) {
      registerUser(data: $data) {
        token
        refreshtoken
        user {
          id
          name
          createTime
          updateTime
          isDelete
          password
          type
          userInfo {
            name
          }
        }
      }
    }
  `),
  refreshToken: docFactory(gql`
    query refreshToken($data: String!) {
      refreshToken(refreshtoken: $data) {
        refreshtoken
        token
      }
    }
  `),
  login: docFactory(gql`
    query login($data: UserItemInput) {
      login(user: $data) {
        token
        refreshtoken
      }
    }
  `),
  oneUser: docFactory(gql`
    query oneUser {
      oneUser {
        ...UserFields
        userInfo {
          ...UserInfoFields
          userLevelDict {
            ...DictFields
          }
        }
      }
    }
    ${fragment.DictFields}
    ${fragment.UserInfoFields}
    ${fragment.UserFields}
  `),
  orderList: docFactory(gql`
    query orderList($data: OrderInput){
      orderList (orderInput: $data, fromUser: true) {
        list {
          ...OrderInfoFields
          rOrderProduct {
            ...ROrderProductFields
            product {
              ...ProductFields
              img {
                ...ImgFields
              }
            }
          }
        }
      }
    }
    ${fragment.OrderInfoFields}
    ${fragment.ROrderProductFields}
    ${fragment.ProductFields}
    ${fragment.ImgFields}
  `),
  orderDetail: docFactory(gql`
    query ($id: String) {
      selfAddress: getDataConfig(dataConfigInput: {
        type: "${DictTypeEnum.SelfAddress}"
      }) {
        ...DataConfigFields
      }
      orderDetail(id: $id) {
        ...OrderInfoFields
        rOrderProduct {
          ...ROrderProductFields
          product {
            ...ProductFields
            img {
              ...ImgFields
            }
          }
        }
        user {
          ...UserFields
          userInfo {
            ...UserInfoFields
          }
        }
        userAddress {
          ...UserAddressFields
        }
        userPayCard {
          ...UserPayCardFields
        }
      }
    }
    ${fragment.DataConfigFields}
    ${fragment.OrderInfoFields}
    ${fragment.ROrderProductFields}
    ${fragment.ProductFields}
    ${fragment.ImgFields}
    ${fragment.UserFields}
    ${fragment.UserInfoFields}
    ${fragment.UserPayCardFields}
    ${fragment.UserAddressFields}
  `),
  updatePassword: docFactory(gql`
    mutation ($data: UpdatePasswordInput) {
      updatePassword (data: $data) {
        user {
          ...UserFields
        }
        authBody {
          token
          refreshtoken
        }
      }
    }
    ${fragment.UserFields}
  `),
  payCardListOneUser: docFactory(gql`
    query {
      payCardListOneUser {
        ...UserPayCardFields
      }
    }
    ${fragment.UserPayCardFields}
  `),
  userPayCard: docFactory(gql`
    query ($data: UserPayCardItemInput) {
      userPayCard (userPayCard: $data) {
        ...UserPayCardFields
      }
    }
    ${fragment.UserPayCardFields}
  `),
  saveUserPayCard: docFactory(gql`
    mutation ($data: UserPayCardItemInput){
      saveUserPayCard (userPayCard: $data) {
        ...UserPayCardFields
      }
    }
    ${fragment.UserPayCardFields}
  `),
  setUserPayCardDefault: docFactory(gql`
    mutation ($data: UserPayCardItemInput) {
      setUserPayCardDefault (userPayCard: $data) {
        ...UserPayCardFields
      }
    }
    ${fragment.UserPayCardFields}
  `),
  pickupAddress: docFactory(gql`
    query {
      getDataConfig(dataConfigInput: {
        type: "${DictTypeEnum.SelfAddress}"
      }) {
        ...DataConfigFields
      }
      oneUser {
        ...UserFields
        userInfo {
          ...UserInfoFields
        }
      }
    }
    ${fragment.UserInfoFields}
    ${fragment.DataConfigFields}
    ${fragment.UserFields}
  `),
  updateUserInfo: docFactory(gql`
    mutation ($userInfo: UserInfoItemInput) {
      updateUserInfo (userInfo: $userInfo) {
        ...UserInfoFields
      }
    }
    ${fragment.UserInfoFields}
  `, {
    userInfo: {} as UserInfoItemInput,
  }),
  userAddressListOneUser: docFactory(gql`
    query {
      userAddressListOneUser {
        ...UserAddressFields
      }
    }
    ${fragment.UserAddressFields}
  `),
  userAddress: docFactory(gql`
    query ($data: UserAddressItemInput) {
      userAddress (userAddress: $data) {
        ...UserAddressFields
      }
    }
    ${fragment.UserAddressFields}
  `),
  saveUserAddress: docFactory(gql`
    mutation ($data: UserAddressItemInput){
      saveUserAddress (userAddress: $data) {
        ...UserAddressFields
      }
    }
    ${fragment.UserAddressFields}
  `),
  setUserAddressDefault: docFactory(gql`
    mutation ($data: UserAddressItemInput) {
      setUserAddressDefault (userAddress: $data) {
        ...UserAddressFields
      }
    }
    ${fragment.UserAddressFields}
  `),
  productsInCategory: docFactory(gql`
    query ($data: CategoryItemInput, $productItemInput: ProductItemInput, $orderByAndPageInput: OrderByAndPageInput) {
      productsInCategory(categoryItemInput: $data, productItemInput: $productItemInput, orderByAndPageInput: $orderByAndPageInput) {
        list {
          ...ProductFields
          img {
            ...ImgFields
          }
        }
        total
      }
      categoryList(data: {
        category: {
          parentCategory: $data
        }
      }) {
        total
        list {
          ...Category
        }
      }
    }
    ${fragment.ProductFields}
    ${fragment.ImgFields}
    ${fragment.CategoryFields}
  `),
  categoryLevel: docFactory(gql`
    query ($data: CategoryItemInput) {
      categoryLevel(categoryItemInput: $data)
    }
  `),
  oneCategory: docFactory(gql`
    query ($data: CategoryItemInput) {
      oneCategory(data: $data) {
        ...Category
        parentCategory {
          ...Category
          parentCategory {
            ...Category
          }
        }
      }
    }
    ${fragment.CategoryFields}
  `),
  productList: docFactory(gql`
    query ($productInput: ProductItemInput, $orderByInput: OrderByInput) {
      productList(productInput: $productInput, orderByInput: $orderByInput) {
        total
        list {
          ...ProductFields
          img {
            ...ImgFields
          }
        }
      }
    }
    ${fragment.ProductFields}
    ${fragment.ImgFields}
  `),
  updateNumShopCart: docFactory(gql`
    mutation ($shopCart: ShopCartItemInput, $updateNum: Float) {
      updateNumShopCart (shopCart: $shopCart, updateNum: $updateNum) {
        id
        number
        product {
          ...ProductFields
        }
        user {
          ...UserFields
        }
      }
    }
    ${fragment.ProductFields}
    ${fragment.UserFields}
  `),
  userShopCartList: docFactory(gql`
    query {
      shopCartList {
        ...ShopCartFields
        product {
          ...ProductFields
          category {
            id
            parentCategory {
              id
              parentCategory {
                id
              }
            }
          }
          img {
            ...ImgFields
          }
        }
      }
    }
    ${fragment.ShopCartFields}
    ${fragment.ProductFields}
    ${fragment.ImgFields}
  `),
  updateShopCart: docFactory(gql`
    mutation ($shopCart: ShopCartItemInput){
      updateShopCart (shopCart: $shopCart) {
        ...ShopCartFields
      }
    }
    ${fragment.ShopCartFields}
  `),
  orderConfirmInfo: docFactory(gql`
    query {
      getDataConfig(dataConfigInput: {
        type: "${DictTypeEnum.SelfAddress}"
      }) {
        ...DataConfigFields
      }
      oneUser {
        ...UserFields
        userInfo {
          ...UserInfoFields
        }
      }
      payCardListOneUser {
        ...UserPayCardFields
      }
      userAddressListOneUser {
        ...UserAddressFields
      }
      freightConfig: getDataConfig (dataConfigInput: {
        type: "${DictTypeEnum.Freight}"
      }) {
        ...DataConfigFields
      }
      userLevelList: getDictList (dictInput: {
        dictTypeCode: "UserLevel"
      }) {
        ...DictFields
      }
    }
    ${fragment.UserAddressFields}
    ${fragment.UserPayCardFields}
    ${fragment.UserInfoFields}
    ${fragment.UserFields}
    ${fragment.DataConfigFields}
    ${fragment.DictFields}
  `),
  saveOrder: docFactory(gql`
    mutation ($orderInfoItemInput: OrderInfoItemInput) {
      saveOrder (orderInfoItemInput: $orderInfoItemInput) {
        ...OrderInfoFields
      }
    }
    ${fragment.OrderInfoFields}
  `),
  dictList: docFactory(gql`
    query ($data: DictInput) {
      getDictList (dictInput: $data) {
        ...DictFields
      }
    }
    ${fragment.DictFields}
  `),
  limitTimeData: docFactory(gql`
    query {
      limitTimeData: getDataConfig (dataConfigInput: {
        type: "${DictTypeEnum.PromotionFlashSale}"
      }) {
        ...DataConfigFields
      }
    }
    ${fragment.DataConfigFields}
  `),
  productListByIds: docFactory(gql`
    query ($ids: [String]) {
      productListByIds (ids: $ids) {
        total
        list {
          ...ProductFields
          img {
            ...ImgFields
          }
        }
      }
    }
    ${fragment.ProductFields}
    ${fragment.ImgFields}
  `),
  groupQueueList: docFactory(gql`
    query ($groupQueueItemInput: GroupQueueItemInput) {
      groupQueueList (groupQueueItemInput: $groupQueueItemInput) {
        ...GroupQueueFields
        product {
          ...ProductFields
          img {
            ...ImgFields
          }
        }
        groupOrder {
          ...GroupOrderFields
        }
      }
    }
    ${fragment.GroupQueueFields}
    ${fragment.ProductFields}
    ${fragment.ImgFields}
    ${fragment.GroupOrderFields}
  `),
  updateOrder: docFactory(gql`
    mutation ($orderInfoItemInput: OrderInfoItemInput) {
      updateOrder (orderInfoItemInput: $orderInfoItemInput) {
        ...OrderInfoFields
      }
    }
    ${fragment.OrderInfoFields}
  `),
  saveGroupOrder: docFactory(gql`
    mutation ($orderInfoItemInput: OrderInfoItemInput, $groupOrderItemInput: GroupOrderItemInput, $groupQueueItemInput: GroupQueueItemInput) {
      saveGroupOrder (orderInfoItemInput: $orderInfoItemInput, groupOrderItemInput: $groupOrderItemInput, groupQueueItemInput: $groupQueueItemInput) {
        ...OrderInfoFields
      }
    }
    ${fragment.OrderInfoFields}
  `),
  promoCodeList: docFactory(gql`
    query ($promoCodeItemInput: PromoCodeItemInput) {
      promoCodeList (promoCodeItemInput: $promoCodeItemInput) {
        ...PromoCodeFields
        userLevel {
          ...DictFields
        }
      }
    }
    ${fragment.PromoCodeFields}
    ${fragment.DictFields}
  `),
  categoryRootParent: docFactory(gql`
    query ($categoryItemInput: CategoryItemInput) {
      categoryRootParent (categoryItemInput: $categoryItemInput) {
        ...Category
        parentCategory {
          ...Category
          parentCategory {
            ...Category
          }
        }
      }
    }
    ${fragment.CategoryFields}
  `),
  productListOrderByOrder: docFactory(gql`
    query ($orderByType: String, $productInput: ProductItemInput) {
      productListOrderByOrder (orderByType: $orderByType, productInput: $productInput) {
        list {
          rOrderProduct {
            ...ROrderProductFields
          }
          ...ProductFields
          img {
            ...ImgFields
          }
        }
        total
      }
    }
    ${fragment.ProductFields}
    ${fragment.ImgFields}
    ${fragment.ROrderProductFields}
  `),
  searchData: docFactory(gql`
    query ($keyword: String) {
      productList(productInput: { name: $keyword }) {
        total
        list {
          ...ProductFields
          img {
            ...ImgFields
          }
        }
      }
      groupProductList: productList(productInput: { name: $keyword, isGroup: 1 }) {
        total
        list {
          ...ProductFields
          img {
            ...ImgFields
          }
        }
      }
      darenCardPromoCodeList: promoCodeList(promoCodeItemInput: {
        promoCodeType: "${PromoCodeTypeEnum.DarenCard}",
        title: $keyword,
      }) {
        ...PromoCodeFields
      }
      promoCodePromoCodeList: promoCodeList(promoCodeItemInput: {
        promoCodeType: "${PromoCodeTypeEnum.PromoCode}",
        title: $keyword,
      }) {
        ...PromoCodeFields
      }
      oneUser {
        ...UserFields
        userInfo {
          ...UserInfoFields
        }
      }
    }
    ${fragment.UserFields}
    ${fragment.UserInfoFields}
    ${fragment.ProductFields}
    ${fragment.ImgFields}
    ${fragment.PromoCodeFields}
  `),
}

