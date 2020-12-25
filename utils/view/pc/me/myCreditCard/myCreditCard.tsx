import React, {useEffect} from 'react'
import DeleteIcon from '@material-ui/icons/Delete'
import EditIcon from '@material-ui/icons/Edit'
import {MeLayoutBox} from '../components/meLayoutBox'
import {styled, Button, Divider, IconButton} from '@material-ui/core'
import {mpStyle} from '../../../../style/common'
import {useStoreModel} from '../../../../ModelAction/useStore'
import {MyCreditCardListModel} from '../../../m/me/myCreditCard/list'
import {DefaultTheme} from '@material-ui/styles'
import {Space} from '../../../../components/Box/Box'
import {ll} from '../../../../tools/dealKey'
import {PCMyCreditCardModel} from './myCreditCardModel'
import {MyCreditCardEditModel} from '../../../m/me/myCreditCard/edit/[id]'
import {PcMyCreditCardEdit} from './pcMyCreditCardEdit'

const Box = styled('div')({
  width: '684px',
})
const Header = styled('div')({
  display: 'grid',
  gridTemplateColumns: '1fr max-content',
  alignItems: 'center',
  ...mpStyle.fontTypeObj.n,
  '& .MuiButtonBase-root': {
    width: '121px',
    height: '33px',
    borderRadius: '19px',
    border: '1px solid #F84033',
  },
})
const Content = styled('div')({
  display: 'grid',
  gridTemplateColumns: 'repeat(2, 327px)',
  gridGap: '30px',
})
const Card = styled('div')<DefaultTheme, {}>({
  borderRadius: '4px',
  background: '#FFFFFF',
  border: '1px solid #E1E1E1',
  padding: '14px 16px',
})
const MainBox = styled('div')({
  display: 'grid',
  gridTemplateColumns: 'max-content 1fr',
  gridTemplateRows: '25px 1fr 1fr',
  alignItems: 'center',
  '&>aside': {
    width: '109px',
    height: '60px',
    background: '#EBEBEB',
    gridArea: '1/1/4/2',
    marginRight: 15,
  },
  '& >img': {
    width: '109px',
    height: '60px',
    background: '#EBEBEB',
    gridArea: '1/1/4/2',
    marginRight: 15,
  },
  '& >header': {
    ...mpStyle.fontTypeObj.l,
  },
  '& >main, >footer': {
    fontSize: '12px',
    color: mpStyle.grey,
  },
})
const FootBox = styled('div')({
  display: 'grid',
  gridAutoFlow: 'column',
  gridTemplateColumns: '1fr',
  '& .MuiButtonBase-root': {
    height: 35,
    justifySelf: 'start',
  },
  '& .MuiIconButton-root': {
    width: 35,
    height: 35,
  },
})
const DefaultBox = styled('div')({
  alignSelf: 'center',
  '&> span': {
    'width': '84px',
    'height': '35px',
    'background': 'rgba(248, 64, 51, 0.1)',
    'borderRadius': '18px',
    display: 'inline-grid',
    alignItems: 'center',
    justifyItems: 'center',
    color: '#F84033',
    ...mpStyle.fontTypeObj.s,
  },
})

export const MyCreditCard = () => {
  const {state: stateMyCreditCardListModel, actions: actionsMyCreditCardListModel} = useStoreModel(MyCreditCardListModel)
  const {state: stateMyCreditCardEditModel, actions: actionsMyCreditCardEditModel} = useStoreModel(MyCreditCardEditModel)
  useEffect(() => {
    actionsMyCreditCardListModel.getList()
  }, [actionsMyCreditCardListModel])
  const {actions: actionsPCMyCreditCardModel, state: statePCMyCreditCardModel} = useStoreModel(PCMyCreditCardModel)

  return <MeLayoutBox>
    {(statePCMyCreditCardModel.isEdit && <Box>
      <PcMyCreditCardEdit/>
    </Box>)
    || <Box>
      <Header>
        <main>您的支付方式</main>
        <Button
            variant={'outlined'}
            color={'secondary'}
            onClick={() => {
              actionsMyCreditCardEditModel.clearForm()
              actionsMyCreditCardEditModel.setForm(['id', ''])
              actionsPCMyCreditCardModel.editData({})
            }}
        >
          添加新卡片
        </Button>
      </Header>
      <Space h={20}/>
      <Content>
        {stateMyCreditCardListModel.list.map(value => <Card
            key={`${value.id}`}
        >
          <MainBox>
            <aside/>
            {/*<img*/}
            {/*    src={''}*/}
            {/*    alt=""/>*/}
            <header>{value.name}</header>
            <main>{value.number}</main>
            <footer>{value.expirationTime}</footer>
          </MainBox>
          <Space h={20}/>
          <Divider/>
          <Space h={9}/>
          <FootBox>
            {(value.isDefault && <DefaultBox>
              <span>{ll('默认')}</span>
            </DefaultBox>)
            || <Button
                onClick={async () => {
                  if ((await actionsMyCreditCardListModel.setDefault(value))?.setUserPayCardDefault?.id) {
                    actionsMyCreditCardListModel.getList()
                  }
                }}
                color={'secondary'}
            >{ll('设为默认支付方式')}</Button>}
            <IconButton>
              <DeleteIcon/>
            </IconButton>
            <IconButton
                onClick={() => {
                  actionsMyCreditCardEditModel.getOne({
                    id: value.id,
                  })
                  actionsPCMyCreditCardModel.editData({})
                }}
            >
              <EditIcon/>
            </IconButton>
          </FootBox>
        </Card>)}
      </Content>
      <Space h={120}/>
    </Box>
    }
  </MeLayoutBox>
}
