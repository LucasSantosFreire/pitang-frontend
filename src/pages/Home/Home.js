import { Box } from "@chakra-ui/react";
import { useNavigate } from "react-router-dom";


function Home (){
    const navigate = useNavigate();
    return(
        <Box display='flex' mt='15%' ml='14%' alignItems='center' >
            <Box as='button' borderRadius='md' bg='teal' color='white' px={100} h={200} mr='5%' onClick={() => navigate('/create_appointment')}>
                Agendar horário para vacinação.
            </Box>
            <Box as='button' borderRadius='md' bg='teal' color='white' px={130} h={200} onClick={() => navigate('/list_appointments')}>
                Ver lsta de agendados.
            </Box>
        </Box>
    )
}
export default Home;