export default class PubSub {
    constructor() {
        this.events = {};
    }

    /**
     * @param {string} event
     * @param {function} callback
     * @returns {number}
     * @memberof PubSub
     */
    subscribe(event, callback) {
        let self = this;

        if (!self.events.hasOwnProperty(event)) {
            self.events[event] = [];
        }

        return self.events[event].push(callback);
    }

    /**
     * @param {string} event
     * @param {object} [data={}]
     * @returns {array}
     * @memberof PubSub
     */
    publish(event, data = {}) {
        let self = this;

        if (!self.events.hasOwnProperty(event)) {
            return [];
        }

        return self.events[event].map((callback) => callback(data));
    }
}
