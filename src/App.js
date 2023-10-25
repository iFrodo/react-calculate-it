import { Box, Text, Button, Flex, Input } from '@chakra-ui/react'

import { useState } from 'react';
import './App.css';

function Numbers(props) {
  const nums = Array.from(Array(10).keys()).map(
    number => {
      return <Button onClick={(e) => {
        if (props.data !== 0) props.onClick(props.data + e.target.innerHTML)
        else props.onClick(e.target.innerHTML)
      }}
        key={number} className='button' w={'40px'} h={'40px'} margin={'4px'}>{number}</Button>
    }
  )
  return (
    <Box display={'flex'} flexWrap={'wrap'} w={'30%'}>{nums}</Box>
  )
}
function CountButton(props) {
  const expressions = /\+|\-|\/|\*| /
  const lastNumber = props.data[props.data.length - 1]
  if (expressions.test(lastNumber)) return
  return (
    <Button className='button' bg={'#54abd4'} w={'40px'} h={'40px'} margin={'4px'} onClick={() => { props.onClick(props.data + props.expression) }}>
      {props.expression}

    </Button>
  )
}


function App() {
  const [counts, setCounts] = useState(0);
  const [result, setResult] = useState('');
  function applyExpression(countedNumber) {
    setCounts(countedNumber)
    setResult(eval(counts))

  }
  function InputCalc(props) {
    const [result, setResult] = useState('')
    const [counts, setCounts] = useState('')
    function updateCount(e) {
      const expressions = /[0-9]|\)/
      const lastNumber = e.target.value[e.target.value.length - 2]
      if (expressions.test(lastNumber) && expressions.test(e.nativeEvent.data) && e.nativeEvent.data != null) return
      if (!expressions.test(e.nativeEvent.data)) setResult(eval(e.target.value))
      setResult(e.target.value)
      return (<Input border={'transparent'} value={counts} type='text' onInput={(e) => { updateCount(e) }} />)
    }

  }


  return (
    <div className="App">
      <Box display={'flex'} justifyContent={'center'} flexDirection={'column'} alignItems={'center'} h={"100vh"}>
        <Box display={'flex'} justifyContent={'center'} m={'5px'} flexDirection={'column'} alignItems={'center'} w={'30%'}>

          <Box display={'flex'} w={'100%'} justifyContent={'space-between'}>
            <Flex display={'flex'} justifyContent={'start'} alignItems={'center'}
              bg={'gray.50'} w={'100%'} h={'38px'} px={'4px'} borderRadius={'8px'}>
              <InputCalc />
              <Text w={'fit-content'} h={'38px'} textColor={'tomato'}>
                {result}
              </Text>
            </Flex>
          </Box>
        </Box>
        <Box display={'flex'} justifyContent={'center'} alignItems={'baseline'} >
          <Numbers data={counts} onClick={setCounts} />
          <Box display={'flex'} flexDirection={'column'} alignItems={'center'}  >
            <CountButton data={counts} expression={'+'} onClick={applyExpression} />
            <CountButton data={counts} expression={'-'} onClick={applyExpression} />
            <CountButton data={counts} expression={'*'} onClick={applyExpression} />
            <CountButton data={counts} expression={'/'} onClick={applyExpression} />

          </Box>
          <Button bg={'tomato'} m={'4px'} w={'40px'} h={'40px'} onClick={() => { setResult(eval(counts)) }}>=</Button>
        </Box>
      </Box>
    </div>
  );
}
export default App;
