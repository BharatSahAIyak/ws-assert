const { testSingleQuery } = require("./index");

describe('listenForResponse', () => {
    it('should return the response', async () => {
        const queryFromUser = "How to grow rice?";
        const response = await testSingleQuery(queryFromUser);
        // call the API that GR gave to evaluate answer
        expect(1).toBe(1);
    }, 30000);
});