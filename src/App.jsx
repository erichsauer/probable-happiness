import { useEffect, useState } from 'react';

export default function App() {
  const [history, setHistory] = useState([]);
  const [index, setIndex] = useState(0);
  const [date, setDate] = useState('');
  const [error, setError] = useState('');

  useEffect(() => {
    if (index > 0) setDate(history[index]);
  }, [index]);

  const handleButton = (e) => {
    switch (e.target.name) {
      case 'set':
        setDate(() => e.target.value);
        setHistory((prevState) => {
          setIndex(prevState.length);
          return [...prevState, e.target.value];
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
          date:{' '}
          {date &&
            new Date(date + ' 0:00').toLocaleDateString('en-US', {
              weekday: 'short',
              year: 'numeric',
              month: 'short',
              day: 'numeric',
            })}
        </p>
      </fieldset>
    </form>
  );
}
