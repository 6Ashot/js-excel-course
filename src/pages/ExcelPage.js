import {Page} from '@core/page/Page';
import {StateProcessor} from '@core/page/StateProcessor';
import {LocalStorageClient} from '../shared/LocalStorageClient';
import {createStore} from '@core/store/createStore';
import {rootReducer} from '@/redux/rootReducer';
import {normalizeInitialState} from '@/redux/initianState';
import {Excel} from '@/components/excel/Excel';
import {Header} from '@/components/header/Header';
import {Toolbar} from '@/components/toolbar/Toolbar';
import {Formula} from '@/components/formula/Formula';
import {Table} from '@/components/table/Table';
import {storage, debounce} from '@core/utils';


export class ExcelPage extends Page {
    constructor(param) {
        super(param);
        this.sub = null;
        this.processor = new StateProcessor(
            new LocalStorageClient(this.params)
        );
    }

    async getRoot() {
        // const param = this.params ? this.params : Date.now().toString();
        // const state = storage(storageName(param));
        const state = await this.processor.get();
        const store = createStore(rootReducer, normalizeInitialState(state));
        // const stateListener = debounce(state => {
        //     storage(storageName(param), state);
        // }, 300);

        this.sub = store.subscribe(this.processor.listen);

        this.excel = new Excel({
            components: [Header, Toolbar, Formula, Table],
            store
        });
        return this.excel.getRoot();
    }

    afterRender() {
        this.excel.init();
    }

    destroy() {
        this.sub.unsubscribe();
        this.excel.destroy();
    }
}
