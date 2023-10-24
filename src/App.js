import { Box, Text, Button, Flex } from '@chakra-ui/react'
import { useState } from 'react';
import './App.css';

function Numbers(props) {
  const nums = Array.from(Array(10).keys()).map(
    number => {
      return <Button onClick={(e) => {
        if (props.data != 0) props.onClick(props.data + e.target.innerHTML)
        else props.onClick(e.target.innerHTML)
      }}
        key={number} w={'40px'} h={'40px'} margin={'4px'}>{number}</Button>
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
    <Button w={'40px'} h={'40px'} margin={'4px'} onClick={() => { props.onClick(props.data + props.expression) }}>
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
  return (
    <div className="App">
      <Box display={'flex'} justifyContent={'center'} flexDirection={'column'} alignItems={'center'} h={"100vh"}>
        <Box display={'flex'} justifyContent={'center'} gap={'5px'} flexDirection={'column'} alignItems={'center'} w={'200px'}>
          <Box display={'flex'} w={'100%'} justifyContent={'space-between'}>
            <Text display={'flex'} justifyContent={'start'} alignItems={'center'}
              bg={'gray.50'} w={'100%'} h={'38px'} px={'4px'} borderRadius={'8px'}>
              {counts}
            </Text>
            <Text w={'fit-content'} h={'38px'} textColor={'tomato'}>
              {result}
            </Text>
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
        </Box>
      </Box>
    </div>
  );
}
export default App;
