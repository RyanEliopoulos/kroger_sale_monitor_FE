import {useState, useEffect} from "react";
import useDataStore from "../../components/DataStore";
import fetchWrapper from "../../utils/fetchWrapper";
import {Dialog} from "../../components/Dialog"


export const ContactDetails = () => {
  /*
    Responsible for displaying and updating the contact email address
   */
  let email = useDataStore((state) => state.email)
  let [updatedEmail, setUpdatedEmail] = useState('')
  let [showErrorMdl, setShowErrorMdl] = useState(false)
  let [modalMsg, setModalMsg] = useState('')

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
      setUpdatedEmail(email)
      setShowErrorMdl(true)
      setModalMsg(`${response.status}: ${data.error}`)
    }
    const onError = (error) => {
      console.error('Error updating email')
      console.error(error)
      setUpdatedEmail(email)
      setShowErrorMdl(true)
      setModalMsg(`${error}`)
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

  useEffect(()=> {
    // Data store's email value is not up-to-date at render time so
    // we have this.
    setUpdatedEmail(email)
  }, [email])

  return (
    <div>
      {showErrorMdl &&
      <Dialog msg={modalMsg}
              onClose={() => {
                setShowErrorMdl(false)
              }}
      />
      }
      <label htmlFor={'email-input'}>Contact Email</label>
      <input name={'email-input'} type={'text'} value={updatedEmail}
             onChange={(e)=>{setUpdatedEmail(e.target.value)}}
      />
      <button type={'button'} onClick={updateEmail}>Update</button>
      <h1> </h1>
    </div>
  )
}
