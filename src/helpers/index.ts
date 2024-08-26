export const timeAgo = (createdAt: string) => {
  const createdDate = new Date(createdAt);
  const now = new Date();
  const diff = now.getTime() - createdDate.getTime();

  const minutes = Math.floor(diff / (1000 * 60));
  const hours = Math.floor(diff / (1000 * 60 * 60));
  const days = Math.floor(diff / (1000 * 60 * 60 * 24));

  if (days > 0) {
    return `${days} day${days > 1 ? "s" : ""} ago`;
  } else if (hours > 0) {
    return `${hours} hour${hours > 1 ? "s" : ""} ago`;
  } else {
    return `${minutes} minute${minutes > 1 ? "s" : ""} ago`;
  }
};

export const handleShare = (url: string, title: string, text: string) => {
  if (navigator.share) {
    navigator
      .share({
        title: title,
        text: text,
        url: url,
      })
      .then(() => console.log("Successfully shared"))
      .catch((error) => console.error("Error sharing:", error));
  } else {
    alert("Web Share API is not supported in your browser.");
  }
};

export const formatNumber = (num: number) => {
  return parseFloat(num.toFixed(2)).toString();
};

export const fileToBase64 = (file: File): Promise<string> => {
  return new Promise((resolve, reject) => {
    const reader = new FileReader();

    reader.onloadend = () => {
      const result = reader.result as string;
      resolve(result);
    };

    reader.onerror = (error) => {
      reject(error);
    };

    reader.readAsDataURL(file);
  });
};
