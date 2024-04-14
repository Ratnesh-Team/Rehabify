import { lazy } from 'react'
import authRoute from './authRoute'
import type { Routes } from '@/@types/routes'

export const publicRoutes: Routes = [...authRoute]

export const protectedRoutes = [
    {
        key: 'home',
        path: '/',
        component: lazy(() => import('@/views/Home')),
        authority: [],
    },

    {
        key: 'database',
        path: '/database',
        component: lazy(() => import('@/views/Database')),
        authority: [],
    },
    {
        key: 'treatment-centers',
        path: '/treatment-centers',
        component: lazy(() => import('@/views/TreatmentCenters/TreatmentCenters')),
        authority: [],
    },
    {
        key: 'ngo',
        path: '/ngo',
        component: lazy(() => import('@/views/Ngo')),
        authority: [],
    },
    {
        key: 'home-remedies',
        path: '/home-remedies',
        component: lazy(() => import('@/views/HomeRemedies')),
        authority: [],
    },
    {
        key: 'community',
        path: '/community',
        component: lazy(() => import('@/views/Community')),
        authority: [],
    },
    {
        key: 'register',
        path: '/Register',
        component: lazy(() => import('@/views/Register')),
        authority: [],
    },
    {
        key: 'NMK',
        path: '/NMK',
        component: lazy(() => import('@/views/NMK')),
        authority: [],
    },
]
