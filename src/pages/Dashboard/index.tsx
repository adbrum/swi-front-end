import React, { useCallback, useState, useEffect } from 'react';
import jwt_decode from 'jwt-decode';
import { FiPower } from 'react-icons/fi';
import { Button, Card, CardContent, Grid } from '@material-ui/core';
import { Form, Formik } from 'formik';
import { array, object, string } from 'yup';
import { useAuth } from '../../hooks/auth';
import { Container, Content } from './styles';
import { MultipleFileUploadField } from '../../components/Upload/index';
import Image from '../../components/Image';
import api from '../../services/api';

interface Props {
  id_user: number;
}

const Dashboard: React.FC<any> = ({ id_user }: Props) => {
  const { signOut, token } = useAuth();
  const [images, setImages] = useState([]);

  // const user = jwt_decode(token);

  // useEffect(() => {
  //   handleImage(user.user_id);
  // }, []);

  const handleSubmit = useCallback(values => {
    api
      .post('/images/create/', values)
      .then(response => handleImage(response.data.user_id))
      .catch(error => {
        console.error('There was an error!', error);
      });
  }, []);

  const handleImage = useCallback(id => {
    api
      .get(`/images/list/${id}/`)
      .then(response => setImages(response.data))
      // .then(response => console.log(response.data))
      .catch(error => {
        console.error('There was an error!', error);
      });
  }, []);

  return (
    <Container>
      <Content>
        <Image img={images} />
        <Card>
          <CardContent>
            <Formik
              initialValues={{ files: [] }}
              validationSchema={object({
                files: array(
                  object({
                    url: string().required(),
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
                  {/* <pre>{JSON.stringify({ values, errors }, null, 4)}</pre> */}
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
