import React from 'react'
import { useState, useEffect } from 'react'
import { useParams } from 'react-router-dom'
import getSet from '../../api/set/getSet'
import SetPage from './SetPage'

export default () => {
  const [set, setSet] = useState(null)
  const { id } = useParams()

  useEffect(() => {
    if(!id)
      return
    
    getSet(parseInt(id)).then(setSet)
  }, [id])

  return <SetPage id={id} set={set} setSet={setSet} />
}