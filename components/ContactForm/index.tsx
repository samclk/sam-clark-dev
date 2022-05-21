import styled from 'styled-components'
import { Formik, FormikHelpers, Form, Field } from 'formik'
import FormWrapper from '../FormWrapper'
import { device } from '../../styles/breakpoints'

const Heading = styled.h2`
  font-size: 0.8rem;
  margin: 0;
  color: var(--color-accent);
  text-transform: uppercase;
  margin-bottom: 1.5rem;
`

const FieldWrapper = styled.div`
  margin-bottom: 1rem;
`

const Label = styled.label`
  color: var(--neutral);
  text-transform: uppercase;
  font-size: 0.8rem;
  display: block;
  margin-bottom: 0.2rem;
`

const Input = styled(Field)`
  padding: 0.6em 1em;
  width: 100%;
`

const TextArea = styled(Field)`
  padding: 0.6em 1em;
  width: 100%;
  max-width: 100%;
  min-width: 100%;
`

const Buttons = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: center;
`

const Button = styled.button`
  font-size: 0.8rem;
  padding: 0.5em 1em;
  background-color: transparent;
  border: 2px solid black;
  cursor: pointer;
  transition: border-color 300ms, background-color 300ms;
  text-transform: uppercase;
  font-weight: 500;

  &:hover {
    background-color: var(--color-accent);
    border-color: var(--color-accent);
  }
`

const ButtonPink = styled(Button)`
  border-color: var(--color-accent);
  background-color: var(--color-accent);
  color: var(--dark);

  &: hover {
    background-color: var(--neutral);
    border-color: var(--neutral);
    color: var(--dark);
  }
`

const ButtonInline = styled.button`
  display: block;
  font-size: 0.8rem;
  border: none;
  color: var(--neutral);
  padding-right: 0px;
  background: none;
  text-transform: uppercase;

  &: hover {
    background-color: var(--neutral);
    border-color: var(--neutral);
    color: var(--dark);
  }

  @media ${device.tablet} {
    display: none;
  }
`

interface ContactFormProps {
  isVisible: boolean
  closeForm: () => void
}

interface Values {
  firstName: string
  lastName: string
  email: string
  brief: string
}

const ContactForm: React.FC<ContactFormProps> = ({ isVisible, closeForm }) => {
  return (
    <FormWrapper isVisible={isVisible}>
      <Heading>Tell me about your project</Heading>
      <Formik
        initialValues={{
          firstName: '',
          lastName: '',
          email: '',
          brief: '',
        }}
        onSubmit={(
          values: Values,
          { setSubmitting }: FormikHelpers<Values>
        ) => {
          setTimeout(() => {
            alert(JSON.stringify(values, null, 2))
            setSubmitting(false)
          }, 500)
        }}
      >
        <Form>
          <FieldWrapper>
            <Label htmlFor="firstName">First Name</Label>
            <Input id="firstName" name="firstName" />
          </FieldWrapper>

          <FieldWrapper>
            <Label htmlFor="lastName">Last Name</Label>
            <Input id="lastName" name="lastName" />
          </FieldWrapper>

          <FieldWrapper>
            <Label htmlFor="email">Email</Label>
            <Input id="email" name="email" type="email" />
          </FieldWrapper>

          <FieldWrapper>
            <Label htmlFor="brief">Brief description</Label>
            <TextArea as="textarea" id="brief" name="brief" />
          </FieldWrapper>

          <Buttons>
            <ButtonPink type="submit">Send</ButtonPink>
            <ButtonInline as="a" onClick={closeForm}>
              Back
            </ButtonInline>
          </Buttons>
        </Form>
      </Formik>
    </FormWrapper>
  )
}

export default ContactForm
