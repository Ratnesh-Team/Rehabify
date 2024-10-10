import SignInForm from './SignInForm'

const SignIn = () => {
    return (
        <>
            <div className="mb-8">
                <h3 className="mb-1">Welcome back!</h3>
                
            </div>
            <SignInForm disableSubmit={false} />
        </>
    )
}

export default SignIn
