import React, { useCallback } from 'react';
import { FiPower } from 'react-icons/fi';
import { Button, Card, CardContent, Grid } from '@material-ui/core';
import { Form, Formik } from 'formik';
import { array, object, string } from 'yup';
import { useAuth } from '../../hooks/auth';
import { Container, Content } from './styles';
import { MultipleFileUploadField } from '../../components/Upload/index';
import api from '../../services/api';

const Dashboard: React.FC = () => {
  const { signOut } = useAuth();

  const handleSubmit = (values, actions) => {
    console.log('DATA: ', values);
    api
      .post('/images/lead/', values)
      .then(response => console.log(response))
      .catch(error => {
        console.error('There was an error!', error);
      });
  };

  return (
    <Container>
      <Content>
        <Card>
          <CardContent>
            <Formik
              initialValues={{ files: [] }}
              validationSchema={object({
                files: array(
                  object({
                    url: string().required(),
                    token: object(),
                  }),
                ),
              })}
              onSubmit={handleSubmit}
            >
              {({ values, errors, isValid, isSubmitting }) => (
                <Form>
                  <Grid container spacing={2} direction="column">
                    <MultipleFileUploadField name="files" />
                    <Grid item>
                      <Button
                        variant="contained"
                        color="primary"
                        disabled={!isValid || isSubmitting}
                        type="submit"
                      >
                        Submit
                      </Button>
                    </Grid>
                  </Grid>
                  <pre>{JSON.stringify({ values, errors }, null, 4)}</pre>
                </Form>
              )}
            </Formik>
          </CardContent>
        </Card>
        <CardContent>
          <Button
            onClick={signOut}
            variant="contained"
            color="primary"
            type="button"
          >
            <FiPower />
            Exit
          </Button>
        </CardContent>
      </Content>
    </Container>
  );
};

export default Dashboard;
