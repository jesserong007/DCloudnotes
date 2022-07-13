const { expect } = require("chai");
const { ethers } = require("hardhat");

describe("UserNotes", function () {

    it("Test notes", async function () {
        const UserNotes = await ethers.getContractFactory("UserNotes");
        const userNotes = await UserNotes.deploy();
        await userNotes.deployed();

        const account = await ethers.getSigner();

        // add note
        let _noteUrl = "http://www.baidu.com";
        let _cid = "123";
        await userNotes.connect(account).addNote(_noteUrl,_cid);
        const id = await userNotes.noteCount();
        expect(id).to.be.equal(1);

        // delete note
        await userNotes.connect(account).delNote(1);
        let note = await userNotes.connect(account).notes(1);
        expect(note.isDel).to.be.equal(true);

        // recovery note
        await userNotes.connect(account).recoveryNote(1);
        note = await userNotes.connect(account).notes(1);
        expect(note.isDel).to.be.equal(false);

        // update note
        _noteUrl = "http://www.google.com";
        _cid = "12344";
        await userNotes.connect(account).updateNote(1,_noteUrl,_cid);
        note = await userNotes.connect(account).notes(1);
        expect(note.noteUrl).to.be.equal(_noteUrl);
    });
});
