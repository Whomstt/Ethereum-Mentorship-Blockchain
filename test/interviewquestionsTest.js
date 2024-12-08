const assert = require('assert');
const InterviewQuestions = artifacts.require("InterviewQuestions");

contract("InterviewQuestions Contract", (accounts) => {
  let interviewQuestions;
  let txReceipt;
  let gasUsed;

  beforeEach(async () => {
    interviewQuestions = await InterviewQuestions.new();
  });

  it("should fetch interview question answers within 2 seconds", async () => {
    const questionId = 1;
    const requester = accounts[0];

    const startTime = Date.now();
    txReceipt = await interviewQuestions.fetchInterviewQuestions(questionId, { from: requester });
    const latency = Date.now() - startTime;

    console.log(`Latency: ${latency} ms`);
    assert(latency < 2000, "Transaction took too long!");
  });

  it("should handle 100 requests in under 50 seconds", async () => {
    const questionId = 1;
    const requester = accounts[0];
    const numberOfRequests = 100;

    const startTime = Date.now();
    for (let i = 0; i < numberOfRequests; i++) {
      await interviewQuestions.fetchInterviewQuestions(questionId, { from: requester });
    }
    const totalTime = Date.now() - startTime;

    console.log(`Total time for 100 requests: ${totalTime} ms`);
    assert(totalTime < 50000, `Scalability test took too long! (${totalTime} ms)`);
  });

  it("should use less than 100,000 gas for fetchInterviewQuestions", async () => {
    const questionId = 1;
    const requester = accounts[0];

    txReceipt = await interviewQuestions.fetchInterviewQuestions(questionId, { from: requester });
    gasUsed = txReceipt.receipt.gasUsed;

    console.log(`Gas used: ${gasUsed}`);
    assert(gasUsed < 100000, "Gas usage exceeded limit!");
  });
});
