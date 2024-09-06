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
const GetCurrentPlayerController = () =>
  import('#src/players/controllers/get_current_player_controller')

import router from '@adonisjs/core/services/router'
import { middleware } from './kernel.js'
import EditPlayerController from '#src/players/controllers/edit_player_controller'
import LogoutController from '#src/players/controllers/logout_controller'
import GetGroupsController from '#src/groups/controllers/get_groups_controller'
import CreateGroupController from '#src/groups/controllers/create_group_controller'
import GetGroupByIdController from '#src/groups/controllers/get_group_by_id_controller'

router.on('/').renderInertia('home', { version: 6 }).use(middleware.silent())

router.get('/auth/register', [RegisterController, 'render'])
router.post('/auth/register', [RegisterController, 'handle'])

router.get('/auth/login', [LoginController, 'render'])
router.post('/auth/login', [LoginController, 'handle'])

router
  .group(() => {
    router.get('auth/me', [GetCurrentPlayerController, 'render'])
    router.post('/auth/logout', [LogoutController, 'handle'])

    router.put('players/edit', [EditPlayerController, 'handle'])

    router.get('/players/all', [AllPlayersController, 'render'])

    router.get('/groups/all', [GetGroupsController, 'render'])

    router.get('/groups/create', [CreateGroupController, 'render'])
    router.post('/groups', [CreateGroupController, 'handle'])

    router.get('/groups/:id', [GetGroupByIdController, 'render'])
  })
  .use(middleware.auth())
