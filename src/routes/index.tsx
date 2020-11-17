import * as React from 'react'
import { HashRouter as Router, Route, Redirect } from 'react-router-dom'
import Layout from '../layout'
import components from './components'
// import Button from '../components/Button'

interface RouterProps {
  key: string,
  component: React.ComponentType
}

function RouteList(route: RouterProps) {
  return <Route key={route.key} component={route.component} ></Route>
}

console.log('---', RouteList)

export default function (props: any) {
  return (
    <Router >
      <Route path="/" children={params => {
        return (
          <Button />
        )
      }}></Route>
    </Router>
  )
}