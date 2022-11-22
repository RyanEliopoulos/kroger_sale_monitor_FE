import useDataStore from "../../components/DataStore";
import {useState} from "react";
import {StoreSearchModal} from "./StoreSearchModal";
import {Button} from "@mui/material";

export const StoreDetails = () => {
  /*
    Responsible for displaying and updating the location.
    This includes
   */

  let chain = useDataStore((state) => state.chain)
  let address1 = useDataStore((state) => state.address1)
  let city = useDataStore((state) => state.city)
  let state = useDataStore((state) => state.state)
  let zipcode = useDataStore((state) => state.zipcode)

  // Store Drawer state
  const [isOpen, setIsOpen] = useState(false)

  return (
    <div className={'settingsContainer'}>
      {isOpen &&
      <StoreSearchModal isOpen={isOpen} setIsOpen={setIsOpen}/>
      }
      <div className={'flex-container flex-justify-center'}>
        <h3>Store Details</h3>
      </div>
      <div className={'storeDetailsInputDiv'}>
        {chain !== '' &&
        <div>
          {chain} <br/>
          {address1} <br/>
          {city}, {state} {zipcode}
        </div>
        }
        <div className={'storeUpdateBtn'}>
          <Button variant={'outlined'}
                  onClick={(e) => {
                    setIsOpen(!isOpen)
                  }}
          >Select Store</Button>
        </div>
      </div>
    </div>
  )
}
