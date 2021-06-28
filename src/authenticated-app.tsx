import styled from "@emotion/styled";
import { Row } from "components/lib";
import { useAuth } from "context/auth-context"
import { ProjectListScreen } from "screens/project-list"

export const AuthenticatedApp = () => {
    const { logout } = useAuth();
    return <Container>
        <Header between={true}>
            <HeaderLeft gap={true}>
                <h2>logo</h2>
                <h2>项目</h2>
                <h2>用户</h2>
            </HeaderLeft>
            <HeaderRight><button onClick={logout}>登出</button></HeaderRight>
        </Header>
        <Main >
            <ProjectListScreen />
        </Main>
    </Container>
}


const Container = styled.div`
height: 100vh;
display: grid;
grid-template-rows: 6rem 1fr 6rem;
`
const Header = styled(Row)`
`

const HeaderLeft = styled(Row)``

const HeaderRight = styled.div`

`

const Main = styled.main`
height:calc(100vh-6rem);
`