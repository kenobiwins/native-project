import { useEffect, useState } from "react";
import { Dimensions } from "react-native";

export const useDimensions = () => {
  const [dimensions, setDimensions] = useState(
    Dimensions.get("window").width - 16 * 2
  );

  useEffect(() => {
    const onChange = async () => {
      const width = (await Dimensions.get("window").width) - 16 * 2;

      await setDimensions(width);
    };

    Dimensions.addEventListener("change", onChange);

    return async () => {
      await Dimensions.removeEventListener("change", onChange);
    };
  }, [dimensions]);

  return [dimensions];
};
