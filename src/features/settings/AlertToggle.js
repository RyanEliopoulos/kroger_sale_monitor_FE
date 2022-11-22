import Switch from '@mui/material/Switch'
import FormControlLabel from '@mui/material/FormControlLabel'
import FormGroup from '@mui/material/FormGroup'
import {useState} from "react";
import useDataStore from "../../components/DataStore";
import fetchWrapper from "../../utils/fetchWrapper";
import {Dialog} from '../../components/Dialog'


export const AlertToggle = () => {
  /*
    Responsible for display and updating the price alert flag.
   */

  let receiveAlerts = useDataStore((state) => state.receiveAlerts)
  let toggleAlertStatus = useDataStore((state) => state.toggleAlertStatus)

  console.log(`In alert toggle. Value of receiveAlerts: `)
  console.log(receiveAlerts)
  const [showModal, setShowModal] = useState(false)
  const [modalMsg, setModalMsg] = useState('')

  const updateAlertStatus = () => {
    // Seems Current function concludes execution before
    // effects of toggleAlertStatus are disseminated.
    // receive_alerts is inverted for the payload for this reason.
    toggleAlertStatus()
    const onSuccess = () => {
      // Already updated local datastore. No action required
    }
    const onFailure = (response, json) => {
      // Need to un-flip switch and trigger error modal
      setModalMsg(`${response.status}: ${json.error}`)
      setShowModal(true)
      toggleAlertStatus()
    }
    const onError = (error) => {
      // Need to un-flip switch and trigger error modal
      setModalMsg(`${error}`)
      setShowModal(true)
      toggleAlertStatus()
    }
    let details = {
      onSuccess: onSuccess,
      onFailure: onFailure,
      onError: onError,
      endPoint: 'set_alerts',
      payload: {receive_alerts: !receiveAlerts},
      method: 'post'
    }
    fetchWrapper(details)
  }

  return (
    <>
      {showModal &&
        <Dialog msg={modalMsg}
                onClose={()=>{setShowModal(false)}}/>
      }
    <FormGroup>
      <FormControlLabel control={<Switch checked={receiveAlerts}
                                         onChange={updateAlertStatus}
                                 />}
                        label={'Receive Alerts'}/>
    </FormGroup>
    </>
  )
}
