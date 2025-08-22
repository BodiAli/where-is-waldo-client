import type { MouseEvent } from "react";

export default function getImageCoordinates(e: MouseEvent<HTMLImageElement>) {
  const rect = e.currentTarget.getBoundingClientRect();

  // Subtract the left coordinate from mouse position.
  const mousePositionInsideImgX = e.clientX - rect.left;
  // Subtract the top coordinate from mouse position.
  const mousePositionInsideImgY = e.clientY - rect.top;

  /**
   * Divide image natural size by rectangle size to multiply it by mouse position
   * to get the exact size of a click regardless of screen size.
   *  */
  const scaleX = e.currentTarget.naturalWidth / rect.width;
  const scaleY = e.currentTarget.naturalHeight / rect.height;

  const imgX = Math.round(mousePositionInsideImgX * scaleX);
  const imgY = Math.round(mousePositionInsideImgY * scaleY);

  return { imgX, imgY };
}
