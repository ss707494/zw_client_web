import {gql} from 'apollo-boost'

export const fragment = {
  category: gql`
      fragment Category on Category {
          id
          name
          createTime
          updateTime
          isDelete
          isEnable
          remark
          sort
          parentId
          fullParentId
          number
          userId
          imgUrl
      }
  `,
  UserFields: gql`
      fragment UserFields on User {
          id
          name
          createTime
          updateTime
          isDelete
          password
          type
      }
  `,
  UserInfoFields: gql`
      fragment UserInfoFields on UserInfo {
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
  `,
  OrderInfoFields: gql`
      fragment OrderInfoFields on OrderInfo {
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
          generateCoin
          deductCoin
          selfAddressId
          currentUserLevel
      }
  `
}
