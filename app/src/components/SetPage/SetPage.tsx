import React, { useState, useEffect, useCallback } from 'react'
import Set from '../../types/Set'
import Header from '../../components/Header'
import Main from '../../components/Main'
import { makeStyles, Container, Typography, Grid, CircularProgress, Card, List, ListItem, CardContent, CardActions, Button, Divider, Theme, FormControlLabel, Switch } from '@material-ui/core'
import { Link } from 'react-router-dom'
import WordCard from '../../components/SetPage/WordCard'
import toggleSavedSet from '../../api/set/saved/toggleSavedSet'
import reportSet from '../../api/set/reportSet'
import { useStateValue } from '../../state'

const useStyles = makeStyles((theme: Theme) => ({
  leftPanel: {
    userSelect: 'none'
  },
  wordCardContainer: {
    display: 'flex',
    justifyContent: 'center',
    padding: theme.spacing(4, 0, 1)
  },
  navigation: {
    display: 'flex',
    justifyContent: 'space-between',
    paddingTop: theme.spacing(2)
  },
  link: {
    textDecoration: 'none',
    color: theme.palette.primary.main
  },
  controls: {
    '& > *': { marginTop: theme.spacing(1) }
  }
}))

interface Props {
  set: Set | null
  id: string
  setSet: (object) => void
}

export default ({ set, id, setSet }: Props) => {
  const [currentWordIndex, setCurrentWordIndex] = useState(0)
  const [reversedLanguage, setReversedLanguage] = useState(localStorage.getItem(`${id}_reversed`) === '1')

  const reverseLanguage = (state) => {
    setReversedLanguage(state)
    if(state){
      localStorage.setItem(`${id}_reversed`, '1')
      return
    }
    
    localStorage.removeItem(`${id}_reversed`)
  }

  const classes = useStyles({})

  const nextWord = useCallback(() =>
    setCurrentWordIndex(currentWordIndex + 1)
  , [currentWordIndex])

  const previousWord = useCallback(() =>
    setCurrentWordIndex(currentWordIndex - 1)
  , [currentWordIndex])

  const handleKeyDown = useCallback(({ code, repeat }) => {
    if(repeat)
      return
  
    if(code === 'ArrowLeft' && currentWordIndex !== 0){
      previousWord()
      return
    }
  
    if(code === 'ArrowRight' && currentWordIndex !== set.words.length - 1){
      nextWord()
    }
  }, [currentWordIndex, set])

  useEffect(() => {  
    window.addEventListener('keydown', handleKeyDown)

    return () =>
      window.removeEventListener('keydown', handleKeyDown)
  }, [handleKeyDown])

  const [saveTransform, setSaveTransform] = useState(false)
  const toggleSavedState = async () => {
    setSaveTransform(true)
    const { toggled } = await toggleSavedSet(set.set_id)
    setSet({ ...set, saved: toggled })
    setSaveTransform(false)
  }

  const report = async () => {
    if(!confirm('Jesteś pewny, że chcesz zgłosić?'))
      return
    
    const { success } = await reportSet(set.set_id)
    const reported = Boolean(success)
    setSet({ ...set, reported })
    if(reported)
      alert('Wysłano zgłoszenie')
  }

  const [{ user }] = useStateValue()
  const logged = user !== null
  if(set === null)
    return (
      <>
        <Header />
        <Main>
          <CircularProgress />
        </Main>
      </>
    )

  const word = set.words[currentWordIndex]

  return (
    <>
      <Header />
      <Main>
        <Container maxWidth="md">
          <Grid container spacing={3} direction="row-reverse">
            <Grid item xs={12} md={8}>
              <Grid container justify="space-between" alignItems="center">
                <Grid item>
                  <Typography variant="h5">{ set.name } </Typography>
                </Grid>
                <Grid item>
                  <Typography variant="subtitle1">
                    Autor: <Link to={`/account/${set.user_id}`} className={classes.link}>{ set.login }</Link>
                  </Typography>
                </Grid>
              </Grid>
              <Grid container className={classes.wordCardContainer}>
                <Grid item md={10} xs={12}>
                  <WordCard reversedLanguage={reversedLanguage} original={word.original} translated={word.translated} key={(reversedLanguage ? '1' : '0')+word.original+word.translated} />
                  <div className={classes.navigation}>
                    <Button variant="contained" color="primary" size="large" onClick={previousWord} disabled={currentWordIndex === 0}>
                      Poprzednia
                    </Button>
                    <Button variant="contained" color="primary" size="large" onClick={nextWord} disabled={currentWordIndex === set.words.length - 1}>
                      Następna
                    </Button>
                  </div>
                </Grid>
              </Grid>
            </Grid>
            <Grid item xs={12} md={4} className={classes.leftPanel}>
              <Card>
                <List>
                  <ListItem>
                    <Typography variant="h6" gutterBottom>
                      Fiszki w zestawie
                    </Typography>
                  </ListItem>
                  <Divider />
                  <ListItem>
                    <FormControlLabel
                      control={
                        <Switch checked={reversedLanguage} onChange={({ target: { checked } }) => reverseLanguage(checked)} color="secondary" />
                      }
                      label="Odwróć języki"
                    />
                  </ListItem>
                  <Divider />
                  {reversedLanguage
                    ? set.words.map(({ translated }, index) =>
                        <ListItem button onClick={() => setCurrentWordIndex(index)} selected={index === currentWordIndex} key={index}> { translated } </ListItem>
                      )
                    : set.words.map(({ original }, index) =>
                        <ListItem button onClick={() => setCurrentWordIndex(index)} selected={index === currentWordIndex} key={index}> { original } </ListItem>
                      )}
                  <ListItem>
                    <Grid container justify="space-between" className={classes.controls}>
                      {logged
                        ? <>
                            {set.saved
                              ? <Button variant="outlined" onClick={toggleSavedState} size="small" color="primary" disabled={saveTransform}>Usuń z zapisanych</Button> 
                              : <Button variant="contained" onClick={toggleSavedState} size="small" color="primary" disabled={saveTransform}>Zapisz</Button>}
                            {set.user_id === user.userId
                              ? <Link to={`/createset/${set.set_id}`} className={classes.link}>
                                  <Button variant="contained" size="small" color="primary">Edytuj</Button>
                                </Link>
                              : (set.reported || <Button variant="outlined" size="small" color="secondary" onClick={report}>Zgłoś</Button>)}
                          </>
                        : <> 
                            <Link to="/login" className={classes.link}>
                              <Button variant="contained" size="small" color="primary">Zapisz</Button>
                            </Link>
                            <Link to="/login" className={classes.link}>
                              <Button variant="outlined" size="small" color="secondary">Zgłoś</Button>
                            </Link>
                          </>}
                    </Grid>
                  </ListItem>
                </List>
              </Card>
            </Grid>
          </Grid>
        </Container>
      </Main>
    </>
  )
}