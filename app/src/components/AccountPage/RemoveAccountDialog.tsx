import React from 'react'
import { Button, Dialog, DialogActions, DialogContent, DialogTitle, DialogContentText } from '@material-ui/core'

export default ({ onClose }: { onClose: () => any }) => {
  const handleYesClick = () => {

    
    onClose()
  }

  const handleNoClick = () => {

    onClose()
  }

  return (
    <Dialog open={true} onClose={handleNoClick}>
      <DialogTitle>Usuwanie konta</DialogTitle>
      <DialogContent>
        <DialogContentText>
          Jesteś pewny, że chcesz usunąć konto?
        </DialogContentText>
      </DialogContent>
      <DialogActions>
        <Button onClick={handleYesClick} color="secondary">
          Tak
        </Button>
        <Button onClick={handleNoClick} color="primary" autoFocus>
          Nie
        </Button>
      </DialogActions>
    </Dialog>
  )
}