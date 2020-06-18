import React ,{useState,createContext}from 'react';
import classNames from 'classnames';
import {MenuItemProps} from './menuitem'
type MenuMode = 'horizontal'|'vertical'; //同样也表示两个之中的一个 比起enum更为直观
type selectCallback = (selectIndex:string)=>void
export interface MenuProps {
  defaultIndex?:string;
  className?:string;
  mode?:MenuMode;
  style?:React.CSSProperties;//css属性
  onSelect?:selectCallback;
  defaultOpenSubMenus?:string[];
}
interface iMenuContext {
  index:string;
  onSelect?:selectCallback;
  mode?:MenuMode;
  defaultOpenSubMenus?:string[];
}
export const MenuContext = createContext<iMenuContext>({index:'1'})


const Menu:React.FC<MenuProps> = (props)=>{
  const {className,mode,style,children,defaultIndex,onSelect,defaultOpenSubMenus} = props;
  const [currentActive,setActive] = useState(defaultIndex);
  const classes = classNames('viking-menu',className,{
    'menu-vertical':mode==='vertical',
    'menu-horizontal':mode!=='vertical'
  })
  const handleClick = (index:string)=>{
    setActive(index);
    if(onSelect){
      onSelect(index);
    }
  }
  const passContext:iMenuContext = {
    index:currentActive?currentActive:'1',
    onSelect:handleClick,
    mode,
    defaultOpenSubMenus
  }
  const renderChildren = ()=>{
    //React.children方法自带的map 用来遍历其子节点 并且跳过一些无法map的节点  
    return React.Children.map(children,(child,index)=>{
      //需要给child加上断言 令其类型为函数组件
      const childElement = child as React.FunctionComponentElement<MenuItemProps>
      const {displayName} =  childElement.type;
      if(displayName==='MenuItem'||'SubMenu'){
        return React.cloneElement(childElement,{index:(index+1).toString()})
      }else{
        console.error('请放入MenuItem组件')
      }
    })
  }
  return (
    <ul className = {classes} style = {style} data-testid = 'test-menu'>
      <MenuContext.Provider value={passContext}>
        {renderChildren()}
      </MenuContext.Provider>
    </ul>
  )
}
Menu.defaultProps = {
  defaultIndex:'0',
  mode:'horizontal',
  defaultOpenSubMenus:[]
}
export default Menu;