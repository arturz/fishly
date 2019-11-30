import React from 'react'
import { Link } from 'react-router-dom'
import { Typography, Button, Stepper, Step, StepLabel, makeStyles, Container } from '@material-ui/core'
import CheckIcon from '@material-ui/icons/Check'
import Header from '../components/Header'
import Main from '../components/Main'

const useStyles = makeStyles(theme => ({
  text: {
    textAlign: 'center',
    marginBottom: theme.spacing(8)
  },
  jumbotron: {
    margin: theme.spacing(16, 0, 8)
  },
  link: { 
    color: 'unset',
    textDecoration: 'unset'
  }
}))

export default () => {
  const classes = useStyles({})
  
  return (
    <>
      <Header />
      <Main>
        <div className={classes.jumbotron}>
          <Container>
            <Typography variant="h1" gutterBottom className={classes.text}>
              Fishly
            </Typography>
            <Stepper activeStep={0} alternativeLabel>
              <Step>
                <StepLabel>
                  <Link to="/register" className={classes.link}>
                    <Button variant="contained" color="primary">
                      Załóż konto
                    </Button>
                  </Link>
                </StepLabel>
              </Step>
              <Step>
                <StepLabel>
                  Ucz się z Fishly
                </StepLabel>
              </Step>
              <Step>
                <StepLabel StepIconComponent={CheckIcon}>
                  Zdawaj egzaminy
                </StepLabel>
              </Step>
            </Stepper>
          </Container>
        </div>
      </Main>
    </>
  )
}