import React, { useState } from 'react'
import {
  importsExcel,
  exportExcel
} from './util/excel'
import Citys from './util/city'
import baike01 from './data/baike01.json'
import './App.css';

function App() {
  debugger
  const city = Citys

  // excel数据
  const [list, setList] = useState([])

  const [header, ActioHeader] = useState([
    {
      title: '编号',
      dataIndex: 'id',
      key: 'id',
      className: 'text-monospace',
    }, {
      title: '用户名称',
      dataIndex: 'username',
      key: 'username',
    }, {
      title: '用户年龄',
      dataIndex: 'userage',
      key: 'userage',
    }
  ])
  const [excelList, actionExcelList] = useState([{ id: 1, username: "leson", userage: 18 }, {
    id: 2,
    username: "lulu",
    userage: 30
  },
  {
    id: 3,
    username: "beibei",
    userage: 19
  }])



  const dataHandler = (originData, baikeData) => {
    debugger

  }
  return (
    <div className="App">
      <input type="file" accept=".xls,.xlsx" onChange={(e) => {
        importsExcel(e).then(function (data) {
          console.log(data);
          setList(data);
          dataHandler(data, baike01)
        }, function (data) {
          console.log(data);
        })
      }} />
      <button onClick={
        () => {
          exportExcel(header, excelList, "学生信息.xlsx")
        }
      }>导出excel数据</button>
    </div>
  );
}

export default App;
