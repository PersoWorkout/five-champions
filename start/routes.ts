/*
|--------------------------------------------------------------------------
| Routes file
|--------------------------------------------------------------------------
|
| The routes file is used for defining the HTTP routes.
|
*/

const RegisterController = () => import('#src/players/controllers/register_controller')
const LoginController = () => import('#src/players/controllers/login_controller')
const AllPlayersController = () => import('#src/players/controllers/all_players_controller')

import router from '@adonisjs/core/services/router'
import { middleware } from './kernel.js'

router.on('/').renderInertia('home', { version: 6 })

router.get('/auth/register', [RegisterController, 'render'])
router.post('/auth/register', [RegisterController, 'handle'])

router.get('/auth/login', [LoginController, 'render'])
router.post('/auth/login', [LoginController, 'handle'])

router.get('/players/all', [AllPlayersController, 'render']).use(middleware.auth())
