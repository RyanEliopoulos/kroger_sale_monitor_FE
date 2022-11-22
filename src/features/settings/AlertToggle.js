import Switch from '@mui/material/Switch'
import FormControlLabel from '@mui/material/FormControlLabel'
import FormGroup from '@mui/material/FormGroup'
import {useState} from "react";
import useDataStore from "../../components/DataStore";


export const AlertToggle = () => {
  /*

    Responsible for display and updating the price alert flag.
   */

  // let alertStatus = useDataStore((state) => state.alertStatus)

  const [alertStatus, setAlertStatus] = useState(true)
  const updateAlertStatus = () => {
    setAlertStatus(!alertStatus)
    console.log(alertStatus)
  }

  return (
    <FormGroup>
      <FormControlLabel control={<Switch/>} label={'Price Alerts'}/>
    </FormGroup>
  )
}
