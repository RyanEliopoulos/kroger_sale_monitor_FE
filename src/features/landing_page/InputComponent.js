import {useState} from 'react'
import {Button} from "@mui/material";


export const InputComponent = ({submit}) => {

  const [email, setEmail] = useState('')

  return (
    <div>
      <div>
        <label htmlFor={'email'}>Contact Email: </label>
        <input name='email'
               type={'text'}
               value={email}
               onChange={(e) => {
                 setEmail(e.target.value)
               }}
        />
      </div>
      <div>
        <Button variant={'outlined'}
                onClick={()=>{submit(email)}}
        >Submit</Button>
      </div>
    </div>
  )
}
