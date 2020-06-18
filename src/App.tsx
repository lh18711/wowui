import React from 'react';
import Button,{ButtonSize,ButtonType} from './components/Button/button'
import Menu from './components/Menu/menu'
import MenuItem from './components/Menu/menuitem'
import SubMenu from './components/Menu/subMenu'
import Icon from './components/Icon/icon'
function App() {
  return (
    <div className="App">
      <Icon icon='coffee' theme='danger'></Icon><br/>
      <Button autoFocus>Hello</Button>
      <Button btnType = {ButtonType.Primary}size = 'sm'>Large Primary</Button>
      <Button btnType = {ButtonType.Danger}>Hello</Button>
      <Button btnType = {ButtonType.Link} href = "http://www.baidu.com">百度</Button>
      <Button disabled>Hello</Button>
      <Button btnType = {ButtonType.Link} disabled href = "http://www.baidu.com">Hello</Button>
      <hr/>
      <Menu defaultIndex ='1' onSelect={(index)=>{console.log(index)}} mode='horizontal' defaultOpenSubMenus={['3']}>
        <MenuItem>cool link1</MenuItem>
        <MenuItem disabled>cool link2</MenuItem>
        <SubMenu title = 'drop'>
          <MenuItem>drop1</MenuItem>
          <MenuItem>drop2</MenuItem>
          <MenuItem>drop3</MenuItem>
        </SubMenu>
        <MenuItem>cool link3</MenuItem>
      </Menu>
    </div>
  );
}

export default App;
