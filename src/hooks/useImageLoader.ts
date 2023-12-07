import { useState, useEffect } from "react";

interface ImageData {
  url: string;
  width: number;
  height: number;
}

interface ImageLoaderHookResult {
  data: ImageData[];
  error: unknown;
  loading: boolean;
}

const useImageLoader = (url: string): ImageLoaderHookResult => {
  const [data, setData] = useState<ImageData[]>([]);
  const [error, setError] = useState<unknown>(null);
  const [loading, setLoading] = useState<boolean>(true);

  useEffect(() => {
    const fetchData = async () => {
      const response = await fetch(url);

      if (!response.ok) {
        throw new Error(`Error fetching data from ${url}`);
      }

      const imageData = (await response.json()) as ImageData[];

      const imagePromises = imageData.map(({ url: imageUrl }) => {
        return new Promise<void>((resolve, reject) => {
          const img = new Image();
          img.src = imageUrl;
          img.onload = () => resolve();
          img.onerror = () =>
            reject(new Error(`Error loading image: ${imageUrl}`));
        });
      });

      await Promise.all(imagePromises);

      setData(imageData);
      setLoading(false);
    };

    fetchData().catch((error) => {
      setError(error);
      setLoading(false);
    });
  }, [url]);

  return { data, error, loading };
};

export default useImageLoader;
