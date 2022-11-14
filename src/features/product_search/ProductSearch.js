import {useState} from "react";
import {SearchBar} from "./SearchBar";
import Container from '@mui/material/Container'
import {CardHolder} from "./CardHolder";


export const ProductSearch = () => {
  /*
    Primary component for the "Search products" tab.
   */
  // Pagination flags
  const pageSize = 50 // Results per page. 50 is max server will take.
  const [page, setPage] = useState(null)
  const [totalPages, setTotalPages] = useState(null)
  const [noResults, setNoResults] = useState(false) // SearchBar search term yielded no results
  // results are passed to SearchBar for initial query.
  // Expects an array of objects under the 'data' key from Kroger API:
  // https://developer.kroger.com/reference/#operation/productGet
  const [results, setResults] = useState([])

  return (
    <Container sx={{paddingY: '20px'}}>
      <SearchBar setTotalPages={setTotalPages}
                 setResults={setResults}
                 setNoResults={setNoResults}
                 pageSize={pageSize}
      />
      {noResults &&
        <h1>No matching search results</h1>
      }
      <CardHolder results={results}
      />
    </Container>
  )
}
