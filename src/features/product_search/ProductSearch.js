import {useState} from "react";
import {SearchBar} from "./SearchBar";
import Container from '@mui/material/Container'
import {CardHolder} from "./CardHolder";
import {Pagination} from "@mui/material";
import {Dialog} from '../../components/Dialog'
import fetchWrapper from "../../utils/fetchWrapper";


export const ProductSearch = () => {
  /*
    Primary component for the "Search products" tab.
   */
  // Pagination flags
  const pageSize = 50 // Results per page. 50 is max server will take.
  const [totalPages, setTotalPages] = useState(null)
  const [noResults, setNoResults] = useState(false) // SearchBar search term yielded no results
  const [searchTerm, setSearchTerm] = useState(false) // Pull state from search bar for pagination calls
  // results are passed to SearchBar for initial query.
  // Expects an array of objects under the 'data' key from Kroger API:
  // https://developer.kroger.com/reference/#operation/productGet
  const [results, setResults] = useState([])
  const [showErrorModal, setShowErrorModal] = useState(false)
  const [modalMsg, setModalMsg] = useState('')

  const pageSwitch = (event, pageNum) => {
    // Hits product_search endpoint with updated pagination details
    const onSuccess = (json) => {
      console.log('Successful search_products page')
      setResults(json.data)
      if(results.length === 0) {
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

  return (
    <Container sx={{paddingY: '20px'}}>
      {showErrorModal &&
        <Dialog msg={modalMsg}
                onClose={()=>{setShowErrorModal(false)}}
        />
      }
      <SearchBar setTotalPages={setTotalPages}
                 setResults={setResults}
                 setNoResults={setNoResults}
                 pageSize={pageSize}
                 raiseSearchTerm={setSearchTerm}
      />
      {noResults &&
        <h1>No matching search results</h1>
      }
      <CardHolder results={results} />
      {totalPages !== null &&
        <div className={'flex-container flex-justify-center'}>
          <Pagination count={totalPages}
                      onChange={pageSwitch}
          />
        </div>
      }
    </Container>
  )
}
