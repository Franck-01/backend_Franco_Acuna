import './App.css';
import { BrowserRouter, Route, Routes } from 'react-router-dom';
import CreatePost from './components/CreatePost';
import EditPost from './components/EditPost';
import ShowPosts from './components/ShowPosts';


function App() {
  return (
    <div className="App">
        <BrowserRouter>
          <Routes>
            <Route path='/' element={ <ShowPosts /> } />
            <Route path='/create' element={ <CreatePost /> } />
            <Route path='/edit/:id' element={ <EditPost /> } />
          </Routes>
        </BrowserRouter>
    </div>
  );
}

export default App;
