import {useState, useEffect} from "react";
import useDataStore from "../../components/DataStore";
import fetchWrapper from "../../utils/fetchWrapper";


export const ContactDetails = () => {
  /*
    Responsible for displaying and updating the contact email address
   */
  // const email = useDataStore((state) => state.email)
  let email = useDataStore((state) => state.email)
  let updateEmailLocal = useDataStore((state) => state.updateEmailLocal)

  const updateEmail = () => {
    console.log('in updateEmail')
    console.log(email)
    // Fetch callbacks for set_email endpoint
    const onSuccess = () => {
      // Successfully updated email. Open modal.
      console.log('Successfully updated email')
      useDataStore.setState({email: email})
    }
    const onFailure = (response, data) => {
      // non-200 response from the server
      console.error('Failure to update email')
      console.error(response, data.error)
    }
    const onError = (error) => {
      console.error('Error updating email')
      console.error(error)
    }
    let details = {
      onSuccess: onSuccess,
      onFailure: onFailure,
      onError: onError,
      endPoint: 'set_email',
      payload: {email: email},
      method: 'post'
    }
    fetchWrapper(details)
  }

  return (
    <div>
      <label htmlFor={'email-input'}>Contact Email</label>
      <input name={'email-input'} type={'text'} value={email}
             onChange={(e)=>{updateEmailLocal(e.target.value)}}
      />
      <button type={'button'} onClick={updateEmail}>Update</button>
      <h1> </h1>
    </div>
  )
}
