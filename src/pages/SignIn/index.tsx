import React from 'react';
import { FiLogIn, FiMail, FiLock } from 'react-icons/fi';

import Input from '../../components/Input';
import Button from '../../components/Button';

import { Container, Content, Background } from './styles';

const SignIn: React.FC = () => (
  <Container>
    <Content>
      <form>
        <h1>Login</h1>

        <Input name="email" icon={FiMail} placeholder="E-mail" />

        <Input
          name="password"
          type="password"
          icon={FiLock}
          placeholder="Password"
        />

        <Button type="submit">Enter</Button>
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
