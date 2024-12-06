const Mentorship = artifacts.require("Mentorship");

contract("Mentorship", (accounts) => {
  it("should call fetchMentorship without errors", async () => {
    const mentorshipInstance = await Mentorship.deployed();
    const departmentId = 1;
    const requester = accounts[0]; // The first account from Truffle's list

    // Call the fetchMentorship function
    const tx = await mentorshipInstance.fetchMentorship(departmentId, { from: requester });

    // Log the transaction and receipt to debug
    console.log("Transaction:", tx);
    console.log("Receipt:", tx.receipt);

    // Ensure the transaction was successful
    assert.ok(tx.receipt && tx.receipt.status, "Transaction should be successful");

    // Check if the event was emitted
    const event = tx.logs.find(log => log.event === "MentorshipFetchRequested");

    // If event is not found, print a message
    if (!event) {
      console.log("Event not emitted!");
    }

    assert.ok(event, "MentorshipFetchRequested event should have been emitted");
    assert.equal(event.args.departmentId.toNumber(), departmentId, "Department ID should match");
    assert.equal(event.args.requester, requester, "Requester address should match");
  });
});
