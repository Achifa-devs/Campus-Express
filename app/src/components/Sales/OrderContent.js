import React from 'react'
import { 
    Text, 
    View 
} from 'react-native'
import { Table, Row, Rows } from 'react-native-table-component';

export default function OrderContent({tableData}) {
  
  return (
    <>
      <Table >        
        <Rows data={tableData} style={{backgroundColor: '#fff', height: 70, borderBottomWidth: 2, borderBottomColor: '#efefef'}} textStyle={{ textAlign: 'center', color: '#000' }} />
      </Table>
    </>
  )
}
