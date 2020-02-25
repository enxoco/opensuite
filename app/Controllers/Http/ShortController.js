'use strict'
const Hashids = require('hashids/cjs')
const hashids = new Hashids("one-time-secret", 2, "abcdefghijklmnopqrstuvwxyzABCDEFGHIJKLMNOPQRSTUVWXYZ1234567890");
const Redis = use('Redis')

class ShortController {

    async PostShort({ request, response, session }) {
        const { short, captcha, ts } = request.all()
        const uPath = request.url()
        const id = await Redis.get('hits')
        const urlStr = hashids.encode(Number(id))
        await Redis.set(urlStr, short)


        if (uPath.includes('api')) {
            console.log(urlStr)

            return response.json({url: urlStr})
        } else {
            session.flash({ linkUrl: `https://nxone.co/s/${urlStr}` })
            return response.redirect('back')

        }
    }

    async GetShort({ response, view, params }) {

        const id = params.id
        let url = await Redis.get(id)

        if (url === null) {
            return view.render('shorts.home', { error: 'Sorry this link has expired.' })
        } else {
            return response.redirect(url)
        }
    }
}

module.exports = ShortController
