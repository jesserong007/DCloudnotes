//SPDX-License-Identifier: Unlicense
pragma solidity ^0.8.0;

contract UserNotes {
    address public owner;
    uint public noteCount; 

    constructor() {
        noteCount = 0;
        owner   = msg.sender;
    }

    struct Note {
        uint noteId;
        string title;
        string desc;
        string noteData;
        string addDate;
        string updateDate;
        address acountAddr;
        bool isDel;
    }

    event notePublished(
        uint noteId,
        string title,
        string desc,
        string noteData,
        string addDate,
        address acountAddr,
        bool isDel
    );

    event noteUpdate(
        uint noteId,
        string title,
        string desc,
        string noteData,
        string addDate,
        string updateDate,
        address acountAddr,
        bool isDel
    );

    event noteDelete(
        uint noteId
    );

    mapping(uint => Note) public notes;

    // 添加笔记
    function addNote(string memory _title,string memory _desc,string memory _noteData,string memory _addDate) external payable {
        require (msg.value == (0.001 ether),"Please submit 0.001 ether");

        noteCount++;

        notes[noteCount] = Note(
            noteCount,
            _title,
            _desc,
            _noteData,
            _addDate,
            "",
            msg.sender,
            false
        );

        emit notePublished(
            noteCount,
            _title,
            _desc,
            _noteData,
            _addDate,
            msg.sender,
            false
        );

        payable(owner).transfer(msg.value);
    }

    // 删除笔记
    function delNote(uint _noteId) external payable {
        require (msg.value == (0.001 ether),"Please submit 0.001 ether");
        require(_noteId > 0 && _noteId <= noteCount, "_noteId doesn't exist");

        Note storage note = notes[_noteId];

        require(!note.isDel, "note already deleted");

        note.isDel = true;

        payable(owner).transfer(msg.value);
    }

    // 恢复笔记
    function recoveryNote(uint _noteId) external payable {
        require (msg.value == (0.001 ether),"Please submit 0.001 ether");
        require(_noteId > 0 && _noteId <= noteCount, "_noteId doesn't exist");

        Note storage note = notes[_noteId];

        require(note.isDel, "note already recovery");

        note.isDel = false;

        payable(owner).transfer(msg.value);
    }

    // 更新笔记
    function updateNote(uint _noteId,string memory _title,string memory _desc,string memory _noteData,string memory _updateDate) external payable {
        require (msg.value == (0.001 ether),"Please submit 0.001 ether");
        require(_noteId > 0 && _noteId <= noteCount, "_noteId doesn't exist");
        
        Note storage note = notes[_noteId];
        note.title = _title;
        note.desc  = _desc;
        note.noteData = _noteData;
        note.updateDate = _updateDate;
        
        emit noteUpdate(
            _noteId,
            note.title,
            note.desc,
            note.noteData,
            note.addDate,
            note.updateDate,
            msg.sender,
            note.isDel
        );

        payable(owner).transfer(msg.value);
    }

    // 彻底删除
    function deleteNote(uint _noteId) external payable {
        require (msg.value == (0.001 ether),"Please submit 0.001 ether");
        require(_noteId > 0 && _noteId <= noteCount, "_noteId doesn't exist");

        delete notes[_noteId];

        emit noteDelete(_noteId);

        payable(owner).transfer(msg.value);
    }
}