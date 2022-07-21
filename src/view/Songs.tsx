import React, { FC, useEffect, useState } from "react";
import {
    fetchSongs,
    likeSong,
    pauseSong,
    playSong,
    resumeSong,
} from "../model/song";
import styles from "./Songs.module.css";

export const Songs: FC = () => {
    const [songs, setSongs] = useState([]);
    const [chosenSong, setChosenSong] = useState<null | string>(null);
    const [pausedSong, setPausedSong] = useState<null | string>(null);
    const [likedSongs, setLikedSongs] = useState<string[]>([]);

    useEffect(() => {
        fetchSongs().then((songs) => setSongs(songs));
    }, []);

    const onPlay = (id: string) => {
        setChosenSong(id);
        const song: any = songs.find((song: any) => song.id === id);
        if (song) {
            playSong(song.music_file_path);
        }
    };

    return (
        <div className={styles.container}>
            {songs.map((song: any) => (
                <div className={styles.song}>
                    <img
                        src={song.cover_image_path || ""}
                        className={styles.image}
                    />
                    <div className={styles.info}>
                        <h3>{song.name}</h3>
                    </div>
                    <div className={styles.actions}>
                        {chosenSong === song.id ? (
                            chosenSong === pausedSong ? (
                                <button
                                    onClick={() => {
                                        setPausedSong(null);
                                        resumeSong();
                                    }}
                                >
                                    RESUME
                                </button>
                            ) : (
                                <button
                                    onClick={() => {
                                        setPausedSong(song.id);
                                        pauseSong();
                                    }}
                                >
                                    PAUSE
                                </button>
                            )
                        ) : (
                            <button
                                onClick={() => {
                                    onPlay(song.id);
                                }}
                            >
                                PLAY
                            </button>
                        )}
                        <button
                            disabled={likedSongs.includes(song.id)}
                            onClick={() => {
                                setLikedSongs([...likedSongs, song.id]);
                                likeSong(song.id);
                            }}
                        >
                            LIKE
                        </button>
                    </div>
                </div>
            ))}
        </div>
    );
};
