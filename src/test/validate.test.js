// Import js to test
import { validateInput } from "../client/js/app";

// Client side test for input validation
describe("Testing input validation", () => {
    test("Testing validateInput() function", () => {

        const userInput = 
        { 
            to: "Paris",
            from: "Berlin",
            startDate: "1/1/2022",
            endDate: "2/2/2022"
        }
        expect(validateInput(userInput)).toBe(true);
    })
});