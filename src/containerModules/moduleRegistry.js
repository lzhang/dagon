/**
 * Created by rharik on 12/2/15.
 */
"use strict";

var RegistryDSL = require('./RegistryDSL');
var invariant = require('invariant');
var logger = require('./../logger');
var path = require('path');
var exceptionHandler = require('./exceptionHandler');

var moduleRegistry = function(registryFunc) {

    try {
        invariant(registryFunc && _.isFunction(registryFunc),
            'You must supply a registry function');

        var dto = registryFunc(new RegistryDSL());
        return dto.dependentRegistries.map(x=> require(x)())
            .reduce((m, a) => {
                a.dependencyDeclarations = a.dependencyDeclarations.concat(m.dependencyDeclarations);
                a.overrideDeclarations = a.overrideDeclarations.concat(m.overrideDeclarations);
                return a;
            },dto);

    } catch (err) {
        throw exceptionHandler(err, 'Error collecting dependencies.  Check nested exceptions for more details.');
    }
};

module.exports = moduleRegistry;
