import { useEffect, useRef, useState } from "react";
import * as faceapi from "face-api.js";

function FaceRegister() {
    const videoRef = useRef(null);
    const [message, setMessage] = useState("");

    useEffect(() => {
        startCamera();

        return () => {
            if (videoRef.current?.srcObject) {
                videoRef.current.srcObject
                    .getTracks()
                    .forEach(track => track.stop());
            }
        };
    }, []);

    const startCamera = async () => {
        try {
            const stream = await navigator.mediaDevices.getUserMedia({
                video: true
            });

            videoRef.current.srcObject = stream;
        } catch (error) {
            console.error(error);
            setMessage("Camera access denied.");
        }
    };

    const captureFace = async () => {
        setMessage("Detecting face...");

        const detection = await faceapi
            .detectSingleFace(
                videoRef.current,
                new faceapi.TinyFaceDetectorOptions()
            )
            .withFaceLandmarks()
            .withFaceDescriptor();

        if (!detection) {
            setMessage("No face detected. Please look at the camera.");
            return;
        }

        const descriptor = Array.from(detection.descriptor);

        localStorage.setItem(
            "faceDescriptor",
            JSON.stringify(descriptor)
        );

        setMessage("Face registered successfully! ✅");
    };

    return (
        <div className="face-register-box">

            <h2>🔐 Register Your Face</h2>

            <video
                ref={videoRef}
                autoPlay
                muted
                playsInline
            />

            <button
                type="button"
                className="face-register-btn"
                onClick={captureFace}
            >
                📷 Register Face
            </button>

            <p className="face-register-message">
                {message}
            </p>

        </div>
    );
}

export default FaceRegister;