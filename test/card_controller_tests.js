"use strict";

var expect = require("chai").expect;

var CardController = require("../server/controllers/card_controller");

var utils = require("./server_utils");

describe("CardController", function() {

  describe("createCard", function() {

    it("should create a Card", function(done) {

      var cardModel = {
        title: "Test Card"
      };

      var mock = utils.mockMiddleware({
        body: cardModel,
        json: function(data) {
          expect(data.title).to.eql(cardModel.title);
          expect(data.items).to.be.ok;
          done();
        },
        send: function(err) {
          throw err;
        }
      });

      CardController.createCard(mock.req, mock.res)

    })

  })

})