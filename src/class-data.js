import { call } from './common'

/**
 * @typedef {Object} ClassData
 * @property {number} times
 * @property {number} grade
 * @property {number} class
 * @property {string} title
 * @property {?string} intro
 * @property {Array<ClassTag>} tags
 * @property {Array<Review>} reviews
 * @property {Array<string>} prizes
 */

/**
 * @param {OrdInt} times
 * @return {Promise<Array<ClassData>>}
 */
export function listByTimes(times) {
  return call(`/classes/data/${times}`, 'get')
}

/**
 * @param {OrdInt} times
 * @param {number} grade
 * @param {number} clazz
 * @return {Promise<ClassData>}
 */
export function get(times, grade, clazz) {
  return call(`/classes/data/${times}/${grade}/${clazz}`, 'get')
}

/**
 * requires admin access
 * @param {string} token
 * @param {OrdInt} times
 * @param {number} grade
 * @param {number} clazz
 * @param {string} title
 * @return {Promise<ClassData>}
 */
export function create(token, times, grade, clazz, title) {
  return call(`/classes/data/${times}/${grade}/${clazz}`, 'post', {
    title: title
  }, token)
}

/**
 * requires myclass access
 * @param {string} token
 * @param {OrdInt} times
 * @param {number} grade
 * @param {number} clazz
 * @param {Object} param
 * @param {string} [param.title]
 * @param {string} [param.intro]
 * @param {Array<string>} [param.prizes]
 * @param {Array<number>} [param.tag_ids]
 * @return {Promise<ClassData>}
 */
export function update(token, times, grade, clazz, param) {
  return call(`/classes/data/${times}/${grade}/${clazz}`, 'patch', param, token)
}

/**
 * requires admin access
 * @param {string} token
 * @param {OrdInt} times
 * @param {number} grade
 * @param {number} clazz
 * @return {Promise<{}>}
 */
export function del(token, times, grade, clazz) {
  return call(`/classes/data/${times}/${grade}/${clazz}`, 'delete', null, token)
}
