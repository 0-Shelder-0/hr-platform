const baseApiUrl = 'http://localhost:8000/api'
const jsonMimeType = 'application/json'

const name = 'test10'
const email = 'test10@example.ru'
const password = 'test'
const getIdRegex = /\d+/

let token = null
let studyDirectionId = null
let courseId = null


fetch(baseApiUrl + '/auth/register', {
    method: 'POST',
    headers: new Headers({
        Accept: jsonMimeType
    }),
    body: JSON.stringify({
        name: name,
        email: email,
        password: password
    })
})
    .then(result => result.json())
    .then((data) => {
        console.log(data);
        token = data.token;
    })

if (token == null) {
    console.log('JWT token is null!')
}


fetch(baseApiUrl + '/auth/logout', {
    method: 'POST',
    headers: new Headers({
        Accept: jsonMimeType,
        Authorization: "Bearer " + token
    })
})
    .then((data) => data.json())
    .then((msg) => console.log(msg.message))


fetch(baseApiUrl + '/auth/login', {
    method: 'POST',
    headers: new Headers({
        Accept: jsonMimeType
    }),
    body: JSON.stringify({
        email: email,
        password: password
    })
})
    .then((response) => response.json())
    .then((data) => {
        token = data.token
        console.log(data)
    })


fetch(baseApiUrl + '/study-direction/create', {
    method: 'POST',
    headers: new Headers({
        Accept: jsonMimeType,
        Authorization: "Bearer " + token
    }),
    body: JSON.stringify({
        name: 'Backend',
    })
})
    .then((response) => response.json())
    .then(msg => {
        console.log(msg.message);

        let match = getIdRegex.exec(msg.message);
        if (match.length === 1) {
            studyDirectionId = match[0];
        }
    })


fetch(baseApiUrl + '/course/create', {
    method: 'POST',
    headers: new Headers({
        Accept: jsonMimeType,
        Authorization: "Bearer " + token
    }),
    body: JSON.stringify({
        title: 'Course-1',
        description: 'Course description...',
        study_direction_id: studyDirectionId,
    })
})
    .then((response) => response.json())
    .then(msg => {
        console.log(msg.message);

        let match = getIdRegex.exec(msg.message);
        if (match.length === 1) {
            courseId = match[0];
        }
    })


fetch(baseApiUrl + '/course/set-user', {
    method: 'POST',
    headers: new Headers({
        Accept: jsonMimeType,
        Authorization: "Bearer " + token
    }),
    body: JSON.stringify({
        user_id: 1,
        course_id: courseId,
    })
})
    .then((response) => response.json())
    .then(msg => console.log(msg.message))
