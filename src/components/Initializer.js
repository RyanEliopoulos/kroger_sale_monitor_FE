import fetchWrapper from "../utils/fetchWrapper";
import useDataStore from "./DataStore";

export const Initializer = () => {
  /*
    Performs initial outreach to the API for the data and updates the local store.
   */

  const initialIngest = useDataStore((state) => state.initialIngest)

  const onSuccess = (data) => {
    // Update the data store with the data from get_all
    console.log('Initalizer success. Updating data store')
    console.log(data)
    initialIngest(data)
  };
  const onFailure = (response, data) => {
    // Load error modal. Non 200 response code
    console.error(`Initializer failure: ${response}, ${data}`)
  }
  const onError = (error) => {
    // Load error. An error occurred.
    console.error(`Initializer error: ${error}`)
  }

  console.log('In Initializer. Retrieving data from the API')
  let fetchDetails = {
    onSuccess: onSuccess,
    onFailure: onFailure,
    onError: onError,
    endPoint: 'get_all',
    method: 'get'
  }
  fetchWrapper(fetchDetails)

};
