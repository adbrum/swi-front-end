import React, { useCallback, useRef } from 'react';
import { FiArrowLeft, FiMail, FiUser, FiLock } from 'react-icons/fi';
import { FormHandles } from '@unform/core';
import { Form } from '@unform/web';
import * as Yup from 'yup';
import { Link, useHistory } from 'react-router-dom';

import api from '../../services/api';

import getValidationErrors from '../../utils/getValidationErrors';

import Input from '../../components/Input';
import Button from '../../components/Button';

import { Container, Content, AnimationContainer, Background } from './styles';

interface SignUpFormData {
  username: string;
  email: string;
  password: string;
  password2: string;
}

const SignUp: React.FC = () => {
  const formRef = useRef<FormHandles>(null);
  const history = useHistory();

  const handleSubmit = useCallback(
    async (data: SignUpFormData) => {
      try {
        formRef.current?.setErrors({});

        const schema = Yup.object().shape({
          name: Yup.string().required('Required name'),
          email: Yup.string()
            .email('Enter a valid email address')
            .required('Required email'),
          password: Yup.string().min(6, 'at least 6 digits'),
          password2: Yup.string().oneOf(
            [Yup.ref('password'), null],
            'Passwords must match',
          ),
        });
        await schema.validate(data, {
          abortEarly: false,
        });

        console.log(data);

        await api.post('/users/register/', data);

        history.push('/');
      } catch (err) {
        if (err instanceof Yup.ValidationError) {
          const errors = getValidationErrors(err);
          formRef.current?.setErrors(errors);

          // return;
        }
      }
    },
    [history],
  );

  return (
    <Container>
      <Background />
      <Content>
        <AnimationContainer>
          <Form ref={formRef} onSubmit={handleSubmit}>
            <h1>Create account</h1>

            <Input name="name" type="text" icon={FiUser} placeholder="Name" />
            <Input
              name="email"
              type="email"
              icon={FiMail}
              placeholder="E-mail"
            />

            <Input
              name="password"
              type="password"
              icon={FiLock}
              placeholder="Password"
            />

            <Input
              name="password2"
              type="password"
              icon={FiLock}
              placeholder="Password"
            />

            <Button type="submit">Register</Button>
          </Form>
          <Link to="/">
            <FiArrowLeft />
            Return to login
          </Link>
        </AnimationContainer>
      </Content>
    </Container>
  );
};

export default SignUp;
