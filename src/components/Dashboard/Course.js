import React, { useEffect, useState } from 'react';
import axios from 'axios';

function Course() {
    const [keywords, setKeywords] = useState('');
    const [thumbnails, setThumbnails] = useState([]);
    const [showModal, setShowModal] = useState(false);
    const [playlist, setPlaylist] = useState([]);
    const [currentVideoIndex, setCurrentVideoIndex] = useState(0);

    useEffect(() => {
        if (thumbnails.length > 0) {
            const playlist = thumbnails.map(item => item.videoId);
            setPlaylist(playlist);
        }
    }, [thumbnails]);

    const handleSubmit = () => {
        axios.get(`https://www.googleapis.com/youtube/v3/search?part=snippet&maxResults=20&q=${encodeURIComponent(keywords)} full beginner course &type=video&key=AIzaSyAq_svJtuS05zuIE36LqCS3FagqSYGYens`)
            .then(res => {
                const items = res.data.items;
                const randomItems = getRandomItems(items, 5);
                const thumbnailUrls = randomItems.map(item => ({
                    url: item.snippet.thumbnails.high.url,
                    videoId: item.id.videoId
                }));
                setThumbnails(thumbnailUrls);
                setShowModal(thumbnailUrls.length > 0);
            })
            .catch(error => {
                console.error("Error in fetching data", error);
            })
    }

    const getRandomItems = (array, count) => {
        const shuffled = array.sort(() => 0.5 - Math.random());
        return shuffled.slice(0, count);
    };

    const handlePlayVideo = (videoId, index) => {
        setCurrentVideoIndex(index);
    }

    const handleVideoEnded = () => {
        setCurrentVideoIndex((prevIndex) => (prevIndex + 1) % playlist.length);
    }

    return (
        <div className="container">
            <div className="row">
                <div className="col text-center">
                    <h1 className="display-4">Let's Start Learning</h1>
                </div>
            </div>
            <div className="row">
                <div className="col">
                    <div className="input-group mb-3 mt-2">
                        <input
                            type="text"
                            className="form-control"
                            style={{ width: '150px' }}
                            value={keywords}
                            onChange={e => setKeywords(e.target.value)}
                            placeholder="Enter Course Keywords"
                            aria-label="Keywords"
                        />
                        <button className="btn btn-primary ms-2" type="button" onClick={handleSubmit}>Submit</button>
                    </div>
                </div>
            </div>
            {showModal && (
                <div className="modal" style={{ display: showModal ? 'block' : 'none' }}>
                    <div className="modal-dialog modal-dialog-centered modal-dialog-start modal-lg mx-auto ms-5">
                        <div className="modal-content" style={{ backgroundColor: '#f8f9fa', borderRadius: '10px' }}>
                            <div className="modal-header">
                                <h5 className="modal-title">Top Ranked {keywords} Courses</h5>
                                <button type="button" className="btn-close" onClick={() => setShowModal(false)}></button>
                            </div>
                            <div className="modal-body">
                                <div className="container-fluid">
                                    <div className="row">
                                        {playlist.map((videoId, index) => (
                                            <div key={index} className="col-lg-4 col-md-6 col-sm-12 mb-3" style={{ position: 'relative' }}>
                                                <iframe
                                                    src={`https://www.youtube.com/embed/${videoId}`}
                                                    title={`Video ${index + 1}`}
                                                    allowFullScreen
                                                    className="img-fluid"
                                                    style={{ marginBottom: '10px', cursor: 'pointer' }}
                                                    onClick={() => handlePlayVideo(videoId, index)}
                                                    onEnded={handleVideoEnded}
                                                ></iframe>
                                                
                                            </div>
                                        ))}
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            )}
        </div>
    );
}

export default Course;
