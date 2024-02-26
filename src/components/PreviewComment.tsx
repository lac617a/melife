import { format } from "@formkit/tempo";
import { MessageContent } from "@src/types";
import React from "react";

interface Props extends MessageContent {
  onClose: () => void;
}

const PreviewComment: React.FC<Props> = ({ message, onClose, created_at }) => {
  return (
    <div className="bg-slate-50 max-w-64 flex items-start border border-gray-300 rounded-md mt-5 shadow-lg">
      <div className="p-3 w-full">
        <h4>Realizaras un comentario a:</h4>
        <p className="text-gray-600 text-lg mt-2 pointer-events-none font-semibold">
          {message}
        </p>
        <div className="flex justify-between mt-3">
          <span className="text-xs font-normal text-gray-500">
            Publicado a las:{" "}
            <time>{format(created_at, "MMM D/YY - h:mm a")}</time>
          </span>
        </div>
      </div>
      <button className="pr-2 pt-2" title="Cerrar" onClick={onClose}>
        x
      </button>
    </div>
  );
};

export default PreviewComment;
