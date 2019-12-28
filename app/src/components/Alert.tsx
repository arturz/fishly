import React from 'react'
import { Button, Dialog, DialogActions, DialogContent, DialogTitle, DialogContentText } from '@material-ui/core'

export default ({ title, children, handleClose }: { title: string, children: React.ReactChild, handleClose: () => any }) =>
  <Dialog open={true} onClose={handleClose} fullWidth={true} maxWidth="xs">
    <DialogTitle>
    {
      title
    }
    </DialogTitle>
    <DialogContent>
      <DialogContentText>
      {
        children
      }
      </DialogContentText>
    </DialogContent>
    <DialogActions>
      <Button onClick={handleClose} color="primary" autoFocus>
        Zamknij
      </Button>
    </DialogActions>
  </Dialog>