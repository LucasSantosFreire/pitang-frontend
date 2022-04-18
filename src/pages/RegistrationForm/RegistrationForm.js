import React from 'react'
import { Formik, Form } from 'formik'
import * as Yup from 'yup'
import ptBR from 'date-fns/locale/pt-BR';
import DatePicker from '../../components/datepicker/DatePicker'
import ChakraInput from '../../components/Input/Input'
import { Button } from '@chakra-ui/react'

function RegistrationForm () {
  const initialValues = {
    name : '',
    birthdate : null,
    appointmentDate: null
  }

  const validationSchema = Yup.object({
            name: Yup.string()
            .min(3)
            .max(70)
            .required(),

            birthdate: Yup
            .date()
            /* .max('now')
            .iso() */
            .required(),

            appointmentDate: Yup
            .date()
            /* .min('now')
            .iso() */
            .required()
  })

  const onSubmit = values => {
    console.log('Form data', values)
    console.log('saved data', JSON.parse(JSON.stringify(values)))
  }

  return (
    <Formik
      initialValues={initialValues}
      validationSchema={validationSchema}
      onSubmit={onSubmit}
    >
      {formik => {
        return (
          <Form>
            <ChakraInput
            label = 'Informe seu nome: '
            name = 'name'
            size = 'md'
            maxWidth = '25%'
            /> 
            <DatePicker 
            label = 'Selecione sua data de nascimento:'
            name = 'birthdate'
            peekNextMonth
            showMonthDropdown
            showYearDropdown
            dropdownMode="select"
            locale={ptBR}
            maxDate={new Date(new Date().getTime() - 86400000)}
            />
            <DatePicker 
            label = 'Escolha um dia e uma hora para a vacinação: '
            name = 'appointmentDate'
            showTimeSelect
            timeFormat="HH:mm"
            timeIntervals={60}
            timeCaption="time"
            dateFormat="MMMM d, yyyy h:mm aa"
            minDate={new Date(new Date().getTime() + 86400000)}
            />
            <Button type='submit' colorScheme='teal' variant='outline'  disabled={!formik.isValid}>Submit</Button>
          </Form>
        )
      }}
    </Formik>
  )
}

export default RegistrationForm