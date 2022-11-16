import {Route, Routes} from 'react-router-dom'
import {ProductSearch} from "../product_search/ProductSearch";
import {WatchList} from "../watchlist/WatchList";
import {Settings} from '../settings/Settings'


export const AppRoutes = () => {

  return (
    <Routes>
      <Route path={'watch_list'} element={<WatchList/>}/>
      <Route path={'search_products'} element={<ProductSearch/>}/>
      <Route path={'settings'} element={<Settings/>}/>
    </Routes>
  )
}
