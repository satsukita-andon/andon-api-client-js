import { call } from './common'

/**
 * @param {string} login
 * @param {string} password
 * @return {Promise<string>} - access token
 */
export function signin(login, password) {
  call('/auth/access_token', 'get', {
    login: login,
    password: password
  }).then((json) => {
    return json.token
  })
}

/**
 * @param {string} token
 * @return {Promise<User>}
 */
export function get(token) {
  return call('/auth/me', 'get', null, token)
}

/**
 * @param {string} login
 * @param {string} name
 * @param {string} password
 * @param {number} times
 * @return {Promise<User>}
 */
export function signup(login, name, password, times) {
  return call('/auth/me', 'post', {
    login: login,
    password: password,
    times: times
  })
}

/**
 * @param {string} token
 * @param {Object} param
 * @param {string} [param.login]
 * @param {string} [param.name]
 * @param {string} [param.first_class_id]
 * @param {string} [param.second_class_id]
 * @param {string} [param.third_class_id]
 * @return {Promise<User>}
 */
export function update(token, param) {
  return call('/auth/me', 'patch', param, token)
}

/**
 * @param {string} token
 * @param {string} password
 * @return {Promise<{}>}
 */
export function password(token, password) {
  return call('/auth/password', 'patch', {
    password: password
  }, token)
}

/**
 * @param {string} token
 * @return {Promise<{}>}
 */
export function del(token) {
  return call('/auth/me', 'delete', null, token)
}
