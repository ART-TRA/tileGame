import React, {useContext, useEffect} from 'react';
import {GameContext} from "./gameState";
import {Tile} from "./Tile";
import {Typography} from "@material-ui/core";
import Button from "@material-ui/core/Button";
import Dialog from "@material-ui/core/Dialog";
import DialogTitle from "@material-ui/core/DialogTitle";
import DialogContent from "@material-ui/core/DialogContent";
import DialogContentText from "@material-ui/core/DialogContentText";
import DialogActions from "@material-ui/core/DialogActions";
import {useStyles} from "./AppStyle";

const App = () => {
    const {tiles, steps, score, matches, restartGameTiles, shuffleTilesColor, firstLookOnTiles, readyGameTiles} = useContext(GameContext)
    const [open, setOpen] = React.useState(false);
    const handleClickOpen = () => {
        setOpen(true);
    };
    const handleClose = () => {
        setOpen(false);
    };
    useEffect(() => {
        handleClickOpen()
        shuffleTilesColor()
    }, [])
    const classes = useStyles()
    const gameTiles = tiles.map((tile) => <Tile tile={tile} key={tile.id}/>)

    return (
        <div className={classes.scene}>
            <Dialog
                open={open}
                aria-labelledby="alert-dialog-title"
                aria-describedby="alert-dialog-description"
            >
                <DialogTitle id="alert-dialog-title"><Typography style={{textAlign: "center"}}>TILES CRASH</Typography></DialogTitle>
                <DialogContent>
                    <DialogContentText id="alert-dialog-description">
                        <Typography>Rules:</Typography>
                        <Typography>In each round you should select 2 tiles with the same color to make them disappear (+5 score points).
                            If you'll select 2 tiles with different colors they'll flipped to "closed" (-1 score points).
                            Try to open all of tiles and get max score points.
                        </Typography>
                    </DialogContentText>
                </DialogContent>
                <DialogActions>
                    <Button variant="outlined" onClick={() => {
                        handleClose();
                        restartGameTiles()
                        firstLookOnTiles()
                        setTimeout(() => readyGameTiles(), 3000)
                    }} color="primary">
                        start game
                    </Button>
                </DialogActions>
            </Dialog>

            <Typography variant="h5" style={{padding: "100px 0 20px", textAlign: "center"}}>
                {matches === 8 ? "You opened all tiles by " + steps + " steps, your score: " + score : "round: " + steps}
                <div>{matches === 8 ? null : "score: " + score}</div>
                {matches === 8 &&
                <div style={{textAlign: "center"}}>
                    Congratulations, you are winner
                    <div className={classes.winner}/>
                </div>
                }

            </Typography>
            {matches === 8 ? null : <div className={classes.gameField}>{gameTiles}</div>}
            {steps > 1 &&
            <Button
                variant="outlined"
                onClick={() => {
                    restartGameTiles()
                    firstLookOnTiles()
                    setTimeout(() => readyGameTiles(), 3000)
                }}
                className={classes.button}>
                Restart game
            </Button>
            }
            <Button
                variant="outlined"
                onClick={() => {
                    shuffleTilesColor()
                    firstLookOnTiles()
                    setTimeout(() => readyGameTiles(), 3000)
                }}
                className={classes.button2}>
                Shuffle tiles
            </Button>
        </div>
    );
}

export default App;
