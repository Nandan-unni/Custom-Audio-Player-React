import { useEffect, useRef, useState } from 'react';
import './styles.css';

import { 
        playPauseController, volumeController,
        forward, rewind, getTime, seekController
    } from "./Controller";

function AudioPlayer(props) {
    const [duration, setDuration] = useState("0 : 00");
    const [currentTime, setCurrentTime] = useState("0 : 00");
    const [perc, setPerc] = useState(0);
    const [seekTime, setSeekTime] = useState(0);
    const audio = useRef(null);
    const seeker = useRef(null);
    // eslint-disable-next-line 
    useEffect(() => {
        setDuration(getTime(audio.current.duration));
        setCurrentTime(getTime(audio.current.currentTime));
        audio.current.addEventListener("timeupdate", () => {
            setDuration(getTime(audio.current.duration));
            setCurrentTime(getTime(audio.current.currentTime));
            setPerc((parseInt(audio.current.currentTime) / parseInt(audio.current.duration)) * 100);
        });
    }, []);

    function getSeekTime(seek) {
        setSeekTime((seek.nativeEvent.offsetX/seeker.current.offsetWidth) * 100);
    };
    return (
        <div className={`AudioPlayer ${props.status}`}>
            <div className={`control-panel ${props.status}`}>
                <audio id={`audio-${props.feed.pk}`} ref={audio} >
                    <source src={props.audio} />
                </audio>
                <button 
                    className={`material-icons`} 
                    id={`play-pause-${props.feed.pk}`}
                    onClick={() => playPauseController(`${props.feed.pk}`)} 
                >
                    play_arrow
                </button>
                <button 
                    className={`material-icons`} 
                    onClick={() => rewind(`${props.feed.pk}`)} 
                >
                    fast_rewind
                </button>
                <button 
                    className={`material-icons`} 
                    onClick={() => forward(`${props.feed.pk}`)} 
                >
                    fast_forward
                </button>
                <button 
                    className={`material-icons`} 
                    onClick={() => volumeController(`${props.feed.pk}`, `down`)}
                >
                        volume_down
                </button>
                <button 
                    className={`material-icons`} 
                    onClick={() => volumeController(`${props.feed.pk}`, `off`)}
                >
                        volume_off
                </button>
                <button 
                    className={`material-icons`} 
                    onClick={() => volumeController(`${props.feed.pk}`, `up`)}
                >
                        volume_up
                </button>
            </div>
            <div className="timeline">
                <p>{ currentTime }</p>
                <div className="seeker" 
                     id={`s-${props.feed.pk}`} 
                     ref={seeker} onMouseMove={getSeekTime.bind(this)} 
                     onClick={() => seekController(seekTime, props.feed.pk)}
                >
                    <div className="seeker-played" style={{width: `${perc}%`}}></div>
                    <div className="seeker-btn" style={{marginLeft: `${perc-1.5}%`}}></div>
                    <div className="seeker-toplay"></div>
                </div>
                <p>{ duration === "0 : 0NaN" ? "0 : 00" : duration }</p>
            </div>
        </div>
    );
}

export default AudioPlayer;
