import React, { FC ,useState, ChangeEvent, ReactElement,useEffect,KeyboardEvent, useRef} from 'react';
import Input,{InputProps} from '../Input/input';
import Icon from '../Icon/icon'
import useDebounce from '../../hooks/useDebounce'
import useClickOutside from '../../hooks/useClickOutside'
import classNames from 'classnames';
import Transition from '../Transition/transition'
interface DataSource {
  value:string
}
export type DataSourceType<T = {}> = T&DataSource;
// 这种数据根据传入的值的多少可以直接拓展出来

export interface AutoComplete extends Omit<InputProps,'onSelect'>  {
  fetchSuggestions:(str:string)=>DataSourceType[]|Promise<DataSourceType[]>; //查询函数 返回一个结果数组 或者一个promise
  onSelect?:(item:DataSourceType)=>void; //执行点击的回调
  renderOptions?:(item:DataSourceType)=>ReactElement; //下面返回的数据的模板
}
export const AutoComplete:FC<AutoComplete> = (props)=>{
  const {fetchSuggestions,onSelect,value,renderOptions,...resetPropslue} = props;
  const [loading,setLoading] = useState(false);
  const [inputValue, setInputValue] = useState(value);
  const [suggestions,setSuggestions] = useState<DataSourceType[]>([]);
  const [ showDropdown, setShowDropdown] = useState(false); 
  const debounceValue = useDebounce(inputValue,500);
  const [highlight,setHighlight] = useState(-1);
  const triggerSearch = useRef(false); //使用这个来控制搜索是否开启
  const componentRef = useRef<HTMLDivElement>(null)
  useClickOutside(componentRef,()=>{setSuggestions([])})
  useEffect(() => {
    if(debounceValue&&triggerSearch.current) {
      const result = fetchSuggestions(debounceValue as string);
      if(result instanceof Promise){ //如果返回的是一个promise
        console.log(result);
        setLoading(true);
        result.then(data=>{ //将data放入回调结果内
          setLoading(false);
          setSuggestions(data)
          if(data.length>0){
            setShowDropdown(true);
          }
        })
      }else{
        setSuggestions(result); //否则将数组放入结果内
        if(result.length>0){
          setShowDropdown(true);
        }
      }
    }else{
      setShowDropdown(false);
      setSuggestions([]);
    }
    setHighlight(-1);
  }, [debounceValue]);

  const handleChange = (e:ChangeEvent<HTMLInputElement>)=>{
    const value = e.target.value.trim()
    setInputValue(value);
    triggerSearch.current = true;
  } 

  const handleSelect = (item:DataSourceType)=>{
    setInputValue(item.value);
    setSuggestions([]);
    setShowDropdown(false);
    if(onSelect){
      onSelect(item);
    }
    triggerSearch.current = false;
  }

  const renderTemplete = (item:DataSourceType)=>{
    return renderOptions?renderOptions(item):item.value;
  }
  const changelight = (index:number) => {
    if(index<0) index = 0;
    if(index>=suggestions.length){
      index = suggestions.length - 1;
    }
    setHighlight(index)
  }
  const handleKeydown = (e:KeyboardEvent<HTMLElement>)=>{
    switch(e.keyCode){
      case 13:
        if(suggestions[highlight]){
          handleSelect(suggestions[highlight])
        }
        break;
      case 38:
        changelight(highlight-1);
        break;
      case 40:
        changelight(highlight+1);
        break;
      case 27:
        setSuggestions([]);
        setShowDropdown(false);
        break;
      default:
        break;
    }
  }

  const dropDown = ()=>{
    return (
      <Transition
        in={showDropdown || loading}
        animation="zoom-in-top"
        timeout={300}
        onExited={() => {setSuggestions([])}}
      >
        <ul className="viking-suggestion-list">
          { loading &&
            <div className="suggstions-loading-icon">
              <Icon icon="spinner" spin/>
            </div>
          }
          {suggestions.map((item, index) => {
            const cnames = classNames('suggestion-item', {
              'is-active': index === highlight
            })
            return (
              <li key={index} className={cnames} onClick={() => handleSelect(item)}>
                {renderTemplete(item)}
              </li>
            )
          })}
        </ul>
      </Transition>
    )
  }

  return(
    <div className = 'viking-auto-complete' ref = {componentRef}>
      <Input value={inputValue} onChange={handleChange} onKeyDown = {handleKeydown}/>
      {loading&&<Icon icon = 'spinner' spin></Icon>}
      {(suggestions.length>0)&&dropDown()}
    </div>
  )
}
export default AutoComplete;