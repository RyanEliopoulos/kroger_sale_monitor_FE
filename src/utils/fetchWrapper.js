
function fetchWrapper (details) {
  /*
  details: {
    onSuccess,
    onFailure,
    onError,
    endPoint,
    payload,  For the API's consumption
    method
  }
   */
  console.log('in fetchWrapper. Logging details')
  console.log(details)

  fetch(`http://localhost:5000/${details.endPoint}`,
    {credentials: 'include', method: details.method, mode: 'cors',
    body: JSON.stringify(details.payload),
      headers: {'Accept': 'application/json', 'Content-Type': 'application/json'}
    }).then(response => {
      if(response.status === 200) {
        response.json().then(data => {
          details.onSuccess(data)
        })
      }
      else {
        response.json().then(data => {
          details.onFailure(response, data)
        })
      }
  }).catch(error => {
    details.onError(error)
  })
}

export default fetchWrapper;
