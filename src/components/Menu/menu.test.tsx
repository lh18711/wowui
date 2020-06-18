import React from 'react';
import {render,RenderResult, fireEvent, cleanup,wait} from '@testing-library/react'
import Menu,{MenuProps} from './menu'
import MenuItem from './menuitem'
import SubMenu from './subMenu'
const testProps:MenuProps = {
  defaultIndex:'1',
  onSelect:jest.fn(),
  className:'test'
}
const testVerProps:MenuProps = {
  defaultIndex:'1',
  mode:'vertical'
}
const generateMenu = (props:MenuProps) =>{
  return (
    <Menu {...props}>
    <MenuItem>active</MenuItem>
    <MenuItem disabled>disabled</MenuItem>
    <MenuItem>xyz</MenuItem>
    <SubMenu title="dropdown">
      <MenuItem>
        drop1
      </MenuItem>
    </SubMenu>
  </Menu>
  )
}
const createStyle = ()=>{
  const cssFile:string = `
  .viking-submenu {
    display:none;
  }
  .viking-submenu.menu-opened {
    display:block;
  }`
  const style = document.createElement('style');
  style.type = 'text/css';
  style.innerHTML = cssFile;
  return style;
}

let wrapper:RenderResult,menuElement:HTMLElement,activeElement:HTMLElement,disabledElement:HTMLElement;
describe('test menu',()=>{
  beforeEach(()=>{
    wrapper = render(generateMenu(testProps))
    wrapper.container.append(createStyle());
    //因为是复合类型的组件 所以没办法根据标签间的内容取得实际元素 所以需要在组件内部加一个testid属性 根据这个在测试的时候来查找那个element
    menuElement = wrapper.getByTestId('test-menu');
    // menuElement= wrapper.container.getElementsByClassName 也可以用这种
    activeElement = wrapper.getByText('active');
    disabledElement = wrapper.getByText('disabled');

  })
  it('默认状态的menu',()=>{
    expect(menuElement).toBeInTheDocument()
    expect(menuElement).toHaveClass('viking-menu test')
    // expect(menuElement.getElementsByTagName('li').length).toEqual(3);
    expect(menuElement.querySelectorAll(':scope>li').length).toEqual(4); //使用这个可以更加精准的匹配层级 上方的只能匹配所有的
    expect(activeElement).toHaveClass('menu-item is-active')
    expect(disabledElement).toHaveClass('menu-item is-disabled')
  })
  it('点击效果是否触发active和callback',()=>{
    const thirdItem = wrapper.getByText('xyz');
    fireEvent.click(thirdItem);
    expect(thirdItem).toHaveClass('is-active');
    expect(activeElement).not.toHaveClass('is-active');
    expect(testProps.onSelect).toHaveBeenCalledWith('3');
    fireEvent.click(disabledElement);
    expect(disabledElement).not.toHaveClass('is-active');
    expect(testProps.onSelect).not.toHaveBeenCalledWith('2');
  })
  it('mode切换效果',()=>{
    cleanup();//清空生命周期创建的初始dom
    const wrapper = render(generateMenu(testVerProps));
    const menuElement = wrapper.getByTestId('test-menu'); //这里需要先清空原来的wrapper上面渲染的dom   不然会报错 因为出现了两次render
    expect(menuElement).toHaveClass('menu-vertical')
  })
  it('鼠标悬停时展示下拉列表(横向)',async ()=>{
    expect(wrapper.queryByText('drop1')).not.toBeVisible();
    const dropdownElement = wrapper.getByText('dropdown');
    fireEvent.mouseEnter(dropdownElement);
    // expect(wrapper.queryByText('drop1')).toBeVisible(); //直接断言失败 因为点击是异步的
    await wait(()=>{
      expect(wrapper.queryByText('drop1')).toBeVisible(); //选择 这种方式来等待异步操作
    })
    fireEvent.click(wrapper.getByText('drop1'));
    expect(testProps.onSelect).toHaveBeenCalledWith('4-0');
    fireEvent.mouseLeave(dropdownElement);
    await wait(()=>{
      expect(wrapper.queryByText('drop1')).not.toBeVisible(); 
    })
  })
})