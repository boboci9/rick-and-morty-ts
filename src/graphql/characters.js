import { gql } from '@apollo/client'

export const CHARACTER_LIST = gql`
  query {
    characters {
      results {
        id
        name
        image
        species
      }
    }
  }
`

export const CHARACTER_LIST_PAGED = gql`
  query Characters($page: Int) {
    characters(page: $page) {
      results {
        id
        name
        image
        species
        gender
        status
        type
      }
      info {
        count
        pages
        prev
        next
      }
    }
  }
`
