'use strict'
const Hashids = require('hashids/cjs')
const hashids = new Hashids("one-time-secret", 2, "abcdefghijklmnopqrstuvwxyzABCDEFGHIJKLMNOPQRSTUVWXYZ1234567890");
const Encryption = use('Encryption')
const Redis = use('Redis')
const captcha = require('trek-captcha')
const ts = Date.now()

class CaptchaController {

    async ShortIndex({ view }) {
        return view.render('shorts.home', { ts })
    }

    async SnapIndex({ view }) {
        return view.render('snaps.home', {ts})
    }

    async GetCaptcha({ request, response }) {
        const { token, buffer } = await captcha()
        let hash = Encryption.encrypt(token)
        await Redis.set(ts, hash)
        return response.send(buffer)
    }
}

module.exports = CaptchaController
