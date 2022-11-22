import {useState} from "react";
import {Dialog} from '../../components/Dialog'
import useDataStore from "../../components/DataStore";
import {useNavigate} from 'react-router'
import fetchWrapper from "../../utils/fetchWrapper";
import {InputComponent} from "./InputComponent";
import {Button} from "@mui/material";

export const EmailEntry = () => {

  const [modalMsg, setModalMsg] = useState('')
  const [showModal, setShowModal] = useState(false)
  const [email, setEmail] = useState('')
  const initialIngest = useDataStore((state) => state.initialIngest)
  const navigate = useNavigate()

  const submitEmail = (email) => {
    if(email.length === 0) return
    const onSuccess = (json) => {
      // assume we have been returned everything here as well, removing
      // need for Initializer?
      initialIngest(json)
      navigate('/app/watch_list')
    }
    const onFailure = (response, json) => {
      setModalMsg(`Failure submitting email: ${response.status}, ${json.error}`)
      setShowModal(true)
    }
    const onError = (error) => {
      setModalMsg(`Error submitting email: ${error}`)
      setShowModal(true)
    }
    const qParams = new URLSearchParams({
      email: email
    })
    let details = {
      onSuccess: onSuccess,
      onFailure: onFailure,
      onError: onError,
      endPoint: 'start_session?' + qParams,
      method: 'get'
    }
    fetchWrapper(details)
  }

  return (
    <div>
      {showModal &&
        <Dialog msg={modalMsg} onClose={()=>{setShowModal(false)}}/>
      }

      <div className={'landingPageInputDiv'}>
          <InputComponent email={email} setEmail={setEmail}/>
      </div>
      <div>
        <span className={'landingContext'}>
          Maintain access to your watch list by providing a contact email. <br/>
          Price alerts are sent out Thursdays at 12pm Pacific. This can be turned off in settings.<br/>
          Receive text alerts using your mobile carrier's email-to-sms gateway e.g. &lt;your_number&gt;@vtext.com for
          verizon customers.
        </span>
      </div>
      <div className={'flex-container flex-justify-center landingButton'}>
        <div>
          <Button variant={'outlined'}
                  onClick={()=>{submitEmail(email)}}
          >Submit</Button>
        </div>
      </div>
    </div>
  )
}
