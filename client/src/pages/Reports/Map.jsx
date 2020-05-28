import React, { useState, useEffect } from 'react';
import ReactMapGL, { Marker } from 'react-map-gl';
import 'mapbox-gl/dist/mapbox-gl.css';
import RoomIcon from '@material-ui/icons/Room';
const Map = ({ datas }) => {
    const [marks, setMarks] = useState([])
    const [totalMarks, setTotalMarks] = useState(0)
    const [viewport, setViewport] = useState(null);

    useEffect(() => {
        let marks = [];
        let keys = {}
        let total = 0
        for (let i = 0; i < datas.length; i++) {
            let data = datas[i];
            if (data.location) {
                total += 1;
                if (keys[`${data.location.latitude},${data.location.longitude}`]) {
                    keys[`${data.location.latitude},${data.location.longitude}`] += 1;
                } else {
                    keys[`${data.location.latitude},${data.location.longitude}`] = 1;
                }
            }
        }
        setTotalMarks(total)
        for (let key in keys) {
            const location = key.split(",")
            console.log(location)
            marks.push({
                latitude: parseFloat(location[0]),
                longitude: parseFloat(location[1]),
                value: keys[key]
            })
        }
        console.log(marks)
        setMarks(marks);
        if (marks.length !== 0) {
            setViewport({
                width: "100%",
                height: "100%",
                latitude: marks[0].latitude,
                longitude: marks[0].longitude,
                zoom: 4
            })
        }
    }, [])

    return (
        <ReactMapGL
            {...viewport}
            onViewportChange={setViewport}
            mapboxApiAccessToken={"pk.eyJ1IjoiZGVuMTk5ODAxMDciLCJhIjoiY2s5Z252NjNtMGlrOTNrcG41eGJqcWZjOSJ9.zW4oxwvD5mIZKZIrLK6G8Q"}
        >
            {marks.map((mark, index) =>
                <Marker key={index} latitude={mark.latitude} longitude={mark.longitude} >
                    <div style={{ width: `${(mark.value / totalMarks) * 20}px`, height: `${(mark.value / totalMarks) * 20}px`, borderRadius: "50%", background: "red", transform: "translate(-50%, -50%)" }}></div>
                </Marker>
            )}
        </ReactMapGL>
    );
};

export default Map;