import styled from 'styled-components'
import StarRoundedIcon from '@material-ui/icons/StarRounded'
import StarBorderRoundedIcon from '@material-ui/icons/StarBorderRounded'
import AddCircleOutlineIcon from '@material-ui/icons/AddCircleOutline'
import ShoppingCartIcon from '@material-ui/icons/ShoppingCart'
import React, {useEffect} from 'react'
import {GroupQueue, Maybe, Product, ShopCartItemInput} from '../../graphqlTypes/types'
import {dealImgUrl} from '../../tools/img'
import {Button, Card, IconButton} from '@material-ui/core'
import {dealMoney} from '../../tools/utils'
import {mpStyle} from '../../style/common'
import {modelFactory} from '../../ModelAction/modelUtil'
import {useStoreModel} from '../../ModelAction/useStore'
import {meModel} from '../../view/m/me/model'
import {doc} from '../../graphqlTypes/doc'
import {showMessage} from '../Message/Message'
import {ls} from '../../tools/dealKey'
import {grey} from '@material-ui/core/colors'
import {shopCartModel} from '../../view/m/cart'
import {useRouter} from 'next/router'
import {updateShopCartModel} from './UpdateShopCart'
import {Space} from '../Box/Box'

export const productModel = modelFactory('productModel', {}, {
  updateNumShopCart: async (value: ShopCartItemInput, option) => {
    return await option.mutate(doc.updateNumShopCart, {
      shopCart: value,
      ...(value.number ? {
        updateNum: value.number,
      } : {}),
    })
  },
  updateShopCart: async (value: ShopCartItemInput, option) => {
    return await option.mutate(doc.updateShopCart, {
      shopCart: value,
    })
  },
})

const Box = styled(Card)`
  padding: 10px 10px 0;
  > header {
    width: 100%;
    height: 40vw;
    > img {
      border-radius: 8px;
      width: 100%;
      height: 40vw;
    }
  }
  > main {
    margin-top: 10px;
    line-height: 22px;
    ${mpStyle.ellipsis};
  }
  > footer {
    margin-top: 4px;
    display: flex;
    align-items: center;
    > main {
      flex-grow: 1;
    }
    > .MuiButtonBase-root {
      padding: 5px;
    }
  }
`

export const ProductPrice = ({product, priceOutTip}: { product?: Maybe<Product>, priceOutTip?: string }) => {
  return <>
    <aside
        style={{display: 'inline-block', fontSize: '12px', textDecoration: 'line-through', flexShrink: 0}}
    >{dealMoney(product?.priceMarket)}</aside>
    <main
        style={{display: 'inline-block', fontSize: '14px', marginLeft: '6px', color: mpStyle.red, flexShrink: 0}}
    >{priceOutTip ?? ''}{dealMoney(product?.priceOut)}</main>
  </>
}

export const ProductItem = ({product}: { product: Product }) => {
  const {actions: actionsUpdateShopCartModel} = useStoreModel(updateShopCartModel)
  const {actions: actionsShopCart} = useStoreModel(shopCartModel)
  const {state: stateMe, actions: actionsMe} = useStoreModel(meModel)
  useEffect(() => {
    if (!stateMe.user.id) {
      actionsMe.getLoginUser()
    }
  }, [])
  const {actions: actionsPM} = useStoreModel(productModel)
  return <Box>
    <header>
      <img src={dealImgUrl(product?.img?.[0]?.url)}
           alt=""/>
    </header>
    <main>{product.name} {product.weight}{product.unit} {product.packingUnitString}</main>
    <footer>
      <ProductPrice product={product}/>
      {stateMe.user?.id && <IconButton
          onClick={async () => {
            const res = await actionsUpdateShopCartModel.openClick()
            if (res?.num > 0) {
              if ((await actionsPM.updateNumShopCart({
                product,
                number: ~~res?.num,
              }))?.updateNumShopCart?.id) {
                showMessage('操作成功')
                actionsShopCart.getList()
              }
            }
          }}
      >
        <ShoppingCartIcon color={'secondary'}/>
      </IconButton>}
    </footer>
  </Box>
}

