import { Formik, FormikHelpers, Form, Field } from 'formik'
import FormWrapper from '../FormWrapper'

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
      <h2 className="mt-0 mb-6 text-xs uppercase text-pink-500">
        Tell me about your project
      </h2>
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
          <div className="mb-4">
            <label
              className="mb-2 block text-xs uppercase text-white"
              htmlFor="firstName"
            >
              First Name
            </label>
            <Field
              className="w-full py-2 px-4"
              id="firstName"
              name="firstName"
            />
          </div>

          <div className="mb-4">
            <label
              className="mb-2 block text-xs uppercase text-white"
              htmlFor="lastName"
            >
              Last Name
            </label>
            <Field className="w-full py-2 px-4" id="lastName" name="lastName" />
          </div>

          <div className="mb-4">
            <label
              className="mb-2 block text-xs uppercase text-white"
              htmlFor="email"
            >
              Email
            </label>
            <Field
              className="w-full py-2 px-4"
              id="email"
              name="email"
              type="email"
            />
          </div>

          <div className="mb-4">
            <label
              className="mb-2 block text-xs uppercase text-white"
              htmlFor="brief"
            >
              Brief description
            </label>
            <Field
              className="w-full min-w-full max-w-full py-2 px-4"
              as="textarea"
              id="brief"
              name="brief"
            />
          </div>

          <div className="flex items-center justify-between">
            <button
              className="cursor-pointer border-2 border-black bg-transparent py-2 px-4 text-xs uppercase"
              type="submit"
            >
              Send
            </button>
            <a
              className="block border-0 text-xs uppercase text-white lg:hidden"
              onClick={closeForm}
            >
              Back
            </a>
          </div>
        </Form>
      </Formik>
    </FormWrapper>
  )
}

export default ContactForm
