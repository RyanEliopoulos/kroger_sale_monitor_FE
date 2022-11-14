import './App.css';
import {BrowserRouter as Router, Routes, Route, Navigate} from 'react-router-dom'
import {CenteredTabs} from "./components/Tabs";
import {Initializer} from "./components/Initializer";
import {Settings} from "./features/settings/Settings";
import {ProductSearch} from "./features/product_search/ProductSearch";

function App() {
  return (
    <Router>
      <Initializer/>
      <CenteredTabs/>
      <Routes>
        <Route path={'/'} element={<Navigate to={'/watchlist'}/>}/>
        <Route exact path={'/watchlist'} element={<h1> This is the watchlist</h1>}/>
        <Route exact path={'/search_products'} element={<ProductSearch/>}/>
        <Route exact path={'/settings'} element={<Settings/>}/>
      </Routes>
    </Router>

  );
}

export default App;
