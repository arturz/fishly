import React from 'react'
import { Button, IconButton, makeStyles } from '@material-ui/core'
import { Link } from 'react-router-dom'
import AccountCircle from '@material-ui/icons/AccountCircle'
import { useStateValue } from '../../state'

const useStyles = makeStyles(() => ({
  link: { 
    color: 'unset',
    textDecoration: 'unset'
  }
}))

export default () => {
  const [{ logged }, dispatch] = useStateValue()
  const classes = useStyles({})

  if(logged)
    return (
      <div>
        <Button color="inherit" onClick={() => dispatch({ type: 'logOut' })}>
          Wyloguj
        </Button>
        <Link to="/account" className={classes.link}>
          <IconButton edge="end" color="inherit">
            <AccountCircle />
          </IconButton>
        </Link>
      </div>
    )

  return (
    <div>
      <Link to="/login" className={classes.link}>
        <Button color="inherit">
          Zaloguj
        </Button>
      </Link>
      <Link to="/register" className={classes.link}>
        <Button color="inherit">
          Zarejestruj
        </Button>
      </Link>
    </div>
  )
}