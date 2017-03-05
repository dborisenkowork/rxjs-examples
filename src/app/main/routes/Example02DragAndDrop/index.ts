import {Component} from "../../decorators/Component";
import {Observable} from "rxjs";

@Component({
    selector: 'rxjs-example02-drag-and-drop',
    template: require('./template.pug')(),
    styles: [
        require('./style.less'),
    ],
    bindings: {
        $router: '<',
    },
})
export class Example02DragAndDrop implements ng.IComponentController
{
    public static BOX_SIZE = 100;

    $onInit(): void {
        this.noneBox();
        this.delayBox();
        this.debounceBox();
        this.takeBox();
        this.takeUntilBox();
        this.takeWhileBox();
        this.takeLastBox();
        this.bestBox();
    }

    noneBox(): void {
        let button: HTMLButtonElement = <any> document.querySelector('#example02boxNone');

        Observable.fromEvent(button, 'mousedown').subscribe((evMouseDown: MouseEvent) => {
            let startX = evMouseDown.offsetX;
            let startY = evMouseDown.offsetY;

            let mouseUpSubscription = Observable.fromEvent(document, 'mouseup')
                .subscribe((evMouseUp: MouseEvent) => {
                    mouseUpSubscription.unsubscribe();
                    mouseMoveSubscription.unsubscribe();
                });

            let mouseMoveSubscription = Observable.fromEvent(document, 'mousemove')
                .subscribe((evMouseMove: MouseEvent) => {
                    button.style.position = 'fixed';
                    button.style.top = (evMouseMove.screenY - startY) + "px";
                    button.style.left = (evMouseMove.screenX - startX) + "px";
                });
        });
    }

    delayBox(): void {
        let button: HTMLButtonElement = <any> document.querySelector('#example02boxDelay');

        Observable.fromEvent(button, 'mousedown').subscribe((evMouseDown: MouseEvent) => {
            let startX = evMouseDown.offsetX;
            let startY = evMouseDown.offsetY;

            let mouseUpSubscription = Observable.fromEvent(document, 'mouseup')
                .subscribe((evMouseUp: MouseEvent) => {
                    mouseUpSubscription.unsubscribe();
                    mouseMoveSubscription.unsubscribe();
                });

            let mouseMoveSubscription = Observable.fromEvent(document, 'mousemove')
                .delay(100)
                .subscribe((evMouseMove: MouseEvent) => {
                    button.style.position = 'fixed';
                    button.style.top = (evMouseMove.screenY - startY) + "px";
                    button.style.left = (evMouseMove.screenX - startX) + "px";
                });
        });
    }

    debounceBox(): void {
        let button: HTMLButtonElement = <any> document.querySelector('#example02boxDebounce');

        Observable.fromEvent(button, 'mousedown').subscribe((evMouseDown: MouseEvent) => {
            let startX = evMouseDown.offsetX;
            let startY = evMouseDown.offsetY;

            let mouseUpSubscription = Observable.fromEvent(document, 'mouseup')
                .subscribe((evMouseUp: MouseEvent) => {
                    mouseUpSubscription.unsubscribe();
                    mouseMoveSubscription.unsubscribe();
                });

            let mouseMoveSubscription = Observable.fromEvent(document, 'mousemove')
                .debounceTime(50)
                .subscribe((evMouseMove: MouseEvent) => {
                    button.style.position = 'fixed';
                    button.style.top = (evMouseMove.screenY - startY) + "px";
                    button.style.left = (evMouseMove.screenX - startX) + "px";
                });
        });
    }

    takeBox(): void {
        let button: HTMLButtonElement = <any> document.querySelector('#example02boxTake');

        let maxTakes = 200;

        Observable.fromEvent(button, 'mousedown').subscribe((evMouseDown: MouseEvent) => {
            button.innerHTML = maxTakes.toString();

            let startX = evMouseDown.offsetX;
            let startY = evMouseDown.offsetY;

            let mouseUpSubscription = Observable.fromEvent(document, 'mouseup')
                .subscribe((evMouseUp: MouseEvent) => {
                    button.innerHTML = 'TAKE';

                    mouseUpSubscription.unsubscribe();
                    mouseMoveSubscription.unsubscribe();
                });

            let mouseMoveSubscription = Observable.fromEvent(document, 'mousemove')
                .take(maxTakes)
                .subscribe((evMouseMove: MouseEvent) => {
                    button.innerHTML = Math.max(0, parseInt(button.innerHTML) - 1).toString();
                    button.style.position = 'fixed';
                    button.style.top = (evMouseMove.screenY - startY) + "px";
                    button.style.left = (evMouseMove.screenX - startX) + "px";
                });
        });
    }

