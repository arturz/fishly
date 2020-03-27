import fetch from '../../utils/fetch'

export default (setId: number) => 
  fetch('api/set/report_set.php', { setId })