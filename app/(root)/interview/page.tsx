import Agent from '@/components/shared/Agent'
import React from 'react'

const page = () => {
    return (
        <>
            <h3>Interview Generation</h3>
            <Agent
                userName="John Doe"
                type="generate"
                userId="123"
            />
        </>
    )
}

export default page