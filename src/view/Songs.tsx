import React, { FC, useEffect, useState } from "react";
import { fetchSongs } from "../model/song";
import styles from "./Songs.module.css";

export const Songs: FC = () => {
    const [songs, setSongs] = useState([]);

    useEffect(() => {
        fetchSongs().then((songs) => setSongs(songs));
    }, []);

    return (
        <div className={styles.container}>
            {songs.map((song: any) => (
                <div className={styles.song}>
                    <div className={styles.info}>name: {song.name}</div>
                    <div className={styles.actions}>
                        <button>🌰</button>
                        <button>🥟</button>
                    </div>
                </div>
            ))}
        </div>
    );
};
