/*           _
   ___  ___ | |_   _____ _ __ ___
  / __|/ _ \| \ \ / / _ \ '__/ __|
  \__ \ (_) | |\ V /  __/ |  \__ \
  |___/\___/|_| \_/ \___|_|  |___/

*/

// hint: you'll need to do a full-search of all possible arrangements of pieces!
// (There are also optimizations that will allow you to skip a lot of the dead search space)
// take a look at solversSpec.js to see what the tests are expecting


// return a matrix (an array of arrays) representing a single nxn chessboard, with n rooks placed such that none of them can attack each other

window.findNRooksSolution = function(n) {
  var solution = []; //fixme
  var board = new Board({n:n});

  var solveRooks = function(row){
    if(row === n){
      solution = board.attributes;
      return solution;
    }
    for(var i = 0; i < n; i++) {
      board.attributes[row][i] = 1;
      if(board.hasAnyRookConflicts() === false){
        solveRooks(row+1);
      } else {
      board.attributes[row][i] = 0;
      }
    }
  };

  solveRooks(0);
  // console.log('Single solution for ' + n + ' rooks:', JSON.stringify(solution));
  return solution;
};



// return the number of nxn chessboards that exist, with n rooks placed such that none of them can attack each other
window.countNRooksSolutions = function(n) {
  var solutionCount = undefined; //fixme

  // console.log('Number of solutions for ' + n + ' rooks:', solutionCount);
  return solutionCount;
};


// return a matrix (an array of arrays) representing a single nxn chessboard, with n queens placed such that none of them can attack each other
window.findNQueensSolution = function(n) {
  var solution = []; //fixme
  var board = new Board({n:n});
  if(n ===2 || n===3) {
    console.log(n);
    return board.rows();
  }

  var solveQueens = function(row){
    if(row === n){
      solution = board.rows();
      return true;
    }

    for(var i = 0; i < n; i++) {
      board.attributes[row][i] = 1;
      if(board.hasAnyQueenConflicts() === false){
        if(solveQueens(row+1) === true) {
          return true;
        }
      }
      board.attributes[row][i] = 0;
    }
  };

  solveQueens(0);
  console.log('Single solution for ' + n + ' queens:', solution);
  return solution;
};


// return the number of nxn chessboards that exist, with n queens placed such that none of them can attack each other
window.countNQueensSolutions = function(n) {
  var solutionCount = undefined; //fixme

  console.log('Number of solutions for ' + n + ' queens:', solutionCount);
  return solutionCount;
};
