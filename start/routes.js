'use strict'

/*
|--------------------------------------------------------------------------
| Routes
|--------------------------------------------------------------------------
|
| A complete guide on routing is available here.
| http://adonisjs.com/docs/4.1/routing
|
*/

/** @type {typeof import('@adonisjs/framework/src/Route/Manager')} */
const Route = use('Route')

/*
|
|--------------------------------------------------------------------------
| OpenShorts Routes
|--------------------------------------------------------------------------
|
|*/

Route.get('/s/:id', 'ShortController.GetShort')
Route.post('/shorts', 'ShortController.PostShort')
Route.post('/api/shorts', 'ShortController.PostShort')
Route.on('/shorts').render('shorts.home')



/*
|
|--------------------------------------------------------------------------
| OpenSnaps Routes
|--------------------------------------------------------------------------
|
|*/

Route.get('/decode', 'SnapController.decode')
Route.get('/snaps/:id', 'SnapController.GetSnap')
Route.get('/api/snaps/:id', 'SnapController.GetSnapApi')
Route.post('/snaps', 'SnapController.PostSnap')
Route.post('/api/snaps', 'SnapController.PostSnapApi')
Route.on('/snaps').render('snaps.home')

/*
|
|--------------------------------------------------------------------------
|Captcha Routes
|--------------------------------------------------------------------------
|
| This route is used throughout openSuite whenever we need to present a captcha to the user.
| It takes in a timestamp parameter as well as a token embedded in the form.
|
|*/
Route.get('/captcha/:ts', 'CaptchaController.GetCaptcha')
Route.on('/tech').render('tech')
Route.post('/contact', 'ContactController.PostContactForm')
Route.on('/contact').render('contact')

Route.on('/').render('welcome')

Route.on('/robots.txt')