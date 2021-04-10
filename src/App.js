import React, { useState } from 'react'
import {
  importsExcel,
  exportExcel
} from './util/excel'
import Citys from './util/city'
import str from './data/str'
import baike01 from './data/baike01.json'
import './App.css';

function App() {

  // excel数据
  const [list, setList] = useState([])

  const cityData = Citys



  const [header, ActioHeader] = useState([
    {
      title: '关键词',
      dataIndex: 'key',
      key: 'key',
      className: 'text-monospace',
    }, {
      title: '籍贯关键词',
      dataIndex: 'value',
      key: 'value',
    }, {
      title: '摘要',
      dataIndex: '摘要',
      key: '摘要',
    }, {
      title: '页面地址',
      dataIndex: 'url',
      key: 'url',
    }
  ])
  const [resultList, setResultList] = useState([])



  const dataHandler = (originData, baikeData) => {
    debugger

  }

  // 查询籍贯的正则

  const reg1 = /生于(\S*)/g
  const reg2 = /祖籍(\S*)/g
  const reg3 = /原籍(\S*)/g
  const reg4 = /(\S*)人/g
  // 先导出百结果数据

  const exportReault = () => {
    const list = []
    baike01.map((data, index) => {
      if (data.关键词 !== '') {
        let valueData = ''

        const comment = data.摘要.split(/[，。]/)

        for (let i = 0; i < comment.length; i++) {
          let temp = comment[i].match(reg1) || comment[i].match(reg2) || comment[i].match(reg3) || comment[i].match(reg4)
          if (temp && temp.length > 0) {
            // 排除生于19**的情况
            const isBirth = temp[0].match(/[0-9]/g)
            if (isBirth && isBirth.length > 0) {
              temp = comment[i].match(reg2) || comment[i].match(reg3) || comment[i].match(reg4)
              if (temp && temp.length > 0) {
                valueData = temp[0]
                break
              }
            } else {
              valueData = temp[0]
              break
            }
          }
        }

        const resultData = valueData.match(/[0-9]/g)
        if ((resultData && resultData.length > 0) || valueData.length === 1) {
          valueData = ''
        }

        const resultItem = {
          key: data.关键词 || index, value: valueData, 摘要: data.摘要 || index, url: data.页面网址 || index

        }
        list.push(resultItem)
      }
    })
    debugger

    // 遍历完成
    setResultList(Array.from(new Set(list)))

  }
  // exportReault()
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
          exportExcel(header, str, "提取结果.xlsx")
        }
      }>导出excel数据</button>
    </div >
  );
}

export default App;
