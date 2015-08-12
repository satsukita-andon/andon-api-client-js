import fetch from 'whatwg-fetch'

/**
 * Error class for andon-api
 */
export class AndonError extends Error {
  /**
   * @param {string} name
   * @param {string} message
   */
  constructor(name, message) {
    super();
    this.name = name;
    this.message = message;
  }
}

/**
 * @param {string} endpoint
 * @param {string} method
 * @param {string|Object} body
 * @param {?string} token
 * @return {Promise<Object>}
 */
export function call(endpoint, method, body, token) {
  const url = 'https://api.satsukita-andon.com/dev' + endpoint
  let headers = {
    'Accept': 'application/json',
    'Content-Type': 'application/json'
  }
  if (token) {
    headers['X-Andon-Authentication'] = token
  }
  if (body && typeof body === 'object') {
    body = JSON.stringify(body)
  }
  return fetch(url, {
    method: method,
    headers: headers,
    body: body
  }).then((res) => {
    if (!res.ok) {
      return {
        error: {
          name: 'client_error',
          message: 'unexpected client error'
        }
      }
    } else {
      const json = res.json()
      if (json.error !== null) {
        throw json
      } else {
        return json
      }
    }
  })
}
