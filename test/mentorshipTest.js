const assert = require('assert');
const Mentorship = artifacts.require("Mentorship");

contract("Mentorship Contract", (accounts) => {
  let mentorship;
  let txReceipt;
  let gasUsed;

  beforeEach(async () => {
    mentorship = await Mentorship.new();
  });

  it("should fetch mentorship details within 2 seconds", async () => {
    const departmentId = 1;
    const requester = accounts[0];

    const startTime = Date.now();
    txReceipt = await mentorship.fetchMentorship(departmentId, { from: requester });
    const latency = Date.now() - startTime;

    console.log(`Latency: ${latency} ms`);
    assert(latency < 2000, "Transaction took too long!");
  });

  it("should handle 100 requests in under 50 seconds", async () => {
    const departmentId = 1;
    const requester = accounts[0];
    const numberOfRequests = 100;

    const startTime = Date.now();
    for (let i = 0; i < numberOfRequests; i++) {
      await mentorship.fetchMentorship(departmentId, { from: requester });
    }
    const totalTime = Date.now() - startTime;

    console.log(`Total time for 100 requests: ${totalTime} ms`);
    assert(totalTime < 50000, `Scalability test took too long! (${totalTime} ms)`);
  });

  it("should use less than 100,000 gas for fetchMentorship", async () => {
    const departmentId = 1;
    const requester = accounts[0];

    txReceipt = await mentorship.fetchMentorship(departmentId, { from: requester });
    gasUsed = txReceipt.receipt.gasUsed;

    console.log(`Gas used: ${gasUsed}`);
    assert(gasUsed < 100000, "Gas usage exceeded limit!");
  });
});
