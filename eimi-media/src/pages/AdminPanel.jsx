import styled from 'styled-components'
import { useState, useEffect } from 'react'
import { supabase } from '../utils/supabase'
import { useAuth } from '../hooks/useAuth'
import { Button } from '../components/common/Button'
import { Input } from '../components/common/Input'

const Container = styled.div`
  margin: 0 auto;
  padding: 20px;
`

const Header = styled.div`
  background: white;
  border-radius: 16px;
  padding: 24px;
  margin-bottom: 24px;
  box-shadow: 0 1px 3px rgba(0, 0, 0, 0.1);

  h1 {
    color: #14171a;
    margin-bottom: 8px;
  }

  p {
    color: #657786;
  }
`

const Card = styled.div`
  background: white;
  border-radius: 16px;
  padding: 24px;
  margin-bottom: 20px;
  box-shadow: 0 1px 3px rgba(0, 0, 0, 0.1);
`

const CardTitle = styled.h3`
  color: #14171a;
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
    background: #f5f8fa;
    font-weight: 600;
    color: #14171a;
  }

  td {
    padding: 12px;
    border-bottom: 1px solid #e6ecf0;
  }

  tr:hover {
    background: #f5f8fa;
  }
`

const Badge = styled.span`
  background: ${props => props.$admin ? '#1da1f2' : '#e6ecf0'};
  color: ${props => props.$admin ? 'white' : '#657786'};
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
  background: #f5f8fa;
  padding: 16px;
  border-radius: 12px;
  text-align: center;

  .number {
    font-size: 28px;
    font-weight: 700;
    color: #14171a;
  }

  .label {
    color: #657786;
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
  margin: 0 4px;
`

const AdminPanel = () => {
  const { isAdmin, loading: authLoading, user } = useAuth()
  const [users, setUsers] = useState([])
  const [posts, setPosts] = useState([])
  const [stats, setStats] = useState({})
  const [loading, setLoading] = useState(true)
  const [searchTerm, setSearchTerm] = useState('')
  const [selectedUser, setSelectedUser] = useState(null)

  useEffect(() => {
    if (isAdmin) {
      fetchAllData()
    }
  }, [isAdmin])

  const fetchAllData = async () => {
    try {
      setLoading(true)

      // Fetch users
      const { data: usersData } = await supabase
        .from('profiles')
        .select('*')
        .order('created_at', { ascending: false })

      // Fetch posts
      const { data: postsData } = await supabase
        .from('posts')
        .select(`
          *,
          profiles:user_id (username, full_name)
        `)
        .order('created_at', { ascending: false })

      // Fetch stats
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
    } finally {
      setLoading(false)
    }
  }

  const toggleAdmin = async (userId, currentStatus) => {
    if (!window.confirm(`Are you sure you want to ${currentStatus ? 'remove admin' : 'make admin'} this user?`)) {
      return
    }

    try {
      const { error } = await supabase
        .from('profiles')
        .update({ is_admin: !currentStatus })
        .eq('id', userId)

      if (error) throw error

      // Update local state
      setUsers(users.map(user => 
        user.id === userId 
          ? { ...user, is_admin: !currentStatus }
          : user
      ))
      
      alert('User permissions updated successfully!')
    } catch (error) {
      console.error('Error updating user:', error)
      alert('Error updating user permissions')
    }
  }

  const deletePost = async (postId) => {
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
      alert('Error deleting post')
    }
  }

  const deleteUser = async (userId) => {
    if (!window.confirm('Are you sure you want to delete this user and all their content?')) {
      return
    }

    try {
      // Delete user's posts
      await supabase
        .from('posts')
        .delete()
        .eq('user_id', userId)

      // Delete user's profile
      const { error } = await supabase
        .from('profiles')
        .delete()
        .eq('id', userId)

      if (error) throw error

      setUsers(users.filter(user => user.id !== userId))
      alert('User deleted successfully!')
    } catch (error) {
      console.error('Error deleting user:', error)
      alert('Error deleting user')
    }
  }

  const filteredUsers = users.filter(user =>
    user.username?.toLowerCase().includes(searchTerm.toLowerCase()) ||
    user.full_name?.toLowerCase().includes(searchTerm.toLowerCase()) ||
    user.email?.toLowerCase().includes(searchTerm.toLowerCase())
  )

  if (authLoading || (user && isAdmin && loading)) {
    return (
      <Container>
        <div style={{ textAlign: 'center', padding: '40px' }}>
          Loading admin panel...
        </div>
      </Container>
    )
  }

  if (!user || !isAdmin) {
    return (
      <Container>
        <div style={{ textAlign: 'center', padding: '40px' }}>
          <h2>🔒 Admins only</h2>
          <p>Sign in with an admin account to access this panel.</p>
        </div>
      </Container>
    )
  }

  return (
    <Container>
      <Header>
        <h1>🔐 Admin Panel</h1>
        <p>Manage users, posts, and system settings</p>
      </Header>

      {/* Stats */}
      <Card>
        <CardTitle>📊 Statistics</CardTitle>
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
        <CardTitle>👥 Manage Users</CardTitle>
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
              <th>Actions</th>
            </tr>
          </thead>
          <tbody>
            {filteredUsers.map(user => (
              <tr key={user.id}>
                <td>{user.full_name || 'N/A'}</td>
                <td>@{user.username}</td>
                <td>
                  <Badge $admin={user.is_admin}>
                    {user.is_admin ? 'Admin' : 'User'}
                  </Badge>
                </td>
                <td>
                  <ActionButton 
                    $primary={!user.is_admin}
                    onClick={() => toggleAdmin(user.id, user.is_admin)}
                    style={{ 
                      background: user.is_admin ? '#e0245e' : '#1da1f2',
                      color: 'white',
                      border: 'none'
                    }}
                  >
                    {user.is_admin ? 'Remove Admin' : 'Make Admin'}
                  </ActionButton>
                  <ActionButton 
                    style={{ 
                      background: '#e0245e',
                      color: 'white',
                      border: 'none'
                    }}
                    onClick={() => deleteUser(user.id)}
                  >
                    Delete
                  </ActionButton>
                </td>
              </tr>
            ))}
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
              <th>Actions</th>
            </tr>
          </thead>
          <tbody>
            {posts.slice(0, 20).map(post => (
              <tr key={post.id}>
                <td>{post.profiles?.full_name || post.profiles?.username}</td>
                <td style={{ maxWidth: '200px', overflow: 'hidden', textOverflow: 'ellipsis' }}>
                  {post.content}
                </td>
                <td style={{ fontSize: '12px' }}>
                  {new Date(post.created_at).toLocaleDateString()}
                </td>
                <td>
                  <ActionButton 
                    style={{ 
                      background: '#e0245e',
                      color: 'white',
                      border: 'none'
                    }}
                    onClick={() => deletePost(post.id)}
                  >
                    Delete
                  </ActionButton>
                </td>
              </tr>
            ))}
          </tbody>
        </Table>
      </Card>
    </Container>
  )
}

export default AdminPanel