import { lazy } from 'react'
import authRoute from './authRoute'
import type { Routes } from '@/@types/routes'
import { ADMIN } from '@/constants/roles.constant'

export const publicRoutes: Routes = [...authRoute]

export const protectedRoutes = [
    {
        key: 'home',
        path: '/home',
        component: lazy(() => import('@/views/Home')),
        authority: ['USER'],
    },

    {
        key: 'database',
        path: '/database',
        component: lazy(() => import('@/views/Database')),
        authority: ['USER'],
    },
    {
        key: 'treatment-centers',
        path: '/treatment-centers',
        component: lazy(
            () => import('@/views/TreatmentCenters/TreatmentCenters'),
        ),
        authority: ['USER'],
    },
    {
        key: 'ngo',
        path: '/ngo',
        component: lazy(() => import('@/views/Ngo')),
        authority: ['USER'],
    },
    {
        key: 'home-remedies',
        path: '/home-remedies',
        component: lazy(() => import('@/views/HomeRemedies/HomeRemedies')),
        authority: ['USER'],
    },
    {
        key: 'community',
        path: '/community',
        component: lazy(() => import('@/views/Community')),
        authority: ['USER'],
    },
    {
        key: 'register',
        path: '/Register',
        component: lazy(() => import('@/views/Register/landingpage')),
        authority: ['ADMIN'],
    },
    {
        key: 'NMK',
        path: '/NMK',
        component: lazy(() => import('@/views/NMK')),
        authority: ['USER'],
    },
    {
        key: 'approval',
        path: '/Register/approval',
        component: lazy(() => import('@/views/Register/approval')),
        authority: ['ADMIN'],
    },
    {
        key: 'doctor',
        path: '/Doctor',
        component: lazy(() => import('@/views/Doctor/popup')),
        authority: ['USER'],
    },
    {
        key: 'blog1',
        path: '/blog1',
        component: lazy(() => import('@/views/HomeRemedies/blog1')),
        authority: ['USER'],
    },
    {
        key: 'blog2',
        path: '/blog2',
        component: lazy(() => import('@/views/HomeRemedies/blog2')),
    },
    {
        key: 'blog3',
        path: '/blog3',
        component: lazy(() => import('@/views/HomeRemedies/blog3')),
    },
    {
        key: 'blog4',
        path: '/blog4',
        component: lazy(() => import('@/views/HomeRemedies/blog4')),
    },
    {
        key: 'super-admin',
        path: '/superadmin',
        component: lazy(() => import('@/views/superadmin')),
    },
]
