import useDataStore from "../../components/DataStore";
import {useEffect, useState} from "react";

export const Settings = () => {

  // Setting Values
   const email = useDataStore((state) => state.email)
   let chain = useDataStore((state) => state.chain)
   let address1 = useDataStore((state) => state.address1)
   let city = useDataStore((state) => state.city)
   let state = useDataStore((state) => state.state)
   let zipcode = useDataStore((state) => state.zipcode)
   let products = useDataStore((state) => state.products)

  const [emailInputVal, setEmailInputVal] = useState(email)

  const updateEmail = () => {
    // Hits the set_email endpoint
    console.log('in updateEmail')
  }

   return (
     <div>
       <label htmlFor={'email-input'}>Contact Email</label>
       <input name={'email-input'} type={'text'} value={emailInputVal}
              onChange={(e)=>{setEmailInputVal(e.target.value)}}
       />
       <button type={'button'} onClick={updateEmail}>Update</button>

        <h1>{email}</h1>
     </div>
   )

}
