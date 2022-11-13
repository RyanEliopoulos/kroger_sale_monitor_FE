import useDataStore from "../../components/DataStore";
import {useState} from "react";
import {StoreSearchModal} from "./StoreSearchModal";

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
    <div className={'flex-container'}>
      <div>
        <span>Store:</span>
      </div>
      <div>
        {chain} <br/>
        {address1} <br/>
        {city}, {state} {zipcode}
      </div>
      <button type={'button'}
              onClick={(e)=>{setIsOpen(!isOpen)}}>
        Update Store
      </button>
      {isOpen &&
      <StoreSearchModal isOpen={isOpen} setIsOpen={setIsOpen}/>
      }
      {/*<StoreSearchModal isOpen={isOpen} setIsOpen={setIsOpen}/>*/}
    </div>
  )
}
