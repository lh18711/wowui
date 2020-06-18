import React, { ReactElement, InputHTMLAttributes,FC, ChangeEvent } from 'react'
import { IconProp } from '@fortawesome/fontawesome-svg-core'
import classNames from 'classnames';
import Icon from '../Icon/icon';
type inputSize = "lg"|"sm"
// 使用omit方法 泛型内写入正常的接口和要忽略的属性
export interface InputProps extends Omit<  InputHTMLAttributes<HTMLElement>,'size'> {
  disabled?:boolean;
  size?:inputSize;
  icon?:IconProp;
  preppend?:string|ReactElement;
  append?:string|ReactElement;
  onChange?:(e:ChangeEvent<HTMLInputElement>)=>void;
}
export const Input:FC<InputProps> = (props)=>{
  const {disabled,size,icon,preppend,append,children,style,...resetProps} = props;
  const classsnames = classNames('viking-input-wrapper',{
    [`input-size-${size}`]:size,
    'isdisabled':disabled,
    'input-group':preppend||append,
    'input-group-append':!!append,
    'input-group-preppend':!!preppend
  })
  const fixControlledValue = (value: any) => {
    if (typeof value === 'undefined' || value === null) {
      return ''
    }
    return value
  }
  if('value' in props){ //如果有value  删掉defaultvalue
    delete resetProps.defaultValue;
    resetProps.value = fixControlledValue(props.value)
    //设置value如果初始值为无的时候 返回一个初始值
  }
  return (
    <div className ={classsnames} style = {style}>
      {preppend&&<div className='viking-input-group-append'>{preppend}</div>}
      {icon && <div className="icon-wrapper"><Icon icon={icon} title={`title-${icon}`}/></div>}
      <input 
        className="viking-input-inner"
        disabled={disabled}
        {...resetProps}
      />
      {append && <div className="viking-input-group-append">{append}</div>}
    </div>
  )
}
  export default Input;