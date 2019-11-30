//@ts-ignore
import app from 'app'

export default {
  user: app.logged
    ? {
      firstname: app.user.firstname,
      lastname: app.user.lastname,
      mail: app.user.mail,
      login: app.user.login
    } : null,
  logged: app.logged
}