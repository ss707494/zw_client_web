import React from 'react'
import {DefaultTheme} from '@material-ui/styles/defaultTheme'
import {CreateCSSProperties, StyledComponentProps, WithStylesOptions} from '@material-ui/styles/withStyles'
import {Omit, Overwrite} from '@material-ui/types'
import {styled} from '@material-ui/styles'
import {Button} from '@material-ui/core'


export type ComponentCreator<Component extends React.ElementType> = <Props extends {} = React.ComponentPropsWithoutRef<Component>,
    Theme = DefaultTheme,
    >(
    styles:
        | CreateCSSProperties<Props>
        | ((props: { theme: Theme } & Props) => CreateCSSProperties<Props>),
    options?: WithStylesOptions<Theme>,
) => React.ComponentType<Omit<JSX.LibraryManagedAttributes<Component, React.ComponentProps<Component>>,
    'classes' | 'className'> &
    StyledComponentProps<'root'> &
    Overwrite<Props, { className?: string; theme?: Theme }>>

type jssStyledFun = <E extends React.ElementType>(Component: E, filterProps?: string[]) => ComponentCreator<E>

const omit = (input: any, fields: string[] = []) => {
  const output: any = {}
  Object.keys(input).forEach((prop) => {
    if (fields.indexOf(prop) === -1) {
      output[prop] = input[prop]
    }
  })
  return output
}

export const jssStyled: jssStyledFun = (Component, filterProps) => {
  return styled((props) => {
    return <Component {...omit(props, filterProps)} />
  }) as ComponentCreator<typeof Component>
}
