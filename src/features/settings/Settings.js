import {ContactDetails} from "./ContactDetails";
import {StoreDetails} from "./StoreDetails";
import Container from '@mui/material/Container'
import {CenteredTabs} from "../../components/Tabs";

export const Settings = () => {

  return (
        <Container sx={{paddingY: '20px', width: '50vw'}}>
          <ContactDetails/>
          <StoreDetails/>
        </Container>
  )
}
