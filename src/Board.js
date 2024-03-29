// This file is a Backbone Model (don't worry about what that means)
// It's part of the Board Visualizer
// The only portions you need to work on are the helper functions (below)

(function() {

  window.Board = Backbone.Model.extend({

    initialize: function (params) {
      if (_.isUndefined(params) || _.isNull(params)) {
        console.log('Good guess! But to use the Board() constructor, you must pass it an argument in one of the following formats:');
        console.log('\t1. An object. To create an empty board of size n:\n\t\t{n: %c<num>%c} - Where %c<num> %cis the dimension of the (empty) board you wish to instantiate\n\t\t%cEXAMPLE: var board = new Board({n:5})', 'color: blue;', 'color: black;','color: blue;', 'color: black;', 'color: grey;');
        console.log('\t2. An array of arrays (a matrix). To create a populated board of size n:\n\t\t[ [%c<val>%c,%c<val>%c,%c<val>%c...], [%c<val>%c,%c<val>%c,%c<val>%c...], [%c<val>%c,%c<val>%c,%c<val>%c...] ] - Where each %c<val>%c is whatever value you want at that location on the board\n\t\t%cEXAMPLE: var board = new Board([[1,0,0],[0,1,0],[0,0,1]])', 'color: blue;', 'color: black;','color: blue;', 'color: black;', 'color: blue;', 'color: black;', 'color: blue;', 'color: black;', 'color: blue;', 'color: black;', 'color: blue;', 'color: black;', 'color: blue;', 'color: black;', 'color: blue;', 'color: black;', 'color: blue;', 'color: black;', 'color: blue;', 'color: black;', 'color: grey;');
      } else if (params.hasOwnProperty('n')) {
        this.set(makeEmptyMatrix(this.get('n')));
      } else {
        this.set('n', params.length);
      }
    },

    rows: function() {
      return _(_.range(this.get('n'))).map(function(rowIndex) {
        return this.get(rowIndex);
      }, this);
    },

    togglePiece: function(rowIndex, colIndex) {
      this.get(rowIndex)[colIndex] = + !this.get(rowIndex)[colIndex];
      this.trigger('change');
    },

    _getFirstRowColumnIndexForMajorDiagonalOn: function(rowIndex, colIndex) {
      return colIndex - rowIndex;
    },

    _getFirstRowColumnIndexForMinorDiagonalOn: function(rowIndex, colIndex) {
      return colIndex + rowIndex;
    },

    hasAnyRooksConflicts: function() {
      return this.hasAnyRowConflicts() || this.hasAnyColConflicts();
    },

    hasAnyQueenConflictsOn: function(rowIndex, colIndex) {
      return (
        this.hasRowConflictAt(rowIndex) ||
        this.hasColConflictAt(colIndex) ||
        this.hasMajorDiagonalConflictAt(this._getFirstRowColumnIndexForMajorDiagonalOn(rowIndex, colIndex)) ||
        this.hasMinorDiagonalConflictAt(this._getFirstRowColumnIndexForMinorDiagonalOn(rowIndex, colIndex))
      );
    },

    hasAnyQueensConflicts: function() {
      return this.hasAnyRooksConflicts() || this.hasAnyMajorDiagonalConflicts() || this.hasAnyMinorDiagonalConflicts();
    },

    _isInBounds: function(rowIndex, colIndex) {
      return (
        0 <= rowIndex && rowIndex < this.get('n') &&
        0 <= colIndex && colIndex < this.get('n')
      );
    },


/*
         _             _     _
     ___| |_ __ _ _ __| |_  | |__   ___ _ __ ___ _
    / __| __/ _` | '__| __| | '_ \ / _ \ '__/ _ (_)
    \__ \ || (_| | |  | |_  | | | |  __/ | |  __/_
    |___/\__\__,_|_|   \__| |_| |_|\___|_|  \___(_)

 */
    /*=========================================================================
    =                 TODO: fill in these Helper Functions                    =
    =========================================================================*/

    // ROWS - run from left to right
    // --------------------------------------------------------------
    //
    // test if a specific row on this board contains a conflict
    hasRowConflictAt: function(rowIndex) {
      var flag = false;
      for (var i=0;i<rowIndex.length;i++){
        if(rowIndex[i]===1){
          if(flag===true){
            return true;
          }
          flag = true;
        }
      }
      return false; // fixme
    },

    // test if any rows on this board contain conflicts
    hasAnyRowConflicts: function() {
      var board = this.rows();
      for(var i=0;i<board.length;i++){
        if(this.hasRowConflictAt(board[i])){
          return true;
        }
      }
      return false; // fixme
    },



    // COLUMNS - run from top to bottom
    // --------------------------------------------------------------
    //
    // test if a specific column on this board contains a conflict
    hasColConflictAt: function(colIndex) {
      return this.hasRowConflictAt(colIndex);
    },

    // test if any columns on this board contain conflicts
    hasAnyColConflicts: function() {
      var board = this.rows();
      for(var i = 0; i < board.length; i++) {
        var column = [];
        for(var j=0;j<board.length;j++){
          column.push(board[j][i]);
        }
        if(this.hasColConflictAt(column)){
          return true;
        }
      }
      return false; // fixme
    },



    // Major Diagonals - go from top-left to bottom-right
    // --------------------------------------------------------------
    //
    // test if a specific major diagonal on this board contains a conflict
    hasMajorDiagonalConflictAt: function(majorDiagonal) {
      return this.hasRowConflictAt(majorDiagonal);
    },

    // test if any major diagonals on this board contain conflicts
    hasAnyMajorDiagonalConflicts: function() {
      var board = this.rows();

      var getDiagonal = function(point){
        //point is an array for the starting point [i,j]
        //it should walk down the diagonal until it reaches the end (board.length-1)
        var i=point[0];
        var j=point[1];
        var diagonal = [];
        while(i<board.length && j<board.length){
          diagonal.push(board[i][j]);
          i++;
          j++;
        }
        return diagonal;
      };

      for (var i=board.length-1;i>=0;i--){
        var diag = getDiagonal([i,0]);
        if(this.hasMajorDiagonalConflictAt(diag)){
          return true;
        }
      }

      for (var j=0; j<board.length;j++){
        var diag = getDiagonal([0,j]);
        if(this.hasMajorDiagonalConflictAt(diag)){
          return true;
        }
      }
      return false; // fixme
    },

    hasAnyRookConflicts : function(){
      if(this.hasAnyRowConflicts() || this.hasAnyColConflicts()) {
        return true;
      }
      return false;
    },

    hasAnyQueenConflicts : function(){
      if(this.hasAnyRowConflicts() || this.hasAnyColConflicts() || this.hasAnyMinorDiagonalConflicts() || this.hasAnyMajorDiagonalConflicts()) {
        return true;
      }
      return false;
    },


    // Minor Diagonals - go from top-right to bottom-left
    // --------------------------------------------------------------
    //
    // test if a specific minor diagonal on this board contains a conflict
    hasMinorDiagonalConflictAt: function(minorDiagonal) {
      return hasRowConflictAt(minorDiagonal); // fixme
    },

    // test if any minor diagonals on this board contain conflicts
    hasAnyMinorDiagonalConflicts: function() {
      var board = this.rows();

      var getDiagonal = function(point){
        //point is an array for the starting point [i,j]
        //it should walk down the diagonal until it reaches the end (board.length-1)
        var i=point[0];
        var j=point[1];
        var diagonal = [];
        while(i<board.length && j>=0){
          diagonal.push(board[i][j]);
          i++;
          j--;
        }
        return diagonal;
      };

      for (var i=board.length-1;i>=0;i--){
        var diag = getDiagonal([i,board.length-1]);
        if(this.hasMajorDiagonalConflictAt(diag)){
          return true;
        }
      }

      for (var j=board.length-1; j>=0; j--){
        var diag = getDiagonal([0,j]);
        if(this.hasMajorDiagonalConflictAt(diag)){
          return true;
        }
      }
      return false;
    }

    /*--------------------  End of Helper Functions  ---------------------*/


  });

  var makeEmptyMatrix = function(n) {
    return _(_.range(n)).map(function() {
      return _(_.range(n)).map(function() {
        return 0;
      });
    });
  };

}());
