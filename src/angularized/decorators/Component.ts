import {makeInjections} from "../functions/makeInjections";
import {ANGULARIZED_DEBUG_ENABLED} from "../debug";

export interface RouteConfig
{
    path: string,
    name: string,
    component: ng.IComponentController,
    useAsDefault?: boolean;
}

export interface ComponentDefinition extends ng.IComponentOptions
{
    template?: string,
    selector?: string,
    styles?: string[],
    injects?: any[],
    bindings?: any;
    routes?: RouteConfig[],
    factory?: (...args) => ng.IComponentController,
}

export class ComponentDefinitions
{
    public static $instance: ComponentDefinitions;

    register(module: angular.IModule, target: Function, definition: ComponentDefinition) {
        definition = this.factoryDefinition(target, definition);

        if(ANGULARIZED_DEBUG_ENABLED) {
            console.log(`Angularized: register component ${definition.selector}`)
        }

        target['$selector'] = definition.selector;
        definition.factory.$inject = makeInjections(definition.injects);

        let componentDefinition: any = {
            controller: definition.factory,
            template: definition.template,
            bindings: definition.bindings
        };

        if(definition.routes && definition.routes.length > 0) {
            componentDefinition.$routeConfig = definition.routes.map((route: RouteConfig) => {
                let converted = route;
                converted.component = route.component['$selector'];

                return converted;
            });
        }

        module.component(definition.selector, componentDefinition);

        if(ANGULARIZED_DEBUG_ENABLED) {
            console.log(`Angularized: registered component ${definition.selector}`)
        }
    }

    private factoryDefinition(target: Function, definition: ComponentDefinition): ComponentDefinition
    {
        if(! definition.selector) {
            throw new Error(`Selector required for component '${target}'`);
        }

        let factory = definition.factory;

        if(! factory) {
            factory = (...args) => {
                args.unshift(target);

                return new (target.bind.apply(target,args))();
            };
        }

        return {
            template: definition.template,
            selector: definition.selector.replace(/-([a-z])/g, function (g) { return g[1].toUpperCase(); }),
            styles: definition.styles || [],
            injects: definition.injects || [],
            routes: definition.routes || [],
            bindings: definition.bindings || {},
            factory: factory,
        };
    }
}

ComponentDefinitions.$instance = new ComponentDefinitions();