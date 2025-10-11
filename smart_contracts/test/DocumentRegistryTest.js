const { expect } = require("chai");

describe("DocumentRegistry", function () {
  let dr;

  const deployedAddress = "0x5FbDB2315678afecb367f032d93F642f64180aa3"; // Your deployed contract address

  // Before each test, attach to the already deployed contract
  beforeEach(async function () {
    const DocumentRegistry = await ethers.getContractFactory("DocumentRegistry");
    dr = DocumentRegistry.attach(deployedAddress); // Attach to the deployed contract
  });

  // Test for registering a document
  it("should register a document", async function () {
    const hash = ethers.keccak256(ethers.toUtf8Bytes("doc1"));
    const uri = "ipfs://QmTestHash";

    // Register the document
    await dr.registerDocument(hash, uri);

    // Verify that the document was registered correctly
    const [registered, returnedUri, uploader, timestamp] = await dr.verifyDocument(hash);
    expect(registered).to.be.true;
    expect(returnedUri).to.equal(uri);
    expect(uploader).to.equal(deployer.address); // Assuming deployer is the owner
  });

  // Test that a document cannot be registered twice
  it("should not allow duplicate registrations", async function () {
    const hash = ethers.keccak256(ethers.toUtf8Bytes("doc2"));
    const uri = "ipfs://QmDupHash";

    await dr.registerDocument(hash, uri);
    // Try registering it again - should fail
    await expect(dr.registerDocument(hash, uri)).to.be.revertedWith("already registered");
  });

  // Test that only the owner can register a document
  it("should restrict registerDocument to owner", async function () {
    const [owner, notOwner] = await ethers.getSigners();
    const hash = ethers.keccak256(ethers.toUtf8Bytes("doc3"));
    const uri = "ipfs://QmUnauthorized";

    // This should revert, as only the owner can register documents
    await expect(dr.connect(notOwner).registerDocument(hash, uri)).to.be.revertedWith("only owner");
  });
});
