import { call, DESC } from './common'

class Festival {
  /**
   * @param {number} times
   * @param {string} theme
   * @param {string} imageUrl
   */ 
  constructor(times, theme, imageUrl) {
    this._times = new OrdInt(times);
    this._theme = theme;
    this._imageUrl = imageUrl;
  }

  /**
   * @return {OrdInt}
   */
  get times() {
    return this._times;
  }

  /**
   * @return {string}
   */
  get theme() {
    return this._theme;
  }

  /**
   * @return {string}
   */
  get imageUrl() {
    return this._imageUrl;
  }

  /**
   * @param {Object} json
   * @param {number} json.times
   * @param {string} json.theme
   * @param {string} json.image_url
   * @return {Festival}
   */
  static fromJson(json) {
    return new Festival(json.times, json.theme, json.image_url);
  }

  /**
   * @return {Object}
   * @property {number} times
   * @property {string} theme
   * @property {string} image_url
   */
  toJson() {
    return {
      times: this._times.raw,
      theme: this._theme,
      image_url: this._imageUrl
    };
  }
}

/**
 * @param {SortType} [sortType=DESC] - ASC or DESC
 * @return {Promise<Array<Festival>>}
 */
export function list(sortType = DESC) {
  return call('/festivals', 'get', {
    sort_type: sortType
  }).then(json => json.map(obj => Festival.fromJson(obj)));
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
  return callMultipart('/festivals', 'post', form, token)
    .then(json => Festival.fromJson(json));
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
  return callMultipart('/festivals/' + timesStr, 'post', form, token)
    .then(json => Festival.fromJson(json));
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
