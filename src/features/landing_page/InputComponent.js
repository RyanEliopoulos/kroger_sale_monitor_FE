
export const InputComponent = ({email, setEmail, submitEmail}) => {

  const inputKeyDown = (event) => {
    if(event.key === 'Enter') {
      submitEmail(email)
    }
  }

  return (
      <>
        <label className={'landingLabel'} htmlFor={'email'}>Contact Email</label>
        <input name='email'
               type={'text'}
               value={email}
               onChange={(e) => {
                 setEmail(e.target.value)
               }}
               onKeyDown={(e)=>{inputKeyDown(e)}}
        />

      </>
  )
}
