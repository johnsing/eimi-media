import styled from 'styled-components'
import { useState, useEffect } from 'react'
import { supabase } from '../utils/supabase'
import { useAuth } from '../hooks/useAuth'
import { Button } from '../components/common/Button'
import { Input } from '../components/common/Input'

const Container = styled.div`
  margin: 0 auto;
  padding: 20px;
  max-width: 900px;
`

const Header = styled.div`
  background: ${props => props.theme.colors.backgroundWhite};
  border-radius: 16px;
  padding: 24px;
  margin-bottom: 24px;
  box-shadow: ${props => props.theme.shadows.sm};

  h1 {
    color: ${props => props.theme.colors.text};
    margin-bottom: 8px;
  }

  p {
    color: ${props => props.theme.colors.textLight};
  }
`

const Notice = styled.div`
  background: ${props => `${props.theme.colors.warning}20`};
  border: 1px solid ${props => `${props.theme.colors.warning}50`};
  color: ${props => props.theme.colors.text};
  border-radius: 12px;
  padding: 12px 16px;
  margin-bottom: 20px;
  font-size: 14px;
`

const Card = styled.div`
  background: ${props => props.theme.colors.backgroundWhite};
  border-radius: 16px;
  padding: 24px;
  margin-bottom: 20px;
  box-shadow: ${props => props.theme.shadows.sm};
  overflow-x: auto;
`

const CardTitle = styled.h3`
  color: ${props => props.theme.colors.text};
  margin-bottom: 16px;
  display: flex;
  align-items: center;
  gap: 8px;
`

const Table = styled.table`
  width: 100%;
  border-collapse: collapse;
  margin-top: 16px;

  th {
    text-align: left;
    padding: 12px;
    background: ${props => props.theme.colors.backgroundLight};
    font-weight: 600;
    color: ${props => props.theme.colors.text};
  }

  td {
    padding: 12px;
    border-bottom: 1px solid ${props => props.theme.colors.border};
    color: ${props => props.theme.colors.text};
  }

  tr:hover {
    background: ${props => props.theme.colors.backgroundLight};
  }
`

const Badge = styled.span`
  background: ${props => props.$admin ? props.theme.colors.primary : props.theme.colors.border};
  color: ${props => props.$admin ? 'white' : props.theme.colors.textLight};
  padding: 4px 12px;
  border-radius: 12px;
  font-size: 12px;
  font-weight: 500;
`

const Stats = styled.div`
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(150px, 1fr));
  gap: 16px;
  margin-top: 16px;
`

const StatCard = styled.div`
  background: ${props => props.theme.colors.backgroundLight};
  padding: 16px;
  border-radius: 12px;
  text-align: center;

  .number {
    font-size: 28px;
    font-weight: 700;
    color: ${props => props.theme.colors.text};
  }

  .label {
    color: ${props => props.theme.colors.textLight};
    font-size: 14px;
    margin-top: 4px;
  }
`

const SearchInput = styled(Input)`
  max-width: 300px;
  margin-bottom: 16px;
`

const ActionButton = styled(Button)`
  padding: 4px 12px;
  font-size: 12px;
  margin-right: 8px;
`

// ============ PUBLIC DASHBOARD ============
// Anyone can view stats and lists. Management actions require an
// authenticated admin — RLS would reject anonymous writes anyway,
// so we gate the buttons client-side for a clearer experience.

