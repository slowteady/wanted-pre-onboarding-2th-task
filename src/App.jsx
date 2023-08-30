import { BrowserRouter } from "react-router-dom";
import styled from "styled-components";
import Router from "./router/Router";

function App() {
  return (
    <BrowserRouter>
      <Wrap>
        <Router />
      </Wrap>
    </BrowserRouter>
  );
}

const Wrap = styled.div`
  height: 100%;
  margin: 100px 0;
  align-items: center;
  display: flex;
  flex-wrap: nowrap;
  overflow: hidden;
  flex-direction: column;
  justify-content: center;
`;

export default App;
