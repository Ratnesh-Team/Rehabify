import { Alert } from '@/components/ui'
import React from 'react'

function Approval() {
    return (
        <div >
            <Alert showIcon className='pb-5'>
                Verifying Data.
            </Alert>
            <h1 className='pt-5 pb-10 text-center dark:text-red '>We are Verifying Your Nasha Mukti Kendra Detail </h1>
            <h3 className='text-center'>Usally it take 2-5 Days </h3>
        </div>
    )
}

export default Approval