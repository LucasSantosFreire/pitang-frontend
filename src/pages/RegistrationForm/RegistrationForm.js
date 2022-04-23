import React from 'react'
import { Formik, Form } from 'formik'
import * as Yup from 'yup'
import ptBR from 'date-fns/locale/pt-BR';
import axios from '../../services/api'
import DatePicker from '../../components/datepicker/DatePicker'
import ChakraInput from '../../components/Input/Input'
import { Button, Container } from '@chakra-ui/react'
import moment from 'moment';
import { ArrowBackIcon } from '@chakra-ui/icons';
import { useNavigate } from 'react-router-dom';

function RegistrationForm () {
  const navigate = useNavigate()

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
    window.sessionStorage.clear();
    try{
    await axios.post("/create_appointment", data);
    }catch(error){
      console.log(error)
    }
  }

  return (
    <Container centerContent bg='teal.200' mt={'15%'} pt={'3%'} ml={'26%'} >
      <Button leftIcon={<ArrowBackIcon />} colorScheme='blackAlpha' variant='solid' onClick={() => navigate("/")}>
        Voltar para home.
      </Button>
      <Formik
        initialValues={initialValues}
        validationSchema={validationSchema}
        onSubmit={onSubmit}
      >
        {formik => {
          return (
            <Form>
              <ChakraInput
                label='Informe seu nome: '
                name='name'
                size='md'
                maxWidth='36%'
              />
              <DatePicker
                label='Selecione sua data de nascimento:'
                name='birthdate'
                peekNextMonth
                showMonthDropdown
                showYearDropdown
                dropdownMode="select"
                locale={ptBR}
                maxDate={new Date(new Date().getTime() - 86400000)}
              />
              <DatePicker
                label='Escolha um dia e uma hora para a vacinação: '
                name='appointmentDate'
                showTimeSelect
                timeFormat="HH:mm"
                timeIntervals={60}
                timeCaption="time"
                dateFormat="MMMM d, yyyy h:mm aa"
                locale={ptBR}
                minDate={new Date(new Date().getTime() + 86400000)}
              />
              <Container mt={'2%'} centerContent mb={'5%'}>
                <Button type='submit' colorScheme='blackAlpha' variant='solid' disabled={!formik.isValid}>Submit</Button>
              </Container>
            </Form>
          )
        }}
      </Formik>
    </Container>
  )
}

export default RegistrationForm