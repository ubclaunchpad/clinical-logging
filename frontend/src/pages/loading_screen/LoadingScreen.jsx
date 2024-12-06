import { useEffect, useState } from "react";
import { useLocation, useNavigate } from "react-router-dom";
import { CLButtonSecondary } from "../../components/Buttons/CLButtons";
import "./LoadingScreen.css";

export default function LoadingScreen() {
  const location = useLocation();
  const navigate = useNavigate();
  const [progress, setProgress] = useState(0);
  const imageFile = location.state?.imageFile;

  useEffect(() => {
    if (!imageFile) {
      navigate("/upload-photo");
      return;
    }

    const handleTranscription = async () => {
      try {
        const formData = new FormData();
        formData.append("image", imageFile);

        // Progress simulation
        let currentProgress = 0;
        const progressInterval = setInterval(() => {
          const increment = Math.random() * 3 + 1; // Random increment between 1-4
          currentProgress = Math.min(currentProgress + increment, 85);
          setProgress(Math.round(currentProgress));
        }, 300);

        const response = await fetch("/api/transcribe", {
          method: "POST",
          body: formData,
        });

        clearInterval(progressInterval);

        const data = await response.json();

        if (!response.ok) {
          throw new Error(
            data.error || `HTTP error! status: ${response.status}`
          );
        }

        // Complete the progress bar
        setProgress(100);

        await new Promise((resolve) => setTimeout(resolve, 500));

        // Navigate to results
        navigate("/load-transcription", {
          state: { transcription: data.transcription },
          replace: true,
        });
      } catch (error) {
        console.error("Error during transcription:", error);
        alert("Failed to transcribe image: " + error.message);
        navigate(-1);
      }
    };

    handleTranscription();
  }, [imageFile, navigate]);

  return (
    <div className="loading-screen">
      <h2>Transcribing photos</h2>
      <h3>to standardized template...</h3>

      <div className="progress-bar-container">
        <div className="progress-bar" style={{ width: `${progress}%` }} />
        <span className="progress-text">{progress}%</span>
      </div>

      <CLButtonSecondary
        onClick={() => navigate("/upload-photo")}
        width={"250px"}
      >
        <span className="cancel-icon">×</span>
        Cancel Transcription
      </CLButtonSecondary>
    </div>
  );
}
