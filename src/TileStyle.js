import {makeStyles} from "@material-ui/core/styles";

export const useStyles = makeStyles((theme) => ({
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