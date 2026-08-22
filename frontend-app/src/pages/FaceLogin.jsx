import { useEffect, useRef, useState } from "react";
import * as faceapi from "face-api.js";

export default function FaceLogin({ onLogin }) {
    const videoRef = useRef(null);
    const [status, setStatus] = useState("Starting camera...");

    useEffect(() => {
        const startCamera = async () => {
            try {
                const stream = await navigator.mediaDevices.getUserMedia({
                    video: true,
                });

                videoRef.current.srcObject = stream;
                setStatus("Camera ready — looking for face...");
            } catch (error) {
                console.error(error);
                setStatus("Camera permission denied.");
            }
        };

        startCamera();

        return () => {
            const stream = videoRef.current?.srcObject;
            stream?.getTracks().forEach((track) => track.stop());
        };
    }, []);

    const detectFace = async () => {
        try {
            const savedFace = localStorage.getItem("faceDescriptor");

            if (!savedFace) {
                setStatus("No registered face found. Please register first.");
                return;
            }

            setStatus("Checking your face...");

            const detection = await faceapi
                .detectSingleFace(
                    videoRef.current,
                    new faceapi.TinyFaceDetectorOptions()
                )
                .withFaceLandmarks()
                .withFaceDescriptor();

            if (!detection) {
                setStatus("No face detected. Please look at the camera.");
                return;
            }

            const registeredDescriptor = new Float32Array(
                JSON.parse(savedFace)
            );

            const distance = faceapi.euclideanDistance(
                detection.descriptor,
                registeredDescriptor
            );

            console.log("Face distance:", distance);

            if (distance < 0.6) {
                setStatus("Face matched! Login successful ✅");

                setTimeout(() => {
                    onLogin();
                }, 500);
            } else {
                setStatus("Face not matched ❌");
            }

        } catch (error) {
            console.error("Face login error:", error);
            setStatus("Face login failed.");
        }
    };

    return (
        <div>
            <h2>Face Login</h2>

            <video
                ref={videoRef}
                autoPlay
                muted
                playsInline
                width="400"
            />

            <br />

            <button onClick={detectFace}>
                Login with Face
            </button>

            <p>{status}</p>
        </div>
    );
}