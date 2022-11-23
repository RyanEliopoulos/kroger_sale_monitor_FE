import Card from '@mui/material/Card'
import {CardActionArea} from "@mui/material";
import AttachMoneyIcon from '@mui/icons-material/AttachMoney';
import CardMedia from "@mui/material/CardMedia";
import CardContent from "@mui/material/CardContent";
import Typography from "@mui/material/Typography";
import {useState} from "react";
import {WatchProductModal} from "./WatchProductModal";

export const WatchProductCard = ({product}) => {
  /*
     {
       'product_upc': <>,
       'product_description: <>,
       'normal_price': <>,
       'promo_price': <>,
       'target_price': <>,
       'image_url': <>,
       'watched_product_id': <>,
       'date_last_checked': <>    -- string in mm/dd format
      }
   */

  const [showProductModal, setShowProductModal] = useState(false)
  const targetMet = parseFloat(product.promo_price) <= parseFloat(product.target_price)

  return (
    <div className={'card-div'}>
      <Card sx={{height: '100%'}}
      >
        {showProductModal &&
          <WatchProductModal product={product}
                             setShowProductModal={setShowProductModal}
          />
        }
        <CardActionArea sx={{height: '100%'}}
                        onClick={()=>{setShowProductModal(true)}}
        >
          <div style={{display: 'flex', flexDirection: 'column', height: '100%'}}>
            <div style={{display: 'flex', flexDirection: 'row', justifyContent: 'space-between'}}>
              <span style={{marginLeft: '5px'}}>{product.date_last_checked}</span>
              {targetMet &&
              <AttachMoneyIcon style={{color: 'green', alignSelf: 'flex-end'}}/>
              }
            </div>
          <CardMedia component={'img'}
                     image={product.image_url}
                     height={'100'}
                     sx={{objectFit: 'contain'}}
          />
          <CardContent sx={{objectFit: 'contain'}}>
            <Typography gutterBottom variant={'body1'} component={'div'}>
              {product.product_description}
            </Typography>
          </CardContent>
            <div className={'pricing-div'}>
              <div style={{display: 'flex', justifyContent: 'space-between'}}>
                <div >
                <span>
                  { product.promo_price !== product.normal_price &&
                    <span> Promo: ${product.promo_price} <br/></span>
                  }
                  Normal: ${product.normal_price} <br/>
                </span>
              </div>
                <div style={{display: 'flex', justifyContent: 'flex-end', flexDirection: 'column'}}>
                  <div>
                <span>
                Target: ${product.target_price}
                </span>
                  </div>
              </div>
            </div>
            </div>
          </div>
        </CardActionArea>
      </Card>
    </div>
  )
}
