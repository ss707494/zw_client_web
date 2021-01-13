import styled from 'styled-components'
import React from 'react'
import {GroupQueue, Product} from '../../../../graphqlTypes/types'
import {dealImgUrl} from '../../../../tools/img'
import {dealMoney} from '../../../../tools/utils'
import {mpStyle} from '../../../../style/common'
import {Space} from '../../../../components/Box/Box'
import {Button, Card} from '@material-ui/core'
import {ShoppingCart} from '@material-ui/icons'
import {useStoreModel} from '../../../../ModelAction/useStore'
import {updateShopCartModel} from '../../../../components/ProductItem/UpdateShopCart'
import {showMessage} from '../../../../components/Message/Message'
import {productModel} from '../../../../components/ProductItem/ProductItem'
import {ShopCartModel} from '../../../m/cart'
import {HomeType} from '../../../m/home/appModule'
import AddCircleOutlineIcon from '@material-ui/icons/AddCircleOutline'
import {useRouter} from 'next/router'
import {jssStyled} from '../../../../tools/jssStyled'
import StarBorderRoundedIcon from '@material-ui/icons/StarBorderRounded'
import {grey} from '@material-ui/core/colors'
import StarRoundedIcon from '@material-ui/icons/StarRounded'

const Box = styled(Card)<{ width?: number }>`
  display: flex;
  flex-direction: column;
  width: ${props => `${props.width ?? 322}px`};
  padding: 14px 20px 16px;

  &&& {
    box-shadow: none;
  }
`
const ImgBox = styled.div<{ width?: number }>`
  align-self: center;

  > img {
    width: ${props => `${(props.width ?? 260) - 40}px`};
    height: ${props => `${((props.width ?? 260) - 40) * 4 / 3}px`};
  }
`
const Price = styled.div<{ width?: number }>`
  display: flex;
  align-items: center;

  > aside {
    ${mpStyle.fontType.xl};
    font-size: ${props => `${(props.width ?? 260) / 10 - 2}px`};
    color: ${mpStyle.red};
  }

  > main {
    font-size: ${props => `${(props.width ?? 260) / 10 - 8}px`};
    font-weight: 400;
    text-decoration: line-through;
    color: ${mpStyle.grey};
  }
`
const Footer = styled.div<{ width?: number }>`
  display: flex;

  &&& {
    .MuiButton-root {
      width: ${props => `${(props.width ?? 260) * .17}px`};
      min-width: ${props => `${(props.width ?? 260) * .17}px`};
      height: ${props => `${(props.width ?? 260) * .17}px`};
      padding: 0;
    }

    .MuiSvgIcon-root {
      font-size: ${props => `${(props.width ?? 260) * .1}px`};
    }
  }
`
const Name = styled.div<{ width?: number }>`
  flex-grow: 1;
  ${mpStyle.fontType.n};
  font-size: ${props => `${(props.width ?? 260) / 10 - 10}px`};
`
const Star = jssStyled('div')({})

export const ProductItemBox = (
    {
      hideShopCartButton = false,
      hidePrice = false,
      groupQueue,
      product,
      width = 300,
      type = HomeType.home,
    }: {
      product: Product,
      groupQueue?: GroupQueue,
      type?: string,
      width?: number,
      hidePrice?: boolean,
      hideShopCartButton?: boolean,
    }) => {
  const router = useRouter()
  const {actions: actionsUpdateShopCartModel} = useStoreModel(updateShopCartModel)
  const {actions: actionsProductModel} = useStoreModel(productModel)
  const {actions: actionsShopCartModel} = useStoreModel(ShopCartModel)
  const _width = width - 40

  return <Box
      width={_width}
  >
    <ImgBox
        width={_width}
    >
      <img
          src={dealImgUrl(product?.img?.[0]?.url)}
          alt={''}
      />
    </ImgBox>
    <Space h={8}/>
    {!hidePrice && <>
      <Price
          width={_width}
      >
        <aside>{dealMoney(product?.priceOut)}</aside>
        <Space w={16}/>
        <main>{dealMoney(product?.priceMarket)}</main>
      </Price>
      <Space h={5}/>
    </>}
    <Footer
        width={_width}
    >
      <Name
          width={_width}
      >
        {product.name}
      </Name>
      {!hideShopCartButton && <Button
          variant={'contained'}
          color={'secondary'}
          size={'small'}
          onClick={async () => {
            if (type === HomeType.home) {
              const res = await actionsUpdateShopCartModel.openClick()
              if (res?.num > 0) {
                if ((await actionsProductModel.updateNumShopCart({
                  product,
                  number: ~~res?.num,
                }))?.updateNumShopCart?.id) {
                  showMessage('操作成功')
                  actionsShopCartModel.getList()
                }
              }
            } else if (type === HomeType.group) {
              await router.push({
                pathname: '/pc/groupProduct/[id]',
                query: {
                  id: product.id,
                },
              })
            }
          }}
      >
        {type === HomeType.home && <ShoppingCart/>}
        {type === HomeType.group && <AddCircleOutlineIcon/>}
      </Button>}
    </Footer>
    {groupQueue?.id && <Star>
      {[...Array(product.groupPrecision)].map((v, i) => i).map(value => value + 1 > (groupQueue.sumFillAmount ?? 0) ?
          <StarBorderRoundedIcon
              key={`clickStar${value}`}
              fontSize={'small'}
              style={{color: grey[700]}}
          /> : <StarRoundedIcon
              key={`clickStar${value}`}
              style={{color: '#FDD334'}}
              fontSize={'small'}
          />)}
    </Star>
    }
  </Box>
}
