
(function(global) {
    var DocUtils = global.DocUtils || (global.Docxtemplater && global.Docxtemplater.DocUtils);
    if (!DocUtils) {
        throw new Error("DocUtils is not defined. Ensure that docxtemplater is loaded before this script.");
    }

    function ImageModule(options) {
        this.options = options || {};
    }

    ImageModule.prototype.getImage = function(tagValue) {
        return this.options.getImage(tagValue);
    };

    ImageModule.prototype.getSize = function(img, tagValue) {
        return this.options.getSize(img, tagValue);
    };

    ImageModule.prototype.getRenderedPart = function(part, tagValue, offset) {
        if (this.options.fileType === "pptx") {
            return this.getRenderedPartPptx(part, tagValue, offset);
        } else {
            return this.getRenderedPartDocx(part, tagValue, offset);
        }
    };

    ImageModule.prototype.getRenderedPartPptx = function(part, tagValue, offset) {
        var img = this.getImage(tagValue);
        var size = this.getSize(img, tagValue);
        var rId = part.rels.addImageRels(img);
        var xmlString = templates.getPptxImageXml(rId, size, offset);
        return DocUtils.str2xml(xmlString);
    };

    ImageModule.prototype.getRenderedPartDocx = function(part, tagValue, offset) {
        var img = this.getImage(tagValue);
        var size = this.getSize(img, tagValue);
        var rId = part.rels.addImageRels(img);
        var xmlString = templates.getDocxImageXml(rId, size, offset);
        return DocUtils.str2xml(xmlString);
    };

    ImageModule.prototype.render = function(part, tagValue, offset) {
        return this.getRenderedPart(part, tagValue, offset);
    };

    global.ImageModule = ImageModule;
})(window);
