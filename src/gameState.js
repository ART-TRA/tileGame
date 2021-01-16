import React, {createContext, useReducer} from "react";
import {
    checkColor,
    firstLook,
    gameReducer,
    readyGame,
    restartGame,
    showColor,
    shuffleTiles,
    waitingColor
} from "./gameReducer";

const gameState = {
    steps: 8,
    matches: 0,
    currentTile: [],
    tiles: [
        {
            id: 1,
            colorNum: 1,
            visible: false,
            color: 'yellow',
            tileState: "able",
        },
        {
            id: 2,
            colorNum: 1,
            visible: false,
            color: 'yellow',
            tileState: "able",
        },
        {
            id: 3,
            colorNum: 2,
            visible: false,
            color: 'orange',
            tileState: "able",
        },
        {
            id: 4,
            colorNum: 2,
            visible: false,
            color: 'orange',
            tileState: "able",
        },
        {
            id: 5,
            colorNum: 3,
            visible: false,
            color: 'blue',
            tileState: "able",
        },
        {
            id: 6,
            colorNum: 3,
            visible: false,
            color: 'blue',
            tileState: "able",
        },
        {
            id: 7,
            colorNum: 4,
            visible: false,
            color: 'green',
            tileState: "able",
        },
        {
            id: 8,
            colorNum: 4,
            visible: false,
            color: 'green',
            tileState: "able",
        },
        {
            id: 9,
            colorNum: 5,
            visible: false,
            color: 'red',
            tileState: "able",
        },
        {
            id: 10,
            colorNum: 5,
            visible: false,
            color: 'red',
            tileState: "able",
        },
        {
            id: 11,
            colorNum: 6,
            visible: false,
            color: 'grey',
            tileState: "able",
        },
        {
            id: 12,
            colorNum: 6,
            visible: false,
            color: 'grey',
            tileState: "able",
        },
        {
            id: 13,
            colorNum: 7,
            visible: false,
            color: 'pink',
            tileState: "able",
        },
        {
            id: 14,
            colorNum: 7,
            visible: false,
            color: 'pink',
            tileState: "able",
        },
        {
            id: 15,
            colorNum: 8,
            visible: false,
            color: 'purple',
            tileState: "able",
        },
        {
            id: 16,
            colorNum: 8,
            visible: false,
            color: 'purple',
            tileState: "able",
        },

    ]
}

export const GameContext = createContext();
export const GameState = (props) => {
    const [state, dispatch] = useReducer(gameReducer, gameState)
    const firstLookOnTiles = () => {
        dispatch(firstLook())
    }
    const readyGameTiles = () => {
        dispatch(readyGame())
    }
    const shuffleTilesColor = () => {
        dispatch(shuffleTiles())
    }
    const showTileColor = (id) => {
        dispatch(showColor(id))
    }
    const checkTileColor = (id) => {
        dispatch(checkColor(id))
    }
    const waitingTileColor = () => {
        dispatch(waitingColor())
    }
    const restartGameTiles = () => {
        dispatch(restartGame())
    }
    return (
        <GameContext.Provider
            value={{
                tiles: state.tiles,
                steps: state.steps,
                matches: state.matches,
                showTileColor,
                checkTileColor,
                waitingTileColor,
                restartGameTiles,
                shuffleTilesColor,
                firstLookOnTiles,
                readyGameTiles,
            }}>
            {props.children}
        </GameContext.Provider>
    )
}