import useSWR from 'swr'

/* swr best praxis in next.js */

const fetcher = (...args) => fetch(...args).then((res) => res.json())

function Profile() {
  const { data, error } = useSWR('/api/profile-data', fetcher)

  if (error) return <div>Failed to load</div>
  if (!data) return <div>Loading...</div>

  return (
    <div>
      <h1>{data.name}</h1>
      <p>{data.bio}</p>
    </div>
  )
}

/* Klinski
Fetch für Login mit base64 */

/* 
var myHeaders = { 'Content-Type': 'application/json', 'Authorization': 'Basic ' + Buffer.from(userID + ':' + password).toString('base64') }

    const requestOptions = {
  method: 'POST',
  headers: myHeaders,
  body: JSON.stringify({ userID, password })
    };

    return fetch('https://localhost:443/authenticate', requestOptions)
    .then(handleResponse)
    .then(userSession => {
        
        return userSession;
    })
 */