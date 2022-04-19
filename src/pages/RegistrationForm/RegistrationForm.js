import React from 'react'
import { Formik, Form } from 'formik'
import * as Yup from 'yup'
import ptBR from 'date-fns/locale/pt-BR';
import axios from '../../services/api'
import DatePicker from '../../components/datepicker/DatePicker'
import ChakraInput from '../../components/Input/Input'
import { Button } from '@chakra-ui/react'
import moment from 'moment';

function RegistrationForm () {
  const initialValues = {
    name : '',
    birthdate : null,
    appointmentDate: null
  }

  const validationSchema = Yup.object({
            name: Yup.string().min(3).max(70).required(),
            birthdate: Yup.date().required(),
            appointmentDate: Yup.date().required()
  })

  const onSubmit = async (values) => {
    const data = JSON.parse(JSON.stringify(values))
    const newDate = moment(data.appointmentDate, moment.ISO_8601).local().utc(-3, true).format()
    data.appointmentDate = newDate
    console.log(data)
    await axios.post("/create_appointment", data);
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
            locale={ptBR}
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