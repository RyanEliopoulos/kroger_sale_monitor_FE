import useDataStore from "../../components/DataStore";
import {Container} from "@mui/material";
import {WatchProductCard} from "./WatchProductCard";



export const WatchList = () => {

  let watchedProducts = useDataStore((state) => state.products)


  return (
    <Container sx={{paddingY: '20px'}}>
      {watchedProducts.length === 0 &&
        <h1>No products have been selected.</h1>
      }
      <div className={'card-holder-all'}>
        {watchedProducts.map(product => {
          return (
            <WatchProductCard key={product.product_upc}
                              product={product}
            />
          )
        })}
      </div>
    </Container>
  )
}
