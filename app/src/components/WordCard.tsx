import React, { useState, useEffect } from 'react'
import { makeStyles, Typography, Card, Theme } from '@material-ui/core'

const useStyles = makeStyles((theme: Theme) => ({
  card: {
    display: 'flex',
    justifyContent: 'center',
    alignItems: 'center',
    textAlign: 'center',
    padding: theme.spacing(0, 2),
    height: theme.spacing(30),
    cursor: 'pointer',
    userSelect: 'none'
  }
}))

export default ({ original, translated }: { original: string, translated: string }) => {
  const [reversed, setReversed] = useState(false)
  const classes = useStyles({})

  useEffect(() => setReversed(false), [original, translated])

  const reverse = () => 
    setReversed(!reversed)

  return (
    <Card className={classes.card} onClick={reverse}>
      <Typography variant="h4">
      {
        reversed
          ? translated
          : original
      }
      </Typography>
    </Card>
  )
}