import React from 'react';
import './App.css';
import styled from "@emotion/styled";
import Navigation from "./Components/Navigation/navigation";


const Header = styled.header`
`

const Main = styled.main`
  color: blue;
`

function App() {
  return (
    <div className="App">
      <Navigation items={['stories', 'timeline','post']} />
      <Header>
        <h1>Header</h1>
      </Header>
      <Main>
        testBody
      </Main>
    </div>
  );
}

export default App;
