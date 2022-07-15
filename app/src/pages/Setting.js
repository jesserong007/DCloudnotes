import React,{ useEffect,useState } from "react";
import './Settings.css';
import pfp1 from "../images/pfp1.png";
import pfp2 from "../images/pfp2.png";
import pfp3 from "../images/pfp3.png";
import pfp4 from "../images/pfp4.png";
import pfp5 from "../images/pfp5.png";
import {useMoralis,useMoralisWeb3Api,useMoralisQuery} from 'react-moralis';

const Setting = () => {
  const [username, setUsername] = useState();
  const [selectedPFP, setSelectedPFP] = useState();
  const [pfps, setPfps] = useState([]);
  const {Moralis} = useMoralis();
  const Web3Api = useMoralisWeb3Api();
  const user = Moralis.User.current();

  const saveEdits = async () => {
    const User = Moralis.Object.extend("_User");
    const query = new Moralis.Query(User);
    const myDetails = await query.first();

    if(selectedPFP) {
      myDetails.set("pfp",selectedPFP);
    }

    if(username) {
      myDetails.set("username",username);
    }

    await myDetails.save();
    alert("Save successful !");
    window.location.href = "/";
  }

  const fetchNFTs = async () => {
    const options = {
      chain:"mumbai",
      address:user.attributes.ethAddress
    }
    
    const mumbaiNFTs = await Web3Api.account.getNFTs(options);

    let images = [];

    for (let i = 0; i < mumbaiNFTs.result.length ; i++) {
      if(mumbaiNFTs.result[i]) {
        let metadata = JSON.parse(mumbaiNFTs.result[i].metadata);

        if(metadata && metadata.imageUri) {
          let link = resolveLink(metadata.imageUri);
          images.push(link);
        }
      }
    }
    
    images.push(pfp1);
    images.push(pfp2);
    images.push(pfp3);
    images.push(pfp4);
    images.push(pfp5);
    setPfps(images);
    setUsername(user.attributes.username);
    setSelectedPFP(user.attributes.pfp);
  }

  useEffect(() => {
    
    fetchNFTs();
  },[]);

  const resolveLink = (url) => {
    if(!url || !url.includes("ipfs://")) return url;
    return url.replace("ipfs://","https://gateway.ipfs.io/ipfs/");
  };

  return (
    <div className="pageContent">
      <div className="list-detail2">
        <div className="settingsPage">
        <input
          className="inputUsername"
          placeholder="Please input username"
          onChange={(e)=> setUsername(e.target.value)}
          defaultValue={username}
        />

        <div className="pfp">
          Profile Image (Your NFTs)
          <div className="pfpOptions">
            {
              pfps.map((e,i)=>{
                return(
                <div key={i}>
                  <img src={e} 
                      className={selectedPFP === e ? "pfpOptionSelected":"pfpOption"} 
                      onClick={()=>setSelectedPFP(pfps[i])}>
                  </img>
                </div>
                )
              })
            }
          </div>
        </div>

        <div className="save" onClick={()=>saveEdits()}>
          Save
        </div>

      </div>
      </div>
    </div>
  );
};

export default Setting;

