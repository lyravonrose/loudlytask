import React, { FC, useEffect, useState } from "react";
import { fetchSongs } from "../model/song";
import styles from "./Songs.module.css";
import { Howl, Howler } from "howler";

export const Songs: FC = () => {
    const [songs, setSongs] = useState([]);
    const [chosenSong, setChosenSong] = useState<null | string>(null);

    useEffect(() => {
        fetchSongs().then((songs) => setSongs(songs));
    }, []);

    const onPlay = (id: string) => {
        setChosenSong(id);
        const song: any = songs.find((song: any) => song.id === id);
        if (song) {
            const sound = new Howl({
                src: [song.music_file_path],
            });

            sound.play();
        }
    };

    return (
        <div className={styles.container}>
            {songs.map((song: any) => (
                <div className={styles.song}>
                    <div className={styles.info}>name: {song.name}</div>
                    <div className={styles.actions}>
                        <button
                            onClick={() => {
                                onPlay(song.id);
                            }}
                        >
                            {" "}
                            PLAY
                        </button>
                        <button>🥟</button>
                    </div>
                </div>
            ))}
        </div>
    );
};
