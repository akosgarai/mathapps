function Graph (clusterF, clusterL, weightMatrix){
    /*
     * F cluster - array of strings, represents the name of elements in F
     * */
    if (typeof(clusterF) != 'undefined') {
        this.F = clusterF;
    } else {
        this.F = [];
    }
    /*
     * L cluster - same as F
     * */
    if (typeof(clusterL) != 'undefined') {
        this.L = clusterL;
    } else {
        this.L = [];
    }
    /*
     * weightMatrix
     * */
    if (typeof(weightMatrix) != "undefined") {
        this.weightMatrix = weightMatrix;
    } else {
        this.weightMatrix = [[]];
    }
}

function Egervary (graph) {
    /*
     * init graph for algorithm
     * */
    if (typeof graph == 'undefined') {
        this.G = new Graph();
    } else {
        this.G = graph;
    }

    /*
     * initMatchedM function
     * 0.th step of algo. setup matched object
     * matchedM[i] = j -> if j == -1 : F[i] is unpaired, if j != -1 : F[i]'s pair is L[j]
     * */
    this.initMatchedM = function () {
        this.matchedM = [];
        for (var i in this.G['F']) {
            this.matchedM.push(-1);
        }
    };
    /*
     * createPair function
     * input : iF index from clusterF, iL index from clusterL
     * it sets up matchedM[iF] to iL (matchedM[iF] = iL)
     * */
    this.createPair = function (iF, iL) {
        this.matchedM[iF] = iL;
    };
    /*
     * findFirstSingle function
     * single : ID of element from clusterL or negative number (-1)
     * return: the fist index that also appears in the unmatched object, or -1
     * */
    this.findFirstSingle = function () {
        for (var i in this.matchedM) {
            if (this.matchedM[i] == -1) {
                return i;
            }
        }
        return '-1';
    };

    /*
     * initLabels function
     * 0.th step of algo. setup matched object
     * labels[i] = j -> if i is from cluster L : j = 0, if i is from cluster F : j = max weight from i
     * */
    this.initLabels = function () {
        this.labels = {};
        for (var i in this.G['L']) {
            this.labels[this.G['L'][i]] = 0;
        }
        for (var i in this.G['F']) {
            var weight = 0;
            for (var j in this.G['weightMatrix'][i]) {
                if (this.G['weightMatrix'][i][j] > weight) {
                    weight = this.G['weightMatrix'][i][j];
                }
            }
            this.labels[this.G['F'][i]] = weight;
        }
    };
    /*
     * stepZero function
     * it makes the 0. step. calls initMatchedM, initLables and initRedEdges functions
     * */
    this.stepZero = function () {
        this.initMatchedM();
        this.initLabels();
        this.initRedEdges();
    };
    /*
     * isRedEdge function
     * input : iF - index of element from clusterF, iL - index of element from clusterL
     * output : bool
     * */
    this.isRedEdge = function (iF, iL) {
        var weight = this.G['weightMatrix'][iF][iL];
        var sumLabels = this.labels[this.G['F'][iF]] + this.labels[this.G['L'][iL]];

        if (weight == sumLabels) {
            return true;
        } else {
            return false;
        }
    };
    /*
     * initRedEdges function
     * helper function to get the first red edges after step 0
     * */
    this.initRedEdges = function () {
        this.redEdges = [];
        for (var i in this.G['weightMatrix']) {
            var mRow = this.G['weightMatrix'][i];
            var row = [];
            for (var j in mRow) {
                if (this.isRedEdge(i, j)) {
                    row.push(mRow[j]);
                } else {
                    row.push(0)
                }
            }
            this.redEdges.push(row);
        }
    };
    /*
     * isMatchedMFull function
     * return false if matchedM[i] == -1
     * */
    this.isMatchedMFull = function () {
        for (var i in this.matchedM) {
            if (this.matchedM[i] == -1) {
                return false;
            }
        }
        return true;
    };
    /*
     * stepOne function
     * it makes the 1. step.
     * first chech pairs with isMatchedMFull function. if full - we are ready.
     * */
    this.stepOne = function () {
        if (this.isMatchedMFull()) {
            return 'READY';
        }
    };
}
