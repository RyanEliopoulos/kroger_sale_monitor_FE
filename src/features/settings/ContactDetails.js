import {useState, useEffect} from "react";
import useDataStore from "../../components/DataStore";
import fetchWrapper from "../../utils/fetchWrapper";
import {Dialog} from "../../components/Dialog"
import {AlertToggle} from "./AlertToggle";
import {Button} from "@mui/material";


export const ContactDetails = () => {
  /*
    Responsible for displaying and updating the contact email address
   */
  let email = useDataStore((state) => state.email)
  let [updatedEmail, setUpdatedEmail] = useState('')
  let [showErrorMdl, setShowErrorMdl] = useState(false)
  let [modalMsg, setModalMsg] = useState('')
  let [emailAltered, setEmailAltered] = useState(false)

  const handleEmailInput = (updatedTextString) => {
    setUpdatedEmail(updatedTextString)

  }

  const updateEmail = () => {
    console.log('in updateEmail')
    // Fetch callbacks for set_email endpoint
    const onSuccess = () => {
      // Successfully updated email. Open modal.
      console.log('Successfully updated email')
      useDataStore.setState({email: updatedEmail})
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
      payload: {email: updatedEmail},
      method: 'post'
    }
    fetchWrapper(details)
  }

  useEffect(() => {
    // Data store's email value is not up-to-date at render time so
    // we have this.
    setUpdatedEmail(email)
  }, [email])


  useEffect(() => {
    // Toggles the 'disabled' prop for the update button
    if (updatedEmail === email) {
      // Email remains the same as on the server.
      console.log('Email same as on server. Not updating altered state')
      setEmailAltered(false)
    } else {
      console.log('Email does not match value on server. Setting altered state')
      setEmailAltered(true)
    }
  }, [updatedEmail, email, setEmailAltered])

  return (
    <div className={'settingsContainer'}>
      {showErrorMdl &&
      <Dialog msg={modalMsg}
              onClose={() => {
                setShowErrorMdl(false)
              }}
      />
      }
      <div className={'flex-container flex-justify-center'}>
        <div>
          <h3>Contact Details </h3>
        </div>
      </div>
      <div className={'settingsInputsContainer'}>
        <div className={'settingsEmailContainer'}>
          <div>
            <label className={'settingsEmailLabel'}
                   htmlFor={'email-input'}>Email</label>
            <input name={'email-input'} type={'text'} value={updatedEmail}
                   onChange={(e) => {
                     handleEmailInput(e.target.value)
                   }}
            />
            <div className={'settingsEmailBtnDiv div-inline'}>
              <Button variant={'outlined'}
                      size={'small'}
                      onClick={updateEmail}
                      disabled={!emailAltered}
              >Update</Button>
            </div>
          </div>
        </div>
        <div className={'settingsAlertContainer'}>
          <AlertToggle/>
        </div>
      </div>
    </div>
  )
}
