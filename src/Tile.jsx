import React, {useContext} from "react";
import {GameContext} from "./gameState";
import Button from "@material-ui/core/Button";
import CloseIcon from '@material-ui/icons/Close';
import {useStyles} from "./TileStyle";

export const Tile = ({tile}) => {
    const classes = useStyles()
    const {showTileColor, checkTileColor, waitingTileColor} = useContext(GameContext)
    const showColor = (e, id) => {
        showTileColor(id)
        setTimeout(() => {
            waitingTileColor()
            checkTileColor(id)
        }, 400)
        // checkTileColor(id)
    }
    return (
        <Button className={tile.tileState === "disappear" ? classes.disappearTile : classes.tile}
                disabled={tile.tileState === "disable" || tile.tileState === "waiting"}
                style={{background: tile.visible ? tile.color : "#f6e0cc"}}
                onClick={(e) => showColor(e, tile.id)}>
            {tile.tileState === "disable" && <CloseIcon fontSize="large" style={{color: "red"}}/> }
        </Button>
    )
}