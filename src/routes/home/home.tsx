import {useContext} from 'react';
import {AuthContext} from "../../contexts/authContext.tsx";
import {useNavigate} from "react-router-dom";
import {Box, Container, CssBaseline, styled} from "@mui/material";
import Sidebar from "../../components/Sidebar/Sidebar.tsx";
import {useGlobalState} from "../../contexts/globalProvider.tsx";
import TasksSection from "../../components/TasksSection/TasksSection.tsx";

const Main = styled('main', {shouldForwardProp: (prop) => prop !== 'open' && prop !== 'drawerWidth' })<{
    drawerWidth: number;
    open: boolean;
}>(({theme}) => ({
    flexGrow: 1,
    padding: theme.spacing(3),
    transition: theme.transitions.create('margin', {
        easing: theme.transitions.easing.sharp,
        duration: theme.transitions.duration.leavingScreen,
    }),
    marginLeft: ({drawerWidth}) => `-${drawerWidth}px`,
    variants: [
        {
            props: ({open}) => open,
            style: {
                transition: theme.transitions.create('margin', {
                    easing: theme.transitions.easing.easeOut,
                    duration: theme.transitions.duration.enteringScreen,
                }),
                marginLeft: 0,
            },
        },
    ],
}));

const Home = () => {
    const {theme, collapsed, collapseMenu} = useGlobalState();
    const authContext = useContext(AuthContext)
    const {currentUser} = authContext
    const navigate = useNavigate()

    const drawerWidth = !collapsed ? 240 : 60;
    return (
        <Box sx={{display: 'flex', height:'100%',width:'100%'}}>
            <CssBaseline/>
            <Sidebar/>
            <Container sx={{p:0, height:'100%',width:'100%', backgroundColor: '#f8f8f8'}} maxWidth="lg">
                <TasksSection/>
            </Container>
            {/*<Main drawerWidth={drawerWidth} open={!collapsed}>*/}
            {/*    <TasksSection/>*/}
            {/*</Main>*/}
        </Box>
    );
};

export default Home;