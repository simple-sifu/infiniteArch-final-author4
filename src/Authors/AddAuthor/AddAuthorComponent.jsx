import * as React from 'react'
import { observer } from 'mobx-react'
import { useValidation } from '../../Core/Providers/Validation'

export const AddAuthorComponent = observer((props) => {
  const [inputValue, setInputValue] = React.useState('')
  const [, updateClientValidationMessages] = useValidation()

  let formValid = () => {
    let clientValidationMessages = []
    if (!props.presenter.newAuthorName || props.presenter.newAuthorName === '')
      clientValidationMessages.push('No author name')
    updateClientValidationMessages(clientValidationMessages)
    return clientValidationMessages.length === 0
  }

  const inputValueHandler = (event) => {
    setInputValue(event.target.value)
    props.presenter.newAuthorName = event.target.value
  }

  return (
    <div>
      <form
        className="login"
        onSubmit={(event) => {
          event.preventDefault()
          if (formValid()) {
            props.presenter.addAuthor()
            setInputValue('')
          }
        }}
      >
        <label>
          <input
            type="text"
            value={inputValue}
            placeholder="Enter author name"
            onChange={(event) => {
              inputValueHandler(event)
            }}
          />
          <input type="submit" value="Submit Author and Books" />
        </label>
      </form>
    </div>
  )
})
