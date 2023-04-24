onload = () => {
    const COLS = 128;
    const ROWS = 128;
    const canvas = document.getElementById("game");
    canvas.height = 400;
    canvas.width = 400;
    const CELL_WIDTH = canvas.width / COLS;
    const CELL_HEIGHT = canvas.height / ROWS;
    const ctx = canvas.getContext("2d");
    ctx.fillStyle = "#202020";
    ctx.fillRect(0, 0, canvas.width, canvas.height);
    const currentAutomatonDisplay = document.getElementById("current");
    const currentWrappingDisplay = document.getElementById("current-wrapping");
    var currentBoard = createBoard();
    var nextBoard = createBoard();
    const AUTOMATONS = []

    /* AUTOMATONS contract
        function label() label
        function prepare() invoked once before cumputing the board's next state 
        function nextCellState(currentBoard, row, column) returns nextCellState
    */
    function getGameOfLifeAutomaton() {
        const S = [{
                "53": 1,
                "default": 0
            },
            {
                "53": 1,
                "62": 1,
                "default": 0
            }
        ];
        const mooreNeighbours = new Array(S.length);

        return {
            'label': function () {
                return "The Game Of Life";
            },
            'prepare': function () {
                mooreNeighbours.fill(0);
            },
            'nextCellState': function (cur, row, col) {
                countMooreNeighbours(row, col, cur, mooreNeighbours);
                let currentCell = cur[row][col];
                let nextState = S[currentCell][mooreNeighbours.join("")];
                return nextState != undefined ? nextState : S[currentCell]["default"];
            }
        };
    }

    function getBrainOfBrianAutomaton() {
        const S = [{
                "026": 1,
                "620": 1,
                "125": 1,
                "521": 1,
                "224": 1,
                "422": 1,
                "521": 1,
                "323": 1,
                "default": 0
            },
            {
                "default": 2
            },
            {
                "default": 0
            }
        ];
        const mooreNeighbours = new Array(S.length);

        return {
            'label': function () {
                return "The Brain of Brian";
            },
            'prepare': function () {
                mooreNeighbours.fill(0);
            },
            'nextCellState': function (cur, row, col) {
                countMooreNeighbours(row, col, cur, mooreNeighbours);
                let currentCell = cur[row][col];
                let nextState = S[currentCell][mooreNeighbours.join("")];
                return nextState != undefined ? nextState : S[currentCell]["default"];
            }
        };
    }

    function someCoolSymmetricAutomaton() {
        const S = [{
                "62": 1,
                "71": 1,
                "default": 0
            },
            {
                "62": 1,
                "53": 0,
                "default": 0
            }
        ];
        const mooreNeighbours = new Array(S.length);
        return {
            'label': function () {
                return "Cool Symmetric";
            },
            'prepare': function () {
                mooreNeighbours.fill(0);
            },
            'nextCellState': function (cur, row, col) {
                countMooreNeighbours(row, col, cur, mooreNeighbours);
                let currentCell = cur[row][col];
                let nextState = S[currentCell][mooreNeighbours.join("")];
                return nextState != undefined ? nextState : S[currentCell]["default"];
            }
        };
    }

    function someSeedAutomaton() {
        const S = [{
                "62": 1,
                "default": 0
            },
            {
                "62": 1,
                "default": 0
            }
        ];
        const mooreNeighbours = new Array(S.length);
        return {
            'label': function () {
                return "Looks Like Seed But Not Quite";
            },
            'prepare': function () {
                mooreNeighbours.fill(0);
            },
            'nextCellState': function (cur, row, col) {
                countMooreNeighbours(row, col, cur, mooreNeighbours);
                let currentCell = cur[row][col];
                let nextState = S[currentCell][mooreNeighbours.join("")];
                return nextState != undefined ? nextState : S[currentCell]["default"];
            }
        };
    }

    function some3ColourSeedAutomaton() {
        const S = [{
                "620": 1,
                "530": 2,
                "default": 0
            },
            {
                "620": 1,
                "530": 2,
                "default": 0
            }, {
                "620": 1,
                "530": 2,
                "default": 0
            }
        ];
        const mooreNeighbours = new Array(S.length);
        return {
            'label': function () {
                return "Looks Like Seed But Not Quite Three colours";
            },
            'prepare': function () {
                mooreNeighbours.fill(0);
            },
            'nextCellState': function (cur, row, col) {
                countMooreNeighbours(row, col, cur, mooreNeighbours);
                let currentCell = cur[row][col];
                let nextState = S[currentCell][mooreNeighbours.join("")];
                return nextState != undefined ? nextState : S[currentCell]["default"];
            }
        };
    }

    function sirpinskisTriangleAutomaton() {
        return {
            'label': function () {
                return "Paint Sirpinski Triangles";
            },
            'prepare': function () {},
            'nextCellState': function (cur, row, col) {
                const currentCell = cur[row][col];
                const r = currentIndexProvider.nextRow(row - 1, ROWS);
                const cUp = currentIndexProvider.nextCol(col + 1, COLS);
                const cDown = currentIndexProvider.nextCol(col - 1, COLS);
                if (currentCell == 1) {
                    return 1;
                } else if (row != 0 && currentCell == 0 && cur[r][cDown] != cur[r][col]) {
                    return cur[r][col] + cur[r][cDown] <= 2 ? 1 : 0;
                } else if (row != 0 && currentCell == 0 && cur[r][col] != cur[r][cUp]) {
                    return cur[r][col] + cur[r][cUp] <= 2 ? 1 : 0;
                }
                return 0;
            }
        };
    }
    // END INDEX_PROVIDERS
    const INDEX_PROVIDERS = []

    /* INDEX_PROVIDERS contract
        function label() label
        function nextRow(row, totalRows) returns -1 if row < 0 || row >= totalRows
        functionCol(col, totalCols) returns -1 if col < 0 || col >= totalCols
    */
    function getWrappingIndexProvider() {
        return {
            'label': function () {
                return "Wrap Columns And Rows";
            },
            'nextRow': function (row, totalRows) {
                return row < 0 ? totalRows - 1 : row >= totalRows ? 0 : row;
            },
            'nextCol': function (col, totalCols) {
                return col < 0 ? totalCols - 1 : col >= totalCols ? 0 : col;
            }
        }
    }

    function getWrappingColOnlyIndexProvider() {
        return {
            'label': function () {
                return "Wrap Columns But Not Rows";
            },
            'nextRow': function (row, totalRows) {
                return row < 0 ? 1 : row >= totalRows ? -1 : row;
            },
            'nextCol': function (col, totalCols) {
                return col < 0 ? totalCols - 1 : col >= totalCols ? 0 : col;
            }
        }
    }

    function getWrappingRowOnlyIndexProvider() {
        return {
            'label': function () {
                return "Wrap Rows But Not Columns";
            },
            'nextRow': function (row, totalRows) {
                return row < 0 ? 1 : row >= totalRows ? -1 : row;
            },
            'nextCol': function (col, totalCols) {
                return col < 0 ? totalCols - 1 : col >= totalCols ? 0 : col;
            }
        }
    }

    function getNonWrappingIndexProvider() {
        return {
            'label': function () {
                return "Don't Wrap Rows or Columns";
            },
            'nextRow': function (row, totalRows) {
                return row < 0 ? 1 : row >= totalRows ? -1 : row;
            },
            'nextCol': function (col, totalCols) {
                return col < 0 ? 1 : col >= totalCols ? -1 : col;
            }
        }
    }
    // END INDEX_PROVIDERS
    var currentAutomaton = null;
    var currentIndexProvider = null;
    const colours = [];
    init();
    var animate = null;

    function init() {
        colours.push("#202020");
        colours.push("#008000");
        colours.push("#000080");

        INDEX_PROVIDERS.push(getNonWrappingIndexProvider());
        INDEX_PROVIDERS.push(getWrappingIndexProvider());
        INDEX_PROVIDERS.push(getWrappingColOnlyIndexProvider());
        INDEX_PROVIDERS.push(getWrappingRowOnlyIndexProvider());
        currentIndexProvider = INDEX_PROVIDERS[0];

        AUTOMATONS.push(getGameOfLifeAutomaton());
        AUTOMATONS.push(someCoolSymmetricAutomaton());
        AUTOMATONS.push(someSeedAutomaton());
        AUTOMATONS.push(some3ColourSeedAutomaton());
        AUTOMATONS.push(sirpinskisTriangleAutomaton());
        AUTOMATONS.push(getBrainOfBrianAutomaton());
        currentAutomaton = AUTOMATONS[0];

        currentAutomatonDisplay.textContent = "Current Automaton: " + currentAutomaton.label();
        const dropdownContent = document.getElementById("automatons-dropdown-content");
        for (var i = 0; i < AUTOMATONS.length; i++) {
            let a = document.createElement("a");
            const curI = i;
            a.onclick = () => handleSelectAutomaton(dropdownContent, curI);
            a.href = '#';
            a.textContent = AUTOMATONS[i].label();
            a.classList = ["dropdown-content-a"];
            dropdownContent.appendChild(a);
        }
        const dropdownButton = document.getElementById("automatons-dropbtn");
        dropdownButton.addEventListener("click", () => {
            dropdownContent.classList.toggle("show");
        });

        currentWrappingDisplay.textContent = " " + currentIndexProvider.label();
        const wrappingContent = document.getElementById("wrapping-dropdown-content");
        for (var i = 0; i < INDEX_PROVIDERS.length; i++) {
            let a = document.createElement("a");
            const selection = i;
            a.onclick = () => {
                currentIndexProvider = INDEX_PROVIDERS[selection];
                currentWrappingDisplay.textContent = " " + currentIndexProvider.label();
                wrappingContent.classList.toggle("show");
            };
            a.href = '#';
            a.textContent = INDEX_PROVIDERS[i].label();
            a.classList = ["dropdown-content-a"];
            wrappingContent.appendChild(a);
        }
        const wrappingDropdownButton = document.getElementById("wrapping-dropbtn");
        wrappingDropdownButton.addEventListener("click", () => {
            wrappingContent.classList.toggle("show");
        });
    }

    function handleSelectAutomaton(dropdownContent, selection) {
        doStop();
        currentAutomaton = AUTOMATONS[selection];
        currentAutomatonDisplay.textContent = "Current Automaton: " + currentAutomaton.label();
        dropdownContent.classList.toggle("show");
    };

    function doPlay() {
        computeNext(currentBoard, nextBoard, currentAutomaton);
        [currentBoard, nextBoard] = [nextBoard, currentBoard];
        renderGrid(ctx, currentBoard);

        animate = setTimeout(doPlay, 50);
    }

    canvas.addEventListener("click", (event) => {
        let row = Math.floor(event.offsetY / CELL_HEIGHT);
        let col = Math.floor(event.offsetX / CELL_WIDTH);
        if (animate == null) {
            currentBoard[row][col] = 1;
            renderGrid(ctx, currentBoard);
        } else {
            doStop();
            currentBoard[row][col] = 1;
            doPlay();
        }

    })
    const doStop = function () {
        if (animate != null) {
            clearTimeout(animate);
            animate = null;
        }
    }
    const playStop = function () {
        if (animate != null) {
            doStop();
        } else {
            doPlay();
        }
    }
    document.getElementById("play").addEventListener("click", playStop);
    document.getElementById("clear").addEventListener("click", () => {
        doStop();
        currentBoard.forEach(row => {
            row.fill(0);
        });
        renderGrid(ctx, currentBoard);
    })

    function createBoard() {
        return Array.from({
            length: ROWS
        }, (_, __) => Array.from({
            length: COLS
        }, (_, __) => 0));
    }

    function computeNext(cur, next, automaton) {
        automaton.prepare();
        for (let row = 0; row < ROWS; row++) {
            for (let col = 0; col < COLS; col++) {
                next[row][col] = automaton.nextCellState(cur, row, col);
            }
        }
    }

    function countMooreNeighbours(row, col, cur, neighbours) {
        neighbours.fill(0);
        for (let drow = -1; drow <= 1; ++drow) {
            for (let dcol = -1; dcol <= 1; ++dcol) {
                if (drow != 0 || dcol != 0) {
                    const r = currentIndexProvider.nextRow(row + drow, ROWS);
                    const c = currentIndexProvider.nextCol(col + dcol, COLS);
                    if (r > -1 && c > -1) {
                        neighbours[cur[r][c]]++;
                    }
                }
            }
        }
    }

    function renderGrid(ctx, cur) {
        ctx.fillStyle = colours[0];
        ctx.fillRect(0, 0, canvas.width, canvas.height);
        for (let row = 0; row < ROWS; ++row) {
            for (let col = 0; col < COLS; ++col) {
                ctx.fillStyle = colours[cur[row][col]];
                ctx.fillRect(col * CELL_WIDTH, row * CELL_HEIGHT, CELL_WIDTH, CELL_HEIGHT);
            }
        }
    }
}