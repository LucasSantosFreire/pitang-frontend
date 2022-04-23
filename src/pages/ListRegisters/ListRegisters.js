import React from 'react'
import axios from '../../services/api'
import ChakraTable from '../../components/table/table'
import formatDate from '../../functions/formatDate';
import { useNavigate } from 'react-router-dom';
import {
    Modal,
    ModalOverlay,
    ModalContent,
    ModalHeader,
    ModalFooter,
    ModalBody,
    ModalCloseButton,
    Button,
    useDisclosure,
    Input,
    IconButton,
    HStack,
    Heading 
  } from '@chakra-ui/react'
  import { Search2Icon, ArrowBackIcon } from '@chakra-ui/icons'

function ListRegisters () {

    const [data, setData] = React.useState([]);
    const [value, setValue ] = React.useState("");
    const [filteredData, setFilteredData] = React.useState([])
    const { isOpen, onOpen, onClose } = useDisclosure()
    const navigate = useNavigate()

    async function updateRegister(item, index){
        await axios.put(`/update_status/${item.id}`)
        const modifiedData = data
        modifiedData[index].status = true
        window.sessionStorage.setItem('data', JSON.stringify(modifiedData))
        setData(modifiedData)
        navigate(0)
     }

     async function deleteRegister(item, index){
        await axios.delete(`/delete_appointment/${item.id}`)
        const modifiedData = data
        modifiedData.splice(index, 1)
        window.sessionStorage.setItem('data', JSON.stringify(modifiedData))
        setData(modifiedData)
        navigate(0)
     }

     function handleSearch(){
        setFilteredData(data.filter(item => item.name.includes(value)))
        onOpen()
     }

    React.useEffect(() => {
        async function fetchData(){
            await axios.get("/index")
            .then(res => {
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
        <div>
            <Button ml={'5%'} mb={'3%'} leftIcon={<ArrowBackIcon />} colorScheme='teal' variant='solid' onClick={() => navigate("/")}>
                Voltar para home.
            </Button>
            <HStack spacing={'20px'} ml={"5%"} mb={'2%'} >
                <Input isRequired placeholder='Digite um nome para pesquisar' size='md' width='25%' value={value} onChange={(e) => {setValue(e.target.value)}}/>
                <IconButton colorScheme='green' aria-label='Pesquisar'icon={<Search2Icon />} onClickCapture={() => handleSearch()}/>
            </HStack>
            <Modal isOpen={isOpen} onClose={onClose} size={'full'}>
                <ModalOverlay />
                <ModalContent>
                    <ModalHeader>Resultado da pesquisa...</ModalHeader>
                    <ModalCloseButton />
                    <ModalBody>
                        {filteredData.length !== 0?(
                        <ChakraTable columns={columns} data={filteredData} variant='striped' colorScheme='teal' updateRegister={updateRegister} deleteRegister={deleteRegister} />)
                        :
                        (<Heading>Nenhum resultado foi encontrado para a pequisa!</Heading>)
                        }   
                    </ModalBody>

                    <ModalFooter>
                        <Button colorScheme='blue' mr={3} onClick={onClose}>
                            Fechar
                        </Button>
                        <Button variant='ghost'>Secondary Action</Button>
                    </ModalFooter>
                </ModalContent>
            </Modal>
            <ChakraTable columns={columns} data={data} variant='striped' colorScheme='teal' updateRegister={updateRegister} deleteRegister={deleteRegister} />
        </div>
    )
}
  export default ListRegisters