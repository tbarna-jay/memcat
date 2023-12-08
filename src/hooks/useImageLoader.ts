import { useState, useEffect } from "react";

interface ImageData {
  url: string;
  width: number;
  height: number;
}

interface ImageLoaderHookResult {
  imageUrls: string[];
  error: unknown;
  loading: boolean;
}

const useImageLoader = (url: string): ImageLoaderHookResult => {
  const [imageUrls, setImageUrls] = useState<string[]>([]);
  const [error, setError] = useState<unknown>(null);
  const [loading, setLoading] = useState<boolean>(true);

  useEffect(() => {
    const fetchData = async () => {
      const response = await fetch(url);

      if (!response.ok) {
        throw new Error(`Error fetching data from ${url}`);
      }

      const respose = (await response.json()) as ImageData[];
      const imageData = respose.map(({ url }) => url);

      const imagePromises = imageData.map((imageUrl) => {
        return new Promise<void>((resolve, reject) => {
          const img = new Image();
          img.src = imageUrl;
          img.onload = () => resolve();
          img.onerror = () =>
            reject(new Error(`Error loading image: ${imageUrl}`));
        });
      });

      await Promise.all(imagePromises);

      setImageUrls(imageData);
      setLoading(false);
    };

    fetchData().catch((error) => {
      setError(error);
      setLoading(false);
    });
  }, [url]);

  return { imageUrls, error, loading };
};

export default useImageLoader;
