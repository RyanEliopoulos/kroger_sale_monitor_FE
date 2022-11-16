import {Button, Container} from "@mui/material";
import {useState} from "react";
import useDataStore from "../../components/DataStore";
import fetchWrapper from "../../utils/fetchWrapper";
import {Dialog} from '../../components/Dialog'


export const WatchProductModal = ({product, setShowProductModal}) => {

  const [showErrorMdl, setShowErrorMdl] = useState(false)
  const [modalMsg, setModalMsg] = useState('')
  const updateTargetPrice = useDataStore((state) => state.updateTargetPrice)
  const removeProduct = useDataStore((state) => state.removeProduct)
  const watchedProducts = useDataStore((state) => state.products)
  // variables for the input element
  let validTargetChars = ['.']
  for (let i = 0; i < 10; i++) {
    validTargetChars.push(i.toString())
  }
  const [targetPrice, setTargetPrice] = useState(product.target_price.toString())
  // Guard fnx for updating targetPrice
  const targetChange = (event) => {
    if (event.target.value.length < targetPrice.length) {
      // Deletion occurred. That is always fine.
      setTargetPrice(event.target.value)
      return
    }
    let lastChar = event.target.value.charAt(event.target.value.length - 1)
    if (!validTargetChars.includes(lastChar)) {
      return
    }
    if (lastChar === '.' && targetPrice.includes('.')) {
      return
    }
    setTargetPrice(event.target.value)
  }
  // Button callbacks
  const selectCancel = () => {
    setShowProductModal(false)
  }

  const selectSave = () => {
    // Send the watched_product_id and the new target price
    if (targetPrice === '' || targetPrice === '.') {
      // Invalid input. Toggling text to red
      let label = document.getElementById('targetInputLabel')
      label.style.color = 'red';
      return
    }
    setShowProductModal(false)
    const onSuccess = (json) => {
      // Update data store with new targetPrice.
      // Use server-returned value as it will truncated excessive decimal places.
      console.log('Update success from server. Updating local store')
      updateTargetPrice(product.product_upc, json.target_price)
      console.log('Here is the updated watchedProducts array')
      console.log(watchedProducts)
    }
    const onFailure = (response, json) => {
      setModalMsg(`${response.state}, ${json.error}`)
      setShowErrorMdl(true)
    }
    const onError = (error) => {
      setModalMsg(`${error}`)
      setShowErrorMdl(true)
    }
    let details = {
      onSuccess: onSuccess,
      onFailure: onFailure,
      onError: onError,
      payload: {
        target_price: targetPrice,
        watched_product_id: product.watched_product_id
      },
      endPoint: 'update_watched',
      method: 'post'
    }
    fetchWrapper(details)
  }
  const selectDelete = () => {
    // Hit the delete endpoint. Update local store to remove
    // this product
    const onSuccess = (json) => {
      // Removing product from data store
      removeProduct(product.watched_product_id)
    }
    const onFailure = (response, json) => {
      setModalMsg(`${response.status}, ${json.error}`)
      setShowErrorMdl(true)
    }
    const onError = (error) => {
      setModalMsg(`${error}`)
      setShowErrorMdl(true)
    }
    let details = {
      onSuccess: onSuccess,
      onFailure: onFailure,
      onError: onError,
      endPoint: 'delete_watched',
      payload: {
        watched_product_id: product.watched_product_id
      },
      method: 'post'
    }
    fetchWrapper(details)
  }

  return (
    <div className={'productModal'}>
      <div className={'productModalContent'}>
        {showErrorMdl &&
        <Dialog msg={modalMsg}
                onClose={() => {
                  setShowErrorMdl(false)
                }}
        />
        }
        <Container>
          <div className={'productModalImgDiv'}>
            <img src={product.image_url}
                 alt={`${product.product_description}`}
                 height={100}
                 style={{objectFit: 'contain'}}
            />
          </div>
          <div className={'flex-container flex-justify-center'}>
            <p>{product.product_description}</p>
          </div>
          <div className={'watchModalPricesContainer'}>
            <div>
              {product.promo_price !== product.normal_price &&
              <div className={'productModalPriceDiv'}>
                <p>Promo: {`$${product.promo_price}`}</p>
              </div>
              }
              <div className={'productModalPriceDiv'}>
                <p>Normal: {`$${product.normal_price}`}</p>
              </div>
            </div>
            <div className={'flex-container flexColumnReverse flex-justify-center'}>
              <div className={'productModalPriceDiv'}>
                <label htmlFor={'targetPriceInput'}
                       id={'targetInputLabel'}
                >Target: $</label>
                <input name={'targetPriceInput'}
                       value={targetPrice}
                       onChange={targetChange}
                       size={8}
                       style={{marginTop: 'auto', marginBottom: 'auto'}}
                />
              </div>
            </div>
          </div>
          <div className={'watchModalBtnDiv'}>
            <div>
              <Button variant={'outlined'}
                      onClick={selectDelete}
                      sx={{color: 'red', outlineColor: 'black', borderColor: 'red'}}
              > DELETE </Button>
            </div>
            <div>
              <Button variant={'outlined'}
                      onClick={selectCancel}
                      sx={{marginRight: '10px', marginLeft: '10px'}}
              > Cancel </Button>
              <Button variant={'outlined'}
                      onClick={selectSave}
                      sx={{marginRight: '10px', marginLeft: '10px'}}
              > Save </Button>
            </div>
          </div>
        </Container>
      </div>
    </div>
  )
}
