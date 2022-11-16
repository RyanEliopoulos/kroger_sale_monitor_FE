import {ContactDetails} from "./ContactDetails";
import {StoreDetails} from "./StoreDetails";
import Container from '@mui/material/Container'
import {CenteredTabs} from "../../components/Tabs";

export const Settings = () => {

  return (
      <div>
        <Container sx={{paddingY: '20px'}}>
          <ContactDetails/>
          <StoreDetails/>
        </Container>
      </div>
  )
}
