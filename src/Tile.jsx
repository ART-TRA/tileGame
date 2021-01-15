import React, {useContext, useState} from "react";
import {makeStyles} from "@material-ui/core/styles";
import {GameContext} from "./gameState";
import Button from "@material-ui/core/Button";
import CloseIcon from '@material-ui/icons/Close';

const useStyles = makeStyles((theme) => ({
    tile: {
        width: 100,
        height: 100,
        border: "1px solid #111",
        boxSizing: "border-box",
        display: "flex",
        alignItems: 'center',
        justifyContent: "center",
        zIndex: 1,
        transition: "background 1s ease",
    },
    disappearTile: {
        display: "none",
        transition: "background 1s ease",
    },
    disableTile: {
        background: "#f6e0cc",
        transition: "background 1s ease",

    }

}))

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