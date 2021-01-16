import React, {useContext, useEffect} from 'react';
import './App.css';
import {makeStyles} from "@material-ui/core/styles";
import {GameContext} from "./gameState";
import {Tile} from "./Tile";
import {Typography} from "@material-ui/core";
import Button from "@material-ui/core/Button";
import Dialog from "@material-ui/core/Dialog";
import DialogTitle from "@material-ui/core/DialogTitle";
import DialogContent from "@material-ui/core/DialogContent";
import DialogContentText from "@material-ui/core/DialogContentText";
import DialogActions from "@material-ui/core/DialogActions";
import winnerImg from "./assets/images/winner.gif"
import loserImg from "./assets/images/lost.gif"

const useStyles = makeStyles((theme) => ({
    scene: {
        height: "100vh",
        width: "100%",
        display: "flex",
        flexDirection: "column",
        alignItems: 'center',
        justifyContent: "flex-start",
    },
    gameField: {
        width: 400,
        display: "flex",
        flexWrap: "wrap",
        // border: "1px solid #111",
    },
    gameTile: {
        width: 100,
        height: 100,
        border: "1px solid #111",
        boxSizing: "border-box",
        display: "flex",
        alignItems: 'center',
        justifyContent: "center",
    },
    button: {
        position: "absolute",
        bottom: 100,
    },
    button2: {
        position: "absolute",
        bottom: 50,
    },
    winner: {
        width: 600,
        height: 500,
        background: `url(${winnerImg}) no-repeat`,
        backgroundSize: 'contain',
    },
    loser: {
        width: 600,
        height: 500,
        background: `url(${loserImg}) no-repeat`,
        backgroundSize: 'contain',
    }
}))

const App = () => {
    const {tiles, steps, matches, restartGameTiles, shuffleTilesColor, firstLookOnTiles, readyGameTiles} = useContext(GameContext)
    const [open, setOpen] = React.useState(false);
    const handleClickOpen = () => {
        setOpen(true);
    };
    const handleClose = () => {
        setOpen(false);
    };
    useEffect(() => {
        handleClickOpen()
        // shuffleTilesColor()
    }, [])
    const classes = useStyles()
    const gameTiles = tiles.map((tile) => <Tile tile={tile} key={tile.id}/>)
    return (
        <div className={classes.scene}>
            <Dialog
                open={open}
                onClose={handleClose}
                aria-labelledby="alert-dialog-title"
                aria-describedby="alert-dialog-description"
            >
                <DialogTitle id="alert-dialog-title"><Typography style={{textAlign: "center"}}>TILES CRASH</Typography></DialogTitle>
                <DialogContent>
                    <DialogContentText id="alert-dialog-description">
                        <Typography>Rules:</Typography>
                        <Typography>In each round you should select 2 tiles with the same color to make them disappear.
                            If you'll select 2 tiles with different colors they'll flipped to "closed".
                            Try to open all of tiles.
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

            <Typography variant="h5" style={{padding: "100px 0 20px"}}>
                {steps >= 1 ? 9 - steps + " round" : null}
                {steps < 1 && matches === 8 &&
                <div style={{textAlign: "center"}}>
                    Congratulations, you are winner
                    <div className={classes.winner}/>
                </div>
                }
                {steps < 1 && matches !== 8 &&
                <div style={{textAlign: "center"}}>
                    You lost, try again
                    <div className={classes.loser}/>
                </div>
                }
            </Typography>
            {
                steps >= 1 ? <div className={classes.gameField}>{gameTiles}</div> : null
            }
            {steps < 8 &&
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
