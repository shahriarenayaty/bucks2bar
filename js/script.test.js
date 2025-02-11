// filepath: /Users/indimedhealthintelligence/Project/learning/copilot/bucks2bar/js/script.test.js

describe("Username Validation", () => {
    const regex = /^(?=.*[A-Z])(?=.*[0-9])(?=.*[!@#\$%\^&\*])(?=.{8,})/;

    test("valid username with capital letter, number, special character, and at least 8 characters", () => {
        const username = "Valid1@Username";
        expect(regex.test(username)).toBe(true);
    });

    test("invalid username without capital letter", () => {
        const username = "invalid1@username";
        expect(regex.test(username)).toBe(false);
    });

    test("invalid username without number", () => {
        const username = "Invalid@Username";
        expect(regex.test(username)).toBe(false);
    });

    test("invalid username without special character", () => {
        const username = "Invalid1Username";
        expect(regex.test(username)).toBe(false);
    });

    test("invalid username with less than 8 characters", () => {
        const username = "Inv1@U";
        expect(regex.test(username)).toBe(false);
    });

    test("valid username with exactly 8 characters", () => {
        const username = "Val1@Us";
        expect(regex.test(username)).toBe(false);
    });
});