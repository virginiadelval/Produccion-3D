import React from 'react'

import { Route, Switch } from 'react-router-dom'
import Home from 'containers/Home'

const BaseRouter = () => (
  <Switch>
    <Route exact path="/" component={Home} />
    <Route
      component={() => {
        window.location = 'https://idemsa.municipalidadsalta.gob.ar/'
      }}
    />
  </Switch>
)

export default BaseRouter
