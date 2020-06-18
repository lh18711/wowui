import  React ,{FC,ButtonHTMLAttributes,AnchorHTMLAttributes}from 'react';
import classNames from 'classnames';
import { EventType } from '@testing-library/react';
type ButtonSize = "lg"|"sm"//设置button的size


export enum ButtonType { //设置button的type
  Primary = 'primary',
  Default = 'default',
  Danger = 'danger',
  Link = 'link' 
}
interface BaseButtonProps {
  className?:string;
  disabled?:boolean;
  size?:ButtonSize;
  btnType?:ButtonType; 
  children:React.ReactNode;
  href?:string;
}
type NativeButtonProps = BaseButtonProps&ButtonHTMLAttributes<HTMLElement>; //获取拓展的button按钮元所有属性
type AnchorButtonProps = BaseButtonProps&AnchorHTMLAttributes<HTMLElement>; //获取a链接按钮所有属性
export type ButtonProps = Partial<NativeButtonProps&AnchorButtonProps>; //利用partial将所有属性变为可选的 不填也没什么事  
export const Button:FC<ButtonProps> = (props)=>{
  const {
    className, //用户填入的自定义classname
    btnType,
    disabled,
    size,
    children, 
    href,
    ...restProps //用户填写入的其他参数 比如onclick之类的
  } = props;
  const classes = classNames('btn',className,{
    [`btn-${btnType}`]:btnType,
    [`btn-${size}`]:size,
    disabled:(btnType===ButtonType.Link)&&disabled
  })
  if(btnType===ButtonType.Link&&href){
    const linkClick = (e:React.MouseEvent)=>{
      if(disabled){
        e.preventDefault();
      }
    }
    return (
      <a className = {classes} href = {href} onClick = {linkClick} {...restProps}>
        {children}
      </a>
    )
  }else{
    return (
      <button className = {classes} disabled = {disabled} {...restProps}>
        {children}
      </button>
    )
  }
}
Button.defaultProps = {
  disabled:false,
  btnType:ButtonType.Default
}
export default Button;