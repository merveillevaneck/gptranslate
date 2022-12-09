import React, { useState } from 'react';
import logo from './logo.svg';
import './App.css';
import { Configuration, OpenAIApi } from 'openai';

const apiKey = process.env.REACT_APP_OPENAI_KEY || '';

const config = new Configuration({
  apiKey
});
const openai = new OpenAIApi(config);

function App() {
  const [msg, setMsg] = useState('');
  const [answer, setAnswer] = useState<any[]>([])

  //on submit handler with typed event argument
  const getResponse: React.FormEventHandler<HTMLFormElement> = async e => {
    e.preventDefault();
    e.stopPropagation();
    if (!msg) return;
    const response = await openai.createCompletion({
      model: "text-davinci-003",
      prompt: `Translate this into French:\n\n${msg}\n.`,

      temperature: 0.3,
      max_tokens: 100,
      top_p: 1.0,
      frequency_penalty: 0.0,
      presence_penalty: 0.0,
    })
    setAnswer(response.data.choices);
  }

  return (
    <div className="App">
      <header className="App-header">
        <img src={logo} className="App-logo" alt="logo" />
        <p>
          Translate anything! 
        </p>
        <form onSubmit={getResponse}>
          <input className="input" value={msg} onChange={e => setMsg(e.target.value)} />
          <button type="submit">go!</button>
          <div>
            {
              answer.map((choice: any, idx: number) => <p>{idx}. {JSON.stringify(choice.text)}</p>)
            }
          </div>
        </form>
      </header>
    </div>
  );
}

export default App;
