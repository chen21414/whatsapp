const Yup = require("yup")

//shape of the restriction of the data
const formSchema = Yup.object({
    username: Yup.string().required("Username required").min(6, "username too short")
    .max(28, "username too long"),
    password: Yup.string().required("password required").min(6, "password too short")
    .max(28, "password too long"),
})


module.exports = {formSchema}