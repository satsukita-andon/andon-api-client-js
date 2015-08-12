import { call } from './common'

/**
 * @typedef {Object} User
 * @property {number} id
 * @property {string} login
 * @property {string} name
 * @property {number} times
 * @property {string} icon_url
 * @property {?Class} first_class
 * @property {?Class} second_class
 * @property {?Class} third_class
 */

/**
 * @param {string} login
 * @return {User}
 */
export function get(id) {
  return call('/users/' + login, 'get')
}
