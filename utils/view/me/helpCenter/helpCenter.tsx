import React, {useEffect} from 'react'
import {HeaderTitle} from '../../../components/HeaderTitle/HeaderTitle'
import {
  Button,
  ButtonProps,
  ExpansionPanel,
  ExpansionPanelDetails,
  ExpansionPanelDetailsProps,
  ExpansionPanelSummary,
} from '@material-ui/core'
import styled from 'styled-components'
import {ExpandMore} from '@material-ui/icons'
import {modelFactory} from '../../../ModelAction/modelUtil'
import {useStoreModel} from '../../../ModelAction/useStore'
import {doc} from '../../../graphqlTypes/doc'
import {DictTypeEnum} from '../../../ss_common/enum'
import {fpMergePre} from '../../../tools/utils'
import {grey} from '@material-ui/core/colors'
import {mpStyle} from '../../../style/common'
import {HelpDetail, HelpDetailModel} from './helpDetail'

export const HelpCenterModel = modelFactory('HelpCenter', {
  typeList: [],
  problemListData: {} as any,
}, {
  getData: async (value, option) => {
    const helpDocumentationType = await option.query(doc.getDataConfig, {
      data: {
        type: DictTypeEnum.HelpDocumentationType
      }
    })
    const helpDocumentation = await option.query(doc.getDataConfig, {
      data: {
        type: DictTypeEnum.HelpDocumentation
      }
    })
    option.setData(fpMergePre({
      typeList: helpDocumentationType?.getDataConfig?.value?.typeList ?? [],
      problemListData: helpDocumentation?.getDataConfig?.value?.problemListData ?? {},
    }))
  },
})

const Box = styled.div`
  padding: 16px 0;
`
const ExpansionPanelDetailsCus = styled(ExpansionPanelDetails)<ExpansionPanelDetailsProps>`
  &&& {
    flex-direction: column;
    padding: 0 16px;
  }
`
const ListButton = styled(Button)<ButtonProps>`
  &&& {
    background: ${grey[300]};
    margin-bottom: 16px;
    .MuiButton-label {
      justify-content: initial;
      padding-left: 8px;
      position: relative;
      &:before {
        position: absolute;
        left: -5px;
        top: -32px;
        content: '.';
        color: ${mpStyle.red};
        display: flex;
        align-items: center;
        font-size: 36px;
      }
    }
  }
`
export const HelpCenter = () => {
  const {actions: actionsHelpCenterModel, state: stateHelpCenterModel} = useStoreModel(HelpCenterModel)
  const {actions: actionsHelpDetailModel} = useStoreModel(HelpDetailModel)
  useEffect(() => {
    actionsHelpCenterModel.getData()
  }, [])

  return <div>
    <HeaderTitle
        title={'帮助中心'}
    />
    <Box>
      {stateHelpCenterModel.typeList?.map((v: any) => <ExpansionPanel
          key={`typeList${v?.id}`}
      >
        <ExpansionPanelSummary
            expandIcon={<ExpandMore />}
        >{v?.name}</ExpansionPanelSummary>
        <ExpansionPanelDetailsCus
        >
          {stateHelpCenterModel?.problemListData?.[v?.id]?.map((pro: any) => <ListButton
              key={`problemListData${pro?.id}`}
              fullWidth={true}
              variant={'text'}
              onClick={async () => {
                await actionsHelpDetailModel.openClick({
                  ...pro,
                })
              }}
          >{pro?.problem}</ListButton>) }
        </ExpansionPanelDetailsCus>
      </ExpansionPanel>)}
    </Box>
    <HelpDetail/>
  </div>
}
