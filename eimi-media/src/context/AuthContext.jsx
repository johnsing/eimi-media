import { createContext, useContext, useState, useEffect } from 'react'
import { supabase } from '../utils/supabase'

const AuthContext = createContext(null)

export const AuthProvider = ({ children }) => {
  const [user, setUser] = useState(null)
  const [profile, setProfile] = useState(null)
  const [loading, setLoading] = useState(true)
  const [isAdmin, setIsAdmin] = useState(false)
  const [authError, setAuthError] = useState(null)

  const fetchProfile = async (userId) => {
    try {
      const { data, error } = await supabase
        .from('profiles')
        .select('*')
        .eq('id', userId)
        .single()
      
      if (error) {
        console.error('Error fetching profile:', error)
        return null
      }
      
      if (data) {
        setProfile(data)
        setIsAdmin(data.is_admin || false)
      }
      return data
    } catch (error) {
      console.error('Error in fetchProfile:', error)
      return null
    }
  }

  const signIn = async (email, password) => {
    try {
      setAuthError(null)
      const { data, error } = await supabase.auth.signInWithPassword({ 
        email, 
        password 
      })
      
      if (error) {
        console.error('Sign in error:', error)
        setAuthError(error.message)
        return { data: null, error }
      }
      
      if (data.user) {
        await fetchProfile(data.user.id)
        setUser(data.user)
      }
      
      return { data, error: null }
    } catch (error) {
      console.error('Error in signIn:', error)
      setAuthError(error.message)
      return { data: null, error }
    }
  }

  const signUp = async (email, password, username, fullName) => {
    try {
      setAuthError(null)
      const { data, error } = await supabase.auth.signUp({
        email,
        password,
        options: { 
          data: { 
            username, 
            full_name: fullName,
            is_admin: false
          } 
        }
      })

      if (error) {
        console.error('Sign up error:', error)
        setAuthError(error.message)
        return { data: null, error }
      }

      if (!error && data.user) {
        const { error: profileError } = await supabase
          .from('profiles')
          .insert([{ 
            id: data.user.id, 
            username, 
            full_name: fullName,
            is_admin: false 
          }])
        
        if (profileError) {
          console.error('Profile creation error:', profileError)
          setAuthError(profileError.message)
          return { data: null, error: profileError }
        }
        
        await fetchProfile(data.user.id)
        setUser(data.user)
      }

      return { data, error: null }
    } catch (error) {
      console.error('Error in signUp:', error)
      setAuthError(error.message)
      return { data: null, error }
    }
  }

  const signOut = async () => {
    try {
      setAuthError(null)
      console.log('Attempting to sign out...')
      
      const { error } = await supabase.auth.signOut()
      
      if (error) {
        console.error('Sign out error:', error)
        setAuthError(error.message)
        return { error }
      }
      
      console.log('Sign out successful, clearing state...')
      
      // Clear all state immediately
      setUser(null)
      setProfile(null)
      setIsAdmin(false)
      
      // Clear any stored session data
      sessionStorage.clear()
      
      return { error: null }
    } catch (error) {
      console.error('Error in signOut:', error)
      setAuthError(error.message)
      // Still try to clear state
      setUser(null)
      setProfile(null)
      setIsAdmin(false)
      return { error }
    }
  }

  const makeAdmin = async (userId) => {
    const { error } = await supabase.from('profiles').update({ is_admin: true }).eq('id', userId)
    if (!error && userId === user?.id) setIsAdmin(true)
    return { error }
  }

  const removeAdmin = async (userId) => {
    const { error } = await supabase.from('profiles').update({ is_admin: false }).eq('id', userId)
    if (!error && userId === user?.id) setIsAdmin(false)
    return { error }
  }

  const getAllUsers = async () => {
    return supabase.from('profiles').select('*').order('created_at', { ascending: false })
  }

  // Check auth state on mount
  useEffect(() => {
    const initAuth = async () => {
      try {
        setLoading(true)
        const { data: { session }, error } = await supabase.auth.getSession()
        
        if (error) {
          console.error('Session error:', error)
          setLoading(false)
          return
        }
        
        const currentUser = session?.user || null
        setUser(currentUser)
        
        if (currentUser) {
          await fetchProfile(currentUser.id)
        }
      } catch (error) {
        console.error('Auth initialization error:', error)
      } finally {
        setLoading(false)
      }
    }

    initAuth()

    // Listen for auth changes
    const { data: { subscription } } = supabase.auth.onAuthStateChange(
      async (event, session) => {
        console.log('Auth state changed:', event)
        const currentUser = session?.user || null
        setUser(currentUser)
        
        if (currentUser) {
          await fetchProfile(currentUser.id)
        } else {
          setProfile(null)
          setIsAdmin(false)
        }
        setLoading(false)
      }
    )

    return () => {
      subscription.unsubscribe()
    }
  }, [])

  const value = { 
    user, 
    profile, 
    loading, 
    isAdmin,
    authError,
    signIn, 
    signUp, 
    signOut,
    makeAdmin,
    removeAdmin,
    getAllUsers
  }

  return <AuthContext.Provider value={value}>{children}</AuthContext.Provider>
}

export const useAuth = () => {
  const context = useContext(AuthContext)
  if (!context) {
    throw new Error('useAuth must be used within AuthProvider')
  }
  return context
}