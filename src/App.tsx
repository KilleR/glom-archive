import React, {useEffect, useState} from 'react';
import './App.css';
import styled from "@emotion/styled";
import Navigation from "./Components/Navigation/navigation";
import {libraryPost, getLoreList, login, postLore} from "./API";
import AddLoreModal from "./Components/Modal/add-lore-modal";
import {formInputs} from "./config";


const Header = styled.header`
  padding: 0 100px;
`

const Main = styled.main`
  padding: 0 100px;
`

const AddButton = styled.button`
  position: absolute;
  right: 100px;
  
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

  const [modalState, setModalState ] = useState(false)

  const modalSubmit = (data: formInputs ) => {
    console.log('modal data', data);
    setModalState(false);
    const loreToPost: libraryPost = {
      id: data.title.replace(' ', '-'),
      title: data.title,
      date: Date.now().toString(),
      content: data.content,
      metadata: {
        tags: data.tags.split(',').map(tag => tag.trim())
      }
    }
    postLore(loginToken, loreToPost)
  }

  return (
    <div className="App">
      <AddLoreModal visible={modalState} onSubmit={modalSubmit} />
      <Navigation items={['Stories', 'Timeline','Post']} />
      <Header>
        <AddButton onClick={ () => setModalState(!modalState) }>ADD</AddButton>
        <h1>Glomdoring Lore</h1>
      </Header>
      <Main>
        <ul>
          {
            loreList.map(lore => (
              <li key={lore}>{lore}</li>
            ))
          }
        </ul>
      </Main>
    </div>
  );
}

export default App;
