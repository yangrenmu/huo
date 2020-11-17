import * as React from 'react'
import { Link } from 'react-router-dom'

export default class App extends React.Component {
  renderLayout() {
    const { children } = this.props
    return (
      <div>
        <header></header>
      </div>
    )
  }
}