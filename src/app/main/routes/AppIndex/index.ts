import {Component} from "../../decorators/Component";

import {AppIndexNone} from "../AppIndexNone/index";
import {Example01BindButton} from "../Example01BindButton/index";
import {Example02DragAndDrop} from "../Example02DragAndDrop/index";

@Component({
    selector: 'rxjs-route-app-index',
    template: require('./template.pug')(),
    styles: [
        require('./style.less'),
    ],
    routes: [
        {
            path: '/',
            name: 'AppIndexNone',
            component: AppIndexNone,
            useAsDefault: true,
        },
        {
            path: '/examples-01-bind-button',
            name: 'Example01BindButton',
            component: Example01BindButton,
        },
        {
            path: '/examples-02-drag-and-drop',
            name: 'Example02DragAndDrop',
            component: Example02DragAndDrop,
        }
    ]
})
export class AppIndex implements ng.IComponentController
{

}