const RowBox = styled.div`
  display: flex;
  padding: 8px;
  box-shadow: ${mpStyle.shadow['1']};
  border-radius: 8px;
  margin-bottom: 8px;
`
const Img = styled.div`
  width: 35vw;
  height: 35vw;
  margin-right: 8px;
  > img {
    width: 35vw;
    height: 35vw;
  }
  
`
const LeftBox = styled.div`
  display: flex;
  flex-direction: column;
  flex-grow: 1;
  > main {
    line-height: 22px;
    ${mpStyle.ellipsis};
  }
`
const Tip = styled.div`
  margin-top: 16px;
  border-radius: 8px;
  padding: 2px 6px;
  background: ${grey[800]};
  color: white;
  width: max-content;
`
const Price = styled.div`
  margin-top: 16px;
  flex-grow: 1;
`
const Bun = styled.div`
  &&& {
    .MuiButtonBase-root {
      padding: 4px 0;
    }
  }
`
export const ProductItemOneRow = ({product, sumOrderTip = '', hideAction = false, showSumOrder = false}: { product: Product, sumOrderTip?: string, hideAction?: boolean, showSumOrder?: boolean }) => {
  const {actions: actionsUpdateShopCartModel} = useStoreModel(updateShopCartModel)
  const {state: stateMe, actions: actionsMe} = useStoreModel(meModel)
  const {actions: actionsPM} = useStoreModel(productModel)
  const {actions: actionsShopCart} = useStoreModel(shopCartModel)

  useEffect(() => {
    if (!stateMe.user.id) {
      actionsMe.getLoginUser()
    }
  }, [])

  return <RowBox key={`ProductItemOneRow_${product.id}`}>
    <Img>
      <img src={dealImgUrl(product?.img?.[0]?.url)}
           alt=""/>
    </Img>
    <LeftBox>
      <main>{product.name} {product.weight}{product.unit} {product.packingUnitString}{console.log(product)}</main>
      {/*<Stock>{ls('当前剩余')}: {product.stock}</Stock>*/}
      {showSumOrder && <Tip>{sumOrderTip}{ls('销量')}: {product.sumOrder}</Tip>}
      <Price>
        <ProductPrice product={product}/>
      </Price>
      {!hideAction && stateMe.user?.id && <Bun>
        <Button
            fullWidth={true}
            color={'secondary'}
            variant={'contained'}
            onClick={async () => {
              const res = await actionsUpdateShopCartModel.openClick()
              if (res?.num > 0) {
                if ((await actionsPM.updateNumShopCart({
                  product,
                  number: ~~res?.num,
                }))?.updateNumShopCart?.id) {
                  showMessage('操作成功')
                  actionsShopCart.getList()
                }
              }
            }}
        >
          <ShoppingCartIcon/>
          {ls('加入购物车')}
        </Button>
      </Bun>}
    </LeftBox>
  </RowBox>
}

const GroupBox = styled.div`
  display: flex;
`
const GroupImg = styled.div`
  width: 35vw;
  height: 35vw;
  margin-right: 16px;
  > img {
    width: 35vw;
    height: 35vw;
    border-radius: 8px;
  }
`
const RightBox = styled.div`
  display: flex;
  flex-grow: 1;
  flex-direction: column;
`
const Title = styled.div`
  font-weight: bold;
  display: flex;
`
const MarketPrice = styled.div`
  margin-top: 8px;
  color: ${grey[700]};
  > span {
    text-decoration: line-through;
  }
`
const OutPrice = styled.div`
  margin-top: 8px;
  color: ${mpStyle.red};
`
const Star = styled.div`
    flex-grow: 1;
`
const Action = styled.div`
`
const OrderTip = styled.div`
  margin-top: 16px;
  border-radius: 8px;
  padding: 2px 6px;
  background: ${grey[800]};
  color: white;
  width: max-content;
`

export const GroupProductItem = ({product, groupQueue, sumOrderTip = '', showSumOrder = false}: { product: Product, groupQueue?: GroupQueue, sumOrderTip?: string, showSumOrder?: boolean }) => {
  const {state: stateMe, actions: actionsMe} = useStoreModel(meModel)
  const router = useRouter()

  useEffect(() => {
    if (!stateMe.user.id) {
      actionsMe.getLoginUser()
    }
  }, [])

  return <GroupBox key={`GroupBox_${product.id}`}>
    <GroupImg>
      <img src={dealImgUrl(product?.img?.[0]?.url)}
           alt=""/>
    </GroupImg>
    <RightBox>
      <Title>
        {product.name}({product.groupRemark}/{product.groupAmount}{product.groupAmountUnitString}/{product.groupPrecisionString})
      </Title>
      {showSumOrder && <OrderTip>{sumOrderTip}{ls('拼团达人数')}: {product.sumOrder}</OrderTip>}
      <MarketPrice>
        {ls('市场价')}
        <span>{dealMoney(product.priceMarket)}</span>
      </MarketPrice>
      <OutPrice>
        {ls('基准价格')}
        <span>{dealMoney(product.priceOut)}</span>
      </OutPrice>
      <Star>
        {groupQueue?.id && <div>
          <Space h={8}/>
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
        </div>}
      </Star>
      <Action>
        <Button
            variant={'contained'}
            color={'secondary'}
            fullWidth={true}
            onClick={() => {
              router.push(`/m/groupProduct/[id]`, `/m/groupProduct/${product.id}`)
            }}
        >
          <AddCircleOutlineIcon/>
          {ls('拼一个')}
        </Button>
      </Action>
    </RightBox>
  </GroupBox>
}

