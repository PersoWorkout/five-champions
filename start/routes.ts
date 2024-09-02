/*
|--------------------------------------------------------------------------
| Routes file
|--------------------------------------------------------------------------
|
| The routes file is used for defining the HTTP routes.
|
*/

const RegisterController = () => import('#src/players/controllers/register_controller')

import AllPlayersController from '#src/players/controllers/all_players_controller'
import router from '@adonisjs/core/services/router'

router.on('/').renderInertia('home', { version: 6 })

router.get('/register', [RegisterController, 'render'])
router.post('/register', [RegisterController, 'handle'])

router.get('/players/all', [AllPlayersController, 'render'])
