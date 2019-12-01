import React, { useState, useCallback, useRef } from 'react'
import Header from '../components/Header'
import Main from '../components/Main'
import { Container, Theme, Typography, Grid, makeStyles, Card, List, ListItem, CardContent, CardActions, Button, TextField, Divider, IconButton, InputBase, Paper, FormControl, InputLabel, Select } from '@material-ui/core'

const useStyles = makeStyles((theme: Theme) => ({
  controls: {
    marginBottom: theme.spacing(4),
    '& > *': {
      marginRight: theme.spacing(1)
    }
  },
  wordsContainer: {
    marginBottom: theme.spacing(4)
  },
  wordsRow: {
    '& > *': {
      marginRight: theme.spacing(1)
    }
  }
}))

export default () => {
  let wordsId = useRef(0)
  const [words, setWords] = useState([{ original: '', translated: '', __id: ++wordsId.current }])

  const [originalLanguage, setOriginalLanguage] = useState('pl')
  const [translatedLanguage, setTranslatedLanguage] = useState('en')

  const classes = useStyles({})

  const handleChangeOriginalLanguage = ({ target: { value } }) => {
    setOriginalLanguage(value)
  }

  const handleChangeTranslatedLanguage = ({ target: { value } }) => {
    setTranslatedLanguage(value)
  }

  const handleChangeOriginalWord = index => ({ target: { value } }) => {
    const newWords = [...words]
    const word = newWords[index]
    word.original = value

    if(index === newWords.length - 1 && word.translated !== ''){
      newWords.push({ original: '', translated: '', __id: +wordsId.current })
    }

    setWords(newWords)
  }

  const handleChangeTranslatedWord = index => ({ target: { value } }) => {
    const newWords = [...words]
    const word = newWords[index]
    word.translated = value

    if(index === newWords.length - 1 && word.original !== ''){
      newWords.push({ original: '', translated: '', __id: +wordsId.current })
    }

    setWords(newWords)
  }

  const handleDeleteWord = index => () => {
    const newWords = words.filter((word, wordIndex) => wordIndex !== index)
    if(newWords.length === 0)
      return

    setWords(newWords)
  }

  return (
    <>
      <Header />
      <Main>
        <Container maxWidth="md">
          <Typography variant="h4" gutterBottom>Stwórz zestaw</Typography>
          <form noValidate autoComplete="off">
            <div className={classes.controls}>
              <TextField label="Nazwa zestawu" />
              <TextField label="Kategoria" />
              <FormControl>
                <InputLabel htmlFor="original-language">Z języka</InputLabel>
                <Select native value={originalLanguage} onChange={handleChangeOriginalLanguage} inputProps={{ id: 'original-language' }}>
                  <option value="pl">Polski</option>
                  <option value="en">Angielski</option>
                  <option value="de">Niemiecki</option>
                </Select>
              </FormControl>
              <FormControl>
                <InputLabel htmlFor="translated-language">Na język</InputLabel>
                <Select native value={translatedLanguage} onChange={handleChangeTranslatedLanguage} inputProps={{ id: 'translated-language' }}>
                  <option value="pl">Polski</option>
                  <option value="en">Angielski</option>
                  <option value="de">Niemiecki</option>
                </Select>
              </FormControl>
            </div>
            <Typography variant="h5" gutterBottom>Dodaj fiszki</Typography>
            <Grid container direction="column" className={classes.wordsContainer} spacing={1}>
            {
              words.map(({ original, translated, __id }, index) => (
                <Grid item key={__id} container alignItems="flex-end" className={classes.wordsRow}>
                  <TextField label="Słowo" value={original} onChange={handleChangeOriginalWord(index)} />
                  <TextField label="Przetłumaczone słowo" value={translated} onChange={handleChangeTranslatedWord(index)} />
                  <Button variant="outlined" color="primary" onClick={handleDeleteWord(index)}>Usuń</Button>
                </Grid>
              ))
            }
            </Grid>
            <Typography variant="body1" gutterBottom>
              Ilość fiszek w zestawie: { words.length - 1 }
            </Typography>
            <Button variant="contained" color="primary">
              Zapisz zestaw
            </Button>
          </form>
        </Container>
      </Main>
    </>
  )
}