import './index.scss'
import { useState } from 'react'
import { useLazyQuery } from '@apollo/client'
import { CHARACTER_LIST_PAGED } from '../../../graphql/characters'
import Character, { CharacterType } from '../Card'
import { Alert, LinearProgress } from '@mui/material'
import { InfiniteContainer } from '../../Utils/InfiniteContainer'
const CharacterList = () => {
  const [page, setPage] = useState(0)
  const [characters, setCharacters] = useState([])
  const [loadCharacters, { data, error, loading }] = useLazyQuery(
    CHARACTER_LIST_PAGED,
    {
      variables: { page },
    }
  )
  console.log(data, error, loading)
  const hasMoreData = data && data.characters && data.characters.info.next

  const loadMoreNumbers = () => {
    setPage((page) => page + 1)
    loadCharacters({ variables: { page } })
    // setLoading(true)
    // setTimeout(() => {
    //   const newNumbers = new Array(NUMBERS_PER_PAGE)
    //     .fill(1)
    //     .map((_, i) => page * CHARACTERS_PER_PAGE + i)
    //   setNumbers((nums) => [...nums, ...newNumbers])
    //   setLoading(false)
    // }, 300)
  }
  return (
    <div className="list">
      <h1>Rick and Morty Characters</h1>
      {error && (
        <Alert severity="error">
          An error has occurred, please investigate!
        </Alert>
      )}
      {loading && <LinearProgress color="inherit" />}
      <div className="characters">
        <InfiniteContainer
          hasMoreData={hasMoreData}
          isLoading={loading}
          onBottomHit={loadMoreNumbers}
          loadOnMount={true}
        >
          {data &&
            data.characters &&
            data.characters.results.map((character: CharacterType) => {
              return <Character key={character.id} {...character} />
            })}
        </InfiniteContainer>
      </div>
    </div>
  )
}

export default CharacterList
