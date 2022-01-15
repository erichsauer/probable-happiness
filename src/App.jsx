import { useEffect, useState } from 'react';
import {
  FormControl,
  FormLabel,
  FormErrorMessage,
  FormHelperText,
  Button,
  Flex,
  ButtonGroup,
} from '@chakra-ui/react';

export default function App() {
  const [history, setHistory] = useState([]);
  const [index, setIndex] = useState(-1);
  const [date, setDate] = useState('');
  const [error, setError] = useState('');

  useEffect(() => {
    setDate(history[index] || '');
  }, [index]);

  const handleButton = (e) => {
    switch (e.target.name) {
      case 'set':
        setHistory((prevHistory) => [
          ...prevHistory.slice(0, index + 1),
          e.target.value,
          ...prevHistory.slice(index + 1, prevHistory.length + 1),
        ]);
        setIndex((prevState) => prevState + 1);
        break;
      case 'undo':
        setIndex((prevState) => prevState - 1);
        break;
      case 'redo':
        setIndex((prevState) => prevState + 1);
        break;
      default:
        setError(`no case exists for ${e.target.name}`);
        break;
    }
  };

  return (
    <FormControl as="fieldset" onSubmit={(e) => e.preventDefault()}>
      <Flex align="center" justify="center" direction="column">
        <FormLabel as="legend" htmlFor="date">
          Time Machine
        </FormLabel>
        <input
          type="date"
          name="set"
          id="date"
          value={date}
          onChange={handleButton}
        />
        <FormHelperText>Enter a date into the Time Machine</FormHelperText>
        <ButtonGroup>
          <Button disabled={index <= 0} onClick={handleButton} name="undo">
            UNDO
          </Button>
          <Button
            disabled={index === history.length - 1}
            onClick={handleButton}
            name="redo"
          >
            REDO
          </Button>
        </ButtonGroup>
        {error && <p>{'error: ' + error}</p>}
        <p>
          {history.map((x, i) => (
            <span key={x + i}>{x === date ? '❎' : '🟩'}</span>
          ))}
        </p>
      </Flex>
    </FormControl>
  );
}
