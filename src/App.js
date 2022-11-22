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
import useDataStore from "./components/DataStore";

function App() {

  /*
    Handles user refreshes by defaulting application routes to the landing page.
   */
  const isRefreshed = useDataStore((state) => state.refreshed)
  let routes = [
      {
        path: '/',
        element: <LandingPage/>
      },
  ]
  if(!isRefreshed) {
    routes = [...routes,
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
  }
  else {
    routes = [...routes,
      {
        path: '/app',
        element: <LandingPage/>,
        children: [
          {
            path: '*',
            element: <LandingPage/>
          }
        ]
      }
    ]
  }

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
