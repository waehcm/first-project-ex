import React, { Component } from 'react'
import {update} from './UserFunctions.component'

class Profile extends Component {
  constructor(props) {
    super(props)
    this.state = {
      id: '',
      username: '',
      email: '',
      errors: {}
    }
    this.onChange = this.onChange.bind(this)
    this.onSubmit = this.onSubmit.bind(this)
  }
  onChange(e) {
    console.log("on change")
    this.setState({ [e.target.name]: e.target.value })
  }
  onSubmit(e) {
    e.preventDefault();
    console.log("on submit")
    const user = {
        id: this.state.id,
        username: this.state.username,
        email: this.state.email
    }
    update(user)
    .then(res => {
      if(res) {
         localStorage.setItem('data_',JSON.stringify(res))
          this.props.history.push('/profile')
          alert("Update successfully")
      }
  })

  }

  componentDidMount() {
    let data = JSON.parse(localStorage.getItem('data_'))
    this.setState({
       id: data._id,
       username: data.username,
       email: data.email
     })
  }

  render() {
    return (
      <div className="container">
        <div className="jumbotron mt-5" >
          <div className="col-sm-8 mx-auto">
            <h1 className="text-center" style={{color:"blue"} }>PROFILE</h1>
          </div>
          <table className="table col-md-6 mx-auto">
            <tbody>
              <tr>
                <td>User Name</td>
                <td>
                  <input
                        type="username"
                        className="form-control"
                        name="username"
                        placeholder={this.state.username}
                        value={this.state.username}
                        onChange={this.onChange}
                      />
                </td>
              </tr>
              <tr>
                <td>Email</td>
                <td>
                <input
                        type="email"
                        className="form-control"
                        name="email"
                        placeholder={this.state.email}
                        value={this.state.email}
                        onChange={this.onChange}
                      />
                </td>
              </tr>
            </tbody>
          </table>
          <button type="submit" onClick={this.onSubmit} >Update</button>
        </div>
      </div>
    )
  }
}

export default Profile