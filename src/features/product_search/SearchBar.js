import {useEffect, useState} from "react";
import fetchWrapper from "../../utils/fetchWrapper";
import {Dialog} from '../../components/Dialog'



export const SearchBar = ({setTotalPages, setResults, setNoResults, pageSize}) => {
  /*
    Submits the initial query to the API.
    Updates page count and initial search results.
    Pagination of results is handled elsewhere.
   */
  const [searchTerm, setSearchTerm] = useState('')
  const [showModal, setShowModal] = useState(false)
  const [modalMsg, setModalMsg] = useState('')

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
      if(json.data.length === 0) {
        console.log('Incoming search results are empty')
        setNoResults(true)
      }
      setTotalPages(json.pages)
      setResults(json.data)
      console.log('Successfully submitted search term')
      console.log(json)
    }
    const onFailure = (response, json) => {
      console.log('Failure submitting search term')
      console.log(`${response.status}, ${json.error}`)
      setModalMsg(`${response.status}, ${json.error}`)
      setShowModal(true)
    }
    const onError = (error) => {
      setModalMsg(`${error}`)
      setShowModal(true)
      console.error(`${error}`)
    }
    // Prepping fetch request
    let qParams = new URLSearchParams({
      initial_query: true,
      search_term: searchTerm,
      page_size: pageSize
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

  const inputKeyDown = (event) => {
    // Keydown callback to detect 'Enter' press
    // and submit search
    if(event.key === 'Enter') {
      if(searchTerm.length >= 3) {
        console.log('Search term sufficient long. Submitting to server')
        submitSearchTerm()
      }
      else {
        console.log('Search term is not long enough. Must be at least 3 chars')
      }
    }
  }

  return (
    <div className={'product-search-input-container'}>
      {showModal &&
      <Dialog msg={modalMsg} onClose={()=>{setShowModal(false)}}/>
      }
      <input type={'text'}
             placeholder={'Search Term'}
             value={searchTerm}
             onChange={(e)=>{setSearchTerm(e.target.value)}}
             onKeyDown={inputKeyDown}
             size={50}
      />
    </div>
  )
}
