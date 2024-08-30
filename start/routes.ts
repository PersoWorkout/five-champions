/*
|--------------------------------------------------------------------------
| Routes file
|--------------------------------------------------------------------------
|
| The routes file is used for defining the HTTP routes.
|
*/

const RegisterController = () => import('#src/players/controllers/register_controller')

import router from '@adonisjs/core/services/router'
import db from '@adonisjs/lucid/services/db'

router
  .on('/')
  .renderInertia('home', { version: 6, playersCount: await db.from('players').count('*') })

router.get('/register', [RegisterController, 'render'])
router.post('/register', [RegisterController, 'handle'])
