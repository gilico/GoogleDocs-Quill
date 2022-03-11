import axios from 'axios';
import React, {useEffect} from 'react'

const AddCollsComp = (prop) => {
  const addNewColl = async(e) => {
    e.preventDefault();
    let user
    try 
    {
      user = await axios.get(`/api/users/getuser/${prop.coWorkers}`);
      if(user){
        prop.setCollaborators([...prop.collaborators, 
          prop.coWorkers
        ])
        prop.setCoWorkers("");
      }
    } 
    catch (error) {
      if(!user){
        prop.setError("User Not Registered")
      }else{
        prop.setError(error.message)
      }
    }
  }

  return (
      <form className="coll-form" onSubmit={addNewColl}>
          <label><span>Who do you like to work with?</span>
          <input
              type="email"
              value={prop.coWorkers}
              onChange={e => prop.setCoWorkers(e.target.value)}
              ></input>
          <button  className="new-col-btn" type="add">Add New</button>
          </label>
      </form>
  )
}

export default AddCollsComp