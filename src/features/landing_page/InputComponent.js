import {useState} from 'react'
import {Button} from "@mui/material";


export const InputComponent = ({email, setEmail}) => {


  return (
      <>
        <label className={'landingLabel'} htmlFor={'email'}>Contact Email</label>
        <input name='email'
               type={'text'}
               value={email}
               onChange={(e) => {
                 setEmail(e.target.value)
               }}
        />

      </>
  )
}
