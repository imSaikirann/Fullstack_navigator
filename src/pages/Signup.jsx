import React from 'react';
import { Box, Button, Input, Center, FormControl, FormLabel, FormErrorMessage } from '@chakra-ui/react';
import { Formik, Field, Form } from 'formik';
import * as Yup from 'yup';
import { useSignup } from '../hooks/useSignup';

export default function Signup() {
  const { signup } = useSignup();

  return (
    <Center h="100vh">
      <Box p={10} w="450px" padding="2rem" boxShadow="rgba(0, 0, 0, 0.12) 0px 1px 3px, rgba(0, 0, 0, 0.24) 0px 1px 2px;" borderRadius="md" bg="#FFFFFF" border="none" color="#00000">
        <Formik
          initialValues={{
            email: '',
            password: '',
          }}
          validationSchema={Yup.object({
            email: Yup.string().email('Invalid email').required('Required'),
            password: Yup.string().required('Required'),
          })}
          onSubmit={(values, actions) => {
            signup(values.email, values.password, actions);
          }}
        >
          <Form>
            <Field name="email">
              {({ field, form }) => (
                <FormControl isInvalid={form.errors.email && form.touched.email}>
                  <FormLabel htmlFor="email">Email</FormLabel>
                  <Input {...field} type="email" id="email" placeholder="Email" />
                  <FormErrorMessage>{form.errors.email}</FormErrorMessage>
                </FormControl>
              )}
            </Field>
            <Field name="password">
              {({ field, form }) => (
                <FormControl isInvalid={form.errors.password && form.touched.password}>
                  <FormLabel htmlFor="password">Password</FormLabel>
                  <Input {...field} type="password" id="password" placeholder="Password" />
                  <FormErrorMessage>{form.errors.password}</FormErrorMessage>
                </FormControl>
              )}
            </Field>
            <Button mt={4} w="100%" colorScheme="gray" type="submit">
              Signup
            </Button>
          </Form>
        </Formik>
      </Box>
    </Center>
  );
}
