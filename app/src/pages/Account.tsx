import React, { useState, useEffect } from 'react'
import { useParams, Link } from 'react-router-dom'
import Header from '../components/Header'
import Main from '../components/Main'
import { makeStyles, Container, Typography, Grid, CircularProgress, Card, List, ListItem, CardContent, CardActions, Button, Divider, Theme } from '@material-ui/core'
import Set from '../components/Set'
import users from '../mocks/users'
import sets from '../mocks/sets'
import getAccount from '../api/account/getAccount'

const useStyles = makeStyles((theme: Theme) => ({
  notFoundText: {
    textAlign: 'center',
    margin: theme.spacing(8, 2, 0)
  }
}))

export default () => {
  const { userId } = useParams()

  const [account, setAccount] = useState(null)

  useEffect(() => {
    getAccount(+userId).then(setAccount)
  }, [userId])

  const classes = useStyles({})

  return <>
    <Header />
    <Main>
      <Container maxWidth="md">
      {account !== null && <Grid container spacing={3} direction="row-reverse">
        <Grid item xs={12} md={8}>
          <Typography variant="h4">
            Użytkownik { account.login }
          </Typography>
          <p>
            <Typography variant="h6">
              Imię:
            </Typography>
            <Typography variant="body1">
            { account.firstname }
            </Typography>
          </p>
          {account.sets.length === 0 || <p>
            <Typography variant="h6" gutterBottom>Zestawy użytkownika</Typography>
            {account.sets.map(({ name, subject, set_id }) => (
              <Link to={`/set/${set_id}`} key={set_id}>
                <Set key={name} name={name} subject={subject} />
              </Link>
            ))}
          </p>}
        </Grid>
        <Grid item xs={12} md={4}>
          <Card>
            <List>
              <ListItem>
                <Typography variant="h6" gutterBottom>
                  Dodatkowe opcje
                </Typography>
              </ListItem>
              <Divider />
              <ListItem>
                brak
              </ListItem>
            </List>
          </Card>
        </Grid>
      </Grid>}
      </Container>
    </Main>
  </>

  /*const user = users.find(({ login: userLogin } ) => userLogin === login)
  if(!user){
    return (
      <>
        <Header />
        <Main>
          <Typography variant="h4" className={classes.notFoundText}>
            Nie znaleziono użytkownika.
          </Typography>
        </Main>
      </>
    )
  }

  const userSets = sets.filter(({ createdBy: { login: userLogin } } ) => userLogin === login)

  return (
    <>
      <Header />
      <Main>
        <Container maxWidth="md">
          <Grid container spacing={3} direction="row-reverse">
            <Grid item xs={12} md={8}>
              <Typography variant="h4">
                Użytkownik { user.login }
              </Typography>
              <p>
                <Typography variant="h6">
                  Imię:
                </Typography>
                <Typography variant="body1">
                { user.firstname }
                </Typography>
              </p>
              <p>
                <Typography variant="h6" gutterBottom>
                  Zestawy użytkownika
                </Typography>
                {
                  userSets.map(({ name, subject }, index) => (
                    <Link to={`/set/${index}`} key={index}>
                      <Set key={name} name={name} subject={subject} />
                    </Link>
                  ))
                }
              </p>
            </Grid>
            <Grid item xs={12} md={4}>
              <Card>
                <List>
                  <ListItem>
                    <Typography variant="h6" gutterBottom>
                      Dodatkowe opcje
                    </Typography>
                  </ListItem>
                  <Divider />
                  <ListItem>
                    brak
                  </ListItem>
                </List>
              </Card>
            </Grid>
          </Grid>
        </Container>
      </Main>
    </>
  )*/
}