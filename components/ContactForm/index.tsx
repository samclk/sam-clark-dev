import * as React from 'react'
import { Formik, FormikHelpers, Form, Field } from 'formik'
import FormWrapper from '../FormWrapper'
import { AnimatePresence, motion, Variants } from 'framer-motion'
import * as Yup from 'yup'

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

interface ConfirmationMessageProps {
  name: string
}

const TypingSvgVariant: Variants = {
  hidden: {
    opacity: 0,
  },
  show: {
    opacity: 1,
    transition: {
      staggerChildren: 0.2,
    },
  },
  exit: {
    opacity: 0,
  },
}

const TypingCircleVariant: Variants = {
  hidden: {
    opacity: 0,
  },
  show: {
    opacity: 1,
    transition: {
      repeat: Infinity,
      repeatType: 'reverse',
      duration: 0.6,
    },
  },
}

const ConfirmationMessage: React.FC<ConfirmationMessageProps> = ({ name }) => {
  const [showNextMessage, setShowNextMessage] = React.useState(false)

  React.useEffect(() => {
    const timeoutId = setTimeout(() => {
      setShowNextMessage(true)
    }, 5000)

    return () => {
      clearTimeout(timeoutId)
    }
  }, [])

  return (
    <>
      <motion.h3
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        exit={{ opacity: 0 }}
        className="text-xs uppercase text-pink-500"
      >
        Thank you for your message {name}
      </motion.h3>
      <AnimatePresence exitBeforeEnter>
        {!showNextMessage && (
          <motion.svg
            variants={TypingSvgVariant}
            initial="hidden"
            animate="show"
            width="24"
            height="10"
            viewBox="0 0 24 10"
            fill="none"
            xmlns="http://www.w3.org/2000/svg"
            className="mt-2"
          >
            <rect width="24" height="10" rx="5" fill="#333" />
            <motion.circle
              variants={TypingCircleVariant}
              cx="6"
              cy="5"
              r="2"
              fill="#ec489a"
            />
            <motion.circle
              variants={TypingCircleVariant}
              cx="12"
              cy="5"
              r="2"
              fill="#ec489a"
            />
            <motion.circle
              variants={TypingCircleVariant}
              cx="18"
              cy="5"
              r="2"
              fill="#ec489a"
            />
          </motion.svg>
        )}
        {showNextMessage && (
          <motion.h3
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ type: 'tween' }}
            exit={{ opacity: 0 }}
            className="text-xs uppercase text-pink-500"
          >
            I will be in touch as soon as possible
          </motion.h3>
        )}
      </AnimatePresence>
    </>
  )
}

const ContactSchema = Yup.object().shape({
  firstName: Yup.string()
    .min(2, 'Too Short!')
    .max(50, 'Too Long!')
    .required('Required'),
  lastName: Yup.string()
    .min(2, 'Too Short!')
    .max(50, 'Too Long!')
    .required('Required'),
  email: Yup.string().email('Invalid email').required('Required'),
  brief: Yup.string()
    .min(30, 'Too Short!')
    .max(1000, 'Too Long!')
    .required('Required'),
})

const ContactForm: React.FC<ContactFormProps> = ({ isVisible, closeForm }) => {
  const [completed, setCompleted] = React.useState(false)
  const [sentname, setSentname] = React.useState('')

  return (
    <FormWrapper isVisible={isVisible}>
      <AnimatePresence exitBeforeEnter>
        {completed ? (
          <ConfirmationMessage name={sentname} />
        ) : (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
          >
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
              validationSchema={ContactSchema}
              onSubmit={async (
                values: Values,
                { setSubmitting }: FormikHelpers<Values>
              ) => {
                setSubmitting(true)
                const result = await fetch('/api/mail', {
                  method: 'POST',
                  body: JSON.stringify(values),
                })

                if (result.status == 200) {
                  setSubmitting(false)
                  setCompleted(true)
                  setSentname(values.firstName)
                }
              }}
            >
              {({ errors, touched }) => (
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
                    {errors.firstName && touched.firstName ? (
                      <span className="mt-2 text-xs uppercase text-red-500">
                        {errors.firstName}
                      </span>
                    ) : null}
                  </div>

                  <div className="mb-4">
                    <label
                      className="mb-2 block text-xs uppercase text-white"
                      htmlFor="lastName"
                    >
                      Last Name
                    </label>
                    <Field
                      className="w-full py-2 px-4"
                      id="lastName"
                      name="lastName"
                    />
                    {errors.lastName && touched.lastName ? (
                      <span className="mt-2 text-xs uppercase text-red-500">
                        {errors.lastName}
                      </span>
                    ) : null}
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
                    {errors.email && touched.email ? (
                      <span className="mt-2 text-xs uppercase text-red-500">
                        {errors.email}
                      </span>
                    ) : null}
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
                      placeholder="maximum 1000 characters"
                    />
                    {errors.brief && touched.brief ? (
                      <span className="mt-2 text-xs uppercase text-red-500">
                        {errors.brief}
                      </span>
                    ) : null}
                  </div>

                  <div className="flex items-center justify-between">
                    <button
                      className="cursor-pointer border-2 border-white bg-transparent py-2 px-4 text-xs uppercase text-white hover:bg-white hover:text-black"
                      type="submit"
                    >
                      Send
                    </button>
                    <a
                      className="block cursor-pointer border-0 text-xs uppercase text-white lg:hidden"
                      onClick={closeForm}
                    >
                      Back
                    </a>
                  </div>
                </Form>
              )}
            </Formik>
          </motion.div>
        )}
      </AnimatePresence>
    </FormWrapper>
  )
}

export default ContactForm
