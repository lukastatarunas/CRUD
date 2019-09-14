import React, { Component } from 'react'
import './App.css'

class App extends Component {

  constructor(props) {
    super(props)
    this.state = {
      title: `CRUD`,
      act: 0,
      index: ``,
      data: []
    }
  } 

  componentDidMount() {
    this.refs.name.focus()
  }

  onSubmit = e => {
    e.preventDefault()

    let data = this.state.data
    let name = this.refs.name.value
    let age = this.refs.age.value

    if (this.state.act === 0) {
      let dataObj = {
        name, age
      }

      data.push(dataObj)
    }
    
    else {
      let index = this.state.index
      data[index].name = name
      data[index].age = age
    }    

    this.setState({
      data: data,
      act: 0
    })

    this.refs.myForm.reset()
    this.refs.name.focus()
  }

  onDelete = i => {
    let data = this.state.data
    data.splice(i, 1)
    
    this.setState({
      data: data
    })

    this.refs.myForm.reset()
    this.refs.name.focus()
  }

  onEdit = i => {
    let data = this.state.data[i]
    this.refs.name.value = data.name
    this.refs.age.value = data.age

    this.setState({
      act: 1,
      index: i
    })

    this.refs.name.focus()
  }  

  render() {
    const { title, data } = this.state
    return (
      <div className="App">
        <h2 className="title">{ title }</h2>
        <form ref="myForm" className="myForm">
          <input type="text" ref="name" placeholder="Your Name" className="formField" />
          <input type="text" ref="age" placeholder="Your Age" className="formField" />
          <button onClick={ e => this.onSubmit(e) } className="myButton">SUBMIT</button>
        </form>
        <pre>
          { data.map((data, i) =>
            <li key={ i } className="myList">
              { i + 1 }. { data.name }, { data.age }
              <button onClick={ () => this.onDelete(i) } className="myListButton">DELETE</button>
              <button onClick={ () => this.onEdit(i) } className="myListButton">EDIT</button>
            </li>
          ) }
        </pre>
      </div>
    )
  }
}

export default App