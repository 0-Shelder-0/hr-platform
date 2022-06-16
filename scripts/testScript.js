const baseApiUrl = 'http://localhost:8000/api'
const jsonMimeType = 'application/json'

const name = 'test30'
const email = 'test30@example.ru'
const password = 'test'
const getIdRegex = /\d+/

let token
let studyDirectionId = null
let courseId = null

async function login() {
    data = await fetch(baseApiUrl + `/auth/login?email=${email}&password=${password}`, {
        method: 'POST',
        headers: new Headers({
            Accept: jsonMimeType,
        }),
    })
    data = await data.json()
    token = data.access_token

    if (token == null) {
        console.log('JWT token is null!')
    }
}


let data = await fetch(baseApiUrl + `/auth/register?name=${name}&email=${email}&password=${password}`, {
    method: 'POST',
    headers: new Headers({
        Accept: jsonMimeType,
    }),
})
data = await data.json()
console.log(data);


await login()


data = await fetch(baseApiUrl + '/auth/logout', {
    method: 'POST',
    headers: new Headers({
        Accept: jsonMimeType,
        Authorization: "Bearer " + token
    })
})
data = await data.json()
console.log(data.message)


await login()


data = await fetch(baseApiUrl + '/study-direction/create?name=Backend', {
    method: 'POST',
    headers: new Headers({
        Accept: jsonMimeType,
        Authorization: "Bearer " + token
    }),
})
data = await data.json()
console.log(data.message);

let match = getIdRegex.exec(data.message);
if (match.length === 1) {
    studyDirectionId = match[0];
}


data = await fetch(baseApiUrl + '/mentor/create', {
    method: 'POST',
    headers: new Headers({
        Accept: jsonMimeType,
        Authorization: "Bearer " + token
    }),
})
data = await data.json()
console.log(data.message);


data = await fetch(baseApiUrl + `/course/create?title=Course-1&description=Course+description...&study_direction_id=${studyDirectionId}`, {
    method: 'POST',
    headers: new Headers({
        Accept: jsonMimeType,
        Authorization: "Bearer " + token
    }),
})
data = await data.json()
console.log(data.message);

match = getIdRegex.exec(data.message);
if (match.length === 1) {
    courseId = match[0];
}


data = await fetch(baseApiUrl + `/course/set-user?user_id=1&course_id=${courseId}`, {
    method: 'POST',
    headers: new Headers({
        Accept: jsonMimeType,
        Authorization: "Bearer " + token
    }),
})
data = await data.json()
console.log(data.message)
