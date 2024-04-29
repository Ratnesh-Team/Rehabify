import ApiService from './ApiService'

export async function getUsers() {
    return ApiService.fetchData<any>({
        url: '/users',
        method: 'get',
    })
}

// export const getkeys = () => {
//     setApil('secret')
//     const url = APP_API.getkey
//     return get(url).then((response) => response?.data)
// }
