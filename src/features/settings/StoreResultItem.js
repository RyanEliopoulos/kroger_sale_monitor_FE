import {Button} from "@mui/material";
import fetchWrapper from "../../utils/fetchWrapper";
import {useState} from "react";
import {Dialog} from "../../components/Dialog";
import useDataStore from "../../components/DataStore";


export const StoreResultItem = ({storeObject, setSearchModal}) => {
  /*
    Relevant properties

    storeObject = {
      chain: <>,
      name: <>,
      address: {
                 addressLine1: <>,
                 city: <>,
                 state: <>,
                 zipCode: <>
                }
    }
   */

  let updateSelectedStore = useDataStore((state) => state.updateSelectedStore)
  const [apiError, setApiError] = useState(false)
  const [errorMsg, setErrorMsg] = useState('')

  const setStore = () => {
    // Update the server with the new store values. Update data store upon success
    const onSuccess = () => {
      // Server accepted changes. Now update local store
      console.log('Successfully updated store values')
      updateSelectedStore(storeObject)
      setSearchModal(false)
    }
    const onFailure = (response, data) => {
      console.log('API error updating store')
      setErrorMsg(`${response.status}, ${data.error}`)
      setApiError(true)
    }
    const onError = (error) => {
      console.error(error)
      setErrorMsg(`${error}`)
      setApiError(true)
    }
    let details = {
      onSuccess: onSuccess,
      onFailure: onFailure,
      onError: onError,
      endPoint: 'set_store',
      payload: {
        location_id: storeObject.locationId,
        chain: storeObject.chain,
        address1: storeObject.address.addressLine1,
        city: storeObject.address.city,
        state: storeObject.address.state,
        zipcode: storeObject.address.zipCode,
      },
      method: 'post'
    }
    fetchWrapper(details)
  }

  const onErrorModalClose = () => {
    setSearchModal(false)
  }
  return (
    <div>
      {apiError && <Dialog msg={errorMsg} onClose={onErrorModalClose}/>}
      <div className={'store-search-item-container'}>
        <div className={'store-address-container'}>
          <span style={{color: 'violet'}}><b>{storeObject.chain}</b></span> <br/>
          <span>{storeObject.address.addressLine1}</span> <br/>
          <span>{storeObject.address.city}, {storeObject.address.state} {storeObject.address.zipCode}</span>
        </div>
        <div className={'store-select-button-container'}>
          <Button variant={'outlined'} onClick={setStore}>SELECT</Button>
        </div>
      </div>
    </div>
  )
}
