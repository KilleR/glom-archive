import React, {useEffect, useState} from 'react';
import './App.css';
import styled from "@emotion/styled";
import Navigation from "./Components/Navigation/navigation";
import {libraryPost, getLoreList, login, postLore, getLoreItem} from "./API";
import {formInputs} from "./config";
import ShowLoreModal from "./Components/Modal/show-lore-modal";
import AddLoreModal from "./Components/Modal/add-lore-modal";


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
  const [ loreInfo, setLoreInfo ] = useState<libraryPost>({
    content: "",
    date: "",
    id: "",
    metadata: {tags: []},
    title: ""
  })
  useEffect(() => {
    const doLogin = async () => {
      const token = await login()
      setLoginToken(token);
    }

    doLogin().catch(console.error);
  }, [setLoginToken]);

  const updateLoreList = () => {
    getLoreList(loginToken).then(loreList => setLoreList(loreList)).catch(console.error);
  }

  useEffect(() => {
    console.log('token:', loginToken)
    if(loginToken) {
      updateLoreList();
    }
  }, [loginToken])

  const [modalState, setModalState ] = useState<'add' | 'show' | false>(false)

  const closeModal = () => {
    setModalState(false);
  }

  const modalSubmit = (data: formInputs ) => {
    console.log('modal data', data);
    closeModal();
    const loreToPost: libraryPost = {
      id: data.title.replace(' ', '-'),
      title: data.title,
      date: Date.now().toString(),
      content: data.content,
      metadata: {
        tags: data.tags.split(',').map(tag => tag.trim())
      }
    }
    postLore(loginToken, loreToPost).then(() => updateLoreList());
  }

  const inspectLoreItem = (id: string) => {
    getLoreItem(loginToken, id).then(loreItem => {
      setLoreInfo(loreItem);
      setModalState('show')
    })
  }

  return (
    <div className="App">
      <AddLoreModal visible={modalState === 'add'} onSubmit={modalSubmit} />
      <ShowLoreModal visible={modalState === 'show'} data={loreInfo} close={() => closeModal()} />
      <Navigation items={['Stories', 'Timeline','Post']} />
      <Header>
        <AddButton onClick={ () => setModalState('add') }>ADD</AddButton>
        <h1>Glomdoring Lore</h1>
      </Header>
      <Main>
        <ul>
          {
            loreList.map(lore => (
              <li key={lore}><a href={void(0)} onClick={() => inspectLoreItem(lore)}>{lore}</a></li>
            ))
          }
        </ul>
      </Main>
    </div>
  );
}

export default App;
