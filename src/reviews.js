import { call } from './common'

/**
 * @typedef {Object} Review
 * @property {number} times
 * @property {number} grade
 * @property {number} class
 * @property {User} writer
 * @property {string} title
 * @property {string} text
 */

/**
 * @param {OrdInt} times
 * @param {number} grade
 * @param {number} clazz
 * @return {Promise<Array<Review>>}
 */
export function listByClass(times, grade, clazz) {
  return call(`/classes/${times}/${grade}/${clazz}/reviews`, 'get')
}

/**
 * @param {string} token
 * @param {OrdInt} times
 * @param {number} grade
 * @param {number} clazz
 * @param {string} title
 * @param {string} text
 * @return {Primise<Review>}
 */
export function create(token, times, grade, clazz, title, text) {
  return call(`/classes/${times}/${grade}/${clazz}/reviews`, 'post', {
    title: title,
    text: text
  }, token)
}

/**
 * @param {string} token
 * @param {OrdInt} times
 * @param {number} grade
 * @param {number} clazz
 * @param {Object} param
 * @param {string} [param.title]
 * @param {string} [param.text]
 * @return {Primise<Review>}
 */
export function create(token, times, grade, clazz, param) {
  return call(`/classes/${times}/${grade}/${clazz}/reviews`, 'patch', param, token)
}

/**
 * @param {string} token
 * @param {OrdInt} times
 * @param {number} grade
 * @param {number} clazz
 * @return {Promise<{}>}
 */
export function del(token, times, grade, clazz) {
  return call(`/classes/${times}/${grade}/${clazz}/reviews`, 'delete', null, token)
}
