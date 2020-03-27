import fetch from '../../../utils/fetch'

export default (setId: number) => 
  fetch('api/set/admin/delete_report.php', { setId })