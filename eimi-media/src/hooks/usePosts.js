import { useState, useEffect, useCallback, useRef } from 'react'
import { supabase } from '../utils/supabase'

const POSTS_PER_PAGE = 10
const POSTS_SELECT = `
  *,
  profiles:user_id (
    id, username, full_name, avatar_url, is_admin
  )
`

// Escape characters that would break supabase .or() filter strings
const sanitizeSearchTerm = (term) => term.replace(/[(),]/g, ' ').trim()

export const usePosts = () => {
  const [posts, setPosts] = useState([])
  const [loading, setLoading] = useState(true)
  const [isSubmitting, setIsSubmitting] = useState(false)
  const [error, setError] = useState(null)
  const [hasMore, setHasMore] = useState(true)
  const [totalCount, setTotalCount] = useState(0)
  const pageRef = useRef(0)
  const didInitRef = useRef(false)

  // ============ READ: fetch posts with pagination ============
  const fetchPosts = useCallback(async (reset = true) => {
    try {
      setLoading(true)
      setError(null)

      const { count, error: countError } = await supabase
        .from('posts')
        .select('*', { count: 'exact', head: true })
      if (countError) throw countError
      setTotalCount(count || 0)

      const from = reset ? 0 : pageRef.current * POSTS_PER_PAGE
      const to = from + POSTS_PER_PAGE - 1

      const { data, error } = await supabase
        .from('posts')
        .select(POSTS_SELECT)
        .order('created_at', { ascending: false })
        .range(from, to)

      if (error) throw error

      if (reset) {
        setPosts(data || [])
        pageRef.current = 1
      } else {
        setPosts(prev => [...prev, ...(data || [])])
        pageRef.current += 1
      }
      setHasMore((data?.length || 0) === POSTS_PER_PAGE)
    } catch (err) {
      setError(err.message)
      console.error('Error fetching posts:', err)
    } finally {
      setLoading(false)
    }
  }, [])

  // Fetch once on mount (was firing twice before)
  useEffect(() => {
    if (didInitRef.current) return
    didInitRef.current = true
    fetchPosts(true)
  }, [fetchPosts])

  const refreshPosts = useCallback(() => fetchPosts(true), [fetchPosts])

  // ============ READ: single post ============
  const fetchPost = useCallback(async (postId) => {
    try {
      const { data, error } = await supabase
        .from('posts')
        .select(POSTS_SELECT)
        .eq('id', postId)
        .single()
      if (error) throw error
      return { data, error: null }
    } catch (err) {
      return { data: null, error: err.message }
    }
  }, [])

  // ============ READ: search (escaped) ============
  const searchPosts = useCallback(async (searchTerm) => {
    try {
      setLoading(true)
      setError(null)

      const term = sanitizeSearchTerm(searchTerm || '')
      if (!term) {
        await fetchPosts(true)
        return
      }

      const { data, error } = await supabase
        .from('posts')
        .select(POSTS_SELECT)
        .or(`header.ilike.%${term}%,content.ilike.%${term}%`)
        .order('created_at', { ascending: false })

      if (error) throw error
      setPosts(data || [])
      setTotalCount(data?.length || 0)
      setHasMore(false)
    } catch (err) {
      setError(err.message)
      console.error('Error searching posts:', err)
    } finally {
      setLoading(false)
    }
  }, [fetchPosts])

  // ============ CREATE ============
  const createPost = useCallback(async (header, content, imageUrl = null) => {
    try {
      setIsSubmitting(true)
      const { data: { user } } = await supabase.auth.getUser()
      if (!user) throw new Error('Please sign in to create a post')

      if (!header?.trim()) throw new Error('Header is required')
      if (!content?.trim()) throw new Error('Content is required')

      const { data, error } = await supabase
        .from('posts')
        .insert([{
          user_id: user.id,
          header: header.trim(),
          content: content.trim(),
          image_url: imageUrl || null
        }])
        .select(POSTS_SELECT)
        .single()

      if (error) throw error

      setPosts(prev => [data, ...prev])
      setTotalCount(prev => prev + 1)
      return { data, error: null }
    } catch (err) {
      console.error('Error creating post:', err)
      return { data: null, error: err.message }
    } finally {
      setIsSubmitting(false)
    }
  }, [])

  // ============ UPDATE ============
  const updatePost = useCallback(async (postId, updates) => {
    try {
      const { data: { user } } = await supabase.auth.getUser()
      if (!user) throw new Error('Not authenticated')

      const { data, error } = await supabase
        .from('posts')
        .update(updates)
        .eq('id', postId)
        .select(POSTS_SELECT)
        .single()

      if (error) throw error
      setPosts(prev => prev.map(p => p.id === postId ? data : p))
      return { data, error: null }
    } catch (err) {
      return { data: null, error: err.message }
    }
  }, [])

  // ============ DELETE ============
  const deletePost = useCallback(async (postId) => {
    try {
      const { data: { user } } = await supabase.auth.getUser()
      if (!user) throw new Error('Please sign in')

      const { error } = await supabase.from('posts').delete().eq('id', postId)
      if (error) throw error

      setPosts(prev => prev.filter(p => p.id !== postId))
      setTotalCount(prev => Math.max(0, prev - 1))
      return { error: null }
    } catch (err) {
      console.error('Error deleting post:', err)
      return { error: err.message }
    }
  }, [])

  // ============ Infinite scroll ============
  const loadMore = useCallback(async () => {
    if (loading || !hasMore) return
    await fetchPosts(false)
  }, [loading, hasMore, fetchPosts])

  return {
    posts, loading, isSubmitting, error, hasMore, totalCount,
    createPost, fetchPost, updatePost, deletePost,
    searchPosts, loadMore, refreshPosts
  }
}
