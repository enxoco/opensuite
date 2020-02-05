'use strict'
const Hashids = require('hashids/cjs')
const hashids = new Hashids("one-time-secret", 2, "abcdefghijklmnopqrstuvwxyzABCDEFGHIJKLMNOPQRSTUVWXYZ1234567890");
const Encryption = use('Encryption')
const Redis = use('Redis')


class ContactController {

    async PostContactForm({ request, response, view, session }) {
        const { ts, name, email, message, captcha } = request.all()

        let hash = await Redis.get(ts)
        let solution = Encryption.decrypt(hash)


        if (captcha != solution) {
            session.flash({ error: 'Captcha does not match.  Please Try Again'})
            return response.redirect('back')
        } 

        await Redis.set(`contact_${ts}`, ('name:' + name + ' email: ' + email + ' message: ' + message))
        session.flash({success: 'Thanks!'})
        return response.redirect('back')

    }
}

module.exports = ContactController
