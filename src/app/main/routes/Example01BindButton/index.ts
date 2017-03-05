import {Component} from "../../decorators/Component";
import {Observable} from "rxjs";

@Component({
    selector: 'rxjs-example01-bind-button',
    template: require('./template.pug')(),
    bindings: {
        $router: '<',
    },
})
export class Example01BindButton implements ng.IComponentController
{
    $onInit(): void {
        let button = document.querySelector('#example01bind');

        let obs = Observable.fromEvent(button, 'click');

        obs.subscribe(next => {
            console.log('Clicked!');
        });

        obs
            .scan((count: number) => count + 1, 0)
            .subscribe(count => console.log(`Clicked ${count} times!`));

        obs
            .delay(500)
            .scan((count: number) => count + 1, 0)
            .subscribe(count => console.log(`Delay clicked ${count} times!`));


        obs
            .throttleTime(1000)
            .scan((count: number) => count + 1, 0)
            .subscribe(count => console.log(`Throtte click: ${count} times!`));
    }
}