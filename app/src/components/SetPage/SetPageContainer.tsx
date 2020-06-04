import React from 'react'
import { useState, useEffect } from 'react'
import { useParams } from 'react-router-dom'
import getSet from '../../api/set/getSet'
import SetPage from './SetPage'

function shuffle(a) {
  for (let i = a.length - 1; i > 0; i--) {
      const j = Math.floor(Math.random() * (i + 1));
      [a[i], a[j]] = [a[j], a[i]];
  }
  return a;
}

export default () => {
  const [set, setSet] = useState(null)
  const { id } = useParams()

  useEffect(() => {
    if(!id)
      return
    
    getSet(parseInt(id)).then(fetchedSet => {
      setSet({
        words: shuffle(fetchedSet.words),
        ...fetchedSet
      })
    })
  }, [id])

  return <SetPage id={id} set={set} setSet={setSet} />
}