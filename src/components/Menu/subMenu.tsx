import React ,{useState,useContext, FunctionComponentElement}from 'react';
import classNames from 'classnames';
import {MenuContext} from './menu';
import { MenuItemProps } from './menuitem';
import Icon from '../Icon/icon'
import {CSSTransition} from 'react-transition-group'
import Transition from '../Transition/transition'
import Transiton from '../Transition/transition';
export interface SubMenuProps {
  index?:string;
  title:string;
  className?:string;
}
const SubMenu:React.FC<SubMenuProps> = (props)=>{
  
  const context = useContext(MenuContext);
  const openSubMenus =  context.defaultOpenSubMenus as Array<string>;
  
  const {index,title,children,className} = props; 
  const isOpended = (index&&context.mode==='vertical')?openSubMenus.includes(index):false;
  const [menuOpen,setOpen] = useState(isOpended);
  const classes = classNames('menu-item submenu-item',className,{
    'is-active':context.index === index,
    'is-opened':menuOpen,
    'is-vertical':context.mode==='vertical'
  })
  const handleClick = (e:React.MouseEvent)=>{
    e.preventDefault();
    setOpen(!menuOpen);
    console.log(menuOpen) 
    if(context.onSelect&&(typeof index === 'number')){
      context.onSelect(index)
    }
  }
  let timer:any;
  const handleMouse = (e:React.MouseEvent,toggle:boolean)=>{
    clearTimeout(timer); 
    if(context.onSelect&&(typeof index === 'number')){
      context.onSelect(index)
    }
    e.preventDefault();
    timer = setTimeout(() => {
      setOpen(toggle);
    }, 300);
  }
  const clickEvents = context.mode === 'vertical'?{
    onClick:handleClick
  }:{};
  const mouseEvents = context.mode !== 'vertical'?{
    onMouseEnter:(e:React.MouseEvent)=>{handleMouse(e,true)},
    onMouseLeave:(e:React.MouseEvent)=>{handleMouse(e,false)}
  }:{};
  const renderChildren = ()=>{
    const subMenuClasses = classNames('viking-submenu',{
      'menu-opened':menuOpen
      
    })
    const childComponent =  React.Children.map(children,(child,i)=>{
      const childElement = child as FunctionComponentElement<MenuItemProps>
      if(childElement.type.displayName === 'MenuItem'){
        return React.cloneElement(childElement,{
          index:`${index}-${i}`
        })
      }else{
        console.error('请放入MenuItem组件')
      }
    })
    //使用unmountexit实现display切换的效果
    return (
      <Transiton in={menuOpen} timeout = {300} animation ='zoom-in-top'>
      <ul className = {subMenuClasses}>
        {
          childComponent   
        }
      </ul>
      </Transiton>
    )
  }
  return (
    <li key = {index} className = {classes} {...mouseEvents}>
      <div className='submenu-title' {...clickEvents}>{title}
      <Icon icon='angle-down' className='arrow-icon'></Icon>
      </div>
      {
        renderChildren()
      }
    </li>
  )
}
SubMenu.displayName = 'SubMenu';
export default SubMenu;