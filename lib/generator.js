module.exports = generateSudoku = function () {
  do {
    var sudoku = (function () {

      var sudokuMap = [],
        sudokuRows = [],
        sudokuCols = [],
        sudokuBlocks = {},
        i, x, y, number, block, row, col,
        blockIdMap = {
          11: 0,
          12: 1,
          13: 2,
          21: 3,
          22: 4,
          23: 5,
          31: 6,
          32: 7,
          33: 8
        };


      // make structure
      for (var q = 0; q < 9; q++) {
        sudokuMap[q] = [];
        sudokuRows[q] = [];
        sudokuCols[q] = [];
        sudokuBlocks[q] = [];
      }

      for (y = 0; y < 9; y++) {
        for (x = 0; x < 9; x++) {

          var alias = '' + parseInt((x + 3) / 3) + parseInt((y + 3) / 3);
          var id = blockIdMap[alias];
          block = sudokuBlocks[id];

          row = sudokuRows[y];
          col = sudokuCols[x];

          var allowedNumbers = [1, 2, 3, 4, 5, 6, 7, 8, 9];
          var testableValue;
          var numberLists = [col, row, block];
          var list;


          // filter data
          for (var d = 0; d < numberLists.length; d++) {

            list = numberLists[d];
            for (i = 0; i < 9; i++) {
              testableValue = list[i];

              if (testableValue !== undefined) {

                var index = allowedNumbers.indexOf(testableValue);
                if (index >= 0)
                  allowedNumbers.splice(index, 1);
              }
            }
          }

          var importantNumbers = [];
          // Checking every number, how many columns contains it
          for (var n = 0; n < allowedNumbers.length; n++) {
            var anum = allowedNumbers[n];
            var count = 0;
            // Checking every column for match
            for (var c = x; c < sudokuCols.length; c++) {
              if (sudokuCols[c].indexOf(anum) >= 0) {
                count++;
              }
            }
            importantNumbers[count] = importantNumbers[count] || [];
            importantNumbers[count].push(anum);

          }
          var mostImportantNumbers = importantNumbers.pop();

          if (mostImportantNumbers) {
            number = mostImportantNumbers[parseInt(Math.random() * mostImportantNumbers.length)];
          } else {
            number = allowedNumbers[parseInt(Math.random() * allowedNumbers.length)];
          }

          if (!number) return false;


          block.push(number);
          row.push(number);
          col.push(number);

          sudokuMap[y][x] = number;

        }
      }
      return sudokuMap;
    })();
  } while (!sudoku);

  return sudoku;
};