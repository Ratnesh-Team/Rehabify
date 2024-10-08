import { apiSignIn, apiSignOut, apiSignUp } from '@/services/AuthService'
import {
    setUser,
    signInSuccess,
    signOutSuccess,
    useAppSelector,
    useAppDispatch,
} from '@/store'
import appConfig from '@/configs/app.config'
import { REDIRECT_URL_KEY } from '@/constants/app.constant'
import { useNavigate } from 'react-router-dom'
import useQuery from './useQuery'
import type { SignInCredential, SignUpCredential } from '@/@types/auth'
import { Sign } from 'crypto'
import SignUp from '@/views/auth/SignUp'
import { responsiveFontSizes } from '@mui/material'

type Status = 'success' | 'failed'

function useAuth() {
    const dispatch = useAppDispatch()

    const navigate = useNavigate()

    const query = useQuery()

    const { token, signedIn } = useAppSelector((state) => state.auth.session)

    const signIn = async (
        values: SignInCredential,
    ): Promise<
        | {
              status: Status
              message: any
          }
        | undefined
    > => {
        try {
            const resp = await apiSignIn(values)
            if (resp.data.data) {
                const { token } = resp.data.data
                console.log(token)
                dispatch(signInSuccess(token))
                if (resp.data.data.user) {
                    dispatch(
                        setUser(
                            resp.data.data.user || {
                                avatar: '',
                                userName: 'Anonymous',
                                authority: ['USER'],
                                email: '',
                            },
                        ),
                    )
                }
                const redirectUrl = query.get(REDIRECT_URL_KEY)
                navigate(
                    redirectUrl
                        ? redirectUrl
                        : appConfig.authenticatedEntryPath,
                )
                return {
                    status: 'success',
                    message: '',
                }
            }
            // eslint-disable-next-line  @typescript-eslint/no-explicit-any
        } catch (errors: any) {
            if (errors.message === 'Network Error') {
                    return {
                        status: 'failed',
                        message: 'Network error: Please check your connection',
                    }
                }

            return {
                status: 'failed',
                message: errors?.response?.data?.message || errors.toString(),
            }
        }
    }
    const signUp = async (values: SignUpCredential) => {
        try {
            const resp = await apiSignUp(values)
            if (resp.status === 200) {
                navigate(appConfig.unAuthenticatedEntryPath)
                return {
                    status: 'success',
                    message: 'Sign up successfully! Please sign in.',
                }
            } else {
                return {
                    status: 'failed',
                    message: "Can't sign up. Please try again.",
                }
            }
        } catch (error: any) {
            console.error('Error:', error)

            if (error.message === 'Network Error') {
                return {
                    status: 'failed',
                    message: 'Network error: Please check your connection.',
                }
            }
            if (
                error.response &&
                error.response.data &&
                error.response.data.message
            ) {
                console.error('Response message:', error.response.data.message)
                return {
                    status: 'failed',
                    message: error.response.data.message,
                }
            } else {
                console.error('Unknown error occurred.')
                return {
                    status: 'failed',
                    message: "Can't sign up. Please try again.",
                }
            }
        }
    }

    const handleSignOut = () => {
        dispatch(signOutSuccess())
        dispatch(
            setUser({
                avatar: '',
                userName: '',
                email: '',
                authority: [],
            }),
        )
        navigate(appConfig.unAuthenticatedEntryPath)
    }

    const signOut = async () => {
        handleSignOut()
    }
    return {
        authenticated: token && signedIn,
        signIn,
        signUp,
        signOut,
    }
}

export default useAuth
