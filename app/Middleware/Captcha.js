'use strict'
const edge = require('edge.js')
const Hashids = require('hashids/cjs')
const hashids = new Hashids("one-time-secret", 2, "abcdefghijklmnopqrstuvwxyzABCDEFGHIJKLMNOPQRSTUVWXYZ1234567890");
const Encryption = use('Encryption')
const Redis = use('Redis')
const generateCaptcha = require('trek-captcha')
const View = use('View')


class Captcha {
  /**
   * @param {object} ctx
   * @param {Request} ctx.request
   * @param {Function} next
   */
  async handle({ request, response, session, view }, next) {
    // call next to advance the request

    const { token, buffer } = await generateCaptcha()
    const { captcha, ts } = request.all()
    if (captcha && ts) {//Verify captcha
      let hash = await Redis.get(ts)
      let solution = Encryption.decrypt(hash)
      if (captcha != solution) {
        session.flash({ error: 'Captcha does not match.  Please Try Again' })
        return response.redirect('back')
      }

      Redis.del(ts)
    }
    let hash = Encryption.encrypt(token)
    let buf = Buffer.from(buffer);
    let encodedData = buf.toString('base64');
    let id = encodedData.slice(0, 50)

    await Redis.set(id, hash)
    await Redis.expire(id, 60)

    View.global('test', () => {
      this.safe('<input />')
    })
    view.share({
      captchaGif: `data:image/gif;base64,${encodedData}`,
      captchaId: id
    })



    await next()
  }
}

module.exports = Captcha
