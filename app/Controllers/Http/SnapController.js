'use strict'
const Hashids = require('hashids/cjs')
const hashids = new Hashids("one-time-secret", 2, "abcdefghijklmnopqrstuvwxyzABCDEFGHIJKLMNOPQRSTUVWXYZ1234567890");
const Encryption = use('Encryption')
const Redis = use('Redis')


class SnapController {

    async PostSnap({ request, response, session }) {
        const host = request.headers().origin
        const { secret, captcha, ts } = request.all()
        let hash = await Redis.get(ts)
        let solution = Encryption.decrypt(hash)
        
        Redis.del(ts)
        const id = await Redis.get('hits')
        const urlStr = hashids.encode(Number(id))
        const secMesg = Encryption.encrypt(secret)
        await Redis.set(urlStr, secMesg)
        session.flash({ success: `${host}/snaps/${urlStr}` })
        session.flash({ secret: secret})
        return response.redirect('back')
    }

    async PostSnapApi({ request, response, session }) {
        const host = request.headers().origin
        const { secret } = request.all()
        const id = await Redis.get('hits')
        const urlStr = hashids.encode(Number(id))
        const secMesg = Encryption.encrypt(secret)
        await Redis.set(urlStr, secMesg)
        return response.json({'url': urlStr})
    }

    async GetSnap   ({ view, params, response }) {
        const id = params.id
        // Get our secret message
        let mesg = await Redis.get(id)
        // Immediately delete our secret  message
        await Redis.del(id)
 
        if (mesg != null){

            let secret = Encryption.decrypt(mesg)
            return view.render('snaps.home', {secret})
        } else {
            return view.render('snaps.home', {secret: 'Sorry this secret does not exist'})
        }
    }
}

module.exports = SnapController
