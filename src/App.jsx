import React from 'react';
import {Routes, Route, BrowserRouter} from 'react-router-dom';

import Init from './rest/auth/Init';
import TokenTest from './rest/TokenTest';

function App() {

  return (
    <>
    <BrowserRouter>
      <Routes>
        <Route path='/'>
          <Route index element={<Init/>} />
          <Route path='test' element={<TokenTest/>} />
        </Route>
      </Routes>
    </BrowserRouter>
    </>
  );
}

export default App;
