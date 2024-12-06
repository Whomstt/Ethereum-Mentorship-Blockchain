const Mentorship = artifacts.require("Mentorship");

contract("Mentorship", (accounts) => {
  it("should call fetchMentorship without errors", async () => {
    const mentorshipInstance = await Mentorship.deployed();
    const departmentId = 1;
    const requester = accounts[0];

    // Call the fetchMentorship function and get the transaction receipt
    const tx = await mentorshipInstance.fetchMentorship(departmentId, { from: requester });

    // Check if the transaction was successful
    assert.ok(tx.receipt.status, "Transaction should be successful");
  });
});
