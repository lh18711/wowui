import React from 'react';
import {storiesOf} from '@storybook/react'
import {action} from '@storybook/addon-actions'
import Button from './button'
const defaultButton = ()=>(
  <Button onClick = {action('clicked')}>default button</Button>
)
const buttonWithSize = ()=>(
  <>
    <Button size='lg'>large</Button>
    <br/>
    <Button size='sm'>small</Button>
  </>
)
const buttonWithType = ()=>(
  <>
    <Button btnType='primary'>primary</Button>
    <br/>
    <Button btnType='danger'>danger</Button>
    <br/>
    <Button btnType='link' href ="http://www.baidu.com">link</Button>
  </>
)
storiesOf('Button Component',module)
.add('默认button',defaultButton)
.add('不同尺寸的button',buttonWithSize)
.add('不同类型的button',buttonWithType)
