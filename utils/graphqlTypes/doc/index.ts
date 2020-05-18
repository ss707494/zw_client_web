import {gql} from 'apollo-boost'
import {fragment} from './fragment'

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
    query query_query_testLong354($data: DataConfigItemInput) {
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
    ${fragment.category}
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
    query orderDetail($id: String) {
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
    ${fragment.OrderInfoFields}
    ${fragment.ROrderProductFields}
    ${fragment.ProductFields}
    ${fragment.ImgFields}
    ${fragment.UserFields}
    ${fragment.UserInfoFields}
    ${fragment.UserPayCardFields}
    ${fragment.UserAddressFields}
  `
}

