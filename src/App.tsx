import React from 'react';
import Button,{ButtonSize,ButtonType} from './components/Button/button'

function App() {
  return (
    <div className="App">
      <Button autoFocus>Hello</Button>
      <Button btnType = {ButtonType.Primary}size = {ButtonSize.Large}>Large Primary</Button>
      <Button btnType = {ButtonType.Danger}>Hello</Button>
      <Button btnType = {ButtonType.Link} href = "http://www.baidu.com">百度</Button>
      <Button disabled>Hello</Button>
      <Button btnType = {ButtonType.Link} disabled href = "http://www.baidu.com">Hello</Button>
    </div>
  );
}

export default App;
