import React, {useEffect, useState} from 'react';
import './App.css';
import styled from "@emotion/styled";
import Navigation from "./Components/Navigation/navigation";
import {libraryPost, getLoreList, login, postLore} from "./API";


const Header = styled.header`
  padding: 0 100px;
`

const Main = styled.main`
  padding: 0 100px;
`

function App() {
  const [ loginToken, setLoginToken ] = useState('')
  const [ loreList, setLoreList ] = useState<string[]>([])
  useEffect(() => {
    const doLogin = async () => {
      const token = await login()
      setLoginToken(token);
    }

    doLogin().catch(console.error);
  }, [setLoginToken]);

  useEffect(() => {
    console.log('token:', loginToken)
    if(loginToken) {
      getLoreList(loginToken).then(loreList => setLoreList(loreList)).catch(console.error)
    }
  }, [loginToken])

  return (
    <div className="App">
      <Navigation items={['Stories', 'Timeline','Post']} />
      <Header>
        <h1>Header</h1>
      </Header>
      <Main>
        testBody
        <div>
          <button onClick={() => getLoreList(loginToken)}>Get</button>
        </div>
        <div>
          <button onClick={() => postLore(loginToken, {id: 'lore1',content:'A test post', date: Date.now().toString(), metadata: {tags: ['lore', 'core', 'new']}})}>Post</button>
        </div>
        <ul>
          {
            loreList.map(lore => (
              <li>{lore}</li>
            ))
          }
        </ul>
      </Main>
    </div>
  );
}

export default App;
