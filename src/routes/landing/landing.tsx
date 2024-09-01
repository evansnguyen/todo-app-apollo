import {useNavigate} from 'react-router-dom'

import logoImage from '../../assets/cognito-logo.png'
import {Box, Button, Grid, Link, styled, Typography} from "@mui/material";
import GitHubIcon from '@mui/icons-material/GitHub';

const PREFIX = 'Landing';

const classes = {
    root: `${PREFIX}-root`,
    title: `${PREFIX}-title`
};

const StyledGrid = styled(Grid)((
    {
        theme
    }
) => ({
    [`& .${classes.root}`]: {
        height: '100vh',
    },

    [`& .${classes.title}`]: {
        textAlign: 'center',
    }
}));

const Landing: React.FunctionComponent = () => {
    const navigate = useNavigate()

    const signIn = () => {
        navigate('/signin')
    }

    return (
        (<StyledGrid container>
            <Grid className={classes.root} container direction="column" justify="center" alignItems="center">
                <Box m={2}>
                    <img src={logoImage} width={224} height={224} alt="logo" />
                </Box>
                <Box m={2}>
                    <Link underline="none" color="inherit" href="https://github.com/dbroadhurst/aws-cognito-react">
                        <Grid container direction="row" justify="center" alignItems="center">
                            <Box mr={3}>
                                <GitHubIcon fontSize="large" />
                            </Box>
                            <Typography className={classes.title} variant="h3">
                                AWS Cognito Starter
                            </Typography>
                        </Grid>
                    </Link>
                </Box>
                <Box m={2}>
                    <Button onClick={signIn} variant="contained" color="primary">
                        SIGN IN
                    </Button>
                </Box>
            </Grid>
        </StyledGrid>)
    );
}

export default Landing
