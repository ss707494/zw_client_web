import grey from '@material-ui/core/colors/grey'
import styled from 'styled-components'
import {CreateCSSProperties} from '@material-ui/core/styles/withStyles'

export const mpStyle = {
  red: '#F84033',
  grey: '#B9B9B9',
  greyLite: grey['200'],
  black: '#0D0D21',
  shadow: {
    1: '0 1px 1px 0 rgba(0,0,0,0.14), 0 2px 1px -1px rgba(0,0,0,0.12), 0 1px 3px 0 rgba(0,0,0,0.20)',
  },
  space: {
    xxl: 56,
    xl: 48,
    l: 40,
    n: 32,
    s: 24,
    xs: 16,
    xxs: 8,
  },
  spacePx: {
    xxl: '56px',
    xl: '48px',
    l: '40px',
    n: '32px',
    s: '24px',
    xs: '16px',
    xxs: '8px',
  },
  fontTypeObj: {
    xxl: {
      fontSize: '28px',
      fontWeight: 600,
    } as CreateCSSProperties,
    xl: {
      fontSize: '24px',
      fontWeight: 600,
    } as CreateCSSProperties,
    l: {
      fontSize: '18px',
      fontWeight: 600,
    } as CreateCSSProperties,
    n: {
      fontSize: '16px',
      fontWeight: 400,
    } as CreateCSSProperties,
    s: {
      fontSize: '14px',
      fontWeight: 400,
    } as CreateCSSProperties,
  },
  fontType: {
    xxl: `
      font-size: 28px; 
      font-weight: 600;
    `,
    xl: `
      font-size: 24px; 
      font-weight: 600;
    `,
    l: `
      font-size: 18px; 
      font-weight: 600;
    `,
    n: `
      font-size: 16px; 
      font-weight: 400;
    `,
    s: `
      font-size: 14px; 
      font-weight: 400;
    `,
  },
  scrollbar: `
    /* 滚动条 */
    ::-webkit-scrollbar-thumb:horizontal { /*水平滚动条的样式*/
        width: 4PX;
        background-color: #CCCCCC;
        -webkit-border-radius: 6PX;
    }
    ::-webkit-scrollbar-track-piece {
        background-color: #fff; /*滚动条的背景颜色*/
        -webkit-border-radius: 0; /*滚动条的圆角宽度*/
    }
    ::-webkit-scrollbar {
        width: 10PX; /*滚动条的宽度*/
        height: 8PX; /*滚动条的高度*/
    }
    ::-webkit-scrollbar-thumb:vertical { /*垂直滚动条的样式*/
        height: 50PX;
        background-color: #999;
        -webkit-border-radius: 4PX;
        outline: 2PX solid #fff;
        outline-offset: -2PX;
        border: 2PX solid #fff;
    }
    ::-webkit-scrollbar-thumb:hover { /*滚动条的hover样式*/
        height: 50PX;
        background-color: #9f9f9f;
        -webkit-border-radius: 4PX;
    }
  `,
  ellipsis: `
    overflow:hidden;
    text-overflow:ellipsis;
    white-space:nowrap;
  `,
}

export const RedBox = styled.div`
  color: ${mpStyle.red};
`
