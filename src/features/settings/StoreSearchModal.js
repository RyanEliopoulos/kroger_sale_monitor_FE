import {Container} from "@mui/material";
import {useState, useEffect} from "react";
import useDataStore from "../../components/DataStore";
import fetchWrapper from "../../utils/fetchWrapper";
import {StoreResultItem} from "./StoreResultItem";
import CloseIcon from '@mui/icons-material/Close'


export const StoreSearchModal = ({setIsOpen}) => {

  const [zipcode, setZipcode] = useState('')
  const [componentStoreResults, setComponentStoreResults] = useState([])
  const setStoreSearchZipcode = useDataStore((state) => state.setStoreSearchZipcode)
  const setStoreSearchResults = useDataStore((state) => state.setStoreSearchResults)

  const updateZipcode = (event) => {
    // Enforces integer characters in the text field.
    // Empty string is also allowed
    if(event.target.value === '') {
      setZipcode(event.target.value)
      return
    }
    if(event.target.value.length > 5) {
      return
    }
    let numberChars = ['0', '1', '2', '3', '4', '5', '6', '7', '8', '9']
    let targetString = event.target.value
    if(numberChars.includes(targetString[targetString.length-1])) {
      // Valid number
      console.log('Valid character. Updating the useSTate')
      setZipcode(event.target.value)
    }
    else {
      console.log('Invalid character. Doing nothing.')
    }
  }

  const searchStores = () => {
    console.log('in searchStores')
    const onSuccess = (data) => {
      console.log('successfully searched stores. Updating data store')
      let array = data.data
      console.log(array)
      setComponentStoreResults(array)
      setStoreSearchZipcode(zipcode)
      setStoreSearchResults(array)
    }
    const onFailure = (response, data) => {
      console.log('Failure in hitting searchStores')
      console.log(response, data.error)
    }
    const onError = (error) => {
      console.error(error)
    }
    let details = {
      onSuccess: onSuccess,
      onFailure: onFailure,
      onError: onError,
      endPoint: 'search_stores',
      payload: {'zipcode': zipcode},
      method: 'post'
    }
    fetchWrapper(details)
  }

  const inputKeyDown = (event) => {
    // Keydown event callback placed on zipcode-input
    if(event.key === 'Enter') {
      if(zipcode.length < 5) {
        console.log('Zipcode is not long enough.')
      }
      else {
        searchStores()
      }
    }
  }

  const storeSearchZipcode = useDataStore((state) => state.storeSearchZipcode)
  useEffect(()=>{
    setZipcode(storeSearchZipcode)
  }, [storeSearchZipcode])

  const storeSearchResults = useDataStore((state) => state.storeSearchResults)
  useEffect(()=>{
    setComponentStoreResults(storeSearchResults)
  }, [storeSearchResults])

  return (
    <div id={'store-search-modal'} className={'store-search-modal'}>
      <div className={'store-search-modal-content'}>
        <Container sx={{paddingY: '15px', maxHeight: '100%', height: '100%', width: '100%'}}>
          <div className={'store-close-btn-container'}>
            <CloseIcon onClick={()=>{setIsOpen(false)}}/>
          </div>
          <div className={'store-input-container'}>
            <input id={'zipcode-input'}
                   type={'text'}
                   placeholder={'zipcode'}
                   value={zipcode}
                   onChange={updateZipcode}
                   onKeyDown={inputKeyDown}
            />
          </div>
          <div className={'store-results-container'}>
            {componentStoreResults.map(storeObject => {
              return (
                <StoreResultItem storeObject={storeObject} key={storeObject.locationId} setSearchModal={setIsOpen}/>
              )
            })}
          </div>
        </Container>
      </div>
    </div>
  )
}
