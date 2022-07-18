const { expect } = require("chai");
const { ethers } = require("hardhat");

describe("UserNotes", function () {
    const price = ethers.utils.parseEther("0.001","ether");

    it("Test notes", async function () {
        const UserNotes = await ethers.getContractFactory("UserNotes");
        const userNotes = await UserNotes.deploy();
        await userNotes.deployed();

        const account = await ethers.getSigner();

        // add note
        let _title   = "test";
        let _desc    = "testtest";
        let _noteData = "http://www.baidu.com";
        let _addDate = "2022.7.18";
        await userNotes.connect(account).addNote(_title,_desc,_noteData,_addDate,{value:price});
        const id = await userNotes.noteCount();
        expect(id).to.be.equal(1);

        // delete note
        await userNotes.connect(account).delNote(id,{value:price});
        let note = await userNotes.connect(account).notes(id);
        expect(note.isDel).to.be.equal(true);

        // recovery note
        await userNotes.connect(account).recoveryNote(id,{value:price});
        note = await userNotes.connect(account).notes(id);
        expect(note.isDel).to.be.equal(false);

        // update note
        _title = "test111";
        _desc    = "testtest111";
        _noteData = "http://www.google.com";
        _updateDate = "2022.7.19";
        await userNotes.connect(account).updateNote(id,_title,_desc,_noteData,_updateDate,{value:price});
        note = await userNotes.connect(account).notes(id);
        expect(note.noteData).to.be.equal(_noteData);
    });
});
