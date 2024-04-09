import ApiService from './ApiService'


export async function getUsers() {
    return ApiService.fetchData({
        url: '/users',
        method: 'get',
    })

}