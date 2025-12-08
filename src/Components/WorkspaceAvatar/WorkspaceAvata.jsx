import { useState } from "react";
import "./WorkspaceAvatar.css";

const WorkspaceAvatar = ({ name, imageUrl }) => {
  const [imageError, setImageError] = useState(false);

  const showFallback = !imageUrl || imageError;

  return (
    <div className={`workspace-avatar ${showFallback ? "fallback" : ""}`}>
      {!showFallback && (
        <img
          src={imageUrl}
          alt={name}
          onError={() => setImageError(true)}
        />
      )}

      {showFallback && name?.charAt(0)?.toUpperCase()}
    </div>
  );
};

export default WorkspaceAvatar;
