import { useState } from 'react'
import reactLogo from './assets/react.svg'
import './App.css'
import styled, {createGlobalStyle} from 'styled-components';

function App() {
  const [count, setCount] = useState(0);

  const handleMouseDown = (e: React.MouseEvent<HTMLDivElement, MouseEvent>) => {
    const startX = e.clientX;
    const cssVar = getComputedStyle(document.body).getPropertyValue('--main-container-width');
    console.log(cssVar);
 
    let startWidth = 0;
    if (cssVar.includes('%')) {
      startWidth = parseInt(cssVar, 10) * window.innerWidth / 100;

      console.log(startWidth);
    } else {
      startWidth = parseInt(cssVar, 10);

      console.log(startWidth);
    }


    const handleMouseMove = (e: MouseEvent) => {

      const newWidth = startWidth + (startX - e.clientX);
      document.body.style.setProperty('--main-container-width', `${newWidth}px`);
    };

    const handleMouseUp = () => {
      document.removeEventListener('mousemove', handleMouseMove);
      document.removeEventListener('mouseup', handleMouseUp);
    };

    document.addEventListener('mousemove', handleMouseMove);
    document.addEventListener('mouseup', handleMouseUp);
  };


  return (
    <div className="App">
      <div className='wrapper'>
        <GlobalStyles />
        <div style={{ height: "100%", width: '20%' }}>
          <DragHandle onMouseDown={handleMouseDown}/>
        </div>
        <ContentDiv>
          <div>
            <a href="https://vitejs.dev" target="_blank">
              <img src="/vite.svg" className="logo" alt="Vite logo" />
            </a>
            <a href="https://reactjs.org" target="_blank">
              <img src={reactLogo} className="logo react" alt="React logo" />
            </a>
          </div>
          <h1>Vite + React</h1>
          <div className="card">
            <button onClick={() => setCount((count) => count + 1)}>
              count is {count}
            </button>
            <p>
              Edit <code>src/App.tsx</code> and save to test HMR
            </p>
          </div>
          <p className="read-the-docs">
            Click on the Vite and React logos to learn more
          </p>
        </ContentDiv>
      </div>
    </div>

  )
}

const GlobalStyles = createGlobalStyle`
  html {
    --color-text: black;
    --color-background: white;
    --color-primary: #66339980;
    --main-container-width: 80%;
  }
`;

const MenuDiv = styled.div`
`;

const DragHandle = styled.div`
  position: absolute;
  height: 100%;
  width: 20px;
  left: calc(100vw - var(--main-container-width) - 20px);
  background: #66339980;

  cursor: ew-resize;

  &:hover {
    background: #663399;

    border-left: 2px solid blue;
  }
`;

const ContentDiv = styled.div`
  position: absolute;
  height: 100%;
  width: var(--main-container-width);
  left: calc(100vw - var(--main-container-width));



  display: flex;
  flex-direction: column;
  justify-content: center;
  background: #66339980;
`;


export default App
