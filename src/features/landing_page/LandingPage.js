import useDataStore from "../../components/DataStore";
import {useNavigate} from 'react-router'
import {useEffect, useState} from "react";
import fetchWrapper from "../../utils/fetchWrapper";
import {Dialog} from '../../components/Dialog';
import {EmailEntry} from "./EmailEntry";


export const LandingPage = () => {

  // Perform API call to has_session.
  // If yes, update data store and redirect to watchlist.
  // Otherwise, wait for user to submit to start_session

  const initStore = useDataStore((state) => state.initialIngest)
  const navigate = useNavigate()  // Redirect to WatchList if continuing a session
  const [modalMsg, setModalMsg] = useState('')
  const [showModal, setShowModal] = useState(false)

  const checkSession = () => {
    const onSuccess = (json) => {
      if(json.has_session === true) {
        initStore(json.data)
        console.log('Continuing session..redirecting to Watch List')
        navigate('/app/watch_list')
      }
      else {
        console.log('This is not a continuing session')
      }
    }
    const onFailure = (response, json) => {
      setModalMsg(`Failure querying session status: ${response.status}, ${json.error}`)
      setShowModal(true)
    }
    const onError = (error) => {
      setModalMsg(`Error querying server for session status: ${error}`)
      setShowModal(true)
    }
    let details = {
      onSuccess: onSuccess,
      onFailure: onFailure,
      onError: onError,
      endPoint: 'has_session',
      method: 'get'
    }
    fetchWrapper(details)
  }

  useEffect(()=>{
    checkSession()
  }, [])

  return (

    <>
    {showModal &&
     <Dialog msg={modalMsg} onClose={()=>{setShowModal(false)}}/>
    }
    <h1>This is the landing page</h1>
      <EmailEntry/>
    </>
  )
}
