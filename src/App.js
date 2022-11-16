import './App.css';
import {BrowserRouter as Router, Routes, Route, Navigate} from 'react-router-dom'
import {useRoutes} from 'react-router-dom';
import {CenteredTabs} from "./components/Tabs";
import {Initializer} from "./components/Initializer";
import {Settings} from "./features/settings/Settings";
import {ProductSearch} from "./features/product_search/ProductSearch";
import {WatchList} from "./features/watchlist/WatchList";
import {LandingPage} from './features/landing_page/LandingPage'
import {AppRoutes} from "./features/routes";

function App() {

  const routes = [
    {
      path: '/',
      element: <LandingPage/>
    },

    {
      path: '/app',
      element: <CenteredTabs/>,
      children: [
        {
          path: '*',
          element: <AppRoutes/>
        }
      ]
    }
  ]
  const element = useRoutes(routes)

  return (
    <>
      {element}
    </>
  )

  // return <>{element}</>

  // return (
  //   <Router>
  //     <Initializer/>
  //     <CenteredTabs/>
  //     <Routes>
  //       <Route path={'/'} element={<Navigate to={'/watchlist'}/>}/>
  //       <Route path={'/'} element={<LandingPage/>}/>
  //       <Route exact path={'/watch_list'} element={<WatchList/>}/>
  //       <Route exact path={'/search_products'} element={<ProductSearch/>}/>
  //       <Route exact path={'/settings'} element={<Settings/>}/>
  //
  //     </Routes>
  //   </Router>
  //
  // );
}

export default App;
