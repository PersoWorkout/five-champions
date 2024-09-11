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
const RejectGroupInvitationController = () =>
  import('#src/groups/controllers/reject_group_invitation_controller')
const AcceptGroupInvitationController = () =>
  import('#src/groups/controllers/accept_group_invitation_controller')
const EditPlayerController = () => import('#src/players/controllers/edit_player_controller')
const LogoutController = () => import('#src/players/controllers/logout_controller')
const GetGroupsController = () => import('#src/groups/controllers/get_groups_controller')
const CreateGroupController = () => import('#src/groups/controllers/create_group_controller')
const GetGroupByIdController = () => import('#src/groups/controllers/get_group_by_id_controller')
const CreateGroupInvitationController = () =>
  import('#src/groups/controllers/create_group_invitation_controller')
import router from '@adonisjs/core/services/router'
import { middleware } from './kernel.js'
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

    router.get('/groups/:id/invitations/create', [CreateGroupInvitationController, 'render'])
    router.post('/groups/:groupId/invitations/:playerId', [
      CreateGroupInvitationController,
      'handle',
    ])

    router.put('/groups/:groupId/invitations/accept', [AcceptGroupInvitationController, 'handle'])

    router.put('/groups/:groupId/invitations/reject', [RejectGroupInvitationController, 'handle'])
  })
  .use(middleware.auth())
