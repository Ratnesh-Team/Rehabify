import ApiService from './ApiService'

export async function getNMK(params?: { [key: string]: string | null }) {
    return ApiService.fetchData<any>({
        url: '/NMK',
        method: 'get',
        params: params, // Add query parameters here
    })
}
