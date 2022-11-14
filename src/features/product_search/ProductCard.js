import Card from "@mui/material/Card";
import {CardActionArea} from "@mui/material";
import CardMedia from "@mui/material/CardMedia";
import CardContent from "@mui/material/CardContent";
import Typography from "@mui/material/Typography";
import useDataStore from "../../components/DataStore";
import {useEffect, useRef, useState} from "react";
import {ProductModal} from "./ProductModal";
import CheckIcon from '@mui/icons-material/Check';


export const ProductCard = ({productData, regPrice, promoPrice, mediumUrl}) => {

  const watchedProducts = useDataStore((store) => store.products)
  // const watchedProductIds = watchedProducts.map(product => product.product_upc)
  const watchedProductIds = watchedProducts.map(product => product.product_upc)
  const [isWatched, setIsWatched] = useState(false)
  const [showProdModal, setShowProdModal] = useState(false)

  useEffect(()=> {
    // sets isWatched if product is already watched
    // console.log('logging watchedProducts')
    // console.log(watchedProducts)
    // console.log(productData.upc)
    // console.log(watchedProductIds)
    if(watchedProductIds.includes(productData.upc)) {
      // console.log(`product ${productData.description} is already watched`)
      setIsWatched(true)
    }
    else {
      setIsWatched(false)
    }
  }, [setIsWatched, watchedProductIds, productData, watchedProducts])

  return (
    <div className={'card-div'}>

      <Card key={productData.productId}
            sx={{height: '100%'}}
      >
        {showProdModal &&
          <ProductModal productData={productData}
                        setShowProductModal={setShowProdModal}
                        regPrice={regPrice}
                        promoPrice={promoPrice}
                        isWatched={isWatched}
                        mediumUrl={mediumUrl}
          />
        }
        <CardActionArea sx={{height: '100%'}}
                        onClick={()=>{setShowProdModal(true)}}
        >
          <div style={{display: 'flex', flexDirection: 'column', height: '100%'}}>
            {isWatched &&
              <CheckIcon/>
            }
            <CardMedia
              component={'img'}
              image={mediumUrl}
              height={'100'}
              sx={{objectFit: 'contain'}}
            />
            <CardContent sx={{objectFit: 'contain'}}>
              <Typography gutterBottom variant={'body1'} component={'div'}>
                {productData.description}
              </Typography>
            </CardContent>
            <div className={'pricing-div'}>
              <div>
                <span>
                  { promoPrice !== regPrice &&
                  <span> Promo: ${promoPrice} <br/></span>
                  }
                Normal: ${regPrice}
                </span>
              </div>
            </div>
          </div>
        </CardActionArea>
      </Card>
    </div>
  )
}
