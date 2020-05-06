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
  `
}
