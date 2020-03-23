const express = require('express')
const app = express()
const port = 3000
const userCtrl = require('./usersCtrl')


app.use(express.json())
app.listen(port, () => console.log(`Server running on ${port}`))

app.get('/api/user', userCtrl.getUsers)
app.get('/api/user/:userId', userCtrl.getUser)
app.get('/api/admin', userCtrl.getAdmins)
app.get('/api/nonadmin', userCtrl.getNonAdmins)
app.get('/api/type/:userType', userCtrl.getUserTypes)

app.put('/api/user/:userId', userCtrl.editUser)

app.post('/api/user', userCtrl.createUser)

app.delete('/api/user/:userId', userCtrl.deleteUser)
