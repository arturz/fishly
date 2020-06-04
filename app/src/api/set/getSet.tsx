import fetch from '../../utils/fetch'
import Set from '../../types/Set'

export default (setId: number): Promise<Set> =>
  fetch(`api/set/get_set.php?setId=${setId}`)