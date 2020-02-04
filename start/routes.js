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

Route.get('/shorts', 'CaptchaController.ShortIndex')
Route.get('/s/:id', 'ShortController.GetShort')
Route.post('/shorts', 'ShortController.PostShort')

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
Route.on('/').render('welcome')

