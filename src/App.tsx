import React, { useState, useEffect } from "react";
import { QRCodeSVG } from "qrcode.react";
import { Moon, Sun, Download, Languages } from "lucide-react";
import { translations } from "./translations";

function App() {
  const [darkMode, setDarkMode] = useState(false);
  const [text, setText] = useState("");
  const [fileName, setFileName] = useState("qr-code");
  const [language, setLanguage] = useState<"en" | "fr">("en");

  const t = translations[language];

  useEffect(() => {
    if (darkMode) {
      document.documentElement.classList.add("dark");
    } else {
      document.documentElement.classList.remove("dark");
    }
  }, [darkMode]);

  useEffect(() => {
    // Extract URL parameters
    const params = new URLSearchParams(window.location.search);
    const contentParam = params.get("content");
    const fnParam = params.get("fn");

    if (contentParam) setText(contentParam);
    if (fnParam) setFileName(fnParam);
  }, []);

  const handleDownload = () => {
    const svg = document.querySelector("svg");
    if (!svg) return;

    const svgData = new XMLSerializer().serializeToString(svg);
    const canvas = document.createElement("canvas");
    const ctx = canvas.getContext("2d");
    if (!ctx) return;

    const img = new Image();
    img.onload = () => {
      canvas.width = img.width;
      canvas.height = img.height;
      ctx.fillStyle = darkMode ? "#1f2937" : "#ffffff";
      ctx.fillRect(0, 0, canvas.width, canvas.height);
      ctx.drawImage(img, 0, 0);

      const pngFile = canvas.toDataURL("image/png");
      const downloadLink = document.createElement("a");
      downloadLink.download = `${fileName}.png`;
      downloadLink.href = pngFile;
      downloadLink.click();
    };

    img.src = "data:image/svg+xml;base64," + btoa(svgData);
  };

  return (
    <div
      className={`min-h-screen flex flex-col transition-colors duration-200 ${
        darkMode ? "dark:bg-gray-900" : "bg-gray-50"
      }`}
    >
      <div className="container mx-auto px-4 py-8 flex-grow">
        <div className="flex justify-end items-center gap-4 mb-8">
          <button
            onClick={() => setLanguage(language === "en" ? "fr" : "en")}
            className="flex items-center gap-2 p-2 rounded-lg bg-gray-200 dark:bg-gray-700 hover:bg-gray-300 dark:hover:bg-gray-600 transition-colors"
          >
            <Languages className="w-6 h-6 text-gray-700 dark:text-gray-200" />
            <span className="text-sm font-medium text-gray-700 dark:text-gray-200">
              {language === "en" ? "FR" : "EN"}
            </span>
          </button>
          <button
            onClick={() => setDarkMode(!darkMode)}
            className="p-2 rounded-lg bg-gray-200 dark:bg-gray-700 hover:bg-gray-300 dark:hover:bg-gray-600 transition-colors"
          >
            {darkMode ? (
              <Sun className="w-6 h-6 text-yellow-400" />
            ) : (
              <Moon className="w-6 h-6 text-gray-700" />
            )}
          </button>
        </div>

        <div className="max-w-md mx-auto">
          <h1 className="text-3xl font-bold text-center mb-8 text-gray-800 dark:text-white">
            {t.title}
          </h1>

          <div className="space-y-6">
            <div className="space-y-4">
              <div>
                <label
                  htmlFor="content"
                  className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1"
                >
                  {t.contentLabel}
                </label>
                <input
                  id="content"
                  type="text"
                  value={text}
                  onChange={(e) => setText(e.target.value)}
                  placeholder={t.contentPlaceholder}
                  className="w-full p-3 rounded-lg border border-gray-300 dark:border-gray-600 bg-white dark:bg-gray-800 text-gray-900 dark:text-white focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-colors"
                />
              </div>

              {text && (
                <div>
                  <label
                    htmlFor="filename"
                    className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1"
                  >
                    {t.fileNameLabel}
                  </label>
                  <input
                    id="filename"
                    type="text"
                    value={fileName}
                    onChange={(e) => setFileName(e.target.value)}
                    placeholder={t.fileNamePlaceholder}
                    className="w-full p-3 rounded-lg border border-gray-300 dark:border-gray-600 bg-white dark:bg-gray-800 text-gray-900 dark:text-white focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-colors"
                  />
                </div>
              )}
            </div>

            <div className="flex flex-col items-center space-y-4">
              {text && (
                <div className="p-4 bg-white dark:bg-gray-800 rounded-lg shadow-lg">
                  <QRCodeSVG
                    value={text}
                    size={200}
                    level="H"
                    includeMargin={true}
                    fgColor={darkMode ? "#ffffff" : "#000000"}
                    bgColor={darkMode ? "#1f2937" : "#ffffff"}
                  />
                </div>
              )}

              {text && (
                <button
                  onClick={handleDownload}
                  className="flex items-center space-x-2 px-4 py-2 bg-blue-500 hover:bg-blue-600 text-white rounded-lg transition-colors"
                >
                  <Download className="w-5 h-5" />
                  <span>{t.downloadButton}</span>
                </button>
              )}
            </div>
          </div>
        </div>
      </div>

      <footer className="py-4 text-center text-sm text-gray-600 dark:text-gray-400 border-t border-gray-200 dark:border-gray-800">
        {t.footer}
      </footer>
    </div>
  );
}

export default App;
