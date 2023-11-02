import React, { useState, useEffect } from "react";
import { useParams } from "react-router-dom";
import {useAuthContext} from '../hooks/useAuthContext'

const CodeDetail = () => {
  const { id } = useParams(); // Get the code ID from the URL
    const { user } = useAuthContext();

  const [code, setCode] = useState(null);
  console.log('this id', id)
  useEffect(() => {

    // Fetch the code details based on codeId
    const fetchCodeDetails = async () => {
      try {
        const response = await fetch(
          `http://localhost:4000/api/codes/${id}`, {
            headers: {
              Authorization : `Bearer ${user.token}`
            },
          });
          console.log(user.token)
        if (response.ok) {
          const codeData = await response.json();
          setCode(codeData);
        } else {
          console.log(id)
          // Handle error when code is not found
        }
      } catch (error) {
        // Handle other errors
      }
    };

    fetchCodeDetails();
  }, [id]);

  return (
    <div>
      {code ? (
        <div>
          <h2>{code.title}</h2>
          <p>{code.language}</p>
          {/* Display other code details */}
        </div>
      ) : (
        <p>Loading...</p>
      )}
    </div>
  );
};

export default CodeDetail;
