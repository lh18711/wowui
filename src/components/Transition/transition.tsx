import React from 'react'
import { CSSTransition } from 'react-transition-group'
import { CSSTransitionProps } from 'react-transition-group/CSSTransition'
type AnimationName = 'zoom-in-top' | 'zoom-in-left' | 'zoom-in-bottom' | 'zoom-in-right'

type TransitionProps = CSSTransitionProps & {
  animation?: AnimationName,
  wrapper? : boolean,
}
const Transiton:React.FC<TransitionProps> = (props)=>{
  const {children,classNames,animation,...resetprops} = props;
  return (
    <CSSTransition classNames = {classNames?classNames:animation} {...resetprops}>
      {children}
    </CSSTransition>
  )
}
Transiton.defaultProps = {
  unmountOnExit:true,
  appear:true
}
export default Transiton;
