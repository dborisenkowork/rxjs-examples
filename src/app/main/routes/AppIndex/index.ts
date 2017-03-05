import {Component} from "../../decorators/Component";

console.log(require('./template.pug'));

@Component({
    selector: 'rxjs-route-app-index',
    template: require('./template.pug')(),
    styles: [
        require('./style.less'),
    ]
})
export class AppIndex implements ng.IComponentController
{

}