const AdminPanel = () => {
  const { isAdmin, loading: authLoading, user } = useAuth()
  const canManage = Boolean(user && isAdmin)

  const [users, setUsers] = useState([])
  const [posts, setPosts] = useState([])
  const [stats, setStats] = useState({})
  const [loading, setLoading] = useState(true)
  const [readError, setReadError] = useState(null)
  const [searchTerm, setSearchTerm] = useState('')

  useEffect(() => {
    fetchAllData()
  }, [])

  const fetchAllData = async () => {
    try {
      setLoading(true)
      setReadError(null)

      const { data: usersData, error: usersError } = await supabase
        .from('profiles')
        .select('*')
        .order('created_at', { ascending: false })

      // Anonymous visitors may be blocked by RLS — degrade gracefully
      if (usersError) setReadError(usersError.message)

      const { data: postsData } = await supabase
        .from('posts')
        .select(`
          *,
          profiles:user_id (username, full_name)
        `)
        .order('created_at', { ascending: false })

      const { count: userCount } = await supabase
        .from('profiles')
        .select('*', { count: 'exact', head: true })

      const { count: postCount } = await supabase
        .from('posts')
        .select('*', { count: 'exact', head: true })

      const { count: adminCount } = await supabase
        .from('profiles')
        .select('*', { count: 'exact', head: true })
        .eq('is_admin', true)

      setUsers(usersData || [])
      setPosts(postsData || [])
      setStats({
        users: userCount || 0,
        posts: postCount || 0,
        admins: adminCount || 0
      })
    } catch (error) {
      console.error('Error fetching data:', error)
      setReadError(error.message)
    } finally {
      setLoading(false)
    }
  }

  const guardAction = () => {
    if (canManage) return true
    alert('Sign in with an admin account to make changes.')
    return false
  }

  const toggleAdmin = async (userId, currentStatus) => {
    if (!guardAction()) return
    if (!window.confirm(`Are you sure you want to ${currentStatus ? 'remove admin' : 'make admin'} this user?`)) {
      return
    }

    try {
      const { error } = await supabase
        .from('profiles')
        .update({ is_admin: !currentStatus })
        .eq('id', userId)

      if (error) throw error

      setUsers(users.map(u =>
        u.id === userId ? { ...u, is_admin: !currentStatus } : u
      ))
      alert('User permissions updated successfully!')
    } catch (error) {
      console.error('Error updating user:', error)
      alert('Error updating user permissions: ' + error.message)
    }
  }

  const deletePost = async (postId) => {
    if (!guardAction()) return
    if (!window.confirm('Are you sure you want to delete this post?')) {
      return
    }

    try {
      const { error } = await supabase
        .from('posts')
        .delete()
        .eq('id', postId)

      if (error) throw error

      setPosts(posts.filter(post => post.id !== postId))
      alert('Post deleted successfully!')
    } catch (error) {
      console.error('Error deleting post:', error)
      alert('Error deleting post: ' + error.message)
    }
  }

  const deleteUser = async (userId) => {
    if (!guardAction()) return
    if (!window.confirm('Are you sure you want to delete this user and all their content?')) {
      return
    }

    try {
      await supabase.from('posts').delete().eq('user_id', userId)
      const { error } = await supabase.from('profiles').delete().eq('id', userId)
      if (error) throw error

      setUsers(users.filter(u => u.id !== userId))
      alert('User deleted successfully!')
    } catch (error) {
      console.error('Error deleting user:', error)
      alert('Error deleting user: ' + error.message)
    }
  }

  const filteredUsers = users.filter(u =>
    u.username?.toLowerCase().includes(searchTerm.toLowerCase()) ||
    u.full_name?.toLowerCase().includes(searchTerm.toLowerCase()) ||
    u.email?.toLowerCase().includes(searchTerm.toLowerCase())
  )

  if (loading || authLoading) {
    return (
      <Container>
        <div style={{ textAlign: 'center', padding: '40px' }}>
          Loading dashboard...
        </div>
      </Container>
    )
  }

  return (
    <Container>
      <Header>
        <h1>📊 Dashboard</h1>
        <p>Community overview and management{canManage ? '' : ' (view mode)'}</p>
      </Header>

      {readError && (
        <Notice>
          ⚠️ Some data is hidden by Supabase row-level security for anonymous
          visitors. Run the public-read policy (see README) or sign in to see
          everything. Details: {readError}
        </Notice>
      )}

      {!canManage && (
        <Notice>
          🔒 You're browsing in view-only mode. Sign in with an admin account
          to manage users and posts.
        </Notice>
      )}

      {/* Stats */}
      <Card>
        <CardTitle>📈 Statistics</CardTitle>
        <Stats>
          <StatCard>
            <div className="number">{stats.users}</div>
            <div className="label">Total Users</div>
          </StatCard>
          <StatCard>
            <div className="number">{stats.posts}</div>
            <div className="label">Total Posts</div>
          </StatCard>
          <StatCard>
            <div className="number">{stats.admins}</div>
            <div className="label">Admins</div>
          </StatCard>
        </Stats>
      </Card>

      {/* Users */}
      <Card>
        <CardTitle>👥 Users</CardTitle>
        <SearchInput
          placeholder="Search users..."
          value={searchTerm}
          onChange={(e) => setSearchTerm(e.target.value)}
        />
        <Table>
          <thead>
            <tr>
              <th>User</th>
              <th>Username</th>
              <th>Role</th>
              {canManage && <th>Actions</th>}
            </tr>
          </thead>
          <tbody>
            {filteredUsers.map(u => (
              <tr key={u.id}>
                <td>{u.full_name || 'N/A'}</td>
                <td>@{u.username}</td>
                <td>
                  <Badge $admin={u.is_admin}>
                    {u.is_admin ? 'Admin' : 'User'}
                  </Badge>
                </td>
                {canManage && (
                  <td>
                    <ActionButton
                      $primary={!u.is_admin}
                      onClick={() => toggleAdmin(u.id, u.is_admin)}
                      style={{
                        background: u.is_admin ? '#e0245e' : undefined,
                        color: 'white',
                        border: 'none'
                      }}
                    >
                      {u.is_admin ? 'Remove Admin' : 'Make Admin'}
                    </ActionButton>
                    <ActionButton
                      style={{ background: '#e0245e', color: 'white', border: 'none' }}
                      onClick={() => deleteUser(u.id)}
                    >
                      Delete
                    </ActionButton>
                  </td>
                )}
              </tr>
            ))}
            {filteredUsers.length === 0 && (
              <tr><td colSpan={canManage ? 4 : 3}>No users found</td></tr>
            )}
          </tbody>
        </Table>
      </Card>

      {/* Posts */}
      <Card>
        <CardTitle>📝 Recent Posts</CardTitle>
        <Table>
          <thead>
            <tr>
              <th>Author</th>
              <th>Content</th>
              <th>Created</th>
              {canManage && <th>Actions</th>}
            </tr>
          </thead>
          <tbody>
            {posts.slice(0, 20).map(post => (
              <tr key={post.id}>
                <td>{post.profiles?.full_name || post.profiles?.username || 'Unknown'}</td>
                <td style={{ maxWidth: '200px', overflow: 'hidden', textOverflow: 'ellipsis' }}>
                  {post.header || post.content?.slice(0, 60) || '—'}
                </td>
                <td style={{ fontSize: '12px' }}>
                  {new Date(post.created_at).toLocaleDateString()}
                </td>
                {canManage && (
                  <td>
                    <ActionButton
                      style={{ background: '#e0245e', color: 'white', border: 'none' }}
                      onClick={() => deletePost(post.id)}
                    >
                      Delete
                    </ActionButton>
                  </td>
                )}
              </tr>
            ))}
            {posts.length === 0 && (
              <tr><td colSpan={canManage ? 4 : 3}>No posts yet</td></tr>
            )}
          </tbody>
        </Table>
      </Card>
    </Container>
  )
}

export default AdminPanel
