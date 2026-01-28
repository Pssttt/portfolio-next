export function useResumeDownload() {
  const handleDownload = async () => {
    try {
      const response = await fetch("/api/resume");
      if (response.ok) {
        const link = document.createElement("a");
        link.href = "/resume.pdf";
        link.download = "Pyae-Sone-Shin-Thant-Resume.pdf";
        document.body.appendChild(link);
        link.click();
        document.body.removeChild(link);
      }
    } catch (error) {
      console.error("Error downloading resume:", error);
      const link = document.createElement("a");
      link.href = "/resume.pdf";
      link.download = "Pyae-Sone-Shin-Thant-Resume.pdf";
      document.body.appendChild(link);
      link.click();
      document.body.removeChild(link);
    }
  };

  return { handleDownload };
}
