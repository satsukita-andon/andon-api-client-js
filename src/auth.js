import { call } from './common'

/**
 * @param {string} login
 * @param {string} password
 * @return {Promise<string>} - access token
 */
export function getAccessToken(login, password) {
  call('/auth/access_token', 'get', {
    login: login,
    password: password
  }).then((json) => {
    return json.token
  })
}
