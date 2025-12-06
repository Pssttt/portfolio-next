export function useResumeDownload() {
  const handleDownload = async () => {
    try {
      // Fetch the API route which logs the download and redirects
      const response = await fetch("/api/resume");
      // The API will handle the redirect, but we can also manually navigate
      if (response.ok) {
        // Redirect was successful
        window.location.href = "/resume.pdf";
      }
    } catch (error) {
      console.error("Error downloading resume:", error);
      // Fallback: direct download if API fails
      window.location.href = "/resume.pdf";
    }
  };

  return { handleDownload };
}
