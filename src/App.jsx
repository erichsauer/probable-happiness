import { useEffect, useState } from 'react';

export default function App() {
  const [history, setHistory] = useState([]);
  const [index, setIndex] = useState(0);
  const [date, setDate] = useState('');
  const [error, setError] = useState('');

  useEffect(() => {
    setDate(history[index] || '');
  }, [index]);

  const handleButton = (e) => {
    switch (e.target.name) {
      case 'set':
        setDate(() => e.target.value);
        if (index + 1 < history.length)
          setHistory((prevHistory) => {
            prevHistory.splice(index + 1, 0, e.target.value);
            return prevHistory;
          });
        else
          setHistory((prevHistory) => {
            setIndex(prevHistory.length);
            return [...prevHistory, e.target.value];
          });
        break;
      case 'undo':
        if (index > 0) setIndex((prevState) => prevState - 1);
        break;
      case 'redo':
        if (index < history.length - 1) setIndex((prevState) => prevState + 1);
        break;
      default:
        setError(`no case exists for ${e.target.name}`);
        break;
    }
  };

  return (
    <form onSubmit={(e) => e.preventDefault()}>
      <fieldset>
        <legend>date time machine</legend>
        <label htmlFor="date"></label>
        <input type="date" name="set" value={date} onChange={handleButton} />
        <button onClick={handleButton} name="undo">
          undo
        </button>
        <button onClick={handleButton} name="redo">
          redo
        </button>
        <button onClick={handleButton} name="butts">
          butts
        </button>
        <p>error: {error}</p>
        <p>current index: {index.toLocaleString()}</p>
        <p>
          {history.map((x, i) => (
            <span key={x + i}>{x === date ? '❎' : '🟩'}</span>
          ))}
        </p>
      </fieldset>
    </form>
  );
}
