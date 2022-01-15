//const {formSchema} = require("@whatsapp-clone/common");

const Yup = require("yup")
const formSchema = Yup.object({
    username: Yup.string().required("Username required").min(6, "username too short")
    .max(28, "username too long"),
    password: Yup.string().required("password required").min(6, "password too short")
    .max(28, "password too long"),
})

//make sure what user is typing in  is good
const validateForm = (req, res) => {
    router.post("/login", (req, res) => {
        const formData = req.body;
        formSchema.validate(formData).catch(err => {
            res.status(422).send(); //data cannot pass
            console.log(err.errors);
        }).then(valid => {if (valid) {
            //res.status(200).send();
            console.log('form is good')
        }})
    })
}

module.exports = validateForm;