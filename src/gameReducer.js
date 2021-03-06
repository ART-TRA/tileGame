const SHOW_COLOR = "SHOW_COLOR"
const CHECK_COLOR = "CHECK_COLOR"
const WAITING_COLOR = "WAITING_COLOR"
const RESTART_GAME = "RESTART_GAME"
const SHUFFLE_TILES = "SHUFFLE_TILES"
const FIRST_LOOK = "FIRST_LOOK"
const READY_GAME = "READY_GAME"

export const showColor = (id) => ({type: SHOW_COLOR, id})
export const checkColor = (id) => ({type: CHECK_COLOR, id})
export const restartGame = () => ({type: RESTART_GAME})
export const waitingColor = () => ({type: WAITING_COLOR})
export const shuffleTiles = () => ({type: SHUFFLE_TILES})
export const firstLook = () => ({type: FIRST_LOOK})
export const readyGame = () => ({type: READY_GAME})

export const gameReducer = (state, action) => {
    switch (action.type) {
        case FIRST_LOOK: {
            return {
                ...state,
                tiles: state.tiles.map(tile => {
                    return {...tile, visible: true, tileState: "waiting"}
                })
            }
        }
        case READY_GAME: {
            return {
                ...state,
                tiles: state.tiles.map(tile => {
                    return {...tile, visible: false, tileState: "able",}
                })
            }
        }
        case SHUFFLE_TILES: {
            for (let i = state.tiles.length - 1; i > 0; --i) {
                const j = Math.floor(Math.random() * (i + 1));
                const temp = state.tiles[i];
                state.tiles[i] = state.tiles[j];
                state.tiles[j] = temp;
            }
            return {
                ...state,
                steps: 1,
                score: 0,
                matches: 0,
                currentTile: [],
            }
        }
        case CHECK_COLOR: {
            if (state.currentTile.length === 2) {
                const newStep = state.steps + 1
                const newScore = state.score + 5
                //если плитки равны по цвету
                if (state.currentTile[0].colorNum === state.currentTile[1].colorNum) {
                    const newMatch = state.matches + 1
                    return {
                        ...state,
                        steps: newStep,
                        score: newScore,
                        matches: newMatch,
                        tiles: state.tiles.map(tile => {
                            if (tile.id === state.currentTile[0].id || tile.id === state.currentTile[1].id) {
                                return {
                                    ...tile,
                                    visible: true,
                                    tileState: "disappear",

                                }
                            }
                            return tile
                        }),
                        currentTile: []
                    }
                    //если плитки не равны по цвету
                } else {
                    const newScore = state.score - 1
                    return {
                        ...state,
                        steps: newStep,
                        score: newScore,
                        tiles: state.tiles.map(tile => {
                            if (tile.id === state.currentTile[0].id || tile.id === state.currentTile[1].id) {
                                return {...tile, tileState: "able", visible: false}
                            }
                            return tile
                        }),
                        currentTile: []
                    }
                }
            }
        }
        case SHOW_COLOR: {
            const tile = state.tiles.find(tile => tile.id === action.id)
            if (state.currentTile.find(currTile => currTile.id === action.id)) {
                return state
            }
            return {
                ...state,
                visible: tile.visible = true,
                currentTile: [...state.currentTile, tile],
                tiles: state.tiles.map(tile => {
                    if (tile.id !== action.id && tile.tileState === "able") {
                        return {...tile, tileState: "waiting", visible: false}
                    }
                    return tile
                }),
            }
        }
        case WAITING_COLOR: {
            //защита от слишком быстрого нажимания
            return {
                ...state,
                tiles: state.tiles.map(tile => {
                    if (tile.tileState === "waiting") {
                        return {...tile, tileState: "able", visible: false}
                    }
                    return tile
                }),
            }
        }
        case RESTART_GAME: {
            return {
                ...state,
                steps: 1,
                score: 0,
                matches: 0,
                currentTile: [],
                tiles: state.tiles.map(tile => {
                    return {...tile, tileState: "able", visible: false}
                }),
            }
        }
        default:
            return state
    }
}

// case CHECK_COLOR: {
//     const tile = state.tiles.find(tile => tile.id === action.id)
//     //защита от нажатия на одну и ту же плитку
//     if(state.currentTile.find(currTile => currTile.id === action.id)){
//         return state
//     }
//     if (state.currentTile.length === 0) {
//         return {
//             ...state,
//             visible: tile.visible = true,
//             currentTile: [...state.currentTile, tile],
//         }
//     } else {
//         state.currentTile.push(tile)
//         const newStep = state.steps - 1
//         //если плитки равны по цвету
//         if (state.currentTile[0].colorNum === state.currentTile[1].colorNum) {
//             return {
//                 ...state,
//                 steps: newStep,
//                 tiles: state.tiles.map(tile => {
//                     if (tile.id === state.currentTile[0].id || tile.id === state.currentTile[1].id) {
//                         return {
//                             ...tile,
//                             visible: true,
//                             tileState: "disappear",
//
//                         }
//                     }
//                     return tile
//                 }),
//                 currentTile: []
//             }
//             //если плитки не равны по цвету
//         } else {
//             return {
//                 ...state,
//                 steps: newStep,
//                 tiles: state.tiles.map(tile => {
//                     if (tile.id === state.currentTile[0].id || tile.id === state.currentTile[1].id) {
//                         return {...tile, tileState: "disable", visible: false}
//                     }
//                     return tile
//                 }),
//                 currentTile: []
//             }
//         }
//     }
// }