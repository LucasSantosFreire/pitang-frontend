import React from 'react'
import axios from '../../services/api'
import ChakraTable from '../../components/table/table'
import formatDate from '../../functions/formatDate';

function ListRegisters () {

    const [data, setData] = React.useState([]);
    console.log(data)
    React.useEffect(() => {
        async function fetchData(){
            await axios.get("/index")
            .then(res => setData(formatDate(res.data)))
            .catch(err => console.log(err))
        }
        fetchData();
    }, [])

    const columns = [
        { heading: 'Nome', value: 'name' },
        { heading: 'Data de nascimento', value: 'birthdate' },
        { heading: 'Data para vacinação', value: 'appointmentDate' },
        { heading: 'Foi atendido?', value: 'status' },
      ]

    return (
        <div><ChakraTable columns={columns} data={data} variant='striped' colorScheme='teal' /></div>
    )
}
  export default ListRegisters