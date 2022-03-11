import React , {useEffect} from 'react'
import {useDispatch, useSelector} from 'react-redux';
import {Link, useNavigate} from 'react-router-dom';
import ErrorMessage from '../../components/ErrorMessage';
import Loading from '../../components/Loading';
import MainComp from '../../components/MainComp/MainCom';
import {listDocs} from '../../redux/actions/documentAction';
import './home.css'

const Home = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const userLogin = useSelector((state) => state.userLogin);
  const {userInfo} = userLogin;

  const docsList = useSelector(state => state.docsList);
  const { loading, docsList:docs, createError:error } = docsList;

  useEffect(() => {
    if(!userInfo)
    {
      navigate('/signup');
    }

    dispatch(listDocs());

  }, [dispatch , navigate, userInfo]);

  

  return (
    <MainComp title={userInfo && `${userInfo.name}'s Documents`}>
      <div>
      <Link to={`/create/`}><button className='creat-new-btn'>Create New Document +</button></Link>
        { error && <ErrorMessage>{ error }</ErrorMessage>}
        { loading && <Loading/>}

        <div className="doc-cont">
         { docs?.reverse().map(item =>
            <div key={item._id} className='doc-item'>
              <div className='small-content'>
                <p dir='auto' dangerouslySetInnerHTML={{__html: item.content}} />
              </div>
              <Link to={`/update/${item._id}`}>
                <div className='item-details'>
                  <p><span>Document Title:</span> {item.title}</p>
                  <p><span>Creator:</span> {item.userCreator}</p>
                  <p><span>Last Update: </span>{new Date(item.lastUpdate).toLocaleDateString()} | {new Date(item.lastUpdate).toLocaleTimeString()} </p>
                </div>
              </Link>
            </div> 
         )} 
        </div>
      </div>
    
    </MainComp>
      
  )
}

export default Home