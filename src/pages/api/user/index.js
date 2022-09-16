import Auth from "../../../utils/Auth"

export default function Login(request, response) {
    const isValid = Auth(request, response)
    console.log(isValid)
}