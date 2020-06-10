import {gql} from 'apollo-boost'
import {fragment} from './fragment'
import {DictTypeEnum} from '../../ss_common/enum'

export const getUserListDoc = gql`
    query refactored643($data: UserListInput!) {
        userList(userListInput: $data) {
            list {
                orderCoinNextMonth
                orderCoinCurrentMonth
                orderAmountCurrentYear
                ...userInfo
                ...UserFields
                ...orderInfo
            }
            total
        }
    }
    fragment orderInfo on User{
        orderInfo{
            id
            name
            createTime
            updateTime
            isDelete
            number
            state
            actuallyPaid
            addressId
            paymentMethodCardId
            subtotal
            couponDiscount
            vipDiscount
            transportationCosts
            saleTax
            orderId
            discountProductTotal
            finishTime
            pickUpTime
            pickUpType
        }
    }
    fragment UserFields on User {
        id
        name
        createTime
        updateTime
        isDelete
        password
        type
    }
    fragment userInfo on User{
        userInfo{
            id
            name
            createTime
            updateTime
            isDelete
            userId
            phone
            email
            userLevel
        }
    }
`

export const getDataConfig = gql`
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
`

export const homeCarouselImgs = gql`
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
`

export const categoryList = gql`
    query query_query_testLong565($data: CategoryListInput) {
        categoryList(data: $data) {
            total
            list {
                ...Category
            }
        }
    }
    ${fragment.CategoryFields}
`

export const doc = {
  getUserListDoc,
  categoryList,
  getDataConfig,
  homeCarouselImgs,
  registerUser: gql`
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
  `,
  refreshToken: gql`
      query refreshToken($data: String!) {
          refreshToken(refreshtoken: $data) {
              refreshtoken
              token
          }
      }
  `,
  login: gql`
      query login($data: UserItemInput) {
          login(user: $data) {
              token
              refreshtoken
          }
      }
  `,
  oneUser: gql`
      query oneUser {
          oneUser {
              ...UserFields
              userInfo {
                  ...UserInfoFields
              }
          }
      }
      ${fragment.UserInfoFields}
      ${fragment.UserFields}
  `,
  orderList: gql`
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
  `,
  orderDetail: gql`
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
  `,
  updatePassword: gql`
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
  `,
  payCardListOneUser: gql`
      query {
          payCardListOneUser {
              ...UserPayCardFields
          }
      }
      ${fragment.UserPayCardFields}
  `,
  userPayCard: gql`
      query ($data: UserPayCardItemInput) {
          userPayCard (userPayCard: $data) {
              ...UserPayCardFields
          }
      }
      ${fragment.UserPayCardFields}
  `,
  saveUserPayCard: gql`
      mutation ($data: UserPayCardItemInput){
          saveUserPayCard (userPayCard: $data) {
              ...UserPayCardFields
          }
      }
      ${fragment.UserPayCardFields}
  `,
  setUserPayCardDefault: gql`
      mutation ($data: UserPayCardItemInput) {
          setUserPayCardDefault (userPayCard: $data) {
              ...UserPayCardFields
          }
      }
      ${fragment.UserPayCardFields}
  `,
  pickupAddress: gql`
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
  `,
  updateUserInfo: gql`
      mutation ($userInfo: UserInfoItemInput) {
          updateUserInfo (userInfo: $userInfo) {
              ...UserInfoFields
          }
      }
      ${fragment.UserInfoFields}
  `,
  userAddressListOneUser: gql`
      query {
          userAddressListOneUser {
              ...UserAddressFields
          }
      }
      ${fragment.UserAddressFields}
  `,
  userAddress: gql`
      query ($data: UserAddressItemInput) {
          userAddress (userAddress: $data) {
              ...UserAddressFields
          }
      }
      ${fragment.UserAddressFields}
  `,
  saveUserAddress: gql`
      mutation ($data: UserAddressItemInput){
          saveUserAddress (userAddress: $data) {
              ...UserAddressFields
          }
      }
      ${fragment.UserAddressFields}
  `,
  setUserAddressDefault: gql`
      mutation ($data: UserAddressItemInput) {
          setUserAddressDefault (userAddress: $data) {
              ...UserAddressFields
          }
      }
      ${fragment.UserAddressFields}
  `,
  productsInCategory: gql`
      query ($data: CategoryItemInput) {
          productsInCategory(categoryItemInput: $data) {
              ...ProductFields
              img {
                  ...ImgFields
              }
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
  `,
  categoryLevel: gql`
      query ($data: CategoryItemInput) {
          categoryLevel(categoryItemInput: $data)
      }
  `,
  oneCategory: gql`
      query ($data: CategoryItemInput) {
          oneCategory(data: $data) {
              ...Category
          }
      }
      ${fragment.CategoryFields}
  `,
  productList: gql`
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
  `,
  updateNumShopCart: gql`
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
  `,
  userShopCartList: gql`
      query {
          shopCartList {
              ...ShopCartFields
              product {
                  ...ProductFields
                  img {
                      ...ImgFields
                  }
              }
          }
      }
      ${fragment.ShopCartFields}
      ${fragment.ProductFields}
      ${fragment.ImgFields}
  `,
  updateShopCart: gql`
      mutation ($shopCart: ShopCartItemInput){
          updateShopCart (shopCart: $shopCart) {
              ...ShopCartFields
          }
      }
      ${fragment.ShopCartFields}
  `,
  orderConfirmInfo: gql`
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
  `,
  saveOrder: gql`
      mutation ($orderInfoItemInput: OrderInfoItemInput) {
          saveOrder (orderInfoItemInput: $orderInfoItemInput) {
              ...OrderInfoFields
          }
      }
      ${fragment.OrderInfoFields}
  `,
  dictList: gql`
      query ($data: DictInput) {
          getDictList (dictInput: $data) {
              ...DictFields
          }
      }
      ${fragment.DictFields}
  `,
  limitTimeData: gql`
    query {
        limitTimeData: getDataConfig (dataConfigInput: {
            type: "${DictTypeEnum.PromotionFlashSale}"
        }) {
            ...DataConfigFields
        }
    }
    ${fragment.DataConfigFields}
  `,
  productListByIds: gql`
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
  `,
}

