const express = require('espress')
const app = express()

app.get('/', (request, response, nextHandler) => {
    response.status(200).send('hello its working')
  })

app.listen(3000, () => console.log('Web Server running on port 3000'))
//  http://localhost:3000/ ?

