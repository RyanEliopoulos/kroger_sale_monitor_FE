


export const Dialog = ({msg, onClose}) => {

  return (
    <div className={'dialog-modal'}>
      <div className={'dialog-modal-content'}>
        <h1>{msg}</h1>
        <button type={'button'}
                onClick={onClose}
        >OK</button>
      </div>
    </div>
  )
};
