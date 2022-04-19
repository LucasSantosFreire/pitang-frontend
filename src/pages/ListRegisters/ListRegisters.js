import React from 'react'
import axios from '../../services/api'


function ListRegisters () {

    const [data, setData] = React.useState([]);
    console.log(data)
    React.useEffect(() => {
        async function fetchData(){
            await axios.get("/index")
            .then(res => setData(res.data))
            .catch(err => console.log(err))
        }
        fetchData();
    }, [])

    return (
        <div>hey2</div>
    )
}
  export default ListRegisters