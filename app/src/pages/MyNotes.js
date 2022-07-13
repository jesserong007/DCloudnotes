import React,{useEffect,useState} from "react";
import Editorlistdetail from '../components/Editorlistdetail';
import Doc2 from '../images/doc2.png';
import { useMoralis,useWeb3ExecuteFunction } from 'react-moralis';
import { Spinner } from 'react-bootstrap';

const MyNotes = () => {
  const [list, setList] = useState([]);
  const [noteId,setNoteId] = useState("");
  const [loading,setLoading] = useState(false);
  const { Moralis } = useMoralis();
  const user = Moralis.User.current();

  const getList = async (keyword) => {
    setLoading(true);

    try {
      const Notes  = Moralis.Object.extend("Notes");
      let query1  = new Moralis.Query(Notes);

      query1.equalTo("note_acc",user.attributes.ethAddress);

      let mainQuery = null;

      if(keyword) {
        let query2  = new Moralis.Query(Notes);
        let query3  = new Moralis.Query(Notes);
        let query4  = new Moralis.Query(Notes);
        
        query2.startsWith("title", keyword);
        query3.startsWith("desc",keyword);
        query4.equalTo("is_del",0);
        
        mainQuery = Moralis.Query.and(
          Moralis.Query.and(query1,query4),
          Moralis.Query.or(query2, query3)
        );
      } else {
        query1.equalTo("is_del",0);
        mainQuery = query1;
      }

      const results = await mainQuery.find();
      
      setList(results);

      if(results.length > 0) {
        setNoteId(results[results.length - 1].id);
      }

      setLoading(false);
    } catch (error) {
      console.log(error);
    }
  }

  const inputSearch = (e) => {
    let kw = e.target.value;
    getList(kw);
  }

  const selectNote = (note_id) => {
    setNoteId(note_id);
  }

  useEffect(() => {
    getList('');
  },[]);

  return (
    <div className="pageContent">
      <div className="list">
        <input type="text" className="inputSearch" placeholder="Search" onChange={inputSearch} />
        {loading ?
          <div style={{ display: 'flex', justifyContent: 'center', alignItems: 'center', minHeight: '80vh' }}>
            <Spinner animation="border" style={{ display: 'flex' }} />
            <p className='mx-3 my-0'>Loading...</p>
          </div>
          :
          <ul className="searchList">
            {list?.map((e) => {
              return(
                <li className={e.id == noteId ? 'active':''} key={e.id} onClick={() => {selectNote(e.id)}}>
                  <img className="im" src={Doc2} />
                  <p className="title">{e.attributes.title}</p>
                  <div className="desc">{e.attributes.desc}</div>
                  <p className="date">{e.attributes.add_date}</p>
                </li>
              );
              }).reverse()
            }
            {list.length <= 0 ? <li className="nodata">No Data</li> : ""}
          </ul>
        }
      </div>
      <div className="list-detail">
        <Editorlistdetail noteId={noteId} />
      </div>
    </div>
  );
};

export default MyNotes;

