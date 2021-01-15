const SHOW_COLOR = "SHOW_COLOR"
const CHECK_COLOR = "CHECK_COLOR"
const WAITING_COLOR = "WAITING_COLOR"
const RESTART_GAME = "RESTART_GAME"

export const showColor = (id) => ({type: SHOW_COLOR, id})
export const checkColor = (id) => ({type: CHECK_COLOR, id})
export const restartGame = () => ({type: RESTART_GAME})
export const waitingColor = () => ({type: WAITING_COLOR})

export const gameReducer = (state, action) => {
    console.log(action);
    switch (action.type) {
        case CHECK_COLOR: {
            console.log(state.currentTile);
            const tile = state.tiles.find(tile => tile.id === action.id)
            //защита от нажатия на одну и ту же плитку
            // if(state.currentTile.find(currTile => currTile.id === action.id)){
            //     return state
            // }
            if (state.currentTile.length === 2) {
                //     return {
                //         ...state,
                //         visible: tile.visible = true,
                //         currentTile: [...state.currentTile, tile],
                //     }
                // } else {
                //     state.currentTile.push(tile)
                const newStep = state.steps - 1
                //если плитки равны по цвету
                if (state.currentTile[0].colorNum === state.currentTile[1].colorNum) {
                    const newMatch = state.matches + 1
                    return {
                        ...state,
                        steps: newStep,
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
                    return {
                        ...state,
                        steps: newStep,
                        tiles: state.tiles.map(tile => {
                            if (tile.id === state.currentTile[0].id || tile.id === state.currentTile[1].id) {
                                return {...tile, tileState: "disable", visible: false}
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
            // const initTiles = state.tiles.map(tile => {
            //     tile.visible = false
            //     tile.tileState = "able"
            // })
            return {
                ...state,
                steps: 8,
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