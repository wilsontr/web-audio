import { useCallback, useState } from "react";
import { UseDrunkWalkParams } from "./useDrunkWalk.model";

export const useDrunkWalk = ({ stepSize = 1, min, max, initialValue = 0 }: UseDrunkWalkParams) => {
  const [value, setValue] = useState(initialValue || min || 0);

  const update = useCallback(() => {
    const roll = Math.random();
    const direction = (roll < 0.5) ? -1 : 1;
    if (direction === -1) {
      let newValue = value - stepSize;
      if (typeof min !== "undefined" && newValue < min) {
        newValue = value + stepSize;
      }
      setValue(newValue);
    } else {
      let newValue = value + stepSize;
      if (typeof max !== "undefined" && newValue > max) {
        newValue = value - stepSize;
      }
      setValue(newValue);
    }
  }, [value, setValue, stepSize, min, max]);

  return { value, update };
}