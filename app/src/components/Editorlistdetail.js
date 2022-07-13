import React from "react";
import { useEffect,useState } from "react";

import "quill/dist/quill.snow.css";
import Quill from 'quill/dist/quill.min.js';
import { useMoralis,useWeb3ExecuteFunction } from 'react-moralis';
import UserNotes from '../contractABIs/UserNotes.json';

const contractAddress = "0x0c0789CBB453Bca1e67A899f2643aec2E5E25d8D";

const Editorlistdetail = (noteData) => {
  const [editor, setEditor] = useState(null);
  const [userNotes,setUserNotes] = useState(null);
  const [title,setTitle]    = useState("");
  const [defaultTitle,setDefaultTitle] = useState("");
  const [noteId,setNoteId] = useState("");
  const [loading,setLoading] = useState(false);
  const { Moralis } = useMoralis();
  const contractProcessor = useWeb3ExecuteFunction();
  const user = Moralis.User.current();
  
  // 实例化编辑器
  const initEditor = () => {
    if(editor) return;

    const toolbarOptions = [
      ['bold', 'italic', 'underline', 'strike'],        // toggled buttons
      ['blockquote', 'code-block'],

      [{ 'header': 1 }, { 'header': 2 }],               // custom button values
      [{ 'list': 'ordered'}, { 'list': 'bullet' }],
      [{ 'script': 'sub'}, { 'script': 'super' }],      // superscript/subscript
      [{ 'indent': '-1'}, { 'indent': '+1' }],          // outdent/indent
      [{ 'direction': 'rtl' }],                         // text direction

      [{ 'size': ['small', false, 'large', 'huge'] }],  // custom dropdown
      [{ 'header': [1, 2, 3, 4, 5, 6, false] }],

      [{ 'color': [] }, { 'background': [] }],          // dropdown with defaults from theme
      [{ 'font': [] }],
      [{ 'align': [] }],

      ['image'],

      ['clean']                                         // remove formatting button
    ];

    const editorObj = new Quill('#editor', {
      modules: { toolbar: toolbarOptions },
      theme: 'snow',
    });

    setEditor(editorObj);

    let wheight = document.body.clientHeight;
    let editorHeight = wheight - 146;
    document.getElementById("editor").style.height = editorHeight + 'px';
  }

  // 获取笔记
  const getNote = async (noteId) => {
    if(!noteId) return;
    setLoading(true);

    const Notes = Moralis.Object.extend("Notes");
    const query = new Moralis.Query(Notes);

    setNoteId(noteId);

    query.get(noteId).then(
      async (note) => {
        if(note) {
          // 读取ipfs地址
          const response = await fetch(note.attributes.note_data);
          const metadata = await response.json();
          
          if(metadata.title) {
            setDefaultTitle(metadata.title);
            setTitle(metadata.title);
          }

          if(metadata.content) {
            editor.setContents(metadata.content);
          }
        }

        setLoading(false);
      },
      (error) => {
        console.log(error);
      }
    );
  }

  // 更新笔记 
  const updateNote = async (noteObj,title,desc,ipfsFile,updateDate) => {
    if(!noteObj || !title || !desc || !ipfsFile || !updateDate) return;

    noteObj.set("note_acc",user.attributes.ethAddress);
    noteObj.set("title", title);
    noteObj.set("desc", desc);
    noteObj.set("note_data",ipfsFile);
    noteObj.set("add_date",noteObj.attributes.add_date);
    noteObj.set("update_date",updateDate);
    
    noteObj.save().then(
      (notes) => {
        alert('Update successful !');
        getNote(notes.id);
        setLoading(false);
      },
      (error) => {
        console.log(error.message);
      }
    );
  }

  // 更新笔记内容到区块链
  const maticUpdateNote = async (noteId,title,desc,content,html) => {
    const Notes = Moralis.Object.extend("Notes");
    const query = new Moralis.Query(Notes);

    setLoading(true);

    query.get(noteId).then(
      async (note) => {
        if(note) {
          console.log(note);

          let myDate  = new Date();

          // 获取日期
          let updateDate = myDate.getFullYear() + '.' + (parseInt(myDate.getMonth()) + 1) + '.' + myDate.getDate();

          // 将notes数据构建成json文件
          let filename = Date.parse(myDate) + ".json";
          let fileData = JSON.stringify({title:title,desc:desc,content:content,html:html,add_date:note.attributes.add_date,update_date:updateDate});

          let blob     = new Blob([fileData],{type:"text/json"});
          let newFile  = new File([blob],filename);

          // 把json文件上传到ipfs
          const file = new Moralis.File(newFile.name,newFile);
          await file.saveIPFS();
          let ipfsFile = file.ipfs();

          const options = {value: Moralis.Units.ETH(0.001)};

          console.log(note.attributes.nid);

          let tx = await userNotes.updateNote(note.attributes.nid,title,desc,ipfsFile,updateDate,options);
          let rc = await tx.wait();
          
          updateNote(note,title,desc,ipfsFile,updateDate);
        }
      },
      (error) => {
        console.log(error);
      }
    );
  }

  // 把笔记添加到区块链
  const maticAddNote = async (title,desc,content,html) => {
    setLoading(true);

    let myDate  = new Date();

    // 获取日期
    let addDate = myDate.getFullYear() + '.' + (parseInt(myDate.getMonth()) + 1) + '.' + myDate.getDate();

    // 将notes数据构建成json文件
    let filename = Date.parse(myDate) + ".json";
    let fileData = JSON.stringify({title:title,desc:desc,content:content,html:html,add_date:addDate});

    let blob     = new Blob([fileData],{type:"text/json"});
    let newFile  = new File([blob],filename);

    // 把json文件上传到ipfs
    const file = new Moralis.File(newFile.name,newFile);
    await file.saveIPFS();
    const ipfsFile = file.ipfs();

    const options = {value: Moralis.Units.ETH(0.001)};

    let tx = await userNotes.addNote(title,desc,ipfsFile,addDate,options);
    let rc = await tx.wait();

    console.log(rc);

    let noteHex = await userNotes.noteCount();

    console.log(noteHex._hex);

    let nid  = noteHex.toNumber();

    console.log(nid);

    if(nid) {
      let addNoteData = {
        nid:nid,
        title:title,
        desc:desc,
        note_data:ipfsFile,
        add_date:addDate
      }
      addNote(addNoteData);
    }
  }

  // 实例化合约
  const initUserNotesContract = () => {
    const ethers = Moralis.web3Library;
    const provider = new ethers.providers.Web3Provider(window.ethereum);
    const userNotes = new ethers.Contract(contractAddress, UserNotes.abi, provider.getSigner());
    setUserNotes(userNotes);
  }

  // 将笔记添加到数据库
  const addNote = async (data) => {
    const Notes = Moralis.Object.extend("Notes");
    const notes = new Notes();

    notes.set("nid",data.nid);
    notes.set("note_acc",user.attributes.ethAddress);
    notes.set("title", data.title);
    notes.set("desc", data.desc);
    notes.set("note_data",data.note_data);
    notes.set("add_date",data.add_date);
    notes.set("is_del",0);

    notes.save().then(
      (notes) => {
        alert('Add successful !');
        setLoading(false);
        window.location.href = "/";
      },
      (error) => {
        console.log("Failed to create new object, with error code: " + error.message);
      }
    );
  }

  // 保存数据
  const saveContent = async () => {
    const contentData = editor.getContents();
    const desc    = editor.getText(0, 60).trim().replaceAll(" ","");
    const content = contentData.ops;
    const html = document.getElementById('editor').innerHTML;

    if(!title) {
      alert("Please input title!");
      return;
    }

    if(!content) {
      alert('Please input content!');
      return;
    }

    if(noteId) {
      maticUpdateNote(noteId,title,desc,content,html);
    } else {
      maticAddNote(title,desc,content,html);
    }
  }

  // 删除数据
  const delContent = async () => {
    if(!noteId) return;

    const Notes = Moralis.Object.extend("Notes");
    const query = new Moralis.Query(Notes);

    query.get(noteId).then(
      async (note) => {
        if(note) {
          note.set("is_del",1);
          
          note.save().then(
            (notes) => {
              alert('Delele successful !');
              window.location.href = "/";
            },
            (error) => {
              console.log("Failed to set object, with error code: " + error.message);
            }
          );
        }
      },
      (error) => {
        console.log(error);
      }
    );
  }

  useEffect(() => {
    if(noteData.noteId) {
      getNote(noteData.noteId);
    }

    initUserNotesContract();
    initEditor();
  },[noteData])

  return (
    <div>
      {loading ?
        <div className="loadingDiv">
          <p className='mx-3 my-0'>Awaiting...</p>
        </div>
        :
        ""
      }
      <div className="title">
        <input type="text" className="titleInput" placeholder="Please input title" defaultValue={defaultTitle} onChange={(e)=> setTitle(e.target.value)} />
        <button type='button' className="btn-saveData" onClick={saveContent}>Save</button>
        {noteId ? <button type='button' className="btn-delData" onClick={delContent}>Delete</button>:""}
      </div>
      <div className="editor">
        <div id="editor">

        </div>
      </div>
    </div>
  );
};

export default Editorlistdetail;

