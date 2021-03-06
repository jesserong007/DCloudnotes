import React from "react";
import { useEffect,useState } from "react";
import { useMoralis,useWeb3ExecuteFunction } from 'react-moralis';
import Loading from "../images/loding.gif";

const Listdetail = (noteData) => {
  const [defaultTitle,setDefaultTitle] = useState("");
  const [content,setContent] = useState("");
  const [noteId,setNoteId] = useState("");
  const [loading,setLoading] = useState(false);
  const { Moralis } = useMoralis();
  const user = Moralis.User.current();

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
          }

          if(metadata.html) {
            document.getElementById('editorContent0').innerHTML = metadata.html;
          } else {
            document.getElementById('editorContent0').innerHTML = '';
          }
        }

        setLoading(false);
      },
      (error) => {
        console.log(error);
      }
    );
  }

  // 恢复笔记
  const recoverData = () => {
    if(!noteId) return;

    const Notes = Moralis.Object.extend("Notes");
    const query = new Moralis.Query(Notes);

    query.get(noteId).then(
      async (note) => {
        if(note) {
          note.set("is_del",0);
          
          note.save().then(
            (notes) => {
              alert('Recover successful !');
              setDefaultTitle('');
              document.getElementById('editorContent0').innerHTML = '';
              noteData.getList('');
            },
            (error) => {
              console.log(error.message);
            }
          );
        }
      },
      (error) => {
        console.log(error);
      }
    );
  }

  // 彻底删除笔记
  const delData = () => {
    if(!noteId) return;

    let b = window.confirm("Deleted and cannot be restored , confirm to delete the note ?");

    if(!b) return;

    const Notes = Moralis.Object.extend("Notes");
    const query = new Moralis.Query(Notes);

    query.get(noteId).then(
      async (note) => {
        if(note) {
          note.destroy().then(
            (myObject) => {
              alert("Delete successful !");
              setDefaultTitle('');
              document.getElementById('editorContent0').innerHTML = '';
              noteData.getList('');
            },
            (error) => {
              console.log(error);
            }
          );
        }
      },
      (error) => {
        console.log(error);
      }
    );
  }

  const initHeight = () => {
    let wheight = document.body.clientHeight;
    let editorHeight = wheight - 80;
    document.getElementById("editorContent0").style.height = editorHeight + 'px';
  }

  useEffect(() => {
    if(noteData.noteId) {
      getNote(noteData.noteId);
    }
    initHeight();
  },[noteData])

  return (
    <div>
      {loading ?
        <div className="loadingDiv">
          <p className='mx-3 my-0'>
            <img src={Loading} />
          </p>
        </div>
        :
        ""
      }
      <div className="title">
        <input type="text" className="titleInput" defaultValue={defaultTitle} disabled="disabled" />
        <button type='button' className="btn-recoverData" onClick={recoverData}>Recover</button>
        <button type='button' className="btn-delData2" onClick={delData}>Delete</button>
      </div>
      <div className="editorContent" id="editorContent0">
      </div>
    </div>
  );
};

export default Listdetail;

