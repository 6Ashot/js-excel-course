import {isEqual} from '@core/utils';

export class StoreSubscriber {
    constructor(store) {
        this.store = store;
        this.sub = null;
        this.prevStore = {};
    }

    subscribeComponents(components) {
        this.prevStore = this.store.getState();
        this.sub = this.store.subscribe(state => {
            Object.keys(state).forEach(key => {
                if(!isEqual(this.prevStore[key], state[key])) {
                    components.forEach(component => {
                        if(component.isWatching(key)) {
                            const changed = {[key]: state[key]};
                            component.storeChange(changed);
                        }
                    });
                }
            });
            this.prevStore = this.store.getState();
            if(process.env.NODE_ENV === 'development') {
                window['redux'] = this.prevStore;
            }
        });
    }

    unsubscribeFromStore() {
        this.sub.unsubscribe();
    }
}
