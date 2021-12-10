import { useCallback, useEffect, useMemo, useState } from 'react';
import * as conversions from './conversions'
import './App.css';

type BaseType = 'binary' | 'decimal' | 'hexadecimal'
type BaseSymbolsType = {[key in BaseType]: string[]}

type NumpadPropsType = {
  currentBase: BaseType
  symbols: BaseSymbolsType,
  onButtonClick: (symbol: string) => void,
  onBackButtonClick: () => void
}

function Numpad (props: NumpadPropsType) {
  useEffect(() => {
    window.onkeyup = e => {
      const key = e.key.toUpperCase()
      if (props.symbols[props.currentBase].includes(key)) {
        props.onButtonClick(key)
      } if (key === 'BACKSPACE') {
        props.onBackButtonClick()
      }
    }
  }, [props])
  return (
    <div className="Numpad">
      <div>
        {props.symbols[props.currentBase].map((symbol, i) => (
          <button key={i} onClick={() => props.onButtonClick(symbol)}>{symbol}</button>
        ))}
      </div>
    </div>
  )
}

function App () {
  const [inputValue, setInputValue] = useState('')
  const [currentBase, privateSetCurrentBase] = useState<BaseType>('decimal')

  const setCurrentBase = useCallback((value: BaseType) => {
    if (currentBase === 'binary' && value === 'decimal') {
      setInputValue(conversions.binToDec(inputValue).toString())
    } else if (currentBase === 'binary' && value === 'hexadecimal') {
      setInputValue(conversions.binToHex(inputValue))
    } else if (currentBase === 'decimal' && value === 'binary') {
      setInputValue(conversions.decToBin(parseInt(inputValue)))
    } else if (currentBase === 'decimal' && value === 'hexadecimal') {
      setInputValue(conversions.decToHex(parseInt(inputValue)))
    } else if (currentBase === 'hexadecimal' && value === 'binary') {
      setInputValue(conversions.hexToBin(inputValue))
    } else if (currentBase === 'hexadecimal' && value === 'decimal') {
      setInputValue(conversions.hexToDec(inputValue).toString())
    }
    privateSetCurrentBase(value)
  }, [currentBase, inputValue])

  const symbols = useMemo(() => ({
    binary: '01'.split(''),
    decimal: '0123456789'.split(''),
    hexadecimal: '0123456789ABCDEF'.split('')
  } as BaseSymbolsType), [])

  const onNumpadButtonClick = useCallback((symbol: string) => {
    setInputValue(inputValue + symbol)
  }, [inputValue])

  const onBackButtonClick = useCallback(() => {
    setInputValue(inputValue.substring(0, inputValue.length - 1))
  }, [inputValue])

  return (
    <div className="App">
      <input type="text" className="Input" readOnly value={inputValue} />
      <div className="Bases">
        {Object.keys(symbols).map((symbol, i) => (
          <div className="Base" key={i}>
            <label htmlFor={symbol}>{symbol}</label>
            <input type="radio" name={symbol} id={symbol} checked={currentBase === symbol} onChange={() => setCurrentBase(symbol as BaseType)} />
          </div>
        ))}
      </div>
      {/* <div className="Buttons"> */}
        <button className="Clear" onClick={() => setInputValue('')}>C</button>
        <button className="Back" onClick={() => onBackButtonClick()}>&lt;-</button>
        <Numpad
          currentBase={currentBase}
          symbols={symbols}
          onButtonClick={onNumpadButtonClick}
          onBackButtonClick={onBackButtonClick}
        />
      {/* </div> */}
    </div>
  );
}

export default App;
