export function useResumeDownload() {
  const handleDownload = async () => {
    try {
      const response = await fetch("/api/resume");
      if (response.ok) {
        window.location.href = "/resume.pdf";
      }
    } catch (error) {
      console.error("Error downloading resume:", error);
      window.location.href = "/resume.pdf";
    }
  };

  return { handleDownload };
}
