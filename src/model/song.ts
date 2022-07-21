import { Howl } from "howler";

export interface Song {
    id: string;
    name: string;
    cover_image_path: string;
    music_file_path: string;
}

export const fetchSongs = () => {
    return fetch("https://api-stg.jam-community.com/song/trending")
        .then((response) => response.json())
        .then((data) => {
            console.log("🤫", data);
            return data;
        });
};

let sound: Howl;

export const playSong = (path: string) => {
    if (sound) sound.stop();

    sound = new Howl({
        src: [path],
    });
    sound.play();
};

export const pauseSong = () => {
    sound.pause();
};

export const resumeSong = () => {
    sound.play();
};

export const likeSong = (id: string) => {
    return fetch(
        "https://api-stg.jam-community.com/interact/like?apikey=___agAFTxkmMIWsmN9zOpM_6l2SkZPPy21LGRlxhYD8",
        {
            method: "post",
            headers: {
                "Content-Type": "application/x-www-form-urlencoded",
            },
            body: `id=${id}`,
        }
    ).then((response) => {
        console.log(response.body);
        return response;
    });
};
