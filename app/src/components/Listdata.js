import React,{useEffect,useState} from "react";
import Doc2 from '../images/doc2.png';
import { useMoralis,useWeb3ExecuteFunction } from 'react-moralis';

const Listdata = (selectNote) => {
  const [list, setList] = useState([]);
  const { Moralis } = useMoralis();
  const user = Moralis.User.current();

  const getList = async () => {
    try {
      const Notes = Moralis.Object.extend("Notes");
      const query  = new Moralis.Query(Notes);
      
      query.equalTo("note_acc",user.attributes.ethAddress)
      
      const results = await query.find();
      setList(results);
    } catch (error) {
      console.log(error);
    }
  }

  useEffect(() => {
    console.log(selectNote);
    getList();
  },[selectNote]);

  return (
    <div>
      <input type="text" className="inputSearch" placeholder="Search" />
      <ul className="searchList">
        {list?.map((e) => {
          return(
            <li onClick={() => {selectNote(e.attributes)}}>
              <img className="im" src={Doc2} />
              <p className="title">{e.attributes.title}</p>
              <div className="desc">{e.attributes.desc}</div>
              <p className="date">{e.attributes.add_date}</p>
            </li>
          );
          }).reverse()
        }
      </ul>
    </div>
  );
};

export default Listdata;

