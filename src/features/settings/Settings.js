import useDataStore from "../../components/DataStore";
import {useEffect, useState} from "react";
import {ContactDetails} from "./ContactDetails";
import {StoreDetails} from "./StoreDetails";
import Container from '@mui/material/Container'

export const Settings = () => {

  // for ContactDetails. Placed out here to force a re-render when
  // it is received from the server
  let email = useDataStore((state) => state.email)
  // StoreDetails
  // let chain = useDataStore((state) => state.chain)
  // let address1 = useDataStore((state) => state.address1)
  // let city = useDataStore((state) => state.city)
  // let state = useDataStore((state) => state.state)
  // let zipcode = useDataStore((state) => state.zipcode)
  // let products = useDataStore((state) => state.products)

   return (
     <div>
       <Container sx={{paddingY: '20px'}}>
         {/*<ContactDetails email={email}/>*/}
         <ContactDetails/>
         <StoreDetails/>
       </Container>
     </div>
   )
}
