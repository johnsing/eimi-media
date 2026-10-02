import styled from 'styled-components'

const Container = styled.div`
  margin: 0 auto;
  padding: 20px;
`

const Card = styled.div`
  background: white;
  border-radius: 0px 0px 16px 16px;
  padding: 60px 40px;
  text-align: center;
  box-shadow: 0 1px 3px rgba(0, 0, 0, 0.1);

  .icon {
    font-size: 64px;
    margin-bottom: 16px;
  }

  h2 {
    color: #14171a;
    margin-bottom: 8px;
  }

  p {
    color: #657786;
  }
`

const LibraryPage = () => {
  return (
    <Container>
      <Card>
        <div className="icon">📚</div>
      </Card>
    </Container>
  )
}

export default LibraryPage