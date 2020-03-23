let userData = require("./userData.json")
let id = 101

module.exports = {
  getUsers: (req, res) => {
    console.log("hit get users")
    const { age, email, favorites } = req.query
    if (age) {
      const data = userData.filter(u => u.age < +age)
      return res.status(200).send(data)
    }
    if (email) {
      const data = userData.filter(u => u.email === email)
      return res.status(200).send(data)
    }
    if (favorites) {
      const data = userData.filter(u => u.favorites.includes(favorites))
      return res.status(200).send(data)
    }
    return res.status(200).send(userData)
  },
  getUser: (req, res) => {
    console.log("hit get user")
    const { userId } = req.params
    const user = userData.find(u => +u.id === +userId)
    if (!user) {
      return res.status(404).send("User not found")
    }
    return res.status(200).send(user)
  },
  getAdmins: (req, res) => {
    console.log("hit get admins")
    const admins = userData.filter(u => u.type === "admin")
    return res.status(200).send(admins)
  },
  getNonAdmins: (req, res) => {
    console.log("hit get non admins")
    const nonAdmins = userData.filter(u => u.type !== "admin")
    return res.status(200).send(nonAdmins)
  },
  getUserTypes: (req, res) => {
    console.log("hit get user types")
    const { userType } = req.params
    const matchingUsers = userData.filter(u => u.type === userType)
    return res.status(200).send(matchingUsers)
  },
  editUser: (req, res) => {
    const { userId } = req.params
    const {
      first_name,
      last_name,
      email,
      gender,
      language,
      age,
      city,
      state,
      type,
      favorites
    } = req.body
    const userIndex = userData.findIndex(u => +u.id === +userId)
    console.log(userIndex)
    if (userIndex === -1) {
      return res.status(404).send("User not found")
    }
    const newUser = {
      userId,
      first_name,
      last_name,
      email,
      gender,
      language,
      age,
      city,
      state,
      type,
      favorites
    }
    console.log(newUser)
    userData.splice(userIndex, 1, newUser)
    return res.status(200).send(userData)
  },
  createUser: (req, res) => {
    const newUser = { id, ...req.body }
    userData.push(newUser)
    id++
    return res.status(200).send(userData)
  },
  deleteUser: (req, res) => {
    const { userId } = req.params
    const userIndex = userData.findIndex(u => +u.id === +userId)
    userData.splice(userIndex, 1)
    return res.status(200).send(userData)
  }
}