    takeUntilBox(): void {
        let button: HTMLButtonElement = <any> document.querySelector('#example02boxTakeUntil');

        let mouseUp = Observable.fromEvent(document, 'mouseup');

        Observable.fromEvent(button, 'mousedown').subscribe((evMouseDown: MouseEvent) => {
            let startX = evMouseDown.offsetX;
            let startY = evMouseDown.offsetY;

            Observable.fromEvent(document, 'mousemove')
                .takeUntil(mouseUp)
                .subscribe((evMouseMove: MouseEvent) => {
                    button.style.position = 'fixed';
                    button.style.top = (evMouseMove.screenY - startY) + "px";
                    button.style.left = (evMouseMove.screenX - startX) + "px";
                });
        });
    }

    takeWhileBox(): void {
        let button: HTMLButtonElement = <any> document.querySelector('#example02boxTakeWhile');

        let mouseUp = Observable.fromEvent(document, 'mouseup');

        Observable.fromEvent(button, 'mousedown').subscribe((evMouseDown: MouseEvent) => {
            let startX = evMouseDown.offsetX;
            let startY = evMouseDown.offsetY;

            Observable.fromEvent(document, 'mousemove')
                .takeUntil(mouseUp)
                .takeWhile((evMouseMove: MouseEvent) => {
                    let newY = (evMouseMove.screenY - startY);
                    let newX = (evMouseMove.screenX - startX);

                    return (newX + Example02DragAndDrop.BOX_SIZE < screen.width)
                        && (newY + Example02DragAndDrop.BOX_SIZE < screen.height)
                        && (newX > 0)
                        && (newY > 0)
                        ;
                })
                .subscribe(
                    (evMouseMove: MouseEvent) => {
                        button.style.position = 'fixed';
                        button.style.top = (evMouseMove.screenY - startY) + "px";
                        button.style.left = (evMouseMove.screenX - startX) + "px";
                    },
                    undefined,
                    () => {
                        button.innerHTML = 'OUT';

                        setTimeout(() => {
                            button.innerHTML = 'TAKE_WHILE';
                        }, 2000);
                    }
                );
        });
    }

    takeLastBox(): void {
        let button: HTMLButtonElement = <any> document.querySelector('#example02boxTakeLast');

        let mouseUp = Observable.fromEvent(document, 'mouseup');

        Observable.fromEvent(button, 'mousedown').subscribe((evMouseDown: MouseEvent) => {
            let startX = evMouseDown.offsetX;
            let startY = evMouseDown.offsetY;

            Observable.fromEvent(document, 'mousemove')
                .takeUntil(mouseUp)
                .takeLast(10)
                .subscribe(
                    (evMouseMove: MouseEvent) => {
                        setTimeout(() => {
                            console.log('Move TakeLast Box: ', evMouseMove.screenY - startY, evMouseMove.screenX - startX);

                            button.style.position = 'fixed';
                            button.style.top = (evMouseMove.screenY - startY) + "px";
                            button.style.left = (evMouseMove.screenX - startX) + "px";
                        }, 10);
                    },
                );
        });
    }

    bestBox(): void {
        let button: HTMLButtonElement = <any> document.querySelector('#example02boxBest');

        let mouseUp = Observable.fromEvent(document, 'mouseup');

        Observable.fromEvent(button, 'mousedown').subscribe((evMouseDown: MouseEvent) => {
            let startX = evMouseDown.offsetX;
            let startY = evMouseDown.offsetY;

            Observable.fromEvent(document, 'mousemove')
                .takeUntil(mouseUp)
                .takeWhile((evMouseMove: MouseEvent) => {
                    let newY = (evMouseMove.screenY - startY);
                    let newX = (evMouseMove.screenX - startX);

                    return (newX + Example02DragAndDrop.BOX_SIZE < screen.width)
                        && (newY + Example02DragAndDrop.BOX_SIZE < screen.height)
                        && (newX > 0)
                        && (newY > 0)
                        ;
                })
                .debounceTime(5)
                .delay(50)
                .subscribe((evMouseMove: MouseEvent) => {
                    button.style.position = 'fixed';
                    button.style.top = (evMouseMove.screenY - startY) + "px";
                    button.style.left = (evMouseMove.screenX - startX) + "px";
                });
        });
    }
}