import fetch from '../../utils/fetch'

type Result = { error: string } | { success: boolean }

export default (state: object): Promise<Result> =>
  fetch('api/account/registration.php', state)