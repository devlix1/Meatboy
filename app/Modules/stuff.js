module.exports = new class {
    random(min, max) {
        return parseInt(min + Math.random() * (max - min));
    }

    randomArray(array) {
        return array[this.random(0, array.length)];
    }

    randomObject(object) {
        return parseInt(Math.random() * Object.keys(object).length - 1);
    }
};