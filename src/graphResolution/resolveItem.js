/**
 * Created by rharik on 12/13/15.
 */

var logger = require('./../logger');
var invariant = require('invariant');
var fnArgs = require('fn-args');
var instantiateInstance = require('./instantiateInstance');

module.exports = function resolveItem(resolvedDependencies,item){
    invariant(item, 'Item to resolve must be provided.');
    var args = fnArgs(item.wrappedInstance);
    // possible null exception
    var resolvedArgs = args.map(x=> {
        var dep = resolvedDependencies.find(d=>d.name == x);
        if (!dep){
            throw(Error('unable to find dependency: ' + x + ' for item: '+ item.name))
        }
        return dep.resolvedInstance;
    });
    var resolvedInstance = resolvedArgs.length > 0
        ? item.wrappedInstance.apply(item.wrappedInstance, resolvedArgs)
        : item.wrappedInstance();

    if(resolvedInstance.instantiate){
        instantiateInstance(resolvedInstance);
    }

    return resolvedInstance;
};