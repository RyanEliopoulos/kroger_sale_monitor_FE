import {useState} from "react";
import {SearchBar} from "./SearchBar";
import Container from '@mui/material/Container'
import {CardHolder} from "./CardHolder";
import {Pagination} from "@mui/material";
import {Dialog} from '../../components/Dialog'
import fetchWrapper from "../../utils/fetchWrapper";
import useDataStore from "../../components/DataStore";


export const ProductSearch = () => {
  /*
    Primary component for the "Search products" tab.
    Initial query is handled by SearchBar. Pagination is handled here.
   */

  // Pagination flags
  const pageSize = 50 // Results per page. 50 is max server will take.
  // const [totalPages, setTotalPages] = useState(null)
  const totalPages = useDataStore((state) => state.totalPages)
  const searchResults = useDataStore((state) => state.searchResults)
  const setSearchResults = useDataStore((state) => state.setSearchResults)
  const searchTerm = useDataStore((state) => state.searchTerm)

  const [noResults, setNoResults] = useState(false) // SearchBar search term yielded no results
  // results are passed to SearchBar for initial query.
  // Expects an array of objects under the 'data' key from Kroger API:
  // https://developer.kroger.com/reference/#operation/productGet
  const [showErrorModal, setShowErrorModal] = useState(false)
  const [modalMsg, setModalMsg] = useState('')
  let locationID = useDataStore((state) => state.locationID)

  const pageSwitch = (event, pageNum) => {
    // Hits product_search endpoint with updated pagination details
    const onSuccess = (json) => {
      console.log('Successful search_products page')
      setSearchResults(json.data)
      if (searchResults.length === 0) {
        console.error('Length of product_search in pageSwitch is 0')
        setNoResults(true)
      }
      console.log('Scrolling body to top')
      document.documentElement.scrollTop = 0;
    }
    const onFailure = (response, json) => {
      setModalMsg(`Error paginating: ${response.status}, ${json.error}`)
      setShowErrorModal(true)
    }
    const onError = (error) => {
      setModalMsg(`Error paginating: ${error}`)
      setShowErrorModal(true)
    }
    // Prepping fetch request
    let qParams = new URLSearchParams({
      search_term: searchTerm,
      initial_query: false,
      page_size: pageSize,
      page: pageNum
    })
    let details = {
      onSuccess: onSuccess,
      onFailure: onFailure,
      onError: onError,
      endPoint: 'search_products?' + qParams,
    }
    fetchWrapper(details)
  }

  console.log('here is the locationID')
  console.log(locationID)
  if (locationID === '') {
    return (
        <Container sx={{paddingY: '20px'}}>
          <h1>You must select a store before monitoring products.</h1>
        </Container>
    )
  }


  return (
      <Container sx={{paddingY: '20px'}}>
        {showErrorModal &&
        <Dialog msg={modalMsg}
                onClose={() => {
                  setShowErrorModal(false)
                }}
        />
        }
        <SearchBar setNoResults={setNoResults}
                   pageSize={pageSize}
        />
        {noResults &&
        <h1>No matching search results</h1>
        }
        <CardHolder results={searchResults}/>
        {totalPages !== 0 &&
        <div className={'flex-container flex-justify-center'}>
          <Pagination count={totalPages}
                      onChange={pageSwitch}
          />
        </div>
        }
      </Container>
  )
}
