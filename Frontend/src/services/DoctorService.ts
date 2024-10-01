import ApiService from './ApiService'

export async function getDoctor(params?: { [key: string]: string | null }) {
    return ApiService.fetchData<any>({
        url: '/doctor',
        method: 'get',
        params: params, // Add query parameters here
    })
}


export async function addDoctor(values: any) {
    return ApiService.fetchData<any>({
        url: '/addDoctor',
        method: 'POST',
        data: values,
    });
}

