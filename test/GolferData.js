const GolferData = artifacts.require("GolferData");
const utils = require("./helpers/utils");
// const { time } = require('@openzeppelin/test-helpers');
//TODO: import expect into our project

contract("GolferData", (accounts) => {
    let [alice, bob] = accounts;
    let contractInstance;
    beforeEach(async () => {
        contractInstance = await GolferData.new();
    });
    it("test createGolfer", async () => {
        let name = "Tiger";
        let id = 1;
        let cost = 2;
        let result = await contractInstance.createGolfer(name, id, cost, {from: alice});
        assert.equal(result.receipt.status, true);

        assert.equal(result.logs[0].args.name, name );
        assert.equal(result.logs[0].args.cost, cost);
        assert.equal(result.logs[0].args.golferID, id);

    })

    it("test createGolfer - golfer creation should fail due to bad input data", async () => {
        let name = "";
        let id = 1023;
        let cost = 2;
        await utils.shouldThrow(contractInstance.createGolfer(name, id, cost, {from: alice}));

        name = "Tiger";
        id = 0;
        cost = 2;
        await utils.shouldThrow(contractInstance.createGolfer(name, id, cost, {from: alice}));

        name = "Tiger";
        id = 1;
        cost = 0;
        await utils.shouldThrow(contractInstance.createGolfer(name, id, cost, {from: alice}));


    })

    it("test createGolfer - golfer creation should fail because caller is not contract owner", async () => {
        let name = "Tiger";
        let id = 1023;
        let cost = 2;
        await utils.shouldThrow(contractInstance.createGolfer(name, id, cost, {from: bob}));




    })



    it("test modifyGolferPrice", async () => {
      let name = "Tiger";
      let id = 1;
      let cost = 2;
      let result = await contractInstance.createGolfer(name, id, cost, {from: alice});
      let newCost = 5;
      result = await contractInstance.modifyGolferCost(id, newCost, {from: alice});
      assert.equal(result.receipt.status, true);
      assert.equal(result.logs[0].args.newCost, newCost);
      assert.equal(result.logs[0].args.golferID, id);

    })

    it("test modifyGolferPrice - should fail because golfer does not exist", async () => {
      let name = "Tiger";
      let id = 1;
      let cost = 2;
      let result = await contractInstance.createGolfer(name, id, cost, {from: alice});
      let newCost = 5;
      await utils.shouldThrow(contractInstance.modifyGolferCost(2, newCost, {from: alice}));


    })

    it("test modifyGolferPrice - should fail becuase caller is not contract owner", async () => {
      let name = "Tiger";
      let id = 1;
      let cost = 2;
      let result = await contractInstance.createGolfer(name, id, cost, {from: alice});
      let newCost = 5;
      await utils.shouldThrow(contractInstance.modifyGolferCost(id, newCost, {from: bob}));


    })

    it("test getGolfer" , async () => {
      let name = "Tiger";
      let id = 1;
      let cost = 2;
      let result = await contractInstance.createGolfer(name, id, cost, {from: alice});

      let golferInfo = await contractInstance.getGolfer(id);
      assert.equal(golferInfo[0], name);
      


    })



})
