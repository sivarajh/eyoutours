"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var tslib_1 = require("tslib");
var AdaptiveCardBuilder = (function () {
    function AdaptiveCardBuilder() {
        this.container = {
            type: "Container",
            items: []
        };
        this.card = {
            type: "AdaptiveCard",
            version: "0.5",
            body: [this.container]
        };
    }
    AdaptiveCardBuilder.prototype.addColumnSet = function (sizes, container) {
        if (container === void 0) { container = this.container; }
        var columnSet = {
            type: 'ColumnSet',
            columns: sizes.map(function (size) {
                return {
                    type: 'Column',
                    size: size.toString(),
                    items: []
                };
            })
        };
        container.items.push(columnSet);
        return columnSet.columns;
    };
    AdaptiveCardBuilder.prototype.addItems = function (elements, container) {
        if (container === void 0) { container = this.container; }
        container.items.push.apply(container.items, elements);
    };
    AdaptiveCardBuilder.prototype.addTextBlock = function (text, template, container) {
        if (container === void 0) { container = this.container; }
        if (typeof text !== 'undefined') {
            var textblock = tslib_1.__assign({ type: "TextBlock", text: text }, template);
            container.items.push(textblock);
        }
    };
    AdaptiveCardBuilder.prototype.addButtons = function (buttons) {
        if (buttons) {
            this.card.actions = buttons.map(function (button) {
                var cardAction = tslib_1.__assign({ __isBotFrameworkCardAction: true }, button);
                return {
                    title: button.title,
                    type: "Action.Submit",
                    data: cardAction
                };
            });
        }
    };
    AdaptiveCardBuilder.prototype.addCommon = function (content) {
        this.addTextBlock(content.title, { size: "medium", weight: "bolder" });
        this.addTextBlock(content.subtitle, { isSubtle: true, wrap: true, separation: "none" }); //TODO remove "as any" because separation is not defined
        this.addTextBlock(content.text, { wrap: true });
        this.addButtons(content.buttons);
    };
    AdaptiveCardBuilder.prototype.addImage = function (url, container) {
        if (container === void 0) { container = this.container; }
        var image = {
            type: "Image",
            url: url,
            size: "stretch"
        };
        container.items.push(image);
    };
    return AdaptiveCardBuilder;
}());
exports.AdaptiveCardBuilder = AdaptiveCardBuilder;
exports.buildCommonCard = function (content) {
    if (!content)
        return null;
    var cardBuilder = new AdaptiveCardBuilder();
    cardBuilder.addCommon(content);
    return cardBuilder.card;
};
//# sourceMappingURL=CardBuilder.js.map