import React from 'react';
import { useTable } from 'react-table'

import './App.css';

import EssayForm from './EssayForm'

import {nbd} from './nbd'
import Histogram from './Histogram';
import { forceCenter } from 'd3';

class App extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      tableData: [],
    }
  }
  
  onFormSubmit = (data) => {
    let result = nbd(data, 'frequency');
    if (result) {
      result.unique_words = result.data.length;
      this.setState(prevState => ({tableData: [result, ... prevState.tableData]}),
        this.setState({r: result.r,alpha: result.alpha, data: result.data, actual: result.actual, expected: result.expected, t: result.t, word_count: result.word_count, ll: result.ll})

        // this.setState({r: result.r, alpha: result.alpha, data: result.data, t: result.t, word_count: result.word_count, ll: result.ll})
      )
    }
  }

  renderHist = () => {
    if ( this.state.r && this.state.alpha && this.state.word_count && this.state.t) {
      // return <Histogram data={this.state.data} r={this.state.r} alpha={this.state.alpha} t={this.state.t} word_count={this.state.word_count}/>
      return <Histogram data={this.state.data} actual={this.state.actual} expected={this.state.expected}  r={this.state.r} alpha={this.state.alpha} t={this.state.t} word_count={this.state.word_count}/>
    }
  }
  render()  { 
    return (
      <div className="App" style={{alignItems: 'center',justifyContent: 'center',display: 'flex', flexDirection:'column', padding: 50}}>
        <h1>Measuring Lexical Diversity using the NBD</h1>
        <div style={{paddingLeft: 100, paddingRight: 100, }}>
          <p style={{textAlign: 'center', alignContent: 'center', justifyContent:'center'}}>Lexical Diversity is a measure of an individual's vocabulary breadth, often measured by computing the ratio of unique words to total words. While more sophisticated measures have been proposed, such measures are generally scale dependent. By fitting an NBD model to a person's given text, we can evaluate the heterogeneity of the word uniqueness within the text and provide a better measure of LD. In general, a lower "r" score indicates more heterogeneity and thus greater vocabulary breadth, while a higher "r" indicates more homogeneity and less breadth.</p>
        </div>
        <EssayForm onFormSubmit={this.onFormSubmit}/>
        {this.renderHist()}
        <div style={tableStyle}>
          <Table columns={columns} data={this.state.tableData}/>
        </div>
        {/* <p>{this.state.r ? 'r is '+ this.state.r : ''}</p>
        <p>{this.state.alpha ? 'alpha is ' + this.state.alpha.toFixed(3) : ''}</p>
        <p>{this.state.t ? 't is ' + this.state.t : ''}</p>
        <p>{this.state.ll ? 'Log-Likelihood is ' + this.state.ll.toFixed(3) : ''}</p>
        <p>{this.state.data ? 'number of unique words is ' + this.state.data.length : ''}</p>
        <p>{this.state.word_count ? 'number of total words is ' + this.state.word_count : ''}</p> */}
      </div>
    );
  }
}

const tableStyle = {
  // padding: 1,
  // borderSpacing: 1,
  // border: 1,
  // borderWidth: 1,
  // // display: 'flex',
  // // alignItems: 'center',
  // // justifyContent: 'center',
  // textAlign: 'center', 
  // alignContent: 'center', 
  // justifyContent:'center',
  // paddingLeft: 100, 
  // paddingRight: 100,
  // margin: 'auto'
}

const columns = [
  {
    Header: "Info",
    columns: [
      {
        Header: 'r-score',
        accessor: 'r',
      },
      {
        Header: 'alpha',
        accessor: 'alpha',
      },
      {
        Header: 't',
        accessor: 't',
      },
      {
        Header: 'Log Likelihood',
        accessor: 'll',
      },
      {
        Header: 'unique words',
        accessor: 'unique_words',
      },
      {
        Header: 'word count',
        accessor: 'word_count',
      },
      {
        Header: 'Chisq p-value',
        accessor: 'chisq',
      },
      {
        Header: 'degrees of freedom',
        accessor: 'df',
      },
    ],
  },
  
]

function Table({ columns, data }) {
  // Use the state and functions returned from useTable to build your UI
  const {
    getTableProps,
    getTableBodyProps,
    headerGroups,
    rows,
    prepareRow,
  } = useTable({
    columns,
    data,
  })

  // Render the UI for your table
  return (
    <table {...getTableProps()}>
      <thead>
        {headerGroups.map(headerGroup => (
          <tr {...headerGroup.getHeaderGroupProps()}>
            {headerGroup.headers.map(column => (
              <th {...column.getHeaderProps()}>{column.render('Header')}</th>
            ))}
          </tr>
        ))}
      </thead>
      <tbody {...getTableBodyProps()}>
        {rows.map(
          (row, i) => {
            prepareRow(row);
            return (
              <tr {...row.getRowProps()}>
                {row.cells.map(cell => {
                  return <td {...cell.getCellProps()}>{cell.render('Cell')}</td>
                })}
              </tr>
            )}
        )}
      </tbody>
    </table>
  )
}

export default App;
