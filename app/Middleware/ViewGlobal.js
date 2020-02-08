'use strict'
const edge = require('edge.js')
const moment = require('moment')
const Env = use('Env')
const View = use('View')


/** @typedef {import('@adonisjs/framework/src/Request')} Request */
/** @typedef {import('@adonisjs/framework/src/Response')} Response */
/** @typedef {import('@adonisjs/framework/src/View')} View */

class ViewGlobal {
  /**
   * @param {object} ctx
   * @param {Request} ctx.request
   * @param {Function} next
   */
  async handle ({ request, view }, next) {
    // call next to advance the request
    edge.global('currentYear', () => moment().format('YYYY'))
    view.share({
      gitRepo: Env.get('GIT_REPO')
    })
    // edge.global('gitRepo', () => Env.get('GIT_REPO'))
    await next()
    
  }
}

module.exports = ViewGlobal
