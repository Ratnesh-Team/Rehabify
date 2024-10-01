import ApiService from './ApiService'

export async function getUsers(params?: { [key: string]: string|null  }) {
    return ApiService.fetchData<any>({
        url: '/users',
        method: 'get',
        params: params, // Add query parameters here
    })
}


// export const getkeys = () => {
//     setApil('secret')
//     const url = APP_API.getkey
//     return get(url).then((response) => response?.data)
// }
