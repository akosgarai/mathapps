describe('example test', function() {
    it('should be true', function() {
        expect('foo').toBe('foo');
    });
});

describe('Graph constructor tests', function () {
    it('Create graph without parameters', function () {
        var G = new Graph();
        var expected = {'F' : [], 'L' : [], 'weightMatrix' : [[]]};
        expect({'F' : G.F, 'L' : G.L, 'weightMatrix' : G.weightMatrix}).toEqual(expected);
    });
    it('Create graph with clusterF param', function () {
        var G = new Graph([1,2]);
        var expected = {'F' : [1,2], 'L' : [], 'weightMatrix' : [[]]};
        expect({'F' : G.F, 'L' : G.L, 'weightMatrix' : G.weightMatrix}).toEqual(expected);
    });
    it('Create graph with clusterF, clusterL param', function () {
        var G = new Graph([1,2],[3,4]);
        var expected = {'F' : [1,2], 'L' : [3,4], 'weightMatrix' : [[]]};
        expect({'F' : G.F, 'L' : G.L, 'weightMatrix' : G.weightMatrix}).toEqual(expected);
    });
    it('Create graph with clusterF, clusterL, weightMatrix param', function () {
        var G = new Graph([1,2],[3,4], [[1,1],[1,0]]);
        var expected = {'F' : [1,2], 'L' : [3,4], 'weightMatrix' : [[1,1],[1,0]]};
        expect({'F' : G.F, 'L' : G.L, 'weightMatrix' : G.weightMatrix}).toEqual(expected);
    });
});

