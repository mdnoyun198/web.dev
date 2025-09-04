import React from 'react'
import { useParams } from 'react-router-dom'

const User = () => {

    const params = useParams()

    return (
        <div className='had-text'>

            <h1>I am user {params.username}</h1>

        </div>
    )
}

export default User
