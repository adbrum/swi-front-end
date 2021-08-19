import React from 'react';
import { FiLogIn } from 'react-icons/fi';

import { Container, Content, Background } from './styles';

const SignIn: React.FC = () => (
  <Container>
    <Content>
      <form>
        <h1>Login</h1>

        <input placeholder="E-mail" />

        <input type="password" placeholder="Password" />

        <button type="submit">Enter</button>
        <a href="forgot">Forgot my password</a>
      </form>
      <a href="login">
        <FiLogIn />
        Create account
      </a>
    </Content>
    <Background />
  </Container>
);

export default SignIn;
