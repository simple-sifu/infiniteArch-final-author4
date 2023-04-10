import * as React from 'react'
import { observer } from 'mobx-react'
import { withInjection } from '../Core/Providers/Injection'
import { AuthorsPresenter } from './AuthorsPresenter'
import { AuthorListComponent } from './AuthorList/AuthorListComponent'
import { AddBooksComponent } from '../Books/AddBooks/AddBooksComponent'
import { BookListComponent } from '../Books/BookList/BookListComponent'
import { MessagesComponent } from '../Core/Messages/MessagesComponent'
import { AddAuthorComponent } from './AddAuthor/AddAuthorComponent'

const AuthorsComp = observer((props) => {
  return (
    <>
      <h1>AUTHORS</h1>
      <input value="show author list" type="button" onClick={props.presenter.toggleShowAuthors} />
      <br />
      <AuthorListComponent />
      <br />
      <AddAuthorComponent presenter={props.presenter} />
      <br />
      <AddBooksComponent presenter={props.presenter} />
      <br />
      <BookListComponent />
      <br />
      <MessagesComponent />
    </>
  )
})

export const AuthorsComponent = withInjection({ presenter: AuthorsPresenter })(AuthorsComp)
