'use strict'
const Hashids = require('hashids/cjs')
const hashids = new Hashids("one-time-secret", 2, "abcdefghijklmnopqrstuvwxyzABCDEFGHIJKLMNOPQRSTUVWXYZ1234567890");
const Encryption = use('Encryption')
const Redis = use('Redis')

class ShortController {


    async PostShort({ request, response, session }) {
        const { short, captcha, ts } = request.all()
        const uPath = request.url()

        let hash = await Redis.get(ts)
        let solution = Encryption.decrypt(hash)
        if (!uPath.includes('api')){
            if (captcha && ts) {
                if (captcha != solution) {
                    session.flash({ error: 'Captcha does not match.  Please Try Again' })
                    return response.redirect('back')
                }
            }
        }


        Redis.del(ts)
        const id = await Redis.get('hits')
        const urlStr = hashids.encode(Number(id))
        await Redis.set(urlStr, short)

        session.flash({ linkUrl: `https://nxone.co/s/${urlStr}` })
        if (uPath.includes('api')) {
            return response.json({ 'url': urlStr })
        }
        return response.redirect('back')
    }

    async GetShort({ response, view, params }) {

        const id = params.id
        let url = await Redis.get(id)

        if (url === null) {
            return view.render('shortener', { error: 'Sorry this link has expired.' })
        } else {
            return response.redirect(url)
        }
    }
}

module.exports = ShortController
