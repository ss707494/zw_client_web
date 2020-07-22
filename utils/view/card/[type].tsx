import React, {useEffect} from 'react'
import {useRouter} from 'next/router'
import {HeaderTitle} from '../../components/HeaderTitle/HeaderTitle'
import {ls} from '../../tools/dealKey'
import {FootBar} from '../../components/FootBar/FootBar'
import {Button, Card, Tab, Tabs} from '@material-ui/core'
import {modelFactory} from '../../ModelAction/modelUtil'
import {PromoCodeTypeEnum} from '../../ss_common/enum'
import {PromoCode, User} from '../../graphqlTypes/types'
import {doc} from '../../graphqlTypes/doc'
import {useStoreModel} from '../../ModelAction/useStore'
import {formatDate, fpMergePre} from '../../tools/utils'
import styled from 'styled-components'
import {dealImgUrl} from '../../tools/img'
import {grey} from '@material-ui/core/colors'
import {BScroller} from '../../components/BScroll/BScroller'
import {Space} from '../../components/Box/Box'

export const cardModel = modelFactory('cardModel', {
  promoCodeList: [] as PromoCode[],
  user: {} as User,
}, {
  getList: async (value: string, option) => {
    const res = await option.query(doc.promoCodeList, {})
    const user = await option.query(doc.oneUser)
    option.setData(fpMergePre({
      promoCodeList: res?.promoCodeList ?? [],
      user: user.oneUser ?? {},
    }))
  },
})

const MainBox = styled.div`
  padding: 24px 24px 80px;
`

const CardBox = styled(Card)`
  &&& {
    margin-bottom: 16px;
    display: grid;
    padding: 16px;
    grid-template-rows: 24px 40px 20px max-content 1fr;
    grid-column-gap: 8px;
    grid-template-columns: 120px 1fr;
    align-items: center;
    > aside {
      grid-area: 1/1/6/2;
      > img {
        width: 120px;
        height: 120px;
      }
    }
  }
`
const Title = styled.div`
  font-weight: bold;
`
const Remark = styled.div`
`
const Number = styled.div`
  font-size: 14px;
  color: ${grey[500]};
`
const Time = styled.div`
  font-size: 14px;
  color: ${grey[500]};
`
const Action = styled.div`
  padding-top: 8px;
`
const CardBoxPromoCode = styled(Card)<{background: string}>`
  &&& {
    padding: 24px;
    margin-bottom: 24px;
    background-image: url("${p => p.background}");
    background-color: ${grey[200]};
    box-shadow: inset 0 0 0 1000px rgba(0,0,0,.3);
    background-size: 100% 100%;
    background-position: 0 0;
    color: white;
  }
  ${Number} {
    color: white;
  }
  ${Time} {
    color: white;
  }
`
const CodeBox = styled.div`
`


const getItem = (item: PromoCode, user: User) => {
  return item.promoCodeType === PromoCodeTypeEnum.DarenCard ? <CardBox
      key={`CardBox_${item.id}`}
  >
    <aside>
      <img src={dealImgUrl(item.imgUrl)}
           alt=""/>
    </aside>
    <Title>
      {item.title}
    </Title>
    <Remark>{item.remark}</Remark>
    <Number/>
    <Time>{ls('使用时间')}:{formatDate(item.effectiveDateStart)}-{formatDate(item.effectiveDateEnd)}</Time>
    <Action>
      <Button
          color={'secondary'}
          variant={'contained'}
          fullWidth={true}
          onClick={() => {
            if (item?.code) {
              localStorage.setItem(`promoCode_${user.id}`, `${item?.code ?? ''}`)
            }
          }}
      >{ls('应用到购物车')}</Button>
    </Action>
  </CardBox> : <CardBoxPromoCode
      key={`CardBoxPromoCode_${item.id}`}
      background={dealImgUrl(item?.imgUrl)}>
    <Title>
      {item.title}
    </Title>
    <Space h={8}/>
    <Remark>{item.remark}</Remark>
    <Space h={8}/>
    <Time>{ls('使用时间')}:{formatDate(item.effectiveDateStart)}-{formatDate(item.effectiveDateEnd)}</Time>
    <Space h={8}/>
    <CodeBox>{ls('优惠码')}:{item.code}</CodeBox>
    <Space h={8}/>
    <Action>
      <Button
          variant={'outlined'}
          fullWidth={true}
          onClick={() => {
            if (item?.code) {
              localStorage.setItem(`promoCode_${user.id}`, `${item?.code ?? ''}`)
            }
          }}
      >{ls('应用到购物车')}</Button>
    </Action>
  </CardBoxPromoCode>
}

export const CardType = () => {
  const router = useRouter()
  const promoCodeType = router.query.type
  const {state: stateCardModel, actions: actionsCardModel} = useStoreModel(cardModel)
  useEffect(() => {
    actionsCardModel.getList(`${promoCodeType ?? ''}`)
  }, [promoCodeType])

  return <div>
    <HeaderTitle
        title={ls('达人专区')}
    />
    <Tabs
        variant={'fullWidth'}
        value={promoCodeType ?? PromoCodeTypeEnum.DarenCard}
        onChange={(event, value) => router.push('/card/[type]', `/card/${value}`)}
    >
      <Tab
          value={PromoCodeTypeEnum.DarenCard}
          label={ls('我的达人卡')}
      />
      <Tab
          value={PromoCodeTypeEnum.PromoCode}
          label={ls('当前优惠促销')}
      />
    </Tabs>
    <BScroller
        boxHeight={'calc(100vh - 188px)'}
    >
      <MainBox>
        {stateCardModel.promoCodeList.filter(v => v.promoCodeType === promoCodeType).map(v => getItem(v, stateCardModel.user))}
      </MainBox>
    </BScroller>
    <FootBar/>
  </div>
}
