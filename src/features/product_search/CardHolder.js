import Card from '@mui/material/Card'
import CardActions from '@mui/material/CardActions';
import CardContent from '@mui/material/CardContent';
import CardMedia from '@mui/material/CardMedia';
import Button from '@mui/material/Button';
import Typography from '@mui/material/Typography';

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
  // Which img size should we use here?

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
        return (
          <div className={'card-div'}>
          <Card key={productData.productId}
                sx={{height: '100%'}}
          >
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
              <div style={{display: 'flex'}}>
                Here is an example thing.
              </div>
            </div>
          </Card>
          </div>
          )
      })}
    </div>
  )
}
