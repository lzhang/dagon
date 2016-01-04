/**
 * Created by rharik on 1/3/16.
 */
var demand = require('must');

describe('container builder Test', function() {
    var mut;

    before(function(){
        mut = require('../../src/containerModules/getPathForExternalWrappedInstance');
    });

    describe('#GETPATH', function() {
        context('when calling item on root', function() {
            it('should return proper path', function() {
                var dep = { name: 'JSON',
                    path: 'JSON'};
                var result = mut(dep);
                demand(result).must.not.be.undefined();
                result.must.eql('JSON');
            });
        });

        context('when calling item deeply nested', function() {
            it('should return proper path', function() {
                var dep = { name: 'js-tokens',
                    path: 'js-tokens',
                    altPath: '/home/rharik/Development/MethodFitness/dagon/node_modules/invariant/node_modules/loose-envify/node_modules/js-tokens'};
                var result = mut(dep);
                demand(result).must.not.be.undefined();
                result.must.eql('/home/rharik/Development/MethodFitness/dagon/node_modules/invariant/node_modules/loose-envify/node_modules/js-tokens');
            });
        });

        // yea this is scary stuff. just don't ever change testing frameworks
        context('when calling item kind of deeply nested but with deeply nested altPath', function() {
            it('should return proper path', function() {
                var dep = { name: 'diff',
                    path: 'diff',
                    altPath: '/home/rharik/Development/MethodFitness/dagon/node_modules/mocha/node_modules/glob/node_modules/minimatch/node_modules/sigmund/node_modules/diff'};
                var result = mut(dep);
                demand(result).must.not.be.undefined();
                result.must.eql('/home/rharik/Development/MethodFitness/dagon/node_modules/mocha/node_modules/diff');
            });
        });

        context('when calling un resolveable item', function() {
            it('should return proper error', function() {
                var dep = { name: 'poof',
                    path: 'poof',
                    altPath: '/home/rharik/Development/MethodFitness/dagon/node_modules/mocha/node_modules/poof'};
                var error = '';
                try{
                    mut(dep);
                }catch(ex){
                    error = ex.message;
                }

                demand(error).must.not.be.empty();
                error.must.contain('unable to resolve dependency: poof at either: poof or: /home/rharik/Development/MethodFitness/dagon/node_modules/mocha/node_modules/poof')
            });
        });
    });
});
