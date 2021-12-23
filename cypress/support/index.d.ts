declare interface User {
  username: string
  bio: string
  image: string
  following: boolean
}

declare interface Article {
  title: string
  slug: string
  body: string
  createdAt: Date
  updatedAt: Date
  tagList: string[]
  description: string
  author: User
  favorited: boolean
  favoritesCount: number
}

interface GetArticles {
  articles: Article[]
  articlesCount: number
}

declare namespace Cypress {
  interface Chainable {
    /**
     * Custom for API login
     * @example cy.loginAPI('greeting','sifrica1')
     */
     loginAPI(username: string, password: string): Chainable<Element>
    /**
     * Create article API
     * @example cy.createArticleApi(data object for article)
     */
    createArticleApi(article: object): Chainable<Element>
    /**
     * Create article API
     * @example cy.createArticleApi(data object for article)
     */
     deleteArticleApi(article: string): Chainable<Element>
  }
}



