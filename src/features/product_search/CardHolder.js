import Card from '@mui/material/Card'
import CardActions from '@mui/material/CardActions';
import {CardActionArea} from "@mui/material";
import CardContent from '@mui/material/CardContent';
import CardMedia from '@mui/material/CardMedia';
import Button from '@mui/material/Button';
import Typography from '@mui/material/Typography';
import {useState, useRef, useEffect} from 'react'
import {ProductCard} from "./ProductCard";


export const CardHolder = ({results}) => {
  /*
    Results should be an array of

    {
    "productId": "0001111041700",
    "aisleLocations": [],
    "brand": "Kroger",
    "categories": [],
    "countryOrigin": "United States",
    "description": "Kroger 2% Reduced Fat Milk",
    "items": [],
    "itemInformation": {},
    "temperature": {},
    "images": [],
    "upc": "0001111041700"
    }
   */
  const [showProdModal, setShowProdModal] = useState(false)
  // const [modalProductData, setModalProductData] = useState(null)
  let modalProductData = useRef(null)

  const displayParams = (productData) => {
    modalProductData = productData
    setShowProdModal(true)
  }

  return (

    <div className={'card-holder-all'}>
      {results.map(productData => {
        let mediumUrl = ''
        productData.images.forEach(imgObj => {
          if(imgObj.perspective !== 'front') {
            console.log(`non-front perspectgive: ${imgObj.perspective}`)
          }
          else {
            console.log(`Found the front perspective`)
            imgObj.sizes.forEach(sizeObj => {
              if(sizeObj.size === 'medium') {
                console.log(`Found the medium: ${sizeObj.url}`)
                mediumUrl = sizeObj.url
              }
              else {
                console.log(`Found a non-medium size: ${sizeObj.size}`)
              }
            })
          }
        })
        let regularPrice = productData.items[0].price.regular
        let promo = productData.items[0].price.promo
        if(parseInt(promo) === 0) promo = regularPrice
        return (
          <ProductCard productData={productData}
                       regPrice={regularPrice}
                       promoPrice={promo}
                       mediumUrl={mediumUrl}
          />
          )
      })}
    </div>
  )
}
