import React, { useState, useEffect, useCallback } from 'react';
import { RotateCcw, Flag, Clock, Bomb } from 'lucide-react';

interface Cell {
    isMine: boolean;
    isRevealed: boolean;
    isFlagged: boolean;
    neighborMines: number;
}

type GameStatus = 'playing' | 'won' | 'lost';
type Difficulty = 'easy' | 'medium' | 'hard';

const DIFFICULTIES = {
    easy: { rows: 9, cols: 9, mines: 10 },
    medium: { rows: 16, cols: 16, mines: 40 },
    hard: { rows: 16, cols: 30, mines: 99 }
};

export default function MinesweeperApp() {
    const [difficulty, setDifficulty] = useState<Difficulty>('easy');
    const [board, setBoard] = useState<Cell[][]>([]);
    const [gameStatus, setGameStatus] = useState<GameStatus>('playing');
    const [mineCount, setMineCount] = useState(0);
    const [flagCount, setFlagCount] = useState(0);
    const [timeElapsed, setTimeElapsed] = useState(0);
    const [gameStarted, setGameStarted] = useState(false);

    const config = DIFFICULTIES[difficulty];

    // Initialize board
    const initializeBoard = useCallback(() => {
        const newBoard: Cell[][] = [];
        for (let row = 0; row < config.rows; row++) {
            newBoard[row] = [];
            for (let col = 0; col < config.cols; col++) {
                newBoard[row][col] = {
                    isMine: false,
                    isRevealed: false,
                    isFlagged: false,
                    neighborMines: 0
                };
            }
        }
        setBoard(newBoard);
        setGameStatus('playing');
        setMineCount(config.mines);
        setFlagCount(0);
        setTimeElapsed(0);
        setGameStarted(false);
    }, [config]);

    // Place mines randomly
    const placeMines = useCallback((firstClickRow: number, firstClickCol: number) => {
        const newBoard = [...board];
        let minesPlaced = 0;

        while (minesPlaced < config.mines) {
            const row = Math.floor(Math.random() * config.rows);
            const col = Math.floor(Math.random() * config.cols);

            // Don't place mine on first click or if already has mine
            if ((row === firstClickRow && col === firstClickCol) || newBoard[row][col].isMine) {
                continue;
            }

            newBoard[row][col].isMine = true;
            minesPlaced++;
        }

        // Calculate neighbor mines
        for (let row = 0; row < config.rows; row++) {
            for (let col = 0; col < config.cols; col++) {
                if (!newBoard[row][col].isMine) {
                    let count = 0;
                    for (let dr = -1; dr <= 1; dr++) {
                        for (let dc = -1; dc <= 1; dc++) {
                            const newRow = row + dr;
                            const newCol = col + dc;
                            if (newRow >= 0 && newRow < config.rows &&
                                newCol >= 0 && newCol < config.cols &&
                                newBoard[newRow][newCol].isMine) {
                                count++;
                            }
                        }
                    }
                    newBoard[row][col].neighborMines = count;
                }
            }
        }

        setBoard(newBoard);
        setGameStarted(true);
    }, [board, config]);

    // Reveal cell and adjacent empty cells
    const revealCell = useCallback((row: number, col: number) => {
        if (gameStatus !== 'playing') return;

        const newBoard = [...board];
        const cell = newBoard[row][col];

        if (cell.isRevealed || cell.isFlagged) return;

        // First click - place mines
        if (!gameStarted) {
            placeMines(row, col);
            return;
        }

        cell.isRevealed = true;

        // Hit a mine
        if (cell.isMine) {
            setGameStatus('lost');
            // Reveal all mines
            for (let r = 0; r < config.rows; r++) {
                for (let c = 0; c < config.cols; c++) {
                    if (newBoard[r][c].isMine) {
                        newBoard[r][c].isRevealed = true;
                    }
                }
            }
        } else if (cell.neighborMines === 0) {
            // Reveal adjacent cells if no neighboring mines
            const queue = [[row, col]];
            while (queue.length > 0) {
                const [currentRow, currentCol] = queue.shift()!;
                for (let dr = -1; dr <= 1; dr++) {
                    for (let dc = -1; dc <= 1; dc++) {
                        const newRow = currentRow + dr;
                        const newCol = currentCol + dc;
                        if (newRow >= 0 && newRow < config.rows &&
                            newCol >= 0 && newCol < config.cols) {
                            const adjacentCell = newBoard[newRow][newCol];
                            if (!adjacentCell.isRevealed && !adjacentCell.isFlagged && !adjacentCell.isMine) {
                                adjacentCell.isRevealed = true;
                                if (adjacentCell.neighborMines === 0) {
                                    queue.push([newRow, newCol]);
                                }
                            }
                        }
                    }
                }
            }
        }

        setBoard(newBoard);

        // Check win condition
        let revealedCount = 0;
        for (let r = 0; r < config.rows; r++) {
            for (let c = 0; c < config.cols; c++) {
                if (newBoard[r][c].isRevealed) revealedCount++;
            }
        }

        if (revealedCount === config.rows * config.cols - config.mines) {
            setGameStatus('won');
        }
    }, [board, gameStatus, gameStarted, placeMines, config]);

    // Toggle flag
    const toggleFlag = useCallback((e: React.MouseEvent, row: number, col: number) => {
        e.preventDefault();
        if (gameStatus !== 'playing') return;

        const newBoard = [...board];
        const cell = newBoard[row][col];

        if (cell.isRevealed) return;

        cell.isFlagged = !cell.isFlagged;
        setFlagCount(prev => cell.isFlagged ? prev + 1 : prev - 1);
        setBoard(newBoard);
    }, [board, gameStatus]);

    // Timer effect
    useEffect(() => {
        let interval: NodeJS.Timeout;
        if (gameStarted && gameStatus === 'playing') {
            interval = setInterval(() => {
                setTimeElapsed(prev => prev + 1);
            }, 1000);
        }
        return () => clearInterval(interval);
    }, [gameStarted, gameStatus]);

    // Initialize board on mount and difficulty change
    useEffect(() => {
        initializeBoard();
    }, [initializeBoard]);

    const getCellContent = (cell: Cell) => {
        if (cell.isFlagged) return '🚩';
        if (!cell.isRevealed) return '';
        if (cell.isMine) return '💣';
        if (cell.neighborMines === 0) return '';
        return cell.neighborMines.toString();
    };

    const getCellClass = (cell: Cell) => {
        let baseClass = 'w-8 h-8 border border-gray-400 flex items-center justify-center text-sm font-bold cursor-pointer select-none ';

        if (cell.isRevealed) {
            if (cell.isMine) {
                baseClass += 'bg-red-500 text-white ';
            } else {
                baseClass += 'bg-gray-200 dark:bg-gray-600 ';
                // Color based on number
                switch (cell.neighborMines) {
                    case 1: baseClass += 'text-blue-600 '; break;
                    case 2: baseClass += 'text-green-600 '; break;
                    case 3: baseClass += 'text-red-600 '; break;
                    case 4: baseClass += 'text-purple-600 '; break;
                    case 5: baseClass += 'text-yellow-600 '; break;
                    case 6: baseClass += 'text-pink-600 '; break;
                    case 7: baseClass += 'text-black '; break;
                    case 8: baseClass += 'text-gray-600 '; break;
                }
            }
        } else {
            baseClass += 'bg-gray-300 dark:bg-gray-700 hover:bg-gray-200 dark:hover:bg-gray-600 ';
        }

        return baseClass;
    };

    return (
        <div className="h-full bg-white dark:bg-gray-900 p-4 overflow-auto">
            {/* Header */}
            <div className="mb-4">
                <h1 className="text-2xl font-bold text-gray-900 dark:text-white mb-4">Minesweeper</h1>

                {/* Controls */}
                <div className="flex items-center justify-between mb-4">
                    <div className="flex items-center space-x-4">
                        <select
                            value={difficulty}
                            onChange={(e) => setDifficulty(e.target.value as Difficulty)}
                            className="px-3 py-1 border border-gray-300 dark:border-gray-600 rounded-lg bg-white dark:bg-gray-800 text-gray-900 dark:text-white"
                        >
                            <option value="easy">Easy (9x9)</option>
                            <option value="medium">Medium (16x16)</option>
                            <option value="hard">Hard (16x30)</option>
                        </select>

                        <button
                            onClick={initializeBoard}
                            className="flex items-center space-x-2 px-3 py-1 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors"
                        >
                            <RotateCcw className="w-4 h-4" />
                            <span>New Game</span>
                        </button>
                    </div>

                    <div className="flex items-center space-x-4">
                        <div className="flex items-center space-x-2">
                            <Flag className="w-4 h-4 text-red-600" />
                            <span className="text-gray-900 dark:text-white font-mono">
                                {config.mines - flagCount}
                            </span>
                        </div>

                        <div className="flex items-center space-x-2">
                            <Clock className="w-4 h-4 text-blue-600" />
                            <span className="text-gray-900 dark:text-white font-mono">
                                {timeElapsed.toString().padStart(3, '0')}
                            </span>
                        </div>
                    </div>
                </div>

                {/* Game Status */}
                {gameStatus !== 'playing' && (
                    <div className={`text-center p-2 rounded-lg mb-4 ${gameStatus === 'won'
                        ? 'bg-green-100 dark:bg-green-900 text-green-800 dark:text-green-200'
                        : 'bg-red-100 dark:bg-red-900 text-red-800 dark:text-red-200'
                        }`}>
                        {gameStatus === 'won' ? '🎉 You Won!' : '💥 Game Over!'}
                    </div>
                )}
            </div>

            {/* Game Board */}
            <div className="flex justify-center">
                <div
                    className="inline-block border-2 border-gray-400 dark:border-gray-600"
                    style={{
                        display: 'grid',
                        gridTemplateColumns: `repeat(${config.cols}, 1fr)`,
                        gap: '1px',
                        backgroundColor: '#666'
                    }}
                >
                    {board.map((row, rowIndex) =>
                        row.map((cell, colIndex) => (
                            <div
                                key={`${rowIndex}-${colIndex}`}
                                className={getCellClass(cell)}
                                onClick={() => revealCell(rowIndex, colIndex)}
                                onContextMenu={(e) => toggleFlag(e, rowIndex, colIndex)}
                            >
                                {getCellContent(cell)}
                            </div>
                        ))
                    )}
                </div>
            </div>

            {/* Instructions */}
            <div className="mt-4 text-sm text-gray-600 dark:text-gray-400">
                <p>Left click to reveal cells. Right click to flag/unflag mines.</p>
                <p>Find all mines without clicking on them to win!</p>
            </div>
        </div>
    );
} 