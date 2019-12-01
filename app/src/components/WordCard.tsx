import React, { useState, useEffect, useCallback } from 'react'
import { makeStyles, Typography, Card, Theme } from '@material-ui/core'

const useStyles = makeStyles((theme: Theme) => ({
  scene: {
    width: '100%',
    height: theme.spacing(30),
    perspective: theme.spacing(65)
  },
  card: {
    width: '100%',
    height: '100%',
    position: 'relative',
    transition: 'transform 0.5s',
    transformStyle: 'preserve-3d',
    userSelect: 'none',
    '&.flipped': {
      transform: 'rotateX(180deg)'
    }
  },
  cardFace: {
    position: 'absolute',
    height: '100%',
    width: '100%',
    backfaceVisibility: 'hidden',
    display: 'flex',
    justifyContent: 'center',
    alignItems: 'center',
    textAlign: 'center',
    padding: theme.spacing(0, 2),
  },
  cardFaceBack: {
    transform: 'rotateX(180deg)'
  }
}))

export default ({ original, translated }: { original: string, translated: string }) => {
  const classes = useStyles({})
  const [flipped, setFlipped] = useState(false)

  const handleKeyDown = useCallback(({ code, repeat }) =>
    !repeat && (code === 'ArrowUp' || code === 'ArrowDown') && setFlipped(flipped => !flipped)
  , [flipped])

  useEffect(() => {  
    window.addEventListener('keydown', handleKeyDown)

    return () =>
      window.removeEventListener('keydown', handleKeyDown)
  }, [handleKeyDown])

  return (
    <div className={classes.scene} onPointerDown={() => setFlipped(flipped => !flipped)}>
      <div className={`${classes.card} ${flipped ? 'flipped' : ''}`}>
        <Card className={classes.cardFace}>
          <Typography variant="h4">
          {
            original
          }
          </Typography>
        </Card>
        <Card className={`${classes.cardFace} ${classes.cardFaceBack}`}>
          <Typography variant="h4">
          {
            translated
          }
          </Typography>
        </Card>
      </div>
    </div>
  )
}

/*const useStyles = makeStyles((theme: Theme) => ({
  card: {
    display: 'flex',
    justifyContent: 'center',
    alignItems: 'center',
    textAlign: 'center',
    padding: theme.spacing(0, 2),
    width: '100%',
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
}*/