const { testSingleQuery } = require("./index");

describe('listenForResponse', () => {
    const tests = ["How to grow rice?", "How to grow rice"]; // create array from CSV
    for (let i = 0; i < tests.length; i++) {
        it(`running query ${i}`, async () => {
            console.log(tests[i]);
            const response = await testSingleQuery(tests[i]);
            // call the API that GR gave to evaluate answer
            expect(1).toBe(1);
        }, 30000);
    }
});


