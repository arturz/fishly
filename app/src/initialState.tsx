//@ts-ignore
import app from 'app';

const { user, token, captchaSiteKey } = app as {
  user: {
    userId: string,
    login: string,
    email: string,
    firstname: string,
    lastname?: string,
    status: number //utils/statuses
  }
  token: string
  captchaSiteKey: string
}
export default { user, token, captchaSiteKey }

sessionStorage.setItem('token', token)