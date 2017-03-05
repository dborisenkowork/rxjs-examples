import {makeInjections} from "../functions/makeInjections";
import {ANGULARIZED_DEBUG_ENABLED} from "../debug";
import {randomId} from "../functions/randomId";

export interface ServiceDefinition
{
    name?: string;
    injects?: any[];
    factory?: Function;
}

export class ServiceDefinitions
{
    public static $instance: ServiceDefinitions;

    register(module: ng.IModule, target: Function, definition: ServiceDefinition) {
        definition = this.factoryDefinition(target, definition);

        target['$name'] = definition.name;

        if(ANGULARIZED_DEBUG_ENABLED) {
            console.log(`Angularized: register service`, definition.name)
        }

        definition.factory.$inject = makeInjections(definition.injects);

        module.factory(definition.name, definition.factory);
    }

    private factoryDefinition(target: Function, definition: ServiceDefinition): ServiceDefinition {
        let newDefinition = {
            name: definition.name || target['$name'] || target.name,
            injects: definition.injects || [],
            factory: definition.factory,
        };

        if(! newDefinition.factory) {
            newDefinition.factory =  (...args) => {
                args.unshift(target);
                return new (target.bind.apply(target,args))();
            }
        }

        if(!newDefinition.name || newDefinition.name.length <= 5) {
            newDefinition.name = randomId(32);
        }

        newDefinition.name = newDefinition.name + '_' + randomId(5);

        return newDefinition;
    }
}

ServiceDefinitions.$instance = new ServiceDefinitions();