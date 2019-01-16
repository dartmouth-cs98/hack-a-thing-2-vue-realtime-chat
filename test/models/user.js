const chai = require("chai")
const expect = chai.expect
const User = require("../../models/user")
const check = name => new User({ name, password: "42" }).validate()
chai.use(require("chai-as-promised"))

describe("User", () => {
  context("when verifying name", () => {
    it("should reject any non-alphabet/spaces", () => {
      expect(check("_")).to.be.rejected
      expect(check("1")).to.be.rejected
    })

    it("should enforce name length", () => {
      expect(check("")).to.be.rejected
      expect(check("UserNameTooLongException")).to.be.rejected
    })
  })

  context("when saving name", () => {
    it("should capitalize the name", () => {
      expect(
        new User({ name: "jOhN DoE", password: "42" }).name.slice(0, -5)
      ).to.equal("John Doe")
    })

    it("should add 4-digit hash", () => {
      expect(
        new User({ name: "jOhN DoE", password: "42" }).name.slice(-5)
      ).to.equal("#0066")
    })
  })
})
