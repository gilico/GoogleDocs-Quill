import React, {useState} from "react";
import Expire from "../../components/Expire";
import MainComp from '../../components/MainComp/MainCom';
import {useDispatch, useSelector} from 'react-redux';
import 'react-quill/dist/quill.snow.css'; 
import './TextEditorStyle.css'
import {useNavigate} from "react-router-dom";
import {createDocsAction} from "../../redux/actions/documentAction";
import QuillComp from "./QuillComp";
import ErrorMessage from "../../components/ErrorMessage";
import AddCollsComp from "../../components/AddCollsComp";

const QuillEditor = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const [content, setContent] = useState("");
  const [title, setTitle] = useState("");
  const [coWorkers, setCoWorkers] = useState("");
  const [error, setError] = useState("");
  const [collaborators, setCollaborators] = useState([]);
  
  const userLogin = useSelector((state) => state.userLogin);
  const {userInfo} = userLogin;

  
  const sumbitHandler = (e) => {
    e.preventDefault();
    
    if(!title || !content) return;
    dispatch(createDocsAction(title, content,collaborators));
    resetHandler();
    navigate(-1);
  }
  
  const resetHandler = () => {
    setTitle("");
    setContent("");
    setCoWorkers("");
    setCollaborators([])
  }

  return(

    <MainComp className="wrap" title={userInfo && `${userInfo.name}, Create New Documents`}>
      { error && <Expire delay="3000"><ErrorMessage>{ error }</ErrorMessage></Expire>}
      <form className="create-form" onSubmit={sumbitHandler}>

        <label><span>Document's Title: </span>
          <input
            type="text"
            value={title}
            onChange={(e) => setTitle(e.target.value)}
          ></input>
        </label>

        <div className="main-content">
          <QuillComp
            setContent={setContent}
            content={content}
            required
          />
          <div className="collabs-cont">
            <p><span>Collaboratos</span> </p>
            <div className="collabs" >
              {collaborators && collaborators.map((email,i) =>
              <div className="emails" key={i}>
                <p key={i}>{email}{console.log(email)}</p>
              </div>)}
            </div>
          </div>
        </div>


        <div className="btn-cont">
          <button type="submit">Create New</button>
          <button className="reset" onClick={resetHandler}>Reset All</button>
        </div>
    </form>
    <AddCollsComp 
      coWorkers={coWorkers}
      setCollaborators={setCollaborators}
      collaborators={collaborators}
      setCoWorkers={setCoWorkers}
      setError={setError}
    />
    </MainComp>

  )
}

export default QuillEditor;