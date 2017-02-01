module.exports = class Interval {
    constructor(api) {
        this.api = api;
        this.id = 2000000001;

        this.setIntervals();
    }

    setIntervals() {
        //this.snow();
    }

    snow() {
        /*setInterval(() => {
            this.api.send('снег не захотел быть в центре событий', this.id);
        }, (1000 * 60) * 20);*/
    }

    handler(data) {
        console.log('Прикинь, он хотел сюда попасть!');
    }
};