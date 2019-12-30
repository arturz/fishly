import fetch from '../../utils/fetch'

type Result = { error: string } | { success: boolean }

export default (password: string): Promise<Result> =>
  fetch('api/account/delete_account.php', { password })