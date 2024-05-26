import React, { useState, useEffect } from "react";
import Table from "./Table";
import Form from "./Form";

function MyApp() {
    const [characters, setCharacters] = useState([]);

    useEffect(() => {
        fetchUsers()
            .then((res) => res.json())
            .then((json) => {
                setCharacters(json["users_list"])})
            .catch((error) => { console.log(error); });
      }, [] );

    function removeOneCharacter(index) {
        let id
        characters.forEach((character, i) => {
            if (i === index) {
                id = character._id
            };
        });
        const updated = characters.filter((character, i) => {
          return i !== index;
        });
        deleteUser(id)
        .then((res) => {
            if (res.status === 204) {
                setCharacters(updated);
            } else {
                console.log("Error: " + res.status + " No object found.");
            }})
        .catch((error) => {
            console.log(error);
        });
    }

    function updateList(person) {
        postUser(person)
        .then((res) => {
            if (res.status === 201) {
                return res.json()
                
            } else {
                console.log("Error: " + res.status);
                return undefined;
            }
        })
        .then((json) => {
            if(json) setCharacters([...characters, json])
        })
        .catch((error) => {
          console.log(error);
        })
    }

    function fetchUsers() {
        const promise = fetch("http://localhost:8000/users");
        return promise;
    }

    function postUser(person) {
        const promise = fetch("Http://localhost:8000/users", {
            method: "POST",
            headers: {
            "Content-Type": "application/json",
            },
            body: JSON.stringify(person),
        });

        return promise;
    }
    
    function deleteUser(id) {
        const promise = fetch(`Http://localhost:8000/users/${id}`, {
            method: "DELETE",
        });
        return promise;
    }

    return (
        <div className="container">
        <Table 
            characterData={characters}
            removeOneCharacter={removeOneCharacter}
        />
        <Form handleSubmit={updateList}/>
        </div>
    );

    
}

export default MyApp;