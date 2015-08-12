import { call } from './common'

/**
 * @typedef {Object} Article
 * @property {number} id
 * @property {string} title
 * @property {string} body
 * @property {Array<ArticleTag>} tags
 * @property {User} owner
 * @property {string|Array<User>} collaborators - "all" or an array of user
 * @property {string} created_at - ISO8601 date
 * @property {?string} updated_at - ISO8601 date
 */

/**
 * @param {number} [offset=0]
 * @param {number} [limit=20]
 * @return {Array<Article>}
 */
export function list(offset = 0, limit = 20) {
  return call('/articles', 'get', {
    offset: offset,
    limit: limit
  })
}

/**
 * @param {number} id - article id
 * @return {Promise<Article>}
 */
export function get(id) {
  return call('/articles/' + id, 'get')
}

/**
 * @param {string} token
 * @param {string} title
 * @param {string} body
 * @param {Array<number>} [tagIds=[]]
 * @param {string|Array<number>} [collaboratorIds=[]] - "all" or an array of id
 * @return {Promise<Article>}
 */
export function create(token, title, body, tagIds = [], collaboratorIds = []) {
  return call('/articles', 'post', {
    type: type,
    title: title,
    body: body,
    tag_ids: tagIds,
    collaborator_ids: collaboratorIds
  }, token)
}

/**
 * @param {string} token
 * @param {number} id
 * @param {Object} param
 * @param {string} [param.title]
 * @param {string} [param.body]
 * @param {Array<number>} [param.tagIds]
 * @param {string|Array<number>} [param.collaboratorIds]
 * @return {Promise<Article>}
 */
export function update(token, id, param) {
  return call('/articles/' + id, 'put', param, token)
}

/**
 * @param {string} token
 * @param {number} id
 * @return {Promise<{}>}
 */
export function del(token, id) {
  return call('/articles/' + id, 'delete', null, token)
}

/**
 * Ownership transfer
 * @param {string} token
 * @param {number} articleId
 * @param {number} userId
 * @return {Promise<Article>}
 */
export function transfer(token, articleId, userId) {
  return call('/articles/' + articleId + '/transfer', 'put', {
    id: userId
  }, token)
}
