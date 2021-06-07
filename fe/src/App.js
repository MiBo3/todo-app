import { BrowserRouter, Route } from 'react-router-dom';

import Notes from "./pages/Notes";

const App = () => (
  <BrowserRouter>
    <Route path='/'>
      <Notes/>
    </Route>
  </BrowserRouter>
)

export default App;
