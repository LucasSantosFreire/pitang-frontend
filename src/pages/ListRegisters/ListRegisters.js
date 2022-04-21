import React from 'react'
import axios from '../../services/api'
import ChakraTable from '../../components/table/table'
import formatDate from '../../functions/formatDate';

function ListRegisters () {

    const [data, setData] = React.useState([]);

    async function updateRegister(item, index){
        await axios.put(`/update_status/${item.id}`)
        const modifiedData = data
        modifiedData[index].status = true
        window.sessionStorage.setItem('data', JSON.stringify(modifiedData))
        setData(modifiedData)
        window.location.reload(false)
     }

     async function deleteRegister(item, index){
        await axios.delete(`/delete_appointment/${item.id}`)
        const modifiedData = data
        modifiedData.splice(index, 1)
        window.sessionStorage.setItem('data', JSON.stringify(modifiedData))
        setData(modifiedData)
        window.location.reload(false)
     }

    React.useEffect(() => {
        async function fetchData(){
            await axios.get("/index")
            .then(res => {
                console.log(";-;")
                window.sessionStorage.setItem('data', JSON.stringify(formatDate(res.data)))
                setData(JSON.parse(window.sessionStorage.getItem('data')))
            })
            .catch(err => console.log(err))
        }
        if(!window.sessionStorage.getItem('data')){
            fetchData();
        }else{
            setData(JSON.parse(window.sessionStorage.getItem('data')))
        }
    }, [])

    const columns = [
        { heading: 'Nome', value: 'name' },
        { heading: 'Data de nascimento', value: 'birthdate' },
        { heading: 'Data para vacinação', value: 'appointmentDate' },
        { heading: 'Foi atendido?', value: 'status' },
      ]

    return (
        <div><ChakraTable columns={columns} data={data} variant='striped' colorScheme='teal' updateRegister={updateRegister} deleteRegister={deleteRegister} /></div>
    )
}
  export default ListRegisters