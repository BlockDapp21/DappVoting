const { expect } = require("chai");

describe("Vote", function () {
  let Vote, vote, owner, addr1, addr2;

  // La fonction beforeEach est exécutée avant chaque test
  beforeEach(async () => {
    Vote = await ethers.getContractFactory("Vote");
    vote = await Vote.deploy();
    [owner, addr1, addr2] = await ethers.getSigners();
  });

  // Premier test - Voter correctement :
  it("Should vote correctly", async function () {
    await vote.vote(1);  // Voter pour "Oui"
    const option = await vote.options(1);
    expect(option.voteCount).to.equal(1);
  });

  // Deuxième test - Empêcher le double vote
  it("Shouldn't allow double voting", async function () {
    await vote.vote(1);
    await expect(vote.vote(1)).to.be.revertedWith("Vous ne pouvez plus voter");
  });
  
  // Test pour s'assurer que le contrat est initialisé avec les bonnes options
  it("Should initialize with correct options", async function () {
    const option0 = await vote.options(0);
    const option1 = await vote.options(1);
    const option2 = await vote.options(2);

    expect(option0.name).to.equal("Vote blanc");
    expect(option1.name).to.equal("Oui");
    expect(option2.name).to.equal("Non");

    expect(option0.voteCount).to.equal(0);
    expect(option1.voteCount).to.equal(0);
    expect(option2.voteCount).to.equal(0);
  });

  // Test pour s'assurer qu'un utilisateur ne peut pas voter pour une option non existante
  it("Shouldn't allow voting for non-existent option", async function () {
    await expect(vote.vote(5)).to.be.revertedWith("Cette option n'existe pas");
  });

  // Test pour s'assurer que différents utilisateurs peuvent voter
  it("Should allow different users to vote", async function () {
    await vote.vote(1); // owner votes
    await vote.connect(addr1).vote(2); // addr1 votes
    await vote.connect(addr2).vote(0); // addr2 votes

    const option0 = await vote.options(0);
    const option1 = await vote.options(1);
    const option2 = await vote.options(2);

    expect(option0.voteCount).to.equal(1);
    expect(option1.voteCount).to.equal(1);
    expect(option2.voteCount).to.equal(1);
  });

  
  
});
