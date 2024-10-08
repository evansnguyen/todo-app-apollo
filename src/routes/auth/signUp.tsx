import {useContext, useState} from 'react'

import {useNavigate} from 'react-router-dom'

import {useValidEmail, useValidPassword, useValidUsername} from '../../hooks/useAuthHooks'
import {Email, Password, Username} from '../../components/authComponents'

import {AuthContext} from '../../contexts/authContext'
import {Box, Button, Grid, Paper, styled, Typography} from "@mui/material";

const PREFIX = 'SignUp';

const classes = {
  root: `${PREFIX}-root`
};

const StyledGrid = styled(Grid)({
  [`& .${classes.root}`]: {
    height: '100vh',
  },
});

const SignUp: React.FunctionComponent<{}> = () => {
  const { email, setEmail, emailIsValid } = useValidEmail('')
  const { password, setPassword, passwordIsValid } = useValidPassword('')
  const { username, setUsername, usernameIsValid } = useValidUsername('')
  const [error, setError] = useState('')
  const [created, setCreated] = useState(false)

  const {
    password: passwordConfirm,
    setPassword: setPasswordConfirm,
    passwordIsValid: passwordConfirmIsValid,
  } = useValidPassword('')

  const isValid =
    !emailIsValid ||
    email.length === 0 ||
    !usernameIsValid ||
    username.length === 0 ||
    !passwordIsValid ||
    password.length === 0 ||
    !passwordConfirmIsValid ||
    passwordConfirm.length === 0

  const navigate = useNavigate()

  const authContext = useContext(AuthContext)

  const signUpClicked = async () => {
    try {
      await authContext.signUpWithEmail(username, email, password)
      setCreated(true)
    } catch (err) {
      if (err instanceof Error) {
        setError(err.message)
      }
    }
  }

  const signUp = (
    <>
      <Box width="80%" m={1}>
        <Email emailIsValid={emailIsValid} setEmail={setEmail} />
      </Box>
      <Box width="80%" m={1}>
        <Username usernameIsValid={usernameIsValid} setUsername={setUsername} />
      </Box>
      <Box width="80%" m={1}>
        <Password label="Password" passwordIsValid={passwordIsValid} setPassword={setPassword} />
      </Box>
      <Box width="80%" m={1}>
        <Password label="Confirm Password" passwordIsValid={passwordConfirmIsValid} setPassword={setPasswordConfirm} />
      </Box>
      <Box mt={2}>
        <Typography color="error" variant="body2">
          {error}
        </Typography>
      </Box>

      {/* Buttons */}
      <Box mt={2}>
        <StyledGrid container direction="row" justify="center">
          <Box m={1}>
            <Button onClick={() => navigate(-1)} color="secondary" variant="contained">
              Cancel
            </Button>
          </Box>
          <Box m={1}>
            <Button disabled={isValid} color="primary" variant="contained" onClick={signUpClicked}>
              Sign Up
            </Button>
          </Box>
        </StyledGrid>
      </Box>
    </>
  )

  const accountCreated = (
    <>
      <Typography variant="h5">{`Created ${username} account`}</Typography>
      <Typography variant="h6">{`Verfiy Code sent to ${email}`}</Typography>

      <Box m={4}>
        <Button onClick={() => navigate('/verify')} color="primary" variant="contained">
          Send Code
        </Button>
      </Box>
    </>
  )

  return (
      <StyledGrid xs={12} sm={24} lg={24} container direction="row" justify="center" alignItems="center" item>
        <Paper style={{ width: '100%', padding: 16 }}>
          <StyledGrid container direction="column" justify="center" alignItems="center">
            {/* Title */}
            <Box m={3}>
              <StyledGrid container direction="row" justify="center" alignItems="center">
                <Typography variant="h3">Sign Up</Typography>
              </StyledGrid>
            </Box>

            {!created ? signUp : accountCreated}
          </StyledGrid>
        </Paper>
      </StyledGrid>
  )
}

export default SignUp
