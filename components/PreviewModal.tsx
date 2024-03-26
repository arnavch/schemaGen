"use client";

import { use, useEffect, useState } from "react";
import Prism from "prismjs";
import "prismjs/components/prism-cshtml";

import "prismjs/themes/prism-tomorrow.css";

export function PreviewModal({
  sql,
  setSql,
}: {
  sql: string | null;
  setSql: (sql: string | null) => void;
}) {

  console.log(sql)

  useEffect(() => {
    const highlight = async () => {
      await Prism.highlightAll(); // <--- prepare Prism
    };
    highlight(); // <--- call the async function
  }, [sql]);

  if (!sql) {
    return null;
  }

  return (
    <div
      onClick={(e) => {
        e.stopPropagation();
      }}
      className="bg-white rounded-lg shadow-xl flex flex-col"
      style={{
        width: "calc(100% - 64px)",
        height: "calc(100% - 64px)",
      }}
    >
      <div className="flex justify-between items-center p-4 border-b">

        <button
          className="p-2 rounded-md hover:bg-gray-200 focus:outline-none focus:ring"
          onClick={() => {
            setSql(null);
          }}
        >
          <svg
            className="w-6 h-6 text-gray-600"
            xmlns="http://www.w3.org/2000/svg"
            fill="none"
            viewBox="0 0 24 24"
            stroke="currentColor"
            aria-hidden="true"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth="2"
              d="M6 18L18 6M6 6l12 12"
            ></path>
          </svg>
        </button>
      </div>


      <pre className="overflow-auto p-4">
        <code className="language-markup">{sql}</code>
      </pre>

    </div>
  );
}