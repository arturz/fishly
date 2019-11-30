import React from 'react'
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
  const classes = useStyles({})

  return (
    <Container maxWidth="xs">
      <Card className={classes.card}>
        <CardContent>
          <form className={classes.form}>
            <Avatar>
              <LockOutlinedIcon />
            </Avatar>
            <Typography component="h1" variant="h3" className={classes.title}>
              Zaloguj
            </Typography>
            <TextField label="Login" />
            <TextField label="Hasło" />
            <Button variant="contained" color="primary" className={classes.button}>
              Zaloguj się
            </Button>
          </form>
        </CardContent>
      </Card>
    </Container>
  )
}