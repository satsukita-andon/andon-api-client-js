import { call } from './common'

/**
 * @typedef {Object} AnonymousUser
 * @property {string} name
 * @property {boolean} password
 */

/**
 * @typedef {Object} Comment
 * @property {number} id
 * @property {User|AnonymousUser} user
 * @property {string} title
 * @property {string} body
 * @property {string} created_at
 * @property {string} updated_at
 */

/**
 * @return {Promise<Array<Comment>>}
 */
export function list() {
  return call('/comments', 'get')
}

/**
 * set login or name and password (password is optional)
 * @param {number} id
 * @param {?string} login
 * @param {?string} name
 * @param {?string} password
 * @param {string} title
 * @param {string} body
 * @return {Promise<Comment>}
 */
export function create(id, login, name, password, title, body) {
  let json = {
    id: id,
    title: title,
    body: body
  }
  if (login) {
    json.login = login
  } else {
    json.name = name
    if (password) {
      json.password = password
    }
  }
  return call('/articles/' + id + '/comments', 'get', json)
}

/**
 * @param {string} token
 * @param {number} id
 * @param {Object} param
 * @param {string} [param.title]
 * @param {string} [param.body]
 * @return {Promise<Comment>}
 */
export function update(token, id, param) {
  return call('/comments/' + id, 'patch', param, token)
}

/**
 * @param {string} password
 * @param {number} id
 * @param {Object} param
 * @param {string} [param.title]
 * @param {string} [param.body]
 * @return {Promise<Comment>}
 */
export function anonymousUpdate(password, id, param) {
  param.password = password
  return call('/comments/' + id, 'patch', param)
}

/**
 * @param {string} token
 * @param {number} id
 * @return {Promise<{}>}
 */
export function del(token, id) {
  return call('/comments/' + id, 'delete', null, token)
}

/**
 * @param {string} password
 * @param {number} id
 * @return {Promise<{}>}
 */
export function anonymousDel(password, id) {
  return call('/comments/' + id, 'delete', {
    password: password
  })
}
