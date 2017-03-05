import {AppModule} from "../../index";

import {AppIndex} from "./routes/AppIndex/index";
import {Example01BindButton} from "./routes/Example01BindButton/index";
import {Example02DragAndDrop} from "./routes/Example02DragAndDrop/index";

export const APP_MAIN_MODULE: AppModule = {
    components: [
        AppIndex,
        Example01BindButton,
        Example02DragAndDrop,
    ]
};