import { useEffect, useState, useRef } from 'react'
type Props = {
  onBottomHit: () => void
  isLoading: boolean
  hasMoreData: boolean
  loadOnMount: boolean
  children: any
}

function isBottom(ref: React.RefObject<HTMLDivElement>) {
  if (!ref.current) {
    return false
  }
  return ref.current.getBoundingClientRect().bottom <= window.innerHeight
}

export const InfiniteContainer: React.FC<Props> = ({
  onBottomHit,
  isLoading,
  hasMoreData,
  loadOnMount,
  children,
}) => {
  const [initialLoad, setInitialLoad] = useState(true)
  const contentRef = useRef<HTMLDivElement>(null)
  useEffect(() => {
    if (loadOnMount && initialLoad) {
      onBottomHit()
      setInitialLoad(false)
    }
  }, [onBottomHit, loadOnMount, initialLoad])

  useEffect(() => {
    const onScroll = () => {
      console.log('onscroll', hasMoreData, isBottom(contentRef))
      if (!isLoading && hasMoreData && isBottom(contentRef)) {
        console.log('bottom hit')
        onBottomHit()
      }
    }
    document.addEventListener('scroll', onScroll, true)
    return () => document.removeEventListener('scroll', onScroll)
  }, [onBottomHit, isLoading, hasMoreData])

  return <div ref={contentRef}>{children}</div>
}
