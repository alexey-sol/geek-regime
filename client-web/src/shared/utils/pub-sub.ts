export class PubSub<T, R = void> {
    private events: Record<string, Array<(data?: T) => R>> = {};

    subscribe = (eventName: string, fn: (data?: T) => R): void => {
        if (!this.events[eventName]) {
            this.events[eventName] = [];
        }

        this.events[eventName].push(fn);
    };

    unsubscribe = (eventName: string, fn: (data: T) => R): void => {
        const eventFns = this.events[eventName];

        if (eventFns) {
            this.events[eventName] = eventFns.filter((eventFn) => eventFn !== fn);
        }
    };

    publish = (eventName: string, data?: T): void => {
        const eventFns = this.events[eventName];

        if (eventFns) {
            eventFns.forEach((eventFn) => eventFn(data));
        }
    };
}
