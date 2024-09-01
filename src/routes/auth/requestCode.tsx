import {useContext, useState} from 'react'

import {useNavigate} from 'react-router-dom'

import {useValidUsername} from '../../hooks/useAuthHooks'
import {Username} from '../../components/authComponents'

import {AuthContext} from '../../contexts/authContext'
import {Box, Button, Grid, Paper, styled, Typography} from "@mui/material";

const PREFIX = 'requestCode';

const classes = {
  root: `${PREFIX}-root`,
  hover: `${PREFIX}-hover`,
  text: `${PREFIX}-text`
};

const StyledGrid = styled(Grid)({
  [`& .${classes.root}`]: {
    height: '100vh',
  },
  [`& .${classes.hover}`]: {
    '&:hover': { cursor: 'pointer' },
  },
  [`& .${classes.text}`]: {
    textAlign: 'center',
  },
});

export default function RequestCode() {


  const { username, setUsername, usernameIsValid } = useValidUsername('')
  const [error, setError] = useState('')
  const [resetSent, setResetSent] = useState(false)

  const isValid = !usernameIsValid || username.length === 0

  const navigate = useNavigate()

  const authContext = useContext(AuthContext)

  const sendCodeClicked = async () => {
    try {
      await authContext.sendCode(username)
      setResetSent(true)
    } catch (err) {
      setError('Unknown user')
    }
  }

  const emailSent = (
    <>
      <Box mt={1}>
        <Typography className={classes.text} variant="h5">{`Reset Code Sent to ${username}`}</Typography>
      </Box>
      <Box mt={4}>
        <Button onClick={() => navigate('/forgotpassword')} color="primary" variant="contained">
          Reset Password
        </Button>
      </Box>
    </>
  )

  const sendCode = (
    <>
      <Box width="80%" m={1}>
        <Username usernameIsValid={usernameIsValid} setUsername={setUsername} />
      </Box>
      <Box mt={2}>
        <Typography color="error" variant="body2">
          {error}
        </Typography>
      </Box>

      <Box mt={2}>
        <StyledGrid container direction="row" justify="center">
          <Box m={1}>
            <Button color="secondary" variant="contained" onClick={() => navigate(-1)}>
              Cancel
            </Button>
          </Box>
          <Box m={1}>
            <Button disabled={isValid} color="primary" variant="contained" onClick={sendCodeClicked}>
              Send Code
            </Button>
          </Box>
        </StyledGrid>
      </Box>
    </>
  )

  return (
    <Grid className={classes.root} container direction="row" justify="center" alignItems="center">
      <Grid xs={11} sm={6} lg={4} container direction="row" justify="center" alignItems="center" item>
        <Paper style={{ width: '100%', padding: 32 }}>
          <Grid container direction="column" justify="center" alignItems="center">
            <Box m={2}>
              <Typography variant="h3">Send Reset Code</Typography>
            </Box>

            {resetSent ? emailSent : sendCode}
          </Grid>
        </Paper>
      </Grid>
    </Grid>
  )
}
