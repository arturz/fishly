import fetch from '../../utils/fetch'

export default (setId: number) => 
  fetch('api/set/delete_set.php', { setId })