"use client"

import { useState, useEffect } from 'react'

const useProvideAuth = () => {
    const [user, setUser] = useState(null)

    useEffect(() => {
        const fetchCurrentUser = async () => {
            const response = await fetch(`/server/auth/getUser`, {
                method: 'GET',
                credentials: 'include'
            })
            try {
                const userData = await response.json()
                setUser(userData)
            } catch (err) {
                // No user
                setUser(null)
            }
            if (response instanceof Object) {
                // To-do: put redirect logic here
            }
        }
        fetchCurrentUser()
    }, [])

    const logout = async () => {
        console.log('Logging out...')
        const response = await fetch(`/server/auth/logout`, {
            method: 'POST',
            credentials: 'include'
        })
        setUser(null)
    }

    const isAuthenticated = () => user ? true : 'unauthenticated'

    const checkAuth = true

    return {
        checkAuth,
        user,
        logout,
        isAuthenticated,
    }
}

export default useProvideAuth
