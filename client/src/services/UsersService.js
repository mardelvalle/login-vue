import Api from '@/services/Api'

export default {
  fetchUsers () {
    return Api().get('auth/register')
  }

//   ,

//   addUser (params) {
//     return Api().post('add_user', params)
//   },

//   updateUser (params) {
//     return Api().put('users/' + params.id, params)
//   },

//   getUser (params) {
//     return Api().get('user/' + params.id)
//   },

//   deleteUser (id) {
//     return Api().delete('users/' + id)
//   }
}