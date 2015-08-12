import { call } from './common'

/**
 * @typedef {Object} Festival
 * @property {number} times
 * @property {string} theme
 * @property {string} image_url
 */

/**
 * @return {Promise<Array<Festival>>}
 */
export function list() {
  return call('/festivals', 'get')
}

/**
 * requires admin access
 * @param {string} token
 * @param {number} times
 * @param {string} theme
 * @param {File} image
 * @return {Promise<Festival>}
 */
export function create(token, times, theme, image) {
  let form = new FormData();
  form.append('times', times);
  form.append('theme', theme);
  form.append('image', image);
  return callMultipart('/festivals', 'post', form, token);
}

/**
 * requires admin access
 * @param {string} token
 * @param {number} times
 * @param {string} theme
 * @param {File} image
 * @return {Promise<Festival>}
 */
export function update(token, times, theme, image) {
  let form = new FormData();
  form.append('theme', theme);
  form.append('image', image);
  let timesStr = (new OrdInt(times)).toString();
  return callMultipart('/festivals/' + timesStr, 'post', form, token);
}

/**
 * requires admin access
 * @param {string} token
 * @param {OrdInt} times
 * @return {Promise<{}>}
 */
export function del(token, times) {
  return call('/festivals/' + times.toString(), 'delete', null, token)
}
