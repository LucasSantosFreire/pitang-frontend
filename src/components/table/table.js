import React from 'react'

import {
    Table,
    Thead,
    Tbody,
    Tr,
    Th,
    Td,
    TableContainer,
    IconButton,
    Grid,
    GridItem
  } from '@chakra-ui/react'

  import { CheckIcon, DeleteIcon, TimeIcon, CheckCircleIcon } from '@chakra-ui/icons'


const ChakraTable = (props) => {
    const { data, columns,updateRegister, deleteRegister, ...rest } = props
  return (
    <Grid templateColumns='repeat(20, 1fr)'>
    <GridItem colStart={2} colEnd={20}  >
    <TableContainer>
      <Table {...rest}>
        <Thead>
          <Tr>
            {columns.map((item, index) => <TableHeadItem item={item} />)}
          </Tr>
        </Thead>
        <Tbody>
          {data.map((item, index) => (
            <>
              <TableRow item={item} columns={columns} index={index} updateRegister={updateRegister} deleteRegister={deleteRegister} />
            </>
          ))}
        </Tbody>
      </Table>
    </TableContainer>
    </GridItem>
    </Grid>
  )
}

const TableHeadItem = ({ item }) => <Th>{item.heading}</Th>

const TableRow = ({ item, columns, index, updateRegister, deleteRegister }) => (
    <Tr>
      {columns.map((columnItem, index) => {
        if (item[`${columnItem.value}`] === true )
            return  <Td><CheckCircleIcon color='green.500' boxSize={7} /></Td>
        else if (item[`${columnItem.value}`] === false ){
            return <Td><TimeIcon color='yellow.700' boxSize={7} /></Td>
        }
        return <Td>{item[`${columnItem.value}`]}</Td>
      })}
        <Td><IconButton colorScheme='teal' aria-label='Confirmar atendimento'icon={<CheckIcon />} onClickCapture={() => updateRegister(item, index)}/></Td>
        <Td><IconButton colorScheme='red' aria-label='Deletar registro'icon={<DeleteIcon />} onClickCapture={() => deleteRegister(item, index)}/></Td>
    </Tr>
  )
export default ChakraTable