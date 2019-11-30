import React, { useState } from 'react'
import { Theme, Container, makeStyles, Avatar, Typography, TextField, Button, CardContent, Card } from '@material-ui/core'
import LockOutlinedIcon from '@material-ui/icons/LockOutlined'

const useStyles = makeStyles((theme: Theme) => ({
  '@global': {
    'body': {
      backgroundColor: theme.palette.background.paper
    }
  },
  card: {
    marginTop: theme.spacing(8),
  },
  title: {
    margin: theme.spacing(2, 0)
  },
  form: {
    display: 'flex',
    flexDirection: 'column',
    alignItems: 'center',
    margin: theme.spacing(2)
  },
  button: {
    marginTop: theme.spacing(4)
  }
}))

export default () => {
  const [password, setPassword] = useState('')
  const [repeatedPassword, setRepeatedPassword] = useState('')
  const [notSamePassword, setNotSamePassword] = useState(false)

  const classes = useStyles({})

  const validatePasswords = () => {
    if(password && repeatedPassword && password !== repeatedPassword){
      setNotSamePassword(true)
      return
    }

    setNotSamePassword(false)
  }

  return (
    <Container maxWidth="xs">
      <Card className={classes.card}>
        <CardContent>
          <form className={classes.form}>
            <Avatar>
              <LockOutlinedIcon />
            </Avatar>
            <Typography component="h1" variant="h3" className={classes.title}>
              Zarejestruj
            </Typography>
            <TextField label="Login" required />
            <TextField label="Hasło" type="password" onChange={({ target: { value } }) => setPassword(value)} onBlur={validatePasswords} required />
            <TextField 
              label="Powtórz hasło" 
              type="password" 
              onChange={({ target: { value } }) => setRepeatedPassword(value)}
              onBlur={validatePasswords}
              error={notSamePassword}
              helperText={notSamePassword ? 'Hasła nie są takie same' : undefined}
              required
            />
            <TextField label="Email" required />
            <TextField label="Twoje imie" required />
            <TextField label="Twoje nazwisko" required />
            <Button variant="contained" color="primary" className={classes.button}>
              Zarejestruj się
            </Button>
          </form>
        </CardContent>
      </Card>
    </Container>
  )
}