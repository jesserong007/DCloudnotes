import React from "react";
import {Link} from 'react-router-dom';
import { defaultImgs } from "../defaultimgs";
import Doc from '../images/doc.png';
import Del from '../images/del.png';
import Setting from '../images/setting.png';
import {useMoralis} from 'react-moralis';

const Sidebar = () => {
  const {Moralis} = useMoralis();
  const user = Moralis.User.current();

  return (
    <div>
      <div className="details">
        <img src={user.attributes.pfp ? user.attributes.pfp : defaultImgs[0]} className="profilePic"></img>
        <div className="profile">
          <div className="who">
            {user.attributes.username}
          </div>
          <div className="accWhen">
            {`${user.attributes.ethAddress.slice(0,4)}...${user.attributes.ethAddress.slice(-3)}`}
          </div>
        </div>
      </div>

      <Link to="/addNotes" className="link">
        <button type="button" className="btn-addDoc">+ Add</button>
      </Link>
      
      <ul className="menuList">
        <Link to="/" className="link">
          <li>
            <img className="im" src={Doc} />
            <span className="txt">My Notes</span>
          </li>
        </Link>
        <Link to="/recycleBin" className="link">
          <li>
            <img className="im" src={Del} />
            <span className="txt">Recycle Bin</span>
          </li>
        </Link>
        <Link to="/setting" className="link">
          <li>
            <img className="im" src={Setting} />
            <span className="txt">Setting</span>
          </li>
        </Link>
      </ul>
    </div>
  );
};

export default Sidebar;

