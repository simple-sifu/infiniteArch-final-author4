import { injectable, inject } from 'inversify'
import { makeObservable, computed } from 'mobx'
import { AuthorsRepository } from './AuthorsRepository'
import { MessagesPresenter } from '../Core/Messages/MessagesPresenter'

@injectable()
class AuthorsPresenter extends MessagesPresenter {
  @inject(AuthorsRepository)
  authorsRepository

  newAuthorName = null

  load = async () => {
    console.log('AuthorsPresenter.load()')
    await this.authorsRepository.load()
  }

  get viewModel() {
    const authorsPm = this.authorsRepository.authorsPm
    console.log('AuthorsPresenter.viewModel() authorsPm=', authorsPm)
    if (authorsPm?.success && this.authorsRepository.showAuthors) {
      return authorsPm.authors.map((author) => {
        return { visibleAuthor: `(${author.name}) | (${author.bookNamesByAuthor.join(',')})` }
      })
    } else {
      return []
    }
  }

  get showAuthorsList() {
    console.log('AuthorsPresenter.showAuthorsList() showAuthors=', this.authorsRepository.showAuthors)
    return this.authorsRepository.showAuthors
  }

  constructor() {
    super()
    makeObservable(this, {
      viewModel: computed,
      showAuthorsList: computed
    })
  }

  toggleShowAuthors = () => {
    //console.log('AuthorsPresenter.toggleShowAuthors showAuthors1=', this.authorsRepository.showAuthors)
    this.authorsRepository.showAuthors = !this.authorsRepository.showAuthors
    console.log('AuthorsPresenter.toggleShowAuthors showAuthors2=', this.authorsRepository.showAuthors)
  }

  addBook = () => {
    this.authorsRepository.addBookToStaging(this.newBookName)
  }

  addAuthor = async () => {
    const authorPm = await this.authorsRepository.addAuthor(this.newAuthorName)
    if (authorPm.success) {
      console.log(
        'AuthorsPresenter.addAuthor showAuthors1',
        this.authorsRepository.showAuthors,
        ', author.length=',
        this.authorsRepository.authorsPm.authors.length
      )
      if (this.authorsRepository.authorsPm.authors.length > 3 && this.authorsRepository.showAuthors === true) {
        this.authorsRepository.showAuthors = false
      }
      console.log('AuthorsPresenter.addAuthor showAuthors2=', this.authorsRepository.showAuthors)
      this.load()

      this.unpackRepositoryPmToVm(authorPm, 'Author successfully added')
    }
  }

  reset = () => {
    this.newAuthorName = ''
  }
}
export { AuthorsPresenter }
