const AUTOMATONS = [];
const INDEX_PROVIDERS = [];
const colours = [];
const ongoingTouches = [];
const heightScale = 0.5;
const widthScale = 0.9;
var isDrawing;
var brushDiameter;
var currentBrushColour;
var canvas;
var ctx;
var cellWidth;
var cellHeight;
var rows;
var cols;
var currentBoard;
var nextBoard;
var currentAutomaton;
var currentIndexProvider;
var animate;

onload = () => {
    init();
}

/* AUTOMATONS contract
    function label() label
    function prepare() invoked once before cumputing the board's next state 
    function nextCellState(currentBoard, row, column) returns nextCellState
*/
function getGameOfLifeAutomaton() {
    const S = [{
            "530": 1,
            "default": 0
        },
        {
            "530": 1,
            "620": 1,
            "default": 0
        },
        {
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

function getWireAutomaton() {
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
            "620": 1,
            "710": 1,
            "default": 0
        },
        {
            "620": 1,
            "530": 0,
            "default": 0
        },
        {
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

function seedDashAutomaton() {
    const S = [{
            "710": 1,
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
            return "Seed Dashes";
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

function dancingSquaresAutomaton() {
    const S = [{
            "710": 1,
            "default": 0
        },
        {
            "default": 0
        },
        {
            "default": 0
        }
    ];
    const mooreNeighbours = new Array(S.length);
    return {
        'label': function () {
            return "Dancing Squares";
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
            "620": 1,
            "default": 0
        },
        {
            "620": 1,
            "default": 0
        },
        {
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
            const r = currentIndexProvider.nextRow(row - 1, rows);
            const cUp = currentIndexProvider.nextCol(col + 1, cols);
            const cDown = currentIndexProvider.nextCol(col - 1, cols);
            if (currentCell == 1) {
                return 1;
            } else if (cDown > -1 && r > -1 && currentCell == 0 && cur[r][cDown] != cur[r][col]) {
                return cur[r][col] + cur[r][cDown] % 3;
            } else if (cUp > -1 && r > -1 && currentCell == 0 && cur[r][col] != cur[r][cUp]) {
                return cur[r][col] + cur[r][cUp] % 3;
            }
            return 0;
        }
    };
}
// END AUTOMATONS

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
            return row < 0 ? totalRows - 1 : row % totalRows;
        },
        'nextCol': function (col, totalCols) {
            return col < 0 ? totalCols - 1 : col % totalCols;
        }
    }
}

function getWrappingColOnlyIndexProvider() {
    return {
        'label': function () {
            return "Wrap Columns But Not Rows";
        },
        'nextRow': function (row, totalRows) {
            return row < 0 ? -1 : row >= totalRows ? -1 : row;
        },
        'nextCol': function (col, totalCols) {
            return col < 0 ? totalCols - 1 : col % totalCols;
        }
    }
}

function getWrappingRowOnlyIndexProvider() {
    return {
        'label': function () {
            return "Wrap Rows But Not Columns";
        },
        'nextRow': function (row, totalRows) {
            return row < 0 ? totalRows - 1 : row % totalRows;
        },
        'nextCol': function (col, totalCols) {
            return col < 0 ? -1 : col >= totalCols ? -1 : col;
        }
    }
}

function getWrappingTopOnlyIndexProvider() {
    return {
        'label': function () {
            return "Wrap Top to Bottom";
        },
        'nextRow': function (row, totalRows) {
            return row < 0 ? totalRows - 1 : row >= totalRows ? -1 : row;
        },
        'nextCol': function (col, totalCols) {
            return col < 0 ? -1 : col >= totalCols ? -1 : col;
        }
    }
}

function getWrappingBottomOnlyIndexProvider() {
    return {
        'label': function () {
            return "Wrap Bottom to Top";
        },
        'nextRow': function (row, totalRows) {
            return row < 0 ? -1 : row % totalRows;
        },
        'nextCol': function (col, totalCols) {
            return col < 0 ? -1 : col >= totalCols ? -1 : col;
        }
    }
}

function getNonWrappingIndexProvider() {
    return {
        'label': function () {
            return "Don't Wrap Rows or Columns";
        },
        'nextRow': function (row, totalRows) {
            return row < 0 ? -1 : row >= totalRows ? -1 : row;
        },
        'nextCol': function (col, totalCols) {
            return col < 0 ? -1 : col >= totalCols ? -1 : col;
        }
    }
}
// END INDEX_PROVIDERS

function init() {
    currentBrushColour = 1;
    brushDiameter = 1;
    animate = null;
    canvas = document.getElementById("game");
    canvas.height = ((window.innerHeight > 0) ? window.innerHeight : screen.height) * heightScale;
    canvas.width = ((window.innerWidth > 0) ? window.innerWidth : screen.width) * widthScale;

    cellWidth = 4;
    cellHeight = cellWidth;

    rows = Math.floor((canvas.height / cellWidth));
    cols = Math.floor(canvas.width / cellWidth);

    ctx = canvas.getContext("2d");
    ctx.fillStyle = "#202020";
    ctx.fillRect(0, 0, canvas.width, canvas.height);
    currentBoard = createBoard();
    nextBoard = createBoard();
    colours.push("#202020");
    colours.push("#008000");
    colours.push("#000080");

    INDEX_PROVIDERS.push(getNonWrappingIndexProvider());
    INDEX_PROVIDERS.push(getWrappingIndexProvider());
    INDEX_PROVIDERS.push(getWrappingColOnlyIndexProvider());
    INDEX_PROVIDERS.push(getWrappingRowOnlyIndexProvider());
    currentIndexProvider = INDEX_PROVIDERS[1];
    AUTOMATONS.push(getGameOfLifeAutomaton());
    AUTOMATONS.push(someCoolSymmetricAutomaton());
    AUTOMATONS.push(dancingSquaresAutomaton());
    AUTOMATONS.push(someSeedAutomaton());
    AUTOMATONS.push(some3ColourSeedAutomaton());
    AUTOMATONS.push(sirpinskisTriangleAutomaton());
    AUTOMATONS.push(getBrainOfBrianAutomaton());
    AUTOMATONS.push(seedDashAutomaton());
    currentAutomaton = AUTOMATONS[5];
    h = currentBoard.length / 2;
    for (r = 0; r < h; ++r) {
        currentBoard[r][0] = 2;
        currentBoard[r][1] = 2;
        currentBoard[r][2] = 2;
    }
    renderGrid(ctx, currentBoard);
    const currentAutomatonDisplay = document.getElementById("current");
    currentAutomatonDisplay.textContent = "Current Automaton: " + currentAutomaton.label();
    const automatonsContent = document.getElementById("automatons-dropdown-content");
    const automatonsBtn = document.getElementById("automatons-dropbtn");
    loadDropDownContent(automatonsContent, automatonsBtn, AUTOMATONS, (selection) => {
        doStop();
        currentAutomaton = AUTOMATONS[selection];
        currentAutomatonDisplay.textContent = "Current Automaton: " + currentAutomaton.label();
        automatonsContent.classList.toggle("show");
    });

    const currentWrappingDisplay = document.getElementById("current-wrapping");
    currentWrappingDisplay.textContent = " " + currentIndexProvider.label();
    const wrappingContent = document.getElementById("wrapping-dropdown-content");
    const wrappingDropdownButton = document.getElementById("wrapping-dropbtn");
    loadDropDownContent(wrappingContent, wrappingDropdownButton, INDEX_PROVIDERS, (selection) => {
        currentIndexProvider = INDEX_PROVIDERS[selection];
        currentWrappingDisplay.textContent = " " + currentIndexProvider.label();
        wrappingContent.classList.toggle("show");
    });
    document.getElementById("brush").value = brushDiameter;
    document.getElementById("brush").oninput = () => {
        brushDiameter = parseInt(document.getElementById("brush").value);
    }
    document.getElementById("play").addEventListener("click", playStop);
    document.getElementById("clear").addEventListener("click", () => {
        doStop();
        currentBoard.forEach(row => {
            row.fill(0);
        });
        renderGrid(ctx, currentBoard);
    })

    // user drawing
    const paletteCell = 32;
    currentColourCanvas = document.getElementById("current-colour");
    currentColourCtx = currentColourCanvas.getContext("2d");
    currentColourCanvas.width = paletteCell;
    currentColourCanvas.height = paletteCell;
    currentColourCtx.fillStyle = colours[currentBrushColour];
    currentColourCtx.fillRect(0, 0, paletteCell, paletteCell);

    paletteCanvas = document.getElementById("palette");
    paletteCanvas.addEventListener("click", (e) => {
        let x = e.offsetX;
        currentBrushColour = Math.floor(x / paletteCell) % colours.length;
        currentColourCtx.fillStyle = colours[currentBrushColour];
        currentColourCtx.fillRect(0, 0, paletteCell, paletteCell);
    })
    paletteCanvas.width = paletteCell * colours.length;
    paletteCanvas.height = paletteCell * 2;
    paletteCtx = paletteCanvas.getContext("2d");
    let i = 0;

    for (c of colours) {
        paletteCtx.fillStyle = c;
        paletteCtx.fillRect(i++ * paletteCell, paletteCell, paletteCell, paletteCell);
    }

    function doDraw(x, y) {
        ctx.fillStyle = colours[currentBrushColour];

        const r = Math.floor(brushDiameter / 2);
        for (let dx = Math.max(0, x - r); Math.min(rows - 1, dx <= x + r); ++dx) {
            for (let dy = Math.max(0, y - r); dy <= Math.min(cols - 1, y + r); ++dy) {
                currentBoard[dx][dy] = currentBrushColour;
                ctx.fillRect(dy * cellWidth, dx * cellHeight, cellWidth, cellHeight);
            }
        }
    }
    //mouse 
    function moveDraw(event) {
        if (!isDrawing) {
            return;
        }
        let x = Math.floor(event.offsetY / cellHeight);
        let y = Math.floor(event.offsetX / cellWidth);
        doDraw(x, y);
    }
    canvas.addEventListener("click", doDraw);
    canvas.onmousemove = moveDraw;
    canvas.onmousedown = function (e) {
        isDrawing = true;
    };
    canvas.onmouseup = function (e) {
        isDrawing = false;
    };
    // touch
    canvas.addEventListener("touchmove", (event) => {
        event.preventDefault();
        const touches = event.changedTouches;

        for (let i = 0; i < touches.length; ++i) {
            const idx = ongoingTouchIndexById(touches[i].identifier);

            if (idx >= 0) {
                let endX = getTouchX(touches[i]);
                let endY = getTouchY(touches[i]);
                for (let x = getTouchX(ongoingTouches[i]); x <= endX; x += brushDiameter) {
                    for (let y = getTouchY(ongoingTouches[i]); y <= endY; y += brushDiameter) {
                        doDraw(x, y);
                    }
                }
                ongoingTouches.splice(idx, 1, copyTouch(touches[i]));
            }
        }
    });

    canvas.addEventListener("touchcancel", (event) => {
        event.preventDefault();
        const touches = event.changedTouches;
        for (let i = 0; i < touches.length; ++i) {
            let idx = ongoingTouchIndexById(touches[i].identifier);
            ongoingTouches.splice(idx, 1);
        }
    });

    canvas.addEventListener("touchstart", (event) => {
        event.preventDefault();
        const touches = event.changedTouches;
        for (let i = 0; i < touches.length; i++) {
            ongoingTouches.push(copyTouch(touches[i]));
            let x = getTouchX(touches[i]);
            let y = getTouchY(touches[i]);
            doDraw(x, y);
        }
    });

    canvas.addEventListener("touchend", (event) => {
        event.preventDefault();
        const touches = event.changedTouches;

        for (let i = 0; i < touches.length; i++) {
            let idx = ongoingTouchIndexById(touches[i].identifier);

            if (idx >= 0) {
                let x = getTouchX(touches[i]);
                let y = getTouchY(touches[i]);
                doDraw(x, y);
                ongoingTouches.splice(idx, 1);
            }
        }
    });

    function getTouchX(touch) {
        return Math.floor((touch.pageY * heightScale) / cellHeight)
    }

    function getTouchY(touch) {
        return Math.floor((touch.pageX * widthScale) / cellWidth)
    }

    function copyTouch({
        identifier,
        pageX,
        pageY
    }) {
        return {
            identifier,
            pageX,
            pageY
        };
    }

    function ongoingTouchIndexById(idToFind) {
        for (let i = 0; i < ongoingTouches.length; i++) {
            const id = ongoingTouches[i].identifier;
            if (id === idToFind) {
                return i;
            }
        }
        return -1;
    }

}

function loadDropDownContent(contentHtmlElement, contentBtn, labeledContent, onClickFunc) {
    for (var i = 0; i < labeledContent.length; i++) {
        let a = document.createElement("a");
        const curI = i;
        a.onclick = () => onClickFunc(curI);
        a.href = '#';
        a.textContent = labeledContent[i].label();
        a.classList = ["dropdown-content-a"];
        contentHtmlElement.appendChild(a);
    }
    contentBtn.addEventListener("click", () => contentHtmlElement.classList.toggle("show"));
}

function doPlay() {
    computeNext(currentBoard, nextBoard, currentAutomaton);
    [currentBoard, nextBoard] = [nextBoard, currentBoard];
    renderGrid(ctx, currentBoard);
    animate = setTimeout(doPlay, 30);
}

function doStop() {
    if (animate != null) {
        clearTimeout(animate);
        animate = null;
    }
}

function playStop() {
    if (animate != null) {
        doStop();
    } else {
        doPlay();
    }
}

function createBoard() {
    return Array.from({
        length: rows
    }, (_, __) => Array.from({
        length: cols
    }, (_, __) => 0));
}

function computeNext(cur, next, automaton) {
    automaton.prepare();
    for (let row = 0; row < rows; row++) {
        for (let col = 0; col < cols; col++) {
            next[row][col] = automaton.nextCellState(cur, row, col);
        }
    }
}

function countMooreNeighbours(row, col, cur, neighbours) {
    neighbours.fill(0);
    for (let drow = -1; drow <= 1; ++drow) {
        for (let dcol = -1; dcol <= 1; ++dcol) {
            if (drow != 0 || dcol != 0) {
                const r = currentIndexProvider.nextRow(row + drow, rows);
                const c = currentIndexProvider.nextCol(col + dcol, cols);
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
    for (let row = 0; row < rows; ++row) {
        for (let col = 0; col < cols; ++col) {
            ctx.fillStyle = colours[cur[row][col]];
            ctx.fillRect(col * cellWidth, row * cellHeight, cellWidth, cellHeight);
        }
    }
}