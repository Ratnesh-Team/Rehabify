import ApiService from './ApiService'

export async function getHomeRemedies() {
    return ApiService.fetchData<any>({
        url: '/home-remedies',
        method: 'get',
    })
}
