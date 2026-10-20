import React from "react";
import { Link } from "react-router-dom";
import { FileQuestion, ArrowLeft } from "lucide-react";

export const NotFound: React.FC = () => {
  return (
    <div className="flex flex-col items-center justify-center min-h-[70vh] px-4 text-center bg-white">
      <div className="flex items-center justify-center w-16 h-16 mb-4 rounded-full bg-slate-100 text-slate-500 border border-slate-200">
        <FileQuestion className="w-8 h-8" />
      </div>
      <span className="font-mono text-xs font-bold text-blue-600 tracking-wider uppercase mb-1">
        404 Not Found
      </span>
      <h1 className="text-2xl sm:text-3xl font-extrabold text-slate-900 tracking-tight mb-2">
        Page Not Found
      </h1>
      <p className="max-w-md text-xs sm:text-sm text-slate-500 mb-6">
        The requested URL does not match any route in the JSSATEN Companies Research &amp; Placement Analytics Portal.
      </p>
      <Link
        to="/"
        className="inline-flex items-center gap-2 px-4 py-2.5 rounded-lg text-xs font-semibold bg-blue-600 text-white hover:bg-blue-700 transition-colors shadow-xs"
      >
        <ArrowLeft className="w-4 h-4" />
        <span>Return to Companies Portal</span>
      </Link>
    </div>
  );
};
