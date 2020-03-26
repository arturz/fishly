import fetch from '../../utils/fetch'

export default (userId: number) =>
  fetch(`api/account/get_account.php?userId=${userId}`)