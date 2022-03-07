var Color = /** @class */ (function () {
    function Color() {
        this.randomColor = function () {
            var red = Math.floor(Math.random() * 255);
            var green = Math.floor(Math.random() * 255);
            var blue = Math.floor(Math.random() * 255);
            return "rgb(".concat(red, ",").concat(green, ",").concat(blue, ")");
        };
    }
    return Color;
}());
var colorgenerator = new Color();
console.log(colorgenerator.randomColor());
