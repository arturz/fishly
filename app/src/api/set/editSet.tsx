import fetch from '../../utils/fetch'

export default (setId: number, name: string, subject: string, words: Object[]) => 
  fetch('api/set/edit_set.php', { setId, name, subject, words })