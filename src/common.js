import 'whatwg-fetch'

/**
 * @typedef {string} SortType
 */
export const ASC = "ASC";
export const DESC = "DESC";

export class OrdInt {
  /**
   * @param {number} n
   * @return {OrdInt}
   */
  constructor(n) {
    this._num = n
  }

  /**
   * @return {string}
   */
  toString() {
    switch (this._num % 10) {
      case 1:
        return this._num + 'st';
      case 2:
        return this._num + 'nd';
      case 3:
        return this._num + 'rd';
      default:
        return this._num + 'th';
    }
  }

  /**
   * @return {number}
   */
  raw() {
    return this._num
  }
}

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

function callCommon(endpoint, method, headers, body, token) {
  const url = 'https://api.satsukita-andon.com/dev' + endpoint
  if (token) {
    headers['X-Andon-Authentication'] = token
  }
  fetch(url, {
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
    } else if (res.status === 204) {
      return {};
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

/**
 * @param {string} endpoint
 * @param {string} method
 * @param {Object} json
 * @param {string} [token]
 * @return {Promise<Object>}
 */
export function call(endpoint, method, json, token) {
  let headers = {
    'Accept': 'application/json',
    'Content-Type': 'application/json'
  }
  const body = JSON.stringify(json)
  return callCommon(endpoint, method, headers, body, token)
}

/**
 * @param {string} endpoint
 * @param {string} method
 * @param {FormData} form
 * @param {string} [token]
 * @return {Promise<Object>}
 */
export function callMultipart(endpoint, method, form, token) {
  let headers = {
    'Accept': 'application/json',
    'Content-Type': 'multipart/form-data'
  }
  return callCommon(endpoint, method, headers, form, token)
}
