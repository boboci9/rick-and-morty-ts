import './index.scss'
import React, { useEffect, useState, UIEvent } from 'react'
import { useLazyQuery, useQuery } from '@apollo/client'
import { CHARACTER_LIST_PAGED } from '../../../graphql/characters'
import Character, { CharacterType } from '../Card'
import { Alert, LinearProgress } from '@mui/material'
const CharacterList = () => {
  const [page, setPage] = useState(1)
  const [hasMoreData, setHasMoreData] = useState(true)
  const [characters, setCharacters] = useState<CharacterType[]>([])
  const { error, loading, fetchMore } = useQuery(CHARACTER_LIST_PAGED, {
    onCompleted: (result) => {
      const { results, info } = result.characters
      setHasMoreData(info.next)
      setCharacters((previousCharacters) => [...previousCharacters, ...results])
      setPage((page) => info.next)
    },
  })

  const loadMoreCharacters = async () => {
    const fetchedMore = await fetchMore({
      variables: { page },
    })
  }
  const onScroll = (event: UIEvent<HTMLElement>) => {
    if (!hasMoreData) return
    if (
      event.currentTarget.scrollTop + event.currentTarget.clientHeight ===
      event.currentTarget.scrollHeight
    ) {
      loadMoreCharacters()
    }

    return
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
      <div className="characters" onScroll={onScroll}>
        {characters.map((character: CharacterType) => {
          return <Character key={character.id} {...character} />
        })}
      </div>
    </div>
  )
}

export default CharacterList
