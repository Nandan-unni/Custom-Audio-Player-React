import "./App.css";
import mp3_1 from "./Data/1.mp3";
import data_1 from "./Data/1.json";
import mp3_2 from "./Data/2.mp3";
import data_2 from "./Data/2.json";
import mp3_3 from "./Data/3.mp3";
import data_3 from "./Data/3.json";
import AudioPlayer from "./AudioPlayer/Player";


function DemoPage() {
    return(
        <div className="demo-page">
            <AudioPlayer audio={mp3_1} feed={data_1} />
            <AudioPlayer audio={mp3_2} feed={data_2} />
            <AudioPlayer audio={mp3_3} feed={data_3} />
        </div>
    );
}

export default DemoPage;
