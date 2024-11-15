import { Image } from "@shopify/hydrogen";
import { IMAGES_PLACEHOLDERS } from "@weaverse/hydrogen";
import type {
  WeaverseImage,
  HydrogenComponentSchema,
  HydrogenComponentProps,
} from "@weaverse/hydrogen";
import { forwardRef } from "react";
import { getImageAspectRatio } from "~/lib/utils";

interface HotspotsImageProps extends HydrogenComponentProps {
  image: string;
  aspectRatio: "adapt" | "1/1" | "4/3" | "3/4" | "16/9";
}

const HotspotsImage = forwardRef<HTMLDivElement, HotspotsImageProps>((props, ref) => {
  let { image, aspectRatio, children, ...rest } = props;
  let imageData: Partial<WeaverseImage> =
    typeof image === "string"
      ? { url: image, altText: "Hotspots image" }
      : image;
  return (
    <div
      ref={ref}
      {...rest}
      className="relative w-full h-full"
      style={{ aspectRatio: getImageAspectRatio(imageData, aspectRatio) }}
    >
      <Image
        data={imageData}
        sizes="auto"
        className="object-cover z-0 w-full h-full"
      />
      {children}
    </div>
  );
});

export default HotspotsImage;

export let schema: HydrogenComponentSchema = {
  type: "image-hotspots",
  title: "Image hotspots",
  limit: 2,
  childTypes: ["hotspots--item"],
  inspector: [
    {
      group: "Image",
      inputs: [
        {
          type: "image",
          name: "image",
          label: "Image",
        },
        {
          type: "select",
          name: "aspectRatio",
          label: "Aspect ratio",
          defaultValue: "adapt",
          configs: {
            options: [
              { value: "adapt", label: "Adapt to image" },
              { value: "1/1", label: "1/1" },
              { value: "4/3", label: "4/3" },
              { value: "3/4", label: "3/4" },
              { value: "16/9", label: "16/9" },
            ],
          },
          helpText:
            'Learn more about image <a href="https://developer.mozilla.org/en-US/docs/Web/CSS/aspect-ratio" target="_blank" rel="noopener noreferrer">aspect ratio</a> property.',
        },
      ],
    },
  ],
  toolbar: ["general-settings", ["duplicate", "delete"]],
  presets: {
    image: IMAGES_PLACEHOLDERS.collection_4,
    aspectRatio: "16/9",
    children: [
      {
        type: "hotspots--item",
        offsetX: 25,
        offsetY: 30,
      },
    ],
  },
};
