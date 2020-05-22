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
          pickupAddressId
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
  `,
  ROrderProductFields: gql`
      fragment ROrderProductFields on ROrderProduct {
          count
          createTime
          dealPrice
          id
          isDelete
          name
          orderId
          productId
          updateTime
      }
  `,
  ProductFields: gql`
      fragment ProductFields on Product {
          brand
          categoryId
          createTime
          groupAmount
          groupAmountUnit
          groupPrecision
          groupRemark
          id
          isDelete
          isEnable
          isGroup
          isHot
          isNew
          name
          number
          packingUnit
          priceIn
          priceMarket
          priceOut
          remark
          shelvesTypes
          sort
          stock
          unit
          updateTime
          weight
      }
  `,
  ImgFields: gql`
    fragment ImgFields on ProductImg {
        createTime
        id
        isDelete
        name
        number
        productId
        updateTime
        url
    } 
  `,
  UserAddressFields: gql`
      fragment UserAddressFields on UserAddress {
          address
          city
          combineAddress
          contactInformation
          contactUserName
          createTime
          district
          id
          isDefault
          isDelete
          name
          province
          updateTime
          userId
          zip
      }
  `,
  UserPayCardFields: gql`
      fragment UserPayCardFields on UserPayCard {
          addressDetail
          city
          code
          contact
          createTime
          expirationTime
          id
          isDefault
          isDelete
          name
          number
          updateTime
          userId
          userName
          zipCode
      }
  `,
}
