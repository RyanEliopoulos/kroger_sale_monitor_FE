import {Container} from "@mui/material";
import {Button} from "@mui/material";
import {useState} from "react";
import {Dialog} from '../../components/Dialog'
import useDataStore from "../../components/DataStore";
import fetchWrapper from "../../utils/fetchWrapper";


export const ProductModal = ({productData, regPrice, promoPrice,
                               isWatched, setShowProductModal, mediumUrl}) => {
  /*
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
  const [showErrorModal, setShowErrorModal] = useState(false)
  const [errorModalMsg, setErrorModalMsg] = useState('')
  const addProduct = useDataStore((state) => state.addProduct)
  // variables for the input element
  let validTargetChars = ['.']
  for (let i = 0; i < 10; i++) {
    validTargetChars.push(i.toString())
  }
  const [targetPrice, setTargetPrice] = useState('')
  const targetChange = (event) => {
    console.log('In targetChange')
    if(event.target.value.length < targetPrice.length) {
      // Deletion occurred. That is always fine.
      setTargetPrice(event.target.value)
      return
    }
    let lastChar = event.target.value.charAt(event.target.value.length - 1)
    if(!validTargetChars.includes(lastChar)) {
      console.log('Invalid char. Ignoring')
      return
    }
    if(lastChar === '.' && targetPrice.includes('.')) {
      console.log('targetPrice already has a period. Ignoring')
      return
    }
    console.log('valid char. Updating targetPrice')
    setTargetPrice(event.target.value)
  }
  // ProductModal buttons
  const selectCancel = () => {
    console.log('canceling!')
    setShowProductModal(false)
  }
  const selectWatch = (regularPrice, promoPrice) => () => {
    // Submitting product to the server. Updating data store upon success
    if(isWatched) return // Don't want to resubmit
    if(targetPrice === '' || targetPrice === '.') {
      // Invalid input. Toggling text to red
      let label = document.getElementById('targetInputLabel')
      label.style.color = 'red';
      return
    }
    console.log('selecting!')
    setShowProductModal(false)
    const onSuccess = (json) => {
      console.log('Successfully submitted new watch items. Updated data store')
      console.log(json)
      addProduct(json)
    }
    const onFailure = (response, json) => {
      setErrorModalMsg(`${response.status}, ${json.error}`)
      setShowErrorModal(true)
    }
    const onError = (error) => {
      setErrorModalMsg(`${error}`)
      setShowErrorModal(true)
    }
    let details = {
      onSuccess: onSuccess,
      onFailure: onFailure,
      onError: onError,
      endPoint: 'new_watched',
      payload: {
        product_upc: productData.upc,
        product_description: productData.description,
        normal_price: regularPrice,
        promo_price: promoPrice,
        target_price: targetPrice,
        image_url: mediumUrl
      },
      method: 'post'
    }
    fetchWrapper(details)
  }

  return (
    <div className={'productModal'}>
      <div className={'productModalContent'}>
        {showErrorModal &&
          <Dialog msg={errorModalMsg}
                  onClose={()=>{setShowProductModal(false); setShowErrorModal(false)}}
        />
        }
        <Container>
          <div className={'productModalImgDiv'}>
            <img src={mediumUrl}
                 alt={`${productData.description}`}
                 height={100}
                 style={{objectFit: 'contain'}}
            />
          </div>
          <div className={'flex-container flex-justify-center'}>
            <p>{productData.description}</p>
          </div>
          {isWatched &&
            <h1> This product is already on the watch list</h1>
          }
          {!isWatched &&
          <div>
            {promoPrice !== regPrice &&
            <div className={'productModalPriceDiv'}>
              <p>Promo: {`$${promoPrice}`}</p>
            </div>
            }
            <div className={'productModalPriceDiv'}>
              <p>Normal: {`$${regPrice}`}</p>
            </div>
            <div className={'productModalPriceDiv'}>
              <label htmlFor={'targetPriceInput'}
                     id={'targetInputLabel'}
              >Target: $</label>
              <input name={'targetPriceInput'}
                     value={targetPrice}
                     onChange={targetChange}
                     size={8}
              />
            </div>
          </div>
          }
          <div className={'productModalBtnDiv'}>
            <Button variant={'outlined'}
                    onClick={selectCancel}
                    sx={{marginRight: '10px', marginLeft: '10px'}}
            > Cancel </Button>
            <Button variant={'outlined'}
                    onClick={selectWatch(regPrice, promoPrice)}
                    sx={{marginRight: '10px', marginLeft: '10px'}}
            > Watch </Button>
          </div>
        </Container>
      </div>
    </div>
  )
}

