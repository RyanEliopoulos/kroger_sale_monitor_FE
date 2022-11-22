import {useEffect, useState} from "react";
import fetchWrapper from "../../utils/fetchWrapper";
import {Dialog} from '../../components/Dialog'
import useDataStore from "../../components/DataStore";


export const SearchBar = ({setNoResults, pageSize}) => {
  /*
    Submits the initial query to the API.
    Updates page count and initial search results.
    Pagination of results is handled in parent.

    raiseSearchTerm: setSearchTerm of parent. Needed for paginating requests
   */
  const [showModal, setShowModal] = useState(false)
  const [modalMsg, setModalMsg] = useState('')
  const setTotalPages = useDataStore((state) => state.setTotalPages)
  const setSearchResults = useDataStore((state) => state.setSearchResults)
  const [searchTerm, setSearchTerm] = useState('')
  const dataStoreSearchTerm = useDataStore((state) => state.searchTerm)
  const setStoreSearchTerm = useDataStore((state) => state.setSearchTerm)

  const submitSearchTerm = () => {
    const onSuccess = (json) => {
      /*
        Received initial results from server + pagination details.
        Expecting:
          {
            pages: <>,
            data
          }
       */
      if (json.data.length === 0) {
        console.log('Incoming search results are empty')
        setNoResults(true)
      }
      else {
        setNoResults(false)
      }
      setSearchResults(json.data)
      setTotalPages(json.pages)
      setStoreSearchTerm(searchTerm)
    }
    const onFailure = (response, json) => {
      setModalMsg(`${response.status}, ${json.error}`)
      setShowModal(true)
    }
    const onError = (error) => {
      setModalMsg(`${error}`)
      setShowModal(true)
    }
    // Prepping fetch request
    let qParams = new URLSearchParams({
      initial_query: true,
      search_term: searchTerm,
      page_size: pageSize,
      page: 1
    })

    let details = {
      onSuccess: onSuccess,
      onFailure: onFailure,
      onError: onError,
      endPoint: 'search_products?' + qParams,
      method: 'get'
    }
    fetchWrapper(details)
  }

  useEffect(()=> {
    // Using the data store as the 'value' of the input component
    // caused immense lag. This is a roundabout way of doing so only when
    // the search term has been submitted.
    setSearchTerm(dataStoreSearchTerm)
  }, [dataStoreSearchTerm])

  const inputKeyDown = (event) => {
    // Keydown callback to detect 'Enter' press
    // and submit search
    if (event.key === 'Enter') {
      if (searchTerm.length >= 3) {
        console.log('Search term sufficient long. Submitting to server')
        submitSearchTerm()
      } else {
        setModalMsg('Search term must be at least 3 characters')
        setShowModal(true)
        console.log('Search term is not long enough. Must be at least 3 chars')
      }
    }
  }

  return (
    <div className={'product-search-input-container'}>
      {showModal &&
      <Dialog msg={modalMsg} onClose={() => {
        setShowModal(false)
      }}/>
      }
      {dataStoreSearchTerm === '' &&
      <input type={'text'}
             placeholder={'Search Term'}
             value={searchTerm}
             onChange={(e) => {
               setSearchTerm(e.target.value)
             }}
             onKeyDown={inputKeyDown}
             size={50}
      />
      }
      {dataStoreSearchTerm !== '' &&
      <input type={'text'}
             value={searchTerm}
             onChange={(e) => {
               setSearchTerm(e.target.value)
             }}
             onKeyDown={inputKeyDown}
             size={50}
      />
      }
    </div>
  )
}
