import {makeStyles} from "@material-ui/core/styles";
import winnerImg from "./assets/images/winner.gif";
import loserImg from "./assets/images/lost.gif";

export const useStyles = makeStyles((theme) => ({
    scene: {
        height: "100vh",
        width: "100%",
        display: "flex",
        flexDirection: "column",
        alignItems: 'center',
        justifyContent: "flex-start",
        backgroundColor: "lavender",
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