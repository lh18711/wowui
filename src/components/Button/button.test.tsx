import React from 'react';
import {render,fireEvent} from '@testing-library/react'
import Button,{ButtonType,ButtonProps} from './button';
const defaultProps = { //捕捉函数是否调用 mockfunction  直接创建这样一个函数就好
  onClick:jest.fn()
}
const testProps:ButtonProps = {
  btnType:ButtonType.Primary,
  size:'lg',
  className:'klass'
}
const disabledProps:ButtonProps = {
  disabled:true,
  onClick:jest.fn()
}
describe('test button compoent',()=>{
  it('default button',()=>{
    const wrapper = render(<Button {...defaultProps}>Nice</Button>)
    const element = wrapper.getByText('Nice')
    expect(element).toBeInTheDocument()
    expect(element.tagName).toEqual('BUTTON')
    expect(element).toHaveClass('btn btn-default')
    fireEvent.click(element) //模拟点击
    expect(defaultProps.onClick).toHaveBeenCalled() //判断实现写好的点击测试时间是否被调用
  })
  it('button on different props',()=>{
    const wrapper = render(<Button {...testProps}>Nice</Button>)
    const element = wrapper.getByText('Nice')
    expect(element).toBeInTheDocument()
    expect(element).toHaveClass('btn-primary btn-lg klass')
  })
  it('button link',()=>{
    const wrapper = render(<Button btnType={ButtonType.Link} href = 'http://www.baidu.com'>Link</Button>)
    const element = wrapper.getByText('Link')
    expect(element).toBeInTheDocument()
    expect(element.tagName).toEqual('A')
    expect(element).toHaveClass('btn btn-link')
  })
  it('button disabled',()=>{
    const wrapper = render(<Button {...disabledProps}>Nice</Button>)
    const element = wrapper.getByText('Nice')  as HTMLButtonElement 
    expect(element).toBeInTheDocument()
    expect(element.disabled).toBeTruthy()
    fireEvent.click(element)
    expect(disabledProps.onClick).not.toHaveBeenCalled()
  })
})