describe('Egervary related tests', function () {
    describe('Egervary constructor tests', function () {
        it('Egervary without parameters', function () {
            var expected = new Graph();
            var E = new Egervary();
            expect(E.G).toEqual(expected);
        });
        it('Egervary with parameters', function () {
            var expected = new Graph([1,2],[3,4], [[1,1],[1,0]]);
            var E = new Egervary(expected);
            expect(E.G).toEqual(expected);
        });
    });
    describe('Egervary initMatchedM function test', function () {
        it('Egervary initMatchedM without input graph', function () {
            var expected = [];
            var E = new Egervary();
            E.initMatchedM();
            expect(E.matchedM).toEqual(expected);
        });
        it('Egervary initMatchedM with input graph', function () {
            var expected = [-1, -1];
            var G = new Graph([1,2],[3,4], [[1,1],[1,0]]);
            var E = new Egervary(G);
            E.initMatchedM();
            expect(E.matchedM).toEqual(expected);
        });
    });
    describe('Egervary initLabels function test', function () {
        it('Egervary initLabels without input graph', function () {
            var expected = {};
            var E = new Egervary();
            E.initLabels();
            expect(E.labels).toEqual(expected);
        });
        it('Egervary initLabels with input graph testset 1', function () {
            var expected = {1:1,2:1,3:0,4:0};
            var G = new Graph([1,2],[3,4], [[1,1],[1,0]]);
            var E = new Egervary(G);
            E.initLabels();
            expect(E.labels).toEqual(expected);
        });
        it('Egervary initLabels with input graph testset 2', function () {
            var expected = {1:2,2:3,3:0,4:0};
            var G = new Graph([1,2],[3,4], [[2,1],[3,0]]);
            var E = new Egervary(G);
            E.initLabels();
            expect(E.labels).toEqual(expected);
        });
        it('Egervary initLabels with input graph testset 3', function () {
            var expected = {'ken':2,2:3,3:0,'mary':0};
            var G = new Graph(['ken',2],[3,'mary'], [[2,1],[3,0]]);
            var E = new Egervary(G);
            E.initLabels();
            expect(E.labels).toEqual(expected);
        });
    });
    describe('Egervary stepZero function test', function () {
        it('Egervary stepZero without input graph', function () {
            var expected = {'matchedM':[], 'labels':{}};
            var E = new Egervary();
            E.stepZero();
            expect({'matchedM':E.matchedM, 'labels':E.labels}).toEqual(expected);
        });
        it('Egervary stepZero with input graph testset 1', function () {
            var expected = {'matchedM':[-1,-1], 'labels':{1:1,2:1,3:0,4:0}};
            var G = new Graph([1,2],[3,4], [[1,1],[1,0]]);
            var E = new Egervary(G);
            E.stepZero();
            expect({'matchedM':E.matchedM, 'labels':E.labels}).toEqual(expected);
        });
        it('Egervary stepZero with input graph testset 2', function () {
            var expected = {'matchedM':[-1,-1], 'labels':{1:2,2:3,3:0,4:0}};
            var G = new Graph([1,2],[3,4], [[2,1],[3,0]]);
            var E = new Egervary(G);
            E.stepZero();
            expect({'matchedM':E.matchedM, 'labels':E.labels}).toEqual(expected);
        });
        it('Egervary stepZero with input graph testset 3', function () {
            var expected = {'matchedM':[-1,-1], 'labels':{'ken':2,2:3,3:0,'mary':0}};
            var G = new Graph(['ken',2],[3,'mary'], [[2,1],[3,0]]);
            var E = new Egervary(G);
            E.stepZero();
            expect({'matchedM':E.matchedM, 'labels':E.labels}).toEqual(expected);
        });
    });
    describe('Egervary isRedEdge function test', function () {
        it('Egervary isRedEdge without input graph', function () {
            var expected = false;
            var E = new Egervary();
            E.stepZero();
            expect(E.isRedEdge(0, 0)).toEqual(expected);
        });
        it('Egervary isRedEdge with input graph testset 1 v1', function () {
            var expected = true;
            var G = new Graph([1,2],[3,4], [[1,1],[1,0]]);
            var E = new Egervary(G);
            E.stepZero();
            expect(E.isRedEdge(0, 0)).toEqual(expected);
        });
        it('Egervary isRedEdge with input graph testset 1 v2', function () {
            var expected = false;
            var G = new Graph([1,2],[3,4], [[1,1],[1,0]]);
            var E = new Egervary(G);
            E.stepZero();
            expect(E.isRedEdge(1, 1)).toEqual(expected);
        });
        it('Egervary isRedEdge with input graph testset 2 v1', function () {
            var expected = true;
            var G = new Graph([1,2],[3,4], [[2,1],[3,0]]);
            var E = new Egervary(G);
            E.stepZero();
            expect(E.isRedEdge(0, 0)).toEqual(expected);
        });
        it('Egervary isRedEdge with input graph testset 2 v2', function () {
            var expected = false;
            var G = new Graph([1,2],[3,4], [[2,1],[3,0]]);
            var E = new Egervary(G);
            E.stepZero();
            expect(E.isRedEdge(1, 1)).toEqual(expected);
        });
    });
    describe('Egervary initRedEdges function test', function () {
        it('Egervary initRedEdges without input graph', function () {
            var expected = [[]];
            var E = new Egervary();
            E.stepZero();
            expect(E.redEdges).toEqual(expected);
        });
        it('Egervary initRedEdges with input graph testset 1', function () {
            var expected = [[1,1],[1,0]];
            var G = new Graph([1,2],[3,4], [[1,1],[1,0]]);
            var E = new Egervary(G);
            E.stepZero();
            expect(E.redEdges).toEqual(expected);
        });
        it('Egervary initRedEdges with input graph testset 2', function () {
            var expected = [[2,0],[3,0]];
            var G = new Graph([1,2],[3,4], [[2,1],[3,0]]);
            var E = new Egervary(G);
            E.stepZero();
            expect(E.redEdges).toEqual(expected);
        });
    });
    describe('Egervary createPair function test', function () {
        it('Egervary createPair with input graph testset 1 v1', function () {
            var expected = [0,-1];
            var G = new Graph([1,2],[3,4], [[1,1],[1,0]]);
            var E = new Egervary(G);
            E.stepZero();
            E.createPair(0,0);
            expect(E.matchedM).toEqual(expected);
        });
        it('Egervary createPair with input graph testset 1 v1', function () {
            var expected = [0,1];
            var G = new Graph([1,2],[3,4], [[1,1],[1,0]]);
            var E = new Egervary(G);
            E.stepZero();
            E.createPair(0,0);
            E.createPair(1,1);
            expect(E.matchedM).toEqual(expected);
        });
    });
    describe('Egervary isMatchedMFull function test', function () {
        it('Egervary isMatchedMFull without input graph', function () {
            var E = new Egervary();
            E.stepZero();
            expect(E.isMatchedMFull()).toEqual(true);
        });
        it('Egervary isMatchedMFull with input graph testset 1', function () {
            var G = new Graph([1,2],[3,4], [[1,1],[1,0]]);
            var E = new Egervary(G);
            E.stepZero();
            expect(E.isMatchedMFull()).toEqual(false);
        });
        it('Egervary isMatchedMFull with input graph testset 1 and pair creation', function () {
            var G = new Graph([1,2],[3,4], [[1,1],[1,0]]);
            var E = new Egervary(G);
            E.stepZero();
            E.createPair(0,0);
            E.createPair(1,1);
            expect(E.isMatchedMFull()).toEqual(true);
        });
        it('Egervary isMatchedMFull with input graph testset 2', function () {
            var G = new Graph([1,2],[3,4], [[2,1],[3,0]]);
            var E = new Egervary(G);
            E.stepZero();
            expect(E.isMatchedMFull()).toEqual(false);
        });
    });
    describe('Egervary findFirstSingle function test', function () {
        it('Egervary findFirstSingle with input graph testset 1', function () {
            var expected = '0';
            var G = new Graph([1,2],[3,4], [[1,1],[1,0]]);
            var E = new Egervary(G);
            E.stepZero();
            expect(E.findFirstSingle()).toEqual(expected);
        });
        it('Egervary findFirstSingle with input graph testset 1 and pair creation', function () {
            var expected = '1';
            var G = new Graph([1,2],[3,4], [[1,1],[1,0]]);
            var E = new Egervary(G);
            E.stepZero();
            E.createPair(0,0);
            expect(E.findFirstSingle()).toEqual(expected);
        });
        it('Egervary findFirstSingle with input graph testset 1 and full pair creation', function () {
            var expected = '-1';
            var G = new Graph([1,2],[3,4], [[1,1],[1,0]]);
            var E = new Egervary(G);
            E.stepZero();
            E.createPair(0,0);
            E.createPair(1,1);
            expect(E.findFirstSingle()).toEqual(expected);
        });
    });
    describe('Egervary stepOne function test', function () {
        it('Egervary stepOne without input graph', function () {
            var expected = [];
            var E = new Egervary();
            E.stepZero();
            E.stepOne();
            expect(E.matchedM).toEqual(expected);
        });
        it('Egervary stepOne without input graph - check return value of stepOne', function () {
            var expected = 'READY';
            var E = new Egervary();
            E.stepZero();
            expect(E.stepOne()).toEqual(expected);
        });
        it('Egervary stepOne with input graph testset 1 and pair creation - check return value of stepOne', function () {
            var expected = 'READY';
            var G = new Graph([1,2],[3,4], [[1,1],[1,0]]);
            var E = new Egervary(G);
            E.stepZero();
            E.createPair(0,0);
            E.createPair(1,1);
            expect(E.stepOne()).toEqual(expected);
        });
    });
});
