import React from 'react'
import {HomeAppModule, HomeType} from '../../../utils/view/m/home/appModule'

export default HomeAppModule(HomeType.group)

// export const getStaticPaths = () => {
//   return {
//     paths: [AppModuleTypeEnum.categorySelection, AppModuleTypeEnum.lineRanking, AppModuleTypeEnum.topRanking].map(v => ({
//       params: {
//         appModule: v,
//       },
//     })),
//     fallback: true,
//   }
// }
// export const getStaticProps = init
