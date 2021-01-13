import React, {useEffect} from 'react'
import {PcHeader} from '../pcComponents/header/header'
import {TopAction} from '../pcComponents/topAction/topAction'
import {Space} from '../../../components/Box/Box'
import {MainBox} from '../pcComponents/mainBox/mainBox'
import {PcContentBox} from '../home/pcHome'
import {styled} from '@material-ui/styles'
import {ll} from '../../../tools/dealKey'
import {mpStyle} from '../../../style/common'
import {useRouter} from 'next/router'
import {useStoreModel} from '../../../ModelAction/useStore'
import {dealGroupNumbers, groupProductModel, GroupSubmit, YellowStar} from '../../m/groupProduct/[id]'
import CusCarousel from '../../../components/Swipe/Swipe'
import {dealMoney} from '../../../tools/utils'
import StarBorderRoundedIcon from '@material-ui/icons/StarBorderRounded'
import StarRoundedIcon from '@material-ui/icons/StarRounded'
import {GroupQueueList} from '../../m/groupProduct/groupQueueList'
import {Divider} from '@material-ui/core'
import {HomeType} from '../../m/home/appModule'

const HeadTab = styled('div')({
  ...mpStyle.fontTypeObj.xl,
})
const Box = styled('div')({
  display: 'grid',
  gridTemplateColumns: '500px 1fr',
  gridColumnGap: 85,
})
const RightBox = styled('div')({})
const Info = styled('div')({
  padding: '21px 24px',
  background: '#EBEBEB',
  borderRadius: '6px',
  '& >header': {
    display: 'grid',
    gridAutoFlow: 'column',
    justifyContent: 'start',
    alignItems: 'center',
    fontWeight: 600,
    fontSize: 18,
    '&>span': {
      background: 'linear-gradient(270deg, #696969 0%, #373737 100%)',
      borderRadius: '4px',
      display: 'inline-grid',
      gridAutoFlow: 'column',
      justifyContent: 'start',
      alignItems: 'center',
      margin: '0 20px',
    },
  },
})
const InfoFooter = styled('div')({
  display: 'grid',
  gridTemplateColumns: '1fr max-content',
  '&>aside': {
    display: 'grid',
    gridAutoFlow: 'column',
  },
})
const Title = styled('div')({
  fontSize: '16px',
  fontWeight: 600,
  color: '#4A4A4A',
})
const GroupQueueBox = styled('div')({
  display: 'grid',
  gridTemplateColumns: 'repeat(2, 1fr)',
  gridColumnGap: 21,
  gridRowGap: 14,
  '& .GroupQueueListBox': {
    marginTop: 0,
  },
})
const PleaseClick = styled('div')({
  display: 'grid',
  gridAutoFlow: 'column',
  justifyContent: 'start',
  alignItems: 'center',
})
const SelectNum = styled('div')({
  '& .MuiSvgIcon-root': {
    fontSize: 60,
  },
})
const Price = styled('div')({
  marginTop: '8px',
  display: 'flex',
  justifyContent: 'space-between',
  alignItems: 'center',
  '&> main': {
    'fontSize': '18px',
    fontWeight: 'bold',
  },
  '&> main, section': {
    '&> *': {textAlign: 'center'},
  },
})

export const PriceBox = () => {
  const {state: stateGroupProduct} = useStoreModel(groupProductModel)
  const product = stateGroupProduct.product
  return <Price>
    <main>
      <header>{dealMoney(stateGroupProduct.dealDiscountAmountUnit(stateGroupProduct))}</header>
      <footer>{ll('折后价格')}</footer>
    </main>
    <div>=</div>
    <section>
      <header>{dealMoney((product.priceOut ?? 0))}</header>
      <footer>{ll('基准价格')}</footer>
    </section>
    <div>x</div>
    <section>
      <header>{stateGroupProduct.numDiscount}</header>
      <footer>{ll('份数折扣')}</footer>
    </section>
    <div>x</div>
    <section>
      <header>{stateGroupProduct.groupDiscount}</header>
      <footer>{ll('成团折上折')}</footer>
    </section>
  </Price>
}

const GroupSubmitBox = styled(props => <GroupSubmit {...props} />)({
  height: 64,
})

export const PcGroupProduct = () => {
  const router = useRouter()
  const id = (router.query?.id as string) ?? ''
  const {actions: actionsGroupProduct, state: stateGroupProduct} = useStoreModel(groupProductModel)
  const product = stateGroupProduct.product
  useEffect(() => {
    actionsGroupProduct.getData(id)
  }, [actionsGroupProduct, id])
  return <MainBox>
    <PcHeader/>
    <PcContentBox>
      <TopAction/>
      <HeadTab>{ll('拼团商品详情')}</HeadTab>
      <Space h={40}/>
      <Box>
        <CusCarousel
            showIndicators={false}
            showThumbs={true}
            height={'500px'}
            dataList={product?.img?.map(v => ({
              ...v,
              imgUrl: v?.url,
            })) as []}
        />
        <RightBox>
          <Info>
            <header>
              {product.name} ({product.groupRemark} / {product.groupAmount}{product.groupAmountUnitString} {`每一份${dealGroupNumbers(product)}${product.groupAmountUnitString}`} / {ll('分团精度')}
              <span>{[...Array(product.groupPrecision)].map((v, i) => i).map(value =>
                  <YellowStar key={value}/>)}</span> )
            </header>
            <Space h={14}/>
            <InfoFooter>
              <section>
                {ll('基准价格')}
                <span><strong> {dealMoney(product.priceOut)}</strong>/{product.groupAmountUnitString}</span>
              </section>
              <aside>
                {ll('已成团')}: {stateGroupProduct.groupQueueList.filter(v => v.sumFillAmount === product?.groupPrecision).length}{ll('单')}
                <Space w={8}/>|<Space w={8}/>
                {ll('拼团中')}: {stateGroupProduct.groupQueueList.filter(v => (v.sumFillAmount ?? 0) < (product?.groupPrecision ?? 0)).length}{ll('单')}
              </aside>
            </InfoFooter>
          </Info>
          <Space h={16}/>
          <Title>{ll('拼团中')}</Title>
          <Space h={16}/>
          <GroupQueueBox>
            <GroupQueueList/>
          </GroupQueueBox>
          <Space h={33}/>
          <Divider/>
          <Space h={24}/>
          <Title>{ll('智能匹配')}</Title>
          <Space h={16}/>
          <PleaseClick>
            {ll('请点击')}
            <StarBorderRoundedIcon/>
            {ll('确定您需要的份数')}
          </PleaseClick>
          <Space h={16}/>
          <SelectNum>
            {[...Array(product.groupPrecision)].map((v, i) => i).map(value => value + 1 > stateGroupProduct.selectNum ?
                <StarBorderRoundedIcon
                    key={`clickStar${value}`}
                    fontSize={'large'}
                    onClick={() => actionsGroupProduct.updateSelectNum(value + 1)}
                /> : <StarRoundedIcon
                    key={`clickStar${value}`}
                    style={{color: '#FDD334'}}
                    fontSize={'large'}
                    onClick={() => actionsGroupProduct.updateSelectNum(value + 1)}
                />)}
          </SelectNum>
          <PriceBox/>
          <Space h={20}/>
          <GroupSubmitBox
              submitCall={() => {
                router.push({
                  pathname: '/pc/cart/orderPage',
                  query: {
                    homeType: HomeType.group,
                  },
                })
              }}
          />
        </RightBox>
      </Box>
    </PcContentBox>
    <Space h={120}/>
  </MainBox>
}
